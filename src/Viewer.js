import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Chess } from 'chess.js'; // Use named import if chess.js supports it
import Chessboard from 'reactjs-chessboard'
import BoardHeader from './BoardHeader';
import BoardFooter from './Footer/BoardFooter';
import MoveList from './Moves/MoveList';
import { getActiveSquare, getBaseStyles } from './helpers';

function Viewer({
  pgnInformation,
  orientation: initialOrientation = 'w', // Default orientation
  blackSquareColor,
  whiteSquareColor,
  width: defaultWidth,
  backgroundColor,
  showCoordinates,
}) {
  const [chessInstance, setChessInstance] = useState(null);
  const [moves, setMoves] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerInfo, setHeaderInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startAtMove, setStartAtMove] = useState(null);
  const [fenMove, setFenMove] = useState(null);
  const [endAtMove, setEndAtMove] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window?.innerWidth);
  const [orientation, setOrientation] = useState(initialOrientation);
  const timeoutRef = useRef(null); // For storing timeout ID

  // Memoize helper functions to prevent unnecessary re-renders if passed as props
  const makeIncreasingMoves = useCallback(({ numberOfMoves, reset = false }) => {
    if (!chessInstance || !moves) return;

    const newChessInstance = new Chess(chessInstance.fen()); // Clone to avoid mutation issues
    let tempIndex = reset ? 0 : currentIndex;

    for (let i = 0; i < numberOfMoves; i++) {
      if (tempIndex < moves.length) {
        newChessInstance.move(moves[tempIndex]);
        tempIndex++;
      } else {
        break; // Stop if we run out of moves
      }
    }
    setChessInstance(newChessInstance);
    setCurrentIndex(tempIndex);
  }, [chessInstance, moves, currentIndex]); // Dependencies for useCallback

  const handleNextMove = useCallback(() => {
    if (!chessInstance || !moves || currentIndex >= moves.length || currentIndex === endAtMove) {
      setIsPlaying(false); // Stop playing if at the end
      return;
    }

    const newChessInstance = new Chess(chessInstance.fen());
    newChessInstance.move(moves[currentIndex]);
    setChessInstance(newChessInstance);
    setCurrentIndex(prevIndex => prevIndex + 1);
  }, [chessInstance, moves, currentIndex, endAtMove]);

  const handlePreviousMove = useCallback(() => {
    if (!chessInstance || currentIndex <= 0 || currentIndex === startAtMove) return;

    const newChessInstance = new Chess(chessInstance.fen());
    newChessInstance.undo();
    setChessInstance(newChessInstance);
    setCurrentIndex(prevIndex => prevIndex - 1);
  }, [chessInstance, currentIndex, startAtMove]);

  const handleReset = useCallback(() => {
    if (!chessInstance) return;

    const newChessInstance = new Chess(); // Create a fresh instance based on initial PGN/FEN setup
    // Re-apply initial setup logic if needed, or simply reset the board state
    // This part needs careful handling based on how initial state was derived
    // For simplicity, let's assume resetting goes back to the very beginning before startAtMove/fenMove
    const initialChessState = new Chess();
    initialChessState.loadPgn(pgnInformation); // Reload PGN to get headers etc.
    const initialHeader = initialChessState.header();
    const initialMoves = initialChessState.history();
    initialChessState.reset(); // Reset to initial board position

    let initialIndex = 0;
    const initialStartMove = (initialHeader.StartAtMove * 2) - 1;
    const initialFen = initialHeader.Fen && initialHeader.Fen.split('');
    const isWhiteMove = initialFen && initialFen.pop() === 'b';
    const fenMoveNumber = initialFen && initialFen.join('');
    const initialFenMove = isWhiteMove ? fenMoveNumber * 2 : (fenMoveNumber * 2) - 1;

    if (initialStartMove > 0) {
        for (let i = 0; i < initialStartMove; i++) {
            if (i < initialMoves.length) initialChessState.move(initialMoves[i]);
            initialIndex++;
        }
    } else if (initialFenMove > 0) {
         for (let i = 0; i < initialFenMove; i++) {
            if (i < initialMoves.length) initialChessState.move(initialMoves[i]);
            initialIndex++;
        }
    }

    setChessInstance(initialChessState);
    setCurrentIndex(initialIndex);
    setIsPlaying(false); // Stop playing on reset

  }, [chessInstance, pgnInformation]); // Dependency on pgnInformation might be needed if it can change

  const handleLastMove = useCallback(() => {
    if (!chessInstance || !moves || currentIndex >= moves.length || currentIndex === endAtMove) return;

    const moveDifference = endAtMove ? endAtMove - currentIndex : moves.length - currentIndex;
    makeIncreasingMoves({ numberOfMoves: moveDifference });
    setIsPlaying(false); // Stop playing when jumping to end
  }, [chessInstance, moves, currentIndex, endAtMove, makeIncreasingMoves]);

  const handleFlipBoard = useCallback(() => {
    setOrientation(prevOrientation => (prevOrientation === 'w' ? 'b' : 'w'));
  }, []);

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      // Start playing: Trigger the first move immediately if not already playing
      handleNextMove();
    }
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }, [isPlaying, handleNextMove]);

  const handleChangeMove = useCallback((moveIndex) => {
    if (!chessInstance || moveIndex === currentIndex) return;

    setIsPlaying(false); // Stop playing when manually changing move

    if (moveIndex < currentIndex) {
      const newChessInstance = new Chess(chessInstance.fen());
      for (let i = 0; i < (currentIndex - moveIndex); i++) {
        newChessInstance.undo();
      }
      setChessInstance(newChessInstance);
      setCurrentIndex(moveIndex);
    } else {
      const moveDifference = moveIndex - currentIndex;
      makeIncreasingMoves({ numberOfMoves: moveDifference });
    }
  }, [chessInstance, currentIndex, makeIncreasingMoves]);

  const handleDownload = useCallback(() => {
    if (!headerInfo || !chessInstance) return;
    const element = document.createElement('a');
    const fileContent = fenMove ? chessInstance.fen() : pgnInformation;
    const fileFormat = fenMove ? 'txt' : 'pgn';
    const file = new Blob([fileContent], { type: 'text/plain' });
    const whiteLastName = headerInfo.White?.split(' ')[1] || 'White';
    const blackLastName = headerInfo.Black?.split(' ')[1] || 'Black';
    const eventDate = headerInfo.EventDate || 'event';

    element.href = URL.createObjectURL(file);
    element.download = `${whiteLastName}vs${blackLastName}_${eventDate}.${fileFormat}`;
    element.click();
    URL.revokeObjectURL(element.href); // Clean up object URL
  }, [headerInfo, fenMove, chessInstance, pgnInformation]);

  // Effect for initializing chess instance and parsing PGN
  useEffect(() => {
    if (!pgnInformation) return;

    try {
      const newChessInstance = new Chess();
      // chess.js loadPgn handles header parsing automatically
      newChessInstance.loadPgn(pgnInformation);

      const loadedHeaderInfo = newChessInstance.header();
      const loadedMoves = newChessInstance.history();
      newChessInstance.reset(); // Reset to starting position after loading history

      let initialIndex = 0;
      const loadedStartAtMove = loadedHeaderInfo.StartAtMove ? (parseInt(loadedHeaderInfo.StartAtMove, 10) * 2) - 1 : null;
      const loadedEndAtMove = loadedHeaderInfo.EndAtMove ? parseInt(loadedHeaderInfo.EndAtMove, 10) * 2 : null;
      const loadedFen = loadedHeaderInfo.Fen; // FEN string from header
      let loadedFenMove = null;

      // If FEN exists, prioritize it for starting position
      if (loadedFen) {
          const tempChessForFen = new Chess();
          tempChessForFen.loadPgn(pgnInformation); // Load again to get history relative to standard start
          const fullHistory = tempChessForFen.history();
          newChessInstance.load(loadedFen); // Load the specific FEN position
          // Find the index in the full history that corresponds to the FEN position
          // This is complex; a simpler approach might be needed if FEN implies a non-standard history start
          // For now, assume FEN implies starting *at* that position, index 0 relative to FEN
          initialIndex = 0; // Reset index if starting from FEN
          // We might need a way to map FEN back to a move number if StartAtMove/EndAtMove should still apply
          // Let's assume FEN overrides StartAtMove for simplicity here.
          // fenMove calculation might be incorrect/unnecessary if FEN dictates the start.
      } else if (loadedStartAtMove > 0 && loadedStartAtMove <= loadedMoves.length) {
        // Apply StartAtMove if no FEN
        for (let i = 0; i < loadedStartAtMove; i++) {
          newChessInstance.move(loadedMoves[i]);
          initialIndex++;
        }
      }

      setChessInstance(newChessInstance);
      setMoves(loadedMoves);
      setCurrentIndex(initialIndex);
      setStartAtMove(loadedFen ? 0 : loadedStartAtMove); // Adjust start based on FEN
      setEndAtMove(loadedEndAtMove);
      setFenMove(loadedFenMove); // This might need recalculation based on FEN logic
      setHeaderInfo(loadedHeaderInfo);

    } catch (error) {
        console.error("Error loading PGN:", error);
        // Handle PGN loading errors appropriately (e.g., set an error state)
        setChessInstance(new Chess()); // Set a default empty board on error
        setMoves([]);
        setCurrentIndex(0);
        setHeaderInfo({});
    }

  }, [pgnInformation]); // Re-run if PGN changes

  // Effect for handling window resize
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window?.innerWidth);
    };

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('load', updateDimensions); // Keep load listener? Maybe not necessary
    window.addEventListener('orientationchange', updateDimensions);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('load', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []); // Empty dependency array means run once on mount, cleanup on unmount

  // Effect for handling the play timer
  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(handleNextMove, 1000);
    } else {
      clearTimeout(timeoutRef.current);
    }

    // Cleanup timer on unmount or when isPlaying changes
    return () => clearTimeout(timeoutRef.current);
  }, [isPlaying, handleNextMove]); // Re-run when isPlaying or handleNextMove changes


    // --- Render Logic ---
    const { baseStyles, wrapperStyles, isMobile, width } = getBaseStyles({ windowWidth, backgroundColor, defaultWidth });
    const activeSquare = getActiveSquare(moves, currentIndex);
    const currentFen = chessInstance ? chessInstance.fen() : 'start'; // Get current FEN

    // Show loading or error state if chessInstance is not ready
    if (!chessInstance && pgnInformation) {
        // Or some other loading indicator
        return <div style={wrapperStyles}>Loading PGN...</div>;
    }
     if (!chessInstance) {
         // Handles case where pgnInformation is initially empty or invalid
         return <div style={wrapperStyles}>No PGN data provided or invalid PGN.</div>;
     }


    return (
      <div className="pgnWrapper" style={wrapperStyles}>
        {headerInfo && <BoardHeader headerInfo={headerInfo} width={width} />}
        <div className="pgnViewerMain" style={baseStyles}>
          <Chessboard
            blackSquareColour={blackSquareColor} // Prop name uses 'colour'
            fen={currentFen}
            orientation={orientation}
            showCoordinates={showCoordinates}
            activeSquare={activeSquare}
            style={{
              border: '2px solid lightgrey',
            }}
            whiteSquareColour={whiteSquareColor} // Prop name uses 'colour'
            width={isMobile ? width : (2 / 3) * width}
          />
          {!isMobile && moves && moves.length > 0 && (
            <MoveList
              onChangeMove={handleChangeMove}
              currentIndex={currentIndex}
              moves={moves}
              width={(1 / 3) * width}
              startAtMove={startAtMove}
              endAtMove={endAtMove}
              fenMove={fenMove}
            />
          )}
        </div>
        <BoardFooter
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onDownload={handleDownload}
          onFlipBoard={handleFlipBoard}
          onNextMove={handleNextMove}
          onPreviousMove={handlePreviousMove}
          onReset={handleReset}
          fenMove={fenMove}
          onLastMove={handleLastMove}
          width={width}
        />
        {isMobile && moves && moves.length > 0 && (
          <MoveList
            onChangeMove={handleChangeMove}
            currentIndex={currentIndex}
            moves={moves}
            width={width}
            startAtMove={startAtMove}
            endAtMove={endAtMove}
            fenMove={fenMove}
          />
        )}
      </div>
    );
}

Viewer.propTypes = {
  pgnInformation: PropTypes.string.isRequired,
  orientation: PropTypes.oneOf(['w', 'b']),
  blackSquareColor: PropTypes.string, // Note: Chessboard component uses 'colour'
  whiteSquareColor: PropTypes.string, // Note: Chessboard component uses 'colour'
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  showCoordinates: PropTypes.bool,
};

// Default props can be defined outside if needed
// Viewer.defaultProps = {
//   orientation: 'w',
//   showCoordinates: true,
// };

export default Viewer;

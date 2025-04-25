import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  CSSProperties,
} from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import BoardHeader from './BoardHeader.tsx';
import BoardFooter from './Footer/BoardFooter';
import MoveList from './Moves/MoveList';
import { getBaseStyles } from './helpers.ts';
import type { PgnHeaders, VerboseMove } from './types.ts';

interface ViewerProps {
  pgnInformation: string;
  blackSquareColor?: string;
  whiteSquareColor?: string;
  width?: number | string;
  orientation?: 'w' | 'b';
  backgroundColor?: string;
  showCoordinates?: boolean;
  startPly?: number;
  endPly?: number;
}

const Viewer: React.FC<ViewerProps> = ({
  pgnInformation,
  blackSquareColor = 'steelblue',
  whiteSquareColor = 'aliceblue',
  width: defaultWidth = 600,
  orientation: initialOrientation = 'w',
  backgroundColor = '#e1e5ed',
  showCoordinates = true,
  startPly: initialStartPly = 1,
  endPly: initialEndPly,
}) => {
  const [history, setHistory] = useState<VerboseMove[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [headerInfo, setHeaderInfo] = useState<PgnHeaders | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startPly = useMemo(
    () => Math.max(0, initialStartPly ?? 0),
    [initialStartPly]
  );
  const endPly = useMemo(
    () => initialEndPly ?? history.length,
    [initialEndPly, history.length]
  );

  const fenPly = null;
  const [windowWidth, setWindowWidth] = useState<number | null>(
    typeof window !== 'undefined' ? window.innerWidth : null
  );
  const [orientation, setOrientation] = useState<'white' | 'black'>(
    initialOrientation === 'w' ? 'white' : 'black'
  );
  const [currentFen, setCurrentFen] = useState<string>('start');
  const [loadError, setLoadError] = useState<string | null>(null);

  const chessInstanceRef = useRef<Chess | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { baseStyles, wrapperStyles, isMobile, width } = useMemo(
    () =>
      getBaseStyles({
        windowWidth,
        backgroundColor,
        defaultWidth: defaultWidth,
      }),
    [windowWidth, backgroundColor, defaultWidth]
  );

  const updateStateFromChess = useCallback((instance: Chess) => {
    setCurrentFen(instance.fen());
  }, []);

  const parseAndSetHeaders = useCallback(
    (pgnArray: string[], chessInstance: Chess): void => {
      for (let i = 0; i < pgnArray.length - 1; i++) {
        const headerLine = pgnArray[i].trim();
        if (headerLine) {
          const headerInfoParts = headerLine.split(' "');
          if (headerInfoParts.length === 2) {
            const key = headerInfoParts[0].replace(/"/g, '').trim();
            const value = headerInfoParts[1].replace(/"/g, '').trim();
            if (key && value) {
              chessInstance.setHeader(key, value);
            }
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!pgnInformation) {
      setLoadError('No PGN data provided.');
      setHeaderInfo(null);
      setHistory([]);
      setCurrentFen('start');
      chessInstanceRef.current = null;
      return;
    }

    setLoadError(null);
    try {
      const newChess = new Chess();
      const pgnString = pgnInformation.trim().replace(/\[/g, '');

      if (!pgnString) {
        setLoadError('Empty PGN data after trimming.');
        setHeaderInfo(null);
        setHistory([]);
        setCurrentFen('start');
        chessInstanceRef.current = null;
        return;
      }

      const pgnArray = pgnString.split(']');
      const movesSection = pgnArray[pgnArray.length - 1].trim();

      if (movesSection) {
        newChess.loadPgn(movesSection, { strict: false });
      }

      parseAndSetHeaders(pgnArray, newChess);
      const finalHeaders = newChess.getHeaders();
      setHeaderInfo(finalHeaders as PgnHeaders);

      const loadedMoves = newChess.history({ verbose: true }) as VerboseMove[];
      setHistory(loadedMoves);

      chessInstanceRef.current = newChess;

      const actualStartPly = Math.max(0, initialStartPly ?? 0);
      if (actualStartPly > 0 && actualStartPly <= loadedMoves.length) {
        const instanceForStart = new Chess();
        if (movesSection) {
          instanceForStart.loadPgn(movesSection, { strict: false });
        }
        parseAndSetHeaders(pgnArray, instanceForStart);

        const movesToStart = loadedMoves.slice(0, actualStartPly);
        movesToStart.forEach((move) => {
          try {
            instanceForStart.move(move.san);
          } catch (e) {
            /* ignore */
          }
        });
        setCurrentFen(instanceForStart.fen());
        setCurrentMoveIndex(actualStartPly);
      } else {
        setCurrentFen(newChess.fen());
        setCurrentMoveIndex(0);
      }

      if (actualStartPly > 0) {
        newChess.reset();
        if (movesSection) {
          newChess.loadPgn(movesSection, { strict: false });
        }
        parseAndSetHeaders(pgnArray, newChess);
      }
    } catch (error: unknown) {
      console.error('Error loading PGN:', error);
      const message = error instanceof Error ? error.message : String(error);
      setLoadError(`Failed to load PGN: ${message}`);
      setHeaderInfo(null);
      setHistory([]);
      setCurrentFen('start');
      chessInstanceRef.current = null;
    }
  }, [
    pgnInformation,
    updateStateFromChess,
    parseAndSetHeaders,
    initialStartPly,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const goToPly = useCallback(
    (ply: number) => {
      const instance = chessInstanceRef.current;
      const targetPly = Math.max(startPly, Math.min(ply, endPly));
      if (!instance || targetPly < startPly || targetPly > endPly) return;

      const currentInternalPly = instance.history().length;
      const fullHistory = instance.history({ verbose: true }) as VerboseMove[];

      if (targetPly === currentInternalPly) {
        return;
      }

      instance.reset();
      const originalPgn = instance.pgn();
      if (originalPgn) {
        instance.loadPgn(originalPgn, { strict: false });
      }

      const movesToTarget = (
        instance.history({ verbose: true }) as VerboseMove[]
      ).slice(0, targetPly);
      movesToTarget.forEach((move) => {
        try {
          instance.move(move.san);
        } catch (e) {
          console.error(
            `Error replaying move to ply ${targetPly}: ${move.san}`,
            e
          );
        }
      });

      setCurrentMoveIndex(targetPly);
      updateStateFromChess(instance);
    },
    [chessInstanceRef, startPly, endPly, updateStateFromChess]
  );

  const handleNextMove = useCallback(() => {
    if (currentMoveIndex < endPly) {
      goToPly(currentMoveIndex + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentMoveIndex, endPly, goToPly]);

  const handlePreviousMove = useCallback(() => {
    if (currentMoveIndex > startPly) {
      goToPly(currentMoveIndex - 1);
    }
  }, [currentMoveIndex, startPly, goToPly]);

  const handleReset = useCallback(() => {
    goToPly(startPly);
  }, [goToPly, startPly]);

  const handleLastMove = useCallback(() => {
    goToPly(endPly);
  }, [goToPly, endPly]);

  const handleFlipBoard = useCallback(() => {
    setOrientation((prev) => (prev === 'white' ? 'black' : 'white'));
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    clearTimeout(playTimeoutRef.current as NodeJS.Timeout);
    if (isPlaying && currentMoveIndex < endPly) {
      playTimeoutRef.current = setTimeout(handleNextMove, 1000);
    } else if (isPlaying && currentMoveIndex >= endPly) {
      setIsPlaying(false);
    }

    return () => clearTimeout(playTimeoutRef.current as NodeJS.Timeout);
  }, [isPlaying, currentMoveIndex, endPly, handleNextMove]);

  const handleDownload = () => {};

  const customSquareStyles: { [square: string]: CSSProperties } =
    useMemo(() => {
      if (currentMoveIndex > 0 && currentMoveIndex <= history.length) {
        const lastMove = history[currentMoveIndex - 1];
        if (lastMove?.to) {
          return {
            [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
          };
        }
      }
      return {};
    }, [currentMoveIndex, history]);

  if (loadError) {
    return (
      <div className="pgnWrapper" style={wrapperStyles as CSSProperties}>
        <p>Error: {loadError}</p>
      </div>
    );
  }

  if (!headerInfo && !loadError && pgnInformation) {
    return (
      <div className="pgnWrapper" style={wrapperStyles as CSSProperties}>
        <p>Loading PGN...</p>
      </div>
    );
  }

  return (
    <div className="pgnWrapper" style={wrapperStyles as CSSProperties}>
      {headerInfo && <BoardHeader headerInfo={headerInfo} />}

      <div className="pgnViewerMain" style={baseStyles as CSSProperties}>
        <Chessboard
          id="pgn-chessboard"
          position={currentFen}
          boardOrientation={orientation}
          showBoardNotation={showCoordinates}
          boardWidth={
            isMobile ? Number(width) : Math.round((2 / 3) * Number(width))
          }
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          }}
          customDarkSquareStyle={{ backgroundColor: blackSquareColor }}
          customLightSquareStyle={{ backgroundColor: whiteSquareColor }}
          customSquareStyles={customSquareStyles}
          arePiecesDraggable={false}
        />
        {!isMobile && history.length > 0 && (
          <MoveList
            moves={history}
            currentIndex={currentMoveIndex}
            onChangeMove={goToPly}
            width={Math.round((1 / 3) * Number(width))}
            startPly={startPly}
            endPly={endPly}
            fenPly={fenPly}
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
        onLastMove={handleLastMove}
        fenMove={fenPly === null ? undefined : fenPly}
        width={width}
        disableReset={currentMoveIndex <= startPly || fenPly !== null}
        disablePrev={currentMoveIndex <= startPly || fenPly !== null}
        disableNext={currentMoveIndex >= endPly || fenPly !== null}
        disableLast={currentMoveIndex >= endPly || fenPly !== null}
        disablePlay={fenPly !== null || endPly <= startPly}
      />
      {isMobile && history.length > 0 && (
        <MoveList
          moves={history}
          currentIndex={currentMoveIndex}
          onChangeMove={goToPly}
          width={width}
          startPly={startPly}
          endPly={endPly}
          fenPly={fenPly}
        />
      )}
    </div>
  );
};

export default Viewer;

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import BoardHeader from './BoardHeader';
import BoardFooter from './Footer/BoardFooter';
import MoveList from './Moves/MoveList';
import { getBaseStyles } from './helpers';
import { DEFAULTS } from './constants';
import type { ViewerProps, PgnHeader } from './types';

/**
 * Pre-parses custom PGN headers (StartAtMove, EndAtMove, Fen) that chess.js 1.x ignores.
 */
const parseCustomHeaders = (pgn: string): Partial<PgnHeader> => {
  const customHeaders: Partial<PgnHeader> = {};
  const startMatch = pgn.match(/\[StartAtMove\s+"(\d+)"\]/);
  const endMatch = pgn.match(/\[EndAtMove\s+"(\d+)"\]/);
  const fenMatch = pgn.match(/\[Fen\s+"([^"]+)"\]/);

  if (startMatch?.[1]) customHeaders.StartAtMove = startMatch[1];
  if (endMatch?.[1]) customHeaders.EndAtMove = endMatch[1];
  if (fenMatch?.[1]) customHeaders.Fen = fenMatch[1];

  return customHeaders;
};

/**
 * Parses a PGN string into header information and move history.
 * Uses chess.js 1.x API with loadPgn().
 */
const parsePgn = (pgnInformation: string): { header: PgnHeader; moves: string[] } | null => {
  if (!pgnInformation || typeof pgnInformation !== 'string') {
    return null;
  }

  // Pre-parse custom headers before chess.js processes the PGN
  const customHeaders = parseCustomHeaders(pgnInformation);

  const chess = new Chess();

  try {
    chess.loadPgn(pgnInformation);

    const chessHeaders = chess.header();
    const moves = chess.history() as string[];

    if (moves.length === 0) {
      console.warn('[react-pgn-viewer] Failed to load PGN or PGN has no moves');
      return null;
    }

    // Merge chess.js headers with custom headers
    const header: PgnHeader = { ...chessHeaders, ...customHeaders } as PgnHeader;

    return { header, moves };
  } catch (error) {
    console.error('[react-pgn-viewer] Error parsing PGN:', error);
    return null;
  }
};

/**
 * Main chess viewer component.
 * Displays a chessboard with move navigation controls.
 */
const Viewer: React.FC<ViewerProps> = ({
  pgnInformation,
  blackSquareColor = 'steelblue',
  whiteSquareColor = 'aliceblue',
  width: defaultWidth = DEFAULTS.WIDTH,
  orientation: initialOrientation = DEFAULTS.ORIENTATION,
  backgroundColor = '#e1e5ed',
  showCoordinates = DEFAULTS.SHOW_COORDINATES,
}) => {
  // ============================================================
  // State
  // ============================================================
  const [fen, setFen] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [moves, setMoves] = useState<readonly string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerInfo, setHeaderInfo] = useState<PgnHeader | null>(null);
  const [orientation, setOrientation] = useState<'w' | 'b'>(initialOrientation);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : DEFAULTS.WIDTH
  );

  const startAtMove = useRef(0);
  const endAtMove = useRef(0);
  const fenMove = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIndexRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // ============================================================
  // Helper to replay moves and get FEN
  // ============================================================
  const replayToIndex = useCallback((targetIndex: number, moveList: readonly string[]) => {
    const chess = new Chess();
    for (let i = 0; i < targetIndex && i < moveList.length; i++) {
      const move = moveList[i];
      if (move) {
        chess.move(move);
      }
    }
    return chess.fen();
  }, []);

  // ============================================================
  // Initialize chess position from PGN
  // ============================================================
  useEffect(() => {
    const parsed = parsePgn(pgnInformation);
    if (!parsed) return;

    const { header, moves: parsedMoves } = parsed;
    setHeaderInfo(header);
    setMoves(parsedMoves);

    // Calculate start/end positions from header
    const startMove = header.StartAtMove ? parseInt(header.StartAtMove, 10) : 0;
    const endMove = header.EndAtMove ? parseInt(header.EndAtMove, 10) : parsedMoves.length;

    startAtMove.current = startMove;
    endAtMove.current = endMove;

    // Handle FEN-based starting position
    let initialFenMove: number | null = null;
    if (header.Fen) {
      const fenParts = header.Fen.split(' ');
      const isBlackTurn = fenParts[1] === 'b';
      const fenBoard = fenParts[0] ?? '';
      const moveNumber = parseInt(fenBoard.split('/').pop() ?? '1', 10);
      initialFenMove = isBlackTurn ? moveNumber * 2 : (moveNumber * 2) - 1;
      fenMove.current = initialFenMove;
    }

    // Reset board and replay moves to start position
    const targetIndex = startMove || initialFenMove || 0;
    const newFen = replayToIndex(targetIndex, parsedMoves);

    setFen(newFen);
    setCurrentIndex(targetIndex);
  }, [pgnInformation, replayToIndex]);

  // ============================================================
  // Window resize listener
  // ============================================================
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================================
  // Auto-play timer (uses ref to avoid stale closure)
  // ============================================================
  useEffect(() => {
    if (isPlaying && currentIndexRef.current < moves.length) {
      timeoutRef.current = setTimeout(() => {
        const idx = currentIndexRef.current;
        if (idx < moves.length) {
          const newFen = replayToIndex(idx + 1, moves);
          setFen(newFen);
          setCurrentIndex(idx + 1);
        } else {
          setIsPlaying(false);
        }
      }, DEFAULTS.PLAY_DELAY_MS);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentIndex, moves.length]);

  // ============================================================
  // Navigation handlers
  // ============================================================
  const handleNextMove = useCallback(() => {
    const idx = currentIndexRef.current;
    if (idx >= moves.length) return;
    const newFen = replayToIndex(idx + 1, moves);
    setFen(newFen);
    setCurrentIndex(idx + 1);
  }, [replayToIndex, moves]);

  const handlePreviousMove = useCallback(() => {
    const idx = currentIndexRef.current;
    if (idx <= 0) return;
    const newFen = replayToIndex(idx - 1, moves);
    setFen(newFen);
    setCurrentIndex(idx - 1);
  }, [replayToIndex, moves]);

  const handleReset = useCallback(() => {
    const targetIndex = startAtMove.current || fenMove.current || 0;
    const newFen = replayToIndex(targetIndex, moves);
    setFen(newFen);
    setCurrentIndex(targetIndex);
    setIsPlaying(false);
  }, [replayToIndex, moves]);

  const handleLastMove = useCallback(() => {
    const idx = currentIndexRef.current;
    const target = endAtMove.current || moves.length;
    if (idx >= target) return;
    const newFen = replayToIndex(target, moves);
    setFen(newFen);
    setCurrentIndex(target);
  }, [replayToIndex, moves]);

  const handleFlipBoard = useCallback(() => {
    setOrientation((prev) => (prev === 'w' ? 'b' : 'w'));
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleChangeMove = useCallback(
    (moveIndex: number) => {
      if (moveIndex === currentIndexRef.current) return;
      const newFen = replayToIndex(moveIndex, moves);
      setFen(newFen);
      setCurrentIndex(moveIndex);
    },
    [replayToIndex, moves]
  );

  const handleDownload = useCallback(() => {
    if (!headerInfo) return;

    const fileContent = pgnInformation;
    const file = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(file);

    const element = document.createElement('a');
    element.href = url;

    const whiteLastName = (headerInfo.White ?? 'Unknown').split(' ').pop() ?? 'Unknown';
    const blackLastName = (headerInfo.Black ?? 'Unknown').split(' ').pop() ?? 'Unknown';
    element.download = `${whiteLastName}vs${blackLastName}.pgn`;

    document.body.appendChild(element);
    element.click();
    // Delay revoke to ensure download starts
    setTimeout(() => {
      document.body.removeChild(element);
      URL.revokeObjectURL(url);
    }, 100);
  }, [headerInfo, pgnInformation]);

  // ============================================================
  // Derived values
  // ============================================================
  const { baseStyles, wrapperStyles, isMobile, width } = useMemo(
    () =>
      getBaseStyles({
        windowWidth,
        backgroundColor,
        defaultWidth,
      }),
    [windowWidth, backgroundColor, defaultWidth]
  );

  const boardWidth = useMemo(() => {
    const w = typeof width === 'number' ? width : 400;
    return isMobile ? w : Math.floor((2 / 3) * w);
  }, [isMobile, width]);

  const moveListWidth = useMemo(() => {
    const w = typeof width === 'number' ? width : 600;
    return isMobile ? w : Math.floor((1 / 3) * w);
  }, [isMobile, width]);

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="pgnWrapper" style={wrapperStyles}>
      {headerInfo && <BoardHeader headerInfo={headerInfo} width={width} />}
      <div className="pgnViewerMain" style={baseStyles}>
        <Chessboard
          position={fen}
          boardOrientation={orientation === 'w' ? 'white' : 'black'}
          animationDuration={200}
          arePiecesDraggable={false}
          customBoardStyle={{
            border: '2px solid lightgrey',
            borderRadius: '4px',
          }}
          customDarkSquareStyle={{ backgroundColor: blackSquareColor }}
          customLightSquareStyle={{ backgroundColor: whiteSquareColor }}
          boardWidth={boardWidth}
          showBoardNotation={showCoordinates}
        />
        {!isMobile && (
          <MoveList
            onChangeMove={handleChangeMove}
            currentIndex={currentIndex}
            moves={moves}
            width={moveListWidth}
            startAtMove={startAtMove.current}
            endAtMove={endAtMove.current}
            fenMove={fenMove.current}
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
        fenMove={fenMove.current}
        onLastMove={handleLastMove}
        width={width}
      />
      {isMobile && (
        <MoveList
          onChangeMove={handleChangeMove}
          currentIndex={currentIndex}
          moves={moves}
          width={width}
          startAtMove={startAtMove.current}
          endAtMove={endAtMove.current}
          fenMove={fenMove.current}
        />
      )}
    </div>
  );
};

export default React.memo(Viewer);

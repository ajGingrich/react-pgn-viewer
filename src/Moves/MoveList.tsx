import React, { useEffect, useMemo, useRef } from 'react';
import Move from './Move';
import type { MoveListProps } from '../types';

/**
 * Displays a list of chess moves with move numbers.
 * Supports partial game display with startAtMove/endAtMove bounds.
 */
const MoveList: React.FC<MoveListProps> = ({
  moves,
  currentIndex,
  onChangeMove,
  width,
  maxHeight,
  startAtMove,
  endAtMove,
  fenMove,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const containerStyles: React.CSSProperties = {
    boxSizing: 'border-box',
    width,
    padding: '10px 12px',
    fontSize: '14px',
    lineHeight: '22px',
    maxHeight,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'thin',
    scrollbarColor: '#b4bcc8 transparent',
    backgroundColor: '#fcfcfd',
  };

  const filteredMoves = useMemo(() => {
    if (!moves || moves.length === 0) return [];

    return moves
      .map((move, index) => {
        const moveIndex = index + 1;
        const isInRange = moveIndex >= startAtMove && moveIndex <= endAtMove;
        return isInRange ? { move, moveIndex } : null;
      })
      .filter((item): item is { move: string; moveIndex: number } => item !== null);
  }, [moves, startAtMove, endAtMove]);

  // Inject WebKit scrollbar styling once (inline styles cannot target pseudo-elements).
  useEffect(() => {
    const styleId = 'pgn-movelist-scrollbar';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .pgnViewerMoveList::-webkit-scrollbar { width: 8px; }
      .pgnViewerMoveList::-webkit-scrollbar-track { background: transparent; }
      .pgnViewerMoveList::-webkit-scrollbar-thumb { background: #c2cad6; border-radius: 4px; }
      .pgnViewerMoveList::-webkit-scrollbar-thumb:hover { background: #a6b0bf; }
    `;
    document.head.appendChild(style);
  }, []);

  // Keep the active move visible while navigating through the game.
  useEffect(() => {
    if (!listRef.current || currentIndex <= 0) return;
    const activeMove = listRef.current.querySelector(`[data-move-index="${currentIndex}"]`);
    activeMove?.scrollIntoView?.({ block: 'nearest' });
  }, [currentIndex]);

  if (!moves || moves.length === 0) {
    return null;
  }

  if (fenMove !== null) {
    return (
      <div style={containerStyles} role="status" aria-live="polite">
        {fenMove % 2 === 0 ? 'White' : 'Black'} to move
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="pgnViewerMoveList"
      style={containerStyles}
      role="list"
      aria-label="Chess moves"
    >
      {filteredMoves.map(({ move, moveIndex }) => (
        <Move
          key={moveIndex}
          onChangeMove={onChangeMove}
          currentIndex={currentIndex}
          move={move}
          moveIndex={moveIndex}
        />
      ))}
    </div>
  );
};

export default React.memo(MoveList);

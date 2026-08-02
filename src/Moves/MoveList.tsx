import React, { useMemo } from 'react';
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
  startAtMove,
  endAtMove,
  fenMove,
}) => {
  const containerStyles: React.CSSProperties = {
    width,
    paddingLeft: '10px',
    paddingRight: '5px',
    fontSize: '14px',
    lineHeight: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
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
    <div className="pgnViewerMoveList" style={containerStyles} role="list" aria-label="Chess moves">
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

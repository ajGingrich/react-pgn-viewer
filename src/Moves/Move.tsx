import React, { useCallback } from 'react';
import type { MoveProps } from '../types';

/**
 * A single clickable chess move in the move list.
 * Displays in algebraic notation with move numbers for white moves.
 */
const Move: React.FC<MoveProps> = ({ move, moveIndex, currentIndex, onChangeMove }) => {
  const isWhiteMove = moveIndex % 2 !== 0;
  const whiteMoveNumber = Math.ceil(moveIndex / 2);
  const isActive = currentIndex === moveIndex;

  const handleClick = useCallback(() => {
    onChangeMove(moveIndex);
  }, [onChangeMove, moveIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onChangeMove(moveIndex);
      }
    },
    [onChangeMove, moveIndex]
  );

  const moveStyles: React.CSSProperties = {
    cursor: 'pointer',
    color: 'black',
    display: 'inline-block',
    fontWeight: isActive ? 700 : 400,
    padding: '2px 4px',
    borderRadius: '3px',
    transition: 'background-color 0.15s ease',
    backgroundColor: isActive ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
  };

  return (
    <span
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={moveStyles}
      role="button"
      tabIndex={0}
      aria-label={`Move ${moveIndex}: ${move}${isActive ? ' (current)' : ''}`}
      aria-current={isActive ? 'step' : undefined}
    >
      {isWhiteMove && <span style={{ fontWeight: 600 }}>{`${whiteMoveNumber}.`}</span>}
      &nbsp;{move}&nbsp;
    </span>
  );
};

export default React.memo(Move);

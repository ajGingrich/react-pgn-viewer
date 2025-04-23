import React, { useCallback, CSSProperties, RefObject } from 'react';

interface MoveProps {
  moveSan: string;
  movePlyIndex: number;
  isCurrent: boolean;
  onChangeMove: (ply: number) => void;
  moveRef?: RefObject<HTMLSpanElement | null>;
}

const Move: React.FC<MoveProps> = ({
  moveSan,
  movePlyIndex,
  isCurrent,
  onChangeMove,
  moveRef = null,
}) => {
  const handleClick = useCallback(() => {
    onChangeMove(movePlyIndex);
  }, [onChangeMove, movePlyIndex]);

  const moveStyles: CSSProperties = {
    cursor: 'pointer',
    color: 'black',
    display: 'inline-block',
    padding: '1px 3px',
    borderRadius: '3px',
    margin: '0 1px',
    fontWeight: isCurrent ? 700 : 400,
    backgroundColor: isCurrent ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
    transition: 'background-color 0.2s ease',
  };

  const moveNumber = Math.ceil(movePlyIndex / 2);
  const turnIndicator = movePlyIndex % 2 !== 0 ? '.' : '...';

  return (
    <span
      ref={moveRef}
      onClick={handleClick}
      style={moveStyles}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      title={`Go to move ${moveNumber}${turnIndicator} ${moveSan}`}
      className={isCurrent ? 'currentMove' : ''}
    >
      {moveSan}
    </span>
  );
};

export default Move;

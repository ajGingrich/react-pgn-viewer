import React, { useEffect, useRef, CSSProperties } from 'react';
import Move from './Move';
import type { VerboseMove } from '../types';

interface MoveListProps {
  moves: VerboseMove[];
  currentIndex: number;
  onChangeMove: (ply: number) => void;
  width: number | string;
  startPly?: number;
  endPly?: number;
  fenPly?: number | null;
}

const MoveList: React.FC<MoveListProps> = ({
  moves,
  currentIndex,
  onChangeMove,
  width,
  startPly = 0,
  endPly = Infinity,
  fenPly = null,
}) => {
  const currentMoveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (currentMoveRef.current) {
      currentMoveRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [currentIndex]);

  if (!moves) return null;

  const isMobileLayout = typeof width === 'string' && width.includes('%');

  const moveListContainerStyles: CSSProperties = {
    width: width,
    padding: '10px',
    fontSize: '14px',
    lineHeight: '22px',
    boxSizing: 'border-box',
    maxHeight: isMobileLayout ? '200px' : '400px',
    overflowY: 'auto',
    borderLeft: isMobileLayout ? 'none' : '1px solid #ccc',
    borderTop: isMobileLayout ? '1px solid #ccc' : 'none',
    marginTop: isMobileLayout ? '10px' : '0',
    wordBreak: 'break-word',
  };

  if (fenPly !== null) {
    const turn = (fenPly + 1) % 2 === 0 ? 'Black' : 'White';
    const moveNumber = Math.ceil((fenPly + 1) / 2);
    const moveIndicator =
      fenPly % 2 === 0 ? `${moveNumber - 1}...` : `${moveNumber}.`;

    return (
      <div className="pgnViewerMoveList" style={moveListContainerStyles}>
        Position after {moveIndicator} {turn} to move.
      </div>
    );
  }

  const actualEndPly = Math.min(endPly, moves.length);

  const visibleMoves = moves.slice(startPly, actualEndPly);

  if (visibleMoves.length === 0 && startPly === 0 && actualEndPly === 0) {
    return (
      <div className="pgnViewerMoveList" style={moveListContainerStyles}>
        Game has no moves.
      </div>
    );
  }
  if (visibleMoves.length === 0 && startPly >= actualEndPly) {
    return (
      <div className="pgnViewerMoveList" style={moveListContainerStyles}>
        No moves selected in the range [{Math.ceil((startPly + 1) / 2)} -{' '}
        {Math.floor(actualEndPly / 2)}].
      </div>
    );
  }

  return (
    <div className="pgnViewerMoveList" style={moveListContainerStyles}>
      {visibleMoves.map((move, index) => {
        const movePlyIndex = startPly + index + 1;
        const isWhiteMove = movePlyIndex % 2 !== 0;
        const moveNumber = Math.ceil(movePlyIndex / 2);
        const isCurrent = currentIndex === movePlyIndex;

        return (
          <React.Fragment key={movePlyIndex}>
            {isWhiteMove && <span className="moveNumber">{moveNumber}. </span>}
            <Move
              moveRef={isCurrent ? currentMoveRef : undefined}
              moveSan={move.san}
              movePlyIndex={movePlyIndex}
              isCurrent={isCurrent}
              onChangeMove={onChangeMove}
            />
            {!isWhiteMove || index === visibleMoves.length - 1 ? '\u00A0' : ''}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MoveList;

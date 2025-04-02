import React from 'react';
import PropTypes from 'prop-types';
import Move from './Move';

function MoveList({ moves, currentIndex, onChangeMove, width, startAtMove, endAtMove, fenMove }) {
  if (!moves) return null;

  const pgnViewerMoveListStyles = {
      width: width,
      paddingLeft: '10px',
      paddingRight: '5px',
    fontSize: '14px',
    lineHeight: '20px',
  };

  // Determine the range of moves to display based on start/end props
  const startIndex = startAtMove ? startAtMove - 1 : 0;
  // If endAtMove is null/undefined, display all moves until the end
  const endIndex = endAtMove ? endAtMove - 1 : moves.length -1;

  return (
    <div className="pgnViewerMoveList" style={pgnViewerMoveListStyles}>
      {!fenMove &&
        moves.map((move, index) => {
          // Only render moves within the specified range
          if (index >= startIndex && index <= endIndex) {
            return (
                <Move
                  onChangeMove={onChangeMove}
                  key={index} // Using index as key is okay here if moves don't change order/get deleted
                  currentIndex={currentIndex}
                  move={move}
                  moveIndex={index + 1} // moveIndex seems to be 1-based
                />
              );
          }
          return null; // Don't render moves outside the range
        })}
      {fenMove && (
        // Display whose turn it is based on FEN if provided
        <div>{fenMove % 2 === 0 ? 'White' : 'Black'} to move</div>
      )}
    </div>
  );
}

MoveList.propTypes = {
  currentIndex: PropTypes.number,
  moves: PropTypes.array,
  onChangeMove: PropTypes.func.isRequired,
  fenMove: PropTypes.number,
  startAtMove: PropTypes.number,
  endAtMove: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default MoveList

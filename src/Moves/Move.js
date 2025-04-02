import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function Move({ move, moveIndex, currentIndex, onChangeMove }) {
  const isWhiteMove = moveIndex % 2 !== 0;
  const whiteMoveNumber = Math.ceil(moveIndex / 2) + '.';

  const moveStyles = {
    cursor: 'pointer',
    color: 'black',
    display: 'inline-block',
    fontWeight: currentIndex === moveIndex ? 700 : 400, // Apply bold directly
    padding: '0 2px', // Add some padding for better spacing
  };

  // Use useCallback for the handler if performance becomes an issue,
  // but for simple cases, an inline function is fine.
  const handleChangeMove = useCallback(() => {
    if (typeof onChangeMove === 'function') {
      onChangeMove(moveIndex);
    }
  }, [onChangeMove, moveIndex]); // Dependencies for useCallback

  return (
    <span onClick={handleChangeMove} style={moveStyles}>
      {isWhiteMove && whiteMoveNumber}&nbsp;{move}&nbsp;
    </span>
  );
}

Move.propTypes = {
  currentIndex: PropTypes.number,
  moveIndex: PropTypes.number,
  move: PropTypes.string,
  onChangeMove: PropTypes.func.isRequired,
}

export default Move

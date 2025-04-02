import React from 'react';
import PropTypes from 'prop-types';

function Flip({ onFlipBoard, iconStyles }) {
  const handleFlipBoard = () => {
    if (typeof onFlipBoard === 'function') {
      onFlipBoard();
    }
  };

  // No need to deep clone iconStyles unless modifying them locally
  return (
    <div onClick={handleFlipBoard} style={iconStyles} title="Flip Board">
      <i className="pgnIcon fa fa-exchange fa-lg fa-rotate-90"></i>
    </div>
  );
}

Flip.propTypes = {
  onFlipBoard: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Flip

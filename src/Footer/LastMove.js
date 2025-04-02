import React from 'react';
import PropTypes from 'prop-types';

function LastMove({ onLastMove, iconStyles }) {
  const handleLastMove = () => {
    if (typeof onLastMove === 'function') {
      onLastMove();
    }
  };

  return (
    <div onClick={handleLastMove} style={iconStyles} title="Go to Last Move">
      <i className="pgnIcon fa fa-step-forward fa-lg"></i>
    </div>
  );
}

LastMove.propTypes = {
  onLastMove: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default LastMove

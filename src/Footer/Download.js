import React from 'react';
import PropTypes from 'prop-types';

function Download({ onDownload, iconStyles }) {
  const handleDownload = () => {
    if (typeof onDownload === 'function') {
      onDownload();
    }
  };

  return (
    <div onClick={handleDownload} style={iconStyles} title="Download PGN/FEN">
      <i className="pgnIcon fa fa-download fa-lg"></i>
    </div>
  );
}

Download.propTypes = {
  onDownload: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Download

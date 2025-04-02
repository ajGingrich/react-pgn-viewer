import React from 'react';
import PropTypes from 'prop-types';
import Download from './Download';
import PreviousMove from './PreviousMove';
import NextMove from './NextMove';
import LastMove from './LastMove';
import Reset from './Reset';
import Flip from './Flip';
import Play from './Play';

function BoardFooter({
  onDownload,
  onNextMove,
  onPreviousMove,
  onReset,
  onFlipBoard,
  width,
  onLastMove,
  onPlay,
  isPlaying,
  fenMove,
}) {

    const footerStyles = {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
    paddingTop: '10px',
    paddingBottom: '5px',
    borderTop: '1px solid #eee', // Add separator
    marginTop: '5px',
  };

  const iconStyles = {
    padding: '0 10px', // Use padding for spacing instead of just left
    fontSize: '24px', // Increase icon size slightly
    color: '#333', // Darker icon color
  };

  return (
    <div style={footerStyles}>
      {/* Conditionally render controls based on fenMove */}
      {!fenMove && <Reset onReset={onReset} iconStyles={iconStyles} />}
      {!fenMove && <PreviousMove onPreviousMove={onPreviousMove} iconStyles={iconStyles} />}
      {!fenMove && <Play onPlay={onPlay} iconStyles={iconStyles} isPlaying={isPlaying} />}
      {!fenMove && <NextMove onNextMove={onNextMove} iconStyles={iconStyles} />}
      {!fenMove && <LastMove onLastMove={onLastMove} iconStyles={iconStyles} />}
      <Flip onFlipBoard={onFlipBoard} iconStyles={iconStyles} />
      <Download onDownload={onDownload} iconStyles={iconStyles} />
    </div>
  );
}

BoardFooter.propTypes = {
  fenMove: PropTypes.number,
  onDownload: PropTypes.func.isRequired,
  onNextMove: PropTypes.func.isRequired,
  onPreviousMove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFlipBoard: PropTypes.func.isRequired,
  onLastMove: PropTypes.func.isRequired,
  // onPlay is listed twice, remove one
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPlaying: PropTypes.bool, // Add missing isPlaying prop type
};

export default BoardFooter;

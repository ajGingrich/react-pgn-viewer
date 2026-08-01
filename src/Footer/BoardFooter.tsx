import React from 'react';
import Download from './Download';
import PreviousMove from './PreviousMove';
import NextMove from './NextMove';
import LastMove from './LastMove';
import Reset from './Reset';
import Flip from './Flip';
import Play from './Play';

interface BoardFooterProps {
  readonly onDownload: () => void;
  readonly onNextMove: () => void;
  readonly onPreviousMove: () => void;
  readonly onReset: () => void;
  readonly onFlipBoard: () => void;
  readonly onLastMove: () => void;
  readonly onPlay: () => void;
  readonly isPlaying: boolean;
  readonly fenMove: number | null;
  readonly width: number | string;
}

/**
 * Footer containing all navigation and control buttons for the chess viewer.
 */
const BoardFooter: React.FC<BoardFooterProps> = ({
  onDownload,
  onNextMove,
  onPreviousMove,
  onReset,
  onFlipBoard,
  onLastMove,
  onPlay,
  isPlaying,
  fenMove,
  width,
}) => {
  const footerStyles: React.CSSProperties = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    paddingTop: '10px',
    paddingBottom: '5px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
  };

  const iconStyles: React.CSSProperties = {
    paddingLeft: '20px',
  };

  const showNavigation = fenMove === null;

  return (
    <div style={footerStyles} role="toolbar" aria-label="Chess controls">
      {showNavigation && <Reset onClick={onReset} iconStyles={iconStyles} />}
      {showNavigation && <PreviousMove onClick={onPreviousMove} iconStyles={iconStyles} />}
      {showNavigation && <NextMove onClick={onNextMove} iconStyles={iconStyles} />}
      {showNavigation && <LastMove onClick={onLastMove} iconStyles={iconStyles} />}
      {showNavigation && <Play onClick={onPlay} iconStyles={iconStyles} isPlaying={isPlaying} />}
      <Flip onClick={onFlipBoard} iconStyles={iconStyles} />
      <Download onClick={onDownload} iconStyles={iconStyles} />
    </div>
  );
};

export default React.memo(BoardFooter);

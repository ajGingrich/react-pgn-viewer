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
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    width,
    padding: '10px 12px',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
  };

  const showNavigation = fenMove === null;

  return (
    <div style={footerStyles} role="toolbar" aria-label="Chess controls">
      {showNavigation && <Reset onClick={onReset} />}
      {showNavigation && <PreviousMove onClick={onPreviousMove} />}
      {showNavigation && <NextMove onClick={onNextMove} />}
      {showNavigation && <LastMove onClick={onLastMove} />}
      {showNavigation && <Play onClick={onPlay} isPlaying={isPlaying} />}
      <Flip onClick={onFlipBoard} />
      <Download onClick={onDownload} />
    </div>
  );
};

export default React.memo(BoardFooter);

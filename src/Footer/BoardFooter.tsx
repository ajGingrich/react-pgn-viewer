import React from 'react';
import Download from './Download';
import PreviousMove from './PreviousMove';
import NextMove from './NextMove';
import LastMove from './LastMove';
import Reset from './Reset';
import Flip from './Flip';
import Play from './Play';

interface BoardFooterProps {
  fenMove?: number;
  onDownload: () => void;
  onNextMove: () => void;
  onPreviousMove: () => void;
  onReset: () => void;
  onFlipBoard: () => void;
  onLastMove: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  width?: number | string;
  disableReset?: boolean;
  disablePrev?: boolean;
  disableNext?: boolean;
  disableLast?: boolean;
  disablePlay?: boolean;
}

const BoardFooter: React.FC<BoardFooterProps> = ({
  onDownload,
  onNextMove,
  onPreviousMove,
  onReset,
  onFlipBoard,
  width,
  onLastMove,
  onPlay,
  isPlaying,
  disableReset = false,
  disablePrev = false,
  disableNext = false,
  disableLast = false,
  disablePlay = false,
}) => {
  const footerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingTop: '10px',
    paddingBottom: '5px',
  };

  const iconStyles: React.CSSProperties = {
    paddingLeft: '20px',
  };

  return (
    <div style={footerStyles}>
      <Reset
        onReset={onReset}
        iconStyles={iconStyles}
        disabled={disableReset}
      />
      <PreviousMove
        onPreviousMove={onPreviousMove}
        iconStyles={iconStyles}
        disabled={disablePrev}
      />
      <NextMove
        onNextMove={onNextMove}
        iconStyles={iconStyles}
        disabled={disableNext}
      />
      <LastMove
        onLastMove={onLastMove}
        iconStyles={iconStyles}
        disabled={disableLast}
      />
      <Play
        onPlay={onPlay}
        iconStyles={iconStyles}
        isPlaying={isPlaying}
        disabled={disablePlay}
      />
      <Flip onFlipBoard={onFlipBoard} iconStyles={iconStyles} />
      <Download onDownload={onDownload} iconStyles={iconStyles} />
    </div>
  );
};

export default BoardFooter;

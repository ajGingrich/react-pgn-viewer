import React from 'react';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';

interface PlayProps {
  onPlay: () => void;
  isPlaying?: boolean;
  iconStyles: React.CSSProperties;
  disabled?: boolean;
}

const Play: React.FC<PlayProps> = ({
  onPlay,
  isPlaying,
  iconStyles,
  disabled = false,
}) => {
  const handlePlay = () => {
    if (disabled || typeof onPlay !== 'function') return;
    onPlay();
  };

  const combinedStyles: React.CSSProperties = {
    ...iconStyles,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return isPlaying ? (
    <PauseIcon onClick={handlePlay} style={combinedStyles} fontSize="large" />
  ) : (
    <PlayArrowIcon
      onClick={handlePlay}
      style={combinedStyles}
      fontSize="large"
    />
  );
};

export default Play;

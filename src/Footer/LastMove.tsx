import React from 'react';
import { SkipNext as SkipNextIcon } from '@mui/icons-material';

interface LastMoveProps {
  onLastMove: () => void;
  iconStyles: React.CSSProperties;
  disabled?: boolean;
}

const LastMove: React.FC<LastMoveProps> = ({
  onLastMove,
  iconStyles,
  disabled = false,
}) => {
  const handleLastMove = () => {
    if (disabled || typeof onLastMove !== 'function') return;
    onLastMove();
  };

  const combinedStyles: React.CSSProperties = {
    ...iconStyles,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <SkipNextIcon
      onClick={handleLastMove}
      style={combinedStyles}
      fontSize="large"
    />
  );
};

export default LastMove;

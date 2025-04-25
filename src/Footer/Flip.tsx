import React from 'react';
import { SwapVert as SwapVertIcon } from '@mui/icons-material';

interface FlipProps {
  onFlipBoard: () => void;
  iconStyles: React.CSSProperties;
}

const Flip: React.FC<FlipProps> = ({ onFlipBoard, iconStyles }) => {
  const handleFlipBoard = () => {
    if (typeof onFlipBoard !== 'function') return;
    onFlipBoard();
  };

  return (
    <SwapVertIcon
      onClick={handleFlipBoard}
      style={iconStyles}
      fontSize="large"
      sx={{ '&:hover': { cursor: 'pointer' } }}
    />
  );
};

export default Flip;

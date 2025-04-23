import React from 'react';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

interface NextMoveProps {
  onNextMove: () => void;
  iconStyles: React.CSSProperties;
  disabled?: boolean;
}

const NextMove: React.FC<NextMoveProps> = ({
  onNextMove,
  iconStyles,
  disabled = false,
}) => {
  const handleNextMove = () => {
    if (disabled || typeof onNextMove !== 'function') return;
    onNextMove();
  };

  const combinedStyles: React.CSSProperties = {
    ...iconStyles,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <ArrowForwardIosIcon
      onClick={handleNextMove}
      style={combinedStyles}
      fontSize="large"
    />
  );
};

export default NextMove;

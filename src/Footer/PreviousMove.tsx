import React from 'react';
import { ArrowBackIosNew as ArrowBackIosNewIcon } from '@mui/icons-material';

interface PreviousMoveProps {
  onPreviousMove: () => void;
  iconStyles: React.CSSProperties;
  disabled?: boolean;
}

const PreviousMove: React.FC<PreviousMoveProps> = ({
  onPreviousMove,
  iconStyles,
  disabled = false,
}) => {
  const handlePreviousMove = () => {
    if (disabled || typeof onPreviousMove !== 'function') return;
    onPreviousMove();
  };

  const combinedStyles: React.CSSProperties = {
    ...iconStyles,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <ArrowBackIosNewIcon
      onClick={handlePreviousMove}
      style={combinedStyles}
      fontSize="large"
    />
  );
};

export default PreviousMove;

import React from 'react';
import { SkipPrevious as SkipPreviousIcon } from '@mui/icons-material';

interface ResetProps {
  onReset: () => void;
  iconStyles: React.CSSProperties;
  disabled?: boolean;
}

const Reset: React.FC<ResetProps> = ({
  onReset,
  iconStyles,
  disabled = false,
}) => {
  const handleReset = () => {
    if (disabled || typeof onReset !== 'function') return;
    onReset();
  };

  const combinedStyles: React.CSSProperties = {
    ...iconStyles,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <SkipPreviousIcon
      onClick={handleReset}
      style={combinedStyles}
      fontSize="large"
    />
  );
};

export default Reset;

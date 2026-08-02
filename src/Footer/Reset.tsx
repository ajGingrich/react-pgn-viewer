import React, { useCallback } from 'react';
import type { FooterButtonProps } from '../types';

/**
 * Reset button - returns to the starting position.
 */
const Reset: React.FC<FooterButtonProps> = ({
  onClick,
  iconStyles,
  ariaLabel = 'Reset to start',
}) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ ...iconStyles, cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <i className="pgnIcon fa fa-step-backward fa-lg" aria-hidden="true" />
    </div>
  );
};

export default React.memo(Reset);

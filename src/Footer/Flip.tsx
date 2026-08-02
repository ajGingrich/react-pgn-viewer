import React, { useCallback } from 'react';
import type { FooterButtonProps } from '../types';

/**
 * Flip button - toggles board orientation between white and black.
 */
const Flip: React.FC<FooterButtonProps> = ({ onClick, iconStyles, ariaLabel = 'Flip board' }) => {
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
      <i className="pgnIcon fa fa-arrows-v fa-lg" aria-hidden="true" />
    </div>
  );
};

export default React.memo(Flip);

import React, { useCallback } from 'react';
import type { FooterButtonProps } from '../types';

/**
 * Next move button - advances one move forward.
 */
const NextMove: React.FC<FooterButtonProps> = ({
  onClick,
  iconStyles,
  ariaLabel = 'Next move',
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
      <i className="pgnIcon fa fa-chevron-right fa-lg" aria-hidden="true" />
    </div>
  );
};

export default React.memo(NextMove);

import React, { useCallback } from 'react';
import type { FooterButtonProps } from '../types';

/**
 * Last move button - jumps to the end of the game.
 */
const LastMove: React.FC<FooterButtonProps> = ({
  onClick,
  iconStyles,
  ariaLabel = 'Go to last move',
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
      <i className="pgnIcon fa fa-step-forward fa-lg" aria-hidden="true" />
    </div>
  );
};

export default React.memo(LastMove);

import React, { useCallback } from 'react';
import type { FooterButtonProps } from '../types';

/**
 * Download button - exports PGN or FEN file.
 */
const Download: React.FC<FooterButtonProps> = ({ onClick, iconStyles, ariaLabel = 'Download game' }) => {
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
    [onClick]
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
      <i className="pgnIcon fa fa-download fa-lg" aria-hidden="true" />
    </div>
  );
};

export default React.memo(Download);

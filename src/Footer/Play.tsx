import React, { useCallback } from 'react';
import type { PlayProps } from '../types';

/**
 * Play/Pause button - toggles automatic move playback.
 */
const Play: React.FC<PlayProps> = ({ onClick, iconStyles, isPlaying, ariaLabel }) => {
  const label = ariaLabel ?? (isPlaying ? 'Pause playback' : 'Start playback');

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

  const iconClass = isPlaying ? 'fa-pause' : 'fa-play';

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ ...iconStyles, cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={isPlaying}
    >
      <i className={`pgnIcon fa ${iconClass} fa-lg`} aria-hidden="true" />
    </div>
  );
};

export default React.memo(Play);

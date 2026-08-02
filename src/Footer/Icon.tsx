import React from 'react';

const PATHS: Record<string, string> = {
  play: 'M8 5v14l11-7z',
  pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  previous: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  next: 'M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z',
  reset: 'M6 6h2v12H6zm3.5 6l8.5 6V6z',
  last: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6z',
  flip: 'M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
};

export type IconName = keyof typeof PATHS;

interface IconProps {
  readonly name: IconName;
  readonly size?: number;
}

/**
 * Inline SVG icon (Material Design style) - no external icon font required.
 */
const Icon: React.FC<IconProps> = ({ name, size = 22 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d={PATHS[name]} />
  </svg>
);

export default React.memo(Icon);

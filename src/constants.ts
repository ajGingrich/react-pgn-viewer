export const MONTHS: readonly string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Board color defaults */
export const DEFAULT_COLORS = {
  BLACK_SQUARE: 'steelblue',
  WHITE_SQUARE: 'aliceblue',
  BACKGROUND: '#e1e5ed',
} as const;

/** Board defaults */
export const DEFAULTS = {
  WIDTH: 600,
  ORIENTATION: 'w' as const,
  SHOW_COORDINATES: true,
  PLAY_DELAY_MS: 1000,
  MOBILE_BREAKPOINT: 768,
} as const;

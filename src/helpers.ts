import type { CSSProperties } from 'react';
import baseStyles from './baseStyles';
import { DEFAULTS } from './constants';
import type { ResponsiveStyleResult, StyleParams } from './types';

/**
 * Extracts the active square from a chess move string.
 * Returns the destination square for normal moves, or castling destination.
 */
export const getActiveSquare = (moves: readonly string[], index: number): string | null => {
  if (!moves || index <= 0 || index > moves.length) {
    return null;
  }

  const move = moves[index - 1] as string;
  const isWhiteMove = (index - 1) % 2 === 0;

  // Handle castling
  if (move === 'O-O') {
    return isWhiteMove ? 'g1' : 'g8';
  }
  if (move === 'O-O-O') {
    return isWhiteMove ? 'c1' : 'c8';
  }

  // Extract destination square (last two characters of SAN)
  const match = move.match(/[a-h][1-8]/);
  return match ? match[0] : null;
};

/**
 * Applies style overrides to the base styles immutably.
 */
const applyStyleOverrides = (
  stylesToModify: ReadonlyArray<{
    area: 'base' | 'wrapper';
    property: string;
    value: string | number;
  }>,
): { base: CSSProperties; wrapper: CSSProperties } => {
  const modified = {
    base: { ...baseStyles.base },
    wrapper: { ...baseStyles.wrapper },
  };

  for (const { area, property, value } of stylesToModify) {
    modified[area] = { ...modified[area], [property]: value };
  }

  return modified;
};

/**
 * Calculates responsive styles based on window width and user configuration.
 */
export const getBaseStyles = ({
  windowWidth,
  backgroundColor,
  defaultWidth,
}: StyleParams): ResponsiveStyleResult => {
  const isMobile = windowWidth !== null && windowWidth < DEFAULTS.MOBILE_BREAKPOINT;
  const width = isMobile ? '100%' : defaultWidth;
  const flexDirection = isMobile ? 'column' : 'row';

  const styles = applyStyleOverrides([
    { area: 'base', property: 'flexDirection', value: flexDirection },
    { area: 'base', property: 'width', value: width },
    { area: 'wrapper', property: 'width', value: width },
    { area: 'wrapper', property: 'background', value: backgroundColor },
  ]);

  return {
    width,
    isMobile,
    baseStyles: styles.base,
    wrapperStyles: styles.wrapper,
  };
};

/**
 * Sanitizes PGN header values to prevent XSS attacks.
 * Strips potentially dangerous characters and limits length.
 */
export const sanitizeHeaderValue = (value: string): string => {
  if (typeof value !== 'string') return '';
  // Remove angle brackets, script tags, and limit length
  return value
    .replace(/[<>]/g, '')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim()
    .slice(0, 200);
};

/**
 * Validates that a PGN string has basic structure before parsing.
 */
export const isValidPgn = (pgn: string): boolean => {
  if (typeof pgn !== 'string' || pgn.trim().length === 0) {
    return false;
  }
  // Basic validation: should have at least one move (number followed by period)
  return /\d+\.\s*\S+/.test(pgn);
};

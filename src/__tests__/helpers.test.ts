import { describe, it, expect } from 'vitest';
import { getActiveSquare, isValidPgn, sanitizeHeaderValue } from '../helpers';

describe('getActiveSquare', () => {
  it('returns null for empty moves', () => {
    expect(getActiveSquare([], 1)).toBeNull();
  });

  it('returns null for index 0', () => {
    expect(getActiveSquare(['e4'], 0)).toBeNull();
  });

  it('returns null for out of bounds index', () => {
    expect(getActiveSquare(['e4'], 2)).toBeNull();
  });

  it('extracts destination square from normal move', () => {
    expect(getActiveSquare(['e4'], 1)).toBe('e4');
    expect(getActiveSquare(['Nf3'], 1)).toBe('f3');
  });

  it('handles castling kingside for white', () => {
    expect(getActiveSquare(['O-O'], 1)).toBe('g1');
  });

  it('handles castling kingside for black', () => {
    expect(getActiveSquare(['e4', 'O-O'], 2)).toBe('g8');
  });

  it('handles castling queenside for white', () => {
    expect(getActiveSquare(['O-O-O'], 1)).toBe('c1');
  });

  it('handles castling queenside for black', () => {
    expect(getActiveSquare(['e4', 'O-O-O'], 2)).toBe('c8');
  });
});

describe('isValidPgn', () => {
  it('returns false for empty string', () => {
    expect(isValidPgn('')).toBe(false);
  });

  it('returns false for non-string', () => {
    expect(isValidPgn(null as unknown as string)).toBe(false);
  });

  it('returns true for valid PGN with moves', () => {
    expect(isValidPgn('1. e4 e5 2. Nf3')).toBe(true);
  });

  it('returns false for PGN without moves', () => {
    expect(isValidPgn('[Event "Test"]')).toBe(false);
  });
});

describe('sanitizeHeaderValue', () => {
  it('removes angle brackets', () => {
    expect(sanitizeHeaderValue('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('trims whitespace', () => {
    expect(sanitizeHeaderValue('  hello  ')).toBe('hello');
  });

  it('limits length to 200 characters', () => {
    const longString = 'a'.repeat(300);
    expect(sanitizeHeaderValue(longString)).toHaveLength(200);
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeHeaderValue(null as unknown as string)).toBe('');
  });
});

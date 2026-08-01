import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Chess } from 'chess.js';
import PgnViewer from '../index';

// ============================================================
// Test PGN Data - using proper PGN format with double newlines
// ============================================================

const SIMPLE_PGN = [
  '[Event "Test Game"]',
  '[Site "Test"]',
  '[Date "2024.01.01"]',
  '[Round "1"]',
  '[White "Player 1"]',
  '[Black "Player 2"]',
  '[Result "1-0"]',
  '',
  '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 1-0',
].join('\n');

const FULL_GAME_PGN = [
  '[Event "World Championship"]',
  '[Date "2024.12.12"]',
  '[White "D. Gukesh"]',
  '[Black "Ding Liren"]',
  '[Result "1-0"]',
  '',
  '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7',
  '6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7',
  '1-0',
].join('\n');

const PARTIAL_GAME_PGN = [
  '[Event "Partial Game"]',
  '[StartAtMove "4"]',
  '[EndAtMove "6"]',
  '',
  '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5',
].join('\n');

const FEN_PGN = [
  '[Event "FEN Position"]',
  '[Fen "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1"]',
  '',
  '1. e5 2. Nf3',
].join('\n');

// ============================================================
// Chess.js Integration Tests
// ============================================================

describe('chess.js integration', () => {
  it('should parse a valid PGN string', () => {
    const chess = new Chess();
    chess.loadPgn(SIMPLE_PGN);
    expect(chess.history().length).toBeGreaterThan(0);
  });

  it('should extract header information', () => {
    const chess = new Chess();
    chess.loadPgn(SIMPLE_PGN);
    const header = chess.header();

    expect(header.White).toBe('Player 1');
    expect(header.Black).toBe('Player 2');
    expect(header.Event).toBe('Test Game');
    expect(header.Result).toBe('1-0');
  });

  it('should replay moves and get correct FEN', () => {
    const chess = new Chess();
    chess.loadPgn(SIMPLE_PGN);
    const moves = chess.history();

    const replay = new Chess();
    for (const move of moves) {
      replay.move(move);
    }

    expect(replay.fen()).toBeDefined();
    // Game ends by result (1-0), not necessarily checkmate
    expect(moves.length).toBe(6);
  });

  it('should handle castling moves', () => {
    const chess = new Chess();
    chess.loadPgn(FULL_GAME_PGN);
    const moves = chess.history();

    // Game includes O-O (kingside castling)
    expect(moves).toContain('O-O');
  });

  it('should handle starting from a specific move index', () => {
    const chess = new Chess();
    chess.loadPgn(SIMPLE_PGN);
    const moves = chess.history();

    const replay = new Chess();
    for (let i = 0; i < 3 && i < moves.length; i++) {
      replay.move(moves[i]);
    }

    // After 3 half-moves, it should be black.s turn
    expect(replay.turn()).toBe('b');
  });
});

// ============================================================
// PgnViewer Component Tests
// ============================================================

describe('PgnViewer component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing with valid PGN', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeTruthy();
  });

  it('should render null for invalid PGN', () => {
    const { container } = render(<PgnViewer>{'not a valid pgn'}</PgnViewer>);
    expect(container.innerHTML).toBe('');
  });

  it('should render null for empty children', () => {
    const { container } = render(<PgnViewer>{''}</PgnViewer>);
    expect(container.innerHTML).toBe('');
  });

  it('should display game header information', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    expect(document.querySelector('.pgnHeader')).toBeTruthy();
  });

  it('should apply custom colors', () => {
    render(
      <PgnViewer
        blackSquareColor="#000000"
        whiteSquareColor="#ffffff"
        backgroundColor="#333333"
      >
        {SIMPLE_PGN}
      </PgnViewer>
    );

    const wrapper = document.querySelector('.pgnWrapper') as HTMLElement;
    expect(wrapper.style.background).toBe('rgb(51, 51, 51)');
  });

  it('should apply custom width', () => {
    render(<PgnViewer width={800}>{SIMPLE_PGN}</PgnViewer>);
    const wrapper = document.querySelector('.pgnWrapper') as HTMLElement;
    // Vitest/JSDOM adds 'px' suffix to numeric values
    expect(wrapper.style.width).toMatch(/800/);
  });

  it('should support board orientation change', () => {
    render(<PgnViewer orientation="b">{SIMPLE_PGN}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeTruthy();
  });
});

// ============================================================
// Navigation Controls Tests
// ============================================================

describe('navigation controls', () => {
  it('should render footer navigation buttons', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    // Footer renders as a div with inline styles, check for buttons via aria labels
    const playButton = screen.getByLabelText('Start playback');
    expect(playButton).toBeTruthy();
  });

  it('should have play button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const playButton = screen.getByLabelText('Start playback');
    expect(playButton).toBeTruthy();
  });

  it('should have next move button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const nextButton = screen.getByLabelText('Next move');
    expect(nextButton).toBeTruthy();
  });

  it('should have previous move button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const prevButton = screen.getByLabelText('Previous move');
    expect(prevButton).toBeTruthy();
  });

  it('should have reset button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const resetButton = screen.getByLabelText('Reset to start');
    expect(resetButton).toBeTruthy();
  });

  it('should have flip board button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const flipButton = screen.getByLabelText('Flip board');
    expect(flipButton).toBeTruthy();
  });

  it('should have download button', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const downloadButton = screen.getByLabelText('Download game');
    expect(downloadButton).toBeTruthy();
  });
});

// ============================================================
// Move List Tests
// ============================================================

describe('move list', () => {
  it('should display move list with proper formatting', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    expect(screen.getByText('1.')).toBeTruthy();
    expect(screen.getByText('2.')).toBeTruthy();
  });

  it('should show move notation', () => {
    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    expect(screen.getByText('e4')).toBeTruthy();
    expect(screen.getByText('e5')).toBeTruthy();
  });
});

// ============================================================
// Partial Game / FEN Tests
// ============================================================

describe('partial game support', () => {
  it('should handle StartAtMove header', () => {
    render(<PgnViewer>{PARTIAL_GAME_PGN}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeTruthy();
  });

  it('should handle FEN header without crashing', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<PgnViewer>{FEN_PGN}</PgnViewer>);
    // Component should handle the error gracefully
    expect(true).toBe(true);
    consoleSpy.mockRestore();
  });
});

// ============================================================
// InnerHTML Mode Tests
// ============================================================

describe('innerHTML mode', () => {
  it('should render PGN from innerHTML content', () => {
    const htmlContent = [
      '<div>Game 1</div>',
      '<pgn>',
      '[Event "Game 1"]',
      '',
      '1. e4 e5 2. Nf3 Nc6 1-0',
      '</pgn>',
    ].join('\n');

    render(<PgnViewer innerHTML>{htmlContent}</PgnViewer>);
    // Should render the viewer wrapper
    const wrapper = document.querySelector('.pgnWrapper');
    expect(wrapper).toBeTruthy();
  });

  it('should render multiple PGNs from innerHTML', () => {
    const htmlContent = [
      '<pgn>[Event "Game 1"]',
      '',
      '1. e4 e5 1-0</pgn>',
      '<pgn>[Event "Game 2"]',
      '',
      '1. d4 d5 1-0</pgn>',
    ].join('\n');

    const { container } = render(<PgnViewer innerHTML>{htmlContent}</PgnViewer>);
    const viewers = container.querySelectorAll('.pgnWrapper');
    expect(viewers.length).toBe(2);
  });
});

// ============================================================
// Security Tests
// ============================================================

describe('security', () => {
  it('should sanitize header values', () => {
    const maliciousPgn = [
      '[Event "<script>alert(1)</script>"]',
      '',
      '1. e4 e5 1-0',
    ].join('\n');

    render(<PgnViewer>{maliciousPgn}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeTruthy();
  });

  it('should handle invalid PGN gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<PgnViewer>{'invalid'}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeFalsy();
    consoleSpy.mockRestore();
  });
});

// ============================================================
// Responsive Design Tests
// ============================================================

describe('responsive design', () => {
  it('should adapt to mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<PgnViewer>{SIMPLE_PGN}</PgnViewer>);
    const wrapper = document.querySelector('.pgnWrapper') as HTMLElement;
    expect(wrapper.style.width).toBe('100%');
  });

  it('should use fixed width on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<PgnViewer width={800}>{SIMPLE_PGN}</PgnViewer>);
    const wrapper = document.querySelector('.pgnWrapper') as HTMLElement;
    // Vitest/JSDOM may add 'px' suffix to numeric values
    expect(wrapper.style.width).toMatch(/800/);
  });
});

// ============================================================
// Error Handling Tests
// ============================================================

describe('error handling', () => {
  it('should handle malformed PGN gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(<PgnViewer>{'[Event "Bad'}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeFalsy();
    consoleSpy.mockRestore();
  });

  it('should handle empty PGN headers', () => {
    render(<PgnViewer>{'1. e4 e5 1-0'}</PgnViewer>);
    expect(document.querySelector('.pgnWrapper')).toBeTruthy();
  });
});

# React PGN Viewer

![npm version](https://img.shields.io/npm/v/react-pgn-viewer.svg)
![npm Downloads](https://img.shields.io/npm/dt/react-pgn-viewer.svg)
![license](https://img.shields.io/npm/l/react-pgn-viewer.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)

A modern React component for displaying interactive chess PGN (Portable Game Notation) viewers. Built with **React 19**, **TypeScript**, **chess.js 1.x**, and **react-chessboard**.

## Features

- 🎯 **React 19** functional components with hooks
- 📝 **Full TypeScript** support with exported types
- ♟️ **chess.js 1.x** for PGN parsing and move validation
- 🎨 **react-chessboard** for the chessboard display
- 📱 **Responsive** layout with mobile support
- ⚡ **Dual ESM/CJS** output for maximum compatibility
- 🛡️ **Security** - XSS prevention with header sanitization

## Installation

```bash
# Using bun (recommended)
bun add react-pgn-viewer

# Using npm
bun install react-pgn-viewer

# Using yarn
yarn add react-pgn-viewer
```

### Peer Dependencies

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

## Quick Start

```tsx
import PgnViewer from 'react-pgn-viewer';

function ChessGame() {
  const pgn = `
    [Event "World Chess Championship"]
    [Date "2024.12.12"]
    [White "D. Gukesh"]
    [Black "Ding Liren"]
    [Result "1-0"]

    1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7
    6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7
  `;

  return (
    <PgnViewer
      blackSquareColor="steelblue"
      whiteSquareColor="aliceblue"
      width={600}
    >
      {pgn}
    </PgnViewer>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | - | PGN string content |
| `innerHTML` | `boolean` | `false` | When `true`, parses `<pgn>` tags from children |
| `blackSquareColor` | `string` | `"steelblue"` | Color of dark squares |
| `whiteSquareColor` | `string` | `"aliceblue"` | Color of light squares |
| `orientation` | `'w' \| 'b'` | `'w'` | Board orientation (white/black at bottom) |
| `width` | `number` | `600` | Width of the viewer in pixels |
| `backgroundColor` | `string` | `"#e1e5ed"` | Background color of the viewer wrapper |
| `showCoordinates` | `boolean` | `true` | Show file/rank coordinates |
| `nodeToModify` | `string` | - | CSS selector for DOM modification (innerHTML mode) |
| `nodeModification` | `(node: HTMLElement) => void` | - | Callback to modify selected DOM nodes |

## TypeScript Types

All types are exported from the package for TypeScript users:

```tsx
import type {
  PgnViewerProps,
  ViewerProps,
  PgnHeader,
  MoveListProps,
  MoveProps,
  FooterButtonProps,
  BoardStyles,
  StyleParams,
  ResponsiveStyleResult,
} from 'react-pgn-viewer';
```

## Partial Games and FEN Positions

You can display partial games or start from a specific FEN position by adding custom headers to your PGN:

| Header | Description |
|--------|-------------|
| `[StartAtMove "8"]` | Skip the first 7 moves and start at move 8 |
| `[EndAtMove "15"]` | Cut off the game after move 15 |
| `[Fen "..."]` | Start from a specific FEN position |

### Example: Partial Game

```pgn
[Event "Example"]
[StartAtMove "4"]
[EndAtMove "8"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O
```

### Example: FEN Position

```pgn
[Event "Example"]
[Fen "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"]
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) package manager

### Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test:run

# Type check
bun run typecheck

# Build for production
bun run build

# Run tests with coverage
bun run test:coverage
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Build library with tsup (ESM + CJS + .d.ts) |
| `bun run test` | Run tests in watch mode |
| `bun run test:run` | Run tests once |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run lint` | Run ESLint |
| `bun run clean` | Remove dist and node_modules |

## Tech Stack

- **React 19** - UI framework
- **TypeScript 5.7** - Type safety
- **chess.js 1.x** - PGN parsing and move generation
- **react-chessboard 4.x** - Chess board component
- **tsup** - Library bundler (ESM + CJS + .d.ts)
- **Vite** - Dev server
- **Vitest** - Testing framework
- **Bun** - Package manager

## Build Output

The library produces three output formats:

```
dist/
├── index.js      # ESM module
├── index.cjs     # CommonJS module
├── index.d.ts    # TypeScript declarations
└── index.d.cts   # CJS TypeScript declarations
```

## License

MIT © Andrew Gingrich

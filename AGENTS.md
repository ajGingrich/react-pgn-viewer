# AGENTS.md

This file provides context for AI coding agents working on this codebase.

> **IMPORTANT**: This project uses **Bun** as its package manager and runtime. All commands must use `bun`, never `npm` or `yarn`. Do not generate `package-lock.json` or `yarn.lock`.

> **IMPORTANT**: This project uses **Bun** as its package manager and runtime. All commands must use `bun`, never `npm` or `yarn`. Do not generate `package-lock.json` or `yarn.lock`.

## Project Overview

**react-pgn-viewer** is a React component library for displaying interactive chess PGN (Portable Game Notation) viewers. It renders a chessboard with move navigation controls.

- **Version**: 2.0.0
- **License**: MIT
- **Author**: Andrew Gingrich

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework (peer dependency: ^18 or ^19) |
| TypeScript 5.7 | Type safety and exports |
| chess.js 1.x | PGN parsing and move validation |
| react-chessboard 4.x | Chess board rendering |
| tsup | Library bundler (ESM + CJS + .d.ts) |
| Vite 6 | Dev server |
| Vitest 2 | Testing framework |
| Bun | Package manager |
| Prettier | Code formatting |
| ESLint 9 | Linting (flat config) |

## Commands

```bash
bun install              # Install dependencies
bun run dev              # Start Vite dev server (port 3000)
bun run build            # Build library with tsup
bun run test:run         # Run tests once
bun run test             # Run tests in watch mode
bun run typecheck        # TypeScript type checking
bun run format           # Format all files with Prettier
bun run format:check     # Check formatting (used in CI)
bun run lint             # Run ESLint
bun run clean            # Remove dist and node_modules
```

## Project Structure

```
src/
  index.tsx              # Main PgnViewer component (entry point)
  Viewer.tsx             # Inner Viewer component (board + controls)
  BoardHeader.tsx        # Game info header (players, event, date)
  helpers.ts             # Utility functions (PGN validation, styles, sanitization)
  constants.ts           # Default values and constants
  types.ts               # TypeScript interfaces and types
  baseStyles.ts          # Base CSS styles for the viewer
  Footer/
    BoardFooter.tsx      # Footer container with navigation buttons
    Play.tsx             # Play/pause button
    NextMove.tsx         # Next move button
    PreviousMove.tsx     # Previous move button
    Reset.tsx            # Reset to start button
    LastMove.tsx         # Jump to last move button
    Flip.tsx             # Flip board orientation button
    Download.tsx         # Download PGN button
  Moves/
    MoveList.tsx         # Move list display
    Move.tsx             # Individual move component
  __tests__/
    helpers.test.ts      # Tests for helper functions
    viewer.test.tsx      # Tests for Viewer component
examples/
  App.tsx                # Example app with two demo games
  main.tsx               # Vite dev server entry point
index.html               # HTML entry point for Vite dev server
```

## Key Architecture

### Component Hierarchy

```
PgnViewer (src/index.tsx)
  → Parses PGN, validates input
  → Handles innerHTML mode (multiple PGNs)
  → Renders Viewer component

Viewer (src/Viewer.tsx)
  → Manages game state (FEN, moves, current index)
  → Renders Chessboard, MoveList, BoardFooter
  → Handles navigation, auto-play, flip, download
```

### PGN Flow

1. PGN string passed as `children` to `<PgnViewer>`
2. `isValidPgn()` validates basic structure (checks for move notation)
3. `parsePgn()` uses chess.js `loadPgn()` to extract headers and moves
4. Custom headers (StartAtMove, EndAtMove, Fen) are pre-parsed before chess.js
5. Board position is replayed to the starting index
6. Navigation controls move through the game

### Module Output

The library ships as:
- `dist/index.js` — ESM module
- `dist/index.cjs` — CommonJS module
- `dist/index.d.ts` — TypeScript declarations
- `dist/index.d.cts` — CJS TypeScript declarations

## Conventions

### Code Style
- Functional components with hooks (no class components)
- TypeScript strict mode — no `any` types allowed
- `React.memo()` on exported components for performance
- `useCallback` for event handlers, `useMemo` for derived values
- `readonly` on all interface properties

### File Naming
- PascalCase for component files (e.g., `BoardFooter.tsx`)
- camelCase for utility files (e.g., `helpers.ts`)
- Test files: `*.test.ts` or `*.test.tsx` in `src/__tests__/`

### Testing
- Vitest with jsdom environment
- `@testing-library/react` for component tests
- Run `bun run test:run` before committing
- 47+ tests covering helpers, sanitization, PGN validation, and component rendering

### Security
- `sanitizeHeaderValue()` strips `<`, `>`, and script tags from PGN headers
- `isValidPgn()` validates basic PGN structure before parsing
- Input validation on all public props

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on PRs:
1. Format check (`bun run format:check`)
2. Type check (`bun run typecheck`)
3. Tests (`bun run test:run`)
4. Build (`bun run build`)

## Common Tasks

### Adding a new prop
1. Add to `PgnViewerProps` in `src/types.ts`
2. Add to `ViewerProps` in `src/types.ts` if it reaches the Viewer
3. Destructure with default in `src/index.tsx` and/or `src/Viewer.tsx`
4. Pass through to child components as needed
5. Update README.md Props table
6. Add tests

### Adding a new footer button
1. Create component in `src/Footer/` extending `FooterButtonProps`
2. Add handler in `Viewer.tsx`
3. Pass handler to `BoardFooter.tsx`
4. Add `ariaLabel` for accessibility
5. Add test in `viewer.test.tsx`

### Modifying build output
- Edit `tsup.config.ts` for build configuration
- Edit `package.json` exports for module resolution

## Browser Testing

The project has a built-in `browser-use` agent that automates Chrome via DevTools. Use it to:
- Verify the dev server renders correctly at `http://localhost:3000`
- Check for console errors
- Validate UI interactions

Start the dev server first: `bun run dev`

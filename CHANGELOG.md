# Changelog

## 2.0.1 (2026-08-02)

### Fixed

- **InnerHTML mode no longer hides page content**: The raw HTML was previously rendered in a hidden `display: none` container with chess viewers appended afterward, which made surrounding prose invisible. The viewer now renders the HTML visibly and mounts a viewer in place of each `<pgn>` node, so surrounding content (paragraphs, headings, code blocks) displays correctly.
- **Server-side rendering (SSR) compatibility**: Viewers are now mounted with `createRoot` inside the `<pgn>` nodes rather than rendered as siblings, avoiding hydration mismatch warnings when the component is server-rendered (e.g. in Next.js).

### Added

- `examples/ssr/` example demonstrating server-side rendering with client hydration.

## 2.0.0 (2026-08-01)

### ⚠️ Breaking Changes

- **React 19 support**: Minimum peer dependency is now React 18 or 19 (was React 16)
- **TypeScript**: Package is now written in TypeScript with full type definitions
- **chess.js 1.x**: Uses `loadPgn()` API instead of `load_pgn()` from chess.js 0.10
- **react-chessboard**: Replaced `reactjs-chessboard` with `react-chessboard` v4
- **Build system**: Gulp replaced with tsup (ESM + CJS + .d.ts) and Bun package manager
- **Module format**: Dual ESM/CJS output (`dist/index.js` and `dist/index.cjs`)

### Added

- Full TypeScript support with exported types (`PgnViewerProps`, `ViewerProps`, `PgnHeader`, etc.)
- `showCoordinates` prop to control board coordinate display (maps to `showBoardNotation`)
- `backgroundColor` prop for custom viewer background color
- `nodeToModify` and `nodeModification` props for DOM manipulation
- `innerHTML` mode for rendering multiple PGN games from HTML content
- Vitest test suite with 47+ tests
- GitHub Actions CI workflow (typecheck, test, build)
- Vite dev server for development

### Fixed

- XSS prevention via `sanitizeHeaderValue` for PGN header content
- Auto-play timer uses refs to avoid stale closure bugs
- URL object revocation timing for downloads
- InnerHTML mode correctly extracts PGNs from children string

### Removed

- Gulp build system
- Babel configuration
- Legacy JavaScript source files (replaced with TypeScript)

## 1.0.0

- Initial release with React 16 class components

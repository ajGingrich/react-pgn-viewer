# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.0] - 2025-04-04

### Added

- Initial release based on refactored codebase.
- Core PGN viewer functionality with board, moves, and controls.
- Support for parsing PGN strings directly or processing `<pgn>` tags within HTML content.
- Props for customizing appearance (colors, width, orientation, coordinates).
- Basic handling for `StartAtMove`, `EndAtMove`, and `Fen` headers.

### Changed

- Migrated build system to Vite.
- Refactored codebase to TypeScript.
- Updated dependencies, including `react-chessboard`.
- Replaced Font Awesome with Material UI Icons for controls.

### Removed

- Removed previous build system and configurations.
- Removed direct dependency on Font Awesome CSS.

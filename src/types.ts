// ============================================================
// Chess Game Types
// ============================================================

/** Parsed PGN header information */
export interface PgnHeader {
  Event?: string;
  Site?: string;
  Date?: string;
  Round?: string;
  White?: string;
  Black?: string;
  Result?: string;
  WhiteElo?: string;
  BlackElo?: string;
  ECO?: string;
  PlyCount?: string;
  EventDate?: string;
  Fen?: string;
  StartAtMove?: string;
  EndAtMove?: string;
  [key: string]: string | undefined;
}

// ============================================================
// Component Props Types
// ============================================================

/** Props for the main PgnViewer component */
export interface PgnViewerProps {
  /** PGN string content (when not using innerHTML mode) */
  readonly children?: string;
  /** When true, renders children as innerHTML */
  readonly innerHTML?: boolean;
  /** CSS color for dark squares */
  readonly blackSquareColor?: string;
  /** CSS color for light squares */
  readonly whiteSquareColor?: string;
  /** Board orientation: 'w' for white, 'b' for black */
  readonly orientation?: 'w' | 'b';
  /** Board width in pixels (or '100%' for responsive) */
  readonly width?: number;
  /** Background color of the viewer wrapper */
  readonly backgroundColor?: string;
  /** CSS selector for DOM nodes to modify after render */
  readonly nodeToModify?: string;
  /** Callback function to apply modifications to selected nodes */
  readonly nodeModification?: (node: HTMLElement) => void;
}

/** Props for the inner Viewer component */
export interface ViewerProps {
  /** Raw PGN string to parse and display */
  readonly pgnInformation: string;
  /** CSS color for dark squares */
  readonly blackSquareColor?: string;
  /** CSS color for light squares */
  readonly whiteSquareColor?: string;
  /** Board width in pixels */
  readonly width?: number;
  /** Board orientation */
  readonly orientation?: 'w' | 'b';
  /** Background color */
  readonly backgroundColor?: string;
}

/** Props for the BoardHeader component */
export interface BoardHeaderProps {
  /** Parsed header information from PGN */
  readonly headerInfo: PgnHeader;
  /** Width of the header (matches board width) */
  readonly width: number | string;
}

/** Props for the MoveList component */
export interface MoveListProps {
  /** Array of move strings */
  readonly moves: readonly string[];
  /** Currently active move index */
  readonly currentIndex: number;
  /** Callback when a move is clicked */
  readonly onChangeMove: (moveIndex: number) => void;
  /** Width of the move list container */
  readonly width: number | string;
  /** Starting move index (for partial games) */
  readonly startAtMove: number;
  /** Ending move index (for partial games) */
  readonly endAtMove: number;
  /** FEN-based move offset (for games starting from FEN) */
  readonly fenMove: number | null;
}

/** Props for an individual Move component */
export interface MoveProps {
  /** The move string (SAN notation) */
  readonly move: string;
  /** 1-based index of this move */
  readonly moveIndex: number;
  /** Currently active move index */
  readonly currentIndex: number;
  /** Callback when this move is clicked */
  readonly onChangeMove: (moveIndex: number) => void;
}

/** Props for footer button components */
export interface FooterButtonProps {
  /** Click handler */
  readonly onClick: () => void;
  /** Icon styles */
  readonly iconStyles: React.CSSProperties;
  /** Accessibility label */
  readonly ariaLabel?: string;
}

/** Props for Play button */
export interface PlayProps extends FooterButtonProps {
  /** Whether playback is active */
  readonly isPlaying: boolean;
}

/** Style configuration for the board */
export interface BoardStyles {
  readonly base: React.CSSProperties;
  readonly wrapper: React.CSSProperties;
}

/** Style parameters for responsive calculations */
export interface StyleParams {
  readonly windowWidth: number | null;
  readonly backgroundColor: string;
  readonly defaultWidth: number;
}

/** Result of responsive style calculation */
export interface ResponsiveStyleResult {
  readonly width: number | string;
  readonly isMobile: boolean;
  readonly baseStyles: React.CSSProperties;
  readonly wrapperStyles: React.CSSProperties;
}

import { Move as ChessJsMove, Square } from 'chess.js';

export type VerboseMove = Omit<ChessJsMove, 'lan' | 'san'> & {
  lan: string;
  san: string;
  piece: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  flags: string;
  from: Square;
  to: Square;
};

export interface PgnHeaders {
  [key: string]: string | undefined;
  White?: string;
  Black?: string;
  Date?: string;
  Event?: string;
  Site?: string;
  Round?: string;
  Result?: string;
  WhiteElo?: string;
  BlackElo?: string;
  PlyCount?: string;
  ECO?: string;
  Opening?: string;
  Variation?: string;
  EventDate?: string;
  StartAtMove?: string;
  EndAtMove?: string;
  Fen?: string;
}

export interface BaseStyles {
  display: string;
  justifyContent: string;
  flexDirection: string;
  width?: number | string;
  background?: string;
}

export interface WrapperStyles {
  width: number | string;
  background: string;
}

export interface ViewerStyleInfo {
  baseStyles: React.CSSProperties;
  wrapperStyles: React.CSSProperties;
  isMobile: boolean;
  width: number | string;
}

export interface StyleModification {
  area: 'base' | 'wrapper';
  stylePair: [keyof React.CSSProperties, string | number];
}

export interface GetBaseStylesParams {
  windowWidth?: number | null;
  backgroundColor: string;
  defaultWidth: number | string;
}

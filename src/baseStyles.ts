import type { CSSProperties } from 'react';

export interface BoardStyles {
  readonly base: CSSProperties;
  readonly wrapper: CSSProperties;
}

const baseStyles: BoardStyles = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wrapper: {
    width: 500,
    background: 'white',
  },
} as const;

export default baseStyles;

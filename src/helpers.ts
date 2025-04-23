import React from 'react';
import { Square } from 'chess.js';
import baseStyles from './baseStyles.ts';
import {
  GetBaseStylesParams,
  ViewerStyleInfo,
  StyleModification,
} from './types.ts';

interface ModifiedStyles {
  base: React.CSSProperties;
  wrapper: React.CSSProperties;
}

const getActiveSquare = (
  moves: string[] | undefined,
  index: number | undefined
): Square | null => {
  if (!moves || !index || index <= 0 || index > moves.length) {
    return null;
  }

  const moveIndex = index - 1;
  const move = moves[moveIndex];
  const isWhiteMove = moveIndex % 2 === 0;
  let activeSquare: Square | null = null;

  switch (move) {
    case 'O-O':
      activeSquare = isWhiteMove ? 'g1' : 'g8';
      break;
    case 'O-O-O':
      activeSquare = isWhiteMove ? 'c1' : 'c8';
      break;
    default: {
      const match = move.match(/([a-h][1-8])/);
      const promotionMatch = move.match(/([a-h][1-8])=[QRNB]/);
      if (promotionMatch && promotionMatch[1]) {
        activeSquare = promotionMatch[1] as Square;
      } else {
        const squareMatches = move.match(/[a-h][1-8]/g);
        if (squareMatches && squareMatches.length > 0) {
          activeSquare = squareMatches[squareMatches.length - 1] as Square;
        }
      }
      if (!activeSquare && match && match[0]) {
        activeSquare = match[0] as Square;
      }
      break;
    }
  }

  return activeSquare;
};

const setStyle = (stylesToModify: StyleModification[]): ModifiedStyles => {
  const styleClone = JSON.parse(JSON.stringify(baseStyles)) as ModifiedStyles;

  for (const style of stylesToModify) {
    const { area, stylePair } = style;
    const [key, value] = stylePair;

    (styleClone[area] as any)[key] = value;
  }

  return styleClone;
};

const getBaseStyles = (params: GetBaseStylesParams): ViewerStyleInfo => {
  const { windowWidth, backgroundColor, defaultWidth } = params;
  const currentWindowWidth = windowWidth ?? 1024;
  const isScreenMobile = currentWindowWidth < 768;
  const width = isScreenMobile ? '100%' : defaultWidth;
  const flexDirection: 'column' | 'row' = isScreenMobile ? 'column' : 'row';
  const stylesToModify: StyleModification[] = [];

  stylesToModify.push({ area: 'base', stylePair: ['width', width] });
  stylesToModify.push({
    area: 'base',
    stylePair: ['flexDirection', flexDirection],
  });
  stylesToModify.push({ area: 'wrapper', stylePair: ['width', width] });
  stylesToModify.push({
    area: 'wrapper',
    stylePair: ['background', backgroundColor],
  });

  const styles = setStyle(stylesToModify);

  return {
    width,
    isMobile: isScreenMobile,
    baseStyles: styles.base,
    wrapperStyles: styles.wrapper,
  };
};

export { getActiveSquare, getBaseStyles };

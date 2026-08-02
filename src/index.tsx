import React, { useEffect, useRef, useCallback } from 'react';
import Viewer from './Viewer';
import { isValidPgn } from './helpers';
import { DEFAULTS } from './constants';
import type { PgnViewerProps } from './types';

/**
 * React PGN Viewer - A chess game viewer component.
 *
 * Supports two modes:
 * 1. Direct PGN mode: Pass PGN string as children
 * 2. InnerHTML mode: Renders HTML with embedded <pgn> tags
 *
 * @example
 * // Direct PGN mode
 * <PgnViewer>{pgnString}</PgnViewer>
 *
 * @example
 * // InnerHTML mode
 * <PgnViewer innerHTML>{'<div>Content</div><pgn>PGN_DATA</pgn>'}</PgnViewer>
 */
const PgnViewer: React.FC<PgnViewerProps> = ({
  children,
  innerHTML = false,
  blackSquareColor,
  whiteSquareColor,
  orientation = DEFAULTS.ORIENTATION,
  width = DEFAULTS.WIDTH,
  backgroundColor = '#e1e5ed',
  showCoordinates = DEFAULTS.SHOW_COORDINATES,
  nodeToModify,
  nodeModification,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Applies DOM modifications after render if configured.
   */
  const applyDomModifications = useCallback(() => {
    if (!nodeToModify || typeof nodeModification !== 'function' || !containerRef.current) {
      return;
    }

    try {
      const nodes = containerRef.current.querySelectorAll(nodeToModify);
      nodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          nodeModification(node);
        }
      });
    } catch (error) {
      console.warn('[react-pgn-viewer] Error applying DOM modifications:', error);
    }
  }, [nodeToModify, nodeModification]);

  /**
   * Extracts PGN content from innerHTML children.
   */
  const extractPgnsFromHtml = useCallback((htmlContent: string): string[] => {
    const pgns: string[] = [];
    const regex = /<pgn>([\s\S]*?)<\/pgn>/gi;
    let match;

    while ((match = regex.exec(htmlContent)) !== null) {
      const pgn = match[1]?.trim();
      if (pgn && isValidPgn(pgn)) {
        pgns.push(pgn);
      }
    }

    return pgns;
  }, []);

  // Apply DOM modifications after mount and updates
  useEffect(() => {
    applyDomModifications();
  }, [applyDomModifications, children]);

  // InnerHTML mode: extract PGNs from children and render viewers
  if (innerHTML && typeof children === 'string') {
    const pgns = extractPgnsFromHtml(children);

    return (
      <div ref={containerRef}>
        <div
          dangerouslySetInnerHTML={{ __html: children }}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        {pgns.map((pgn, index) => (
          <Viewer
            key={`pgn-${index}-${pgn.slice(0, 50)}`}
            pgnInformation={pgn}
            blackSquareColor={blackSquareColor}
            whiteSquareColor={whiteSquareColor}
            width={width}
            orientation={orientation}
            backgroundColor={backgroundColor}
            showCoordinates={showCoordinates}
          />
        ))}
      </div>
    );
  }

  // Direct PGN mode: render single viewer
  const pgnContent = typeof children === 'string' ? children : '';

  if (!pgnContent || !isValidPgn(pgnContent)) {
    return null;
  }

  return (
    <div ref={containerRef}>
      <Viewer
        pgnInformation={pgnContent}
        blackSquareColor={blackSquareColor}
        whiteSquareColor={whiteSquareColor}
        width={width}
        orientation={orientation}
        backgroundColor={backgroundColor}
        showCoordinates={showCoordinates}
      />
    </div>
  );
};

export default React.memo(PgnViewer);

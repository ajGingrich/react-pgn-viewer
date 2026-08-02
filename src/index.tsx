import React, { useEffect, useRef, useCallback } from 'react';
import { createRoot, type Root } from 'react-dom/client';
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
  const viewerRootsRef = useRef<Root[]>([]);

  /**
   * Builds a Viewer element for the given PGN string.
   */
  const makeViewer = useCallback(
    (pgnInformation: string) => (
      <Viewer
        pgnInformation={pgnInformation}
        blackSquareColor={blackSquareColor}
        whiteSquareColor={whiteSquareColor}
        width={width}
        orientation={orientation}
        backgroundColor={backgroundColor}
        showCoordinates={showCoordinates}
      />
    ),
    [blackSquareColor, whiteSquareColor, width, orientation, backgroundColor, showCoordinates],
  );

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
   * Unmounts all previously mounted viewer roots.
   */
  const unmountViewers = useCallback(() => {
    viewerRootsRef.current.forEach((root) => root.unmount());
    viewerRootsRef.current = [];
  }, []);

  // InnerHTML mode: render the HTML visibly, then mount a Viewer in place of each <pgn> node.
  useEffect(() => {
    if (!innerHTML || !containerRef.current) return;

    unmountViewers();
    applyDomModifications();

    const nodes = containerRef.current.querySelectorAll('pgn');
    nodes.forEach((node) => {
      const pgn = (node.innerHTML || '').trim();
      if (pgn && isValidPgn(pgn)) {
        const root = createRoot(node);
        root.render(makeViewer(pgn));
        viewerRootsRef.current.push(root);
      }
    });
  }, [innerHTML, children, makeViewer, applyDomModifications, unmountViewers]);

  // Cleanup viewer roots on unmount. Deferred to a microtask so the roots are not
  // unmounted synchronously while React is tearing down the parent tree (React 19+).
  useEffect(() => {
    return () => {
      queueMicrotask(unmountViewers);
    };
  }, [unmountViewers]);

  // InnerHTML mode: render children as visible HTML, viewers are mounted in place of <pgn> nodes
  if (innerHTML && typeof children === 'string') {
    return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: children }} />;
  }

  // Direct PGN mode: render single viewer
  const pgnContent = typeof children === 'string' ? children : '';

  if (!pgnContent || !isValidPgn(pgnContent)) {
    return null;
  }

  return <div ref={containerRef}>{makeViewer(pgnContent)}</div>;
};

export default React.memo(PgnViewer);

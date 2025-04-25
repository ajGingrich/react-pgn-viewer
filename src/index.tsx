import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Viewer from './Viewer.tsx';

interface PgnViewerProps {
  children?: React.ReactNode;
  innerHtml?: boolean; // Boolean prop to indicate children is HTML string
  backgroundColor?: string;
  blackSquareColor?: string;
  whiteSquareColor?: string;
  orientation?: 'white' | 'black';
  width?: number | string;
  showCoordinates?: boolean;
  nodeToModify?: string;
  nodeModification?: (node: Element) => void; // Optional DOM modification after render
  startPly?: number;
  endPly?: number;
}

const PgnViewer: React.FC<PgnViewerProps> = ({
  children,
  innerHtml = false,
  backgroundColor = '#e1e5ed',
  blackSquareColor = 'steelblue',
  whiteSquareColor = 'aliceblue',
  orientation = 'white',
  width = 600,
  showCoordinates = true,
  nodeToModify,
  nodeModification,
  startPly,
  endPly,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pgnRootsRef = useRef<
    Map<Element, { root: Root; container: HTMLDivElement }>
  >(new Map());

  const renderViewerIntoContainer = React.useCallback(
    (container: HTMLElement, pgnInformation: string): Root => {
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <Viewer
            pgnInformation={pgnInformation}
            blackSquareColor={blackSquareColor}
            whiteSquareColor={whiteSquareColor}
            width={width}
            orientation={orientation === 'white' ? 'w' : 'b'}
            backgroundColor={backgroundColor}
            showCoordinates={showCoordinates}
            startPly={startPly}
            endPly={endPly}
          />
        </React.StrictMode>
      );
      return root;
    },
    [
      blackSquareColor,
      whiteSquareColor,
      width,
      orientation,
      backgroundColor,
      showCoordinates,
      startPly,
      endPly,
    ]
  );

  useEffect(() => {
    if (!innerHtml || !containerRef.current) {
      pgnRootsRef.current.forEach((rootData) => rootData.root.unmount());
      pgnRootsRef.current.clear();
      return;
    }

    const container = containerRef.current;
    const pgnNodes = container.querySelectorAll('pgn');
    const currentNodes = new Set<Element>();

    pgnNodes.forEach((pgnNode) => {
      currentNodes.add(pgnNode);
      const pgnData = pgnNode.innerHTML;
      if (!pgnData) return;

      let rootData = pgnRootsRef.current.get(pgnNode);

      if (!rootData) {
        const viewerContainer = document.createElement('div');
        viewerContainer.className = 'pgn-viewer-container';
        pgnNode.parentNode?.insertBefore(viewerContainer, pgnNode);
        if (pgnNode instanceof HTMLElement) {
          pgnNode.style.display = 'none';
        }

        const root = renderViewerIntoContainer(viewerContainer, pgnData);
        rootData = { root, container: viewerContainer };
        pgnRootsRef.current.set(pgnNode, rootData);
      } else {
        rootData.root.render(
          <React.StrictMode>
            <Viewer
              pgnInformation={pgnData}
              blackSquareColor={blackSquareColor}
              whiteSquareColor={whiteSquareColor}
              width={width}
              orientation={orientation === 'white' ? 'w' : 'b'}
              backgroundColor={backgroundColor}
              showCoordinates={showCoordinates}
              startPly={startPly}
              endPly={endPly}
            />
          </React.StrictMode>
        );
      }
    });

    pgnRootsRef.current.forEach((rootData, pgnNode) => {
      if (!currentNodes.has(pgnNode)) {
        rootData.root.unmount();
        rootData.container.remove();
        pgnRootsRef.current.delete(pgnNode);
      }
    });

    if (nodeToModify && typeof nodeModification === 'function') {
      const nodesToModify = container.querySelectorAll(nodeToModify);
      nodesToModify.forEach((node) => {
        try {
          nodeModification(node);
        } catch (error) {
          console.error('Error during nodeModification:', error);
        }
      });
    }

    // Capture the ref's current value for the cleanup function.
    const rootsMap = pgnRootsRef.current;
    return () => {
      rootsMap.forEach((rootData) => {
        rootData.root.unmount();
        if (rootData.container.parentNode) {
          rootData.container.remove();
        }
      });
      rootsMap.clear();
    };
  }, [
    innerHtml,
    children,
    nodeToModify,
    nodeModification,
    blackSquareColor,
    whiteSquareColor,
    orientation,
    width,
    backgroundColor,
    showCoordinates,
    startPly,
    endPly,
    renderViewerIntoContainer,
  ]);

  if (innerHtml) {
    if (typeof children === 'string') {
      return (
        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      );
    } else {
      console.error(
        'PgnViewer: innerHtml is true, but children are not a string. Cannot process HTML.'
      );
    }
  } else if (typeof children === 'string' && children.trim()) {
    return (
      <div className="pgn-viewer-container">
        {' '}
        <Viewer
          pgnInformation={children}
          blackSquareColor={blackSquareColor}
          whiteSquareColor={whiteSquareColor}
          width={width}
          orientation={orientation === 'white' ? 'w' : 'b'}
          backgroundColor={backgroundColor}
          showCoordinates={showCoordinates}
          startPly={startPly}
          endPly={endPly}
        />
      </div>
    );
  }

  return null;
};

export default PgnViewer;

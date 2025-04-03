import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import Viewer from './Viewer';

const PgnViewer = ({
  backgroundColor,
  blackSquareColor,
  nodeToModify,
  nodeModification,
  orientation,
  showCoordinates,
  whiteSquareColor,
  width,
  innerHTML,
  children,
}) => {
  const [pgns, setPgns] = useState(null);
  const viewerRef = useRef(null);

  const makeViewer = ({ pgnInformation }) => {
    return (
      <Viewer
        pgnInformation={pgnInformation}
        blackSquareColor={blackSquareColor}
        whiteSquareColor={whiteSquareColor}
        width={width}
        orientation={orientation}
        backgroundColor={backgroundColor}
        showCoordinates={showCoordinates}
      />
    );
  };

  const createInnerHtml = () => {
    return { __html: children };
  };

  const additionalHTMLModification = () => {
    if (typeof nodeModification !== 'function' || !nodeToModify) return null;

    const nodes = viewerRef.current.querySelectorAll(nodeToModify);

    for (let i = 0; i < nodes.length; i++) {
      nodeModification(nodes[i]);
    }
  };

  const setPgn = (pgns) => {
    const nodes = viewerRef.current.querySelectorAll('pgn');

    for (let i = 0; i < nodes.length; i++) {
      const root = createRoot(nodes[i]);
      root.render(makeViewer({ pgnInformation: pgns[i] }));
    }
  };

  useEffect(() => {
    const nodes = viewerRef.current.querySelectorAll('pgn');
    const pgnsList = [];

    for (let i = 0; i < nodes.length; i++) {
      pgnsList.push(nodes[i].innerHTML.slice(0));
    }

    setPgns(pgnsList);
    additionalHTMLModification();
    setPgn(pgnsList);
  }, []);

  useEffect(() => {
    additionalHTMLModification();
    setPgn(pgns);
  }, [pgns]);

  return (
    <div ref={viewerRef}>
      {innerHTML && <div dangerouslySetInnerHTML={createInnerHtml()}></div>}
      {!innerHTML && <div>{makeViewer({ pgnInformation: children })}</div>}
    </div>
  );
};

PgnViewer.propTypes = {
  backgroundColor: PropTypes.string,
  blackSquareColor: PropTypes.string,
  nodeToModify: PropTypes.string,
  nodeModification: PropTypes.func,
  orientation: PropTypes.string,
  showCoordinates: PropTypes.bool,
  whiteSquareColor: PropTypes.string,
  width: PropTypes.number,
  innerHTML: PropTypes.bool,
  children: PropTypes.node,
};

PgnViewer.defaultProps = {
  backgroundColor: '#e1e5ed',
  blackSquareColor: 'steelblue',
  orientation: 'w',
  showCoordinates: true,
  whiteSquareColor: 'aliceblue',
  width: 600,
};

export default PgnViewer;

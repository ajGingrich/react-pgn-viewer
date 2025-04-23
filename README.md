# React Pgn Viewer

![npm version](https://img.shields.io/npm/v/react-pgn-viewer.svg)
![npm Downloads](https://img.shields.io/npm/dt/react-pgn-viewer.svg)
![license](https://img.shields.io/npm/l/react-pgn-viewer.svg)

## Installation

```
npm install react-pgn-viewer --save
```

## Usage

```
import React from 'react';
import PgnViewer from 'react-pgn-viewer';

// Example using processHtmlContent to find <pgn> tags
const Example1 = () => {
  const handleModification = (node) => {
    // Example: Add a class to modified nodes
    if (node instanceof HTMLElement) {
      node.classList.add('modified-by-viewer');
    }
  };

  const pgnString = `
    <div>Some surrounding content</div>
    <pgn>1.e4 e5 2.f4 exf4</pgn>
    <pre><code>Some code block</code></pre>
    <pgn>1.d4 d5</pgn>
  `;

  return (
    <PgnViewer
      processHtmlContent={true}
      nodeToModify='pre code'
      nodeModification={handleModification}
      blackSquareColor='steelblue'
      whiteSquareColor='aliceblue'
    >
      {pgnString}
    </PgnViewer>
  );
};
```

**OR**

```
import React from 'react';
import PgnViewer from 'react-pgn-viewer';

// Example passing a single PGN string as children
const Example2 = () => {
  const singlePgn = "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6";

  return (
    <PgnViewer
      processHtmlContent={false} // Explicitly false or omitted
      blackSquareColor='darkseagreen'
      whiteSquareColor='papayawhip'
      width={400}
      orientation='black'
    >
      {singlePgn}
    </PgnViewer>
  );
};
```

#### Different viewing methods

For viewing partial pgns or a singular FEN position, add these modifiers to the pgn text

| Modifier          |                                                                 Explanation                                                                 |
| ----------------- | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [StartAtMove "8"] |                          This will skip the first 7 moves and start immediately at move 8. Must be a whole number.                          |
| [EndAtMove "15"]  |             This will cut off the game after move 15 and must be used in combination with StartAtMove. Must be a whole number.              |
| [Fen "10w"]       | Fen cannot be used with StartAtMove or EndAtMove because it is one position. This shows move 10 after white moved so it will be blacks move |
| [Fen "15b"]       |                                  This shows the position after Black moved in 15. It will be whites move.                                   |

## Properties

This library uses [react-chessboard](https://github.com/Clariity/react-chessboard) for the board logic and display.

| Prop               |           Type            |    Default    |                                                                Explanation                                                                 |
| ------------------ | :-----------------------: | :-----------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| children           |     `React.ReactNode`     |  `undefined`  |        Content to render. Can be a string (single PGN) or complex nodes containing `<pgn>` tags (if `processHtmlContent` is true).         |
| processHtmlContent |         `boolean`         |    `false`    | If true, finds and replaces `<pgn>` tags within `children`. If false (default), treats `children` as a single PGN string if it's a string. |
| nodeToModify       |         `string`          |  `undefined`  |                   CSS selector for nodes to modify with `nodeModification`. Only used when `processHtmlContent` is true.                   |
| nodeModification   | `(node: Element) => void` |  `undefined`  |           Function to apply custom modifications to nodes matching `nodeToModify`. Only used when `processHtmlContent` is true.            |
| backgroundColor    |         `string`          |   `#e1e5ed`   |                                                   Background color of the entire viewer.                                                   |
| blackSquareColor   |         `string`          | `'steelblue'` |                                                         Color of the dark squares.                                                         |
| whiteSquareColor   |         `string`          | `'aliceblue'` |                                                        Color of the light squares.                                                         |
| orientation        |   `'white' \| 'black'`    |   `'white'`   |                                                             Board orientation.                                                             |
| width              |    `number \| string`     |     `600`     |                                     Total width (px or %). Board takes ~2/3, MoveList ~1/3 on desktop.                                     |
| showCoordinates    |         `boolean`         |    `true`     |                                         Whether to display rank and file coordinates on the board.                                         |

## Contributing

To run the examples:

```
npm install
npm run dev
```

Then open `localhost:8001` in a browser.

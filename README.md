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
import PgnViewer from 'react-pgn-viewer'

class Example1 extends React.Component {

  htmlModification = (node) => {
    modifyNode(node)
  }

  render() {
    return (
      <PgnViewer
        blackSquareColour='steelBlue'
        nodeToModify='pre code'
        nodeModification={this.htmlModification}
        innerHTML
      >
        {'<pgn>1.e4 e5 2.f4 exf4'</pgn>}
      </PgnViewer
      )
  }
}
```

**OR**

```
import PgnViewer from 'react-pgn-viewer'

class Example2 extends React.Component {

  render() {
    return (
      <PgnViewer
        blackSquareColour='steelBlue'
        innerHTML={false}
      >
        1.e4 e5 2.f4 exf4
      </PgnViewer
      )
  }
}
```

#### Different viewing methods

For viewing partial pgns or a singular FEN position, add these modifiers to the pgn text

| Modifier | Explanation |
| --- | :-------: |
| [StartAtMove "8"] | This will skip the first 7 moves and start immediately at move 8. Must be a whole number. |
| [EndAtMove "15"] | This will cut off the game after move 15 and must be used in combination with StartAtMove. Must be a whole number. |
| [Fen "10w"] | Fen cannot be used with StartAtMove or EndAtMove because it is one position. This shows move 10 after white moved so it will be blacks move |
| [Fen "15b"] | This shows the position after Black moved in 15. It will be whites move. |

#### The styles
The icons use font-awesome 4 CSS. If you aren't already using that, simply put the cdn in the head of your html

```
<head>
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
  integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
...
</head>
```

## Properties

This library uses [reactjs-chessboard](https://github.com/ajgingrich/reactjs-chessboard) for the board logic and display and it shares many props.

| Prop | Type | Default | Explanation |
| --- | :---: | :------: | :-------: |
| innerHTML | boolean | true | if true, will parse the pgn elements. If false, will make only one pgn from a text string |
| nodeToModify | string | N/A | HTML element that should be modified by `nodeModification`. *Only applicable if innerHTML is true.* |
| nodeModification | function | N/A | instructions for modify different HTML elements besides `<pgn>`. *Only applicable if innerHTML is true.* |
| backgroundColor | string | #e1e5ed | background of the entire viewer |
| blackSquareColor | string | SteelBlue | color of the dark squares |
| whiteSquareColor | string | AliceBlue | color of the light squares |
| orientation | string | 'w' | board orientation |
| width | string (%) or number (px) | 600 | Width of the board and move list. The board will be 2/3rds of the width. |
| showCoordinates | boolean | true | should show coordinates along the A file and first Rank |

## Demo

https://blog.andrewgingrich.com/#/post/2018/07/22/chess-urbina-duran-2018

## Contributing

To run the examples:

```
npm install
npm run dev
```

Then open `localhost:8000` in a browser.

Tested with React 16.3

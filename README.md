# react-pgn-viewer

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

This library uses a fork of [react-chessboardjs](https://github.com/siansell/react-chessboardjs) for the board logic and display. Therefore ,it shares many props in addition to the unique items.

| Prop | Type | Default | Explanation |
| --- | :---: | :------: | :-------: |
| innerHTML | boolean | true | if true, will parse the pgn elements. If false, will make only one pgn from a text string |
| nodeToModify | string | N/A | HTML element that should be modified by `nodeModification`. *Only applicable if innerHTML is true.* |
| nodeModification | function | N/A | instructions for modify different HTML elements besides `<pgn>`. *Only applicable if innerHTML is true.* |
| backgroundColor | string | green | background of the entire viewer |
| blackSquareColor | string | green | color of the dark squares |
| whiteSquareColor | string | '#f0d9b5' | color of the light squares |
| isDraggable | boolean | true | is board draggable |
| orientation | string | 'w' | board orientation |
| width | string (%) or number (px) | 600 | Width of the board and move list. The board will be 2/3rds of the width. |
| showCoordinates | boolean | true | should show coordinates along the A file and first Rank |

## Demo

Link with a demo upcoming.

## Contributing

To run the examples:

```
npm install
npm run dev
```

Then open `localhost:8000` in a browser.

Tested with React 16.3

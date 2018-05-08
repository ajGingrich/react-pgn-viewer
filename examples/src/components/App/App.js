import React from 'react'
import PgnViewer from 'src'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>React Pgn Viewer</div>
        <PgnViewer
          blackSquareColour="steelblue"
          // fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R"
          isDraggable
          orientation="w"
        />
      </div>
    )
  }
}

export default App

import React from 'react'
import PgnViewer from 'src'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const headerStyle = {
      color: '#18003f'
    }

    return (
      <div>
        <h2 style={headerStyle}>React Pgn Viewer</h2>
        <PgnViewer
          blackSquareColour="steelblue"
          isDraggable={false}
          orientation="w"
        />
      </div>
    )
  }
}

export default App

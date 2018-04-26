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
        <PgnViewer />
      </div>
    )
  }
}

export default App

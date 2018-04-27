import React from 'react'
import Chess from 'chess.js'

class PgnViewer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const chess = new Chess()
    chess.move('e4')
    chess.move('e6')
    chess.move('d4')
    chess.move('d5')

    const chessPosition = chess.ascii()
    console.log(chessPosition)

    return (
      <div>
        <div>{chessPosition}</div>
      </div>
    )
  }
}

export default PgnViewer

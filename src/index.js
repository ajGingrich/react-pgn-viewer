import React from 'react'
import Chess from 'chess.js'
import Chessboard from 'react-chessboardjs'
import path from 'path'

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
        {/* <img src={require('./images/chesspieces/wikipedia/bB.svg')} /> */}
        <Chessboard
          blackSquareColour="steelblue" // Default: '#b58863'
          fen="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R" // The 'pieces' part of a fen string
          // (additional info such as side to move will be stripped). ['start' | 'empty'] also valid.
          // Default: 'start'
          isDraggable={true} // Can the pieces be dragged? Default: true
          orientation="b" // ['w', 'b'] Default: 'w'
          // pieceTheme="uscf" // ['alpha', 'uscf', 'wikipedia'] Default: 'wikipedia'
          style={{
            border: '2px solid lightgrey',
          }}
          whiteSquareColour="aliceblue" // Default: '#f0d9b5'
          width={400} // String ('100%', of container) | number (px). If expressed as a percentage,
          // the board will resize with its container. Default: 400
        />
      </div>
    )
  }
}

export default PgnViewer => <div>
  <img src={require('./images/chesspieces/wikipedia/bB.svg')} />
</div>

// export default PgnViewer

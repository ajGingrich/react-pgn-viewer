import React from 'react'
import PropTypes from 'prop-types'
import Chess from 'chess.js'
import Chessboard from 'react-chessboardjs'
import path from 'path'

class PgnViewer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { blackSquareColour, fen, isDraggable, orientation } = this.props
    const chess = new Chess()

    chess.move('e4')
    chess.move('e6')
    chess.move('d4')
    chess.move('d5')

    const chessPosition = chess.ascii()
    // console.log(chessPosition)

    return (
      <div>
        <div>{chessPosition}</div>
        <img src={require('./images/chesspieces/wikipedia/bB.svg')} />
        <Chessboard
          blackSquareColour={blackSquareColour}
          fen={fen}
          isDraggable={isDraggable}
          orientation={orientation}
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

PgnViewer.propTypes = {
  blackSquareColour: PropTypes.string,
  fen:PropTypes.string,
  isDraggable: PropTypes.bool,
  orientation: PropTypes.string,
}

export default PgnViewer

import React from 'react'
import PropTypes from 'prop-types'
import Chess from 'chess.js'
import Chessboard from 'react-chessboardjs'
import BoardHeader from './BoardHeader'
import BoardFooter from './BoardFooter'
import path from 'path'

class PgnViewer extends React.Component {

  constructor(props) {
    super(props)

    this._handleNextMove = this._handleNextMove.bind(this);
    this._handlePreviousMove = this._handlePreviousMove.bind(this);
    this._handleReset = this._handleReset.bind(this);
  }

  _handleNextMove() {
    console.log('handling forward')
    //do stuff
  }

  _handlePreviousMove() {
    console.log('going backward!')
  }

  _handleReset() {
    console.log('resetting')
  }

  render() {
    const { blackSquareColour, fen, isDraggable, orientation } = this.props
    const chess = new Chess()

    //make a chess game out of pgn, split etc
    //do the moves so everything is in chessHistory


    chess.move('e4')
    chess.move('e6')
    chess.move('d4')
    chess.move('d5')

    const chessHistory = chess.history()
    // console.log(chessHistory)

    const chessPosition = chess.fen()
    // console.log(chessPosition)

    return (
      <div>
        <div>{chessHistory}</div>
        {/* <img src={require('./images/chesspieces/wikipedia/bB.svg')} /> */}
        <BoardHeader />
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
        <BoardFooter
          onNextMove={this._handleNextMove}
          onPreviousMove={this._handlePreviousMove}
          onReset={this._handleReset}
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

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

    const chess = new Chess()
    const index = 0
    //load here?

    chess.move('e4')
    chess.move('e6')
    chess.move('d4')
    chess.move('d5')

    const moves = chess.history()
    chess.reset()

    //list of moves in history

    this.state = { chess: chess, moves: moves, index: index}

    this._handleNextMove = this._handleNextMove.bind(this);
    this._handlePreviousMove = this._handlePreviousMove.bind(this);
    this._handleReset = this._handleReset.bind(this);
  }

  _handleNextMove() {
    const { moves, chess } = this.state
    let { index } = this.state

    if(index >= moves.length) return

    chess.move(moves[index])
    index++

    this.setState({
      chess: chess,
      index: index,
    })
  }

  _handlePreviousMove() {
    const { chess } = this.state
    let { index } = this.state

    if(!index) return

    chess.undo()
    index--

    this.setState({
      chess: chess,
      index: index,
    })
  }

  _handleReset() {
    const { chess } = this.state
    const index = 0

    chess.reset()

    this.setState({
      chess: chess,
      index: index,
    })
  }

  render() {
    const { blackSquareColour, fen, isDraggable, orientation } = this.props
    const { chess, moves, index } = this.state

    return (
      <div>
        {/* <img src={require('./images/chesspieces/wikipedia/bB.svg')} /> */}
        <BoardHeader />
        <Chessboard
          blackSquareColour={blackSquareColour}
          fen={chess.fen()}
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

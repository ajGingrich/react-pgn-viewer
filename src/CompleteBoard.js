import React from 'react'
import PropTypes from 'prop-types'
import Chess from 'chess.js'
import Chessboard from 'react-chessboardjs'
import BoardHeader from './BoardHeader'
import BoardFooter from './BoardFooter'
import path from 'path'

class CompleteBoard extends React.Component {
  constructor(props) {
    super(props)

    this._handleNextMove = this._handleNextMove.bind(this);
    this._handlePreviousMove = this._handlePreviousMove.bind(this);
    this._handleReset = this._handleReset.bind(this);

    this.state = {
      chess: null,
      moves: null,
      index: null,
      headerInfo: null,
    }
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

  componentDidMount() {
    const { children } = this.props
    const chess = new Chess()
    const index = 0
    const pgnString = children.trim().replace(/\[/g, '')

    if(!pgnString) return null

    const pgnArray = pgnString.split(']')

    chess.load_pgn(pgnArray[pgnArray.length - 1])

    for (let i=0; i < pgnArray.length - 2; i++) {
      const headerInfo = pgnArray[i].trim().split(' "')
      chess.header(headerInfo[0].replace(/\"/g, ''), headerInfo[1].replace(/\"/g, ''))
    }

    const headerInfo = chess.header()
    const moves = chess.history()
    chess.reset()

    this.setState({
      chess: chess,
      moves: moves,
      index: index,
      headerInfo: headerInfo,
    })
  }

  render() {
    const { blackSquareColour, fen, isDraggable, orientation, children, innerHTML } = this.props
    const { chess, moves, index, headerInfo } = this.state

    return (
      <div>
        {/* <img src={require('./images/chesspieces/wikipedia/bB.svg')} /> */}
        <BoardHeader headerInfo={headerInfo && headerInfo}/>
        <Chessboard
          blackSquareColour={blackSquareColour}
          fen={chess && chess.fen() || 'start'}
          isDraggable={isDraggable}
          orientation={orientation}
          style={{
            border: '2px solid lightgrey',
          }}
          whiteSquareColour="aliceblue"
          width={400}
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

export default CompleteBoard

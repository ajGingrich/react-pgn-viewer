import React from 'react'
import PropTypes from 'prop-types'
import Chess from 'chess.js'
import Chessboard from 'reactjs-chessboard'
import BoardHeader from './BoardHeader'
import BoardFooter from './BoardFooter'
import MoveList from './MoveList'

class CompleteBoard extends React.Component {
  constructor(props) {
    super(props)

    this._handleNextMove = this._handleNextMove.bind(this)
    this._handlePreviousMove = this._handlePreviousMove.bind(this)
    this._handleReset = this._handleReset.bind(this)
    this._handleChangeMove = this._handleChangeMove.bind(this)
    this._handleFlipBoard = this._handleFlipBoard.bind(this)
    this._handleDownload = this._handleDownload.bind(this)
    this._handleLastMove = this._handleLastMove.bind(this)

    this.state = {
      chess: null,
      moves: null,
      index: null,
      headerInfo: null,
      orientation: this.props.orientation
    }
  }

  _handleNextMove() {
    const { moves, chess } = this.state
    let { index } = this.state

    if(index >= moves.length) return

    chess.move(moves[index])
    // don't mutate state but make copy and set new one...
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
    // don't mutate state but make copy and set new one...
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
    // don't mutate state but make copy and set new one...

    this.setState({
      chess: chess,
      index: index,
    })
  }

  _handleLastMove() {
    const { chess, moves, index: currentIndex } = this.state
    let temporaryIndex = new Number(currentIndex)

    for(let i=0; i < moves.length; i++) {
      chess.move(moves[temporaryIndex])
      // don't mutate state but make copy and set new one...
      temporaryIndex++
    }

    this.setState({
      chess: chess,
      index: temporaryIndex,
    })
  }

  _handleFlipBoard() {
    const newOrientation = this.state.orientation === 'w' ? 'b': 'w'

    this.setState({
      orientation: newOrientation,
    })
  }

  _handleChangeMove(moveIndex) {
    const { moves, chess, index: currentIndex } = this.state
    // don't mutate state but make copy and set new one...

    if (moveIndex === currentIndex) return

    if (moveIndex < currentIndex) {
      for (let i=0; i < (currentIndex - moveIndex); i++) {
        chess.undo()
      }
    } else if (moveIndex > currentIndex) {
      let temporaryIndex = new Number(currentIndex)
      for (let i=0; i < (moveIndex - currentIndex); i++) {
        chess.move(moves[temporaryIndex])
        temporaryIndex++
      }
    }

    this.setState({
      chess: chess,
      index: moveIndex,
    })
  }

  _handleDownload() {
    const { headerInfo } = this.state
    const element = document.createElement("a")
    const file = new Blob([this.props.pgnInformation], {type: 'text/plain'})
    const whiteLastName = headerInfo.White.split(' ')[1]
    const blackLastName = headerInfo.Black.split(' ')[1]

    element.href = URL.createObjectURL(file)
    element.download = `${whiteLastName}vs${blackLastName}${headerInfo.EventDate}.pgn`
    element.click()
  }

  componentDidMount() {
    const { pgnInformation } = this.props
    const chess = new Chess.Chess() // this ain't good
    const index = 0
    const pgnString = pgnInformation.trim().replace(/\[/g, '')

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
    const { blackSquareColour, fen, isDraggable, innerHTML, width, backgroundColor } = this.props
    const { chess, moves, index, headerInfo, orientation } = this.state

    const pgnViewerMainStyles = {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
    }

    const pgnWrapperStyles = {
      width: width,
      background: backgroundColor,
    }

    return (
      <div className="pgnWrapper" style={pgnWrapperStyles}>
        <BoardHeader headerInfo={headerInfo && headerInfo} width={width} />
        <div className="pgnViewerMain" style={pgnViewerMainStyles}>
          <Chessboard
            blackSquareColour={blackSquareColour}
            fen={chess && chess.fen() || 'start'}
            isDraggable={isDraggable}
            orientation={orientation}
            style={{
              border: '2px solid lightgrey',
            }}
            whiteSquareColour="aliceblue"
            width={(2/3)*width}
          />
          <MoveList
            onChangeMove={this._handleChangeMove}
            currentIndex={index}
            moves={moves}
            width={(1/3)*width}
          />
        </div>
        <BoardFooter
          onDownload={this._handleDownload}
          onFlipBoard={this._handleFlipBoard}
          onNextMove={this._handleNextMove}
          onPreviousMove={this._handlePreviousMove}
          onReset={this._handleReset}
          onLastMove={this._handleLastMove}
          width={width}
        />
      </div>
    )
  }
}

export default CompleteBoard

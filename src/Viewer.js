import React from 'react'
import PropTypes from 'prop-types'
import Chess from 'chess.js'
import Chessboard from 'reactjs-chessboard'
import BoardHeader from './BoardHeader'
import BoardFooter from './Footer/BoardFooter'
import MoveList from './Moves/MoveList'
import { getActiveSquare, getBaseStyles } from './helpers'

class Viewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chess: null,
      moves: null,
      index: null,
      headerInfo: null,
      isPlaying: null,
      isLoaded: null,
      startAtMove: null,
      endAtMove: null,
      windowWidth: window && window.innerWidth,
      orientation: this.props.orientation
    }
  }

  _updateDimensions = () => {
    this.setState({ windowWidth: window && window.innerWidth })
  }

  _makeIncreasingMoves = ({ numberOfMoves, reset }) => {
    const { chess, moves, index: currentIndex } = this.state
    let index = reset ? 0 : new Number(currentIndex)

    for(let i=0;i < numberOfMoves;i++) {
      chess.move(moves[index])
      index++
    }

    this.setState({ chess: chess, index: index })
  }

  _handleNextMove = () => {
    const { moves, chess, index: currentIndex, endAtMove } = this.state
    let index = new Number(currentIndex)

    if(index >= moves.length || currentIndex === endAtMove) return

    chess.move(moves[index])
    index++

    this.setState({ chess: chess, index: index })
  }

  _handlePreviousMove = () => {
    const { chess, index: currentIndex, startAtMove } = this.state
    let index = new Number(currentIndex)

    if(index <= 0 || currentIndex === startAtMove) return

    chess.undo()
    index--

    this.setState({ chess: chess, index: index })
  }

  _handleReset = () => {
    const { chess, startAtMove } = this.state
    const index = 0

    chess.reset()

    if(startAtMove) {
      this._makeIncreasingMoves({ numberOfMoves: startAtMove, reset: true })
    } else {
      this.setState({ chess: chess, index: index })
    }
  }

  _handleLastMove = () => {
    const { moves, index, endAtMove } = this.state

    if(index >= moves.length || index === endAtMove) return

    const moveDifference = endAtMove ? endAtMove - index : moves.length - index
    this._makeIncreasingMoves({ numberOfMoves: moveDifference })
  }

  _handleFlipBoard = () => {
    this.setState({ orientation: this.state.orientation === 'w' ? 'b': 'w' })
  }

  _handlePlay = () => {
    const { isPlaying } = this.state

    if(!isPlaying) this._handleNextMove()

    this.setState({ isPlaying: !isPlaying })
  }

  _handleChangeMove = (moveIndex) => {
    const { chess, index } = this.state

    if (moveIndex === index) return

    if (moveIndex < index) {
      for (let i=0;i < (index - moveIndex);i++) {
        chess.undo()
      }

      this.setState({ chess: chess, index: moveIndex })
    } else {
      const moveDifference = moveIndex - index

      this._makeIncreasingMoves({ numberOfMoves: moveDifference})
    }
  }

  _handleDownload = () => {
    const { headerInfo } = this.state
    const element = document.createElement('a')
    const file = new Blob([this.props.pgnInformation], {type: 'text/plain'})
    const whiteLastName = headerInfo.White.split(' ')[1]
    const blackLastName = headerInfo.Black.split(' ')[1]

    element.href = URL.createObjectURL(file)
    element.download = `${whiteLastName}vs${blackLastName}${headerInfo.EventDate}.pgn`
    element.click()
  }

  componentDidMount() {
    const { pgnInformation } = this.props
    const chess = new Chess.Chess()
    const pgnString = pgnInformation.trim().replace(/\[/g, '')
    let index = 0

    if(!pgnString) return null

    const pgnArray = pgnString.split(']')

    chess.load_pgn(pgnArray[pgnArray.length - 1])

    for (let i=0;i < pgnArray.length - 2;i++) {
      const headerInfo = pgnArray[i].trim().split(' "')
      chess.header(headerInfo[0].replace(/\"/g, ''), headerInfo[1].replace(/\"/g, ''))
    }

    const headerInfo = chess.header()
    const moves = chess.history()
    chess.reset()

    const startAtMove = (headerInfo.StartAtMove * 2) - 1
    const endAtMove = headerInfo.EndAtMove * 2

    if(startAtMove) {
      for (let i=0;i < startAtMove;i++) {
        chess.move(moves[index])
        index++
      }
    }

    this.setState({
      chess: chess,
      moves: moves,
      index: index,
      startAtMove: startAtMove,
      endAtMove: endAtMove,
      headerInfo: headerInfo,
    })

    window.addEventListener('resize', this._updateDimensions)
    window.addEventListener('load', this._updateDimensions)
    window.addEventListener('orientationchange', this._updateDimensions)
  }

  componentDidUpdate() {
    if(this.state.isPlaying) {
      this.timeoutID = setTimeout(() => this._handleNextMove(), 1000)
    } else {
      clearTimeout(this.timeoutID)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateDimensions)
    window.removeEventListener('load', this._updateDimensions)
    window.removeEventListener('orientationchange', this._updateDimensions)
  }

  render() {
    const { blackSquareColor, whiteSquareColor, width: defaultWidth, backgroundColor, showCoordinates } = this.props
    const { chess, moves, index, headerInfo, orientation, isPlaying, windowWidth, startAtMove, endAtMove } = this.state
    const { baseStyles, wrapperStyles, isMobile, width } = getBaseStyles({ windowWidth, backgroundColor, defaultWidth })
    const activeSquare = getActiveSquare(moves, index)

    return (
      <div className="pgnWrapper" style={wrapperStyles}>
        {headerInfo && <BoardHeader headerInfo={headerInfo} width={width} />}
        <div className="pgnViewerMain" style={baseStyles}>
          <Chessboard
            blackSquareColour={blackSquareColor}
            fen={chess && chess.fen() || 'start'}
            orientation={orientation}
            showCoordinates={showCoordinates}
            activeSquare={activeSquare}
            style={{
              border: '2px solid lightgrey',
            }}
            whiteSquareColour={whiteSquareColor}
            width={isMobile ? width : (2/3)*width}
          />
          {
            !isMobile &&
            <MoveList
              onChangeMove={this._handleChangeMove}
              currentIndex={index}
              moves={moves}
              width={(1/3)*width}
              startAtMove={startAtMove}
              endAtMove={endAtMove}
            />
          }
        </div>
        <BoardFooter
          isPlaying={isPlaying}
          onPlay={this._handlePlay}
          onDownload={this._handleDownload}
          onFlipBoard={this._handleFlipBoard}
          onNextMove={this._handleNextMove}
          onPreviousMove={this._handlePreviousMove}
          onReset={this._handleReset}
          onLastMove={this._handleLastMove}
          width={width}
        />
        {isMobile &&
          <MoveList
            onChangeMove={this._handleChangeMove}
            currentIndex={index}
            moves={moves}
            width={width}
            startAtMove={startAtMove}
            endAtMove={endAtMove}
          />
        }
      </div>
    )
  }
}

Viewer.propTypes = {
  backgroundColor: PropTypes.string,
  blackSquareColour: PropTypes.string,
  pgnInformation: PropTypes.string.isRequired,
  width: PropTypes.number
}

export default Viewer

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
      screenWidth: null,
      orientation: this.props.orientation
    }
  }

  _updateDimensions = () => {
    this.setState({ screenWidth: screen.width })
  }

  _handleNextMove = () => {
    const { moves, chess, index: currentIndex } = this.state
    let index = new Number(currentIndex)

    if(index >= moves.length) return

    chess.move(moves[index])
    index++

    this.setState({ chess: chess, index: index })
  }

  _handlePreviousMove = () => {
    const { chess, index: currentIndex } = this.state
    let index = new Number(currentIndex)

    if(index <= 0) return

    chess.undo()
    index--

    this.setState({ chess: chess, index: index })
  }

  _handleReset = () => {
    const { chess } = this.state
    const index = 0

    chess.reset()

    this.setState({ chess: chess, index: index })
  }

  _handleLastMove = () => {
    const { chess, moves, index: currentIndex } = this.state
    let index = new Number(currentIndex)

    if(index >= moves.length) return

    const moveDifference = moves.length - index

    for(let i=0;i < moveDifference;i++) {
      chess.move(moves[index])
      index++
    }

    this.setState({ chess: chess, index: index })
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
    const { moves, chess, index: currentIndex } = this.state
    let index = new Number(currentIndex)

    if (moveIndex === index) return

    if (moveIndex < index) {
      for (let i=0;i < (index - moveIndex);i++) {
        chess.undo()
      }
    } else if (moveIndex > index) {
      const moveDifference = moveIndex - index

      for (let i=0;i < moveDifference;i++) {
        chess.move(moves[index])
        index++
      }
    }

    this.setState({ chess: chess, index: moveIndex })
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
    const index = 0
    const pgnString = pgnInformation.trim().replace(/\[/g, '')

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

    this.setState({
      chess: chess,
      moves: moves,
      index: index,
      headerInfo: headerInfo,
    })

    window.addEventListener('resize', this._updateDimensions)
    // this._updateDimensions()
    // not setting height correctly...
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
  }

  render() {
    const { blackSquareColor, whiteSquareColor, width: defaultWidth, backgroundColor, showCoordinates } = this.props
    const { chess, moves, index, headerInfo, orientation, isPlaying, screenWidth } = this.state
    const activeSquare = getActiveSquare(moves, index)
    const { baseStyles, wrapperStyles, isMobile, width } = getBaseStyles({ screenWidth, backgroundColor, defaultWidth })

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
          <MoveList
            onChangeMove={this._handleChangeMove}
            currentIndex={index}
            moves={moves}
            width={isMobile ? width : (1/3)*width}
          />
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

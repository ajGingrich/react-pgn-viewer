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

    // const header = '[Event ""] [Site ""] [Date "1997.02.15"] [EventDate "1997.02.04"] [Round "10"] [Result "0-1"] [White ""] [Black ""] [ECO "B90"] [WhiteElo "?"] [BlackElo "?"] [PlyCount "76"]'
    const pgn = '1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5 5.Bb3 Bb4+ 6.c3 Bd6 7.Bg5 dxe4 8.dxe4 h6 9.Bh4 Qe7 10.Nbd2 Nbd7 11.Bg3 Bc7 12.O-O Nh5 13.h3 Nxg3 14.fxg3 Nc5 15.Bxf7+ Kxf7 16.Nxe5+ Kg8 17.Ng6 Qg5 18.Rf8+ Kh7 19.Nxh8 Bg4 20.Qf1 Nd3 21.Qxd3 Rxf8 22.hxg4 Qxg4 23.Nf3 Qxg3 24.e5+ Kxh8 25.e6 Bb6+ 26.Kh1 Qg4 27.Qd6 Rd8 28.Qe5 Rd5 29.Qb8+ Kh7 30.e7 Qh5+ 31.Nh2 Rd1+ 32.Rxd1 Qxd1+ 33.Nf1 Qxf1+ 34.Kh2 Qg1+ {0-1}'

    chess.load_pgn(pgn)
    // chess.header('White', 'Magnus Carlsen')
    // chess.header('Black', 'Fabiano Caruana')
    // chess.header('EventDate', '1997.02.04')
    // chess.header('Round', '10')
    // chess.header('Result', '0-1')

    console.log('chess', chess)
    console.log('chess-header', chess.header())

    const moves = chess.history()
    chess.reset()

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

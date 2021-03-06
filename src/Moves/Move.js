import React from 'react'
import PropTypes from 'prop-types'

class Move extends React.Component {

  _handleChangeMove = () => {
    const { onChangeMove, moveIndex } = this.props

    if(typeof onChangeMove !== 'function') return

    onChangeMove(moveIndex)
  }

  render() {
    const { move, moveIndex, currentIndex } = this.props
    const isWhiteMove = moveIndex % 2 !== 0
    const whiteMoveNumber = Math.ceil(moveIndex/2) + '.'

    const moveStyles = {
      cursor: 'pointer',
      color: 'black',
      display: 'inline-block',
    }

    if (currentIndex === moveIndex) {
      moveStyles.fontWeight = 700
    }

    return (
      <span onClick={this._handleChangeMove} style={moveStyles}>
        {isWhiteMove && whiteMoveNumber}&nbsp;{move}&nbsp;
      </span>
    )
  }
}

Move.propTypes = {
  currentIndex: PropTypes.number,
  moveIndex: PropTypes.number,
  move: PropTypes.string,
  onChangeMove: PropTypes.func.isRequired,
}

export default Move

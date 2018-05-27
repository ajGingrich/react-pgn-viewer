import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Move extends Component {
  constructor(props) {
    super(props)

    this._handleChangeMove = this._handleChangeMove.bind(this);
  }

  _handleChangeMove() {
    const { onChangeMove, moveIndex } = this.props

    if(typeof onChangeMove !== 'function') return

    onChangeMove(moveIndex)
  }

  render() {
    const { move, moveIndex, currentIndex } = this.props
    const isWhiteMove = moveIndex % 2 !== 0
    const whiteMoveNumber = Math.ceil(moveIndex/2) + '.'

    let moveStyles = {
      cursor: 'pointer',
      color: 'black'
    }

    if (currentIndex === moveIndex) {
      moveStyles.color = 'orange'
    }

    return (
      <span onClick={this._handleChangeMove} style={moveStyles}>
        {isWhiteMove && whiteMoveNumber}&nbsp;{move}&nbsp;
      </span>
    )
  }
}

export default Move

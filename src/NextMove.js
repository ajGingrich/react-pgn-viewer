import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NextMove extends Component {

  constructor(props) {
    super(props)

    this._handleNextMove = this._handleNextMove.bind(this);
  }

  _handleNextMove() {
    const { onNextMove } = this.props

    if(typeof onNextMove !== 'function') return

    onNextMove()
  }

  render() {
    return (
      <div onClick={this._handleNextMove}>
        forward
      </div>
    )
  }
}

//proptypes
export default NextMove

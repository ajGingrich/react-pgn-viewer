import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PreviousMove extends Component {

  constructor(props) {
    super(props)

    this._handlePreviousMove = this._handlePreviousMove.bind(this);
  }

  _handlePreviousMove() {
    const { onPreviousMove } = this.props

    if(typeof onPreviousMove !== 'function') return

    onPreviousMove()
  }

  render() {
    return (
      <div onClick={this._handlePreviousMove}>
        backward
      </div>
    )
  }
}

export default PreviousMove

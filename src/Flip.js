import React from 'react'
import PropTypes from 'prop-types'

class Flip extends React.Component {

  constructor(props) {
    super(props)

    this._handleFlipBoard = this._handleFlipBoard.bind(this);
  }

  _handleFlipBoard() {
    const { onFlipBoard } = this.props

    if(typeof onFlipBoard !== 'function') return

    onFlipBoard()
  }

  render() {
    return (
      <div onClick={this._handleFlipBoard}>
        flip
      </div>
    )
  }
}

export default Flip

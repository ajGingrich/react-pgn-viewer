import React from 'react'
import PropTypes from 'prop-types'

class NextMove extends React.Component {

  _handleNextMove = () => {
    const { onNextMove } = this.props

    if(typeof onNextMove !== 'function') return

    onNextMove()
  }

  render() {
    return (
      <div onClick={this._handleNextMove} style={this.props.iconStyles}>
        <i className="fa fa-angle-right fa-2x"></i>
      </div>
    )
  }
}

NextMove.propTypes = {
  onNextMove: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default NextMove

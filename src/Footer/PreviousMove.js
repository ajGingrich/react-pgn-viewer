import React from 'react'
import PropTypes from 'prop-types'

class PreviousMove extends React.Component {

  _handlePreviousMove = () => {
    const { onPreviousMove } = this.props

    if(typeof onPreviousMove !== 'function') return

    onPreviousMove()
  }

  render() {
    return (
      <div onClick={this._handlePreviousMove} style={this.props.iconStyles}>
        <i className="pgnIcon fa fa-angle-left fa-2x"></i>
      </div>
    )
  }
}

PreviousMove.propTypes = {
  onPreviousMove: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default PreviousMove

import React from 'react'
import PropTypes from 'prop-types'

class LastMove extends React.Component {

  _handleLastMove = () => {
    const { onLastMove } = this.props

    if(typeof onLastMove !== 'function') return

    onLastMove()
  }

  render() {
    return (
      <div onClick={this._handleLastMove} style={this.props.iconStyles}>
        <i className="fa fa-step-forward fa-lg"></i>
      </div>
    )
  }
}

LastMove.propTypes = {
  onLastMove: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default LastMove

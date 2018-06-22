import React from 'react'
import PropTypes from 'prop-types'

class Reset extends React.Component {

  _handleReset = () => {
    const { onReset } = this.props

    if(typeof onReset !== 'function') return

    onReset()
  }

  render() {
    return (
      <div onClick={this._handleReset} style={this.props.iconStyles}>
        <i className="pgnIcon fa fa-step-backward fa-lg"></i>
      </div>
    )
  }
}

Reset.propTypes = {
  onReset: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Reset

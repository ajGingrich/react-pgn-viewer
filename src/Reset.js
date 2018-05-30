import React from 'react'
import PropTypes from 'prop-types'

class Reset extends React.Component {

  constructor(props) {
    super(props)

    this._handleReset = this._handleReset.bind(this);
  }

  _handleReset() {
    const { onReset } = this.props

    if(typeof onReset !== 'function') return

    onReset()
  }

  render() {
    return (
      <div onClick={this._handleReset}>
        <i class="fa fa-step-backward"></i>
      </div>
    )
  }
}

//proptypes
export default Reset

import React from 'react'
import PropTypes from 'prop-types'

class Download extends React.Component {

  constructor(props) {
    super(props)

    this._handleDownload = this._handleDownload.bind(this);
  }

  _handleDownload() {
    const { onDownload } = this.props

    if(typeof onDownload !== 'function') return

    onDownload()
  }

  render() {
    return (
      <div onClick={this._handleDownload} style={this.props.iconStyles}>
        <i className="fa fa-download fa-lg"></i>
      </div>
    )
  }
}

Download.propTypes = {
  onDownload: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Download

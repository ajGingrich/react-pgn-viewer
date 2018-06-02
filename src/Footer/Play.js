import React from 'react'
import PropTypes from 'prop-types'

class Play extends React.Component {

  _handlePlay = () => {
    const { onPlay } = this.props

    if(typeof onPlay !== 'function') return

    onPlay()
  }

  render() {
    return (
      <div onClick={this._handlePlay} style={this.props.iconStyles}>
        <i className="fa fa-angle-right fa-2x"></i>
      </div>
    )
  }
}

Play.propTypes = {
  onPlay: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Play

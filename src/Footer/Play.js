import React from 'react'
import PropTypes from 'prop-types'

class Play extends React.Component {

  _handlePlay = () => {
    const { onPlay } = this.props

    if(typeof onPlay !== 'function') return

    onPlay()
  }

  render() {
    const iconToShow = this.props.isPlaying ? 'fa-pause' : 'fa-play'

    return (
      <div onClick={this._handlePlay} style={this.props.iconStyles}>
        <i className={`fa ${iconToShow} fa-lg`}></i>
      </div>
    )
  }
}

Play.propTypes = {
  onPlay: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  iconStyles: PropTypes.object.isRequired,
}

export default Play

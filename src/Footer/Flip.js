import React from 'react'
import PropTypes from 'prop-types'

class Flip extends React.Component {

  _handleFlipBoard = () => {
    const { onFlipBoard } = this.props

    if(typeof onFlipBoard !== 'function') return

    onFlipBoard()
  }

  render() {
    const { iconStyles } = this.props
    const flipIconStyles = JSON.parse(JSON.stringify(iconStyles))
    // flipIconStyles.transform = 'rotate(90deg)'

    return (
      <div onClick={this._handleFlipBoard} style={flipIconStyles}>
        <i className="fa fa-exchange fa-lg fa-rotate-90"></i>
      </div>
    )
  }
}

Flip.propTypes = {
  onFlipBoard: PropTypes.func.isRequired,
  iconStyles: PropTypes.object.isRequired,
}

export default Flip

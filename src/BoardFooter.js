import React from 'react'
import PropTypes from 'prop-types'
import PreviousMove from './PreviousMove'
import NextMove from './NextMove'
import Reset from './Reset'
import Flip from './Flip'

class BoardFooter extends React.Component {

  render() {
    const { onNextMove, onPreviousMove, onReset, onFlipBoard, width } = this.props

    const footerStyles = {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: width,
      paddingTop: '10px',
      paddingBottom: '5px'
    }

    const iconStyles = {
      paddingRight: "20px",
    }

    return (
      <div style={footerStyles}>
        <Flip onFlipBoard={onFlipBoard} iconStyles={iconStyles} />
        <Reset onReset={onReset} iconStyles={iconStyles} />
        <PreviousMove onPreviousMove={onPreviousMove} iconStyles={iconStyles} />
        <NextMove onNextMove={onNextMove} iconStyles={iconStyles} />
      </div>
    )
  }
}

export default BoardFooter

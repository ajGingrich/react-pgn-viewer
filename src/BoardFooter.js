import React from 'react'
import PropTypes from 'prop-types'
import PreviousMove from './PreviousMove'
import NextMove from './NextMove'
import Reset from './Reset'
import Flip from './Flip'

class BoardFooter extends React.Component {

  render() {
    const { onNextMove, onPreviousMove, onReset, onFlipBoard, width } = this.props
    console.log(width, 'width')

    const footerStyles = {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: width
    }

    return (
      <div style={footerStyles}>
        <Flip onFlipBoard={onFlipBoard} />
        <Reset onReset={onReset} />
        <PreviousMove onPreviousMove={onPreviousMove} />
        <NextMove onNextMove={onNextMove}/>
      </div>
    )
  }
}

export default BoardFooter

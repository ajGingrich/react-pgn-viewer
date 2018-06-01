import React from 'react'
import PropTypes from 'prop-types'
import Download from './Download'
import PreviousMove from './PreviousMove'
import NextMove from './NextMove'
import LastMove from './LastMove'
import Reset from './Reset'
import Flip from './Flip'

class BoardFooter extends React.Component {

  render() {
    const { onDownload, onNextMove, onPreviousMove, onReset, onFlipBoard, width, onLastMove } = this.props

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
      paddingRight: '20px',
    }

    return (
      <div style={footerStyles}>
        <Download onDownload={onDownload} iconStyles={iconStyles} />
        <Flip onFlipBoard={onFlipBoard} iconStyles={iconStyles} />
        <Reset onReset={onReset} iconStyles={iconStyles} />
        <PreviousMove onPreviousMove={onPreviousMove} iconStyles={iconStyles} />
        <NextMove onNextMove={onNextMove} iconStyles={iconStyles} />
        <LastMove onLastMove={onLastMove} iconStyles={iconStyles} />
      </div>
    )
  }
}

BoardFooter.propTypes = {
  onDownload: PropTypes.func.isRequired,
  onNextMove: PropTypes.func.isRequired,
  onPreviousMove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFlipBoard: PropTypes.func.isRequired,
  onLastMove: PropTypes.func.isRequired,
  width: PropTypes.number,
}

export default BoardFooter

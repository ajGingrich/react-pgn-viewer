import React from 'react'
import PropTypes from 'prop-types'
import Download from './Download'
import PreviousMove from './PreviousMove'
import NextMove from './NextMove'
import LastMove from './LastMove'
import Reset from './Reset'
import Flip from './Flip'
import Play from './Play'

class BoardFooter extends React.Component {

  render() {
    const {
      onDownload,
      onNextMove,
      onPreviousMove,
      onReset,
      onFlipBoard,
      width,
      onLastMove,
      onPlay,
      isPlaying,
      fenMove,
    } = this.props

    const footerStyles = {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      paddingTop: '10px',
      paddingBottom: '5px'
    }

    const iconStyles = {
      paddingLeft: '20px',
    }

    return (
      <div style={footerStyles}>
        {!fenMove && <Reset onReset={onReset} iconStyles={iconStyles} />}
        {!fenMove && <PreviousMove onPreviousMove={onPreviousMove} iconStyles={iconStyles} />}
        {!fenMove && <NextMove onNextMove={onNextMove} iconStyles={iconStyles} />}
        {!fenMove && <LastMove onLastMove={onLastMove} iconStyles={iconStyles} />}
        {!fenMove && <Play onPlay={onPlay} iconStyles={iconStyles} isPlaying={isPlaying} />}
        <Flip onFlipBoard={onFlipBoard} iconStyles={iconStyles} />
        <Download onDownload={onDownload} iconStyles={iconStyles} />
      </div>
    )
  }
}

BoardFooter.propTypes = {
  fenMove: PropTypes.number,
  onDownload: PropTypes.func.isRequired,
  onNextMove: PropTypes.func.isRequired,
  onPreviousMove: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onFlipBoard: PropTypes.func.isRequired,
  onLastMove: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default BoardFooter

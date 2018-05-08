import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreviousMove from './PreviousMove'
import NextMove from './NextMove'
import Reset from './Reset'

class BoardFooter extends Component {

  render() {
    const { onNextMove, onPreviousMove, onReset } = this.props

    const footerStyles = {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'center'
    }

    return (
      <div style={footerStyles}>
        <Reset onReset={onReset} />
        <PreviousMove onPreviousMove={onPreviousMove} />
        <NextMove onNextMove={onNextMove}/>
      </div>
    )
  }
}

export default BoardFooter

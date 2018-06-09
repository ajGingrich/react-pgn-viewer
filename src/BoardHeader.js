import React from 'react'
import PropTypes from 'prop-types'
import { months } from './constants'

class BoardHeader extends React.Component {
  render() {
    const { headerInfo } = this.props

    if (!headerInfo) return null

    const whiteName = headerInfo.White
    const blackName = headerInfo.Black
    const blackElo = headerInfo.BlackElo
    const whiteElo = headerInfo.WhiteElo
    const round = headerInfo.Round
    const result = headerInfo.Result
    const event = headerInfo.Event
    const site = headerInfo.Site
    const date = headerInfo.Date.split('.')
    const textDate = date && `${date[2]} ${months[new Number(date[1]) - 1]} ${date[0]}`
    const eventInfo = event && site ? `${event} | ${site} | Round ${round} |` : null

    const pgnHeaderStyles = {
      padding: '5px',
    }

    const nameStyles = {
      fontWeight: 'bold',
      marginBottom: '0.25rem'
    }

    const detailStyles = {
      fontSize: '14px'
    }

    return (
      <div className="pgnHeader" style={pgnHeaderStyles}>
        <div style={nameStyles}>{whiteName} ({whiteElo}) vs. {blackName} ({blackElo})</div>
        <div style={detailStyles}> {eventInfo} {textDate} | {result} </div>
      </div>
    )
  }
}

BoardHeader.propTypes = {
  headerInfo: PropTypes.object.isRequired,
}


export default BoardHeader

import React from 'react'
import PropTypes from 'prop-types'

class BoardHeader extends React.Component {
  render() {
    const { headerInfo } = this.props

    if(!headerInfo) return null

    return (
      <div>
        <div>{headerInfo.White} vs. {headerInfo.Black}</div>
        <div> { headerInfo.Date} | Round {headerInfo.Round} | {headerInfo.Result} </div>
      </div>
    )
  }
}

export default BoardHeader

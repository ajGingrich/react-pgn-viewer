import React from 'react'
import PropTypes from 'prop-types'
import Move from './Move'

class MoveList extends React.Component {
  render() {
    const { moves, currentIndex, onChangeMove, width } = this.props

    if(!moves) return null

    const pgnViewerMoveListStyles = {
      width: 200,
      paddingLeft: '10px',
      paddingRight: '5px',
      fontSize: '14px',
      lineHeight: '20px',
    }

    return (
      <div className="pgnViewerMoveList" style={pgnViewerMoveListStyles}>
        {
          moves.map(((move, index) => {
            return (
              <Move
                onChangeMove={onChangeMove}
                key={index}
                currentIndex={currentIndex}
                move={move}
                moveIndex={index+1}
              />
            )
          }))
        }
      </div>
    )
  }
}

export default MoveList

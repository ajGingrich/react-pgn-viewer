import React from 'react'
import PropTypes from 'prop-types'
import Move from './Move'

class MoveList extends React.Component {
  render() {
    const { moves, currentIndex, onChangeMove } = this.props

    if(!moves) return null

    return (
      <p>
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
      </p>
    )
  }
}

export default MoveList

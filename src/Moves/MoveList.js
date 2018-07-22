import React from 'react'
import PropTypes from 'prop-types'
import Move from './Move'

class MoveList extends React.Component {
  render() {
    const { moves, currentIndex, onChangeMove, width, startAtMove, endAtMove, fenMove } = this.props

    if(!moves) return null

    const pgnViewerMoveListStyles = {
      width: width,
      paddingLeft: '10px',
      paddingRight: '5px',
      fontSize: '14px',
      lineHeight: '20px',
    }

    return (
      <div className="pgnViewerMoveList" style={pgnViewerMoveListStyles}>
        {!fenMove &&
          moves.map((move, index) => {
            if(index < startAtMove - 1 || index > endAtMove - 1) {
              return null
            } else {
              return (
                <Move
                  onChangeMove={onChangeMove}
                  key={index}
                  currentIndex={currentIndex}
                  move={move}
                  moveIndex={index+1}
                />
              )
            }
          })
        }
        {fenMove &&
          <div>{fenMove % 2 === 0 ? 'White' : 'Black'} to move</div>
        }
      </div>
    )
  }
}

MoveList.propTypes = {
  currentIndex: PropTypes.number,
  moves: PropTypes.array,
  onChangeMove: PropTypes.func.isRequired,
  fenMove: PropTypes.number,
  startAtMove: PropTypes.number,
  endAtMove: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default MoveList

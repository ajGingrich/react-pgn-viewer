import React from 'react'
import PropTypes from 'prop-types'
import CompleteBoard from './CompleteBoard'

class PgnViewer extends React.Component {

  render() {
    const { blackSquareColour, fen, isDraggable, orientation, children, innerHTML } = this.props

    return (
      <div>
        {innerHTML && children.map((child) => {
          if(child.type === 'pgn') {
            return (
              <CompleteBoard
                {...child.props}
                blackSquareColour={blackSquareColour}
                fen={fen}
                isDraggable={isDraggable}
                orientation={orientation}
            />
            )
          }

          return child
        })}
        {!innerHTML &&
          <CompleteBoard
            children={children}
            blackSquareColour={blackSquareColour}
            fen={fen}
            isDraggable={isDraggable}
            orientation={orientation}
        />
        }
      </div>
    )
  }
}

PgnViewer.propTypes = {
  blackSquareColour: PropTypes.string,
  fen:PropTypes.string,
  isDraggable: PropTypes.bool,
  orientation: PropTypes.string,
}

export default PgnViewer

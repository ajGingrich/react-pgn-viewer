import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CompleteBoard from './CompleteBoard'

function createMarkup() {
  return {__html: 'First &middot; Second'};
}

class PgnViewer extends React.Component {
  constructor(props) {
    super(props)
    this.createInnerHtml = this.createInnerHtml.bind(this)
    this.setPgn = this.setPgn.bind(this)

    this.state = { pgns: null }
  }

  createInnerHtml() {
    return {__html: this.props.children};
  }

  setPgn(pgns) {
    const { children, blackSquareColour, fen, isDraggable, orientation } = this.props
    // const { pgns } = this.state
    const nodes = ReactDOM.findDOMNode(this).querySelectorAll('pgn')

    for(let i=0; i<nodes.length; i++) {
      ReactDOM.render(<CompleteBoard
        pgnInformation={pgns[i]}
        blackSquareColour={blackSquareColour}
        fen={fen}
        isDraggable={isDraggable}
        orientation={orientation}
      />, nodes[i])
    }

    //remove old pgn here??!!?!
  }

  componentDidMount() {
    const nodes = ReactDOM.findDOMNode(this).querySelectorAll('pgn')
    let pgns = []

    for(let i=0; i < nodes.length; i++) {
      pgns.push(nodes[i].innerHTML.slice(0))
    }

    this.setState({ pgns: pgns })

    this.setPgn(pgns)
  }

  // componentDidUpdate() {
  //   this.setPgn()
  // }

  // componentWillUnmount() {
  //   ReactDOM.unmountComponentAtNode(this)
  // }

  render() {
    const { blackSquareColour, fen, isDraggable, orientation, children, innerHTML } = this.props

    return (
      <div>
        {innerHTML && <div dangerouslySetInnerHTML={this.createInnerHtml()}></div>}
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

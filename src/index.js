import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CompleteBoard from './CompleteBoard'

class PgnViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { pgns: null }
  }

  makeViewer = ({ pgnInformation }) => {
    const {
      blackSquareColour,
      isDraggable,
      orientation,
      width,
      backgroundColor,
    } = this.props

    return (
      <CompleteBoard
        pgnInformation={pgnInformation}
        blackSquareColour={blackSquareColour}
        width={width}
        isDraggable={isDraggable}
        orientation={orientation}
        backgroundColor={backgroundColor}
      />
    )
  }

  createInnerHtml = () => {
    return {__html: this.props.children};
  }

  additionalHTMLModification = () => {
    const { nodeToModify, nodeModification } = this.props
    const nodes = ReactDOM.findDOMNode(this).querySelectorAll(nodeToModify)

    if(typeof nodeModification !== 'function' || !nodeToModify) return null

    for (let i = 0;i < nodes.length;i++) {
        nodeModification(nodes[i])
    }
  }

  setPgn = (pgns) => {
    const nodes = ReactDOM.findDOMNode(this).querySelectorAll('pgn')

    for(let i=0;i<nodes.length;i++) {
      ReactDOM.render(this.makeViewer({ pgnInformation: pgns[i] }), nodes[i])
    }
  }

  componentDidMount() {
    const nodes = ReactDOM.findDOMNode(this).querySelectorAll('pgn')
    const pgns = []

    for(let i=0;i < nodes.length;i++) {
      pgns.push(nodes[i].innerHTML.slice(0))
    }

    this.setState({ pgns: pgns })

    this.additionalHTMLModification()
    this.setPgn(pgns)
  }

  componentDidUpdate() {
    this.additionalHTMLModification()
    this.setPgn(this.state.pgns)
  }

  render() {
    const { innerHTML, children } = this.props

    const pgnStyles = {
      display: 'flex',
      justifyContent: 'center'
    }

    return (
      <div style={pgnStyles}>
        {innerHTML && <div dangerouslySetInnerHTML={this.createInnerHtml()}></div>}
        {!innerHTML && <div>{this.makeViewer({ pgnInformation: children })}</div>}
      </div>
    )
  }
}

PgnViewer.propTypes = {
  backgroundColor: PropTypes.string,
  blackSquareColour: PropTypes.string,
  isDraggable: PropTypes.bool,
  nodeToModify: PropTypes.string,
  nodeModification: PropTypes.func,
  orientation: PropTypes.string,
  showCoordinates: PropTypes.bool,
  whiteSquareColour: PropTypes.string,
  width: PropTypes.number,
}

PgnViewer.defaultProps = {
  backgroundColor: '#e1e5ed',
  blackSquareColour: 'black',
  isDraggable: true,
  orientation: 'w',
  showCoordinates: true,
  whiteSquareColour: 'white',
  width: 600,
}

export default PgnViewer

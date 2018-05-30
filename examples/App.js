import React from 'react'
import PgnViewer from '../src/index'
import hljs from 'highlight.js/lib/highlight';

// ['javascript', 'java', 'python'].forEach((langName) => {
//   const langModule = require(`highlight.js/lib/languages/${langName}`);
//   hljs.registerLanguage(langName, langModule);
// });

class App extends React.Component {

  constructor(props) {
    super(props)

    this.handleHighlight = this.handleHighlight.bind(this)
  }

  handleHighlight(node) {
    hljs.highlightBlock(node)
  }

  render() {
    const headerStyle = {
      color: '#18003f'
    }

    return (
      <div>
        <h2 style={headerStyle}>React Pgn Viewer</h2>
        <PgnViewer
          blackSquareColour="steelblue"
          isDraggable={true}
          orientation="w"
          nodeToModify={'pre code'}
          nodeModification={this.handleHighlight}
          innerHTML
        >
          {'<pre class="language-javascript"><code>function foo { return bar }</code></pre><pgn>[Event ""] [Site ""] [Date "1997.02.15"] [EventDate "1997.02.04"] [Round "10"] [Result "0-1"] [White "Magnus Carlsen"] [Black "Fabiano Caruana"] [ECO "B90"] [WhiteElo "?"] [BlackElo "?"] [PlyCount "76"] 1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5 5.Bb3 Bb4+ 6.c3 Bd6 7.Bg5 dxe4 8.dxe4 h6 9.Bh4 Qe7 10.Nbd2 Nbd7 11.Bg3 Bc7 12.O-O Nh5 13.h3 Nxg3 14.fxg3 Nc5 15.Bxf7+ Kxf7 16.Nxe5+ Kg8 17.Ng6 Qg5 18.Rf8+ Kh7 19.Nxh8 Bg4 20.Qf1 Nd3 21.Qxd3 Rxf8 22.hxg4 Qxg4 23.Nf3 Qxg3 24.e5+ Kxh8 25.e6 Bb6+ 26.Kh1 Qg4 27.Qd6 Rd8 28.Qe5 Rd5 29.Qb8+ Kh7 30.e7 Qh5+ 31.Nh2 Rd1+ 32.Rxd1 Qxd1+ 33.Nf1 Qxf1+ 34.Kh2 Qg1+ 0-1</pgn><pre class="language-javascript"><code>const foo = bar</code></pre><pgn>Event "Karlsbad"][Site "Karlsbad"][Date "1907.??.??"][Round "?"][White "Mieses, Jacques"][Black "Nimzowitsch, Aaron "][Result "0-1"][WhiteElo ""][BlackElo ""][ECO "C28"]1.e4 e5 2.Nc3 Nf6 3.Bc4 Nc6 4.d3 Bb4 5.Bg5 h6 6.Bxf6 Bxc3+ 7.bxc3 Qxf6 8.Ne2 d69.O-O Be6 10.Bxe6 fxe6 11.f4 O-O 12.Qb1 Rab8 13.Qb3 Kh7 14.f5 exf5 15.Rxf5 Qe716.Raf1 Rxf5 17.exf5 Nd8 18.Ng3 c6 19.f6 gxf6 20.Nh5 Ne6 21.Rxf6 d5 22.g3 Ng7 23.Rxc6 Nxh5 24.Qb5 Rg8 25.Rc5 Nxg3 26.Rxd5 Ne4+  0-1</pgn><h2>bufferspace</h2>'}
      </PgnViewer>
      </div>
    )
  }
}

export default App

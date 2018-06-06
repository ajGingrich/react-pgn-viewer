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
    const headerStyles = {
      color: '#18003f',
      display: 'flex',
      justifyContent: 'center',
    }

    return (
      <div>
        <h2 style={headerStyles}>React Pgn Viewer with innerHTML</h2>
        <PgnViewer
          blackSquareColour="steelblue"
          isDraggable={true}
          orientation="w"
          nodeToModify={'pre code'}
          nodeModification={this.handleHighlight}
          innerHTML
        >
          {'<pre class="language-javascript"><code>function foo { return bar }</code></pre><pgn>[Event ""] [Site ""] [Date "1997.02.15"] [EventDate "1997.02.04"] [Round "10"] [Result "0-1"] [White "Magnus Carlsen"] [Black "Fabiano Caruana"] [ECO "B90"] [WhiteElo "?"] [BlackElo "?"] [PlyCount "76"] 1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5 5.Bb3 Bb4+ 6.c3 Bd6 7.Bg5 dxe4 8.dxe4 h6 9.Bh4 Qe7 10.Nbd2 Nbd7 11.Bg3 Bc7 12.O-O Nh5 13.h3 Nxg3 14.fxg3 Nc5 15.Bxf7+ Kxf7 16.Nxe5+ Kg8 17.Ng6 Qg5 18.Rf8+ Kh7 19.Nxh8 Bg4 20.Qf1 Nd3 21.Qxd3 Rxf8 22.hxg4 Qxg4 23.Nf3 Qxg3 24.e5+ Kxh8 25.e6 Bb6+ 26.Kh1 Qg4 27.Qd6 Rd8 28.Qe5 Rd5 29.Qb8+ Kh7 30.e7 Qh5+ 31.Nh2 Rd1+ 32.Rxd1 Qxd1+ 33.Nf1 Qxf1+ 34.Kh2 Qg1+ 0-1</pgn><pre class="language-javascript"><code>const foo = bar</code></pre><pgn>[Event "Corus"][Site "Wijk aan Zee NED"][Date "2008.01.26"][EventDate "2008.01.12"][Round "12"][Result "0-1"][White "Vladimir Kramnik"][Black "Magnus Carlsen"][ECO "A30"][WhiteElo "2799"][BlackElo "2733"][PlyCount "114"]1. Nf3 Nf6 2. c4 e6 3. Nc3 c5 4. g3 b6 5. Bg2 Bb7 6. O-O Be7 7. d4 cxd4 8. Qxd4 d6 9. Rd1 a6 10. Ng5 Bxg2 11. Kxg2 Nc6 12. Qf4 O-O 13. Nce4 Ne8 14. b3 Ra7 15. Bb2 Rd7 16. Rac1 Nc7 17. Nf3 f5 18. Nc3 g5 19. Qd2 g4 20. Ne1 Bg5 21. e3 Rff7 22. Kg1 Ne8 23. Ne2 Nf6 24. Nf4 Qe8 25. Qc3 Rg7 26. b4 Ne4 27. Qb3 Rge7 28. Qa4 Ne5 29. Qxa6 Ra7 30. Qb5 Qxb5 31. cxb5 Rxa2 32. Rc8+ Kf7 33. Nfd3 Bf6 34. Nxe5+ dxe5 35. Rc2 Rea736. Kg2 Ng5 37. Rd6 e4 38. Bxf6 Kxf6 39. Kf1 Ra1 40. Ke2 Rb1 41. Rd1 Rxb4 42. Ng2 Rxb5 43. Nf4 Rc5 44. Rb2 b5 45. Kf1 Rac7 46. Rbb1 Rb7 47. Rb4 Rc4 48. Rb2 b4 49. Rdb1 Nf3 50. Kg2 Rd751. h3 e5 52. Ne2 Rd2 53. hxg4 fxg4 54. Rxd2 Nxd2 55. Rb2 Nf3 56. Kf1 b3 57. Kg2 Rc2 0-1</pgn>'}
      </PgnViewer>
      <h2 style={headerStyles}>innerHTML === false </h2>
      <PgnViewer
        blackSquareColour="steelblue"
        isDraggable={false}
        orientation="w"
      >
        [Event ""] [Site ""] [Date "1997.02.15"] [EventDate "1997.02.04"] [Round "10"] [Result "0-1"] [White "Magnus Carlsen"] [Black "Fabiano Caruana"] [ECO "B90"] [WhiteElo "?"] [BlackElo "?"] [PlyCount "76"] 1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5 5.Bb3 Bb4+ 6.c3 Bd6 7.Bg5 dxe4 8.dxe4 h6 9.Bh4 Qe7 10.Nbd2 Nbd7 11.Bg3 Bc7 12.O-O Nh5 13.h3 Nxg3 14.fxg3 Nc5 15.Bxf7+ Kxf7 16.Nxe5+ Kg8 17.Ng6 Qg5 18.Rf8+ Kh7 19.Nxh8 Bg4 20.Qf1 Nd3 21.Qxd3 Rxf8 22.hxg4 Qxg4 23.Nf3 Qxg3 24.e5+ Kxh8 25.e6 Bb6+ 26.Kh1 Qg4 27.Qd6 Rd8 28.Qe5 Rd5 29.Qb8+ Kh7 30.e7 Qh5+ 31.Nh2 Rd1+ 32.Rxd1 Qxd1+ 33.Nf1 Qxf1+ 34.Kh2 Qg1+ 0-1
      </PgnViewer>
      </div>
    )
  }
}

export default App

import React from 'react'
import PgnViewer from 'src'

class App extends React.Component {

  constructor(props) {
    super(props)
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
          isDraggable={false}
          orientation="w"
        >
        {'[Event ""] [Site ""] [Date "1997.02.15"] [EventDate "1997.02.04"] [Round "10"] [Result "0-1"] [White ""] [Black ""] [ECO "B90"] [WhiteElo "?"] [BlackElo "?"] [PlyCount "76"] 1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Nf3 d5 5.Bb3 Bb4+ 6.c3 Bd6 7.Bg5 dxe4 8.dxe4 h6 9.Bh4 Qe7 10.Nbd2 Nbd7 11.Bg3 Bc7 12.O-O Nh5 13.h3 Nxg3 14.fxg3 Nc5 15.Bxf7+ Kxf7 16.Nxe5+ Kg8 17.Ng6 Qg5 18.Rf8+ Kh7 19.Nxh8 Bg4 20.Qf1 Nd3 21.Qxd3 Rxf8 22.hxg4 Qxg4 23.Nf3 Qxg3 24.e5+ Kxh8 25.e6 Bb6+ 26.Kh1 Qg4 27.Qd6 Rd8 28.Qe5 Rd5 29.Qb8+ Kh7 30.e7 Qh5+ 31.Nh2 Rd1+ 32.Rxd1 Qxd1+ 33.Nf1 Qxf1+ 34.Kh2 Qg1+ {0-1}'}
        </PgnViewer>
      </div>
    )
  }
}

export default App

import React from 'react';
import PgnViewer from '../src/index';

const EXAMPLE_PGN = [
  '[Event "World Chess Championship"]',
  '[Site "Kolkata IND"]',
  '[Date "2024.12.12"]',
  '[Round "14"]',
  '[Result "1-0"]',
  '[White "D. Gukesh"]',
  '[Black "Ding Liren"]',
  '[ECO "C65"]',
  '[WhiteElo "2783"]',
  '[BlackElo "2728"]',
  '',
  '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.d3 b5 7.Bb3 d6 8.a3 O-O 9.Nc3 Na5 10.Ba2 Be6 11.Bxe6 fxe6 12.b4 Nc6 13.Nd5 exd5 14.exd5 Nd4 15.Nxd4 exd4 16.Qh5 Rf6 17.Bg5 Nxd5 18.Bxf6 Bxf6 19.c3 dxc3 20.Qxd5+ Kh8 21.Qxa8 Qe7 22.Rfc1 Qe2 23.Qd5 c2 24.Rxc2 Qd1+ 25.Rc1 Qe2 26.Rxc7 Qd1+ 27.Rc1 Qe2 28.Qd3 Qxd3 29.Rc3 Qd1+ 30.Rc1 Qd4 31.a4 Qd1+ 32.Rc1 Qd4 33.axb5 axb5 34.Ra8+ Bf8 35.g3 Qd1+ 36.Rc1 Qd4 37.Kg2 Qd1 38.h3 h6 39.Rc8 Qd4 40.Rxf8+ Kh7 41.Rf7 1-0',
].join('\n');

const EXAMPLE_PGN_2 = [
  '[Event "Classical"]',
  '[Site "Online"]',
  '[Date "2024.01.15"]',
  '[Round "1"]',
  '[Result "0-1"]',
  '[White "Magnus Carlsen"]',
  '[Black "Hikaru Nakamura"]',
  '',
  '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be2 e5 7.Nb3 Be7 8.O-O O-O 9.Be3 Be6 10.Qd2 Nbd7 11.a4 Rc8 12.a5 Qc7 13.Rfd1 Rfd8 14.Bf3 Nc5 15.Nxc5 dxc5 16.Qe2 Bd6 17.Nd5 Bxd5 18.exd5 e4 19.Be2 Nd7 20.c4 f5 21.Rac1 Qe7 0-1',
].join('\n');

const App: React.FC = () => {
  const headerStyles: React.CSSProperties = {
    color: '#18003f',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
  };

  return (
    <div style={containerStyles}>
      <h1 style={headerStyles}>React PGN Viewer Demo</h1>

      <div style={{ marginTop: '2rem' }}>
        <h2 style={headerStyles}>Gukesh vs Ding Liren</h2>
        <PgnViewer
          width={700}
          orientation="w"
          backgroundColor="#f0f0f0"
        >
          {EXAMPLE_PGN}
        </PgnViewer>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={headerStyles}>Carlsen vs Nakamura</h2>
        <PgnViewer
          width={700}
          orientation="w"
          backgroundColor="#e8f4e8"
        >
          {EXAMPLE_PGN_2}
        </PgnViewer>
      </div>
    </div>
  );
};

export default App;

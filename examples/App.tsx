import React from 'react';
import PgnViewer from '../src/index';

const EXAMPLE_PGN = [
  '[Event "FIDE World Championship"]',
  '[Site "Singapore SIN"]',
  '[Date "2024.12.12"]',
  '[Round "14"]',
  '[Result "0-1"]',
  '[White "Ding Liren"]',
  '[Black "Gukesh D"]',
  '[ECO "A08"]',
  '[WhiteElo "2728"]',
  '[BlackElo "2783"]',
  '',
  '1.Nf3 d5 2.g3 c5 3.Bg2 Nc6 4.d4 e6 5.O-O cxd4 6.Nxd4 Nge7 7.c4 Nxd4 8.Qxd4 Nc6 9.Qd1 d4 10.e3 Bc5 11.exd4 Bxd4 12.Nc3 O-O 13.Nb5 Bb6 14.b3 a6 15.Nc3 Bd4 16.Bb2 e5 17.Qd2 Be6 18.Nd5 b5 19.cxb5 axb5 20.Nf4 exf4 21.Bxc6 Bxb2 22.Qxb2 Rb8 23.Rfd1 Qb6 24.Bf3 fxg3 25.hxg3 b4 26.a4 bxa3 27.Rxa3 g6 28.Qd4 Qb5 29.b4 Qxb4 30.Qxb4 Rxb4 31.Ra8 Rxa8 32.Bxa8 g5 33.Bd5 Bf5 34.Rc1 Kg7 35.Rc7 Bg6 36.Rc4 Rb1+ 37.Kg2 Re1 38.Rb4 h5 39.Ra4 Re5 40.Bf3 Kh6 41.Kg1 Re6 42.Rc4 g4 43.Bd5 Rd6 44.Bb7 Kg5 45.f3 f5 46.fxg4 hxg4 47.Rb4 Bf7 48.Kf2 Rd2+ 49.Kg1 Kf6 50.Rb6+ Kg5 51.Rb4 Be6 52.Ra4 Rb2 53.Ba8 Kf6 54.Rf4 Ke5 55.Rf2 Rxf2 56.Kxf2 Bd5 57.Bxd5 Kxd5 58.Ke3 Ke5 0-1',
].join('\n');

const EXAMPLE_PGN_2 = [
  '[Event "8th Tal Memorial"]',
  '[Site "Moscow RUS"]',
  '[Date "2013.06.22"]',
  '[Round "8"]',
  '[Result "1-0"]',
  '[White "Magnus Carlsen"]',
  '[Black "Hikaru Nakamura"]',
  '[ECO "A13"]',
  '[WhiteElo "2864"]',
  '[BlackElo "2784"]',
  '',
  '1.c4 e6 2.g3 d5 3.Bg2 c6 4.Qc2 Nf6 5.Nf3 dxc4 6.Qxc4 b5 7.Qb3 Bb7 8.O-O Nbd7 9.d4 a6 10.Ne5 Qb6 11.Be3 c5 12.Nxd7 Nxd7 13.d5 e5 14.a4 b4 15.Nd2 Bd6 16.Nc4 Qc7 17.f4 O-O 18.Rac1 exf4 19.Bxf4 Bxf4 20.gxf4 a5 21.e4 Rae8 22.e5 Ba6 23.Rfe1 Kh8 24.Nd6 Re7 25.Qe3 Qd8 26.b3 g5 27.Kh1 Qb8 28.Qf2 gxf4 29.Qxf4 Bd3 30.Re3 Bg6 31.Rf1 Rxe5 32.Rxe5 Qxd6 33.Re8 Qxf4 34.Rxf8+ Kg7 35.Rxf4 Kxf8 36.d6 Ne5 37.Bf1 Bc2 38.Bb5 f5 39.Kg2 c4 40.Bxc4 Be4+ 41.Kg3 Nxc4 42.bxc4 Ke8 43.c5 Bc6 44.Rxf5 Bxa4 45.Re5+ Kd8 46.Re7 Bc6 47.Rc7 1-0',
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
        <h2 style={headerStyles}>Ding Liren vs Gukesh D</h2>
        <PgnViewer width={700} orientation="w" showCoordinates={true} backgroundColor="#f0f0f0">
          {EXAMPLE_PGN}
        </PgnViewer>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={headerStyles}>Carlsen vs Nakamura</h2>
        <PgnViewer width={700} orientation="w" showCoordinates={true} backgroundColor="#e8f4e8">
          {EXAMPLE_PGN_2}
        </PgnViewer>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import PgnViewer from '../../src/index';

const BLOG_HTML = `
<h1>Costa Rican Chess Championship</h1>
<p>Two friends battled it out at the Costa Rican National Chess Championships.</p>
<pgn>[Event "CRC-ch 81th"]
[White "Urbina, Edwin"]
[Black "Duran Vega, Sergio"]
[PlyCount "51"]

1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6 5. Nc3 Bb4 6. Bd2 O-O 7. O-O-O Re8 8. Qg3 Rxe4 9. a3</pgn>
<p>The opening was a sharp Sicilian-style line with early tactics.</p>
<pgn>[Event "8th Tal Memorial"]
[White "Carlsen, Magnus"]
[Black "Nakamura, Hikaru"]
[PlyCount "51"]

1. c4 e6 2. g3 d5 3. Bg2 c6 4. Qc2 Nf6 5. Nf3 dxc4 6. Qxc4 b5 7. Qb3 Bb7 8. O-O Nbd7 9. d4 a6 10. Ne5 Qb6 11. Be3 c5 12. Nxd7 Nxd7 13. d5 e5 14. a4 b4 15. Nd2 Bd6</pgn>
<p>Black held the balance with precise defense.</p>
`;

const App: React.FC = () => {
  return (
    <div className="blog-post">
      <PgnViewer innerHTML>{BLOG_HTML}</PgnViewer>
    </div>
  );
};

export default App;

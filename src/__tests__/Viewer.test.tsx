import { render } from '@testing-library/react';
import Viewer from '../Viewer';

const basicPgn = '1. e4 e5 2. Nf3 Nc6';

describe('Viewer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Viewer pgnInformation={basicPgn} />);
    const boardElement = container.querySelector(
      '[data-boardid="pgn-chessboard"]'
    );
    expect(boardElement).toBeInTheDocument();
  });
});

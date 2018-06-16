const getActiveSquare = (moves, index) => {
  const isWhiteMove = (index-1) % 2 === 0
  let activeSquare = null

  if(moves && index) {
    switch (moves[index-1]) {
      case 'O-O':
        activeSquare = isWhiteMove ? 'g1' : 'g8'
        break
      case 'O-O-O':
        activeSquare = isWhiteMove ? 'c1' : 'c8'
        break
      default:
        activeSquare = moves[index-1].match(/[a-z][1-8]/gm)[0]
    }
  }

  return activeSquare
}

export { getActiveSquare }

import baseStyles from './baseStyles'

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

const getBaseStyles = (params) => {
  const { screenWidth, backgroundColor, defaultWidth } = params
  const styles = JSON.parse(JSON.stringify(baseStyles))
  let isMobile = false
  let width
  styles.wrapper.width = defaultWidth
  styles.wrapper.backgroundColor = backgroundColor

  if(screenWidth && screenWidth < 768) {
    styles.base.width = '90%'
    width = '90%'
    styles.base.flexDirection = 'column'
    isMobile = true
  } else {
    width = defaultWidth
    styles.base.width = defaultWidth
    styles.base.flexDirection = 'row'
  }

  return { width, isMobile, baseStyles: styles.base, wrapperStyles: styles.wrapper}
}

export { getActiveSquare, getBaseStyles }

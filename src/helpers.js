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
  const isScreenMobile = screenWidth && screenWidth < 768
  const width = isScreenMobile ? '90%' : defaultWidth
  const flexDirection = isScreenMobile ? 'column' : 'row'
  const stylesToModify = []

  stylesToModify.push({ area: 'base', 'stylePair': ['width', width] })
  stylesToModify.push({ area: 'base', 'stylePair': ['flexDirection', flexDirection] })
  stylesToModify.push({ area: 'wrapper', 'stylePair': ['width', defaultWidth] })
  stylesToModify.push({ area: 'wrapper', 'stylePair': ['background', backgroundColor] })

  const styles = setStyle(stylesToModify)

  return { width, isMobile: isScreenMobile, baseStyles: styles.base, wrapperStyles: styles.wrapper }
}

const setStyle = (stylesToModify) => {
  const styleClone = JSON.parse(JSON.stringify(baseStyles))

  for (const style of stylesToModify) {
    styleClone[style.area][style.stylePair[0]] = style.stylePair[1]
  }

  return styleClone
}

export { getActiveSquare, getBaseStyles }

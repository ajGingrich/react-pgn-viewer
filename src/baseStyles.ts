import React from 'react';

interface StyleObject {
  base: React.CSSProperties;
  wrapper: React.CSSProperties;
}

const baseStyles: StyleObject = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wrapper: {
    width: 500,
    background: 'white',
  },
};

export default baseStyles;

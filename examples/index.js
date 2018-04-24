import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.getElementById('root')
  );

render(Root);

if(module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    render(NextApp);
  })
}

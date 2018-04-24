import React from 'react';
import { ErrorBoundary, App } from 'Components'

const Root = () => {
  return <ErrorBoundary>
          <App />
        </ErrorBoundary>;
};

export default Root

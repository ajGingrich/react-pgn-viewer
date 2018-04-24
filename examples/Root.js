import React from 'react';
import { ErrorBoundary } from 'Components'

const Root = () => {
  return <ErrorBoundary>
          <Routes />
        </ErrorBoundary>;
};

export default Root

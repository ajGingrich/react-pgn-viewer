import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
  hydrateRoot(container, <App />);
}

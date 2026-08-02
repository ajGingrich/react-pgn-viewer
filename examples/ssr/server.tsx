import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

const html = renderToString(<App />);

const page = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>react-pgn-viewer SSR example</title>
</head>
<body>
  <div id="root">${html}</div>
  <script type="module" src="/client.js"></script>
</body>
</html>`;

Bun.serve({
  port: 3100,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/client.js') {
      return new Response(Bun.file(import.meta.dir + '/public/client.js'), {
        headers: { 'content-type': 'text/javascript' },
      });
    }
    return new Response(page, { headers: { 'content-type': 'text/html' } });
  },
});

console.log('SSR server running at http://localhost:3100');

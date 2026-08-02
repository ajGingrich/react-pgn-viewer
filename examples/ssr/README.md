# SSR Example

Demonstrates server-side rendering of `PgnViewer` with client hydration,
mirroring the Next.js blog usage (`innerHTML` mode with prose around `<pgn>` tags).

## Files

- `App.tsx` - Shared app component (used by both server and client)
- `server.tsx` - SSR server: `renderToString` + serves HTML (run with Bun)
- `client.tsx` - Client entry: `hydrateRoot`

## Run

```bash
# Build the client bundle (once)
bun run build:client

# Start the SSR server on port 3100
bun run server

# Open http://localhost:3100
```

## What this proves

Server-rendered HTML contains visible prose, but the chessboards are empty
(`react-chessboard` returns an empty div on the server) and the move list is
absent (Viewer initializes state in `useEffect`). After hydration the boards
populate, producing a React hydration-mismatch warning.

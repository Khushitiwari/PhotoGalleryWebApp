# Photo Gallery

A React + Vite photo gallery. It loads 30 photos from the Picsum Photos API, filters them by author as you type, and saves favourites with `useReducer` and `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

## Where the required pieces live

- `src/hooks/useFetchPhotos.js` — fetches photos and returns `photos`, `loading`, and `error`
- `src/reducers/favouritesReducer.js` — `TOGGLE_FAVOURITE` action for the heart button
- `src/components/Gallery.jsx` — uses the fetch hook, `useCallback` for the search handler, and `useMemo` for the filtered list
- `src/components/PhotoCard.jsx` — photo, author name, and heart button
- `src/components/SearchBar.jsx` — search input, memoized so it can skip renders when the handler stays the same

## Screen recording

The assignment also asks for a 5-minute recording of you explaining this code. Record it yourself and submit the link with the GitHub repo.

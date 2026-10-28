import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  FAVOURITES_STORAGE_KEY,
  favouritesReducer,
  loadFavouriteIds,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'

function LoadingState() {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-20 text-stone-600">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-800" />
      <p>Loading photos…</p>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <p
      role="alert"
      className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800"
    >
      {message}
    </p>
  )
}

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favouriteIds, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavouriteIds,
  )

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favouriteIds))
    } catch {
      // Keep the in-memory list even if the browser blocks storage.
    }
  }, [favouriteIds])

  // Keeps the same function between renders, so the memoized search box
  // does not re-render when a favourite is toggled.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  // Rebuilds the visible list only when the fetched photos or the query change.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return photos

    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  const resultLabel = query.trim()
    ? `${filteredPhotos.length} of ${photos.length} photos`
    : `${photos.length} photos`

  return (
    <section className="flex flex-col gap-6">
      <SearchBar
        value={query}
        onChange={handleSearchChange}
        disabled={loading || Boolean(error)}
      />

      {loading && <LoadingState />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          <p className="text-sm text-stone-600">{resultLabel}</p>
          {filteredPhotos.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center text-stone-600">
              No photos by “{query.trim()}”.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <li key={photo.id}>
                  <PhotoCard
                    photo={photo}
                    isFavourite={favouriteIds.includes(String(photo.id))}
                    onToggleFavourite={handleToggleFavourite}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

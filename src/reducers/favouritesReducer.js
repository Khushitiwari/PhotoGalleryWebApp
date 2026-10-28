export const FAVOURITES_STORAGE_KEY = 'photo-gallery-favourites'

export function loadFavouriteIds() {
  try {
    const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (!stored) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.map(String)
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = String(action.id)

      if (state.includes(id)) {
        return state.filter((favouriteId) => favouriteId !== id)
      }

      return [...state, id]
    }
    default:
      return state
  }
}

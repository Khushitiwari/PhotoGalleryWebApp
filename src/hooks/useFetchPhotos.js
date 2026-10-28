import { useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(PHOTOS_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Could not load photos. Please refresh and try again.')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Could not load photos. Please refresh and try again.')
        }

        setPhotos(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError('Could not load photos. Please refresh and try again.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}

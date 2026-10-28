import { memo } from 'react'

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M12 20.6s-6.6-4.2-8.6-8.1C1.9 9.5 3 6.6 5.9 5.8c1.7-.5 3.3.1 4.3 1.6 1-1.5 2.6-2.1 4.3-1.6 2.9.8 4 3.7 2.5 6.7-2 3.9-8.6 8.1-8.6 8.1z"
      />
    </svg>
  )
}

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const imageUrl = `https://picsum.photos/id/${photo.id}/800/600`

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full bg-stone-200 object-cover"
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            Author
          </p>
          <p className="truncate text-sm font-semibold text-ink" title={photo.author}>
            {photo.author}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Save photo by ${photo.author} to favourites`
          }
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
            isFavourite
              ? 'border-rose-200 bg-rose-50 text-rose-600'
              : 'border-stone-200 bg-white text-stone-500 hover:border-rose-200 hover:text-rose-600'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </article>
  )
}

export default memo(PhotoCard)

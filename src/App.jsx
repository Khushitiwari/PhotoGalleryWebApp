import Gallery from './components/Gallery'

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="border-b border-stone-200 bg-[#fbf8f4]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
            Picsum Photos
          </p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Photo Gallery</h1>
          <p className="max-w-xl text-sm leading-6 text-stone-600">
            Browse thirty photos, search by author, and tap the heart to save a favourite.
            Saved photos stay on this device after a refresh.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Gallery />
      </main>
    </div>
  )
}

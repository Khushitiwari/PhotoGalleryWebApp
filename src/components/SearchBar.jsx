import { memo } from 'react'

function SearchBar({ value, onChange, disabled }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-700">
        Search by author
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Type an author name"
        autoComplete="off"
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
      />
    </label>
  )
}

export default memo(SearchBar)

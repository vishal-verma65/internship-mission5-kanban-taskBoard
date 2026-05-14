import { useCallback } from 'react'
import useTaskStore from '../store/useTaskStore.js'

export default function SearchBar() {
  const searchQuery    = useTaskStore((s) => s.searchQuery)
  const setSearchQuery = useTaskStore((s) => s.setSearchQuery)

  const handleChange = useCallback(
    (e) => setSearchQuery(e.target.value),
    [setSearchQuery]
  )

  const handleClear = useCallback(
    () => setSearchQuery(''),
    [setSearchQuery]
  )

  return (
    <div className="relative w-full max-w-sm">
      {/* Search icon */}
      <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
          />
        </svg>
      </span>

      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search tasks…"
        aria-label="Search tasks"
        className="
          w-full bg-white/5 border border-white/10
          text-slate-100 placeholder-slate-500
          rounded-xl pl-10 pr-9 py-2.5 text-sm font-body
          transition-all duration-150
          focus:outline-none focus:border-surface-500 focus:ring-2 focus:ring-surface-500/20
          hover:border-white/20
        "
      />

      {/* Clear button — only visible when there's a query */}
      {searchQuery && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute inset-y-0 right-3 flex items-center
            text-slate-500 hover:text-slate-300
            transition-colors duration-150
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
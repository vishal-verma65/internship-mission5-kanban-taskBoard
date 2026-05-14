/**
 * Empty state placeholder shown when a column contains no (visible) tasks.
 * @param {{ isFiltered: boolean }} props
 */
export default function EmptyState({ isFiltered = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 animate-fade-in">
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
        {isFiltered ? (
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="text-center space-y-1">
        <p className="text-sm font-display font-medium text-slate-400">
          {isFiltered ? 'No matches found' : 'No tasks yet'}
        </p>
        <p className="text-xs font-body text-slate-600">
          {isFiltered
            ? 'Try a different search term'
            : 'Drop a task here or add a new one'}
        </p>
      </div>
    </div>
  )
}
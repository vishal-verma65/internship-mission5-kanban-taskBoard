import SearchBar from './SearchBar'

export default function BoardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      <header className="sticky top-0 z-30 glass-strong border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-surface-500 to-surface-700 flex items-center justify-center shadow-lg shadow-surface-700/30">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            </div>
            <span className="font-display font-bold text-base text-white tracking-tight hidden sm:block">
              Kanban<span className="text-surface-400">Board</span>
            </span>
          </div>

          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* Right slot (extensible) */}
          <div className="shrink-0 w-8 sm:w-auto" />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-10 py-6">
        {children}
      </main>

      <footer className="text-center py-2 text-xs font-body text-slate-700 border-t border-white/5">
        Built with React · dnd-kit · Zustand · Tailwind CSS
      </footer>
    </div>
  )
}
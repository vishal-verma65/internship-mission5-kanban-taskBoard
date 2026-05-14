export const COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    accent: 'from-slate-400 to-slate-500',
    dot: 'bg-slate-400',
    ring: 'ring-slate-500/20',
    headerBg: 'bg-slate-400/10',
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    accent: 'from-surface-400 to-surface-600',
    dot: 'bg-surface-400',
    ring: 'ring-surface-500/20',
    headerBg: 'bg-surface-500/10',
  },
  {
    id: 'done',
    title: 'Done',
    accent: 'from-emerald-400 to-emerald-600',
    dot: 'bg-emerald-400',
    ring: 'ring-emerald-500/20',
    headerBg: 'bg-emerald-500/10',
  },
]

export const PRIORITIES = [
  { value: 'high',   label: 'High',   color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/30'    },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/30' },
  { value: 'low',    label: 'Low',    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
]

export const PRIORITY_BORDER = {
  high:   'border-l-red-500',
  medium: 'border-l-yellow-400',
  low:    'border-l-emerald-500',
}

export const LOCAL_STORAGE_KEY = 'kanban_tasks'
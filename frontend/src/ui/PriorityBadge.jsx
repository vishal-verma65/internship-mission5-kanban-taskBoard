import { PRIORITIES } from '../constants/index'

/**
 * Renders a small pill badge for a given priority value.
 * @param {{ priority: 'high' | 'medium' | 'low' }} props
 */
export default function PriorityBadge({ priority }) {
  const config = PRIORITIES.find((p) => p.value === priority)
  if (!config) return null

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5
        text-[10px] font-display font-semibold uppercase tracking-wider
        rounded-full border
        ${config.color} ${config.bg} ${config.border}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          priority === 'high'
            ? 'bg-red-400'
            : priority === 'medium'
            ? 'bg-yellow-400'
            : 'bg-emerald-400'
        }`}
      />
      {config.label}
    </span>
  )
}
import { useState, useCallback } from 'react'
import useTaskStore from '../store/useTaskStore.js'
import { PRIORITIES } from '../constants/index.js'

const DEFAULT_FORM = { title: '', priority: 'medium' }

export default function AddTaskForm() {
  const addTask = useTaskStore((s) => s.addTask)
  const [form, setForm]       = useState(DEFAULT_FORM)
  const [expanded, setExpanded] = useState(false)
  const [error, setError]     = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'title' && error) setError('')
  }, [error])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!form.title.trim()) {
        setError('Task title is required.')
        return
      }
      addTask({ title: form.title, priority: form.priority })
      setForm(DEFAULT_FORM)
      setExpanded(false)
      setError('')
    },
    [form, addTask]
  )

  const handleCancel = useCallback(() => {
    setForm(DEFAULT_FORM)
    setExpanded(false)
    setError('')
  }, [])

  /* Collapsed state */
  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="
          flex items-center gap-2 w-full
          px-4 py-2.5 rounded-xl
          border border-dashed border-white/10
          text-slate-500 hover:text-slate-300 hover:border-white/25 hover:bg-white/5
          text-sm font-body transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-surface-500/30
        "
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add a task
      </button>
    )
  }

  /* Expanded form */
  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-4 space-y-3 animate-scale-in"
      noValidate
    >
      {/* Title input */}
      <div className="space-y-1">
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          autoFocus
          aria-label="Task title"
          className={`
            input-field
            ${error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''}
          `}
        />
        {error && (
          <p className="text-xs text-red-400 font-body pl-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>

      {/* Priority selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-display font-semibold uppercase tracking-wider text-slate-500 pl-1">
          Priority
        </label>
        <div className="flex gap-2">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, priority: p.value }))}
              className={`
                flex-1 py-1.5 rounded-lg text-xs font-display font-semibold
                border transition-all duration-150
                ${form.priority === p.value
                  ? `${p.color} ${p.bg} ${p.border} scale-[1.03] shadow-sm`
                  : 'text-slate-500 bg-white/5 border-white/10 hover:border-white/20 hover:text-slate-300'
                }
              `}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1">
          Add Task
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="btn-ghost"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
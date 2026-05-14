import { useCallback } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useTaskStore from '../store/useTaskStore'
import { PRIORITY_BORDER } from '../constants/index'
import PriorityBadge from '../ui/PriorityBadge'
import EditableText from './EditableText'

export default function TaskCard({ task }) {
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const toggleDone = useTaskStore((s) => s.toggleDone)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { columnId: task.columnId } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSaveTitle = useCallback(
    (newTitle) => updateTask(task.id, { title: newTitle }),
    [task.id, updateTask]
  )

  const handleDelete = useCallback(
    () => deleteTask(task.id),
    [task.id, deleteTask]
  )

  const handleToggleDone = useCallback(
    () => toggleDone(task.id),
    [task.id, toggleDone]
  )

  const isDone = task.columnId === 'done'

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative glass rounded-2xl py-1.5 px-2.5
        border-l-4 ${PRIORITY_BORDER[task.priority] ?? 'border-l-slate-600'}
        transition-all duration-200 ease-out
        ${isDragging
          ? 'opacity-40 scale-[1.02] shadow-card-drag rotate-1 cursor-grabbing z-50'
          : 'opacity-100 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-default'
        }
        ${isDone ? 'opacity-75' : ''}
        animate-slide-up
      `}
    >
      {/* Top row: drag grip + tick + delete */}
      <div className="flex items-start justify-between gap-2 mb-1.5">

        {/* Drag grip */}
        <button
          {...attributes}
          {...listeners}
          aria-label="Drag task"
            className="
              mt-0.5 p-1 -ml-1 rounded-lg
              text-indigo-400 hover:text-indigo-200 hover:bg-white/5
              cursor-grab active:cursor-grabbing
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-indigo-500/30
            "
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 4a1 1 0 100 2 1 1 0 000-2zM7 9a1 1 0 100 2 1 1 0 000-2zM7 14a1 1 0 100 2 1 1 0 000-2zM13 4a1 1 0 100 2 1 1 0 000-2zM13 9a1 1 0 100 2 1 1 0 000-2zM13 14a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* ✔ Tick / undo-done button */}
          <button
            onClick={handleToggleDone}
            aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
            title={isDone ? 'Unmark done' : 'Mark as done'}
            className={` 
              p-1 rounded-lg transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-emerald-600/30
              ${isDone
                ? 'text-emerald-600 bg-emerald-500/20 hover:bg-emerald-500/30'
                : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 opacity-0 group-hover:opacity-100'
              }
            `}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            aria-label="Delete task"
              className="
                p-1 rounded-lg
                text-red-600 hover:text-red-700 hover:bg-red-500/15
                opacity-0 group-hover:opacity-100
                transition-all duration-150
                focus:outline-none focus:opacity-100 focus:ring-2 focus:ring-red-600/40
              "
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Editable title (strikethrough when done) */}
      <div className={`mb-1 ${isDone ? 'line-through opacity-50' : ''}`}>
        <EditableText value={task.title} onSave={handleSaveTitle} />
      </div>

      {/* Footer: priority badge + date */}
      <div className="flex items-center justify-between gap-2">
        <PriorityBadge priority={task.priority} />
        <span className="text-[10px] font-body text-slate-600 tabular-nums">
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  )
}
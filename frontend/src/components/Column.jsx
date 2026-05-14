import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useFilteredTasks } from '../utils/useFilteredTasks'
import useTaskStore from '../store/useTaskStore'
import TaskCard from './TaskCard'
import EmptyState from '../ui/EmptyState'

export default function Column({ column }) {
  const searchQuery = useTaskStore((s) => s.searchQuery)
  const tasks       = useFilteredTasks(column.id)
  const taskIds     = tasks.map((t) => t.id)

  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div
      className={`
        flex flex-col rounded-3xl glass
        transition-all duration-200
        ${isOver ? 'ring-2 ring-surface-500/40 bg-white/6' : ''}
        w-full lg:h-107 sm:h-91.25
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-3.5">
          <span
            className={`w-2.5 h-2.5 rounded-full bg-linear-to-br ${column.accent} shadow-sm`}
          />
          <h2 className="font-display font-bold text-sm tracking-wide text-slate-200 uppercase">
            {column.title}
          </h2>
        </div>

        {/* Task count badge */}
        <span
          className={`
            inline-flex items-center justify-center
            min-w-5.5 h-5.5 px-1.5
            rounded-full text-[11px] font-display font-bold
            ${column.headerBg} text-slate-400 ring-1 ${column.ring}
          `}
        >
          {tasks.length}
        </span>
      </div>

      <div
        className={`mx-4 h-px bg-linear-to-r ${column.accent} opacity-20 mb-3 shrink-0`}
      />
      
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2.5 px-3 pb-3 overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <EmptyState isFiltered={searchQuery.trim().length > 0} />
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </div>
    </div>
  )
}
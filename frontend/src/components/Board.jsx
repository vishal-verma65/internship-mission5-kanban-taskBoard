import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import useTaskStore from '../store/useTaskStore'
import { COLUMNS } from '../constants/index'
import Column from './Column'
import TaskCard from './TaskCard'
import AddTaskForm from './AddTaskForm'

export default function Board() {
  const tasks        = useTaskStore((s) => s.tasks)
  const reorderTasks = useTaskStore((s) => s.reorderTasks)
  const moveTask     = useTaskStore((s) => s.moveTask)

  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = useCallback(
    ({ active }) => {
      const task = tasks.find((t) => t.id === active.id)
      setActiveTask(task ?? null)
    },
    [tasks]
  )

  const handleDragOver = useCallback(
    ({ active, over }) => {
      if (!over) return
      const activeId = active.id
      const overId   = over.id

      const isOverColumn = COLUMNS.some((c) => c.id === overId)
      const overTask     = tasks.find((t) => t.id === overId)
      const overColumnId = isOverColumn ? overId : overTask?.columnId

      if (!overColumnId) return

      const activeTask = tasks.find((t) => t.id === activeId)
      if (!activeTask) return

      if (activeTask.columnId !== overColumnId) {
        moveTask(activeId, overColumnId)
      }
    },
    [tasks, moveTask]
  )

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      setActiveTask(null)
      if (!over) return

      const activeId = active.id
      const overId   = over.id
      if (activeId === overId) return

      const isOverColumn = COLUMNS.some((c) => c.id === overId)
      const overTask     = tasks.find((t) => t.id === overId)
      const overColumnId = isOverColumn ? overId : overTask?.columnId

      if (!overColumnId) return

      reorderTasks(activeId, isOverColumn ? null : overId, overColumnId)
    },
    [tasks, reorderTasks]
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* Add Task Form */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-md">
          <AddTaskForm />
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6 items-start">
        {COLUMNS.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>

      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        {activeTask ? (
          <div className="rotate-2 scale-105 opacity-95 pointer-events-none">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
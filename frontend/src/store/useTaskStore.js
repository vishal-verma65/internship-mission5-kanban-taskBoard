import { create } from 'zustand'
import { loadTasks, saveTasks } from '../utils/localStorage'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const useTaskStore = create((set, get) => ({
  tasks: loadTasks(),
  searchQuery: '',

  _persist(tasks) {
    saveTasks(tasks)
    return tasks
  },

  addTask({ title, priority }) {
    const newTask = {
      id: uid(),
      title: title.trim(),
      priority,
      columnId: 'todo',
      previousColumnId: null,
      createdAt: Date.now(),
    }
    set((state) => {
      const tasks = [...state.tasks, newTask]
      get()._persist(tasks)
      return { tasks }
    })
  },

  deleteTask(id) {
    set((state) => {
      const tasks = state.tasks.filter((t) => t.id !== id)
      get()._persist(tasks)
      return { tasks }
    })
  },

  updateTask(id, changes) {
    set((state) => {
      const tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, ...changes } : t
      )
      get()._persist(tasks)
      return { tasks }
    })
  },

  moveTask(id, columnId) {
    set((state) => {
      const tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, columnId } : t
      )
      get()._persist(tasks)
      return { tasks }
    })
  },

  toggleDone(id) {
    set((state) => {
      const tasks = state.tasks.map((t) => {
        if (t.id !== id) return t
        if (t.columnId === 'done') {
          return { ...t, columnId: t.previousColumnId ?? 'todo', previousColumnId: null }
        }
        return { ...t, previousColumnId: t.columnId, columnId: 'done' }
      })
      get()._persist(tasks)
      return { tasks }
    })
  },

  reorderTasks(activeId, overId, overColumnId) {
    set((state) => {
      const items = [...state.tasks]
      const activeIndex = items.findIndex((t) => t.id === activeId)
      if (activeIndex === -1) return {}
      items[activeIndex] = { ...items[activeIndex], columnId: overColumnId }
      const overIndex = items.findIndex((t) => t.id === overId)
      if (overIndex !== -1 && activeId !== overId) {
        const [moved] = items.splice(activeIndex, 1)
        const insertAt = items.findIndex((t) => t.id === overId)
        items.splice(insertAt >= 0 ? insertAt : items.length, 0, moved)
      }
      get()._persist(items)
      return { tasks: items }
    })
  },

  setSearchQuery(query) {
    set({ searchQuery: query })
  },
}))

export default useTaskStore
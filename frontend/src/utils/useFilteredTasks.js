import { useMemo } from 'react'
import useTaskStore from '../store/useTaskStore'

/**
 * Returns tasks for a specific column, filtered by the global search query.
 * Memoised so downstream components only re-render when relevant data changes.
 */
export function useFilteredTasks(columnId) {
  const tasks       = useTaskStore((s) => s.tasks)
  const searchQuery = useTaskStore((s) => s.searchQuery)

  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return tasks.filter((task) => {
      const inColumn   = task.columnId === columnId
      const matchQuery = query === '' || task.title.toLowerCase().includes(query)
      return inColumn && matchQuery
    })
  }, [tasks, searchQuery, columnId])
}
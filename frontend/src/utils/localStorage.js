import { LOCAL_STORAGE_KEY } from '../constants/index'

/**
 * Load tasks array from localStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 */
export function loadTasks() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Persist the tasks array to localStorage.
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage quota exceeded or private mode — fail silently
  }
}
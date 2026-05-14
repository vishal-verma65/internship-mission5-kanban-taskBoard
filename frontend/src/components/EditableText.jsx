import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Renders task title as plain text. Clicking it switches to an
 * inline textarea so the user can edit in place.
 *
 * @param {{ value: string, onSave: (newValue: string) => void }} props
 */
export default function EditableText({ value, onSave }) {
  const [editing, setEditing]   = useState(false)
  const [draft, setDraft]       = useState(value)
  const textareaRef             = useRef(null)

  /* Auto-focus + select all when entering edit mode */
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [editing])

  /* Sync external value changes (e.g. store updates) */
  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  const commit = useCallback(() => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    } else {
      setDraft(value) // revert if empty or unchanged
    }
    setEditing(false)
  }, [draft, value, onSave])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        commit()
      }
      if (e.key === 'Escape') {
        setDraft(value)
        setEditing(false)
      }
    },
    [commit, value]
  )

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        rows={2}
        aria-label="Edit task title"
        className="
          w-full bg-white/8 border border-surface-500/50
          text-slate-100 text-sm font-body leading-relaxed
          rounded-lg px-2.5 py-1.5 resize-none
          focus:outline-none focus:ring-2 focus:ring-surface-500/30
          transition-all duration-150
        "
      />
    )
  }

  return (
    <p
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => e.key === 'Enter' && setEditing(true)}
      title="Click to edit"
      className="
        text-sm font-body text-slate-200 leading-relaxed
        cursor-text select-none
        hover:text-white transition-colors duration-150
        rounded px-0.5 -mx-0.5
        focus:outline-none focus:ring-2 focus:ring-surface-500/40 focus:rounded-md
      "
    >
      {value}
    </p>
  )
}
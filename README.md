# Task Board Frontend

A small Kanban-style task board frontend built with React, Vite, Tailwind CSS and Zustand for state management. It supports creating tasks, dragging between columns, marking tasks done, and deleting tasks.

live link:
netlify : https://kanbantaskb.netlify.app/ 

vercel : https://internship-mission5-kanban-task-boa.vercel.app

<img width="1917" height="958" alt="image" src="https://github.com/user-attachments/assets/24cf2ff6-d4b0-497a-901d-a9b2dbd29595" />


## Features
- Create, edit and delete tasks
- Drag & drop tasks between columns (dnd-kit)
- Mark tasks as done / undo done
- Task prioritization with visual badge
- Local persistence of tasks via localStorage utilities

## Tech stack
- React
- Vite
- Tailwind CSS
- Zustand (state management)
- dnd-kit (drag & drop)

## Project structure
- `src/` — application source
	- `components/` — React components (TaskCard, Board, Column, etc.)
	- `ui/` — small UI helpers (PriorityBadge, EmptyState)
	- `store/` — Zustand store (`useTaskStore.js`)
	- `constants/` — app constants
	- `utils/` — helper hooks and localStorage helpers

## Local setup

Prerequisites: Node.js (16+ recommended) and npm or bun.

Install dependencies and run the dev server:

```bash
cd frontend
npm install
npm run dev
```

Available npm scripts (from package.json):
- `dev` — start Vite dev server
- `build` — build production files
- `preview` — preview production build locally
- `lint` — run ESLint

## Notes for contributors
- Code uses Tailwind utility classes — keep styles consistent with existing design tokens.
- State is centralized in `src/store/useTaskStore.js` — prefer updating via store actions.
- SVG icons use `currentColor` and are styled via utility classes on the buttons. Recent changes made drag/tick/delete icons use brighter colors for better visibility.

## Testing changes locally
1. Start the dev server (`npm run dev`).
2. Open the app in the browser and create a few tasks.
3. Verify the drag grip, tick (mark done) and delete icons are clearly visible and respond to hover/focus states.



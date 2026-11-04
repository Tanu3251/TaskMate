
import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toISO, todayISO } from '../utils/date'
import { useTasks } from '../context/TaskContext'

export default function CalendarWidget() {
  const { tasks } = useTasks()

  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const y = cursor.getFullYear()
  const m = cursor.getMonth()
  const lead = cursor.getDay()
  const days = new Date(y, m + 1, 0).getDate()

  // Group all tasks by their due date, including completed tasks.
  const tasksByDate = useMemo(() => {
    const grouped = new Map()

    tasks.forEach((task) => {
      const date = task.dueDate
        ? String(task.dueDate).slice(0, 10)
        : ''

      if (!date) return

      if (!grouped.has(date)) {
        grouped.set(date, [])
      }

      grouped.get(date).push(task)
    })

    return grouped
  }, [tasks])

  const shift = (n) => setCursor(new Date(y, m + n, 1))

  const cells = [
    ...Array(lead).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ]

  return (
    <section className="card">
      <div className="card-head">
        <h3>
          {cursor.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>

        <div className="row-gap">
          <button
            className="icon-btn sm"
            onClick={() => shift(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="icon-btn sm"
            onClick={() => shift(1)}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="cal">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="cal-dow">{d}</span>
        ))}

        {cells.map((d, i) => {
          if (!d) return <span key={i} />

          const iso = toISO(new Date(y, m, d))
          const dayTasks = tasksByDate.get(iso) || []

          const tooltip = dayTasks
            .map((task) =>
              `${task.title} — ${task.completed ? 'Completed' : 'Pending'}`
            )
            .join('\n')

          return (
         <span
          key={i}
          className={`cal-day ${iso === todayISO() ? 'today' : ''} ${dayTasks.length ? 'has-tasks' : ''}`}
          data-tooltip={tooltip}
          aria-label={`${iso}: ${tooltip || 'No tasks'}`}
        >
              {d}
              {dayTasks.length > 0 && <i />}
            </span>
          )
        })}
      </div>
    </section>
  )
}

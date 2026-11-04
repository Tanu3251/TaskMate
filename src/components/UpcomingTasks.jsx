import { CalendarClock } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import { relative, dayDiff } from '../utils/date'

export default function UpcomingTasks() {
  const { tasks, loading } = useTasks()
  const items = tasks.filter((t) => !t.completed && dayDiff(t.dueDate) >= 0).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 4)
  return (
    <section className="card">
      <div className="card-head"><h3>Upcoming</h3><CalendarClock size={18} className="muted" /></div>
      {loading ? <div className="skeleton" style={{ height: 140 }} /> : items.length === 0 ? <p className="muted">Nothing due soon.</p> : (
        <ul className="upcoming">
          {items.map((t) => (
            <li key={t.id}>
              <span className={`bar p-${t.priority}`} />
              <div><strong>{t.title}</strong><small>{t.category}</small></div>
              <em>{relative(t.dueDate)}</em>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

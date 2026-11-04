import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toISO, todayISO } from '../utils/date'
import { useTasks } from '../context/TaskContext'

export default function CalendarWidget() {
  const { tasks } = useTasks()
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const y = cursor.getFullYear(), m = cursor.getMonth()
  const lead = cursor.getDay(), days = new Date(y, m + 1, 0).getDate()
  const due = new Set(tasks.filter((t) => !t.completed).map((t) => t.dueDate))
  const shift = (n) => setCursor(new Date(y, m + n, 1))
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]

  return (
    <section className="card">
      <div className="card-head">
        <h3>{cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <div className="row-gap">
          <button className="icon-btn sm" onClick={() => shift(-1)} aria-label="Previous month"><ChevronLeft size={16} /></button>
          <button className="icon-btn sm" onClick={() => shift(1)} aria-label="Next month"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="cal">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />
          const iso = toISO(new Date(y, m, d))
          return <span key={i} className={`cal-day ${iso === todayISO() ? 'today' : ''}`}>{d}{due.has(iso) && <i />}</span>
        })}
      </div>
    </section>
  )
}

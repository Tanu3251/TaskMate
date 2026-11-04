import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import { useTasks } from '../context/TaskContext'
import { CATEGORIES, PRIORITIES } from '../data/mockTasks'
import { isOverdue } from '../utils/date'

const Select = ({ value, onChange, label, options }) => (
  <select className="select" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
    <option value="all">{label}</option>{options.map((o) => <option key={o.v ?? o} value={o.v ?? o}>{o.l ?? o}</option>)}
  </select>
)

export default function TaskBoard({ title = 'Your tasks', limit }) {
  const { tasks, loading, search, toggleTask, openEditor, askDelete } = useTasks()
  const [cat, setCat] = useState('all'), [pri, setPri] = useState('all'), [status, setStatus] = useState('all')

  const list = useMemo(() => tasks.filter((t) => {
    const q = search.trim().toLowerCase()
    if (q && !`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(q)) return false
    if (cat !== 'all' && t.category !== cat) return false
    if (pri !== 'all' && t.priority !== pri) return false
    if (status === 'completed' && !t.completed) return false
    if (status === 'pending' && t.completed) return false
    if (status === 'overdue' && !isOverdue(t)) return false
    return true
  }), [tasks, search, cat, pri, status])
  const shown = limit ? list.slice(0, limit) : list
  const filtered = search || cat !== 'all' || pri !== 'all' || status !== 'all'

  return (
    <section className="card board">
      <div className="card-head wrap">
        <h3>{title}</h3>
        <div className="filters">
          <Select label="All categories" value={cat} onChange={setCat} options={CATEGORIES} />
          <Select label="All priorities" value={pri} onChange={setPri} options={PRIORITIES} />
          <Select label="All statuses" value={status} onChange={setStatus} options={[{ v: 'pending', l: 'Pending' }, { v: 'completed', l: 'Completed' }, { v: 'overdue', l: 'Overdue' }]} />
        </div>
      </div>
      {loading ? (
        <div className="stack">{[0, 1, 2].map((i) => <div key={i} className="skeleton" style={{ height: 108 }} />)}</div>
      ) : shown.length === 0 ? (
        <EmptyState
          title={filtered ? 'No tasks match your filters' : 'Your list is clear'}
          text={filtered ? 'Try a different search or reset the filters.' : 'Add your first task and start building momentum.'}
          action={<button className="btn btn-primary" onClick={() => openEditor()}><Plus size={18} /> Add a task</button>} />
      ) : (
        <div className="stack">
          {shown.map((t) => <TaskCard key={t.id} task={t} onToggle={toggleTask} onEdit={openEditor} onDelete={askDelete} />)}
        </div>
      )}
    </section>
  )
}

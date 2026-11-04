import { Calendar, CheckCircle2, Circle, Flag, Pencil, Tag, Trash2 } from 'lucide-react'
import { formatDate, isOverdue } from '../utils/date'

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const late = isOverdue(task)
  return (
    <article className={`task ${task.completed ? 'done' : ''}`}>
      <button className="check" onClick={() => onToggle(task)} aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}>
        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>
      <div className="task-body">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
        <div className="meta">
          <span className="badge"><Tag size={13} />{task.category}</span>
          <span className={`badge pri-${task.priority}`}><Flag size={13} />{task.priority}</span>
          <span className={`badge ${late ? 'badge-late' : 'badge-plain'}`}><Calendar size={13} />{late ? 'Overdue · ' : ''}{formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="icon-btn sm" onClick={() => onEdit(task)} aria-label="Edit task"><Pencil size={16} /></button>
        <button className="icon-btn sm danger" onClick={() => onDelete(task)} aria-label="Delete task"><Trash2 size={16} /></button>
      </div>
    </article>
  )
}

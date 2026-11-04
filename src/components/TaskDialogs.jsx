import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Modal from './Modal'
import { useTasks } from '../context/TaskContext'
import { CATEGORIES, PRIORITIES } from '../data/mockTasks'
import { addDays } from '../utils/date'

function TaskForm({ task, onClose }) {
  const { addTask, updateTask } = useTasks()
  const [f, setF] = useState(task || { title: '', description: '', category: 'Work', priority: 'Medium', dueDate: addDays(1) })
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!f.title.trim()) return setErr('Give your task a title.')
    setBusy(true)
    task ? await updateTask({ ...f, title: f.title.trim() }) : await addTask({ ...f, title: f.title.trim() })
    onClose()
  }
  return (
    <Modal title={task ? 'Edit task' : 'New task'} onClose={onClose}>
      <form className="form" onSubmit={submit}>
        <label className="field"><span>Title</span>
          <input className={err ? 'invalid' : ''} value={f.title} onChange={(e) => { set('title')(e); setErr('') }} placeholder="What needs to be done?" autoFocus />
          {err && <small className="error">{err}</small>}
        </label>
        <label className="field"><span>Description</span><textarea rows={3} value={f.description} onChange={set('description')} placeholder="Add a few details (optional)" /></label>
        <div className="grid-3">
          <label className="field"><span>Category</span><select value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field"><span>Priority</span><select value={f.priority} onChange={set('priority')}>{PRIORITIES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field"><span>Due date</span><input type="date" value={f.dueDate} onChange={set('dueDate')} /></label>
        </div>
        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={busy}>{busy && <Loader2 size={17} className="spin" />}{task ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </Modal>
  )
}

export default function TaskDialogs() {
  const { editor, closeEditor, toDelete, askDelete, deleteTask } = useTasks()
  const [busy, setBusy] = useState(false)
  const confirm = async () => { setBusy(true); await deleteTask(toDelete.id); setBusy(false); askDelete(null) }
  return (
    <>
      {editor.open && <TaskForm key={editor.task?.id || 'new'} task={editor.task} onClose={closeEditor} />}
      {toDelete && (
        <Modal title="Delete task?" narrow onClose={() => askDelete(null)}>
          <div className="confirm">
            <span className="confirm-icon"><AlertTriangle size={24} /></span>
            <p>“{toDelete.title}” will be permanently removed. This can’t be undone.</p>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={() => askDelete(null)}>Keep task</button>
            <button className="btn btn-danger" onClick={confirm} disabled={busy}>{busy && <Loader2 size={17} className="spin" />}Delete task</button>
          </div>
        </Modal>
      )}
    </>
  )
}

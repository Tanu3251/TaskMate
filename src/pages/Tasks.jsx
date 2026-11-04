import { Plus } from 'lucide-react'
import TaskBoard from '../components/TaskBoard'
import { useTasks } from '../context/TaskContext'

export default function Tasks() {
  const { openEditor } = useTasks()
  return (
    <div className="page">
      <div className="page-head">
        <div><h1>My tasks</h1><p className="muted">Search, filter and manage everything in one place.</p></div>
        <button className="btn btn-primary" onClick={() => openEditor()}><Plus size={18} /> New task</button>
      </div>
      <TaskBoard title="All tasks" />
    </div>
  )
}

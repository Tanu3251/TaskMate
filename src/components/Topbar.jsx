import { useState } from 'react'
import { Bell, Menu, Moon, Plus, Search, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import { isOverdue, relative } from '../utils/date'

export default function Topbar({ onMenu }) {
  const { theme, toggle } = useTheme()
  const { user } = useAuth()
  const { search, setSearch, openEditor, tasks } = useTasks()
  const [bell, setBell] = useState(false)
  const alerts = tasks.filter(isOverdue).slice(0, 4)
  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <header className="topbar">
      <button className="icon-btn mobile-only" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <label className="search">
        <Search size={18} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks, categories..." />
      </label>
      <div className="topbar-actions">
        <button className="btn btn-primary hide-sm" onClick={() => openEditor()}><Plus size={18} /> New task</button>
        <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">{theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}</button>
        <div className="popwrap">
          <button className="icon-btn" onClick={() => setBell(!bell)} aria-label="Notifications">
            <Bell size={19} />{alerts.length > 0 && <i className="dot" />}
          </button>
          {bell && (
            <div className="popover" onMouseLeave={() => setBell(false)}>
              <strong>Needs attention</strong>
              {alerts.length === 0 ? <p className="muted">You are all caught up.</p> :
                alerts.map((a) => <div key={a.id} className="pop-item"><span>{a.title}</span><small>{relative(a.dueDate)}</small></div>)}
            </div>
          )}
        </div>
        <div className="profile">
          <span className="avatar">{initials}</span>
          <div className="profile-text hide-sm"><strong>{user.name}</strong><small>{user.email}</small></div>
        </div>
      </div>
    </header>
  )
}

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListChecks, LogOut, Plus, Sparkles, X } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  const { stats, openEditor } = useTasks()
  const nav = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tasks', label: 'My tasks', icon: ListChecks, badge: stats.pending },
  ]
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-head">
        <Logo />
        <button className="icon-btn mobile-only" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
      </div>
      <button className="create" onClick={() => { openEditor(); onClose() }}>Create new task<span><Plus size={16} /></span></button>
      <nav className="nav">
        {nav.map(({ to, label, icon: Icon, badge }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={onClose} className="nav-link">
            <Icon size={19} /> <span>{label}</span>
            {badge > 0 && <em className="nav-badge">{badge}</em>}
          </NavLink>
        ))}
      </nav>
      <div className="upgrade">
        <span className="upgrade-icon"><Sparkles size={18} /></span>
        <strong>Weekly focus</strong>
        <p>You have completed {stats.pct}% of your tasks. Keep the streak going.</p>
      </div>
      <button className="nav-link logout" onClick={logout}><LogOut size={19} /> <span>Log out</span></button>
    </aside>
  )
}

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import TaskDialogs from './TaskDialogs'

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <div className="main">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="content"><Outlet /></main>
      </div>
      <TaskDialogs />
    </div>
  )
}

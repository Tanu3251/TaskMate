import { AlertCircle, CalendarCheck, CheckCircle2, Clock, Layers, ListChecks, Plus } from 'lucide-react'
import StatCard from '../components/StatCard'
import TaskBoard from '../components/TaskBoard'
import ProgressRing from '../components/ProgressRing'
import CalendarWidget from '../components/CalendarWidget'
import UpcomingTasks from '../components/UpcomingTasks'
import { ActivityChart, WeeklyBars } from '../components/ActivityCharts'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'

export default function Dashboard() {
  const { user } = useAuth()
  const { stats, openEditor, loading } = useTasks()
  const h = new Date().getHours()
  const greet = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  const v = (n) => (loading ? '–' : n)

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>{greet}, {user.name.split(' ')[0]}</h1>
          <p>Check your daily tasks and schedule. Small steps, steady focus. {loading ? 'Loading your day...' : `You have ${stats.pending} tasks left to finish.`}</p>
          <button className="btn btn-primary" onClick={() => openEditor()}><Plus size={18} /> Add a task</button>
        </div>
        <div className="hero-art" aria-hidden><span className="note n1"><ListChecks size={22} /></span><span className="note n2"><CalendarCheck size={22} /></span></div>
      </section>

      <div className="stats">
        <StatCard icon={Layers} label="Total tasks" value={v(stats.total)} hint="All projects" tone="a" />
        <StatCard icon={Clock} label="Pending" value={v(stats.pending)} hint="Still in progress" tone="b" />
        <StatCard icon={CheckCircle2} label="Completed" value={v(stats.completed)} hint={`${stats.pct}% done`} tone="c" />
        <StatCard icon={AlertCircle} label="Overdue" value={v(stats.overdue)} hint="Needs attention" tone="d" />
      </div>

      <div className="charts"><ActivityChart /><WeeklyBars /></div>

      <div className="dash-grid">
        <TaskBoard title="Your tasks" limit={6} />
        <aside className="side">
          <section className="card center">
            <div className="card-head"><h3>Completion</h3></div>
            <ProgressRing value={stats.pct} />
            <p className="muted small">{stats.completed} of {stats.total} tasks completed</p>
          </section>
          <CalendarWidget />
          <UpcomingTasks />
        </aside>
      </div>
    </div>
  )
}

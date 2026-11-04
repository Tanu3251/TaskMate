import { useMemo } from 'react'
import { useTasks } from '../context/TaskContext'
import { toISO } from '../utils/date'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Tasks due per weekday of the current week (derived from live task state).
function useWeek() {
  const { tasks } = useTasks()
  return useMemo(() => {
    const now = new Date(), mon = new Date(now)
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    return DAYS.map((label, i) => {
      const d = new Date(mon); d.setDate(mon.getDate() + i)
      const list = tasks.filter((t) => t.dueDate === toISO(d))
      return { label, total: list.length, done: list.filter((t) => t.completed).length, today: toISO(d) === toISO(now) }
    })
  }, [tasks])
}

export function ActivityChart() {
  const week = useWeek()
  const W = 560, H = 190, max = Math.max(...week.map((d) => d.total), 2)
  const pts = week.map((d, i) => [34 + (i * (W - 68)) / 6, H - 36 - (d.total / max) * (H - 84)])
  const line = pts.reduce((p, [x, y], i) => {
    if (!i) return `M${x},${y}`
    const [px, py] = pts[i - 1], cx = (px + x) / 2
    return `${p} C${cx},${py} ${cx},${y} ${x},${y}`
  }, '')
  const area = `${line} L${pts[6][0]},${H - 36} L${pts[0][0]},${H - 36} Z`
  const ti = Math.max(week.findIndex((d) => d.today), 0), [tx, ty] = pts[ti]

  return (
    <section className="card">
      <div className="card-head"><h3>Activity</h3><small className="muted">Tasks due this week</small></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label="Tasks due per day">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent-2)" stopOpacity=".32" /><stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" /></linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="var(--accent-1)" /><stop offset="100%" stopColor="var(--accent-2)" /></linearGradient>
        </defs>
        <path d={area} fill="url(#areaGrad)" /><path d={line} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
        <line x1={tx} x2={tx} y1={ty} y2={H - 36} stroke="var(--accent-2)" strokeDasharray="4 5" opacity=".5" />
        <circle cx={tx} cy={ty} r="6" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="3" />
        <g transform={`translate(${tx - 34},${ty - 40})`}><rect width="68" height="26" rx="9" fill="var(--surface)" stroke="var(--border)" /><text x="34" y="17" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">{week[ti].total} Tasks</text></g>
        {week.map((d, i) => <text key={d.label} x={pts[i][0]} y={H - 10} textAnchor="middle" fontSize="12" fontWeight={d.today ? 700 : 500} fill={d.today ? 'var(--accent-text)' : 'var(--muted)'}>{d.label}</text>)}
      </svg>
    </section>
  )
}

export function WeeklyBars() {
  const week = useWeek(), max = Math.max(...week.map((d) => d.total), 1)
  const total = week.reduce((s, d) => s + d.total, 0), done = week.reduce((s, d) => s + d.done, 0)
  return (
    <section className="card">
      <div className="card-head"><div><h3 className="big">{total}</h3><small className="muted">Tasks this week</small></div>
        <div className="legend"><span><i className="lg a" />{done} done</span><span><i className="lg b" />{total - done} open</span></div></div>
      <div className="bars">
        {week.map((d) => (
          <div key={d.label} className={`bar-col ${d.today ? 'today' : ''}`} title={`${d.total} due, ${d.done} done`}>
            <div className="bar-track"><div className="bar-fill" style={{ height: `${(d.total / max) * 100}%` }}><span style={{ height: d.total ? `${(d.done / d.total) * 100}%` : 0 }} /></div></div>
            <small>{d.label}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

const SHAPES = { a: [40, 70, 55, 90, 65], b: [70, 45, 80, 50, 60], c: [35, 55, 75, 60, 95], d: [80, 40, 55, 30, 45] }
export default function StatCard({ icon: Icon, label, value, hint, tone }) {
  return (
    <div className={`card stat tone-${tone}`}>
      <span className="stat-icon"><Icon size={20} /></span>
      <div><h3 className="stat-value">{value}</h3><p className="stat-label">{label}</p></div>
      <span className="mini" aria-hidden>{SHAPES[tone].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</span>
      <small className="stat-hint">{hint}</small>
    </div>
  )
}

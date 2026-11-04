import { ClipboardList } from 'lucide-react'
export default function EmptyState({ title, text, action }) {
  return (
    <div className="empty">
      <span className="empty-icon"><ClipboardList size={30} /></span>
      <h4>{title}</h4><p>{text}</p>{action}
    </div>
  )
}

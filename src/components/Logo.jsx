import { CheckCheck } from 'lucide-react'
export default function Logo({ light }) {
  return (
    <div className={`logo ${light ? 'logo-light' : ''}`}>
      <span className="logo-mark"><CheckCheck size={18} strokeWidth={2.6} /></span>
      <span className="logo-text">TaskMate</span>
    </div>
  )
}

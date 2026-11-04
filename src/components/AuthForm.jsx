import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, User, Target, CalendarCheck, BarChart3 } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

// Declared at module level so React keeps the same component identity between renders
// (declaring it inside AuthForm remounted the input on every keystroke and dropped focus).
function Field({ icon: Icon, ...props }) {
  return (
    <label className="input-icon">
      <Icon size={18} />
      <input {...props} />
    </label>
  )
}

const perks = [[Target, 'Prioritise what matters most'], [CalendarCheck, 'Never miss a due date'], [BarChart3, 'See your progress at a glance']]

export default function AuthForm({ mode }) {
  const signup = mode === 'signup'
  const { login, signup: doSignup } = useAuth()
  const { theme, toggle } = useTheme()
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false), [busy, setBusy] = useState(false), [err, setErr] = useState('')

  
const submit = async (e) => {
  e.preventDefault()
  setErr('')

  if (signup && !f.name.trim()) {
    return setErr('Enter your full name.')
  }

  if (!/\S+@\S+\.\S+/.test(f.email)) {
    return setErr('Enter a valid email address.')
  }

  if (f.password.length < 6) {
    return setErr('Password needs at least 6 characters.')
  }

  setBusy(true)

  try {
    if (signup) {
      await doSignup(f)
    } else {
      await login(f)
    }

    nav('/')
  } catch (error) {
    const message = error.message || ''

    if (/already exists|already registered|duplicate|email.*taken/i.test(message)) {
      setErr('An account with this email already exists. Please log in instead.')
    } else {
      setErr(message || 'Something went wrong. Please try again.')
    }
  } finally {
    setBusy(false)
  }
}

  const change = (e) => {
    const { name, value } = e.target
    setF((prev) => ({ ...prev, [name]: value }))
    setErr('')
  }

  return (
    <div className="auth">
      <aside className="auth-art">
        <Logo light />
        <div>
          <h2>Plan calmly.<br />Finish confidently.</h2>
          <ul>{perks.map(([I, t]) => <li key={t}><span><I size={18} /></span>{t}</li>)}</ul>
        </div>
        <i className="orb o1" /><i className="orb o2" />
      </aside>
      <main className="auth-panel">
        <button className="btn btn-ghost auth-theme" onClick={toggle}>{theme === 'light' ? 'Dark mode' : 'Light mode'}</button>
        <form className="auth-card" onSubmit={submit} noValidate>
          <h1>{signup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="muted">{signup ? 'Start organising your work in minutes.' : 'Log in to pick up where you left off.'}</p>
          {signup && <Field icon={User} name="name" value={f.name} onChange={change} placeholder="Full name" autoComplete="name" />}
          <Field icon={Mail} name="email" type="email" value={f.email} onChange={change} placeholder="Email address" autoComplete="email" />
          <div className="input-icon-wrap">
            <Field icon={Lock} name="password" type={show ? 'text' : 'password'} value={f.password} onChange={change} placeholder="Password" autoComplete={signup ? 'new-password' : 'current-password'} />
            <button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Toggle password">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          {err && <small className="error">{err}</small>}
          <button className="btn btn-primary block" disabled={busy}>{busy && <Loader2 size={18} className="spin" />}{signup ? 'Create account' : 'Log in'}</button>
          <p className="switch">{signup ? 'Already have an account?' : 'New to TaskMate?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link></p>
        </form>
      </main>
    </div>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Signup from './pages/Signup'

function Protected({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Protected><TaskProvider><AppLayout /></TaskProvider></Protected>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

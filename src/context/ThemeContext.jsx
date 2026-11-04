import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext()
export const useTheme = () => useContext(Ctx)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('tm-theme') || 'light')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('tm-theme', theme)
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>
}

/**
 * ThemeContext — provides dark/light mode toggle across the app.
 *
 * - Reads the initial theme from localStorage (set in index.html inline script
 *   to prevent flash).
 * - Writes changes back to localStorage under the key 'emberwood-theme'.
 * - Applies/removes the 'dark' class on <html> with a brief transition class
 *   so colour changes animate smoothly.
 */
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
  isDark: false,
})

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('emberwood-theme')
    if (stored === 'dark' || stored === 'light') return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {}
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const apply = useCallback((t: Theme) => {
    const html = document.documentElement

    // Add transition class so colour changes animate
    html.classList.add('theme-transitioning')
    requestAnimationFrame(() => {
      if (t === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      setTimeout(() => html.classList.remove('theme-transitioning'), 400)
    })

    try { localStorage.setItem('emberwood-theme', t) } catch {}
  }, [])

  useEffect(() => { apply(theme) }, [theme, apply])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

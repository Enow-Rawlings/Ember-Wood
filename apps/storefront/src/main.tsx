import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'
import { App } from './App'
// i18n must be imported before anything that calls useTranslation
import './i18n/index'
import './styles/globals.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)

import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ChatLauncher } from './ChatLauncher'
import { CookieBanner } from './CookieBanner'
import { useVisitorPing } from '@/hooks/useVisitorPing'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function StorefrontLayout() {
  useVisitorPing()
  const location = useLocation()

  // Re-trigger scroll reveal after route changes
  useScrollReveal()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ChatLauncher />
      <CookieBanner />
    </div>
  )
}

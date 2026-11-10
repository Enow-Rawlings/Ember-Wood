import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Menu, X, ShoppingCart, User, Search, Sun, Moon, ChevronDown, Flame,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useTheme } from '@/context/ThemeContext'
import { useLocale } from '@/context/LocaleContext'
import { LOCALES, type SupportedLocale } from '@/i18n/index'

// ─── SVG Logo ─────────────────────────────────────────────────────────────────
function EmberwoodLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#18352F" />
      <path d="M20 6 C15 13 11 16 11 23 C11 29.6 15 34 20 36 C25 34 29 29.6 29 23 C29 16 25 13 20 6Z" fill="#C46B3C" />
      <path d="M20 12 C17.5 17 16 19.5 16 24 C16 27.5 17.7 30.5 20 32 C22.3 30.5 24 27.5 24 24 C24 19.5 22.5 17 20 12Z" fill="#F7F3EA" opacity="0.35" />
      <path d="M14 35 Q20 37.5 26 35" stroke="#C46B3C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  )
}

// ─── Nav data (labels populated from translations in component) ───────────────
type NavItem =
  | { key: string; href: string; children?: never }
  | { key: string; href: string; children: { key: string; href: string }[] }

const NAV_STRUCTURE: NavItem[] = [
  {
    key: 'navFirewood', href: '/shop',
    children: [
      { key: 'navAllFirewood',  href: '/shop'                     },
      { key: 'navHardwoodLogs', href: '/category/hardwood-logs'   },
      { key: 'navSoftwoodLogs', href: '/category/softwood-logs'   },
      { key: 'navKindling',     href: '/category/kindling'        },
    ],
  },
  {
    key: 'navTimber', href: '/category/timber',
    children: [
      { key: 'navAllTimber',          href: '/category/timber'         },
      { key: 'navLogsAndBriquettes',  href: '/category/logs-briquettes'},
    ],
  },
  { key: 'navFirewoodGuide', href: '/firewood-guide' },
  { key: 'navDelivery',      href: '/delivery'       },
  { key: 'navAbout',         href: '/about'          },
]

// ─── Dark mode toggle ─────────────────────────────────────────────────────────
function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const { t } = useLocale()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('header.switchToLight') : t('header.switchToDark')}
      className="rounded-lg p-2 text-cream/80 transition-colors hover:bg-white/10 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-orange"
    >
      {isDark
        ? <Sun  size={18} aria-hidden="true" className="transition-transform duration-300" />
        : <Moon size={18} aria-hidden="true" className="transition-transform duration-300" />
      }
    </button>
  )
}

// ─── Language switcher ────────────────────────────────────────────────────────
function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const other = (locale === 'en' ? 'fr' : 'en') as SupportedLocale
  const current = LOCALES[locale]
  const otherLocale = LOCALES[other]

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Language: ${current.name}`}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="hidden sm:inline">{current.name}</span>
        <ChevronDown size={12} aria-hidden="true" className={`opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full z-50 mt-1.5 min-w-[130px] origin-top-right overflow-hidden rounded-xl border border-white/15 bg-forest-green shadow-modal transition-all duration-200 dark:bg-[#111815] ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {/* Current — shown as active */}
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5">
          <span aria-hidden="true">{current.flag}</span>
          <span className="text-sm font-semibold text-cream">{current.name}</span>
          <span className="ml-auto text-[10px] font-bold text-ember-orange">✓</span>
        </div>
        {/* Other option */}
        <button
          type="button"
          onClick={() => { setLocale(other); setOpen(false) }}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-cream/75 transition-colors hover:bg-white/10 hover:text-cream"
        >
          <span aria-hidden="true">{otherLocale.flag}</span>
          <span>{otherLocale.name}</span>
        </button>
      </div>
    </div>
  )
}

// ─── Desktop dropdown ─────────────────────────────────────────────────────────
function DesktopDropdown({ item }: { item: NavItem & { children: NonNullable<NavItem['children']> } }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { t } = useLocale()

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => { document.removeEventListener('mousedown', handler); if (closeTimer.current) clearTimeout(closeTimer.current) }
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-cream/90 transition-colors hover:bg-white/10 hover:text-cream"
      >
        {t(`header.${item.key}`)}
        <ChevronDown size={14} aria-hidden="true" className={`opacity-70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute left-0 top-full z-50 mt-1.5 min-w-[180px] origin-top-left overflow-hidden rounded-xl border border-border-warm bg-white shadow-modal transition-all duration-200 dark:border-dark-border dark:bg-dark-surface ${
        open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      }`}>
        {item.children.map((child) => (
          <NavLink
            key={child.href}
            to={child.href}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2.5 text-sm no-underline transition-colors hover:bg-cream hover:text-ember-orange dark:hover:bg-dark-surface-2 ${
                isActive ? 'font-semibold text-ember-orange' : 'text-charcoal dark:text-dark-text'
              }`
            }
          >
            {t(`header.${child.key}`)}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile language switcher ─────────────────────────────────────────────────
function MobileLangSwitcher({ onSwitch }: { onSwitch: () => void }) {
  const { locale, setLocale } = useLocale()
  return (
    <div className="flex items-center gap-3 border-t border-white/10 px-6 py-3">
      {(['en', 'fr'] as SupportedLocale[]).map((lang) => {
        const info = LOCALES[lang]
        const isActive = locale === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => { setLocale(lang); onSwitch() }}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'border-ember-orange bg-ember-orange/10 text-cream'
                : 'border-white/20 text-cream/70 hover:border-ember-orange hover:text-cream'
            }`}
          >
            <span aria-hidden="true">{info.flag}</span>
            {info.name}
          </button>
        )
      })}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const location   = useLocation()
  const { t }      = useLocale()

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const cartLabel = totalItems > 0
    ? `${t('header.navCart')}, ${totalItems} ${totalItems === 1 ? t('header.cartItems', { count: 1 }) : t('header.cartItems_plural', { count: totalItems })}`
    : t('header.navCart')

  return (
    <header className={`sticky top-0 z-50 bg-forest-green transition-shadow duration-300 dark:bg-[#111815] ${scrolled ? 'shadow-lg shadow-forest-green/30' : ''}`}>
      {/* Announcement bar */}
      <div className="border-b border-white/10 bg-black/20 px-4 py-1.5 text-center text-xs text-cream/70">
        🌲 {t('header.announcement')} &nbsp;·&nbsp;
        <Link to="/delivery" className="text-ember-orange underline-offset-2 hover:underline">
          {t('header.checkArea')}
        </Link>
      </div>

      <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label={t('header.logoAlt')}>
          <EmberwoodLogo className="h-9 w-9 flex-shrink-0 transition-transform duration-300 hover:scale-110" />
          <div className="flex flex-col leading-none">
            <span className="font-heading text-[15px] font-bold tracking-wide text-cream">EMBERWOOD</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-cream/50">Firewood &amp; Timber</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_STRUCTURE.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.href} item={item as NavItem & { children: NonNullable<NavItem['children']> }} />
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors hover:bg-white/10 hover:text-cream ${
                    isActive ? 'bg-white/10 text-cream' : 'text-cream/90'
                  }`
                }
              >
                {t(`header.${item.key}`)}
              </NavLink>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          <Link to="/search" aria-label={t('header.navSearchProducts')}
            className="rounded-lg p-2 text-cream/80 no-underline transition-colors hover:bg-white/10 hover:text-cream">
            <Search size={18} aria-hidden="true" />
          </Link>

          <Link to="/account" aria-label={t('header.navAccount')}
            className="rounded-lg p-2 text-cream/80 no-underline transition-colors hover:bg-white/10 hover:text-cream">
            <User size={18} aria-hidden="true" />
          </Link>

          <Link to="/cart" aria-label={cartLabel}
            className="relative rounded-lg p-2 text-cream/80 no-underline transition-colors hover:bg-white/10 hover:text-cream">
            <ShoppingCart size={18} aria-hidden="true" />
            {totalItems > 0 && (
              <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 flex h-4 w-4 animate-scale-in items-center justify-center rounded-full bg-ember-orange text-[9px] font-bold text-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button type="button"
            aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 rounded-lg p-2 text-cream/80 transition-colors hover:bg-white/10 hover:text-cream lg:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <Menu size={20} aria-hidden="true" className={`absolute transition-all duration-300 ${mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
              <X size={20} aria-hidden="true" className={`absolute transition-all duration-300 ${mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <nav id="mobile-nav" aria-label="Mobile navigation"
        className={`overflow-hidden border-t border-white/10 bg-forest-green transition-all duration-300 lg:hidden dark:bg-[#111815] ${
          mobileOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col py-3" role="list">
          {NAV_STRUCTURE.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-3 text-base font-medium no-underline transition-colors hover:bg-white/10 ${
                    isActive ? 'text-ember-orange' : 'text-cream/90'
                  }`
                }
              >
                {item.key === 'navFirewood' && <Flame size={15} className="text-ember-orange" aria-hidden="true" />}
                {t(`header.${item.key}`)}
              </NavLink>
              {item.children && (
                <ul className="ml-8 border-l border-white/10 pb-1" role="list">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavLink
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2 text-sm text-cream/60 no-underline transition-colors hover:text-cream"
                      >
                        {t(`header.${child.key}`)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile language switcher */}
        <MobileLangSwitcher onSwitch={() => setMobileOpen(false)} />
      </nav>
    </header>
  )
}

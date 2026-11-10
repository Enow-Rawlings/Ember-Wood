/**
 * LocaleContext — language + currency preference for the storefront.
 *
 * Wraps react-i18next so components only need to import `useLocale`
 * rather than calling useTranslation() and managing language switching directly.
 *
 * Provides:
 *   t(key)        — translate a key
 *   locale        — 'en' | 'fr'
 *   setLocale()   — switch language (persists to localStorage)
 *   currency      — 'GBP' | 'EUR'
 *   formatPrice() — locale-aware price formatting
 *   isReady       — true once i18n has initialised
 */
import {
  createContext, useContext, useCallback, type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { type SupportedLocale, LOCALES, formatPriceI18n } from '@/i18n/index'

interface LocaleContextValue {
  locale:       SupportedLocale
  setLocale:    (l: SupportedLocale) => void
  currency:     string
  formatPrice:  (price: number, currency?: string) => string
  t:            ReturnType<typeof useTranslation>['t']
  i18nReady:    boolean
}

const LocaleContext = createContext<LocaleContextValue>({
  locale:      'en',
  setLocale:   () => {},
  currency:    'GBP',
  formatPrice: (p) => `£${p.toFixed(2)}`,
  t:           ((k: string) => k) as unknown as ReturnType<typeof useTranslation>['t'],
  i18nReady:   false,
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { t, i18n: i18nInstance, ready } = useTranslation()

  // Normalise — we only support 'en' and 'fr'
  const locale: SupportedLocale =
    i18nInstance.language?.startsWith('fr') ? 'fr' : 'en'

  const setLocale = useCallback((lang: SupportedLocale) => {
    void i18n.changeLanguage(lang)
  }, [])

  const currency = LOCALES[locale].currency

  const formatPrice = useCallback(
    (price: number, overrideCurrency?: string) =>
      formatPriceI18n(price, overrideCurrency ?? currency, locale),
    [locale, currency]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, currency, formatPrice, t, i18nReady: ready }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

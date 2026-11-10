/**
 * Emberwood i18n configuration
 *
 * Supports:
 *   en — English (en-GB, GBP, UK audience)
 *   fr — French  (fr-FR, EUR, France audience)
 *
 * Language is:
 *   1. Read from localStorage key 'emberwood-lang' (user preference)
 *   2. Falls back to browser language detection
 *   3. Defaults to 'en' if neither matches
 *
 * The <html lang> attribute is updated on every switch.
 * Currency formatting uses the locale from the active language.
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en'
import fr from './fr'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    supportedLngs: ['en', 'fr'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'emberwood-lang',
      caches: ['localStorage'],
    },
    fallbackLng: 'en',
    // IMPORTANT: use synchronous init so translations are available
    // on the very first render — no flash of English on French pages
    initImmediate: false,
    interpolation: {
      escapeValue: false,
    },
  })

// Update <html lang> attribute whenever the language changes
i18n.on('languageChanged', (lng) => {
  const locale = lng === 'fr' ? 'fr-FR' : 'en-GB'
  document.documentElement.setAttribute('lang', locale)
})

// Set initial lang attribute
const initialLocale = i18n.language === 'fr' ? 'fr-FR' : 'en-GB'
document.documentElement.setAttribute('lang', initialLocale)

export default i18n

// ─── Typed hook helpers ───────────────────────────────────────────────────────

export type SupportedLocale = 'en' | 'fr'

export const LOCALES: Record<SupportedLocale, { code: string; currency: string; name: string; flag: string }> = {
  en: { code: 'en-GB', currency: 'GBP', name: 'English', flag: '🇬🇧' },
  fr: { code: 'fr-FR', currency: 'EUR', name: 'Français', flag: '🇫🇷' },
}

/**
 * Format a price using the correct locale and currency for the active language.
 */
export function formatPriceI18n(price: number, currency: string, lang: SupportedLocale = 'en'): string {
  const locale = LOCALES[lang]?.code ?? 'en-GB'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

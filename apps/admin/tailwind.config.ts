import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── Emberwood Design Tokens ───────────────────────────────────────────
        'forest-green': '#18352F',
        'ember-orange': '#C46B3C',
        'cream': '#F7F3EA',
        'pale-sage': '#E7EEE8',
        'charcoal': '#252B28',
        'stone-grey': '#6B7280',
        'border-warm': '#DDD5C8',
        'cloud-white': '#FFFFFF',
        'success-green': '#237A57',
        'warning-amber': '#9A5B00',
        'error-red': '#B42318',
        // ─── Admin sidebar tokens ──────────────────────────────────────────────
        'sidebar-bg': '#18352F',
        'sidebar-hover': 'rgba(247,243,234,0.08)',
        'sidebar-active': 'rgba(196,107,60,0.85)',
        // ─── Legacy aliases — keep so pre-existing admin components compile ────
        // These map old Nuclara names to Emberwood equivalents so we don't have
        // to touch every single admin page at once. They will be removed in a
        // future cleanup phase.
        'midnight-navy': '#18352F',
        'scientific-teal': '#C46B3C',
        'pale-ice': '#F7F3EA',
        'border-grey': '#DDD5C8',
        'slate': '#6B7280',
        'graphite': '#252B28',
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(24 53 47 / 0.08), 0 1px 2px -1px rgb(24 53 47 / 0.06)',
        'card-hover': '0 4px 12px -1px rgb(24 53 47 / 0.12), 0 2px 4px -2px rgb(24 53 47 / 0.08)',
        modal: '0 20px 25px -5px rgb(24 53 47 / 0.15), 0 8px 10px -6px rgb(24 53 47 / 0.1)',
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

export default config

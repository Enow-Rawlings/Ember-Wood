import type { Config } from 'tailwindcss'

const config: Config = {
  // Enable class-based dark mode — toggled by adding 'dark' to <html>
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── Emberwood Design Tokens ────────────────────────────────────────────
        'forest-green': '#18352F',
        'ember-orange': '#C46B3C',
        'cream':        '#F7F3EA',
        'pale-sage':    '#E7EEE8',
        'charcoal':     '#252B28',
        'stone-grey':   '#6B7280',
        'border-warm':  '#DDD5C8',
        'cloud-white':  '#FFFFFF',
        // Feedback
        'success-green': '#237A57',
        'warning-amber': '#9A5B00',
        'error-red':     '#B42318',
        // Dark-mode surface palette (used with dark: prefix)
        'dark-surface':   '#1A1F1C',
        'dark-surface-2': '#242A26',
        'dark-surface-3': '#2E3530',
        'dark-border':    '#3A4240',
        'dark-text':      '#E8EDE9',
        'dark-muted':     '#8FA89A',
      },
      fontFamily: {
        // Poppins for both heading and body — soft, rounded, premium
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body:    ['Poppins', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'h1-desktop': ['clamp(32px, 4.5vw, 56px)', { lineHeight: '1.1', fontWeight: '700' }],
        'h2-desktop': ['clamp(26px, 3.5vw, 40px)', { lineHeight: '1.2', fontWeight: '600' }],
        'h3-desktop': ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        label: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '0.5': '2px', '1': '4px',  '2': '8px',  '3': '12px',
        '4': '16px',  '5': '20px', '6': '24px',  '8': '32px',
        '10': '40px', '12': '48px','16': '64px',  '20': '80px',
        '24': '96px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        '2xl': '28px',
        full: '9999px',
      },
      boxShadow: {
        card:       '0 2px 8px -1px rgb(24 53 47 / 0.08), 0 1px 3px -1px rgb(24 53 47 / 0.06)',
        'card-hover':'0 8px 24px -4px rgb(24 53 47 / 0.14), 0 3px 8px -2px rgb(24 53 47 / 0.08)',
        modal:      '0 24px 48px -8px rgb(24 53 47 / 0.20), 0 8px 16px -4px rgb(24 53 47 / 0.10)',
        glow:       '0 0 20px rgb(196 107 60 / 0.30)',
        'inner-sm': 'inset 0 1px 3px rgb(24 53 47 / 0.08)',
      },
      screens: {
        xs: '360px', sm: '640px', md: '768px',
        lg: '1024px', xl: '1280px', '2xl': '1440px',
      },
      // ─── Custom animation keyframes ────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'hero-text': {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'mobile-menu-down': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'panel-in': {
          '0%':   { opacity: '0', transform: 'translateY(12px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up':         'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-up-delay-1': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both',
        'fade-up-delay-2': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both',
        'fade-up-delay-3': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        'fade-in':         'fade-in 0.5s ease both',
        'slide-in-left':   'slide-in-left 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right':  'slide-in-right 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':        'scale-in 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'hero-text':       'hero-text 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'mobile-menu-down':'mobile-menu-down 0.2s ease both',
        'panel-in':        'panel-in 0.25s cubic-bezier(0.16,1,0.3,1) both',
        'float':           'float 3s ease-in-out infinite',
        shimmer:           'shimmer 2s linear infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config

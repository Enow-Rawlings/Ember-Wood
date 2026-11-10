import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ember-orange text-white hover:bg-[#a85a30] disabled:bg-border-warm disabled:text-stone-grey',
  secondary: 'border border-forest-green text-forest-green hover:bg-pale-sage disabled:border-border-warm disabled:text-stone-grey',
  ghost: 'text-charcoal hover:bg-pale-sage disabled:text-stone-grey',
  danger: 'bg-error-red text-white hover:bg-[#9a1e13] disabled:bg-border-warm disabled:text-stone-grey',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center rounded font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-orange',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {loading && (
        <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}

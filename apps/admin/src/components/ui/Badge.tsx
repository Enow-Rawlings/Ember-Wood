import type { ReactNode } from 'react'

type Variant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'purple'

const variants: Record<Variant, string> = {
  default: 'bg-pale-sage text-charcoal',
  success: 'bg-[#e8f5f0] text-success-green',
  warning: 'bg-[#fef3e2] text-warning-amber',
  error: 'bg-[#fde8e8] text-error-red',
  info: 'bg-[#e8f5ef] text-forest-green',
  outline: 'border border-border-warm text-stone-grey bg-transparent',
  purple: 'bg-[#f0eeff] text-[#6344c8]',
}

export function Badge({
  variant = 'default',
  children,
  className = '',
}: {
  variant?: Variant
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}

// Status → badge variant maps

// Product status badge — simplified for Emberwood (no compliance gate)
export function productStatusBadge(status: string) {
  const map: Record<string, Variant> = {
    draft: 'outline',
    published: 'success',
    archived: 'default',
  }
  return map[status] ?? 'default'
}

export function orderStatusBadge(status: string) {
  const map: Record<string, Variant> = {
    pending_review: 'warning',
    awaiting_customer_confirmation: 'warning',
    awaiting_payment: 'purple',
    payment_verification_pending: 'info',
    paid: 'success',
    processing: 'info',
    dispatched: 'success',
    delivered: 'success',
    cancelled: 'default',
    refunded: 'default',
    // legacy Emberwood statuses (in case old orders exist)
    under_review: 'info',
    fulfilled: 'success',
    completed: 'success',
    rejected: 'error',
  }
  return map[status] ?? 'default'
}

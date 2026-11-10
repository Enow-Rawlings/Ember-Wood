import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ label, id, className = '', ...props }: SelectProps) {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="mb-1 block text-xs font-medium text-stone-grey">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          {...props}
          className={[
            'w-full appearance-none rounded border border-border-warm bg-white px-3 py-2 pr-8 text-sm text-charcoal',
            'focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange',
            'disabled:cursor-not-allowed disabled:bg-cream disabled:text-stone-grey',
            className,
          ].join(' ')}
        />
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-grey"
        />
      </div>
    </div>
  )
}

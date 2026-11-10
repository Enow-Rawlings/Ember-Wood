import type { ReactNode } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-stone-grey">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-lg font-semibold text-charcoal">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-stone-grey">{description}</p>}
      {action && (
        <div className="mt-6">
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

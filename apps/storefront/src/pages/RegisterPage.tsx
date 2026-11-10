import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'

export default function RegisterPage() {
  useSeo({
    title: 'Create account',
    description: 'Create an Emberwood account to track your order requests.',
    canonicalPath: '/account/register',
    noIndex: true,
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const inputClass = 'w-full rounded border border-border-warm bg-white px-3 py-2 text-sm text-charcoal placeholder-slate focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.post('/auth/register', { name, email, password })
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-4 px-4 py-12 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5f0]">
          <CheckCircle size={32} className="text-success-green" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">Check your email</h1>
        <p className="text-stone-grey">
          If this email is available, a confirmation link has been sent. Check your inbox to activate your account.
        </p>
        <Link to="/account/login" className="text-ember-orange">Back to sign in</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-charcoal">Create account</h1>
      <p className="mt-1 text-sm text-stone-grey">
        Already have an account?{' '}
        <Link to="/account/login" className="text-ember-orange">Sign in</Link>
      </p>

      {error && (
        <div role="alert" className="mt-4 flex gap-2 rounded border border-error-red/30 bg-[#fde8e8] p-3 text-sm text-error-red">
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-charcoal">Full name</label>
          <input id="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-charcoal">Email address</label>
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-charcoal">
            Password <span className="text-xs text-stone-grey">(min 8 characters)</span>
          </label>
          <input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>
        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
        <p className="text-center text-xs text-stone-grey">
          By registering you agree to our{' '}
          <Link to="/terms" className="text-ember-orange">terms</Link> and{' '}
          <Link to="/privacy" className="text-ember-orange">privacy policy</Link>.
        </p>
      </form>
    </div>
  )
}

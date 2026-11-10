import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, CheckCircle, AlertCircle, Flame } from 'lucide-react'
import { api } from '@/lib/api'

type Step = 'launcher' | 'form' | 'sending' | 'success' | 'error'

export function ChatLauncher() {
  const [step, setStep] = useState<Step>('launcher')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [panelVisible, setPanelVisible] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const isOpen = step !== 'launcher'

  // Animate panel in after mount
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelVisible(true))
      })
    } else {
      setPanelVisible(false)
    }
  }, [isOpen])

  // Focus first input
  useEffect(() => {
    if (step === 'form') {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [step])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setStep('launcher')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setStep('sending')
    try {
      await api.post('/chat/conversations/guest', {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      })
      setStep('success')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setErrorMsg('Something went wrong. Please try again or email us directly.')
      setStep('error')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-border-warm bg-white px-3 py-2.5 text-sm text-charcoal placeholder-stone-grey focus:border-ember-orange focus:outline-none focus:ring-2 focus:ring-ember-orange/20 transition-colors dark:bg-dark-surface dark:border-dark-border dark:text-dark-text'

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contact Emberwood support"
          className={`w-80 overflow-hidden rounded-2xl border border-border-warm bg-white shadow-modal transition-all duration-300 dark:border-dark-border dark:bg-dark-surface ${
            panelVisible
              ? 'translate-y-0 scale-100 opacity-100'
              : 'translate-y-4 scale-95 opacity-0'
          }`}
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between bg-forest-green px-4 py-4 dark:bg-[#0F1512]">
            {/* Subtle flame watermark */}
            <Flame
              size={60}
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ember-orange/10"
            />
            <div>
              <p className="font-heading text-sm font-semibold text-cream">
                Chat with Emberwood
              </p>
              <p className="mt-0.5 text-xs text-cream/55">
                We reply within 1–2 business days
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep('launcher')}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            {step === 'form' && (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="chat-name" className="text-xs font-medium text-charcoal dark:text-dark-text">
                    Name <span className="text-error-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="chat-name" ref={firstInputRef} type="text"
                    value={name} onChange={(e) => setName(e.target.value)}
                    required className={inputCls} placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="chat-email" className="text-xs font-medium text-charcoal dark:text-dark-text">
                    Email <span className="text-error-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="chat-email" type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required className={inputCls} placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="chat-message" className="text-xs font-medium text-charcoal dark:text-dark-text">
                    Message <span className="text-error-red" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="chat-message" value={message} onChange={(e) => setMessage(e.target.value)}
                    required rows={3}
                    className={[inputCls, 'resize-none'].join(' ')}
                    placeholder="How can we help?"
                  />
                </div>
                <p className="text-[11px] text-stone-grey">
                  Product, order and delivery support only.
                </p>
                <button
                  type="submit"
                  disabled={!name.trim() || !email.trim() || !message.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-ember-orange px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#a85a30] hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={13} aria-hidden="true" />
                  Send message
                </button>
              </form>
            )}

            {step === 'sending' && (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-border-warm border-t-ember-orange" />
                <p className="text-sm text-stone-grey">Sending…</p>
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5ef]">
                  <CheckCircle size={24} className="text-success-green" aria-hidden="true" />
                </div>
                <p className="font-semibold text-charcoal dark:text-dark-text">Message sent!</p>
                <p className="text-sm text-stone-grey">
                  We'll reply to your email within 1–2 business days.
                </p>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="mt-1 text-xs text-ember-orange hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}

            {step === 'error' && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fde8e8]">
                  <AlertCircle size={24} className="text-error-red" aria-hidden="true" />
                </div>
                <p className="text-sm text-error-red">{errorMsg}</p>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-xs text-ember-orange hover:underline"
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Launcher FAB ────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setStep(isOpen ? 'launcher' : 'form')}
        aria-label={isOpen ? 'Close chat' : 'Chat with Emberwood'}
        aria-expanded={isOpen}
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-forest-green text-cream shadow-modal transition-all duration-300 hover:scale-110 hover:bg-ember-orange hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-orange"
        style={{ width: '52px', height: '52px' }}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <MessageCircle
            size={20}
            aria-hidden="true"
            className={`absolute transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}
          />
          <X
            size={20}
            aria-hidden="true"
            className={`absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}
          />
        </span>
        {/* Pulse ring when closed */}
        {!isOpen && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-ember-orange opacity-20"
            style={{ animationDuration: '2.5s' }}
          />
        )}
      </button>
    </div>
  )
}

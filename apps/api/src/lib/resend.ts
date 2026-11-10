import { env } from '../config/env.js'

export type EmailTemplate =
  | 'order-request-customer'
  | 'order-request-admin'
  | 'order-status-update'
  | 'password-reset'
  | 'support-notification'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

/**
 * Lazy-initialised Resend client.
 * The client is only created when sendEmail is first called, so the API
 * boots cleanly even when RESEND_API_KEY is not configured (e.g. local dev).
 */
let _resendClient: import('resend').Resend | null = null

async function getResendClient(): Promise<import('resend').Resend> {
  if (!_resendClient) {
    const { Resend } = await import('resend')
    _resendClient = new Resend(env.RESEND_API_KEY)
  }
  return _resendClient
}

/**
 * Send a transactional email via Resend.
 * Failures are logged but never thrown — a transient email failure
 * must not crash or roll back the request that triggered it.
 */
export async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not configured — email skipped')
    return
  }

  if (!env.EMAIL_FROM) {
    console.warn('[email] EMAIL_FROM not configured — email skipped')
    return
  }

  console.log(`[email] Sending "${options.subject}" to ${JSON.stringify(options.to)} from ${env.EMAIL_FROM}`)

  try {
    const resend = await getResendClient()
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      ...(options.replyTo !== undefined ? { replyTo: options.replyTo } : {}),
    })

    if (error) {
      // Resend returns errors as objects, not thrown exceptions
      console.error('[email] Resend API error:', JSON.stringify(error))
    } else {
      console.log(`[email] Sent successfully — Resend id: ${data?.id}`)
    }
  } catch (err) {
    console.error('[email] Unexpected error sending email:', err)
  }
}

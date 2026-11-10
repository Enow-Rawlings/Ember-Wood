import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, requireAdminAuth, requireRole } from '../../middleware/auth.js'
import { validateBody } from '../../middleware/validate.js'
import { ok } from '../../utils/response.js'
import { sendEmail } from '../../lib/resend.js'
import { env } from '../../config/env.js'
import { ApiError } from '../../utils/ApiError.js'
import {
  orderConfirmationEmail,
  orderStatusUpdateEmail,
  passwordResetEmail,
  adminOrderNotificationEmail,
} from '../../lib/emails/index.js'

export const emailTestRouter = Router()

/**
 * GET /api/v1/email-test/config
 * Admin/owner only. Shows the current email configuration (no secrets).
 */
emailTestRouter.get(
  '/config',
  requireAuth,
  requireAdminAuth,
  requireRole('owner'),
  (_req, res) => {
    ok(res, {
      EMAIL_FROM: env.EMAIL_FROM || '(not set)',
      EMAIL_SUPPORT: env.EMAIL_SUPPORT || '(not set)',
      ALERT_EMAIL: env.ALERT_EMAIL || '(not set)',
      RESEND_API_KEY: env.RESEND_API_KEY
        ? `${env.RESEND_API_KEY.slice(0, 8)}...${env.RESEND_API_KEY.slice(-4)}`
        : '(not set)',
    })
  }
)

/**
 * POST /api/v1/email-test
 * Admin/owner only. Development + staging only (blocked in production).
 * Sends a test email of the requested template to verify Resend is configured.
 */
emailTestRouter.post(
  '/',
  requireAuth,
  requireAdminAuth,
  requireRole('owner'),
  validateBody(
    z.object({
      to: z.string().email(),
      template: z.enum([
        'order_confirmation',
        'order_status_update',
        'password_reset',
        'admin_notification',
      ]),
    })
  ),
  async (req, res, next) => {
    try {
      const { to, template } = req.body as { to: string; template: string }
      const testRef = 'NUC-TEST-000001'

      let subject: string
      let html: string

      switch (template) {
        case 'order_confirmation':
          subject = `[TEST] Order request received — ${testRef}`
          html = orderConfirmationEmail({
            customerName: 'Test Customer',
            reference: testRef,
            items: [
              { name: 'Kiln Dried Oak Logs — Crate', sku: 'HW-OAK-CR-001', quantity: 1, unitPrice: 176.00, lineTotal: 176.00, currency: 'GBP' },
              { name: 'Hardwood Kindling — Large Net', sku: 'KD-HW-LN-001', quantity: 2, unitPrice: 8.50, lineTotal: 17.00, currency: 'GBP' },
            ],
            subtotal: 193.00,
            currency: 'GBP',
            shippingAddress: { line1: '123 Test Street', city: 'London', postalCode: 'SW1A 1AA', country: 'GB' },
            supportEmail: env.EMAIL_SUPPORT,
          })
          break

        case 'order_status_update':
          subject = `[TEST] Order status update — ${testRef}`
          html = orderStatusUpdateEmail({
            customerName: 'Test Customer',
            reference: testRef,
            newStatus: 'confirmed',
            note: 'Your order has been confirmed and will be delivered within 3–5 working days.',
            supportEmail: env.EMAIL_SUPPORT,
          })
          break

        case 'password_reset':
          subject = '[TEST] Reset your password'
          html = passwordResetEmail({ resetUrl: `${env.FRONTEND_ORIGIN}/account/reset-password?token=test-token-123` })
          break

        case 'admin_notification':
          subject = `[TEST] New order request — ${testRef}`
          html = adminOrderNotificationEmail({
            reference: testRef,
            customerName: 'Test Customer',
            customerEmail: to,
            subtotal: 193.00,
            currency: 'GBP',
            itemCount: 2,
            marketCode: 'GB',
          })
          break

        default:
          throw new ApiError(400, 'Unknown template')
      }

      await sendEmail({ to, subject, html })

      ok(res, { sent: true, to, template, subject })
    } catch (err) {
      next(err)
    }
  }
)

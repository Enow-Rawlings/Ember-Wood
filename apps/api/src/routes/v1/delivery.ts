import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, requireAdminAuth, requireRole } from '../../middleware/auth.js'
import type { AuthenticatedRequest } from '../../middleware/auth.js'
import { validateBody, validateQuery } from '../../middleware/validate.js'
import { ok } from '../../utils/response.js'
import { supabase } from '../../lib/supabase.js'
import { ApiError } from '../../utils/ApiError.js'

export const deliveryRouter = Router()

// ─── Public: list active delivery zones ──────────────────────────────────────

/**
 * GET /api/v1/delivery/zones
 * Returns all active delivery zones for the public delivery page.
 */
deliveryRouter.get('/zones', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('delivery_zones')
      .select(
        `id, name, country_codes, region_name, base_charge,
         free_delivery_threshold, min_order_amount, lead_time_days,
         estimated_delivery_text, collection_available, notes`
      )
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw new ApiError(500, 'Failed to fetch delivery zones')
    ok(res, data ?? [])
  } catch (err) {
    next(err)
  }
})

// ─── Public: serviceability check ────────────────────────────────────────────

const serviceabilitySchema = z.object({
  postcode: z.string().min(2).max(20),
  country: z.string().length(2).default('GB'),
})

/**
 * GET /api/v1/delivery/check
 * Check whether a postcode/country is serviceable.
 * Returns zone details if serviceable.
 */
deliveryRouter.get(
  '/check',
  validateQuery(serviceabilitySchema),
  async (req, res, next) => {
    try {
      const { postcode, country } = req.query as z.infer<typeof serviceabilitySchema>

      // Normalise postcode: uppercase, trim
      const normalisedPostcode = postcode.trim().toUpperCase().replace(/\s+/g, ' ')
      // Extract the outward code (first part before the space, or first 2-4 chars)
      const outwardCode = normalisedPostcode.split(' ')[0]

      // Fetch active zones that include this country
      const { data: zones, error } = await supabase
        .from('delivery_zones')
        .select(
          `id, name, country_codes, region_name, postcode_prefixes,
           base_charge, free_delivery_threshold, min_order_amount,
           lead_time_days, estimated_delivery_text, collection_available, notes`
        )
        .eq('is_active', true)
        .contains('country_codes', [country])
        .order('sort_order', { ascending: true })

      if (error) throw new ApiError(500, 'Failed to check serviceability')

      if (!zones || zones.length === 0) {
        // Log the check
        await supabase.from('serviceability_checks').insert({
          postcode: normalisedPostcode,
          country_code: country,
          zone_id: null,
          is_serviceable: false,
        }).then(() => {/* fire and forget */})

        ok(res, {
          serviceable: false,
          zone: null,
          message:
            'We do not currently deliver to this country. Please contact us to discuss your requirements.',
        })
        return
      }

      // Find the best matching zone by postcode prefix
      let matchedZone = null
      for (const zone of zones) {
        const prefixes: string[] = zone.postcode_prefixes ?? []
        // If zone has no postcode restrictions, it covers the whole country
        if (prefixes.length === 0) {
          matchedZone = zone
          break
        }
        // Check if outward code starts with any of the zone's prefixes
        const matches = prefixes.some((prefix: string) =>
          outwardCode.toUpperCase().startsWith(prefix.toUpperCase())
        )
        if (matches) {
          matchedZone = zone
          break
        }
      }

      // Log the check
      await supabase.from('serviceability_checks').insert({
        postcode: normalisedPostcode,
        country_code: country,
        zone_id: matchedZone?.id ?? null,
        is_serviceable: !!matchedZone,
      }).then(() => {/* fire and forget */})

      if (!matchedZone) {
        ok(res, {
          serviceable: false,
          zone: null,
          message:
            'We may not currently deliver to this area. Please contact us and we will do our best to help.',
        })
        return
      }

      // Build response message
      const chargeText =
        matchedZone.base_charge === 0
          ? 'with free delivery'
          : `delivery from £${Number(matchedZone.base_charge).toFixed(2)}`
      const leadText = matchedZone.estimated_delivery_text
        ? `in ${matchedZone.estimated_delivery_text}`
        : `in approximately ${matchedZone.lead_time_days} working days`

      ok(res, {
        serviceable: true,
        zone: matchedZone,
        message: `We deliver to your area ${chargeText}, ${leadText}. Delivery details are confirmed on each order.`,
      })
    } catch (err) {
      next(err)
    }
  }
)

// ─── Admin: CRUD for delivery zones ──────────────────────────────────────────

const createZoneSchema = z.object({
  name: z.string().min(1).max(200),
  country_codes: z.array(z.string().length(2)).min(1),
  region_name: z.string().max(200).optional(),
  postcode_prefixes: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
  base_charge: z.number().min(0),
  free_delivery_threshold: z.number().min(0).optional().nullable(),
  min_order_amount: z.number().min(0).optional().nullable(),
  lead_time_days: z.number().int().min(0).default(3),
  estimated_delivery_text: z.string().max(200).optional(),
  collection_available: z.boolean().default(false),
  collection_address: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
  sort_order: z.number().int().default(0),
})

/**
 * GET /api/v1/delivery/admin/zones
 * Admin — list all zones including inactive ones.
 */
deliveryRouter.get(
  '/admin/zones',
  requireAuth,
  requireAdminAuth,
  async (_req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('delivery_zones')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw new ApiError(500, 'Failed to fetch delivery zones')
      ok(res, data ?? [])
    } catch (err) {
      next(err)
    }
  }
)

/**
 * POST /api/v1/delivery/admin/zones
 * Admin — create a delivery zone.
 */
deliveryRouter.post(
  '/admin/zones',
  requireAuth,
  requireAdminAuth,
  requireRole('owner', 'catalogue_manager'),
  validateBody(createZoneSchema),
  async (req, res, next) => {
    try {
      const authReq = req as AuthenticatedRequest
      const body = req.body as z.infer<typeof createZoneSchema>

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_user_id', authReq.userId)
        .single()

      const { data, error } = await supabase
        .from('delivery_zones')
        .insert({ ...body, created_by: adminUser?.id, updated_by: adminUser?.id })
        .select('*')
        .single()

      if (error || !data) throw new ApiError(500, 'Failed to create delivery zone')

      // Audit log
      await supabase.from('audit_logs').insert({
        actor_id: authReq.userId,
        actor_type: 'admin',
        actor_email: authReq.userEmail,
        action: 'delivery_zone.created',
        entity_type: 'delivery_zone',
        entity_id: data.id,
        metadata: { name: data.name },
      })

      ok(res, data, 201)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * PATCH /api/v1/delivery/admin/zones/:id
 * Admin — update a delivery zone.
 */
deliveryRouter.patch(
  '/admin/zones/:id',
  requireAuth,
  requireAdminAuth,
  requireRole('owner', 'catalogue_manager'),
  validateBody(createZoneSchema.partial()),
  async (req, res, next) => {
    try {
      const authReq = req as AuthenticatedRequest
      const { id } = req.params
      const body = req.body as Partial<z.infer<typeof createZoneSchema>>

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('auth_user_id', authReq.userId)
        .single()

      const { data, error } = await supabase
        .from('delivery_zones')
        .update({ ...body, updated_by: adminUser?.id })
        .eq('id', id)
        .select('*')
        .single()

      if (error || !data) throw new ApiError(404, 'Delivery zone not found')

      await supabase.from('audit_logs').insert({
        actor_id: authReq.userId,
        actor_type: 'admin',
        actor_email: authReq.userEmail,
        action: 'delivery_zone.updated',
        entity_type: 'delivery_zone',
        entity_id: id,
        metadata: { changes: Object.keys(body) },
      })

      ok(res, data)
    } catch (err) {
      next(err)
    }
  }
)

/**
 * DELETE /api/v1/delivery/admin/zones/:id
 * Admin — delete a delivery zone (owner only).
 */
deliveryRouter.delete(
  '/admin/zones/:id',
  requireAuth,
  requireAdminAuth,
  requireRole('owner'),
  async (req, res, next) => {
    try {
      const authReq = req as AuthenticatedRequest
      const { id } = req.params

      const { error } = await supabase.from('delivery_zones').delete().eq('id', id)
      if (error) throw new ApiError(404, 'Delivery zone not found')

      await supabase.from('audit_logs').insert({
        actor_id: authReq.userId,
        actor_type: 'admin',
        actor_email: authReq.userEmail,
        action: 'delivery_zone.deleted',
        entity_type: 'delivery_zone',
        entity_id: id,
        metadata: {},
      })

      ok(res, { deleted: true })
    } catch (err) {
      next(err)
    }
  }
)

import { Router } from 'express'
import { requireAuth, requireAdminAuth, requireRole } from '../../middleware/auth.js'
import { searchLimiter } from '../../middleware/rateLimiter.js'
import { ok, paginated } from '../../utils/response.js'
import { supabase } from '../../lib/supabase.js'
import { ApiError } from '../../utils/ApiError.js'
import { z } from 'zod'
import { validateQuery, validateBody } from '../../middleware/validate.js'

export const productsRouter = Router()

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  category: z.string().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'name_asc']).default('newest'),
  q: z.string().max(200).optional(),
  // Emberwood-specific filters
  wood_type: z.enum(['hardwood', 'softwood', 'mixed']).optional(),
  wood_condition: z.string().max(100).optional(),
  pack_format: z.string().max(100).optional(),
  in_stock: z.coerce.boolean().optional(),
})

/**
 * GET /api/v1/products
 * Public catalogue — returns published, visible products.
 */
productsRouter.get('/', searchLimiter, validateQuery(listQuerySchema), async (req, res, next) => {
  try {
    const { page, pageSize, category, sort, q, wood_type, wood_condition, pack_format, in_stock } =
      req.query as unknown as z.infer<typeof listQuerySchema>

    const offset = (page - 1) * pageSize

    let query = supabase
      .from('products')
      .select(
        `
        id, name, slug, sku, short_description, price, sale_price, currency,
        status, stock_quantity, wood_type, wood_condition, pack_format, log_length_cm,
        min_order_quantity,
        product_media (cloudinary_url, alt_text, display_order),
        categories:product_categories (
          category:categories (id, name, slug)
        )
      `,
        { count: 'exact' }
      )
      .eq('status', 'published')
      .eq('is_visible', true)
      .range(offset, offset + pageSize - 1)

    if (category) query = query.eq('categories.category.slug', category)
    if (q) query = query.ilike('name', `%${q}%`)
    if (wood_type) query = query.eq('wood_type', wood_type)
    if (wood_condition) query = query.eq('wood_condition', wood_condition)
    if (pack_format) query = query.eq('pack_format', pack_format)
    if (in_stock === true) query = query.gt('stock_quantity', 0)

    switch (sort) {
      case 'price_asc':  query = query.order('price', { ascending: true }); break
      case 'price_desc': query = query.order('price', { ascending: false }); break
      case 'name_asc':   query = query.order('name', { ascending: true }); break
      default:           query = query.order('created_at', { ascending: false })
    }

    const { data, count, error } = await query
    if (error) throw new ApiError(500, 'Failed to fetch products')

    paginated(res, data ?? [], { page, pageSize, total: count ?? 0 })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /api/v1/products/:slug
 * Public product detail.
 */
productsRouter.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    const { data, error } = await supabase
      .from('products')
      .select(
        `
        id, name, slug, sku, short_description, long_description,
        price, sale_price, currency, status, stock_quantity, low_stock_threshold,
        wood_species, wood_type, wood_condition, log_length_cm, pack_format,
        weight_kg, volume_description, moisture_content, intended_use,
        min_order_quantity, sale_price,
        product_media (cloudinary_url, alt_text, display_order, width, height),
        categories:product_categories (
          category:categories (id, name, slug)
        )
      `
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      throw new ApiError(404, 'Product not found')
    }

    // Fetch SEO record
    const { data: seoData } = await supabase
      .from('seo_records')
      .select('seo_title, meta_description, canonical_url, robots_directive')
      .eq('entity_type', 'product')
      .eq('entity_id', data.id)
      .maybeSingle()

    ok(res, { ...data, seo_records: seoData ? [seoData] : [] })
  } catch (err) {
    next(err)
  }
})

// ─── Admin product routes (require auth + admin role) ────────────────────────

/**
 * GET /api/v1/products/admin/all
 * Admin view — returns all products regardless of status.
 */
productsRouter.get(
  '/admin/all',
  requireAuth,
  requireAdminAuth,
  validateQuery(
    z.object({
      page: z.coerce.number().int().min(1).default(1),
      pageSize: z.coerce.number().int().min(1).max(100).default(24),
      status: z.string().optional(),
      q: z.string().max(200).optional(),
    })
  ),
  async (req, res, next) => {
    try {
      const { page, pageSize, status, q } = req.query as unknown as {
        page: number
        pageSize: number
        status?: string
        q?: string
      }

      const offset = (page - 1) * pageSize

      let query = supabase
        .from('products')
        .select(
          `id, name, slug, sku, price, currency, status,
           stock_quantity, low_stock_threshold, is_visible,
           wood_type, wood_condition, pack_format, min_order_quantity,
           created_at, updated_at,
           product_media (cloudinary_url, display_order)`,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1)

      if (status) query = query.eq('status', status)
      if (q) query = query.ilike('name', `%${q}%`)

      const { data, count, error } = await query
      if (error) throw new ApiError(500, 'Failed to fetch products')

      paginated(res, data ?? [], { page, pageSize, total: count ?? 0 })
    } catch (err) {
      next(err)
    }
  }
)

/**
 * GET /api/v1/products/admin/:id
 * Admin — fetch a single product by id (all statuses).
 */
productsRouter.get(
  '/admin/:id',
  requireAuth,
  requireAdminAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params

      const { data, error } = await supabase
        .from('products')
        .select(
          `id, name, slug, sku, short_description, long_description,
           price, sale_price, currency, status,
           stock_quantity, low_stock_threshold, is_visible,
           internal_notes,
           wood_species, wood_type, wood_condition,
           log_length_cm, pack_format, weight_kg,
           volume_description, moisture_content, intended_use,
           created_at, updated_at,
           product_media (id, cloudinary_url, cloudinary_public_id, alt_text, display_order, width, height),
           categories:product_categories (
             category:categories (id, name, slug)
           )`
        )
        .eq('id', id)
        .single()

      if (error || !data) throw new ApiError(404, 'Product not found')

      ok(res, data)
    } catch (err) {
      next(err)
    }
  }
)

const createProductSchema = z.object({
  name: z.string().min(1).max(300),
  sku: z.string().min(1).max(100),
  shortDescription: z.string().max(500).optional(),
  longDescription: z.string().max(10000).optional(),
  price: z.number().positive(),
  salePrice: z.number().min(0).optional(),
  currency: z.string().length(3).default('GBP'),
  stockQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  minOrderQuantity: z.number().int().min(1).default(1),
  isVisible: z.boolean().default(false),
  internalNotes: z.string().max(2000).optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
  // Wood attributes
  woodSpecies: z.string().max(200).optional(),
  woodType: z.enum(['hardwood', 'softwood', 'mixed']).optional(),
  woodCondition: z.string().max(100).optional(),
  logLengthCm: z.number().min(0).optional(),
  packFormat: z.string().max(100).optional(),
  weightKg: z.number().min(0).optional(),
  volumeDescription: z.string().max(500).optional(),
  moistureContent: z.string().max(200).optional(),
  intendedUse: z.string().max(200).optional(),
})

/**
 * POST /api/v1/products/admin
 * Admin — create a new product. Status defaults to 'draft'.
 */
productsRouter.post(
  '/admin',
  requireAuth,
  requireAdminAuth,
  requireRole('owner', 'catalogue_manager'),
  validateBody(createProductSchema),
  async (req, res, next) => {
    try {
      const authReq = req as import('../../middleware/auth.js').AuthenticatedRequest
      const body = req.body as z.infer<typeof createProductSchema>

      // Generate slug from name
      const baseSlug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 200)

      // Ensure slug uniqueness
      let slug = baseSlug
      let attempt = 0
      while (true) {
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('slug', slug)
          .maybeSingle()
        if (!existing) break
        attempt++
        slug = `${baseSlug}-${attempt}`
      }

      const { data: product, error } = await supabase
        .from('products')
        .insert({
          name: body.name,
          slug,
          sku: body.sku,
          short_description: body.shortDescription ?? null,
          long_description: body.longDescription ?? null,
          price: body.price,
          currency: body.currency,
          stock_quantity: body.stockQuantity,
          low_stock_threshold: body.lowStockThreshold,
          min_order_quantity: body.minOrderQuantity ?? 1,
          is_visible: body.isVisible,
          internal_notes: body.internalNotes ?? null,
          status: 'draft',
        })
        .select('id, name, slug, sku, price, currency, status, stock_quantity, created_at, updated_at')
        .single()

      if (error || !product) {
        if (error?.code === '23505') {
          throw new ApiError(409, `A product with SKU "${body.sku}" already exists`, 'CONFLICT')
        }
        throw new ApiError(500, 'Failed to create product')
      }

      // Attach categories if provided
      if (body.categoryIds?.length) {
        await supabase.from('product_categories').insert(
          body.categoryIds.map((catId) => ({ product_id: product.id, category_id: catId }))
        )
      }

      // Audit log
      await supabase.from('audit_logs').insert({
        actor_id: authReq.userId,
        actor_type: 'admin',
        actor_email: authReq.userEmail,
        action: 'product.created',
        entity_type: 'product',
        entity_id: product.id,
        metadata: { name: product.name, sku: product.sku },
      })

      ok(res, product, 201)
    } catch (err) {
      next(err)
    }
  }
)

const updateProductSchema = z.object({
  name: z.string().min(1).max(300).optional(),
  sku: z.string().min(1).max(100).optional(),
  shortDescription: z.string().max(500).optional(),
  longDescription: z.string().max(10000).optional(),
  price: z.number().positive().optional(),
  salePrice: z.number().min(0).optional().nullable(),
  currency: z.string().length(3).optional(),
  stockQuantity: z.number().int().min(0).optional(),
  lowStockThreshold: z.number().int().min(0).optional(),
  minOrderQuantity: z.number().int().min(1).optional(),
  isVisible: z.boolean().optional(),
  internalNotes: z.string().max(2000).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  // Wood attributes
  woodSpecies: z.string().max(200).optional(),
  woodType: z.enum(['hardwood', 'softwood', 'mixed']).optional().nullable(),
  woodCondition: z.string().max(100).optional(),
  logLengthCm: z.number().min(0).optional().nullable(),
  packFormat: z.string().max(100).optional(),
  weightKg: z.number().min(0).optional().nullable(),
  volumeDescription: z.string().max(500).optional(),
  moistureContent: z.string().max(200).optional(),
  intendedUse: z.string().max(200).optional(),
})

/**
 * PATCH /api/v1/products/admin/:id
 * Admin — update product fields.
 */
productsRouter.patch(
  '/admin/:id',
  requireAuth,
  requireAdminAuth,
  requireRole('owner', 'catalogue_manager'),
  validateBody(updateProductSchema),
  async (req, res, next) => {
    try {
      const authReq = req as import('../../middleware/auth.js').AuthenticatedRequest
      const { id } = req.params
      const body = req.body as z.infer<typeof updateProductSchema>

      // Build update payload (camelCase → snake_case)
      const updates: Record<string, unknown> = {}
      if (body.name !== undefined) updates.name = body.name
      if (body.sku !== undefined) updates.sku = body.sku
      if (body.shortDescription !== undefined) updates.short_description = body.shortDescription
      if (body.longDescription !== undefined) updates.long_description = body.longDescription
      if (body.price !== undefined) updates.price = body.price
      if (body.salePrice !== undefined) updates.sale_price = body.salePrice
      if (body.currency !== undefined) updates.currency = body.currency
      if (body.stockQuantity !== undefined) updates.stock_quantity = body.stockQuantity
      if (body.lowStockThreshold !== undefined) updates.low_stock_threshold = body.lowStockThreshold
      if (body.minOrderQuantity !== undefined) updates.min_order_quantity = body.minOrderQuantity
      if (body.isVisible !== undefined) updates.is_visible = body.isVisible
      if (body.internalNotes !== undefined) updates.internal_notes = body.internalNotes
      if (body.status !== undefined) updates.status = body.status
      // Wood attributes
      if (body.woodSpecies !== undefined) updates.wood_species = body.woodSpecies
      if (body.woodType !== undefined) updates.wood_type = body.woodType
      if (body.woodCondition !== undefined) updates.wood_condition = body.woodCondition
      if (body.logLengthCm !== undefined) updates.log_length_cm = body.logLengthCm
      if (body.packFormat !== undefined) updates.pack_format = body.packFormat
      if (body.weightKg !== undefined) updates.weight_kg = body.weightKg
      if (body.volumeDescription !== undefined) updates.volume_description = body.volumeDescription
      if (body.moistureContent !== undefined) updates.moisture_content = body.moistureContent
      if (body.intendedUse !== undefined) updates.intended_use = body.intendedUse

      const { data: product, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select('id, name, slug, sku, price, currency, status, stock_quantity, is_visible, updated_at')
        .single()

      if (error || !product) {
        if (error?.code === '23505') throw new ApiError(409, 'SKU already exists', 'CONFLICT')
        // PGRST116 = no rows returned — product exists but RLS blocked the update,
        // or the id genuinely doesn't exist
        console.error(`[products PATCH] id=${id} error=${JSON.stringify(error)}`)
        throw new ApiError(404, `Product not found or update blocked (id: ${id})`)
      }

      // Audit log
      await supabase.from('audit_logs').insert({
        actor_id: authReq.userId,
        actor_type: 'admin',
        actor_email: authReq.userEmail,
        action: 'product.updated',
        entity_type: 'product',
        entity_id: id,
        metadata: { changes: Object.keys(updates) },
      })

      ok(res, product)
    } catch (err) {
      next(err)
    }
  }
)

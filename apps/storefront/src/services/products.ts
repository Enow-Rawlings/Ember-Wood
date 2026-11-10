import { api } from '@/lib/api'
import type { PaginatedResponse, ApiSuccess } from 'shared-types'

// ─── Types matching the API response shapes ───────────────────────────────────

export interface ProductMediaItem {
  cloudinary_url: string
  alt_text: string
  display_order: number
  width: number | null
  height: number | null
}

export interface ProductListItem {
  id: string
  name: string
  slug: string
  sku: string
  short_description: string | null
  price: number
  sale_price: number | null
  currency: string
  stock_quantity: number
  min_order_quantity: number
  product_media: ProductMediaItem[]
  categories: Array<{ category: { id: string; name: string; slug: string } }>
  wood_type: string | null
  wood_condition: string | null
  pack_format: string | null
  log_length_cm: number | null
}

export interface ProductDetail extends ProductListItem {
  long_description: string | null
  wood_species: string | null
  weight_kg: number | null
  volume_description: string | null
  moisture_content: string | null
  intended_use: string | null
  seo_records: Array<{
    seo_title: string | null
    meta_description: string | null
    canonical_url: string | null
    robots_directive: string
  }>
}

export interface CategoryItem {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc'

export interface ProductListParams {
  page?: number | undefined
  pageSize?: number | undefined
  category?: string | undefined
  sort?: SortOption | undefined
  q?: string | undefined
  // Emberwood-specific filters
  wood_type?: string | undefined
  wood_condition?: string | undefined
  pack_format?: string | undefined
  in_stock?: boolean | undefined
}

// ─── API calls ────────────────────────────────────────────────────────────────

export async function fetchProducts(
  params: ProductListParams = {}
): Promise<PaginatedResponse<ProductListItem>> {
  const { data } = await api.get<PaginatedResponse<ProductListItem>>('/products', {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 24,
      sort: params.sort ?? 'newest',
      ...(params.category ? { category: params.category } : {}),
      ...(params.q ? { q: params.q } : {}),
      ...(params.wood_type ? { wood_type: params.wood_type } : {}),
      ...(params.wood_condition ? { wood_condition: params.wood_condition } : {}),
      ...(params.pack_format ? { pack_format: params.pack_format } : {}),
      ...(params.in_stock !== undefined ? { in_stock: params.in_stock } : {}),
    },
  })
  return data
}

export async function fetchProduct(slug: string): Promise<ProductDetail> {
  const { data } = await api.get<ApiSuccess<ProductDetail>>(`/products/${slug}`)
  return data.data
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  const { data } = await api.get<ApiSuccess<CategoryItem[]>>('/categories')
  return data.data
}

export async function fetchCategory(slug: string): Promise<CategoryItem> {
  const { data } = await api.get<ApiSuccess<CategoryItem>>(`/categories/${slug}`)
  return data.data
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPrimaryImage(media: ProductMediaItem[]): ProductMediaItem | null {
  if (!media?.length) return null
  return [...media].sort((a, b) => a.display_order - b.display_order)[0]
}

export function formatPrice(price: number, currency: string, locale = 'en-GB'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function isInStock(qty: number): boolean {
  return qty > 0
}

export function isLowStock(qty: number, threshold: number): boolean {
  return qty > 0 && qty <= threshold
}

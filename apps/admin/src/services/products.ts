import { api } from '@/lib/api'
import type { ApiSuccess, PaginatedResponse } from 'shared-types'

export interface AdminProduct {
  id: string
  name: string
  slug: string
  sku: string
  short_description: string | null
  long_description: string | null
  price: number
  sale_price: number | null
  currency: string
  status: string
  stock_quantity: number
  low_stock_threshold: number
  min_order_quantity: number
  is_visible: boolean
  internal_notes: string | null
  // Wood attributes
  wood_species: string | null
  wood_type: string | null
  wood_condition: string | null
  log_length_cm: number | null
  pack_format: string | null
  weight_kg: number | null
  volume_description: string | null
  moisture_content: string | null
  intended_use: string | null
  created_at: string
  updated_at: string
  product_media?: Array<{ id: string; cloudinary_url: string; cloudinary_public_id: string; alt_text: string; display_order: number; width: number | null; height: number | null }>
  categories?: Array<{ category: { id: string; name: string; slug: string } }>
}

export interface AdminProductListParams {
  page?: number
  pageSize?: number
  status?: string | undefined
  q?: string | undefined
}

export async function fetchAdminProducts(
  params: AdminProductListParams = {}
): Promise<PaginatedResponse<AdminProduct>> {
  const { data } = await api.get<PaginatedResponse<AdminProduct>>('/products/admin/all', {
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 24,
      ...(params.status ? { status: params.status } : {}),
      ...(params.q ? { q: params.q } : {}),
    },
  })
  return data
}

export async function fetchAdminProduct(id: string): Promise<AdminProduct> {
  const { data } = await api.get<ApiSuccess<AdminProduct>>(`/products/admin/${id}`)
  return data.data
}

export interface CreateProductPayload {
  name: string
  sku: string
  shortDescription?: string | undefined
  longDescription?: string | undefined
  price: number
  salePrice?: number | null | undefined
  currency?: string
  stockQuantity: number
  lowStockThreshold: number
  minOrderQuantity?: number
  isVisible: boolean
  internalNotes?: string | undefined
  // Wood attributes
  woodSpecies?: string | undefined
  woodType?: string | undefined
  woodCondition?: string | undefined
  logLengthCm?: number | undefined
  packFormat?: string | undefined
  weightKg?: number | undefined
  volumeDescription?: string | undefined
  moistureContent?: string | undefined
  intendedUse?: string | undefined
}

export async function createProduct(payload: CreateProductPayload): Promise<AdminProduct> {
  const { data } = await api.post<ApiSuccess<AdminProduct>>('/products/admin', payload)
  return data.data
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: string | undefined
}

export async function updateProduct(
  id: string,
  payload: UpdateProductPayload
): Promise<AdminProduct> {
  const { data } = await api.patch<ApiSuccess<AdminProduct>>(`/products/admin/${id}`, payload)
  return data.data
}

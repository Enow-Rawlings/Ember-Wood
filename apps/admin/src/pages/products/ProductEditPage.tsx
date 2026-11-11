import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAdminProduct, updateProduct } from '@/services/products'
import { Badge, productStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import { ImageUploader } from '@/components/forms/ImageUploader'
import { AiGenerateButton } from '@/components/ui/AiGenerateButton'

const PRODUCT_STATUSES = ['draft', 'published', 'archived']
const WOOD_TYPES       = ['hardwood', 'softwood', 'mixed']
const WOOD_CONDITIONS  = ['Kiln-dried', 'Seasoned', 'Air-dried', 'Freshly cut', 'Untreated']
const PACK_FORMATS     = ['Net bag', 'Bulk bag', 'Crate', 'Pallet', 'Box', 'Bundle', 'Sack', 'Loose load']
const INTENDED_USES    = ['Open fireplace', 'Wood-burning stove', 'Fire pit', 'Chiminea', 'Log burner', 'Outdoor/BBQ', 'General heating', 'Kindling']

type MediaItem = {
  id: string; cloudinary_url: string; cloudinary_public_id: string
  alt_text: string; display_order: number; width: number | null; height: number | null
}

const inputClass = 'rounded border border-border-warm bg-white px-3 py-2 text-sm text-charcoal focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange w-full'
const selectClass = inputClass

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [mediaSeeded, setMediaSeeded] = useState(false)

  // Core fields
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [stockQty, setStockQty] = useState('')
  const [lowStock, setLowStock] = useState('')
  const [minOrderQty, setMinOrderQty] = useState('1')
  const [isVisible, setIsVisible] = useState(false)
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [internalNotes, setInternalNotes] = useState('')
  const [fieldsSeeded, setFieldsSeeded] = useState(false)

  // Wood attributes
  const [woodSpecies, setWoodSpecies] = useState('')
  const [woodType, setWoodType] = useState('')
  const [woodCondition, setWoodCondition] = useState('')
  const [logLengthCm, setLogLengthCm] = useState('')
  const [packFormat, setPackFormat] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [volumeDescription, setVolumeDescription] = useState('')
  const [moistureContent, setMoistureContent] = useState('')
  const [intendedUse, setIntendedUse] = useState('')

  const { data: product, isLoading } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => fetchAdminProduct(id!),
    enabled: Boolean(id),
  })

  if (product && !fieldsSeeded) {
    setName(product.name)
    setSku(product.sku)
    setPrice(String(product.price))
    setSalePrice(product.sale_price ? String(product.sale_price) : '')
    setStockQty(String(product.stock_quantity))
    setLowStock(String(product.low_stock_threshold))
    setMinOrderQty(String(product.min_order_quantity ?? 1))
    setIsVisible(product.is_visible)
    setShortDesc(product.short_description ?? '')
    setLongDesc(product.long_description ?? '')
    setInternalNotes(product.internal_notes ?? '')
    setWoodSpecies(product.wood_species ?? '')
    setWoodType(product.wood_type ?? '')
    setWoodCondition(product.wood_condition ?? '')
    setLogLengthCm(product.log_length_cm ? String(product.log_length_cm) : '')
    setPackFormat(product.pack_format ?? '')
    setWeightKg(product.weight_kg ? String(product.weight_kg) : '')
    setVolumeDescription(product.volume_description ?? '')
    setMoistureContent(product.moisture_content ?? '')
    setIntendedUse(product.intended_use ?? '')
    setFieldsSeeded(true)
  }
  if (product && !mediaSeeded) {
    setMediaItems((product.product_media ?? []) as MediaItem[])
    setMediaSeeded(true)
  }

  const mutation = useMutation({
    mutationFn: (payload: Parameters<typeof updateProduct>[1]) => updateProduct(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      queryClient.invalidateQueries({ queryKey: ['admin-product', id] })
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 3000)
    },
    onError: (err: unknown) => {
      setError(
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? 'Failed to update product.'
      )
    },
  })

  if (isLoading || !product) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const aiCtx = { name, sku, shortDescription: shortDesc, longDescription: longDesc, woodSpecies, woodType, woodCondition, packFormat }

  return (
    <div className="max-w-3xl pb-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link to="/products" className="text-sm text-stone-grey hover:text-ember-orange">← Products</Link>
        <h1 className="font-heading text-2xl font-bold text-forest-green">{product.name}</h1>
        <Badge variant={productStatusBadge(product.status)}>{product.status.replace('_', ' ')}</Badge>
      </div>

      {error && (
        <div role="alert" className="mb-4 flex gap-2 rounded border border-error-red/30 bg-[#fde8e8] p-3 text-sm text-error-red">
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />{error}
        </div>
      )}
      {saved && (
        <div role="status" className="mb-4 flex gap-2 rounded border border-success-green/30 bg-[#e8f5ef] p-3 text-sm text-success-green">
          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />Product updated successfully.
        </div>
      )}

      <div className="flex flex-col gap-5">

        {/* Publication status */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-4 font-heading text-base font-semibold text-forest-green">Publication status</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm font-medium text-charcoal">Status</label>
              <select id="status" defaultValue={product.status}
                onChange={(e) => mutation.mutate({ status: e.target.value })}
                className={selectClass}>
                {PRODUCT_STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
              <input type="checkbox" checked={isVisible}
                onChange={(e) => { setIsVisible(e.target.checked); mutation.mutate({ isVisible: e.target.checked }) }}
                className="accent-ember-orange" />
              Visible on storefront
            </label>
          </div>
        </div>

        {/* Core product details */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-4 font-heading text-base font-semibold text-forest-green">Product details</h2>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-charcoal">Name <span className="text-error-red">*</span></label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="sku" className="text-sm font-medium text-charcoal">SKU <span className="text-error-red">*</span></label>
                <input id="sku" type="text" value={sku} onChange={(e) => setSku(e.target.value)} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="text-sm font-medium text-charcoal">Price (£) <span className="text-error-red">*</span></label>
                <input id="price" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="salePrice" className="text-sm font-medium text-charcoal">Sale price (£)</label>
                <input id="salePrice" type="number" step="0.01" min="0" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className={inputClass} placeholder="Leave blank if not on sale" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="stockQty" className="text-sm font-medium text-charcoal">Stock quantity</label>
                <input id="stockQty" type="number" min="0" value={stockQty} onChange={(e) => setStockQty(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lowStock" className="text-sm font-medium text-charcoal">Low stock alert at</label>
                <input id="lowStock" type="number" min="0" value={lowStock} onChange={(e) => setLowStock(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="minOrderQty" className="text-sm font-medium text-charcoal">Minimum order quantity</label>
                <input id="minOrderQty" type="number" min="1" value={minOrderQty} onChange={(e) => setMinOrderQty(e.target.value)} className={inputClass} />
                <p className="text-xs text-stone-grey">Set to 1 for no restriction. Use higher values for pallets/bulk orders.</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="shortDesc" className="text-sm font-medium text-charcoal">Short description</label>
                <AiGenerateButton type="product_short_description" context={{ ...aiCtx, existing: shortDesc }} onGenerated={setShortDesc} label="AI Generate" />
              </div>
              <input id="shortDesc" type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className={inputClass} maxLength={500} />
              <p className="text-xs text-stone-grey">{shortDesc.length}/500</p>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <label htmlFor="longDesc" className="text-sm font-medium text-charcoal">Full description</label>
                  <p className="text-xs text-stone-grey">Do not invent moisture content or certifications.</p>
                </div>
                <AiGenerateButton type="product_long_description" context={{ ...aiCtx, existing: longDesc }} onGenerated={setLongDesc} label="AI Generate" />
              </div>
              <textarea id="longDesc" rows={6} value={longDesc} onChange={(e) => setLongDesc(e.target.value)} className={[inputClass, 'resize-y'].join(' ')} />
            </div>

            <Button type="button" variant="primary" loading={mutation.isPending}
              onClick={() => mutation.mutate({
                name,
                sku,
                price: parseFloat(price) || 0,
                salePrice: salePrice.trim() !== '' ? parseFloat(salePrice) : null,
                shortDescription: shortDesc.trim() || undefined,
                longDescription: longDesc.trim() || undefined,
                stockQuantity: parseInt(stockQty, 10) || 0,
                lowStockThreshold: parseInt(lowStock, 10) || 0,
                minOrderQuantity: parseInt(minOrderQty, 10) || 1,
                isVisible,
              })}>
              {mutation.isPending ? 'Saving…' : 'Save product details'}
            </Button>
          </div>
        </div>

        {/* Wood attributes */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-1 font-heading text-base font-semibold text-forest-green">Wood attributes</h2>
          <p className="mb-4 text-xs text-stone-grey">Only fill in fields that are accurate and evidenced.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="woodSpecies" className="text-sm font-medium text-charcoal">Wood species</label>
              <input id="woodSpecies" type="text" value={woodSpecies} onChange={(e) => setWoodSpecies(e.target.value)} placeholder="e.g. Oak, Ash, Mixed hardwood" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="woodType" className="text-sm font-medium text-charcoal">Wood type</label>
              <select id="woodType" value={woodType} onChange={(e) => setWoodType(e.target.value)} className={selectClass}>
                <option value="">Select type…</option>
                {WOOD_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="woodCondition" className="text-sm font-medium text-charcoal">Condition</label>
              <select id="woodCondition" value={woodCondition} onChange={(e) => setWoodCondition(e.target.value)} className={selectClass}>
                <option value="">Select condition…</option>
                {WOOD_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="packFormat" className="text-sm font-medium text-charcoal">Pack format</label>
              <select id="packFormat" value={packFormat} onChange={(e) => setPackFormat(e.target.value)} className={selectClass}>
                <option value="">Select format…</option>
                {PACK_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="logLengthCm" className="text-sm font-medium text-charcoal">Log length (cm)</label>
              <input id="logLengthCm" type="number" step="0.5" min="0" value={logLengthCm} onChange={(e) => setLogLengthCm(e.target.value)} placeholder="e.g. 25" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="weightKg" className="text-sm font-medium text-charcoal">Approx. weight (kg)</label>
              <input id="weightKg" type="number" step="0.1" min="0" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="volumeDescription" className="text-sm font-medium text-charcoal">Volume / quantity description</label>
              <input id="volumeDescription" type="text" value={volumeDescription} onChange={(e) => setVolumeDescription(e.target.value)} placeholder="e.g. Approx. 0.75m³ loose fill" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="intendedUse" className="text-sm font-medium text-charcoal">Intended use</label>
              <select id="intendedUse" value={intendedUse} onChange={(e) => setIntendedUse(e.target.value)} className={selectClass}>
                <option value="">Select use…</option>
                {INTENDED_USES.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="moistureContent" className="text-sm font-medium text-charcoal">Moisture content</label>
              <input id="moistureContent" type="text" value={moistureContent} onChange={(e) => setMoistureContent(e.target.value)} placeholder="e.g. Below 20% (tested batch Jan 2026)" className={inputClass} />
              <p className="text-xs text-stone-grey">Only enter if genuinely tested. Include batch/date reference.</p>
            </div>
          </div>
          <div className="mt-4">
            <Button type="button" variant="primary" loading={mutation.isPending}
              onClick={() => mutation.mutate({ woodSpecies: woodSpecies || undefined, woodType: woodType || undefined, woodCondition: woodCondition || undefined, logLengthCm: logLengthCm ? parseFloat(logLengthCm) : undefined, packFormat: packFormat || undefined, weightKg: weightKg ? parseFloat(weightKg) : undefined, volumeDescription: volumeDescription || undefined, moistureContent: moistureContent || undefined, intendedUse: intendedUse || undefined })}>
              Save wood attributes
            </Button>
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-1 font-heading text-base font-semibold text-forest-green">SEO</h2>
          <p className="mb-4 text-xs text-stone-grey">Generate and copy to the SEO page to save.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-charcoal">SEO title</p>
              <AiGenerateButton type="product_seo_title" context={aiCtx} onGenerated={(t) => { const el = document.getElementById('seo-title-preview') as HTMLInputElement | null; if (el) el.value = t }} label="Generate" />
              <input id="seo-title-preview" type="text" readOnly placeholder="Click generate…" className={[inputClass, 'cursor-default bg-pale-sage'].join(' ')} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-charcoal">Meta description</p>
              <AiGenerateButton type="product_seo_description" context={aiCtx} onGenerated={(t) => { const el = document.getElementById('seo-desc-preview') as HTMLTextAreaElement | null; if (el) el.value = t }} label="Generate" />
              <textarea id="seo-desc-preview" rows={3} readOnly placeholder="Click generate…" className={[inputClass, 'resize-none cursor-default bg-pale-sage'].join(' ')} />
            </div>
          </div>
        </div>

        {/* Internal notes */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-1 font-heading text-base font-semibold text-forest-green">Internal notes</h2>
          <p className="mb-3 text-xs text-stone-grey">Admin-only. Never visible to customers.</p>
          <textarea rows={4} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} className={[inputClass, 'resize-y'].join(' ')} />
          <div className="mt-3">
            <Button type="button" variant="secondary" size="sm" loading={mutation.isPending} onClick={() => mutation.mutate({ internalNotes })}>Save notes</Button>
          </div>
        </div>

        {/* Images */}
        <div className="rounded-lg border border-border-warm p-5">
          <h2 className="mb-1 font-heading text-base font-semibold text-forest-green">Images</h2>
          <p className="mb-4 text-xs text-stone-grey">Use genuine product photography only.</p>
          <ImageUploader productId={product.id} existingMedia={mediaItems}
            onUploaded={(media) => setMediaItems((prev) => [...prev, media as MediaItem])}
            onDeleted={(mediaId) => setMediaItems((prev) => prev.filter((m) => m.id !== mediaId))} />
        </div>

        {/* Meta */}
        <div className="rounded-lg border border-border-warm bg-pale-sage p-4 text-xs text-stone-grey">
          <p>Created: {new Date(product.created_at).toLocaleString()}</p>
          <p>Last updated: {new Date(product.updated_at).toLocaleString()}</p>
          <p className="font-mono">ID: {product.id}</p>
        </div>
      </div>
    </div>
  )
}

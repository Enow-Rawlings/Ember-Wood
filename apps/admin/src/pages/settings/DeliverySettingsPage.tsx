import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Globe, Truck, Check, X, AlertTriangle, CheckCircle } from 'lucide-react'
import { api } from '@/lib/api'
import type { ApiSuccess } from 'shared-types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

interface DeliveryZone {
  id: string
  name: string
  country_codes: string[]
  region_name: string | null
  postcode_prefixes: string[]
  is_active: boolean
  base_charge: number
  free_delivery_threshold: number | null
  min_order_amount: number | null
  lead_time_days: number
  estimated_delivery_text: string | null
  collection_available: boolean
  notes: string | null
  sort_order: number
}

async function fetchAdminZones(): Promise<DeliveryZone[]> {
  const { data } = await api.get<ApiSuccess<DeliveryZone[]>>('/delivery/admin/zones')
  return data.data
}

const inputClass =
  'rounded border border-border-warm bg-white px-3 py-2 text-sm text-charcoal focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange w-full'

const EMPTY_ZONE: Omit<DeliveryZone, 'id'> = {
  name: '',
  country_codes: ['GB'],
  region_name: '',
  postcode_prefixes: [],
  is_active: true,
  base_charge: 9.99,
  free_delivery_threshold: 100,
  min_order_amount: 20,
  lead_time_days: 3,
  estimated_delivery_text: '3-5 working days',
  collection_available: false,
  notes: '',
  sort_order: 0,
}

// ─── Zone form ────────────────────────────────────────────────────────────────

function ZoneForm({
  initialValues,
  onSave,
  onCancel,
  isSaving,
}: {
  initialValues: Omit<DeliveryZone, 'id'>
  onSave: (v: Omit<DeliveryZone, 'id'>) => void
  onCancel: () => void
  isSaving: boolean
}) {
  const [form, setForm] = useState(initialValues)

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-ember-orange/30 bg-[#fdf6f0] p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-medium text-charcoal">Zone name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={inputClass}
            required
            placeholder="e.g. United Kingdom — Standard"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Country codes (comma-separated)</label>
          <input
            type="text"
            value={form.country_codes.join(', ')}
            onChange={(e) =>
              set(
                'country_codes',
                e.target.value
                  .split(',')
                  .map((c) => c.trim().toUpperCase())
                  .filter(Boolean)
              )
            }
            className={inputClass}
            placeholder="GB, IE"
          />
          <p className="text-xs text-stone-grey">ISO 3166-1 alpha-2 codes</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Postcode prefixes (optional)</label>
          <input
            type="text"
            value={form.postcode_prefixes.join(', ')}
            onChange={(e) =>
              set(
                'postcode_prefixes',
                e.target.value
                  .split(',')
                  .map((c) => c.trim().toUpperCase())
                  .filter(Boolean)
              )
            }
            className={inputClass}
            placeholder="SW, SE, E, EC — leave blank for whole country"
          />
          <p className="text-xs text-stone-grey">Leave blank to cover the entire country</p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Base delivery charge (£)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.base_charge}
            onChange={(e) => set('base_charge', parseFloat(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Free delivery threshold (£)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.free_delivery_threshold ?? ''}
            onChange={(e) =>
              set('free_delivery_threshold', e.target.value ? parseFloat(e.target.value) : null)
            }
            className={inputClass}
            placeholder="Leave blank if no threshold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Minimum order amount (£)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.min_order_amount ?? ''}
            onChange={(e) =>
              set('min_order_amount', e.target.value ? parseFloat(e.target.value) : null)
            }
            className={inputClass}
            placeholder="Leave blank if no minimum"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Lead time (days)</label>
          <input
            type="number"
            min="0"
            value={form.lead_time_days}
            onChange={(e) => set('lead_time_days', parseInt(e.target.value, 10))}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-charcoal">Estimated delivery text</label>
          <input
            type="text"
            value={form.estimated_delivery_text ?? ''}
            onChange={(e) => set('estimated_delivery_text', e.target.value || null)}
            className={inputClass}
            placeholder="e.g. 3-5 working days"
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm font-medium text-charcoal">Notes</label>
          <textarea
            rows={2}
            value={form.notes ?? ''}
            onChange={(e) => set('notes', e.target.value || null)}
            className={[inputClass, 'resize-y'].join(' ')}
            placeholder="Any important caveats or restrictions for this zone"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              className="accent-ember-orange"
            />
            Zone is active (visible to customers)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              checked={form.collection_available}
              onChange={(e) => set('collection_available', e.target.checked)}
              className="accent-ember-orange"
            />
            Collection available in this zone
          </label>
        </div>
      </div>

      <div className="flex gap-2 border-t border-border-warm pt-4">
        <Button type="submit" variant="primary" size="sm" loading={isSaving}>
          Save zone
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DeliverySettingsPage() {
  const queryClient = useQueryClient()
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: zones = [], isLoading } = useQuery({
    queryKey: ['admin-delivery-zones'],
    queryFn: fetchAdminZones,
  })

  const createMutation = useMutation({
    mutationFn: (body: Omit<DeliveryZone, 'id'>) => api.post('/delivery/admin/zones', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery-zones'] })
      setCreating(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setError(null)
    },
    onError: () => setError('Failed to create delivery zone.'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<DeliveryZone> }) =>
      api.patch(`/delivery/admin/zones/${id}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery-zones'] })
      setEditingId(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      setError(null)
    },
    onError: () => setError('Failed to update delivery zone.'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/delivery/admin/zones/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery-zones'] })
    },
    onError: () => setError('Failed to delete delivery zone.'),
  })

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete zone "${name}"? This cannot be undone.`)) return
    deleteMutation.mutate(id)
  }

  return (
    <div className="max-w-4xl pb-6">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-forest-green">Delivery settings</h1>
        <p className="mt-1 text-sm text-stone-grey">
          Manage delivery zones, charges, lead times and serviceability rules.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-4 flex gap-2 rounded border border-error-red/30 bg-[#fde8e8] p-3 text-sm text-error-red">
          <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}
      {saved && (
        <div role="status" className="mb-4 flex gap-2 rounded border border-success-green/30 bg-[#e8f5ef] p-3 text-sm text-success-green">
          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          Delivery zone saved.
        </div>
      )}

      {/* ── Notice ─────────────────────────────────────────────────────── */}
      <div className="mb-6 flex gap-3 rounded-lg border border-border-warm bg-pale-sage p-4">
        <Truck size={16} className="mt-0.5 flex-shrink-0 text-forest-green" aria-hidden="true" />
        <div className="text-sm">
          <p className="font-semibold text-charcoal">Delivery is always confirmed per order</p>
          <p className="mt-0.5 text-stone-grey">
            These zones define your standard service areas and charges. Final delivery
            availability, cost and lead time are confirmed to the customer on each order
            request — never automatically at checkout.
          </p>
        </div>
      </div>

      {/* ── Zone list ──────────────────────────────────────────────────── */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-base font-semibold text-charcoal">Delivery zones</h2>
        {!creating && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreating(true)}
          >
            <Plus size={14} aria-hidden="true" />
            Add zone
          </Button>
        )}
      </div>

      {creating && (
        <div className="mb-4">
          <ZoneForm
            initialValues={EMPTY_ZONE}
            onSave={(body) => createMutation.mutate(body)}
            onCancel={() => setCreating(false)}
            isSaving={createMutation.isPending}
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : zones.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border-warm py-10 text-center">
          <Globe size={24} className="mx-auto mb-2 text-border-warm" aria-hidden="true" />
          <p className="text-sm text-stone-grey">No delivery zones configured yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {zones.map((zone) => (
            <div key={zone.id} className="overflow-hidden rounded-lg border border-border-warm bg-white">
              {editingId === zone.id ? (
                <div className="p-4">
                  <ZoneForm
                    initialValues={zone}
                    onSave={(body) => updateMutation.mutate({ id: zone.id, body })}
                    onCancel={() => setEditingId(null)}
                    isSaving={updateMutation.isPending}
                  />
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-heading text-sm font-semibold text-charcoal">
                        {zone.name}
                      </span>
                      <Badge variant={zone.is_active ? 'success' : 'default'}>
                        {zone.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      {zone.country_codes.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-pale-sage px-1.5 py-0.5 font-mono text-[10px] text-charcoal"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-stone-grey">
                      <span>
                        Charge: {zone.base_charge === 0 ? 'Free' : `£${Number(zone.base_charge).toFixed(2)}`}
                        {zone.free_delivery_threshold &&
                          ` (free over £${Number(zone.free_delivery_threshold).toFixed(2)})`}
                      </span>
                      <span>Lead time: {zone.estimated_delivery_text ?? `${zone.lead_time_days}d`}</span>
                      {zone.min_order_amount && (
                        <span>Min order: £{Number(zone.min_order_amount).toFixed(2)}</span>
                      )}
                      <span className="flex items-center gap-0.5">
                        {zone.collection_available ? (
                          <Check size={10} aria-hidden="true" />
                        ) : (
                          <X size={10} aria-hidden="true" />
                        )}
                        Collection
                      </span>
                    </div>
                    {zone.notes && (
                      <p className="mt-1 text-xs text-stone-grey">{zone.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingId(zone.id)}
                      className="rounded p-1.5 text-stone-grey hover:bg-pale-sage hover:text-charcoal"
                      aria-label={`Edit ${zone.name}`}
                    >
                      <Pencil size={14} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(zone.id, zone.name)}
                      className="rounded p-1.5 text-stone-grey hover:bg-[#fde8e8] hover:text-error-red"
                      aria-label={`Delete ${zone.name}`}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Truck, MapPin, Clock, Package, CheckCircle, AlertTriangle, PhoneCall } from 'lucide-react'
import { api } from '@/lib/api'
import type { ApiSuccess } from 'shared-types'
import { useSeo } from '@/hooks/useSeo'

interface DeliveryZone {
  id: string
  name: string
  country_codes: string[]
  region_name: string | null
  base_charge: number
  free_delivery_threshold: number | null
  min_order_amount: number | null
  lead_time_days: number
  estimated_delivery_text: string | null
  collection_available: boolean
  notes: string | null
}

interface ServiceabilityResult {
  serviceable: boolean
  zone: DeliveryZone | null
  message: string
}

async function fetchDeliveryZones(): Promise<DeliveryZone[]> {
  const { data } = await api.get<ApiSuccess<DeliveryZone[]>>('/delivery/zones')
  return data.data
}

async function checkServiceability(
  postcode: string,
  countryCode: string
): Promise<ServiceabilityResult> {
  const { data } = await api.get<ApiSuccess<ServiceabilityResult>>('/delivery/check', {
    params: { postcode, country: countryCode },
  })
  return data.data
}

// ─── Serviceability checker widget ───────────────────────────────────────────

function ServiceabilityChecker() {
  const [postcode, setPostcode] = useState('')
  const [country, setCountry] = useState('GB')
  const [result, setResult] = useState<ServiceabilityResult | null>(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postcode.trim()) return
    setChecking(true)
    setResult(null)
    setError(null)
    try {
      const res = await checkServiceability(postcode.trim().toUpperCase(), country)
      setResult(res)
    } catch {
      setError('Unable to check at this time. Please contact us directly.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="rounded-xl border border-border-warm bg-white p-6 shadow-card">
      <h2 className="mb-1 font-heading text-lg font-bold text-charcoal">
        Check delivery to your area
      </h2>
      <p className="mb-4 text-sm text-stone-grey">
        Enter your postcode or area to check whether we can deliver to you.
      </p>
      <form onSubmit={handleCheck} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="country-select" className="text-xs font-medium text-charcoal">
            Country
          </label>
          <select
            id="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded border border-border-warm bg-white px-3 py-2.5 text-sm text-charcoal focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange"
          >
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="IE">Ireland</option>
            <option value="FR">France</option>
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="postcode-input" className="text-xs font-medium text-charcoal">
            Postcode / postal code
          </label>
          <input
            id="postcode-input"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g. SW1A 1AA"
            maxLength={10}
            className="rounded border border-border-warm bg-white px-3 py-2.5 text-sm text-charcoal placeholder-stone-grey focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange"
          />
        </div>
        <button
          type="submit"
          disabled={!postcode.trim() || checking}
          className="flex-shrink-0 rounded bg-ember-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a85a30] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checking ? 'Checking…' : 'Check'}
        </button>
      </form>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-error-red">
          <AlertTriangle size={14} aria-hidden="true" />
          {error}
        </div>
      )}

      {result && (
        <div
          className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${
            result.serviceable
              ? 'border-success-green/30 bg-[#e8f5ef]'
              : 'border-warning-amber/30 bg-[#fef3e2]'
          }`}
          role="alert"
        >
          {result.serviceable ? (
            <CheckCircle
              size={18}
              className="mt-0.5 flex-shrink-0 text-success-green"
              aria-hidden="true"
            />
          ) : (
            <AlertTriangle
              size={18}
              className="mt-0.5 flex-shrink-0 text-warning-amber"
              aria-hidden="true"
            />
          )}
          <div>
            <p className="text-sm font-medium text-charcoal">{result.message}</p>
            {result.zone && (
              <div className="mt-2 space-y-1 text-xs text-stone-grey">
                {result.zone.estimated_delivery_text && (
                  <p>Estimated delivery: {result.zone.estimated_delivery_text}</p>
                )}
                <p>
                  Delivery charge:{' '}
                  {result.zone.base_charge === 0
                    ? 'Free'
                    : `£${result.zone.base_charge.toFixed(2)}`}
                  {result.zone.free_delivery_threshold &&
                    ` (free on orders over £${result.zone.free_delivery_threshold.toFixed(2)})`}
                </p>
                {result.zone.min_order_amount && (
                  <p>Minimum order: £{result.zone.min_order_amount.toFixed(2)}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-stone-grey">
        Availability is always confirmed on each order request. Contact us if you are unsure.
      </p>
    </div>
  )
}

// ─── Main delivery page ───────────────────────────────────────────────────────

export default function DeliveryPage() {
  useSeo({
    title: 'Delivery Information | Emberwood Firewood & Timber',
    description:
      'Delivery areas, charges, lead times and collection options. Check if we deliver to your postcode.',
    canonicalPath: '/delivery',
  })

  const { data: zones = [], isLoading } = useQuery({
    queryKey: ['delivery-zones-public'],
    queryFn: fetchDeliveryZones,
  })

  return (
    <div className="bg-cream">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="border-b border-border-warm bg-forest-green px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember-orange">
            Getting your order to you
          </p>
          <h1 className="font-heading text-3xl font-bold text-cream sm:text-4xl">
            Delivery Information
          </h1>
          <p className="mt-2 text-lg text-cream/75">
            Service areas, charges, lead times and collection options.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">

        {/* ── Serviceability checker ────────────────────────────────────── */}
        <ServiceabilityChecker />

        {/* ── Important notice ──────────────────────────────────────────── */}
        <div className="flex gap-3 rounded-lg border border-warning-amber/30 bg-[#fef9ec] p-4">
          <AlertTriangle
            size={16}
            className="mt-0.5 flex-shrink-0 text-warning-amber"
            aria-hidden="true"
          />
          <div className="text-sm">
            <p className="font-semibold text-charcoal">Delivery confirmation on every order</p>
            <p className="mt-0.5 text-stone-grey">
              Delivery availability, charges and lead times are confirmed on each order request.
              We do not guarantee delivery to all areas shown. Some rural or remote locations
              may require additional lead time or may not be serviceable — we will contact you
              if this applies to your order.
            </p>
          </div>
        </div>

        {/* ── How it works ──────────────────────────────────────────────── */}
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="mb-4 font-heading text-xl font-bold text-charcoal">
            How delivery works
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <Package size={18} aria-hidden="true" />,
                title: 'Place an order request',
                body: 'Add items to your cart and submit an order request. We do not take payment at this stage.',
              },
              {
                icon: <PhoneCall size={18} aria-hidden="true" />,
                title: 'We confirm your delivery',
                body: 'We review availability, confirm the delivery charge and lead time, and contact you with final details.',
              },
              {
                icon: <CheckCircle size={18} aria-hidden="true" />,
                title: 'You confirm and pay',
                body: 'Once you are happy with the confirmed details, you accept the order and we arrange payment.',
              },
              {
                icon: <Truck size={18} aria-hidden="true" />,
                title: 'We deliver to your door',
                body: 'Your firewood is delivered on the agreed date. Large orders may require suitable access for delivery vehicles.',
              },
            ].map((step) => (
              <div
                key={step.title}
                className="flex gap-3 rounded-lg border border-border-warm bg-white p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pale-sage text-forest-green">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">{step.title}</h3>
                  <p className="mt-1 text-xs text-stone-grey">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Service areas ─────────────────────────────────────────────── */}
        <section aria-labelledby="areas-heading">
          <h2 id="areas-heading" className="mb-4 font-heading text-xl font-bold text-charcoal">
            Current service areas
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-border-warm" />
              ))}
            </div>
          ) : zones.length === 0 ? (
            <p className="text-sm text-stone-grey">
              Delivery zone information is currently being updated. Please contact us for
              availability in your area.
            </p>
          ) : (
            <div className="space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="overflow-hidden rounded-lg border border-border-warm bg-white"
                >
                  <div className="flex items-center gap-2 border-b border-border-warm bg-pale-sage px-4 py-3">
                    <MapPin size={14} className="text-stone-grey" aria-hidden="true" />
                    <span className="font-heading text-sm font-semibold text-charcoal">
                      {zone.name}
                    </span>
                    {zone.region_name && (
                      <span className="ml-1 text-xs text-stone-grey">{zone.region_name}</span>
                    )}
                  </div>
                  <div className="grid gap-3 px-4 py-3 text-sm sm:grid-cols-3">
                    <div className="flex items-start gap-2">
                      <Truck size={13} className="mt-0.5 flex-shrink-0 text-ember-orange" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-medium text-charcoal">Delivery charge</p>
                        <p className="text-xs text-stone-grey">
                          {zone.base_charge === 0
                            ? 'Free'
                            : `£${zone.base_charge.toFixed(2)}`}
                          {zone.free_delivery_threshold &&
                            ` (free over £${zone.free_delivery_threshold.toFixed(2)})`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock size={13} className="mt-0.5 flex-shrink-0 text-ember-orange" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-medium text-charcoal">Lead time</p>
                        <p className="text-xs text-stone-grey">
                          {zone.estimated_delivery_text ?? `${zone.lead_time_days} working days`}
                        </p>
                      </div>
                    </div>
                    {zone.min_order_amount && (
                      <div className="flex items-start gap-2">
                        <Package size={13} className="mt-0.5 flex-shrink-0 text-ember-orange" aria-hidden="true" />
                        <div>
                          <p className="text-xs font-medium text-charcoal">Minimum order</p>
                          <p className="text-xs text-stone-grey">
                            £{zone.min_order_amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {zone.notes && (
                    <p className="border-t border-border-warm px-4 py-2 text-xs text-stone-grey">
                      {zone.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Access requirements ───────────────────────────────────────── */}
        <section
          className="rounded-lg border border-border-warm bg-white p-5"
          aria-labelledby="access-heading"
        >
          <h2 id="access-heading" className="mb-2 font-heading text-base font-semibold text-charcoal">
            Access and unloading
          </h2>
          <p className="text-sm leading-relaxed text-stone-grey">
            Large orders — particularly pallets and bulk bags — are delivered by vehicle and
            may require suitable access. Please ensure there is a clear route for the delivery
            vehicle and that someone is available to receive the delivery. If access is
            restricted, please mention this in your order notes so we can discuss options.
            We cannot guarantee delivery to all addresses and will contact you if we foresee
            any difficulties.
          </p>
        </section>

        {/* ── Collection ────────────────────────────────────────────────── */}
        <section
          className="rounded-lg border border-border-warm bg-white p-5"
          aria-labelledby="collection-heading"
        >
          <h2 id="collection-heading" className="mb-2 font-heading text-base font-semibold text-charcoal">
            Collection
          </h2>
          <p className="text-sm leading-relaxed text-stone-grey">
            Collection may be available depending on your location and the product ordered.
            If you would prefer to collect, please contact us before placing an order and we
            will confirm whether collection is possible, along with the address and available
            times.
          </p>
        </section>

        {/* ── Questions ─────────────────────────────────────────────────── */}
        <div className="rounded-lg border border-ember-orange/20 bg-[#fdf6f0] p-5 text-center">
          <p className="text-sm font-medium text-charcoal">Have a delivery question?</p>
          <p className="mt-1 text-sm text-stone-grey">
            We are happy to discuss delivery options for your area before you order.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 rounded bg-ember-orange px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#a85a30]"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}

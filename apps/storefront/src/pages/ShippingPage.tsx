import { Link } from 'react-router-dom'
import { Truck, Clock, Globe, Package, AlertTriangle } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'

export default function ShippingPage() {
  useSeo({
    title: 'Shipping',
    description: 'Emberwood shipping methods, regions, lead times, and cold-chain handling information.',
    canonicalPath: '/shipping',
  })

  return (
    <div>
      {/* -- Header -- */}
      <section className="border-b border-border-warm bg-forest-green">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ember-orange">Shipping</p>
          <h1 className="font-heading text-4xl font-bold text-white">Shipping information</h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">
            Everything you need to know about how we pack, handle, and deliver your order.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        {/* -- At a glance -- */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: <Clock size={20} />, label: 'Processing', value: '1–2 business days' },
            { icon: <Truck size={20} />, label: 'Standard delivery', value: '3–7 business days' },
            { icon: <Globe size={20} />, label: 'Regions served', value: '30+ countries' },
            { icon: <Package size={20} />, label: 'Cold-chain', value: 'Available on request' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border-warm bg-cream p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center text-ember-orange">{item.icon}</div>
              <p className="text-xs text-stone-grey">{item.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-charcoal">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-10 text-sm leading-relaxed text-stone-grey">

          <section aria-labelledby="processing-heading">
            <h2 id="processing-heading" className="mb-3 font-heading text-xl font-bold text-charcoal">
              Order processing
            </h2>
            <p>
              All orders are reviewed for compliance before dispatch. Standard processing time is
              <strong className="font-medium text-charcoal"> 1–2 business days</strong> from order
              confirmation. Orders placed after 14:00 GMT on Friday will be processed the following Monday.
            </p>
            <p className="mt-3">
              You will receive an email confirmation when your order has been dispatched, including
              a tracking reference where available.
            </p>
          </section>

          <section aria-labelledby="methods-heading">
            <h2 id="methods-heading" className="mb-3 font-heading text-xl font-bold text-charcoal">
              Shipping methods
            </h2>
            <div className="overflow-hidden rounded-lg border border-border-warm">
              <table className="w-full text-left text-sm" role="table">
                <thead className="bg-cream">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-charcoal">Method</th>
                    <th className="px-4 py-3 font-semibold text-charcoal">Estimated transit</th>
                    <th className="px-4 py-3 font-semibold text-charcoal">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-warm bg-white">
                  {[
                    { method: 'Standard international', transit: '3–7 business days', tracking: 'Yes' },
                    { method: 'Express international', transit: '1–3 business days', tracking: 'Yes' },
                    { method: 'Cold-chain (dry ice / gel pack)', transit: '1–3 business days', tracking: 'Yes' },
                  ].map((row) => (
                    <tr key={row.method}>
                      <td className="px-4 py-3 text-charcoal">{row.method}</td>
                      <td className="px-4 py-3">{row.transit}</td>
                      <td className="px-4 py-3">{row.tracking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Shipping method and cost are confirmed at the order review stage. Express and
              cold-chain shipping attract an additional fee which will be communicated before
              your order is finalised.
            </p>
          </section>

          <section aria-labelledby="regions-heading">
            <h2 id="regions-heading" className="mb-3 font-heading text-xl font-bold text-charcoal">
              Regions and restrictions
            </h2>
            <p>
              We ship to over 30 countries across Europe, North America, Asia-Pacific, and select
              other markets. Availability varies by product — some firewoods are only eligible for
              shipment to specific regions based on local regulations.
            </p>
            <p className="mt-3">
              Your catalogue view is filtered by your destination market. Products marked as
              unavailable in your region cannot be ordered for delivery to that address.
            </p>
          </section>

          <section aria-labelledby="coldchain-heading">
            <h2 id="coldchain-heading" className="mb-3 font-heading text-xl font-bold text-charcoal">
              Cold-chain handling
            </h2>
            <p>
              firewoods that require refrigerated or frozen storage during transit are dispatched
              with appropriate cold-chain packaging. This is noted on each product page.
              Cold-chain shipments are dispatched Monday to Wednesday only to avoid weekend delays
              in transit.
            </p>
          </section>

          <section aria-labelledby="customs-heading">
            <h2 id="customs-heading" className="mb-3 font-heading text-xl font-bold text-charcoal">
              Customs and import duties
            </h2>
            <p>
              International shipments may be subject to customs inspection, import duties, and
              local taxes. These charges are the responsibility of the recipient and are not
              included in the shipping fee. We provide accurate commercial invoices and
              documentation to support customs clearance.
            </p>
          </section>

          <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-amber-600" aria-hidden="true" />
            <p className="text-sm text-amber-800">
              Emberwood products are for <strong></strong>. All shipments are
              labelled accordingly. It is the recipient's responsibility to ensure compliance
              with local import regulations for research compounds.
            </p>
          </div>

          <p>
            Questions about a specific shipment?{' '}
            <Link to="/contact" className="font-medium text-ember-orange hover:underline">
              Contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

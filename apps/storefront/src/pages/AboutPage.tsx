import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Flame, Truck, Heart, TreePine, ShieldCheck } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'

export default function AboutPage() {
  useSeo({
    title: 'About Emberwood — Our Story | Firewood & Timber',
    description:
      'Emberwood is a premium firewood and timber retailer. We supply hardwood logs, kindling and timber products sourced responsibly and delivered with care across the UK.',
    canonicalPath: '/about',
  })

  return (
    <div className="bg-cream">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[480px] bg-forest-green bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/firewood-stack.jpg')" }}
      >
        <div className="absolute inset-0 bg-forest-green/75" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember-orange">
            Our Story
          </p>
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-cream sm:text-5xl">
            A Dependable Source for Quality Firewood and Timber
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
            Emberwood was built around one principle: customers deserve to know exactly what
            they are buying, whether it will be delivered, and what it will cost — before
            they order.
          </p>
        </div>
      </section>

      {/* ── Our approach ──────────────────────────────────────────────────── */}
      <section className="border-b border-border-warm bg-white py-16" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ember-orange">
                What we stand for
              </p>
              <h2 id="approach-heading" className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                Transparent specifications.<br />Straightforward ordering.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-grey">
                The firewood market has a transparency problem. Vague volume descriptions,
                unverified moisture claims, and surprise delivery charges are too common.
                We do things differently.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone-grey">
                Every product listing tells you exactly what you are getting — the species,
                condition, log length, pack format and quantity — in plain language. Delivery
                charges and availability are confirmed before your order is finalised.
                No hidden costs, no false promises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Products in catalogue',    value: '15+' },
                { label: 'Wood species stocked',     value: '6+' },
                { label: 'Orders personally handled', value: '100%' },
                { label: 'Hidden charges',            value: 'None' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border-warm bg-pale-sage p-6 text-center"
                >
                  <p className="font-heading text-3xl font-bold text-ember-orange">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-stone-grey">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="border-b border-border-warm bg-cream py-16" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ember-orange">
              Our values
            </p>
            <h2 id="values-heading" className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              What guides everything we do
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Leaf size={22} aria-hidden="true" />,
                title: 'Responsible sourcing',
                body: 'We source firewood and timber responsibly. We make only claims we can support — we do not fabricate sustainability or certification credentials.',
              },
              {
                icon: <ShieldCheck size={22} aria-hidden="true" />,
                title: 'Honest product descriptions',
                body: 'Moisture content, species, condition and dimensions are only stated when accurately known. We would rather say "unknown" than invent a number.',
              },
              {
                icon: <Flame size={22} aria-hidden="true" />,
                title: 'Quality you can feel',
                body: 'Every batch is selected for quality. We only supply wood we would be happy to burn ourselves — properly seasoned or kiln-dried where stated.',
              },
              {
                icon: <Truck size={22} aria-hidden="true" />,
                title: 'Delivery you can rely on',
                body: 'We manage delivery ourselves. Availability, charges and lead times are confirmed individually — we never promise delivery we cannot fulfil.',
              },
              {
                icon: <Heart size={22} aria-hidden="true" />,
                title: 'Personal service',
                body: 'You are dealing with a small, owner-managed business. We answer our own enquiries, handle our own orders, and take responsibility for every delivery.',
              },
              {
                icon: <TreePine size={22} aria-hidden="true" />,
                title: 'Built for the long term',
                body: 'We are building a business we are proud of. That means no shortcuts, no misleading claims, and no cutting corners on quality or communication.',
              },
            ].map((value) => (
              <div key={value.title} className="rounded-xl border border-border-warm bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-pale-sage text-forest-green">
                  {value.icon}
                </div>
                <h3 className="mb-2 font-heading text-base font-semibold text-charcoal">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-grey">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────────────── */}
      <section className="border-b border-border-warm bg-white py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-ember-orange">
              How it works
            </p>
            <h2 id="how-heading" className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              From order to your door
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Browse and choose',
                body: 'Browse our catalogue by wood type, condition, pack format and price. Every listing tells you exactly what you are buying.',
              },
              {
                step: '02',
                title: 'Check delivery',
                body: 'Use our postcode checker to confirm we can deliver to your address. Delivery charges and lead times are shown where available.',
              },
              {
                step: '03',
                title: 'Submit your order request',
                body: 'Add items to your cart and submit an order request. We review availability and confirm delivery details before anything is charged.',
              },
              {
                step: '04',
                title: 'Confirmed and delivered',
                body: 'Once you confirm the final details, we arrange delivery. You will receive updates and a reference number to track your order.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="mb-3 font-heading text-4xl font-bold text-ember-orange/30">
                  {item.step}
                </span>
                <h3 className="mb-2 font-heading text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-grey">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Important notice ──────────────────────────────────────────────── */}
      <section className="border-b border-border-warm bg-pale-sage py-10">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-stone-grey">
            <strong className="font-semibold text-charcoal">Owner note:</strong> Emberwood
            is an independent firewood and timber retailer. The exact products stocked,
            delivery areas served, prices and availability are set and managed by the owner.
            Delivery availability is always confirmed individually — we do not guarantee
            delivery to every location shown on the site until confirmed on your specific order.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-forest-green py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-cream sm:text-4xl">
            Ready to order?
          </h2>
          <p className="mt-3 text-base text-cream/70">
            Browse our full range of firewood, logs and timber products.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded bg-ember-orange px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-[#a85a30]"
            >
              Shop firewood
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded border-2 border-cream/30 px-7 py-3.5 text-base font-semibold text-cream no-underline transition-colors hover:border-cream hover:bg-white/10"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

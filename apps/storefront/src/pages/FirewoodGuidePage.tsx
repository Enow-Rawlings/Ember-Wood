import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Leaf, Ruler, Package, Thermometer, Clock } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'

const sections = [
  {
    id: 'hardwood-vs-softwood',
    icon: <Leaf size={20} aria-hidden="true" />,
    heading: 'Hardwood vs Softwood',
    content: `Hardwood comes from broadleaf trees such as oak, ash, beech, and birch. It is denser than softwood, burns more slowly, produces more heat per log, and creates a longer-lasting fire bed. Hardwood is generally the better choice for wood-burning stoves, open fireplaces, and situations where sustained warmth is important.

Softwood comes from coniferous trees such as pine, spruce, and larch. It lights more easily, burns faster, and is often less expensive. Softwood can be useful for kindling or for quickly raising the temperature of a stove before loading hardwood. Some softwoods produce more resin when burned, which can build up in chimneys over time — use seasoned or kiln-dried softwood and maintain your flue regularly.

Neither type is universally better. The right choice depends on your appliance, your goals, and what is available to you.`,
  },
  {
    id: 'seasoned-vs-kiln-dried',
    icon: <Thermometer size={20} aria-hidden="true" />,
    heading: 'Seasoned and Kiln-Dried Logs',
    content: `Freshly felled timber contains a high proportion of water. Burning wet wood is inefficient: much of the energy produced is used to drive off moisture rather than heat your room. Wet wood also produces more smoke and contributes to chimney deposits.

Seasoning is the process of allowing cut wood to dry naturally over time — typically 12 to 24 months or more, depending on the species and storage conditions. Properly seasoned firewood has a moisture content generally below 20%.

Kiln drying uses controlled heat to reduce moisture content more quickly. Kiln-dried logs typically have moisture content below 20% and are ready to burn soon after purchase. We only describe logs as kiln-dried where this has been confirmed for the specific batch.

The Woodsure Ready to Burn scheme certifies that logs have a moisture content below 20%. We will indicate certification status where applicable and verified.`,
  },
  {
    id: 'how-much-firewood',
    icon: <Package size={20} aria-hidden="true" />,
    heading: 'How Much Firewood Do I Need?',
    content: `This depends on how frequently you use your fire, the size of your appliance, how well-insulated your home is, and the type of wood you burn.

A typical household using a wood-burning stove for occasional weekend fires through autumn and winter might use 1 to 3 bulk bags per season. Regular or daily use in a primary heating stove could require significantly more.

Our product listings describe quantities clearly — whether that is a net bag, bulk bag, crate, or pallet — and explain what each unit contains. If you are unsure how much to order, start with a smaller quantity and reorder as needed. Firewood stores well if kept dry and well-ventilated.

If you are planning to stock up for the season, ordering in larger quantities (bulk bags or pallets) is generally more economical per unit of wood.`,
  },
  {
    id: 'log-sizes',
    icon: <Ruler size={20} aria-hidden="true" />,
    heading: 'Log Lengths and Sizes',
    content: `Log length is an important practical consideration. You need logs that fit comfortably in your appliance's firebox with room for air to circulate.

Common log lengths are 25cm (suitable for smaller stoves), 30cm (a common standard), and 33cm or 40cm (for larger fireplaces and stoves with bigger fireboxes). Check the manufacturer's guidance for your appliance.

Diameter varies naturally across a log batch. Larger diameter logs burn more slowly and produce sustained heat. Smaller logs and splits light more easily and are useful for getting a fire established. Kindling — very small splits or thin pieces — is used to start a fire before loading with larger logs.

All log length information in our listings refers to approximate measurements. Natural variation in a batch is normal.`,
  },
  {
    id: 'storing-firewood',
    icon: <Clock size={20} aria-hidden="true" />,
    heading: 'Storing Firewood',
    content: `Proper storage preserves the condition of your firewood and prevents moisture re-absorption.

Store firewood off the ground — on a pallet, log store feet, or similar support — to allow air circulation and prevent ground moisture from being absorbed. Cover the top of the stack to protect from rain, but leave the sides open to allow airflow. A dedicated log store or open-sided shed is ideal.

Avoid storing large quantities directly against a house wall or in fully enclosed spaces where air cannot circulate. Damp conditions can encourage mould and reintroduce moisture into dried logs.

Freshly sourced unseasoned wood should be stored for at least 12 to 24 months before burning. Kiln-dried wood can be used sooner but should still be kept dry in storage.`,
  },
  {
    id: 'choosing-for-your-appliance',
    icon: <Flame size={20} aria-hidden="true" />,
    heading: 'Choosing Wood for Your Appliance',
    content: `Different appliances have different requirements.

Wood-burning stoves are designed to burn wood efficiently at high temperatures. Use dry, well-seasoned or kiln-dried hardwood for best results. Follow the manufacturer's guidance on log size and loading.

Open fireplaces are less efficient but create a traditional atmosphere. Hardwood logs work well. Softwood can be used but burns faster. Avoid burning very resinous softwood regularly in open fires.

Fire pits and outdoor chimineas are generally more tolerant of fuel variation. Both hardwood and softwood can work, though drier wood produces less smoke.

Always burn wood that is appropriate for your specific appliance and follow all manufacturer and safety guidelines.`,
  },
]

export default function FirewoodGuidePage() {
  useSeo({
    title: 'Firewood Guide: Types, Sizes & Storage | Emberwood',
    description:
      'Everything you need to know about choosing firewood. Hardwood vs softwood, seasoned vs kiln-dried, log sizes, and how to store your logs correctly.',
    canonicalPath: '/firewood-guide',
  })

  return (
    <div className="bg-cream">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-border-warm bg-forest-green px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-ember-orange">
            Know your wood
          </p>
          <h1 className="font-heading text-3xl font-bold text-cream sm:text-4xl">
            The Emberwood Firewood Guide
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-cream/75">
            Choosing the right firewood makes a real difference. Everything you need to know
            — from wood types and drying to storage and how much to order.
          </p>
        </div>
      </div>

      {/* ── Jump links ────────────────────────────────────────────────────── */}
      <nav
        aria-label="Guide sections"
        className="border-b border-border-warm bg-white px-4 py-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
            Jump to
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-border-warm bg-pale-sage px-3 py-1 text-xs font-medium text-charcoal no-underline transition-colors hover:border-ember-orange hover:text-ember-orange"
              >
                {s.heading}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Content sections ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`h-${section.id}`}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pale-sage text-forest-green">
                  {section.icon}
                </div>
                <h2
                  id={`h-${section.id}`}
                  className="font-heading text-xl font-bold text-charcoal sm:text-2xl"
                >
                  {section.heading}
                </h2>
              </div>
              <div className="space-y-4">
                {section.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-stone-grey">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="mt-14 rounded-xl border border-border-warm bg-white p-6 text-center">
          <h2 className="font-heading text-lg font-bold text-charcoal">
            Ready to order?
          </h2>
          <p className="mt-1 text-sm text-stone-grey">
            Browse our full range of firewood, logs and timber.
          </p>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded bg-ember-orange px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#a85a30]"
          >
            Shop all firewood <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

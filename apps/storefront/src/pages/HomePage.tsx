import { Link } from 'react-router-dom'
import {
  ArrowRight, Leaf, Flame, Truck, Shield,
  CheckCircle, Ruler, Package, Star, Clock,
} from 'lucide-react'
import { useProducts, useCategories } from '@/hooks/useProducts'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useLocale } from '@/context/LocaleContext'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryCard } from '@/components/product/CategoryCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={['py-16 sm:py-20', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  )
}

// ─── Eyebrow + heading ────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="mb-10">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold text-charcoal dark:text-dark-text sm:text-4xl">
        {heading}
      </h2>
    </div>
  )
}

// ─── Delivery checker ─────────────────────────────────────────────────────────
function DeliveryChecker() {
  return (
    <div className="rounded-2xl border border-border-warm bg-white p-6 shadow-card dark:border-dark-border dark:bg-dark-surface">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-orange/10">
          <Truck size={15} className="text-ember-orange" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-base font-semibold text-charcoal dark:text-dark-text">
          Check delivery to your area
        </h3>
      </div>
      <p className="mb-4 text-sm text-stone-grey dark:text-dark-muted">
        Enter your postcode to check if we deliver to you.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-2" aria-label="Delivery checker">
        <input
          type="text"
          placeholder="e.g. SW1A 1AA"
          aria-label="Your postcode"
          maxLength={10}
          className="min-w-0 flex-1 rounded-lg border border-border-warm bg-white px-3 py-2.5 text-sm text-charcoal placeholder-stone-grey focus:border-ember-orange focus:outline-none focus:ring-2 focus:ring-ember-orange/20 dark:border-dark-border dark:bg-dark-surface-2 dark:text-dark-text dark:placeholder-dark-muted"
        />
        <button type="submit" className="btn-glow flex-shrink-0 rounded-lg bg-ember-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#a85a30]">
          Check
        </button>
      </form>
      <p className="mt-2.5 text-xs text-stone-grey dark:text-dark-muted">
        Availability confirmed on each order.{' '}
        <Link to="/delivery" className="text-ember-orange hover:underline">Full delivery info</Link>
      </p>
    </div>
  )
}

// ─── Mock category card ───────────────────────────────────────────────────────
const MOCK_CATS = [
  { label: 'Firewood Logs',     slug: 'firewood-logs',  img: '/firewood-logs-1.jpg', from: '£5.99'  },
  { label: 'Kindling',          slug: 'kindling',        img: '/kindling-wood.jpg',  from: '£5.99'  },
  { label: 'Logs & Briquettes', slug: 'logs-briquettes', img: '/firewood-stack.jpg', from: '£19.99' },
  { label: 'Timber & Wood',     slug: 'timber',          img: '/timber-pile.jpg',    from: '£24.99' },
]

// ─── Mock product card ────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  { name: 'Seasoned Hardwood Logs', price: '£189.00', was: '£219.00', img: '/firewood-logs-1.jpg', tag: 'Seasoned',   fmt: 'Bulk bag' },
  { name: 'Kiln Dried Oak Logs',    price: '£176.00', was: null,      img: '/firewood-stack.jpg',  tag: 'Kiln-dried', fmt: 'Crate'    },
  { name: 'Kindling Wood Bundle',   price: '£5.99',   was: null,      img: '/kindling-wood.jpg',   tag: 'Air-dried',  fmt: 'Net bag'  },
  { name: 'Oak Timber Planks',      price: '£24.99',  was: null,      img: '/timber-pile.jpg',     tag: null,         fmt: 'Bundle'   },
]

function MockProductCard({ p }: { p: typeof MOCK_PRODUCTS[0] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border-warm bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border-dark-border dark:bg-dark-surface">
      <div className="relative aspect-square overflow-hidden bg-pale-sage dark:bg-dark-surface-2">
        <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        {p.was && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-ember-orange px-2.5 py-0.5 text-[10px] font-bold text-white">SALE</span>
        )}
        {p.tag && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-forest-green/90 px-2.5 py-0.5 text-[10px] font-semibold text-cream">{p.tag}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-sm font-semibold text-charcoal dark:text-dark-text sm:text-base">{p.name}</h3>
        <span className="inline-flex w-fit items-center gap-1 rounded-full border border-border-warm bg-cream px-2 py-0.5 text-[11px] font-medium text-charcoal dark:border-dark-border dark:bg-dark-surface-2 dark:text-dark-text">
          <Package size={10} aria-hidden="true" />{p.fmt}
        </span>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="font-heading text-lg font-bold text-charcoal dark:text-dark-text">{p.price}</span>
            {p.was && <span className="ml-1.5 text-xs text-stone-grey line-through dark:text-dark-muted">{p.was}</span>}
          </div>
          <button type="button" className="rounded-lg bg-forest-green px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-ember-orange">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: featuredData, isLoading: productsLoading } = useProducts({ page: 1, pageSize: 4, sort: 'newest' })
  const { data: categories = [], isLoading: categoriesLoading } = useCategories()
  const { t } = useLocale()
  useScrollReveal({ deps: [productsLoading, categoriesLoading] })

  const featuredProducts = featuredData?.data ?? []
  // Use translations as primary — DB content blocks are optional English-only overrides
  const heroHeading = t('home.heroHeading')
  const heroSubtext  = t('home.heroSubtext')

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[620px] items-center overflow-hidden bg-forest-green bg-cover bg-center lg:min-h-[700px]"
        style={{ backgroundImage: "url('/firewood-hero.jpg')" }}
        aria-label="Emberwood hero"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-forest-green/90 via-forest-green/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-green/50 to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember-orange/40 bg-ember-orange/15 px-4 py-1.5 animate-fade-in">
              <Flame size={13} className="text-ember-orange" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ember-orange">
                Premium Firewood &amp; Timber
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.05] text-cream animate-hero-text sm:text-5xl lg:text-6xl">
              {heroHeading.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {i === 1 ? <span className="text-ember-orange">{line}</span> : line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-cream/80 animate-fade-up-delay-1">
              {heroSubtext}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up-delay-2">
              <Link to="/shop" className="btn-glow inline-flex items-center gap-2 rounded-xl bg-ember-orange px-7 py-3.5 text-base font-semibold text-white no-underline shadow-lg transition-all hover:bg-[#a85a30] hover:-translate-y-0.5">
                Shop Firewood <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/firewood-guide" className="inline-flex items-center gap-2 rounded-xl border-2 border-cream/30 px-7 py-3.5 text-base font-semibold text-cream no-underline transition-all hover:border-cream hover:bg-white/10">
                Firewood Guide
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up-delay-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-ember-orange text-ember-orange" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm text-cream/70">Trusted by homeowners across the UK</span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute right-12 top-1/2 hidden -translate-y-1/2 animate-float lg:block">
          <div className="h-48 w-48 rounded-full bg-ember-orange/10 blur-3xl" />
        </div>
      </section>

      {/* ── TRUST PILLARS ───────────────────────────────────────────────────── */}
      <div className="border-b border-border-warm bg-white dark:border-dark-border dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { icon: <Leaf size={18} aria-hidden="true" />,   title: 'Sustainably Sourced',   body: 'Responsibly sourced timber'  },
              { icon: <Flame size={18} aria-hidden="true" />,  title: 'Kiln Dried & Seasoned', body: 'Ready-to-burn logs'           },
              { icon: <Truck size={18} aria-hidden="true" />,  title: 'Direct Delivery',        body: 'From us to your door'         },
              { icon: <Shield size={18} aria-hidden="true" />, title: 'UK Wide Coverage',       body: 'Homes & businesses'           },
            ].map((p) => (
              <div key={p.title} className="flex flex-col items-center gap-2 border-r border-border-warm px-4 py-7 text-center last:border-r-0 dark:border-dark-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember-orange/10 text-ember-orange">
                  {p.icon}
                </div>
                <p className="text-sm font-semibold text-charcoal dark:text-dark-text">{p.title}</p>
                <p className="text-xs text-stone-grey dark:text-dark-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────────────────────── */}
      <Section className="bg-cream dark:bg-dark-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Our Range" heading="Shop by Category" />
            <Link to="/shop" className="mb-10 flex items-center gap-1 text-sm font-medium text-ember-orange no-underline hover:underline">
              View All <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* ★ No reveal classes here — always visible regardless of load state ★ */}
          {categoriesLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-52 animate-pulse rounded-2xl bg-border-warm dark:bg-dark-surface-3" />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" role="list">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <CategoryCard category={cat} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4" role="list">
              {MOCK_CATS.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="group relative block overflow-hidden rounded-2xl no-underline">
                    <div className="aspect-[3/4] bg-pale-sage">
                      <img src={cat.img} alt={cat.label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-green/85 via-forest-green/20 to-transparent" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-heading text-sm font-bold text-cream sm:text-base">{cat.label}</p>
                      <p className="mt-0.5 text-xs text-cream/65">From {cat.from}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* ── TRUSTED SUPPLIER ────────────────────────────────────────────────── */}
      <Section className="overflow-hidden bg-white dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="reveal-left order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl">
                <img src="/firewood-stack.jpg" alt="Stacked firewood logs" className="h-[400px] w-full object-cover" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur-sm dark:bg-dark-surface/90">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember-orange">
                    <Star size={16} className="fill-white text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal dark:text-dark-text">Rated 4.9 / 5</p>
                    <p className="text-[11px] text-stone-grey dark:text-dark-muted">By UK customers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-right order-1 lg:order-2">
              <p className="eyebrow mb-3">Who we are</p>
              <h2 className="font-heading text-3xl font-bold text-charcoal dark:text-dark-text sm:text-4xl">
                Your Trusted Supplier of Firewood and Timber
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone-grey dark:text-dark-muted">
                Premium quality products, sourced responsibly and delivered with care.
                Every order is handled personally — no third-party warehouses, no hidden surprises.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Transparent product specifications — no vague volume claims',
                  'Delivery charges confirmed before you pay a penny',
                  'Personal service from an owner-managed business',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-stone-grey dark:text-dark-muted">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-ember-orange" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-forest-green px-6 py-3 text-sm font-semibold text-cream no-underline transition-all hover:bg-ember-orange hover:-translate-y-0.5 hover:shadow-card">
                Our Story <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────────────────── */}
      <Section className="bg-cream dark:bg-dark-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Popular Picks" heading="Featured Products" />
            <Link to="/shop" className="mb-10 flex items-center gap-1 text-sm font-medium text-ember-orange no-underline hover:underline">
              View All <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* ★ No reveal classes here — always visible regardless of load state ★ */}
          {productsLoading ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} aria-hidden="true"><ProductCardSkeleton /></li>
              ))}
            </ul>
          ) : featuredProducts.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
              {featuredProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4" role="list">
              {MOCK_PRODUCTS.map((p) => (
                <li key={p.name}><MockProductCard p={p} /></li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* ── GUIDE + DELIVERY CHECKER ────────────────────────────────────────── */}
      <Section className="bg-white dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="reveal-left">
              <p className="eyebrow mb-2">Learn before you buy</p>
              <h2 className="font-heading text-3xl font-bold text-charcoal dark:text-dark-text sm:text-4xl">
                The Emberwood<br />Firewood Guide
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-grey dark:text-dark-muted">
                Choosing the right firewood makes a real difference. Our guide covers
                hardwood vs softwood, moisture, storage and stove sizing.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: <Leaf size={15} aria-hidden="true" />,  title: 'Hardwood vs Softwood', sub: 'Which burns better?'        },
                  { icon: <Flame size={15} aria-hidden="true" />, title: 'Kiln vs Seasoned',      sub: "What's the difference?"     },
                  { icon: <Ruler size={15} aria-hidden="true" />, title: 'Log Sizes',              sub: 'Choosing the right length'  },
                  { icon: <Clock size={15} aria-hidden="true" />, title: 'Storage Tips',           sub: 'Keep your wood dry'         },
                ].map((card) => (
                  <div key={card.title} className="flex items-start gap-2.5 rounded-xl border border-border-warm bg-cream p-3 dark:border-dark-border dark:bg-dark-surface-2">
                    <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-ember-orange/10 text-ember-orange">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal dark:text-dark-text">{card.title}</p>
                      <p className="text-[11px] text-stone-grey dark:text-dark-muted">{card.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/firewood-guide" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-forest-green px-6 py-3 text-sm font-semibold text-cream no-underline transition-all hover:bg-ember-orange hover:-translate-y-0.5">
                Read the full guide <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div className="reveal-right space-y-4">
              <DeliveryChecker />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '15+',  label: 'Products'      },
                  { value: '3-5d', label: 'Lead time'     },
                  { value: '£100', label: 'Free delivery' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border-warm bg-cream p-3 text-center dark:border-dark-border dark:bg-dark-surface">
                    <p className="font-heading text-xl font-bold text-ember-orange">{s.value}</p>
                    <p className="text-[11px] text-stone-grey dark:text-dark-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-green py-16 dark:bg-[#0F1512]" aria-labelledby="newsletter-heading">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <img src="/firewood-logs-1.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-green/90 to-forest-green" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="section-divider" aria-hidden="true" />
          <h2 id="newsletter-heading" className="reveal font-heading text-3xl font-bold text-cream sm:text-4xl">
            Quality Firewood &amp; Timber<br />For Every Season
          </h2>
          <p className="reveal reveal-delay-1 mt-3 text-base text-cream/65">
            Seasonal tips, product guides and early access to offers. No spam — unsubscribe any time.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="reveal reveal-delay-2 mx-auto mt-8 flex w-full max-w-md gap-2" aria-label="Newsletter signup">
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream placeholder-cream/35 backdrop-blur-sm focus:border-ember-orange focus:outline-none focus:ring-2 focus:ring-ember-orange/30"
            />
            <button type="submit" className="btn-glow flex-shrink-0 rounded-xl bg-ember-orange px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#a85a30]">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

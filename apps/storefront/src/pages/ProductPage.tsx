import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, AlertTriangle, Truck, RotateCcw, Check } from 'lucide-react'
import { useProduct } from '@/hooks/useProducts'
import { useSeo } from '@/hooks/useSeo'
import { useProductStructuredData } from '@/hooks/useProductStructuredData'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductCarousel } from '@/components/product/ProductCarousel'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductDetailSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { isInStock, isLowStock } from '@/services/products'
import { useCartStore } from '@/store/cartStore'
import { useLocale } from '@/context/LocaleContext'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading, isError, refetch } = useProduct(slug ?? '')
  const { formatPrice } = useLocale()

  // SEO � use API-provided seo_records if available, fall back to product data
  const seoRecord = product?.seo_records?.[0]
  const primaryImage = product?.product_media?.[0]?.cloudinary_url
  useSeo({
    title: seoRecord?.seo_title ?? product?.name,
    description: seoRecord?.meta_description ?? product?.short_description ?? undefined,
    canonicalPath: seoRecord?.canonical_url ? undefined : `/product/${product?.slug}`,
    noIndex: seoRecord?.robots_directive?.includes('noindex') ?? false,
    image: primaryImage,
  })
  const addItem = useCartStore((s) => s.addItem)
  const cartItems = useCartStore((s) => s.items)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!product) return
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      currency: product.currency,
      short_description: product.short_description,
      stock_quantity: product.stock_quantity,
      min_order_quantity: product.min_order_quantity ?? 1,
      product_media: product.product_media ?? [],
      categories: product.categories ?? [],
      pack_format: product.pack_format ?? null,
      log_length_cm: product.log_length_cm ?? null,
      wood_condition: product.wood_condition ?? null,
      sale_price: product.sale_price ?? null,
      wood_type: product.wood_type ?? null,
    }, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Structured data
  useProductStructuredData(product)

  const alreadyInCart = cartItems.some((i) => i.productId === product?.id)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ErrorState
          title="Product not available"
          message="This product may not be available in your region, or the link may be incorrect."
          onRetry={refetch}
        />
      </div>
    )
  }

  const category = product.categories?.[0]?.category
  const inStock = isInStock(product.stock_quantity)
  const lowStock = isLowStock(product.stock_quantity, 10)
  const hasSale = product.sale_price && product.sale_price < product.price
  const minQty = product.min_order_quantity ?? 1

  // Sync quantity to minimum order quantity when product loads
  useEffect(() => {
    if (quantity < minQty) {
      setQuantity(minQty)
    }
  }, [minQty, quantity])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery media={product.product_media ?? []} productName={product.name} />

        {/* Product info */}
        <div className="flex flex-col gap-5">
          {/* Category label */}
          {category && (
            <Link
              to={`/category/${category.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-stone-grey no-underline hover:text-ember-orange"
            >
              {category.name}
            </Link>
          )}

          {/* Name */}
          <h1 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">
            {product.name}
          </h1>

          {/* SKU */}
          <p className="font-mono text-sm text-stone-grey">SKU: {product.sku}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            {hasSale ? (
              <>
                <p className="font-heading text-3xl font-bold text-ember-orange">
                  {formatPrice(product.sale_price!, product.currency)}
                </p>
                <p className="text-lg text-stone-grey line-through">
                  {formatPrice(product.price, product.currency)}
                </p>
              </>
            ) : (
              <p className="font-heading text-3xl font-bold text-charcoal dark:text-dark-text">
                {formatPrice(product.price, product.currency)}
              </p>
            )}
          </div>

          {/* Min order notice */}
          {minQty > 1 && (
            <div className="flex items-center gap-2 rounded-lg border border-ember-orange/30 bg-[#fdf6f0] px-3 py-2 text-sm dark:bg-ember-orange/10">
              <span className="font-semibold text-ember-orange">Min. order:</span>
              <span className="text-charcoal dark:text-dark-text">{minQty} units</span>
            </div>
          )}

          {/* Stock status */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <>
                <span className="h-2 w-2 rounded-full bg-success-green" aria-hidden="true" />
                <span className="text-sm font-medium text-success-green">In stock</span>
                {lowStock && <Badge variant="warning">Low stock</Badge>}
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-error-red" aria-hidden="true" />
                <span className="text-sm font-medium text-error-red">Out of stock</span>
              </>
            )}
          </div>

          {/* Short description */}
          {product.short_description && (
            <p className="text-base leading-relaxed text-charcoal dark:text-dark-text">{product.short_description}</p>
          )}

          {/* Quantity + Add to cart */}
          {inStock ? (
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center rounded-lg border border-border-warm bg-white dark:border-dark-border dark:bg-dark-surface">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-charcoal transition-colors hover:bg-pale-sage dark:text-dark-text dark:hover:bg-dark-surface-2"
                >−</button>
                <span aria-live="polite" className="w-10 text-center text-sm font-semibold text-charcoal dark:text-dark-text">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-charcoal transition-colors hover:bg-pale-sage dark:text-dark-text dark:hover:bg-dark-surface-2"
                >+</button>
              </div>

              <Button
                variant={added ? 'secondary' : 'primary'}
                size="lg"
                className="flex-1 sm:flex-none sm:min-w-[180px]"
                onClick={handleAddToCart}
              >
                {added ? (
                  <><Check size={18} aria-hidden="true" />Added to cart</>
                ) : (
                  <><ShoppingCart size={18} aria-hidden="true" />{alreadyInCart ? 'Add more' : 'Add to cart'}</>
                )}
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="lg" disabled className="w-full sm:w-auto">
              Out of stock
            </Button>
          )}

          {/* Research use disclaimer � required, non-negotiable */}
          <div className="flex gap-2 rounded-lg border border-warning-amber/30 bg-[#fef9ec] p-3 text-sm">
            <AlertTriangle
              size={16}
              className="mt-0.5 flex-shrink-0 text-warning-amber"
              aria-hidden="true"
            />
            <p className="text-charcoal">
              <strong className="font-medium">.</strong> This product is not
              intended for human or veterinary use. No therapeutic or health claims are made.
            </p>
          </div>

          {/* Shipping & returns links */}
          <div className="flex flex-col gap-2 border-t border-border-warm pt-4 text-sm text-stone-grey">
            <Link to="/shipping" className="flex items-center gap-2 no-underline hover:text-ember-orange">
              <Truck size={14} aria-hidden="true" />
              Shipping information
            </Link>
            <Link to="/returns" className="flex items-center gap-2 no-underline hover:text-ember-orange">
              <RotateCcw size={14} aria-hidden="true" />
              Returns &amp; cancellations
            </Link>
          </div>
        </div>
      </div>

      {/* Long description */}
      {product.long_description && (
        <section className="mt-12 border-t border-border-warm pt-10">
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Product information
          </h2>
          <div className="prose prose-slate mt-4 max-w-3xl text-base leading-relaxed text-charcoal">
            {product.long_description}
          </div>
        </section>
      )}

      {/* Similar products carousel */}
      <ProductCarousel
        currentSlug={product.slug}
        categorySlug={category?.slug}
        heading="You may also like"
      />
    </div>
  )
}

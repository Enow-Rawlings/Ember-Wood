import { Link } from 'react-router-dom'
import { Package, Ruler, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { getPrimaryImage, isInStock, isLowStock } from '@/services/products'
import { useLocale } from '@/context/LocaleContext'
import type { ProductListItem } from '@/services/products'

interface ProductCardProps {
  product: ProductListItem
}

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useLocale()
  const primaryImage = getPrimaryImage(product.product_media)
  const inStock = isInStock(product.stock_quantity)
  const lowStock = isLowStock(product.stock_quantity, 10)
  const hasSale = product.sale_price && product.sale_price < product.price
  const minQty = product.min_order_quantity ?? 1

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border-warm bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-dark-border dark:bg-dark-surface">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-square bg-pale-sage dark:bg-dark-surface-2">
          {primaryImage ? (
            <img
              src={primaryImage.cloudinary_url}
              alt={primaryImage.alt_text || product.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-border-warm">
              <Package size={40} aria-hidden="true" />
            </div>
          )}
          {hasSale && (
            <span className="absolute left-2 top-2 rounded-full bg-ember-orange px-2 py-0.5 text-[10px] font-bold text-white">
              SALE
            </span>
          )}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-dark-surface/75">
              <span className="rounded-full bg-charcoal/80 px-3 py-1 text-xs font-semibold text-white">Out of stock</span>
            </div>
          )}
          {product.wood_condition && (
            <span className="absolute right-2 top-2 rounded-full bg-forest-green/85 px-2 py-0.5 text-[10px] font-semibold text-cream">
              {product.wood_condition}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        {/* Category */}
        {product.categories?.[0]?.category && (
          <span className="text-[11px] font-medium uppercase tracking-wider text-stone-grey dark:text-dark-muted">
            {product.categories[0].category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-heading text-sm font-semibold leading-snug text-charcoal dark:text-dark-text sm:text-base">
          <Link
            to={`/product/${product.slug}`}
            className="no-underline hover:text-ember-orange focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember-orange"
          >
            {product.name}
          </Link>
        </h3>

        {/* Pack format + log length tags */}
        <div className="flex flex-wrap gap-1">
          {product.pack_format && (
            <span className="inline-flex items-center gap-0.5 rounded-full border border-border-warm bg-cream px-2 py-0.5 text-[10px] font-medium text-charcoal dark:border-dark-border dark:bg-dark-surface-2 dark:text-dark-text">
              <Package size={9} aria-hidden="true" /> {product.pack_format}
            </span>
          )}
          {product.log_length_cm && (
            <span className="inline-flex items-center gap-0.5 rounded-full border border-border-warm bg-cream px-2 py-0.5 text-[10px] font-medium text-charcoal dark:border-dark-border dark:bg-dark-surface-2 dark:text-dark-text">
              <Ruler size={9} aria-hidden="true" /> {product.log_length_cm}cm
            </span>
          )}
        </div>

        {/* Min order notice */}
        {minQty > 1 && (
          <p className="flex items-center gap-1 text-[11px] text-ember-orange">
            <ShoppingBag size={10} aria-hidden="true" />
            Min. order: {minQty}
          </p>
        )}

        {/* Price row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <div className="flex items-baseline gap-1.5">
            {hasSale ? (
              <>
                <span className="font-heading text-base font-bold text-ember-orange">
                  {formatPrice(product.sale_price!, product.currency)}
                </span>
                <span className="text-xs text-stone-grey line-through dark:text-dark-muted">
                  {formatPrice(product.price, product.currency)}
                </span>
              </>
            ) : (
              <span className="font-heading text-base font-bold text-charcoal dark:text-dark-text">
                {formatPrice(product.price, product.currency)}
              </span>
            )}
          </div>
          {lowStock && inStock && <Badge variant="warning">Low stock</Badge>}
        </div>
      </div>
    </article>
  )
}

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from '@/components/product/ProductCard'
import { FilterSidebar } from '@/components/product/FilterSidebar'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { useSeo } from '@/hooks/useSeo'
import type { SortOption } from '@/services/products'

const PAGE_SIZE = 24

export default function ShopPage() {
  useSeo({
    title: 'Shop Firewood & Timber | Emberwood',
    description:
      'Browse our full range of firewood, hardwood logs, kindling, timber and accessories. Delivered across the UK.',
    canonicalPath: '/shop',
  })

  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest')
  const [selectedWoodType, setSelectedWoodType] = useState('')
  const [selectedWoodCondition, setSelectedWoodCondition] = useState('')
  const [selectedPackFormat, setSelectedPackFormat] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const { data, isLoading } = useProducts({
    page,
    pageSize: PAGE_SIZE,
    category: selectedCategory || undefined,
    sort: selectedSort,
    wood_type: selectedWoodType as 'hardwood' | 'softwood' | 'mixed' | undefined || undefined,
    wood_condition: selectedWoodCondition || undefined,
    pack_format: selectedPackFormat || undefined,
    in_stock: inStockOnly || undefined,
  })

  const products = data?.data ?? []
  const totalPages = data ? Math.ceil(data.meta.total / PAGE_SIZE) : 0

  const handleClear = () => {
    setSelectedCategory('')
    setSelectedSort('newest')
    setSelectedWoodType('')
    setSelectedWoodCondition('')
    setSelectedPackFormat('')
    setInStockOnly(false)
    setPage(1)
  }

  const handleFilterChange = (fn: () => void) => {
    fn()
    setPage(1)
  }

  return (
    <div className="bg-cream">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="border-b border-border-warm bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            Shop Firewood &amp; Timber
          </h1>
          <p className="mt-1 text-base text-stone-grey">
            {data ? `${data.meta.total} product${data.meta.total !== 1 ? 's' : ''}` : 'Loading…'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* ── Filters ─────────────────────────────────────────────────── */}
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            selectedWoodType={selectedWoodType}
            selectedWoodCondition={selectedWoodCondition}
            selectedPackFormat={selectedPackFormat}
            inStockOnly={inStockOnly}
            onCategoryChange={(v) => handleFilterChange(() => setSelectedCategory(v))}
            onSortChange={(v) => handleFilterChange(() => setSelectedSort(v))}
            onWoodTypeChange={(v) => handleFilterChange(() => setSelectedWoodType(v))}
            onWoodConditionChange={(v) => handleFilterChange(() => setSelectedWoodCondition(v))}
            onPackFormatChange={(v) => handleFilterChange(() => setSelectedPackFormat(v))}
            onInStockChange={(v) => handleFilterChange(() => setInStockOnly(v))}
            onClear={handleClear}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />

          {/* ── Product grid ─────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">
            {/* Mobile filter button */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 rounded border border-border-warm bg-white px-3 py-2 text-sm font-medium text-charcoal hover:bg-pale-sage"
              >
                <SlidersHorizontal size={14} aria-hidden="true" />
                Filter &amp; Sort
              </button>
              {data && (
                <p className="text-sm text-stone-grey">
                  {data.meta.total} product{data.meta.total !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {isLoading ? (
              <ul
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                role="list"
                aria-label="Loading products"
              >
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <li key={i} aria-hidden="true">
                    <ProductCardSkeleton />
                  </li>
                ))}
              </ul>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or browse all categories."
                action={{ label: 'Clear filters', onClick: handleClear }}
              />
            ) : (
              <>
                <ul
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
                  role="list"
                  aria-label="Products"
                >
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>

                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      total={data?.meta.total ?? 0}
                      pageSize={PAGE_SIZE}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

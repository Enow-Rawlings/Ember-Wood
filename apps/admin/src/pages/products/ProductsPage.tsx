import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, Search, Package } from 'lucide-react'
import { fetchAdminProducts } from '@/services/products'
import { Badge, productStatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TableSkeleton } from '@/components/ui/Skeleton'

// Emberwood simplified status options (no compliance gate)
const STATUS_OPTIONS = ['', 'draft', 'published', 'archived']

const inputClass =
  'rounded border border-border-warm bg-white px-3 py-1.5 text-sm text-charcoal focus:border-ember-orange focus:outline-none focus:ring-1 focus:ring-ember-orange'

export default function ProductsPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-products', { q, status, page }],
    queryFn: () =>
      fetchAdminProducts({ q: q || undefined, status: status || undefined, page, pageSize: 30 }),
  })

  const products = data?.data ?? []
  const meta = data?.meta

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-forest-green">Products</h1>
        <Link to="/products/new">
          <Button variant="primary" size="sm">
            <Plus size={14} aria-hidden="true" />
            New product
          </Button>
        </Link>
      </div>

      {/* -- Filters ---------------------------------------------------------- */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative min-w-48 flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-grey"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search products�"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            className={[inputClass, 'pl-8'].join(' ')}
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className={inputClass}
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === '' ? 'All statuses' : s.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* -- Table ------------------------------------------------------------ */}
      {isLoading ? (
        <TableSkeleton rows={10} />
      ) : isError ? (
        <p role="alert" className="text-sm text-error-red">
          Failed to load products.
        </p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <Package size={36} className="text-border-warm" aria-hidden="true" />
          <p className="text-stone-grey">No products found.</p>
          <Link to="/products/new">
            <Button variant="primary" size="sm">
              Create first product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-warm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-warm bg-pale-sage text-left">
                <th className="px-4 py-3 font-semibold text-charcoal">Product</th>
                <th className="px-4 py-3 font-semibold text-charcoal">SKU</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Price</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Stock</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Status</th>
                <th className="px-4 py-3 font-semibold text-charcoal">Wood type</th>
                <th className="sr-only px-4 py-3 font-semibold text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-warm">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-cream/60">
                  <td className="px-4 py-3">
                    <Link
                      to={`/products/${p.id}`}
                      className="font-medium text-charcoal no-underline hover:text-ember-orange"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-stone-grey">{p.sku}</td>
                  <td className="px-4 py-3 tabular-nums text-charcoal">
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: p.currency ?? 'GBP',
                    }).format(p.price)}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-charcoal">
                    {p.stock_quantity}
                    {p.stock_quantity <= p.low_stock_threshold && p.stock_quantity > 0 && (
                      <span className="ml-1 text-warning-amber">?</span>
                    )}
                    {p.stock_quantity === 0 && (
                      <span className="ml-1 text-error-red">?</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={productStatusBadge(p.status)}>
                      {p.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 capitalize text-stone-grey">
                    {p.wood_type ?? '�'}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/products/${p.id}`}
                      className="text-xs font-medium text-ember-orange no-underline hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* -- Pagination ------------------------------------------------------- */}
      {meta && meta.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-stone-grey">
          <span>{meta.total} products</span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-2">
              Page {page} of {meta.totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page === meta.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

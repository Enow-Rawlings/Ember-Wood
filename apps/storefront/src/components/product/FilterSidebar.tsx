import { X } from 'lucide-react'
import { useCategories } from '@/hooks/useProducts'
import type { SortOption } from '@/services/products'

interface FilterSidebarProps {
  selectedCategory: string
  selectedSort: SortOption
  selectedWoodType: string
  selectedWoodCondition: string
  selectedPackFormat: string
  inStockOnly: boolean
  onCategoryChange: (slug: string) => void
  onSortChange: (sort: SortOption) => void
  onWoodTypeChange: (v: string) => void
  onWoodConditionChange: (v: string) => void
  onPackFormatChange: (v: string) => void
  onInStockChange: (v: boolean) => void
  onClear: () => void
  isOpen: boolean
  onClose: () => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'name_asc', label: 'Name: A–Z' },
]

const WOOD_TYPES = [
  { value: 'hardwood', label: 'Hardwood' },
  { value: 'softwood', label: 'Softwood' },
  { value: 'mixed', label: 'Mixed' },
]

const WOOD_CONDITIONS = [
  { value: 'Kiln-dried', label: 'Kiln-dried' },
  { value: 'Seasoned', label: 'Seasoned' },
  { value: 'Air-dried', label: 'Air-dried' },
  { value: 'Freshly cut', label: 'Freshly cut' },
]

const PACK_FORMATS = [
  { value: 'Net bag', label: 'Net bag' },
  { value: 'Bulk bag', label: 'Bulk bag' },
  { value: 'Crate', label: 'Crate' },
  { value: 'Pallet', label: 'Pallet' },
  { value: 'Box', label: 'Box' },
  { value: 'Bundle', label: 'Bundle' },
  { value: 'Sack', label: 'Sack' },
  { value: 'Loose load', label: 'Loose load' },
]

export function FilterSidebar({
  selectedCategory,
  selectedSort,
  selectedWoodType,
  selectedWoodCondition,
  selectedPackFormat,
  inStockOnly,
  onCategoryChange,
  onSortChange,
  onWoodTypeChange,
  onWoodConditionChange,
  onPackFormatChange,
  onInStockChange,
  onClear,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const { data: categories = [] } = useCategories()

  const hasActiveFilters =
    selectedCategory !== '' ||
    selectedSort !== 'newest' ||
    selectedWoodType !== '' ||
    selectedWoodCondition !== '' ||
    selectedPackFormat !== '' ||
    inStockOnly

  const inputClass =
    'accent-ember-orange cursor-pointer'

  const content = (
    <div className="flex h-full flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-border-warm pb-4 mb-4">
        <h2 className="font-heading text-base font-semibold text-charcoal">
          Filter &amp; Sort
        </h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-ember-orange hover:underline"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="rounded p-1 text-stone-grey hover:bg-pale-sage lg:hidden"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Sort ────────────────────────────────────────────────────────── */}
      <fieldset className="mb-5">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
          Sort by
        </legend>
        <div className="flex flex-col gap-1">
          {sortOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage"
            >
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={selectedSort === opt.value}
                onChange={() => onSortChange(opt.value)}
                className={inputClass}
              />
              <span
                className={
                  selectedSort === opt.value
                    ? 'font-medium text-charcoal'
                    : 'text-stone-grey'
                }
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── In stock only ────────────────────────────────────────────────── */}
      <div className="mb-5 border-t border-border-warm pt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className={inputClass}
          />
          In stock only
        </label>
      </div>

      {/* ── Categories ──────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <fieldset className="mb-5 border-t border-border-warm pt-4">
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
            Category
          </legend>
          <div className="flex flex-col gap-1">
            <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
                className={inputClass}
              />
              <span
                className={
                  selectedCategory === ''
                    ? 'font-medium text-charcoal'
                    : 'text-stone-grey'
                }
              >
                All categories
              </span>
            </label>
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.slug}
                  checked={selectedCategory === cat.slug}
                  onChange={() => onCategoryChange(cat.slug)}
                  className={inputClass}
                />
                <span
                  className={
                    selectedCategory === cat.slug
                      ? 'font-medium text-charcoal'
                      : 'text-stone-grey'
                  }
                >
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* ── Wood type ────────────────────────────────────────────────────── */}
      <fieldset className="mb-5 border-t border-border-warm pt-4">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
          Wood type
        </legend>
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage">
            <input
              type="radio"
              name="woodType"
              value=""
              checked={selectedWoodType === ''}
              onChange={() => onWoodTypeChange('')}
              className={inputClass}
            />
            <span className={selectedWoodType === '' ? 'font-medium text-charcoal' : 'text-stone-grey'}>
              All types
            </span>
          </label>
          {WOOD_TYPES.map((t) => (
            <label
              key={t.value}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage"
            >
              <input
                type="radio"
                name="woodType"
                value={t.value}
                checked={selectedWoodType === t.value}
                onChange={() => onWoodTypeChange(t.value)}
                className={inputClass}
              />
              <span
                className={
                  selectedWoodType === t.value
                    ? 'font-medium text-charcoal'
                    : 'text-stone-grey'
                }
              >
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Wood condition ───────────────────────────────────────────────── */}
      <fieldset className="mb-5 border-t border-border-warm pt-4">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
          Condition
        </legend>
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage">
            <input
              type="radio"
              name="woodCondition"
              value=""
              checked={selectedWoodCondition === ''}
              onChange={() => onWoodConditionChange('')}
              className={inputClass}
            />
            <span className={selectedWoodCondition === '' ? 'font-medium text-charcoal' : 'text-stone-grey'}>
              Any condition
            </span>
          </label>
          {WOOD_CONDITIONS.map((c) => (
            <label
              key={c.value}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage"
            >
              <input
                type="radio"
                name="woodCondition"
                value={c.value}
                checked={selectedWoodCondition === c.value}
                onChange={() => onWoodConditionChange(c.value)}
                className={inputClass}
              />
              <span
                className={
                  selectedWoodCondition === c.value
                    ? 'font-medium text-charcoal'
                    : 'text-stone-grey'
                }
              >
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Pack format ──────────────────────────────────────────────────── */}
      <fieldset className="mb-5 border-t border-border-warm pt-4">
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-grey">
          Pack format
        </legend>
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage">
            <input
              type="radio"
              name="packFormat"
              value=""
              checked={selectedPackFormat === ''}
              onChange={() => onPackFormatChange('')}
              className={inputClass}
            />
            <span className={selectedPackFormat === '' ? 'font-medium text-charcoal' : 'text-stone-grey'}>
              Any format
            </span>
          </label>
          {PACK_FORMATS.map((f) => (
            <label
              key={f.value}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-pale-sage"
            >
              <input
                type="radio"
                name="packFormat"
                value={f.value}
                checked={selectedPackFormat === f.value}
                onChange={() => onPackFormatChange(f.value)}
                className={inputClass}
              />
              <span
                className={
                  selectedPackFormat === f.value
                    ? 'font-medium text-charcoal'
                    : 'text-stone-grey'
                }
              >
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        aria-label="Product filters"
        className="hidden w-60 flex-shrink-0 lg:block"
      >
        {content}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Product filters"
        >
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="absolute bottom-0 left-0 top-0 w-72 overflow-y-auto bg-white p-5 shadow-modal">
            {content}
          </aside>
        </div>
      )}
    </>
  )
}

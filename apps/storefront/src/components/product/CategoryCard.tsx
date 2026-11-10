import { Link } from 'react-router-dom'
import { ArrowRight, Layers } from 'lucide-react'
import type { CategoryItem } from '@/services/products'

interface CategoryCardProps {
  category: CategoryItem
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-orange"
    >
      {/* Image or placeholder */}
      <div className="aspect-[4/3] bg-pale-sage">
        {category.image_url ? (
          <img
            src={category.image_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-forest-green/10 text-forest-green/40">
            <Layers size={40} aria-hidden="true" />
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-green/80 via-forest-green/20 to-transparent transition-opacity duration-300 group-hover:from-forest-green/90"
          aria-hidden="true"
        />
      </div>

      {/* Label (absolute, bottom of image) */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex items-end justify-between gap-2">
          <div>
            <h3 className="font-heading text-sm font-bold text-cream sm:text-base">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-0.5 line-clamp-1 text-xs text-cream/70">{category.description}</p>
            )}
          </div>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="mb-0.5 flex-shrink-0 text-cream/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ember-orange"
          />
        </div>
      </div>
    </Link>
  )
}

/**
 * useScrollReveal — attaches IntersectionObserver to all .reveal* elements
 * and adds the 'in-view' class when they enter the viewport.
 *
 * Key behaviours:
 * - Re-runs whenever `deps` changes (pass loading flags so it re-observes
 *   after async data arrives and new DOM elements are rendered).
 * - Uses rootMargin '0px' so elements already visible on page load are
 *   triggered immediately without needing to scroll.
 * - Respects prefers-reduced-motion (CSS handles this — no JS check needed).
 */
import { useEffect } from 'react'

interface Options {
  selector?: string
  rootMargin?: string
  threshold?: number
  once?: boolean
  /** Re-run the observer when any of these values change (e.g. isLoading flags) */
  deps?: unknown[]
}

export function useScrollReveal(options: Options = {}) {
  const {
    selector   = '.reveal, .reveal-left, .reveal-right, .reveal-scale',
    rootMargin = '0px 0px -40px 0px',
    threshold  = 0.05,
    once       = true,
    deps       = [],
  } = options

  useEffect(() => {
    // Small RAF delay so the DOM has painted the new elements before we query
    const rafId = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>(selector)
      if (!elements.length) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view')
              if (once) observer.unobserve(entry.target)
            } else if (!once) {
              entry.target.classList.remove('in-view')
            }
          })
        },
        { rootMargin, threshold }
      )

      elements.forEach((el) => {
        // If already in view (e.g. above-fold on direct load), trigger immediately
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view')
          // No need to observe if already visible and once=true
          if (!once) observer.observe(el)
        } else {
          observer.observe(el)
        }
      })

      return () => observer.disconnect()
    })

    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, rootMargin, threshold, once, ...deps])
}

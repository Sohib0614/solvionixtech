import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles the two scroll cases a multi-page site needs:
 *
 *   1. A real page change scrolls back to the top, which the browser does not
 *      do by itself on a single-page-app route change.
 *   2. A `#section` hash scrolls to that element, including when it arrives
 *      from the 404 page, where the browser will not do it for us.
 *
 * The offset for the sticky navbar comes from `scroll-padding-top` in the
 * global stylesheet, so it stays in one place.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait a frame so the target section is mounted.
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}

export default ScrollManager

import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../lib/useReducedMotion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * A single controlled page transition.
 *
 * One short fade on route change, nothing more. There is no stagger, no scroll
 * animation and no exit transition: with this many routes, a heavier treatment
 * turns navigation into a performance. Motion here signals that the context
 * changed, which is the only job it has.
 *
 * Rendered as a keyed element rather than a shared one so React remounts on
 * every path and the animation actually replays. Reduced-motion visitors get the
 * plain element with no motion props at all.
 */
export function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div key={pathname}>{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Scroll-triggered reveal. Children animate from a short offset with a fast
 * ease; when the visitor prefers reduced motion the content renders as-is.
 */
export function Reveal({ children, delay = 0, y = 18, className, as = 'div', once = true }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  if (reduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-64px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

/** Staggered container: children using <RevealItem> cascade automatically. */
export function RevealGroup({ children, className, stagger = 0.07, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-64px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A staggered child of <RevealGroup>.
 *
 * `as` exists for lists. Wrapping an <li> in an animated <div> produces
 * `ol > div > li`, which is invalid markup and drops the list semantics a screen
 * reader relies on. Pass `as="li"` and the item's own classes so the animation
 * lands on the list element itself.
 */
export function RevealItem({ children, className, y = 20, as = 'div' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </Component>
  )
}

/** Section shell: consistent vertical rhythm and optional id anchoring. */
export function Section({ id, children, className, tone = 'base' }) {
  const tones = {
    base: 'relative',
    raised: 'relative bg-gradient-to-b from-ink-950 via-ink-900/35 to-ink-950',
    sunken: 'relative bg-ink-950',
  }

  return (
    <section
      id={id}
      className={cn('relative scroll-mt-20 py-16 sm:py-20 lg:py-24', tones[tone], className)}
    >
      {children}
    </section>
  )
}

export default Reveal

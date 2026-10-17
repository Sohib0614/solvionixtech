import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/content'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useScrollLock } from '../../lib/useScrollLock'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Icon } from '../ui/Icon'
import { SocialLinks } from '../ui/SocialLinks'

import { Search } from 'lucide-react'

/**
 * Mobile navigation. A single quiet panel: the page links plus the social
 * icons and quick search trigger.
 */
export function MobileMenu({ open, onClose, onOpenSearch }) {
  const panelRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useScrollLock(open)
  useFocusTrap(panelRef, open, onClose)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) onClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-full border-b border-line bg-ink-950 px-6 pb-6 pt-3 lg:hidden"
        >
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="mb-4 flex w-full items-center justify-between rounded-xl border border-line bg-ink-900/80 px-4 py-2.5 text-xs font-mono text-fog-300 transition-colors hover:border-signal-400/40 hover:text-fog-50"
            >
              <span className="flex items-center gap-2">
                <Search className="size-4 text-signal-400" />
                <span>Search solutions, work...</span>
              </span>
              <kbd className="rounded border border-line-soft bg-ink-950 px-1.5 py-0.5 text-[10px] text-fog-500">
                ⌘K
              </kbd>
            </button>
          )}

          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block border-b border-line-soft py-3.5 font-semibold text-base transition-colors ${
                      isActive ? 'text-accent' : 'text-fog-200 hover:text-fog-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <SocialLinks tooltip="top" align="center" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="font-semibold flex size-9 items-center justify-center rounded-lg border border-line text-fog-400 transition-colors hover:border-signal-400/50 hover:text-accent"
            >
              <Icon name="X" className="size-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileMenu

import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '../ui/Icon'

const EASE = [0.16, 1, 0.3, 1]

/** Kept in step with the id on <ProjectForm>; it is the only route into the form. */
const FORM_ID = 'project-enquiry'

/** How long to keep looking for the form before giving up on the handoff. */
const HANDOFF_TIMEOUT = 5000
const HANDOFF_INTERVAL = 100

/**
 * Moves focus into the name field, but only while focus is still unclaimed.
 *
 * Two things go wrong if this is unconditional. A fixed delay is a guess about
 * when the route chunk has mounted, and on a slow connection or a busy main
 * thread the guess is wrong and the handoff silently never happens. And a late
 * timer that fires after the visitor has already reached the form will drag
 * focus back out from under them — undoing the first-error focus that an empty
 * submit deliberately sets.
 */
function handOffFocusToForm(origin) {
  const form = document.getElementById(FORM_ID)
  if (!form) return false

  const active = document.activeElement
  const unclaimed = !active || active === document.body || active === origin
  if (unclaimed) {
    form.querySelector('input[name="name"]')?.focus({ preventScroll: true })
  }
  return true
}

/**
 * The only "Start a Project" control on the site.
 *
 * It lives bottom-left, stays visible while scrolling, and takes you to the
 * contact page. On the first visit it also drops focus into the name field, so
 * a keyboard or screen reader user lands where they need to be rather than at
 * the top of a new page.
 */
export function StartProjectButton() {
  const navigate = useNavigate()
  const hasScrolled = useRef(false)

  function openForm() {
    const isAlreadyOnContact = window.location.pathname === '/contact'

    if (isAlreadyOnContact) {
      document.getElementById(FORM_ID)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      return
    }

    // Remember where focus was, so the handoff below can tell "the visitor has
    // not moved yet" from "the visitor has already gone somewhere on purpose".
    const origin = document.activeElement
    navigate('/contact')

    if (hasScrolled.current) return
    hasScrolled.current = true

    // Wait for the route chunk to load and the form to mount, rather than
    // assuming it has already happened.
    const started = Date.now()
    const poll = () => {
      if (handOffFocusToForm(origin)) return
      if (Date.now() - started > HANDOFF_TIMEOUT) return
      window.setTimeout(poll, HANDOFF_INTERVAL)
    }
    window.setTimeout(poll, HANDOFF_INTERVAL)
  }

  return (
    <motion.button
      type="button"
      onClick={openForm}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
      className="group inline-flex h-13 items-center gap-2 rounded-full bg-signal-400 pl-4 pr-6 text-[0.9375rem] font-semibold text-ink-950 shadow-[0_18px_40px_-18px_rgba(56,189,248,0.75)] transition-colors duration-200 hover:bg-signal-300"
    >
      <span
        aria-hidden="true"
        className="font-semibold flex size-8 items-center justify-center rounded-full bg-ink-950/10 text-ink-950 transition-transform duration-200 group-hover:rotate-90"
      >
        <Icon name="Plus" className="size-4" />
      </span>
      <span className="whitespace-nowrap">Start a Project</span>
    </motion.button>
  )
}

export default StartProjectButton

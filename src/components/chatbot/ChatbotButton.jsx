import { useReducedMotion } from '../../lib/useReducedMotion'
import { openLabel, closeLabel } from '../../data/chatbot'
import { Icon } from '../ui/Icon'

/**
 * The launcher.
 *
 * One control, clearly clickable, and the only element that opens the window.
 * The quiet availability ring was removed: a permanently repeating animation is
 * the kind of ambient motion that makes a site feel like a product demo rather
 * than a company, and the hover preview already signals availability.
 */
export function ChatbotButton({ open, onToggle }) {
  const reduceMotion = useReducedMotion()

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="chatbot-window"
      aria-label={open ? closeLabel : openLabel}
      className="font-semibold group relative flex size-14 items-center justify-center rounded-full border border-signal-400/30 bg-ink-850 text-accent shadow-[0_14px_34px_-12px_rgba(0,0,0,0.9)] transition-all duration-200 hover:scale-105 hover:border-signal-400/60 sm:size-15"
    >
      {!open && !reduceMotion ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-signal-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}

      <Icon name={open ? 'X' : 'MessageCircle'} className="size-6 sm:size-7" />
    </button>
  )
}

export default ChatbotButton

import { getWhatsappLink } from '../../data/config'
import { Icon } from '../ui/Icon'

/**
 * WhatsApp button, bottom-right, below the chatbot.
 *
 * The number lives in `data/config.js` as `whatsapp.number`. Until that is
 * filled in the button stays visible but does not link anywhere, so no
 * invented phone number ever appears on the site.
 */
export function WhatsAppButton() {
  const href = getWhatsappLink()

  const classes =
    'group relative flex size-15 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 sm:size-16'

  const button = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className={`${classes} bg-brand-whatsapp text-ink-950 shadow-[0_14px_34px_-10px_rgba(37,211,102,0.7)] hover:bg-brand-whatsapp-dark`}
    >
      <Icon name="Whatsapp" className="size-8 sm:size-9" />
    </a>
  ) : (
    <span
      aria-label="WhatsApp — number not configured yet"
      className={`${classes} cursor-default border border-line bg-ink-800/70 text-fog-600 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.9)]`}
    >
      <Icon name="Whatsapp" className="size-7 sm:size-8" />
    </span>
  )

  return (
    <div className="group relative">
      {button}

      <span
        role="tooltip"
        className="font-semibold pointer-events-none absolute right-full top-1/2 z-10 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-lg border border-line bg-ink-800 px-3 py-2 text-sm text-fog-100 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
      >
        Chat on WhatsApp
        <span className="absolute right-[-4px] top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-line bg-ink-800" />
      </span>
    </div>
  )
}

export default WhatsAppButton

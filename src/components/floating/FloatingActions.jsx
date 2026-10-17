import { Chatbot } from '../chatbot/Chatbot'
import { StartProjectButton } from './StartProjectButton'
import { WhatsAppButton } from './WhatsAppButton'

/**
 * The three floating elements, laid out so they never overlap:
 *
 *   bottom-left   Start a Project — the only CTA on the site
 *   bottom-right  chatbot on top, WhatsApp underneath
 *
 * The right-hand pair is a column, so it stays stacked on mobile without any
 * extra rules. The whole cluster is `pointer-events-none` with the children
 * re-enabled, so the gaps between buttons do not swallow clicks.
 */
export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-between p-5 sm:p-6">
      <div className="pointer-events-auto">
        <StartProjectButton />
      </div>

      <div className="pointer-events-auto flex flex-col items-end gap-3.5">
        <Chatbot />
        <WhatsAppButton />
      </div>
    </div>
  )
}

export default FloatingActions

import { welcome } from '../../data/chatbot'

/**
 * The hover preview bubble.
 *
 * Shown when the launcher is hovered or keyboard-focused, and never rendered
 * while the window is open. `aria-hidden` because the panel label already
 * announces what the control does — a second, invisible copy of the same
 * sentence in the accessibility tree is noise.
 *
 * Purely CSS for the reveal, so there is no enter/exit animation to coordinate
 * and no flash of it on touch devices where hover does not exist.
 */
export function ChatbotPreview({ hidden = false }) {
  if (hidden) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-full top-1/2 z-10 mr-3 w-max max-w-56 -translate-x-1 translate-y-1/2 rounded-xl border border-line bg-ink-800 px-3.5 py-2.5 text-left opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 sm:opacity-0"
    >
      <p className="text-sm font-semibold text-fog-50">{welcome.greeting}</p>
      <p className="font-semibold mt-0.5 text-sm text-fog-400">{welcome.preview}</p>
      <span className="absolute right-[-4px] top-1/2 size-2 -translate-y-1/2 rotate-45 border-r border-t border-line bg-ink-800" />
    </div>
  )
}

export default ChatbotPreview

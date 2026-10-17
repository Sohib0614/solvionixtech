import { forwardRef, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { disclaimer, inputPlaceholder, quickActions } from '../../data/chatbot'
import { hasGemini } from '../../lib/chatbotEngine'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { cn } from '../../lib/cn'
import { Icon } from '../ui/Icon'

const EASE = [0.16, 1, 0.3, 1]

/**
 * The assistant window.
 *
 * Presentational only. Conversation state, the typing state and the reply
 * matching all live in the parent, so this file is just the surface: header,
 * message list, quick actions, typing indicator and composer.
 *
 * The window is sized to be read in rather than admired. On a phone it takes
 * most of the available height without reaching the top of the screen, so the
 * navbar stays visible and the visitor is never trapped. On desktop it is a
 * fixed, comfortable column.
 */
export const ChatbotWindow = forwardRef(function ChatbotWindow(
  {
    messages,
    typing,
    showQuickActions,
    input,
    onInputChange,
    onSubmit,
    onQuickAction,
    onClose,
  },
  panelRef,
) {
  const listRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // Keep the newest message in view as the thread grows.
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, typing])

  // Initial focus belongs to the focus trap, which runs after this component's
  // effects and would otherwise overwrite anything set here. It is the composer
  // that is marked up for it, so the window is usable from the keyboard
  // immediately rather than requiring a tab through the header first.

  return (
    <motion.div
      ref={panelRef}
      id="chatbot-window"
      role="dialog"
      aria-label="Solvionix assistant"
      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="absolute right-0 bottom-full z-50 mb-3 flex h-[min(72svh,34rem)] w-[calc(100vw-1.5rem)] max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-line bg-ink-900 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)] sm:h-[min(34rem,calc(100svh-16rem))] sm:w-[26rem] sm:max-w-none"
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-3.5">
        <span
          aria-hidden="true"
          className="font-semibold flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-accent"
        >
          <Icon name="MessageCircle" className="size-[1.125rem]" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[0.9375rem] font-semibold text-fog-50">Solvionix Assistant</p>
            {hasGemini ? (
              <span className="rounded bg-signal-400/15 border border-signal-400/30 px-1.5 py-0.5 font-mono text-[0.625rem] font-bold text-signal-300">
                Gemini AI
              </span>
            ) : (
              <span className="rounded bg-ink-800 border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-fog-400">
                Active
              </span>
            )}
          </div>
          <p className="font-semibold text-xs text-fog-400">Engineering & Solutions Guide</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Minimise the assistant"
          className="font-semibold flex size-8 items-center justify-center rounded-md text-fog-400 transition-colors hover-surface hover:text-fog-50"
        >
          <Icon name="Minus" className="size-4" />
        </button>
      </header>

      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={cn(
                'max-w-[88%] rounded-xl px-3.5 py-2.5 font-semibold text-[0.9375rem] leading-relaxed',
                message.from === 'user'
                  ? 'ml-auto bg-signal-400 text-ink-950'
                  : 'surface-glass text-fog-200',
              )}
            >
              {message.text}
            </div>

            {message.action ? (
              <Link
                to={message.action.to}
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-signal-400/40 px-3 py-1.5 text-sm font-semibold text-accent transition-colors hover:bg-signal-400/10"
              >
                {message.action.label}
                <Icon name="ArrowRight" className="size-3" />
              </Link>
            ) : null}
          </div>
        ))}

        {showQuickActions && !typing ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onQuickAction(action)}
                className="font-semibold rounded-lg surface-glass px-2.5 py-1.5 text-sm text-fog-200 transition-colors hover:border-signal-400/50 hover:text-fog-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}

        {typing ? (
          <div className="flex w-max items-center gap-1 rounded-xl surface-glass px-3 py-3">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1.5 rounded-full bg-fog-400"
                animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.15 }}
              />
            ))}
            <span className="sr-only">The Solvionix assistant is typing</span>
          </div>
        ) : null}
      </div>

      <p className="font-semibold border-t border-line-soft px-4 py-2 text-[0.8125rem] text-fog-600">
        {disclaimer}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className="flex items-center gap-2 border-t border-line px-3 py-2.5"
      >
        <label htmlFor="chatbot-input" className="sr-only">
          {inputPlaceholder}
        </label>
        <input
          id="chatbot-input"
          data-autofocus
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          placeholder={inputPlaceholder}
          autoComplete="off"
          className="font-semibold h-11 min-w-0 flex-1 rounded-lg border border-line bg-ink-850 px-3 text-[0.9375rem] text-fog-50 placeholder:text-fog-600 focus:outline-none focus-visible:border-signal-400/60"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message"
          className="font-semibold flex size-11 shrink-0 items-center justify-center rounded-lg bg-signal-400 text-ink-950 transition-colors hover:bg-signal-300 disabled:opacity-40"
        >
          <Icon name="Send" className="size-4" />
        </button>
      </form>
    </motion.div>
  )
})

export default ChatbotWindow

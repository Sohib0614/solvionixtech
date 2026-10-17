import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { welcome } from '../../data/chatbot'
import {
  fallbackReply,
  findResponse,
  getAssistantReply,
  toMessage,
  typingDuration,
} from '../../lib/chatbotEngine'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { ChatbotButton } from './ChatbotButton'
import { ChatbotPreview } from './ChatbotPreview'
import { ChatbotWindow } from './ChatbotWindow'

/**
 * The assistant, composed from its three parts.
 * Supports Google Gemini reasoning with instant local knowledge fallback.
 */

let nextId = 0
const makeMessage = (from, text, action = null) => ({ id: (nextId += 1), from, text, action })

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => [makeMessage('bot', welcome.message)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const panelRef = useRef(null)
  const timerRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])
  useFocusTrap(panelRef, open, close)

  // Clear any pending reply if the widget unmounts
  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const reply = useCallback((lines, action = null) => {
    setShowQuickActions(false)
    setTyping(true)

    const text = toMessage(lines, fallbackReply())

    timerRef.current = window.setTimeout(() => {
      setTyping(false)
      setMessages((current) => [...current, makeMessage('bot', text, action)])
    }, typingDuration(text))
  }, [])

  const ask = useCallback(
    async (text) => {
      const clean = text.trim()
      if (!clean) return

      const userMsg = makeMessage('user', clean)
      setMessages((current) => [...current, userMsg])
      setInput('')
      setShowQuickActions(false)
      setTyping(true)

      const result = await getAssistantReply(clean, messages)

      timerRef.current = window.setTimeout(
        () => {
          setTyping(false)
          setMessages((current) => [...current, makeMessage('bot', result.text)])
        },
        result.source === 'gemini' ? 250 : typingDuration(result.text),
      )
    },
    [messages],
  )

  /**
   * A quick action is a real navigation as well as a question, so it posts the
   * answer with a link onward rather than leaving the visitor in a dead thread.
   */
  const handleQuickAction = useCallback(
    (action) => {
      setMessages((current) => [...current, makeMessage('user', action.label)])
      reply(findResponse(action.id), { label: `Go to ${action.label.toLowerCase()}`, to: action.to })
    },
    [reply],
  )

  return (
    <div className="group relative">
      <ChatbotPreview hidden={open} />

      <AnimatePresence>
        {open ? (
          <ChatbotWindow
            ref={panelRef}
            messages={messages}
            typing={typing}
            showQuickActions={showQuickActions}
            input={input}
            onInputChange={setInput}
            onSubmit={() => ask(input)}
            onQuickAction={handleQuickAction}
            onClose={close}
          />
        ) : null}
      </AnimatePresence>

      <ChatbotButton open={open} onToggle={() => setOpen((value) => !value)} />
    </div>
  )
}

export default Chatbot

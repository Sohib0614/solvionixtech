import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { solutions } from '../../data/solutions'
import { capabilities } from '../../data/capabilities'
import { work } from '../../data/work'
import { industries } from '../../data/industries'
import { useTheme } from '../../lib/useTheme'
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Layers,
  FolderGit2,
  Building2,
  Calendar,
  Sun,
  Moon,
  Copy,
  Check,
  X,
  Cpu,
} from 'lucide-react'

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 20)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  // Quick actions
  const actions = [
    {
      id: 'action-book',
      category: 'Actions',
      title: 'Book a 15-Minute Technical Discovery Call',
      subtitle: 'Schedule directly with an engineering lead',
      icon: Calendar,
      action: () => {
        navigate('/contact')
        handleClose()
      },
    },
    {
      id: 'action-theme',
      category: 'Actions',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle theme preference',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme()
      },
    },
    {
      id: 'action-email',
      category: 'Actions',
      title: 'Copy Engineering Contact Email',
      subtitle: 'hello@solvionix.com',
      icon: copied ? Check : Copy,
      action: () => {
        navigator.clipboard?.writeText('hello@solvionix.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },
    {
      id: 'action-accessibility',
      category: 'Actions',
      title: 'Accessibility Statement & WCAG 2.2 AA Standards',
      subtitle: 'Review our non-negotiable accessibility commitments',
      icon: Check,
      action: () => {
        navigate('/accessibility')
        handleClose()
      },
    },
  ]

  // Search items aggregation
  const allItems = [
    ...actions,
    ...solutions.map((s) => ({
      id: `solution-${s.id}`,
      category: 'Solutions',
      title: s.title,
      subtitle: s.summary,
      icon: Sparkles,
      url: `/solutions/${s.id}`,
    })),
    ...work.map((w) => ({
      id: `work-${w.id}`,
      category: 'Case Studies',
      title: w.title,
      subtitle: `${w.label} — ${w.domain}`,
      icon: FolderGit2,
      url: `/work/${w.id}`,
    })),
    ...capabilities.map((c) => ({
      id: `cap-${c.id}`,
      category: 'Capabilities',
      title: c.title,
      subtitle: c.summary,
      icon: Cpu,
      url: `/capabilities/${c.id}`,
    })),
    ...industries.map((ind) => ({
      id: `ind-${ind.id}`,
      category: 'Industries',
      title: ind.title,
      subtitle: ind.summary,
      icon: Building2,
      url: `/industries/${ind.id}`,
    })),
  ]

  // Filter items
  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 12)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev === 0 ? (filteredItems.length || 1) - 1 : prev - 1
        )
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selected = filteredItems[selectedIndex]
        if (selected) {
          if (selected.action) {
            selected.action()
          } else if (selected.url) {
            navigate(selected.url)
            handleClose()
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, navigate, handleClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-ink-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-ink-900/95 shadow-2xl backdrop-blur-2xl"
        >
          {/* Top Search Input Bar */}
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Search className="size-5 text-signal-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              placeholder="Type a command or search solutions, case studies, technologies..."
              className="flex-1 bg-transparent font-sans text-sm text-fog-50 placeholder:text-fog-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs font-mono text-fog-500 hover:text-fog-300"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-line-soft bg-ink-950 px-2 py-0.5 font-mono text-[10px] text-fog-400">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-fog-400">
                <Command className="mx-auto size-8 text-fog-600 mb-2 opacity-50" />
                <p className="text-sm font-semibold text-fog-300">No matching results found</p>
                <p className="text-xs text-fog-500 mt-1">Try searching for &quot;Python&quot;, &quot;Intelligent Systems&quot;, or &quot;Booking&quot;.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const isSelected = selectedIndex === index
                  const IconComponent = item.icon

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (item.action) {
                          item.action()
                        } else if (item.url) {
                          navigate(item.url)
                          handleClose()
                        }
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                        isSelected
                          ? 'bg-signal-400/10 border border-signal-400/30 text-fog-50'
                          : 'border border-transparent text-fog-200 hover:bg-ink-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${
                            isSelected
                              ? 'border-signal-400/50 bg-signal-400/20 text-signal-300'
                              : 'border-line-soft bg-ink-950 text-fog-400'
                          }`}
                        >
                          <IconComponent className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold truncate ${isSelected ? 'text-signal-300' : 'text-fog-50'}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-fog-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-3 shrink-0">
                        <span className="font-mono text-[10px] text-fog-500 uppercase tracking-wider hidden sm:inline">
                          {item.category}
                        </span>
                        <ArrowRight
                          className={`size-3.5 transition-transform ${
                            isSelected ? 'translate-x-1 text-signal-400' : 'text-fog-600'
                          }`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer keyboard legend */}
          <div className="flex items-center justify-between border-t border-line bg-ink-950/80 px-5 py-2.5 text-[11px] font-mono text-fog-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-line-soft bg-ink-900 px-1 py-0.5 text-[10px]">↑</kbd>
                <kbd className="rounded border border-line-soft bg-ink-900 px-1 py-0.5 text-[10px]">↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-line-soft bg-ink-900 px-1.5 py-0.5 text-[10px]">↵</kbd> to select
              </span>
            </div>
            <span className="text-signal-400 font-semibold">
              SOLVIONIX PALETTE
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CommandPalette

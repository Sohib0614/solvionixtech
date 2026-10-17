import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'
import { getWhatsappLink, hasWhatsapp } from '../../data/config'

const SLOTS = [
  { day: 'Tomorrow', time: '10:00 AM UTC', id: 'slot-1' },
  { day: 'Tomorrow', time: '02:30 PM UTC', id: 'slot-2' },
  { day: 'Thu', time: '11:00 AM UTC', id: 'slot-3' },
  { day: 'Thu', time: '04:00 PM UTC', id: 'slot-4' },
  { day: 'Fri', time: '01:00 PM UTC', id: 'slot-5' },
  { day: 'Fri', time: '05:30 PM UTC', id: 'slot-6' },
]

const TOPICS = [
  'New Web / AI Product',
  'Software Architecture Review',
  'AI Agent / Automation Feasibility',
  'Project Scope & Budget Estimate',
]

export function DiscoveryBookingCard() {
  const [selectedSlot, setSelectedSlot] = useState(SLOTS[0].id)
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [booked, setBooked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and work email.')
      return
    }
    setError('')
    setSubmitting(true)

    const slotObj = SLOTS.find((s) => s.id === selectedSlot)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'discovery_call',
          name: name.trim(),
          email: email.trim(),
          organisation: 'Discovery Call Client',
          lookingFor: selectedTopic,
          stage: `${slotObj?.day} at ${slotObj?.time}`,
          requirement: `15-Minute Discovery Call Reservation:\n• Client Name: ${name.trim()}\n• Work Email: ${email.trim()}\n• Topic: ${selectedTopic}\n• Reserved Slot: ${slotObj?.day} at ${slotObj?.time}`,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to reserve call slot. Please try again.')
      }

      setBooked(true)
    } catch (err) {
      setError(err.message || 'Unable to book call slot right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const slotObj = SLOTS.find((s) => s.id === selectedSlot)

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 size-56 rounded-full bg-signal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-56 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl border border-signal-400/30 bg-signal-400/10 text-signal-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Icon name="Phone" className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-fog-50">15-Min Discovery Call</h3>
            <p className="text-xs text-fog-400">Speak directly with our Engineering Lead</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-medium text-emerald-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>Open Slots This Week</span>
        </div>
      </div>

      {booked ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-2xl border border-signal-400/40 bg-signal-400/10 p-8 text-center relative z-10 shadow-[0_0_30px_rgba(56,189,248,0.15)]"
        >
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-signal-400/20 text-signal-300 border border-signal-400/30">
            <Icon name="Check" className="size-7" />
          </div>
          <h4 className="mt-4 font-display text-xl font-bold tracking-tight text-fog-50">Call Slot Reserved</h4>
          <p className="mt-2 text-sm text-fog-300 leading-relaxed max-w-md mx-auto">
            Thank you, <strong className="text-fog-100">{name}</strong>. A calendar invite for{' '}
            <strong className="text-signal-300">
              {slotObj?.day} at {slotObj?.time}
            </strong>{' '}
            has been queued for <strong className="text-fog-100">{email}</strong>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {hasWhatsapp && (
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-5 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <span>Follow up on WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                setBooked(false)
                setName('')
                setEmail('')
              }}
              className="rounded-xl border border-line bg-ink-850 px-4 py-2.5 text-xs font-semibold text-fog-300 hover:text-fog-100 hover:border-line-soft transition-colors"
            >
              Book Another Slot
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleBooking} className="mt-6 space-y-6 relative z-10">
          <div>
            <label className="block text-xs font-mono font-semibold text-fog-400 uppercase tracking-wider">
              1. Select a Topic
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`cursor-pointer rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                    selectedTopic === topic
                      ? 'border-signal-400 bg-signal-400/15 text-signal-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'border-line/70 bg-ink-950/70 text-fog-400 hover:border-signal-400/30 hover:text-fog-200 hover:bg-ink-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{topic}</span>
                    {selectedTopic === topic && (
                      <span className="size-2 rounded-full bg-signal-400 animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-fog-400 uppercase tracking-wider">
              2. Select Available Slot
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`cursor-pointer rounded-xl border p-3 text-center transition-all ${
                    selectedSlot === slot.id
                      ? 'border-signal-400 bg-signal-400/15 text-signal-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'border-line/70 bg-ink-950/70 text-fog-400 hover:border-signal-400/30 hover:text-fog-200 hover:bg-ink-900/60'
                  }`}
                >
                  <p className="text-[0.6875rem] font-semibold text-fog-300 uppercase tracking-wide">
                    {slot.day}
                  </p>
                  <p className="font-mono text-xs font-medium mt-1">{slot.time}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-line/60 pt-5">
            <label className="block text-xs font-mono font-semibold text-fog-400 uppercase tracking-wider">
              3. Your Details
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-ink-950/80 px-4 py-2.5 text-sm text-fog-100 placeholder:text-fog-600 focus:border-signal-400 focus:ring-2 focus:ring-signal-400/20 focus:outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Work Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-line bg-ink-950/80 px-4 py-2.5 text-sm text-fog-100 placeholder:text-fog-600 focus:border-signal-400 focus:ring-2 focus:ring-signal-400/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {error && <p className="text-xs font-medium text-rose-400">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full justify-center py-3.5 text-sm font-semibold shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] transition-all"
          >
            {submitting ? 'Reserving Call Slot...' : 'Confirm 15-Min Discovery Slot →'}
          </Button>

          <p className="text-center text-[0.6875rem] text-fog-500">
            No commitment required. We strictly respect your time and NDA standards.
          </p>
        </form>
      )}
    </div>
  )
}

export default DiscoveryBookingCard

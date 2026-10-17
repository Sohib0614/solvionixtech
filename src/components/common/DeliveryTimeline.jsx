import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { cn } from '../../lib/cn'
import { FileCheck, CheckCircle2, ArrowRight } from 'lucide-react'

/**
 * The delivery lifecycle, drawn as an interactive engineering timeline.
 *
 * Each stage represents a verifiable gate with an explicit written output,
 * proving software is delivered systematically rather than through guesswork.
 */
export function DeliveryTimeline({ stages, compact = false, className }) {
  if (!stages?.length) return null

  if (compact) {
    return (
      <RevealGroup className={cn('flex flex-wrap items-center gap-x-2 gap-y-3', className)}>
        {stages.map((stage, index) => (
          <RevealItem key={stage.number} y={8}>
            <div className="flex items-center gap-2">
              <span className="font-semibold index-mark text-fog-600">{stage.number}</span>
              <span className="font-semibold type-support text-fog-300">{stage.short}</span>
              {index < stages.length - 1 ? (
                <span aria-hidden="true" className="ml-2 h-px w-4 bg-line" />
              ) : null}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    )
  }

  return (
    <RevealGroup className={cn('relative', className)}>
      {/* The timeline rail */}
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-4 left-[0.625rem] w-px bg-gradient-to-b from-signal-400/50 via-line to-line-soft sm:left-[0.875rem]"
      />

      <ol className="space-y-8 lg:space-y-10">
        {stages.map((stage) => (
          <RevealItem key={stage.number} as="li" y={14} className="group relative flex gap-4 sm:gap-7">
            {/* Stage marker pin */}
            <span
              aria-hidden="true"
              className="relative mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-signal-400/60 bg-ink-950 shadow-[0_0_12px_rgba(52,211,153,0.2)] transition-transform duration-300 group-hover:scale-110 sm:size-7"
            >
              <span className="size-2 rounded-full bg-signal-400 animate-pulse" />
            </span>

            {/* Stage Card */}
            <div className="min-w-0 flex-1 rounded-2xl border border-line bg-ink-900/40 p-6 sm:p-7 shadow-sm transition-all duration-300 group-hover:border-signal-400/40 group-hover:bg-ink-900/70 group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft pb-3 mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold text-signal-400">
                    STAGE {stage.number}
                  </span>
                  <h3 className="font-bold text-lg text-fog-50 group-hover:text-signal-300 transition-colors">
                    {stage.title}
                  </h3>
                </div>
                <span className="rounded bg-ink-950 border border-line-soft px-2.5 py-0.5 font-mono text-[11px] text-fog-400">
                  {stage.short}
                </span>
              </div>

              <p className="text-sm font-medium text-fog-300 leading-relaxed max-w-3xl">
                {stage.body}
              </p>

              {/* Tangible Handover Output */}
              <div className="mt-5 rounded-xl border border-signal-400/20 bg-signal-400/5 p-4 flex items-start gap-3">
                <FileCheck className="size-4 shrink-0 text-signal-400 mt-0.5" />
                <div className="text-xs">
                  <span className="font-mono uppercase font-bold text-signal-300 tracking-wider">
                    Handover Deliverable:
                  </span>
                  <p className="mt-0.5 font-medium text-fog-100">
                    {stage.output}
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </ol>
    </RevealGroup>
  )
}

export default DeliveryTimeline

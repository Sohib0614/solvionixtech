import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { solutions } from '../../data/solutions'
import { ArrowLink } from '../ui/ArrowLink'
import { Icon } from '../ui/Icon'

const ICONS = {
  'intelligent-systems': 'Bot',
  'digital-products': 'Globe',
  'internal-tools': 'Layers',
  'connected-infrastructure': 'Workflow',
  'system-modernisation': 'Code2',
}

export function SolutionsBentoGrid() {
  const [activeFlowId, setActiveFlowId] = useState(null)

  const toggleFlow = (id) => {
    setActiveFlowId((prev) => (prev === id ? null : id))
  }

  const aiSolution = solutions.find((s) => s.id === 'intelligent-systems')
  const webSolution = solutions.find((s) => s.id === 'digital-products')
  const toolsSolution = solutions.find((s) => s.id === 'internal-tools')
  const infraSolution = solutions.find((s) => s.id === 'connected-infrastructure')
  const modernSolution = solutions.find((s) => s.id === 'system-modernisation')

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* 1. HERO BENTO CARD: Intelligent AI & Automation (Spans 2 cols on lg) */}
      {aiSolution && (
        <div className="glass-card group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.18)] md:col-span-2">
          {/* Ambient cyan backlight glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-signal-400/15 blur-[90px] transition-opacity duration-300 group-hover:opacity-100 opacity-60"
          />

          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-signal-400/40 bg-signal-400/10 text-signal-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Icon name={ICONS[aiSolution.id]} className="size-5" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-signal-400 uppercase">
                  Featured Architecture • {aiSolution.number}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/30 bg-signal-400/10 px-3.5 py-1 font-mono text-[0.6875rem] font-semibold text-signal-200">
                <span className="size-1.5 rounded-full bg-signal-400 animate-pulse" />
                LLMs & Autonomous Agents
              </span>
            </div>

            <h3 className="font-display mt-5 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
              <Link
                to={`/solutions/${aiSolution.id}`}
                className="transition-colors hover:text-signal-300"
              >
                {aiSolution.title}
              </Link>
            </h3>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-fog-300">
              {aiSolution.summary}
            </p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/60 p-4">
              <p className="text-xs font-semibold tracking-wide text-fog-400 uppercase">
                Business Requirement
              </p>
              <p className="mt-1 text-sm text-fog-200">{aiSolution.requirement}</p>
            </div>

            {/* Scope / Deliverables tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {aiSolution.scope.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-line bg-ink-900/80 px-2.5 py-1 text-xs text-fog-300"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
            <div className="flex flex-wrap gap-1.5">
              {aiSolution.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[0.6875rem] text-fog-400 bg-ink-800/80 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => toggleFlow(aiSolution.id)}
                className="cursor-pointer text-xs font-semibold text-signal-400 hover:text-signal-300 transition-colors"
              >
                {activeFlowId === aiSolution.id ? 'Hide Pipeline ▲' : 'View Pipeline Flow ▼'}
              </button>
              <ArrowLink to={`/solutions/${aiSolution.id}`}>Full Specs</ArrowLink>
            </div>
          </div>

          {/* Expandable Architecture Pipeline */}
          <AnimatePresence>
            {activeFlowId === aiSolution.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-line-soft mt-5 pt-4"
              >
                <p className="text-xs font-mono text-fog-400 mb-3 uppercase tracking-wider">
                  Operational Flow Architecture:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {aiSolution.flow.map((step, idx) => (
                    <div
                      key={step.label}
                      className="rounded-lg border border-line bg-ink-950/80 p-2.5"
                    >
                      <p className="font-mono text-[0.6875rem] text-signal-400">
                        {String(idx + 1).padStart(2, '0')}. {step.label}
                      </p>
                      <p className="text-[0.75rem] text-fog-400 mt-1">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 2. BENTO CARD: Digital Platforms & Web Apps */}
      {webSolution && (
        <div className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.14)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-800/80 text-fog-100 group-hover:border-signal-400/40 group-hover:text-signal-300 transition-colors">
                <Icon name={ICONS[webSolution.id]} className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold text-fog-500">
                {webSolution.number}
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-fog-50">
              <Link
                to={`/solutions/${webSolution.id}`}
                className="transition-colors hover:text-signal-300"
              >
                {webSolution.title}
              </Link>
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-fog-300">{webSolution.summary}</p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/60 p-3.5">
              <p className="text-xs font-semibold text-fog-400 uppercase">Operational Value</p>
              <p className="mt-1 text-xs text-fog-200">{webSolution.value}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {webSolution.scope.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded border border-line bg-ink-900/60 px-2 py-0.5 text-[0.6875rem] text-fog-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line-soft pt-5">
            <span className="font-mono text-[0.6875rem] text-fog-500">React • APIs • SaaS</span>
            <ArrowLink to={`/solutions/${webSolution.id}`}>Explore</ArrowLink>
          </div>
        </div>
      )}

      {/* 3. BENTO CARD: Internal Tools & Business Systems */}
      {toolsSolution && (
        <div className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.14)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-800/80 text-fog-100 group-hover:border-signal-400/40 group-hover:text-signal-300 transition-colors">
                <Icon name={ICONS[toolsSolution.id]} className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold text-fog-500">
                {toolsSolution.number}
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-fog-50">
              <Link
                to={`/solutions/${toolsSolution.id}`}
                className="transition-colors hover:text-signal-300"
              >
                {toolsSolution.title}
              </Link>
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-fog-300">{toolsSolution.summary}</p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/60 p-3.5">
              <p className="text-xs font-semibold text-fog-400 uppercase">Operational Value</p>
              <p className="mt-1 text-xs text-fog-200">{toolsSolution.value}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {toolsSolution.scope.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded border border-line bg-ink-900/60 px-2 py-0.5 text-[0.6875rem] text-fog-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line-soft pt-5">
            <span className="font-mono text-[0.6875rem] text-fog-500">Dashboards • CRM • Ops</span>
            <ArrowLink to={`/solutions/${toolsSolution.id}`}>Explore</ArrowLink>
          </div>
        </div>
      )}

      {/* 4. BENTO CARD: Connected Infrastructure & APIs */}
      {infraSolution && (
        <div className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.14)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-800/80 text-fog-100 group-hover:border-signal-400/40 group-hover:text-signal-300 transition-colors">
                <Icon name={ICONS[infraSolution.id]} className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold text-fog-500">
                {infraSolution.number}
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-fog-50">
              <Link
                to={`/solutions/${infraSolution.id}`}
                className="transition-colors hover:text-signal-300"
              >
                {infraSolution.title}
              </Link>
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-fog-300">{infraSolution.summary}</p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/60 p-3.5">
              <p className="text-xs font-semibold text-fog-400 uppercase">Architecture Core</p>
              <p className="mt-1 text-xs text-fog-200">{infraSolution.approach}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {infraSolution.scope.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded border border-line bg-ink-900/60 px-2 py-0.5 text-[0.6875rem] text-fog-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line-soft pt-5">
            <span className="font-mono text-[0.6875rem] text-fog-500">APIs • Pipelines • Cloud</span>
            <ArrowLink to={`/solutions/${infraSolution.id}`}>Explore</ArrowLink>
          </div>
        </div>
      )}

      {/* 5. BENTO CARD: System Modernisation */}
      {modernSolution && (
        <div className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.14)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-800/80 text-fog-100 group-hover:border-signal-400/40 group-hover:text-signal-300 transition-colors">
                <Icon name={ICONS[modernSolution.id]} className="size-5" />
              </span>
              <span className="font-mono text-xs font-semibold text-fog-500">
                {modernSolution.number}
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-fog-50">
              <Link
                to={`/solutions/${modernSolution.id}`}
                className="transition-colors hover:text-signal-300"
              >
                {modernSolution.title}
              </Link>
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-fog-300">{modernSolution.summary}</p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/60 p-3.5">
              <p className="text-xs font-semibold text-fog-400 uppercase">Operational Value</p>
              <p className="mt-1 text-xs text-fog-200">{modernSolution.value}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {modernSolution.scope.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded border border-line bg-ink-900/60 px-2 py-0.5 text-[0.6875rem] text-fog-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line-soft pt-5">
            <span className="font-mono text-[0.6875rem] text-fog-500">Refactoring • Decoupling</span>
            <ArrowLink to={`/solutions/${modernSolution.id}`}>Explore</ArrowLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionsBentoGrid

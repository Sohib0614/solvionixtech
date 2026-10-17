import { useState } from 'react'
import { InteractiveArchitecture } from './InteractiveArchitecture'
import { ProjectKpiRibbon } from './ProjectKpiRibbon'
import { UserFlow } from '../common/SystemFlow'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

const SECTION_MAP = [
  { key: 'context', number: '01', title: 'Business Context' },
  { key: 'challenge', number: '02', title: 'The Challenge' },
  { key: 'strategy', number: '03', title: 'Solution Strategy' },
  { key: 'design', number: '04', title: 'Product / System Design' },
  { key: 'architecture', number: '05', title: 'Architecture' },
  { key: 'implementation', number: '06', title: 'Implementation' },
  { key: 'integrations', number: '07', title: 'Integrations' },
  { key: 'outcome', number: '08', title: 'Outcome & Current Status' },
  { key: 'next', number: '09', title: 'Next Evolution' },
]

export function CaseStudy({ project }) {
  const { caseStudy, architecture, userFlow, capabilitiesImplemented, kpis, telemetry } = project
  const [activeJump, setActiveJump] = useState(null)

  const scrollToSection = (key) => {
    setActiveJump(key)
    const el = document.getElementById(`case-study-sec-${key}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* 1. Operational Impact & KPI Ribbon */}
      <ProjectKpiRibbon kpis={kpis} telemetry={telemetry} />

      {/* 2. Quick Section Jump Pills */}
      <div className="sticky top-16 z-30 mb-12 -mx-4 flex items-center gap-1.5 overflow-x-auto border-y border-line-soft bg-ink-950/90 px-4 py-2.5 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border">
        <span className="font-mono text-[0.6875rem] font-bold text-fog-500 uppercase shrink-0 mr-1 hidden sm:inline">
          RFC Stages:
        </span>
        {SECTION_MAP.map((sec) => (
          <button
            key={sec.key}
            type="button"
            onClick={() => scrollToSection(sec.key)}
            className={`cursor-pointer shrink-0 rounded-md px-2.5 py-1 font-mono text-xs transition-all ${
              activeJump === sec.key
                ? 'bg-signal-400 text-ink-950 font-bold shadow-sm'
                : 'bg-ink-900/60 text-fog-400 hover:bg-ink-850 hover:text-fog-200'
            }`}
          >
            {sec.number} {sec.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* 3. The 9-Stage Architectural Case Study */}
      <RevealGroup className="space-y-16 lg:space-y-20">
        {SECTION_MAP.map((section) => {
          if (section.key === 'architecture') {
            if (!architecture?.length) return null

            return (
              <RevealItem key={section.key} y={16}>
                <section id={`case-study-sec-${section.key}`} className="scroll-mt-28">
                  <span className="font-mono text-xs font-bold text-signal-400 uppercase tracking-wider">
                    Stage {section.number}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-base text-fog-300 leading-relaxed max-w-3xl">
                    The layers below run in strictly defined operational boundaries. Each component
                    isolates responsibility, and all interfaces enforce type safety and fault isolation.
                  </p>
                  
                  <InteractiveArchitecture
                    layers={architecture}
                    caption="Read top to bottom or inspect individual nodes for technical boundary guarantees."
                  />
                </section>
              </RevealItem>
            )
          }

          const body = caseStudy[section.key]
          if (!body) return null

          return (
            <RevealItem key={section.key} y={16}>
              <section id={`case-study-sec-${section.key}`} className="scroll-mt-28">
                <span className="font-mono text-xs font-bold text-signal-400 uppercase tracking-wider">
                  Stage {section.number}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                  {section.title}
                </h3>
                
                <div className="mt-4 rounded-xl border border-line-soft bg-ink-900/40 p-6 sm:p-7">
                  <p className="text-base text-fog-200 leading-relaxed sm:text-lg sm:leading-relaxed">
                    {body}
                  </p>

                  {/* Contextual Callouts for Key Sections */}
                  {section.key === 'challenge' && (
                    <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <p className="font-mono text-xs font-bold text-red-300 uppercase">
                        Operational Risk & Impact:
                      </p>
                      <p className="mt-1 text-xs text-fog-300">
                        Prior to this engineering implementation, failures in this phase introduced
                        silent systemic inaccuracies across all downstream dependencies.
                      </p>
                    </div>
                  )}

                  {section.key === 'strategy' && (
                    <div className="mt-5 rounded-lg border border-signal-400/20 bg-signal-400/5 p-4">
                      <p className="font-mono text-xs font-bold text-signal-300 uppercase">
                        Engineering Principle:
                      </p>
                      <p className="mt-1 text-xs text-fog-300">
                        Solve the core business problem with the minimum moving parts. Decouple data
                        capture from third-party storage to guarantee high availability.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {/* Primary User Flow */}
      {userFlow?.length ? (
        <Reveal>
          <section className="mt-16 border-t border-line pt-12 lg:pt-16">
            <span className="font-mono text-xs font-bold text-signal-400 uppercase tracking-wider">
              System Execution Path
            </span>
            <h3 className="mt-2 text-2xl font-bold text-fog-50">Primary User & Data Flow</h3>
            <p className="mt-2 text-sm text-fog-400 max-w-2xl">
              Chronological sequence executed from entry point to persistent storage write.
            </p>
            <div className="mt-8 rounded-xl border border-line bg-ink-900/60 p-6 sm:p-8">
              <UserFlow steps={userFlow} />
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* Implemented Capabilities Checklist */}
      {capabilitiesImplemented?.length ? (
        <Reveal className="mt-16 border-t border-line pt-12 lg:pt-16">
          <section>
            <span className="font-mono text-xs font-bold text-signal-400 uppercase tracking-wider">
              Deliverables Matrix
            </span>
            <h3 className="mt-2 text-2xl font-bold text-fog-50">Implemented Technical Capabilities</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {capabilitiesImplemented.map((cap) => (
                <div
                  key={cap}
                  className="flex items-start gap-3 rounded-xl border border-line bg-ink-900/60 p-4 transition-colors hover:border-signal-400/40"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-signal-400/20 text-xs font-bold text-signal-300">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-fog-200">{cap}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}
    </div>
  )
}

export default CaseStudy

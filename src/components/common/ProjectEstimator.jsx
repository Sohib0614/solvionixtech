import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'

const PROJECT_TYPES = [
  {
    id: 'ai-automation',
    label: 'AI & Automation',
    icon: 'Sparkles',
    desc: 'LLM agents, document intelligence, workflows',
    baseWeeks: 3,
  },
  {
    id: 'web-platform',
    label: 'Web App & SaaS',
    icon: 'Globe',
    desc: 'Custom portals, React frontends, scalable APIs',
    baseWeeks: 4,
  },
  {
    id: 'internal-tools',
    label: 'Business Systems',
    icon: 'Layers',
    desc: 'Internal CRM, inventory sync, operations tooling',
    baseWeeks: 3,
  },
  {
    id: 'integrations',
    label: 'Cloud & API Integration',
    icon: 'Cpu',
    desc: 'High-throughput APIs, database sync, webhooks',
    baseWeeks: 2,
  },
]

const SCOPES = [
  { id: 'mvp', label: 'Rapid MVP / Prototype', weeksMultiplier: 1, desc: 'Fast market validation & core features' },
  { id: 'production', label: 'Full Production Build', weeksMultiplier: 1.8, desc: 'Production-ready with robust architecture' },
  { id: 'enterprise', label: 'Enterprise / Scaled Platform', weeksMultiplier: 2.5, desc: 'Multi-tenant, high-security, custom pipelines' },
]

const FEATURES = [
  { id: 'auth', label: 'Auth & Role Permissions', addedWeeks: 0.5 },
  { id: 'ai-rag', label: 'AI RAG & Document Search', addedWeeks: 1.5 },
  { id: 'payments', label: 'Payment Gateway (Stripe)', addedWeeks: 0.5 },
  { id: 'realtime', label: 'Real-time Sync / WebSockets', addedWeeks: 1 },
  { id: 'analytics', label: 'Executive Analytics Dashboard', addedWeeks: 1 },
  { id: 'integrations', label: 'Third-party API Connectors', addedWeeks: 0.8 },
]

export function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id)
  const [selectedScope, setSelectedScope] = useState(SCOPES[0].id)
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'ai-rag'])

  const activeTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0]
  const activeScopeObj = SCOPES.find((s) => s.id === selectedScope) || SCOPES[0]

  const toggleFeature = (featId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featId) ? prev.filter((id) => id !== featId) : [...prev, featId],
    )
  }

  // Calculate delivery timeline
  const featuresWeeks = selectedFeatures.reduce((acc, featId) => {
    const f = FEATURES.find((item) => item.id === featId)
    return acc + (f ? f.addedWeeks : 0)
  }, 0)

  const totalWeeks = Math.max(
    2,
    Math.round(activeTypeObj.baseWeeks * activeScopeObj.weeksMultiplier + featuresWeeks),
  )

  const estimateParam = encodeURIComponent(
    `Type: ${activeTypeObj.label} | Scope: ${activeScopeObj.label} | Estimated Sprint: ~${totalWeeks} Weeks | Features: ${selectedFeatures.join(', ')}`,
  )

  return (
    <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-2xl sm:p-8 lg:p-10">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-signal-400/15 blur-[100px]"
      />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        {/* Step Controls */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs tracking-wider text-signal-400 uppercase">
              Step 01 / Architecture Scope
            </span>
            <h3 className="font-display mt-1 text-lg font-bold text-fog-50">Select Project Type</h3>
            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              {PROJECT_TYPES.map((type) => {
                const active = selectedType === type.id
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                      active
                        ? 'border-signal-400/80 bg-signal-400/15 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                        : 'border-line bg-ink-950/40 hover:border-line-soft hover:bg-ink-850/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`flex size-7 items-center justify-center rounded-lg ${active ? 'bg-signal-400 text-ink-950 font-bold' : 'bg-ink-800 text-fog-300'}`}>
                        <Icon name={type.icon} className="size-3.5" />
                      </span>
                      <span className="text-sm font-semibold text-fog-100">{type.label}</span>
                    </div>
                    <span className="mt-2 text-xs text-fog-400">{type.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <span className="font-mono text-xs tracking-wider text-signal-400 uppercase">
              Step 02 / Deployment Scale
            </span>
            <h3 className="font-display mt-1 text-lg font-bold text-fog-50">Select Target Scope</h3>
            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
              {SCOPES.map((scope) => {
                const active = selectedScope === scope.id
                return (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setSelectedScope(scope.id)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                      active
                        ? 'border-signal-400/80 bg-signal-400/15 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                        : 'border-line bg-ink-950/40 hover:border-line-soft hover:bg-ink-850/60'
                    }`}
                  >
                    <span className="text-sm font-semibold text-fog-100">{scope.label}</span>
                    <span className="mt-1.5 text-xs text-fog-400">{scope.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <span className="font-mono text-xs tracking-wider text-signal-400 uppercase">
              Step 03 / Capabilities Needed
            </span>
            <h3 className="font-display mt-1 text-lg font-bold text-fog-50">Included Modules</h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {FEATURES.map((feat) => {
                const checked = selectedFeatures.includes(feat.id)
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      checked
                        ? 'border-signal-400/60 bg-signal-400/20 text-signal-200 shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                        : 'border-line bg-ink-950/30 text-fog-400 hover:border-line-soft hover:text-fog-200'
                    }`}
                  >
                    <span>{checked ? '✓' : '+'}</span>
                    <span>{feat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="glass-card flex flex-col justify-between rounded-xl p-6 shadow-2xl border-signal-400/30">
          <div>
            <div className="flex items-center justify-between border-b border-line-soft pb-4">
              <span className="font-mono text-xs tracking-wider text-fog-400 uppercase">
                Sprint Estimation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-400/30 bg-signal-400/10 px-2.5 py-0.5 font-mono text-[0.6875rem] text-signal-200">
                <span className="size-1.5 rounded-full bg-signal-400 animate-pulse" />
                Live Architecture Spec
              </span>
            </div>

            <div className="mt-6">
              <span className="text-xs text-fog-400">Target Delivery Timeline:</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold tracking-tight text-fog-50">
                  ~{totalWeeks} Weeks
                </span>
                <span className="text-xs font-medium text-signal-300">
                  ({Math.round(totalWeeks * 5)} working days)
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-fog-300">Deliverables Guarantee:</p>
              <ul className="space-y-2 text-xs text-fog-400">
                <li className="flex items-center gap-2">
                  <span className="text-signal-300 font-bold">✓</span>
                  <span>100% Full Source Code & IP Handover</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal-300 font-bold">✓</span>
                  <span>Production CI/CD Pipelines & Cloud Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal-300 font-bold">✓</span>
                  <span>Interactive Prototype by Week 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-signal-300 font-bold">✓</span>
                  <span>30-Day Post-Launch Warranty & Monitoring</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-line-soft pt-6">
            <Button
              to={`/contact?estimate=${estimateParam}`}
              variant="primary"
              size="md"
              className="w-full justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_28px_rgba(56,189,248,0.35)]"
            >
              <span>Discuss This Scope With Our Lead</span>
              <span aria-hidden="true">→</span>
            </Button>
            <p className="mt-2 text-center text-[0.6875rem] text-fog-500">
              No obligation. We reply with a detailed technical feasibility review within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectEstimator

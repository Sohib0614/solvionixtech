import { Link } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'

const MODELS = [
  {
    id: 'fixed-sprint',
    title: 'Fixed-Price Sprint',
    eyebrow: 'Fast-Track Delivery',
    tagline: 'Guaranteed scope, agreed milestone timeline, and fixed commitment.',
    idealFor: 'MVPs, new web applications, specific AI agents, and workflow automations.',
    turnaround: '2 – 6 Weeks',
    features: [
      'Strict scope boundary & agreed technical specification',
      'Milestone-based progress with weekly working demos',
      'Production deployment & automated CI/CD pipeline',
      '100% intellectual property & Git repository transfer',
      '14-day post-delivery bug-fix warranty',
    ],
    ctaText: 'Scope a Fixed Sprint',
    popular: false,
    ctaParam: 'Fixed-Price Sprint',
  },
  {
    id: 'dedicated-pod',
    title: 'Dedicated Engineering Pod',
    eyebrow: 'Fractional Engineering Team',
    tagline: 'High-velocity full-stack & AI engineering integrated with your workflow.',
    idealFor: 'SaaS platforms, active product iteration, ongoing automations, and scaling systems.',
    turnaround: 'Monthly Fractional / Pod',
    features: [
      'Senior full-stack & AI engineer aligned with your product backlog',
      'Direct Slack/Discord/WhatsApp channel with daily asynchronous updates',
      'Agile weekly sprints, peer code reviews, and continuous deployments',
      'Zero recruiter overhead, zero long-term vendor lock-in',
      'Flexible cadence: scale up, down, or pause anytime with 14 days notice',
    ],
    ctaText: 'Deploy an Engineering Pod',
    popular: true,
    ctaParam: 'Dedicated Engineering Pod',
  },
  {
    id: 'architecture-advisory',
    title: 'Architecture & Advisory',
    eyebrow: 'Technical Strategy',
    tagline: 'System design, database architecture audit, and AI feasibility blueprint.',
    idealFor: 'Founders vetting feasibility, legacy modernization audits, and database scaling.',
    turnaround: '1 – 2 Weeks',
    features: [
      'Comprehensive codebase, schema, and security architecture audit',
      'Production-ready System Design Specification & Architecture RFC',
      'AI model selection, token economics, and LLM latency evaluation',
      'Cloud cost optimization & infrastructure scaling roadmap',
      'Executive technical findings presentation for leadership & investors',
    ],
    ctaText: 'Book Architecture Review',
    popular: false,
    ctaParam: 'Architecture Advisory',
  },
]

export function EngagementModels() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {MODELS.map((model) => (
        <div
          key={model.id}
          className={`glass-card relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all duration-300 ${
            model.popular
              ? 'border-signal-400/80 shadow-[0_0_40px_rgba(56,189,248,0.22)] ring-1 ring-signal-400/50'
              : 'hover:border-signal-400/40 hover:shadow-xl'
          }`}
        >
          {model.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-signal-400 px-3.5 py-1 font-mono text-[0.6875rem] font-bold text-ink-950 tracking-wider uppercase shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                Most Popular
              </span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-signal-400 uppercase tracking-wider">
                {model.eyebrow}
              </span>
              <span className="rounded-md border border-line bg-ink-850 px-2.5 py-0.5 font-mono text-[0.6875rem] text-fog-400">
                {model.turnaround}
              </span>
            </div>

            <h3 className="font-display mt-3 text-2xl font-bold text-fog-50">{model.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog-300">{model.tagline}</p>

            <div className="mt-5 rounded-xl border border-line-soft bg-ink-950/70 p-3.5">
              <p className="font-mono text-[0.6875rem] font-semibold text-fog-400 uppercase tracking-wider">
                Best Suited For:
              </p>
              <p className="mt-1 text-xs text-fog-200">{model.idealFor}</p>
            </div>

            <div className="mt-6 space-y-3">
              <p className="font-mono text-[0.6875rem] font-semibold text-fog-400 uppercase tracking-wider">
                What is included:
              </p>
              <ul className="space-y-2.5">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-fog-300">
                    <span className="shrink-0 text-signal-400 font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-line-soft pt-6">
            <Button
              to={`/contact?estimate=${encodeURIComponent(model.ctaParam)}`}
              variant={model.popular ? 'primary' : 'secondary'}
              className="w-full justify-center text-xs sm:text-sm"
            >
              {model.ctaText} →
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EngagementModels

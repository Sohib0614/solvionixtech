import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import {
  Clock,
  MessageSquareCheck,
  Network,
  BarChart3,
  Rocket,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react'

const CLIENT_PROBLEMS = [
  {
    id: 'automation',
    badge: 'Manual Overhead',
    icon: Clock,
    problem: 'Too much repetitive manual work slowing down the team',
    symptom: 'Staff spending 10–20 hours every week copy-pasting data, sending routine follow-ups, and handling manual paperwork.',
    solution: 'AI workflow automation, document processing, and custom background bots.',
    outcome: 'Reduce manual tasks by 70%+, freeing up senior staff for revenue-generating work.',
    solutionLink: '/solutions/intelligent-systems',
    solutionLabel: 'Intelligent Systems & AI',
  },
  {
    id: 'support',
    badge: 'Customer Response Lag',
    icon: MessageSquareCheck,
    problem: 'Customers waiting hours or days for answers & quotes',
    symptom: 'Inbound inquiries arrive after hours, quotes get delayed in email inboxes, and leads bounce to competitors before anyone replies.',
    solution: '24/7 AI conversational assistants, instant quote generators, and automated scheduling.',
    outcome: 'Instant under-60-second response time 24/7, capturing leads while your team sleeps.',
    solutionLink: '/solutions/intelligent-systems',
    solutionLabel: 'AI Assistants & Receptionists',
  },
  {
    id: 'integrations',
    badge: 'Disconnected Tools',
    icon: Network,
    problem: 'Business tools and software don’t talk to each other',
    symptom: 'Customer records, inventory, and accounting live in separate silos, requiring fragile CSV exports and double-entry.',
    solution: 'Custom API bridges, real-time sync webhooks, and secure central database pipelines.',
    outcome: 'Zero manual re-entry. Changes in your CRM immediately update operations and finance.',
    solutionLink: '/solutions/connected-infrastructure',
    solutionLabel: 'Connected Infrastructure',
  },
  {
    id: 'data',
    badge: 'Dark Data',
    icon: BarChart3,
    problem: 'Business data is trapped in messy spreadsheets',
    symptom: 'Leadership lacks real-time visibility into profit margins, customer churn, or operational bottlenecks.',
    solution: 'Automated executive dashboards, Postgres analytical warehouses, and predictive ML models.',
    outcome: 'Clear, real-time operational metrics delivered weekly with zero spreadsheet wrangling.',
    solutionLink: '/solutions/intelligent-systems',
    solutionLabel: 'Data & Analytics',
  },
  {
    id: 'software',
    badge: 'Product Development',
    icon: Rocket,
    problem: 'Need a digital product or SaaS built without technical debt',
    symptom: 'An ambitious startup idea or internal tool is stalled because hiring an in-house engineering team is too slow or costly.',
    solution: 'Production-ready web applications, multi-tenant SaaS MVPs, and client portals.',
    outcome: 'Launch a fully tested, secure product in 2–6 week sprints with 100% IP ownership.',
    solutionLink: '/solutions/digital-products',
    solutionLabel: 'Digital Products & SaaS',
  },
]

export function ClientProblems() {
  const [activeProblemId, setActiveProblemId] = useState(CLIENT_PROBLEMS[0].id)
  const activeProblem = CLIENT_PROBLEMS.find((p) => p.id === activeProblemId) || CLIENT_PROBLEMS[0]

  return (
    <div className="relative">
      {/* Problem Selector Tabs (Mobile & Desktop) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CLIENT_PROBLEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeProblemId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveProblemId(item.id)}
              className={`glass-card group relative flex flex-col items-start rounded-2xl p-5 text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-signal-400 bg-signal-400/10 shadow-[0_0_24px_rgba(56,189,248,0.2)]'
                  : 'hover:border-signal-400/40 hover:bg-ink-900/60'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? 'bg-signal-400 text-ink-950 font-bold shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                      : 'bg-ink-800 text-fog-400 group-hover:text-fog-200'
                  }`}
                >
                  <Icon className="size-4.5" />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-wider ${
                    isActive
                      ? 'bg-signal-400/20 text-signal-300'
                      : 'bg-ink-900 text-fog-500'
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <h3
                className={`mt-4 text-xs font-semibold leading-snug sm:text-sm ${
                  isActive ? 'text-fog-50 font-bold' : 'text-fog-300 group-hover:text-fog-100'
                }`}
              >
                {item.problem}
              </h3>

              {isActive && (
                <div className="mt-3 flex items-center gap-1.5 text-[0.6875rem] font-mono font-medium text-signal-400">
                  <span>Selected challenge</span>
                  <ArrowRight className="size-3" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Problem Deep-Dive Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProblem.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="glass-card mt-6 overflow-hidden rounded-3xl border-signal-400/30 p-6 sm:p-8 lg:p-10 shadow-2xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 items-center">
            {/* Left: The Challenge & The Solvionix Engineered Fix */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-signal-400">
                <Sparkles className="size-4" />
                <span>The Solvionix Blueprint</span>
              </div>

              <h3 className="font-display mt-3 text-xl font-bold tracking-tight text-fog-50 sm:text-2xl lg:text-3xl">
                {activeProblem.problem}
              </h3>

              {/* Symptom Callout */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-fog-300 sm:text-sm">
                <AlertCircle className="size-4.5 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong className="text-amber-300 font-semibold block mb-0.5">
                    What breaks today:
                  </strong>
                  <span>{activeProblem.symptom}</span>
                </div>
              </div>

              {/* Solution */}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-signal-400/20 bg-signal-400/5 p-4 text-xs text-fog-300 sm:text-sm">
                <CheckCircle2 className="size-4.5 shrink-0 text-signal-400 mt-0.5" />
                <div>
                  <strong className="text-signal-300 font-semibold block mb-0.5">
                    How Solvionix engineers the solution:
                  </strong>
                  <span>{activeProblem.solution}</span>
                </div>
              </div>
            </div>

            {/* Right: Business Outcome & Direct Action */}
            <div className="flex flex-col justify-between rounded-2xl border border-line bg-ink-950/80 p-6 sm:p-8">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fog-400">
                  Target Business Outcome
                </span>
                <p className="mt-3 text-lg font-bold leading-snug text-fog-50 sm:text-xl">
                  "{activeProblem.outcome}"
                </p>

                <div className="mt-6 border-t border-line-soft pt-4 text-xs text-fog-400">
                  <span className="text-fog-500 block mb-1">Architecture Category:</span>
                  <Link
                    to={activeProblem.solutionLink}
                    className="font-medium text-signal-300 hover:text-signal-200 inline-flex items-center gap-1.5"
                  >
                    <span>{activeProblem.solutionLabel}</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  to={`/contact?problem=${activeProblem.id}`}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  <span>Discuss This Problem With an Engineer</span>
                  <ArrowRight className="size-4 ml-1" />
                </Button>

                <p className="text-center font-mono text-[0.6875rem] text-fog-500">
                  No technical specification needed · Tell us what’s happening
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ClientProblems

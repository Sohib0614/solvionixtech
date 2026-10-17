import { Icon } from '../ui/Icon'

const GUARANTEES = [
  {
    title: '100% IP & Code Ownership',
    description: 'You own every line of code, documentation, and database schema. All Git repositories and deployment keys are transferred in full.',
    badge: 'Zero Lock-in',
    icon: 'Code2',
  },
  {
    title: 'SOC2 & GDPR-Aligned Security',
    description: 'End-to-end encryption in transit (TLS 1.3) and at rest (AES-256). Strict role-based access control and principle-of-least-privilege policies.',
    badge: 'Enterprise Security',
    icon: 'Check',
  },
  {
    title: 'Automated CI/CD & Clean Pipelines',
    description: 'Containerized environments with Docker, linting, regression testing, and reproducible automated deployments on AWS or your cloud.',
    badge: 'Clean Code',
    icon: 'Workflow',
  },
  {
    title: 'High-Availability Architecture',
    description: 'Designed for 99.9% uptime with health check telemetry, auto-restarting services, managed backups, and structured operational logging.',
    badge: '99.9% Reliability',
    icon: 'Layers',
  },
]

export function TrustGuarantees() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {GUARANTEES.map((item) => (
        <div
          key={item.title}
          className="group relative flex flex-col justify-between rounded-xl border border-line bg-ink-900/60 p-6 transition-all duration-300 hover:border-signal-400/40 hover:bg-ink-850 hover:shadow-[0_0_25px_rgba(56,189,248,0.1)]"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-9 items-center justify-center rounded-lg border border-signal-400/20 bg-signal-400/10 text-signal-400">
                <Icon name={item.icon} className="size-4" />
              </span>
              <span className="font-mono text-[0.625rem] font-semibold text-fog-400 uppercase tracking-wider">
                {item.badge}
              </span>
            </div>

            <h3 className="mt-4 text-base font-bold text-fog-50">{item.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-fog-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrustGuarantees

import { Icon } from '../ui/Icon'

export function ProjectKpiRibbon({ kpis, telemetry }) {
  if (!kpis?.length) return null

  return (
    <div className="mb-14 space-y-4">
      {/* Telemetry quick bar */}
      {telemetry && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-ink-950/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-fog-300 uppercase tracking-wider">
              Architecture Telemetry
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-fog-400">
            {telemetry.latency && (
              <span>
                <strong className="text-fog-500 font-normal">Latency:</strong>{' '}
                <span className="text-signal-300 font-medium">{telemetry.latency}</span>
              </span>
            )}
            {telemetry.security && (
              <span>
                <strong className="text-fog-500 font-normal">Security:</strong>{' '}
                <span className="text-fog-200">{telemetry.security}</span>
              </span>
            )}
            {telemetry.integrity && (
              <span>
                <strong className="text-fog-500 font-normal">Integrity:</strong>{' '}
                <span className="text-fog-200">{telemetry.integrity}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* KPI 4-Card Ribbon */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, idx) => (
          <div
            key={kpi.label}
            className="group relative flex flex-col justify-between rounded-xl border border-line bg-gradient-to-b from-ink-900 to-ink-950 p-5 shadow-md transition-all duration-300 hover:border-signal-400/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
          >
            <div>
              <span className="font-mono text-[0.625rem] font-semibold text-fog-600 uppercase tracking-wider">
                Benchmark 0{idx + 1}
              </span>
              <p className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-signal-400">
                {kpi.value}
              </p>
              <p className="mt-1 text-sm font-bold text-fog-100">{kpi.label}</p>
            </div>
            <p className="mt-3 border-t border-line-soft pt-2.5 text-xs text-fog-400 leading-relaxed">
              {kpi.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectKpiRibbon

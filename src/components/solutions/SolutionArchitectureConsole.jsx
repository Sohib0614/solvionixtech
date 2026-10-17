import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { Layers, ShieldCheck, Cpu, ArrowRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react'

// Protocol mappings for architectural layers
const defaultLayerProtocols = {
  0: { protocol: 'HTTPS / TLS 1.3', boundary: 'External Ingress', latency: '< 30ms', failure: 'Immediate rejection with HTTP 400 & schema validation trace' },
  1: { protocol: 'Async Worker Queue', boundary: 'Pipeline Ingestion', latency: '< 50ms', failure: '3x exponential backoff retry; persistent queue buffering' },
  2: { protocol: 'Internal gRPC / Pydantic', boundary: 'Processing Kernel', latency: '< 180ms', failure: 'Isolated worker termination with task rerun without state corruption' },
  3: { protocol: 'Deterministic Rule Engine', boundary: 'Decision Gate', latency: '< 15ms', failure: 'Default fallback to strict review queue; no silent passes' },
  4: { protocol: 'Role-Gated WebSocket / REST', boundary: 'Human-in-the-Loop', latency: 'Operator Paced', failure: 'Configurable escalation SLA with alert to supervisor' },
  5: { protocol: 'ACID PostgreSQL / WAL', boundary: 'System of Record', latency: '< 25ms commit', failure: 'Atomic transaction rollback; WAL replay for crash recovery' },
}

export function SolutionArchitectureConsole({ solution, className = '' }) {
  const [activeTab, setActiveTab] = useState('pipeline') // 'pipeline' | 'specs'
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0)

  if (!solution?.flow?.length) return null

  const layers = solution.flow
  const activeLayer = layers[selectedLayerIndex] || layers[0]
  const activeMeta = defaultLayerProtocols[selectedLayerIndex] || {
    protocol: 'Internal RPC',
    boundary: 'Inter-service Boundary',
    latency: '< 50ms',
    failure: 'Isolated retry with audit logging'
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-ink-950/90 shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-ink-900/60 px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-signal-400 animate-pulse" />
            <span className="size-2 rounded-full bg-signal-400/40" />
            <span className="size-2 rounded-full bg-signal-400/20" />
          </div>
          <span className="font-mono text-xs tracking-wider text-fog-400 uppercase">
            ARCH // {solution.id}.spec
          </span>
          <span className="hidden sm:inline-block rounded border border-signal-400/30 bg-signal-400/10 px-2 py-0.5 font-mono text-[11px] text-signal-300">
            {layers.length}-LAYER PIPELINE
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center rounded-lg border border-line bg-ink-950/80 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'pipeline'
                ? 'bg-ink-800 text-signal-300 shadow-sm border border-line-soft font-semibold'
                : 'text-fog-400 hover:text-fog-200'
            }`}
          >
            <Layers className="size-3.5" />
            <span>Interactive Flow</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
              activeTab === 'specs'
                ? 'bg-ink-800 text-signal-300 shadow-sm border border-line-soft font-semibold'
                : 'text-fog-400 hover:text-fog-200'
            }`}
          >
            <Cpu className="size-3.5" />
            <span>Contract Spec</span>
          </button>
        </div>
      </div>

      {/* Main Console Content */}
      <div className="p-5 sm:p-7">
        {activeTab === 'pipeline' ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* Left: Interactive Layer Sequence */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-fog-500">
                  Data Execution Sequence (Click layer to inspect)
                </span>
                <span className="text-xs font-mono text-signal-400">
                  Layer {selectedLayerIndex + 1} of {layers.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {layers.map((layer, index) => {
                  const isSelected = selectedLayerIndex === index
                  const meta = defaultLayerProtocols[index] || defaultLayerProtocols[1]

                  return (
                    <motion.div
                      key={layer.label}
                      initial={false}
                      animate={{
                        borderColor: isSelected ? 'rgba(52, 211, 153, 0.45)' : 'rgba(255, 255, 255, 0.08)',
                        backgroundColor: isSelected ? 'rgba(52, 211, 153, 0.06)' : 'rgba(24, 24, 27, 0.45)'
                      }}
                      onClick={() => setSelectedLayerIndex(index)}
                      className="group relative cursor-pointer rounded-xl border p-3.5 sm:p-4 transition-all hover:border-line-soft"
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-signal-400" />
                      )}

                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-mono text-xs font-bold shrink-0 ${
                              isSelected ? 'text-signal-300' : 'text-fog-500'
                            }`}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4
                              className={`text-sm font-semibold transition-colors ${
                                isSelected ? 'text-fog-50 font-bold' : 'text-fog-200 group-hover:text-fog-50'
                              }`}
                            >
                              {layer.label}
                            </h4>
                            <p className="mt-1 text-xs text-fog-400 line-clamp-1">
                              {layer.detail}
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                          <span className="rounded bg-ink-900 border border-line-soft px-2 py-0.5 font-mono text-[10px] text-fog-300">
                            {meta.protocol}
                          </span>
                          <span className="font-mono text-[10px] text-fog-500">
                            {meta.latency}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: Selected Layer Telemetry Inspector */}
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-fog-500 pb-2">
                Layer Telemetry & Interface Contract
              </span>

              <div className="flex-1 rounded-xl border border-line bg-ink-900/50 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-line-soft pb-4">
                    <div>
                      <span className="font-mono text-xs text-signal-400">
                        LAYER {String(selectedLayerIndex + 1).padStart(2, '0')} // INTERFACE
                      </span>
                      <h3 className="text-lg font-bold text-fog-50 mt-0.5">
                        {activeLayer.label}
                      </h3>
                    </div>
                    <span className="rounded-full border border-signal-400/30 bg-signal-400/10 px-2.5 py-1 text-xs font-mono text-signal-300">
                      Active Node
                    </span>
                  </div>

                  {/* Operational Detail */}
                  <div className="mt-5 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-fog-500">
                        Architectural Responsibility
                      </span>
                      <p className="mt-1 text-sm text-fog-200 leading-relaxed">
                        {activeLayer.detail}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="rounded-lg border border-line-soft bg-ink-950/60 p-3">
                        <div className="flex items-center gap-1.5 text-fog-400 text-xs font-mono">
                          <Cpu className="size-3 text-signal-400" />
                          <span>Interface Protocol</span>
                        </div>
                        <p className="mt-1 font-mono text-xs font-semibold text-fog-100">
                          {activeMeta.protocol}
                        </p>
                      </div>

                      <div className="rounded-lg border border-line-soft bg-ink-950/60 p-3">
                        <div className="flex items-center gap-1.5 text-fog-400 text-xs font-mono">
                          <Clock className="size-3 text-signal-400" />
                          <span>Latency Budget</span>
                        </div>
                        <p className="mt-1 font-mono text-xs font-semibold text-fog-100">
                          {activeMeta.latency}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-line-soft bg-ink-950/60 p-3.5">
                      <div className="flex items-center gap-1.5 text-fog-400 text-xs font-mono">
                        <ShieldCheck className="size-3.5 text-signal-400" />
                        <span>System Boundary</span>
                      </div>
                      <p className="mt-1 text-xs text-fog-300">
                        {activeMeta.boundary} — strictly isolated from surrounding layers with defined contracts.
                      </p>
                    </div>

                    <div className="rounded-lg border border-line-soft bg-ink-950/60 p-3.5">
                      <div className="flex items-center gap-1.5 text-amber-400/90 text-xs font-mono">
                        <AlertTriangle className="size-3.5 text-amber-400" />
                        <span>Fault Tolerance & Recovery</span>
                      </div>
                      <p className="mt-1 text-xs text-fog-300">
                        {activeMeta.failure}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line-soft flex items-center justify-between text-xs text-fog-500 font-mono">
                  <span>Audit Trail: Enforced</span>
                  <span>Zero-Leak Boundary</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Specification Matrix Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line text-xs font-mono uppercase tracking-wider text-fog-400">
                  <th className="pb-3 pr-4 font-semibold">Stage</th>
                  <th className="pb-3 pr-4 font-semibold">Layer Name</th>
                  <th className="pb-3 pr-4 font-semibold">Operational Role</th>
                  <th className="pb-3 pr-4 font-semibold">Protocol / Interface</th>
                  <th className="pb-3 pr-4 font-semibold">Latency Target</th>
                  <th className="pb-3 font-semibold">Failure Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft font-mono text-xs">
                {layers.map((layer, index) => {
                  const meta = defaultLayerProtocols[index] || defaultLayerProtocols[1]
                  return (
                    <tr key={layer.label} className="hover:bg-ink-900/40 transition-colors">
                      <td className="py-3.5 pr-4 text-signal-400 font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3.5 pr-4 text-fog-100 font-semibold font-sans">
                        {layer.label}
                      </td>
                      <td className="py-3.5 pr-4 text-fog-300 font-sans max-w-xs">
                        {layer.detail}
                      </td>
                      <td className="py-3.5 pr-4 text-signal-300">
                        <span className="rounded bg-ink-900 border border-line-soft px-2 py-0.5">
                          {meta.protocol}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-fog-400">
                        {meta.latency}
                      </td>
                      <td className="py-3.5 text-fog-400 font-sans text-[11px] max-w-xs">
                        {meta.failure}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer telemetry ribbon */}
      <div className="border-t border-line bg-ink-900/40 px-5 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fog-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-signal-400" />
            <span className="font-sans text-fog-300">
              Deterministic boundaries — each layer has one responsibility and communicates only across interface contracts.
            </span>
          </div>
          <span className="font-mono text-[11px] text-fog-500">
            SPEC V3.2 // PRODUCTION VERIFIED
          </span>
        </div>
      </div>
    </div>
  )
}

export default SolutionArchitectureConsole

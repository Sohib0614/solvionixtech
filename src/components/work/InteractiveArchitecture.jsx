import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '../ui/Icon'

export function InteractiveArchitecture({ layers, caption }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [viewMode, setViewMode] = useState('canvas') // canvas | table

  if (!layers?.length) return null

  const activeLayer = layers[activeIdx] || layers[0]

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-ink-900 to-ink-950 p-6 sm:p-8 shadow-xl">
      {/* Header with View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft pb-5">
        <div>
          <span className="font-mono text-xs font-semibold text-signal-400 uppercase tracking-wider">
            Architecture Blueprint
          </span>
          <h4 className="mt-1 text-lg font-bold text-fog-50">
            Multi-Layer System Flow & Boundaries
          </h4>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-line bg-ink-950 p-1">
          <button
            type="button"
            onClick={() => setViewMode('canvas')}
            className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'canvas'
                ? 'bg-signal-400 text-ink-950 shadow-sm'
                : 'text-fog-400 hover:text-fog-200'
            }`}
          >
            Interactive Canvas
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-signal-400 text-ink-950 shadow-sm'
                : 'text-fog-400 hover:text-fog-200'
            }`}
          >
            Specification Table
          </button>
        </div>
      </div>

      {viewMode === 'canvas' ? (
        <div className="mt-8 space-y-8">
          {/* Node Flow Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {layers.map((layer, idx) => {
              const isSelected = activeIdx === idx
              return (
                <button
                  key={layer.label}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-signal-400 bg-signal-400/10 ring-1 ring-signal-400 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                      : 'border-line bg-ink-950/70 hover:border-line hover:bg-ink-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-signal-300' : 'text-fog-600 group-hover:text-fog-400'
                      }`}
                    >
                      Layer {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`size-2 rounded-full ${
                        isSelected ? 'bg-signal-400 animate-ping' : 'bg-line'
                      }`}
                    />
                  </div>

                  <p
                    className={`mt-3 text-sm font-bold ${
                      isSelected ? 'text-fog-50' : 'text-fog-200 group-hover:text-fog-100'
                    }`}
                  >
                    {layer.label}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-fog-500">{layer.detail}</p>
                </button>
              )
            })}
          </div>

          {/* Active Node Detail Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-line-soft bg-ink-950 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg border border-signal-400/30 bg-signal-400/10 font-mono text-xs font-bold text-signal-400">
                    {String(activeIdx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h5 className="text-base font-bold text-fog-50">{activeLayer.label}</h5>
                    <p className="text-xs text-fog-400">Technical Layer Specification</p>
                  </div>
                </div>

                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[0.6875rem] font-semibold text-emerald-300">
                  Isolated Boundary
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs font-semibold text-fog-400 uppercase">
                    Role & Responsibilities:
                  </p>
                  <p className="mt-1 text-sm text-fog-200 leading-relaxed">
                    {activeLayer.detail}
                  </p>
                </div>

                <div className="rounded-lg border border-line bg-ink-900/60 p-3.5">
                  <p className="font-mono text-[0.6875rem] font-semibold text-fog-400 uppercase tracking-wider">
                    Interface Guarantees:
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-fog-300">
                    <li className="flex items-center gap-1.5">
                      <span className="text-signal-400 font-bold">✓</span>
                      <span>Strict protocol schema validation at boundary</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="text-signal-400 font-bold">✓</span>
                      <span>Decoupled fail-safe error isolation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Table Specification View */
        <div className="mt-6 overflow-hidden rounded-xl border border-line bg-ink-950">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line bg-ink-900 font-mono uppercase text-fog-400">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Layer / Component</th>
                <th className="px-4 py-3">Technical Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {layers.map((layer, index) => (
                <tr key={layer.label} className="hover:bg-ink-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-signal-400">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3 font-semibold text-fog-100">{layer.label}</td>
                  <td className="px-4 py-3 text-fog-400 leading-relaxed">{layer.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {caption && (
        <p className="mt-5 text-center text-xs text-fog-500 font-mono">
          ℹ {caption}
        </p>
      )}
    </div>
  )
}

export default InteractiveArchitecture

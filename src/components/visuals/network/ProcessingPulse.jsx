import { memo } from 'react'

/**
 * The moment data is processed.
 *
 * Three rings leaving the core on the beat its own inbound traffic arrives, and a
 * short arc that draws itself in behind them. The whole thing is one CSS animation
 * whose period and phase come from a real route, so the flash is not "every two
 * seconds" — it is "when something arrives", and the two stay locked because they
 * are derived from the same numbers rather than watched.
 *
 * `vectorEffect` keeps every stroke a hairline at any scale, which is what lets the
 * rings be drawn at full radius and then scaled outward without them thickening
 * into a blob at the start of the pulse. Without it the near ring would be four
 * times the weight of the far one by the time it reached it.
 *
 * The innermost ring is the core's main ring, not something tighter. A ring drawn
 * inside the wordmark's own width would sweep straight through the name as it
 * expands, and the name is the one thing in this composition that must never be
 * crossed.
 */
export const ProcessingPulse = memo(function ProcessingPulse({ core, beat }) {
  return (
    <g
      className="pulse"
      style={{
        transformBox: 'view-box',
        transformOrigin: `${core.x}px ${core.y}px`,
        '--beat-period': `${beat.period}s`,
        '--beat-delay': `${beat.delay}s`,
      }}
    >
      <circle
        className="pulse-ring pulse-ring--near"
        cx={core.x}
        cy={core.y}
        r={core.ring}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        className="pulse-ring pulse-ring--mid"
        cx={core.x}
        cy={core.y}
        r={core.outer * 1.06}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        className="pulse-ring pulse-ring--far"
        cx={core.x}
        cy={core.y}
        r={core.outer * 1.26}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  )
})

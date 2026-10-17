import { memo, useMemo } from 'react'
import { ProcessingPulse } from './ProcessingPulse'

/**
 * The company core: the rings the name sits inside, and the place the data is
 * processed.
 *
 * Deliberately not a glowing orb. A real radial falloff lives in CSS behind the
 * drawing, because light behind glass and a flat disc are different objects, and
 * because a lit disc behind the name would compete with it — inverting the
 * hierarchy the whole composition is built around. The core earns its brightness
 * by reacting, not by being lit.
 *
 * Three nested groups, one transform each, because the three things that move here
 * all want the same element and would otherwise overwrite each other:
 * `.core-layer` takes the pointer parallax, `.core` takes the entrance, and
 * `.core-spin` takes the rotation.
 *
 * The outer ring turns roughly once every ninety seconds. Any faster and a
 * rotating circle stops being a structure and becomes a spinner.
 */
export const BrandCore = memo(function BrandCore({ core, beat }) {
  const { x, y, ring, outer, inner } = core

  /** Graduation marks around the inner ring, every fourth one longer. */
  const ticks = useMemo(() => {
    const count = 48
    return Array.from({ length: count }, (_, index) => {
      const radians = ((index * 360) / count) * (Math.PI / 180)
      const major = index % 4 === 0
      const length = major ? 9 : 4.5
      const radius = inner - 3
      return {
        key: index,
        x1: +(x + radius * Math.cos(radians)).toFixed(1),
        y1: +(y + radius * Math.sin(radians)).toFixed(1),
        x2: +(x + (radius - length) * Math.cos(radians)).toFixed(1),
        y2: +(y + (radius - length) * Math.sin(radians)).toFixed(1),
        major,
      }
    })
  }, [x, y, inner])

  /** Four fixed pips on the axes, so the eye has something static to hold. */
  const pips = useMemo(
    () =>
      [0, 90, 180, 270].map((degrees) => {
        const radians = (degrees * Math.PI) / 180
        return {
          key: degrees,
          x: +(x + (ring - 1) * Math.cos(radians)).toFixed(1),
          y: +(y + (ring - 1) * Math.sin(radians)).toFixed(1),
        }
      }),
    [x, y, ring],
  )

  return (
    <g className="core-layer">
      <g className="core" style={{ transformOrigin: `${x}px ${y}px` }}>
        <ProcessingPulse core={core} beat={beat} />

        <g className="core-spin" style={{ transformOrigin: `${x}px ${y}px` }}>
          <circle className="core-ring-outer" cx={x} cy={y} r={outer} pathLength={1} />
          {ticks.map((tick) => (
            <line
              key={tick.key}
              className={tick.major ? 'core-tick core-tick--major' : 'core-tick'}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <circle className="core-ring" cx={x} cy={y} r={ring} vectorEffect="non-scaling-stroke" />
        <circle className="core-ring-inner" cx={x} cy={y} r={inner} vectorEffect="non-scaling-stroke" />

        {pips.map((pip) => (
          <circle key={pip.key} className="core-pip" cx={pip.x} cy={pip.y} r={1.9} />
        ))}
      </g>
    </g>
  )
})

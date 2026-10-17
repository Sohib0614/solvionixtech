import { memo } from 'react'

/**
 * One transfer, in flight.
 *
 * A packet is two elements, and the split is the whole point of the visual:
 *
 *   head  a filled disc that is *moved along the route* by `offset-path`, using the
 *         route's own path data. It is a real element travelling a real line, not
 *         a dash sliding along a stroke — which is the difference between a line
 *         that is lit up and a line that is carrying something.
 *
 *   wake  a short, brighter segment of the route immediately behind the head,
 *         lit by animating `stroke-dashoffset` over a normalised path.
 *
 * They are kept in step without a single line of JavaScript. Both animations run
 * for the route's full `duration` and both start `offset` seconds in, so at any
 * moment the head is at `offset-distance: p` and the wake is the segment
 * `[p - wake, p]` of the same path. Same period, same phase, one timeline: they
 * cannot drift.
 *
 * `pathLength={1}` on the wake normalises the route to a length of one, so the
 * wake covers the same fraction of a 60-unit stub as it does of a 400-unit run,
 * and no `getTotalLength()` is ever called.
 */
const WAKE = 0.14

/** Where a frozen packet comes to rest, so reduced motion still has something to look at. */
const REST = [0.32, 0.68]

export const DataPacket = memo(function DataPacket({ route, offset, index }) {
  const inbound = route.direction === 'inbound'
  const rest = REST[index % REST.length]

  return (
    <g
      className="pkt"
      style={{
        '--pkt-dur': `${route.timing.duration}s`,
        '--pkt-delay': `${-offset}s`,
        '--pkt-wake': WAKE,
        '--pkt-rest': `${rest * 100}%`,
        '--pkt-rest-wake': WAKE - rest,
      }}
    >
      <path className="pkt-wake" d={route.d} pathLength={1} vectorEffect="non-scaling-stroke" />

      {/*
        `offset-path` is set inline rather than through a custom property on the
        parent group. The path data lives in exactly one place either way — the
        route object — but a quoted path string resolved through `var()` inside
        `path()` is parsed late enough to be a portability question, and this is
        the one line the whole visual rests on.
      */}
      <circle
        className="pkt-head"
        cx={0}
        cy={0}
        r={8 * route.size}
        fill={`url(#pkt-${inbound ? 'in' : 'out'}-glow)`}
        style={{ offsetPath: `path("${route.d}")` }}
      />
    </g>
  )
})

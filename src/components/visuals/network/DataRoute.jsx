import { DataPacket } from './DataPacket'
import { packetOffsets } from './dataFlowConfig'

/**
 * A single route, from one node to another.
 *
 * Three strokes per route and each answers a different question:
 *
 *   base     the inert run. Present from the first frame, and the only part of the
 *            route that exists in reduced motion.
 *   carrier  a very faint dash running continuously underneath. It says the line
 *            is a conduit rather than a piece of decoration, and it is deliberately
 *            dim enough that it is never mistaken for the signal.
 *   packets  the actual transfers, which carry the lit wake behind them.
 *
 * The route is drawn once on load, staggered by index, because a network that is
 * already assembled before the page finishes painting looks like a screenshot.
 * Everything after that is a loop.
 */
export function DataRoute({ route, index = 0 }) {
  return (
    <g className="route" data-route={route.id} data-direction={route.direction}>
      <path
        className="route-base"
        d={route.d}
        pathLength={1}
        vectorEffect="non-scaling-stroke"
        style={{ '--draw-delay': `${(index * 70)}ms` }}
      />

      <path
        className="route-carrier"
        d={route.d}
        pathLength={1}
        vectorEffect="non-scaling-stroke"
        style={{ '--carrier-dur': `${(route.timing.duration * 1.7).toFixed(2)}s` }}
      />

      {packetOffsets(route).map((offset, packetIndex) => (
        <DataPacket
          key={`${route.id}-${packetIndex}`}
          route={route}
          offset={offset}
          index={packetIndex}
        />
      ))}
    </g>
  )
}

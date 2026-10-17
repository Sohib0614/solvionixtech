import { BrandCore } from './BrandCore'
import { DataRoute } from './DataRoute'

/**
 * The drawing.
 *
 * Purely decorative, so the whole SVG is hidden from assistive technology and the
 * labels layered over it carry the meaning. Groups are split into depth bands
 * rather than drawn in document order, because the parallax moves each band a
 * different distance and that separation is the only thing giving the network
 * depth.
 *
 * Nothing here animates through React. Every moving pixel belongs to a CSS
 * animation on a transform, a stroke offset or an `offset-distance`, which means
 * the network costs nothing in re-renders no matter how long the page is open.
 */
export function NetworkCanvas({ layout, routes, nodes, idleRuns, core, coreBeat }) {
  return (
    <svg
      className="flow-svg"
      viewBox={layout.viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          Packet glows.

          A radial gradient rather than a filter, for the same reason the old scene
          avoided WebGL: this has to render identically on a machine with no GPU. A
          drop-shadow filter on thirteen elements that are in constant motion is
          also the single most expensive thing this drawing could ask for, and the
          gradient is one texture lookup.

          Inbound is paler than outbound. Two hues from one ramp is a weak
          distinction, so the two are separated by value instead — an arriving
          packet is closer to white, a departing one is fully accent.
        */}
        <radialGradient id="pkt-in-glow">
          <stop className="pkt-core pkt-core--in" offset="0" />
          <stop className="pkt-core pkt-core--in" offset="0.34" stopOpacity="0.72" />
          <stop className="pkt-glow pkt-glow--in" offset="0.66" stopOpacity="0.26" />
          <stop className="pkt-glow pkt-glow--in" offset="1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pkt-out-glow">
          <stop className="pkt-core pkt-core--out" offset="0" />
          <stop className="pkt-core pkt-core--out" offset="0.34" stopOpacity="0.78" />
          <stop className="pkt-glow pkt-glow--out" offset="0.66" stopOpacity="0.3" />
          <stop className="pkt-glow pkt-glow--out" offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="flow-far">
        {idleRuns.map((run) => (
          <g key={run.id} className="idle">
            <path className="idle-base" d={run.d} vectorEffect="non-scaling-stroke" />
            <circle className="idle-pad" cx={run.anchor.x} cy={run.anchor.y} r="3" />
          </g>
        ))}

        {routes.map((route, index) => (
          <DataRoute key={route.id} route={route} index={index} />
        ))}
      </g>

      <g className="flow-near">
        {nodes.map((node) =>
          node.role === 'input' ? (
            <circle
              key={node.id}
              className="pad pad--in"
              cx={node.anchor.x}
              cy={node.anchor.y}
              r="4"
            />
          ) : (
            <rect
              key={node.id}
              className="pad pad--out"
              x={node.anchor.x - 4}
              y={node.anchor.y - 4}
              width="8"
              height="8"
              vectorEffect="non-scaling-stroke"
            />
          ),
        )}
      </g>

      <BrandCore core={core} beat={coreBeat} />
    </svg>
  )
}

import { memo } from 'react'
import { arrivalBeat } from './dataFlowConfig'

/**
 * A node: the labelled endpoint a route starts from or arrives at.
 *
 * HTML sitting over the SVG rather than `<text>` inside it, for the same three
 * reasons as everything else in this visual: the type renders at the platform's own
 * resolution instead of being scaled by the viewBox, it re-themes with the rest of
 * the site through the same tokens as every other line of copy, and it can wrap.
 *
 * The wrap is the point of the placement rules. Inbound channels get a short fixed
 * name and sit diagonally off their dot, clear of the run. Services sit beside
 * their dot in the space the route is not using, which is the only direction with
 * enough room for "Connected Infrastructure" on a wide screen — and on a narrow
 * one, where there is no such space, the composition moves the services into the
 * corners and labels them above and below instead.
 *
 * Two nested elements on purpose. The outer one owns the placement offset, the
 * inner one owns the entrance, and two transforms on a single element means the
 * later one silently replaces the earlier.
 *
 * The pip is the status indicator, and it is tied to the route rather than to a
 * timer: it flashes on the beat that route's packets arrive, so a node lights up
 * because something reached it, not because a second happened to elapse.
 */
export const DataNode = memo(function DataNode({ node, solution, layout, route, index }) {
  const beat = route ? arrivalBeat(route) : { period: 12, delay: -6 }

  const style = {
    left: `${(node.anchor.x / layout.width) * 100}%`,
    top: `${(node.anchor.y / layout.height) * 100}%`,
    '--beat-period': `${beat.period}s`,
    '--beat-delay': `${beat.delay}s`,
    '--label-delay': `${420 + index * 90}ms`,
  }

  return (
    <div className={`dnd dnd--${node.placement}`} style={style} data-node={node.id}>
      <span className="dnd-inner">
        <span className="dnd-pip" aria-hidden="true" />
        <span className="dnd-body">
          <span className="dnd-meta">{solution ? solution.number : 'IN'}</span>
          <span className="dnd-name">{solution ? solution.title : node.label}</span>
        </span>
      </span>
    </div>
  )
})

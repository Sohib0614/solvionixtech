import { useMemo } from 'react'
import { useMediaQuery } from '../../../lib/useMediaQuery'
import { usePointerParallax } from '../../../lib/usePointerParallax'
import { useReducedMotion } from '../../../lib/useReducedMotion'
import { site } from '../../../data/config'
import { hero } from '../../../data/content'
import { solutions } from '../../../data/solutions'
import { NetworkCanvas } from './NetworkCanvas'
import { BackgroundData } from './BackgroundData'
import { DataNode } from './DataNode'
import {
  VIEW,
  DATA_NODES,
  DATA_ROUTES,
  IDLE_RUNS,
  BACKGROUND_FRAGMENTS,
  arrivalBeat,
} from './dataFlowConfig'

/**
 * The hero visual: data in, the company processing it, services out.
 *
 * The name is the one element here that is never animated in from nothing. Every
 * other part of the composition is allowed to arrive late — the routes, the
 * packets, the labels — and the whole reveal is arranged around a name that is
 * already legible in the first painted frame. A hero that fades its own identity
 * in is telling the visitor to wait before they know what site they are on.
 *
 * Theme needs no handling here. Every colour in the drawing is a mix over the
 * site's existing tokens, so the light and dark palettes fall out of the same
 * values rather than being maintained twice.
 */
export function DataTransferVisual({ className = '' }) {
  const reduced = useReducedMotion()
  const isWide = useMediaQuery('(min-width: 1280px)')
  const rootRef = usePointerParallax(!reduced)

  const layoutName = isWide ? 'wide' : 'compact'
  const view = VIEW[layoutName]
  const layout = { viewBox: view.viewBox, width: view.width, height: view.height }

  const routes = DATA_ROUTES[layoutName]
  const nodes = DATA_NODES[layoutName]
  const idleRuns = IDLE_RUNS[layoutName]
  const fragments = BACKGROUND_FRAGMENTS[layoutName]

  const core = {
    x: view.core.x,
    y: view.core.y,
    ring: view.ring,
    outer: view.outer,
    inner: view.inner,
  }

  /**
   * Which arrival the core reacts to.
   *
   * Every inbound route already pulses its own destination on its own beat, but a
   * core running three overlapping pulses would flicker rather than read as one
   * machine. So the core takes the beat of whichever inbound route delivers most
   * often — the busiest feed is the one the core is actually working on — and that
   * is the pulse the name and the rule react to. Derived, not declared, so adding
   * a channel to the config moves the core's rhythm with it.
   */
  const coreBeat = useMemo(() => {
    const busiest = routes
      .filter((route) => route.direction === 'inbound')
      .reduce(
        (best, route) =>
          !best || route.timing.duration / route.packets < best.timing.duration / best.packets
            ? route
            : best,
        null,
      )

    return arrivalBeat(busiest)
  }, [routes])

  const servicesById = useMemo(
    () => new Map(solutions.map((solution) => [solution.id, solution])),
    [],
  )

  const corePosition = {
    left: `${(core.x / layout.width) * 100}%`,
    top: `${(core.y / layout.height) * 100}%`,
  }

  const aspect = layout.width / layout.height

  return (
    <div
      ref={rootRef}
      className={`flow-stage ${className}`}
      data-motion={reduced ? 'reduced' : 'full'}
      data-layout={layoutName}
      style={{ '--flow-ar': aspect.toFixed(4) }}
    >
      {/*
        The frame carries the aspect ratio rather than the page, so the drawing, the
        labels and the name are all sized from one number. The width is also capped
        against viewport height, which is what stops a tall drawing from pushing the
        fold down on a short laptop screen.
      */}
      <div className="flow-frame">
        <div className="flow-halo" style={corePosition} aria-hidden="true" />

        <NetworkCanvas
          layout={layout}
          routes={routes}
          nodes={nodes}
          idleRuns={idleRuns}
          core={core}
          coreBeat={coreBeat}
        />

        <BackgroundData fragments={fragments} layout={layout} />

        {/*
          The label layer. Hidden from the tree because the hero renders the same
          five services again as a real, permanently-present list further down the
          section — and hearing each name twice is a worse outcome than either
          extreme. The type itself stays fully readable and selectable.
        */}
        <div className="flow-nodes" aria-hidden="true">
          {nodes.map((node, index) => (
            <DataNode
              key={node.id}
              node={node}
              index={index}
              solution={servicesById.get(node.id)}
              layout={layout}
              route={routes.find((route) => route.from === node.id || route.to === node.id)}
            />
          ))}
        </div>

        {/*
          The name. Real text, not SVG text, so it is selectable, translatable and
          sits in the accessibility tree. It is never `aria-hidden` and never gated
          behind an animation that could fail to run.

          The rule and the glow on it are on the core's beat, so the wordmark
          reacts to the traffic instead of merely sitting inside it.
        */}
        <div
          className="flow-brand"
          style={{
            ...corePosition,
            '--beat-period': `${coreBeat.period}s`,
            '--beat-delay': `${coreBeat.delay}s`,
          }}
        >
          <span className="flow-name">{site.name}</span>
          <span className="flow-rule" aria-hidden="true" />
          <span className="flow-positioning">{hero.positioning}</span>
        </div>
      </div>
    </div>
  )
}

export default DataTransferVisual

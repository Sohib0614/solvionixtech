/**
 * A project's abstract visual plate.
 *
 * This is not a screenshot and must never be mistaken for one. There are no real
 * product images in this repository, so a photograph-shaped box with a stock
 * interface inside it would be a fabrication — and a fabricated screenshot is a
 * far worse thing to publish than no image at all, because a visitor cannot tell
 * it apart from a real one.
 *
 * So this generates an abstract diagram instead, deterministically from the
 * project id: stations, routes between them, concentric rings and travelling
 * marks. It is the same visual language as the hero data-transfer network —
 * stations, chamfered runs, packets on a line — so the work index reads as part of
 * the same system rather than as thumbnails dropped in from elsewhere.
 *
 * "Deterministically" is the important word. `Math.random()` would give every
 * card a different drawing on every render and on every visit, which makes the
 * index feel unstable and makes it impossible to reason about. Seeding from the id
 * means a project keeps the same artwork forever, on every device, in both themes.
 *
 * The colours are CSS custom properties rather than literal values, which is what
 * lets the artwork invert with the theme: this palette defines `ink` and `fog` as
 * opposites, so the same declaration is near-black ink on a light plate and
 * near-white ink on a dark one.
 *
 * The plate is decorative. Everything it depicts is also stated in the card's
 * text, so it is hidden from assistive technology rather than described.
 */

/** Geometry of the plate. Fixed, so the card slot never reflows between projects. */
const W = 400
const H = 250

/**
 * Station layouts, as fractions of the plate.
 *
 * Hand-placed rather than randomised. Four layouts is enough that no two cards in
 * a row look like the same drawing, and each one is a composition that has been
 * checked for balance — random points would produce plenty of layouts where one
 * station sits on top of another and the plate reads as a mistake.
 */
const LAYOUTS = [
  // A left-to-right chain: the hero's own shape.
  [
    { x: 0.17, y: 0.5 },
    { x: 0.5, y: 0.32 },
    { x: 0.83, y: 0.6 },
  ],
  // A triangle. Reads as distribution rather than sequence.
  [
    { x: 0.22, y: 0.68 },
    { x: 0.6, y: 0.26 },
    { x: 0.84, y: 0.72 },
  ],
  // Two on one side, one opposite. Reads as a merge.
  [
    { x: 0.2, y: 0.3 },
    { x: 0.2, y: 0.72 },
    { x: 0.78, y: 0.5 },
  ],
  // A shallow arc, like a fan.
  [
    { x: 0.5, y: 0.74 },
    { x: 0.26, y: 0.4 },
    { x: 0.74, y: 0.4 },
  ],
]

/** FNV-1a. Small, fast, and well spread for short strings. */
function hashSeed(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32. A seeded generator, so the same seed gives the same sequence. */
function mulberry32(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Build a route as a long straight run, one 45-degree chamfer, then straight
 * again — the same way the hero network's traces are routed.
 *
 * The chamfer is capped at the vertical distance between the endpoints, so two
 * stations on the same line produce a straight run instead of a chamfer that
 * overshoots and doubles back.
 */
function buildRoute(from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  if (Math.abs(dy) < 0.5) return `M ${from.x} ${from.y} H ${to.x}`

  const chamfer = Math.min(30, Math.abs(dy))
  const cornerX = to.x - Math.sign(dx) * chamfer
  return `M ${from.x} ${from.y} H ${cornerX} L ${to.x} ${to.y}`
}

/**
 * A point at `t` along a route, for placing a travelling mark on the line.
 *
 * Computed rather than measured: the plate is static, so there is no running
 * animation to need a real `getPointAtLength`, and a route with two segments is
 * cheap to interpolate by hand. Marking a path with `offset-path` here would be
 * the animated equivalent and would cost a compositor thread for no benefit.
 */
function pointOnRoute(from, to, t) {
  const dy = to.y - from.y
  if (Math.abs(dy) < 0.5) return { x: from.x + (to.x - from.x) * t, y: from.y }

  const chamfer = Math.min(30, Math.abs(dy))
  const cornerX = to.x - Math.sign(to.x - from.x) * chamfer
  const runLength = Math.abs(cornerX - from.x)
  const total = runLength + chamfer * Math.SQRT2
  const along = t * total

  if (along <= runLength) return { x: from.x + Math.sign(cornerX - from.x) * along, y: from.y }
  const intoChamfer = along - runLength
  return {
    x: cornerX + Math.sign(to.x - cornerX) * (intoChamfer / Math.SQRT2),
    y: from.y + Math.sign(to.y - from.y) * (intoChamfer / Math.SQRT2),
  }
}

const round = (n) => Math.round(n * 10) / 10

/**
 * The plate for one project.
 *
 * `seed` is the project id, so artwork is stable. Everything below is derived from
 * it once per render, and the drawing itself holds no state.
 */
export function ProjectVisual({ seed, className }) {
  const numeric = hashSeed(seed)
  const rand = mulberry32(numeric)

  const layout = LAYOUTS[numeric % LAYOUTS.length]
  // A small seeded jitter, so two projects sharing a layout are still not twins.
  const stations = layout.map((point) => ({
    x: round(point.x * W + (rand() - 0.5) * 14),
    y: round(point.y * H + (rand() - 0.5) * 14),
  }))

  const routes = [
    { from: stations[0], to: stations[1] },
    { from: stations[1], to: stations[2] },
  ]
  // Every third project also gets a direct first-to-third run, which turns the
  // chain into something with a shortcut through it.
  if (numeric % 3 === 0) routes.push({ from: stations[0], to: stations[2] })

  const packets = routes.map((route) =>
    pointOnRoute(route.from, route.to, 0.22 + rand() * 0.56),
  )

  const gridStep = 25
  const verticals = Array.from({ length: Math.ceil(W / gridStep) + 1 }, (_, i) => i * gridStep)
  const horizontals = Array.from({ length: Math.ceil(H / gridStep) + 1 }, (_, i) => i * gridStep)

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        {/* Grid. Barely there — it gives the plate a surface to sit on and gives
            the eye a sense of scale without ever becoming the subject.

            The stroke is `ink-600` at full opacity, which measures about 1.24:1
            against the `ink-900` plate. That is a low number by text standards and
            deliberately so: a contrast ratio is a legibility measure, and this is
            decoration. But it is not as low as it looks in the source. An earlier
            version used `ink-700` at half opacity, which composited to roughly
            1.06:1 and was invisible — the plate rendered as a flat rectangle. On a
            near-black ground subtle marks lose their contrast to the alpha
            rounding far faster than intuition suggests, so the grid is set at full
            opacity in the lighter of the two inks instead of being faded down. */}
        <g stroke="var(--color-ink-600)" strokeWidth="1">
          {verticals.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2={H} />
          ))}
          {horizontals.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2={W} y2={y} />
          ))}
        </g>

        {/* Routes, then the travelling marks on top of them. */}
        <g fill="none" stroke="var(--color-fog-600)" strokeWidth="1.25" strokeLinecap="round">
          {routes.map((route, index) => (
            <path key={`r${index}`} d={buildRoute(route.from, route.to)} opacity="0.85" />
          ))}
        </g>

        <g>
          {packets.map((point, index) => (
            <circle
              key={`p${index}`}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="var(--color-signal-400)"
              opacity="0.95"
            />
          ))}
        </g>

        {/* Stations. A filled pip inside a dashed ring, which is the same pairing
            the hero uses for a node and its arrival state. */}
        <g>
          {stations.map((station, index) => {
            const outer = 15 + round(rand() * 7)
            return (
              <g key={`s${index}`}>
                <circle
                  cx={station.x}
                  cy={station.y}
                  r={outer}
                  fill="none"
                  stroke="var(--color-fog-500)"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                  opacity="0.7"
                />
                <circle
                  cx={station.x}
                  cy={station.y}
                  r="4.5"
                  fill="var(--color-fog-50)"
                />
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default ProjectVisual
/**
 * The data-flow system's configuration.
 *
 * Everything the visual is made of is declared here rather than in JSX: which nodes
 * exist, what they are, which routes connect them, how long each transfer takes and
 * where along its journey each packet starts. The components read this and know
 * nothing about the specific company.
 *
 * The diagram being drawn is DATA -> PROCESSING -> OUTPUT, read left to right:
 *
 *     API ────────┐
 *     DATABASE ───┼──> [ core ] ──┬──> Intelligent Systems
 *     USER DATA ──┘               ├──> Digital Products
 *                                 ├──> Data & Decision Systems
 *                                 ├──> Connected Infrastructure
 *                                 └──> Business Systems
 *
 * Three inbound channels feed the company core and the five real services are the
 * destinations, because those are the five services the site actually sells. The
 * inbound names are architectural channels rather than product claims, so they are
 * described as channels; the outbound names come from `solutions` at render time
 * and are never written out here.
 *
 * Geometry notes. The viewBox is 1000x760 with the core at (500, 372) and the
 * traces landing on a 152-unit ring. Node anchors are the *dots*: the endpoint a
 * route actually touches, with the label placed clear of the route by the
 * `placement` field rather than by hand-tuned offsets. Traces are routed the way
 * traces are actually routed — long straight runs, one 45-degree chamfer to change
 * direction, straight again — and deliberately not mirrored, because a symmetric
 * network reads as a mandala and an asymmetric one reads as infrastructure.
 *
 * Timing notes. Every duration divides twelve seconds, so the whole system comes
 * back into phase twice a minute and the loop never reads as arbitrary. The
 * durations still differ from each other, because routes that all take the same
 * time look like one repeating mechanism rather than a distributed system.
 */

export const VIEW = {
  wide: { viewBox: '0 0 1000 760', width: 1000, height: 760, core: { x: 500, y: 372 }, ring: 152, outer: 180, inner: 140 },
  compact: { viewBox: '0 0 640 600', width: 640, height: 600, core: { x: 320, y: 300 }, ring: 132, outer: 146, inner: 118 },
}

/**
 * Where a node's label sits relative to its dot.
 *
 * `right` and `left` are the same height as the dot and sit beside it. They are
 * only safe where the space beside the dot is genuinely free — on the wide layout
 * the outputs have three hundred units of empty frame to their right, but on a
 * phone the same label beside the same dot has forty, which is why the compact
 * composition pushes its services into the corners and labels them above and below
 * instead. `above-center` and `below-center` are for those.
 */
const PLACEMENT = {
  ABOVE_CENTER: 'above-center',
  ABOVE_RIGHT: 'above-right',
  BELOW_CENTER: 'below-center',
  BELOW_RIGHT: 'below-right',
  LEFT: 'left',
  RIGHT: 'right',
}

/**
 * Nodes.
 *
 * `id` is what a route references. `service` marks the five that come from the
 * site's own data; the rest are the data channels feeding the core. `label` is
 * filled in from `solutions` at render time for services, and written out here for
 * the channels.
 */
export const DATA_NODES = {
  wide: [
    { id: 'api', label: 'API', role: 'input', anchor: { x: 170, y: 92 }, placement: PLACEMENT.ABOVE_RIGHT },
    { id: 'database', label: 'Database', role: 'input', anchor: { x: 170, y: 372 }, placement: PLACEMENT.BELOW_RIGHT },
    { id: 'user-data', label: 'User Data', role: 'input', anchor: { x: 170, y: 668 }, placement: PLACEMENT.ABOVE_RIGHT },

    { id: 'intelligent-systems', service: true, role: 'output', anchor: { x: 688, y: 92 }, placement: PLACEMENT.RIGHT },
    { id: 'digital-products', service: true, role: 'output', anchor: { x: 688, y: 262 }, placement: PLACEMENT.RIGHT },
    { id: 'data-decision-systems', service: true, role: 'output', anchor: { x: 688, y: 528 }, placement: PLACEMENT.RIGHT },
    { id: 'connected-infrastructure', service: true, role: 'output', anchor: { x: 688, y: 668 }, placement: PLACEMENT.RIGHT },
    { id: 'business-systems', service: true, role: 'output', anchor: { x: 500, y: 690 }, placement: PLACEMENT.BELOW_CENTER },
  ],

  compact: [
    /*
      Corners, not edges. On a phone the core has to be large — the wordmark is
      floored at 17px rather than scaling down with the frame, so the ring has to
      grow to keep holding it — and a large core in the middle of a narrow frame
      leaves no room beside it for a service name. So the four nodes go to the
      corners, where there is a whole quadrant each, and the labels go above and
      below them where nothing else is.

      The top and bottom rows are inset to 130 rather than hugging the frame edge.
      The service names wrap to two lines on a phone, and a two-line block is about
      seventy-five units tall; sitting at ninety-six it would need a hundred and one
      units of headroom to clear the top of the frame and had none, so the labels
      hung three pixels outside it. Insetting the rows costs nothing — the corner
      quadrants have it spare — and buys back the room the wrapping needs.
    */
    { id: 'api', label: 'API', role: 'input', anchor: { x: 76, y: 130 }, placement: PLACEMENT.ABOVE_RIGHT },
    { id: 'database', label: 'Database', role: 'input', anchor: { x: 76, y: 470 }, placement: PLACEMENT.BELOW_RIGHT },

    { id: 'intelligent-systems', service: true, role: 'output', anchor: { x: 500, y: 130 }, placement: PLACEMENT.ABOVE_CENTER },
    { id: 'digital-products', service: true, role: 'output', anchor: { x: 500, y: 470 }, placement: PLACEMENT.BELOW_CENTER },
  ],
}

/**
 * Routes.
 *
 * `d` is the single source of truth for a route's geometry. The visible <path>, the
 * travelling packets and the glowing segment that rides with them are all driven
 * from this one string, so they cannot drift apart.
 *
 * `packets` is how many transfers are in flight at once. `size` scales the packet
 * so the sources are not all the same weight — the database is a fatter feed than
 * the API and should look it.
 */
export const DATA_ROUTES = {
  wide: [
    // Inbound: the data channels feeding the core.
    { id: 'in-api', direction: 'inbound', from: 'api', to: 'core', d: 'M 170 92 H 240 L 300 152 V 263 L 357 320', timing: { duration: 4, delay: 0 }, packets: 2, size: 1 },
    { id: 'in-database', direction: 'inbound', from: 'database', to: 'core', d: 'M 170 372 H 348', timing: { duration: 6, delay: 1.5 }, packets: 2, size: 0.85 },
    { id: 'in-user-data', direction: 'inbound', from: 'user-data', to: 'core', d: 'M 170 668 H 220 L 280 608 V 424 H 357', timing: { duration: 3, delay: 2.4 }, packets: 1, size: 0.9 },

    // Outbound: the core delivering to each service.
    { id: 'out-intelligent', direction: 'outbound', from: 'core', to: 'intelligent-systems', d: 'M 643 320 L 688 275 V 92', timing: { duration: 4, delay: 0.6 }, packets: 2, size: 1 },
    { id: 'out-digital', direction: 'outbound', from: 'core', to: 'digital-products', d: 'M 643 424 L 688 379 V 262', timing: { duration: 6, delay: 2.2 }, packets: 1, size: 0.8 },
    { id: 'out-data', direction: 'outbound', from: 'core', to: 'data-decision-systems', d: 'M 607 479 L 656 528 H 688', timing: { duration: 3, delay: 1.2 }, packets: 2, size: 0.9 },
    { id: 'out-connected', direction: 'outbound', from: 'core', to: 'connected-infrastructure', d: 'M 539 519 L 639 619 V 668 H 688', timing: { duration: 6, delay: 3.4 }, packets: 1, size: 0.75 },
    { id: 'out-business', direction: 'outbound', from: 'core', to: 'business-systems', d: 'M 500 524 V 690', timing: { duration: 2, delay: 0.9 }, packets: 1, size: 0.95 },
  ],

  compact: [
    { id: 'c-in-api', direction: 'inbound', from: 'api', to: 'core', d: 'M 76 130 H 152 L 212 190 V 224', timing: { duration: 4, delay: 0.4 }, packets: 1, size: 1 },
    { id: 'c-in-database', direction: 'inbound', from: 'database', to: 'core', d: 'M 76 470 H 152 L 212 410 V 376', timing: { duration: 6, delay: 2 }, packets: 1, size: 0.85 },
    { id: 'c-out-intelligent', direction: 'outbound', from: 'core', to: 'intelligent-systems', d: 'M 428 224 L 465 187 V 130 H 500', timing: { duration: 4, delay: 1 }, packets: 1, size: 1 },
    { id: 'c-out-digital', direction: 'outbound', from: 'core', to: 'digital-products', d: 'M 428 376 L 465 413 V 470 H 500', timing: { duration: 6, delay: 3 }, packets: 1, size: 0.8 },
  ],
}

/**
 * Idle stub runs, carrying no packets.
 *
 * They branch off a main run and stop at a pad. They exist because eight routes
 * converging on one ring is a star, and a star reads as a diagram; a few dead-end
 * runs make the same geometry read as part of a larger board.
 */
export const IDLE_RUNS = {
  wide: [
    { id: 'idle-1', d: 'M 300 152 V 104 H 348', anchor: { x: 348, y: 104 } },
    { id: 'idle-2', d: 'M 280 608 V 664 H 330', anchor: { x: 330, y: 664 } },
    { id: 'idle-3', d: 'M 500 690 V 736 H 452', anchor: { x: 452, y: 736 } },
  ],
  compact: [
    { id: 'c-idle-1', d: 'M 465 150 H 410', anchor: { x: 410, y: 150 } },
  ],
}

/**
 * Data fragments: tiny monospace tokens that surface and fade in the negative
 * space. Four or five of them, never a field of them — this is the detail that
 * rewards looking closely, and the moment there are more than a handful it becomes
 * the main visual, which is the opposite of the intent.
 */
export const BACKGROUND_FRAGMENTS = {
  wide: [
    { at: { x: 150, y: 204 }, text: '0x4F', cycle: 9, delay: 0 },
    { at: { x: 640, y: 190 }, text: 'SYNC', cycle: 11, delay: 2.2 },
    { at: { x: 250, y: 556 }, text: '0x1F', cycle: 8, delay: 4.1 },
    { at: { x: 706, y: 604 }, text: 'PKT', cycle: 10, delay: 1.3 },
    { at: { x: 420, y: 116 }, text: '0xB7', cycle: 12, delay: 5.6 },
  ],
  compact: [
    { at: { x: 110, y: 320 }, text: '0x4F', cycle: 9, delay: 0.4 },
    { at: { x: 545, y: 300 }, text: 'SYNC', cycle: 11, delay: 3 },
    { at: { x: 258, y: 58 }, text: '0xB7', cycle: 12, delay: 5.6 },
  ],
}

/**
 * When each packet on a route sets off, in seconds.
 *
 * Every packet traverses the whole route in `duration` seconds and then starts
 * again, so this is a conveyor rather than a queue: one transfer is always
 * arriving as the previous one is leaving. Packets are spread evenly by index, so
 * two packets on a four-second route are two seconds apart instead of overlapping,
 * and the route's own `delay` offsets the whole set so inbound and outbound traffic
 * are never synchronised with each other.
 *
 * These are rendered as a negative `animation-delay`, which is what puts each
 * packet already partway along the line on the first painted frame instead of
 * eight lines all starting empty at the same moment.
 */
export function packetOffsets(route) {
  const { duration, delay } = route.timing
  const step = duration / route.packets
  return Array.from({ length: route.packets }, (_, index) => delay + index * step)
}

/**
 * The moment a transfer reaches the far end of its route.
 *
 * A packet that starts `offset` seconds into a `duration`-second journey lands at
 * `duration - offset`, so the last packet of a staggered set arrives `step` after
 * the first. Everything that reacts to an arrival — the core pulse, the brand
 * reaction, the node's own activation — is driven from this number, which is what
 * keeps the reaction genuinely tied to the packet rather than merely running on the
 * same clock.
 */
export function arrivalTime(route, offset) {
  return route.timing.duration - offset
}

/**
 * The beat a destination pulses on.
 *
 * Arrivals repeat every `duration / packets` seconds, so that is the period. A
 * packet starting `offset` seconds into its journey lands at `duration - offset`,
 * and that arrival is the phase the pulse has to fire on.
 *
 * The delay returned is always negative, and that matters: `animation-delay: -x`
 * starts an animation `x` seconds into its own cycle, whereas a positive delay
 * would hold the element in its backwards-fill state for that long — which, for a
 * pulse, reads as a flash that never ends. Taking `phase - period` picks the same
 * point in the cycle as `phase` itself while guaranteeing the animation is already
 * running when the page paints.
 *
 * Nothing here is kept in sync by JavaScript. The pulse and the packet both run off
 * the document timeline, with the same period and the same delay, so they cannot
 * drift apart and neither costs a render.
 */
export function arrivalBeat(route, offset = route.timing.delay) {
  const period = route.timing.duration / route.packets
  const phase = (((arrivalTime(route, offset) % period) + period) % period)
  return { period, delay: phase - period }
}

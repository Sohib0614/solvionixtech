import { cn, hashString } from '../../lib/cn'

/**
 * Generated portrait placeholder.
 *
 * Rather than shipping stock photography or broken image paths, each team
 * member gets a deterministic abstract portrait derived from their name. The
 * same name always produces the same artwork, so the team grid looks
 * intentional and nothing can ever 404.
 *
 * If a real photograph becomes available, pass it as `image` and it will be
 * used instead.
 */

/** Brand-constrained hues so generated art never drifts off-palette. */
const PALETTES = [
  { from: '#0b1a26', to: '#071018', glow: '#38bdf8' },
  { from: '#0a1a2e', to: '#060d18', glow: '#38bdf8' },
  { from: '#08181c', to: '#050e12', glow: '#22d3ee' },
  { from: '#0d1724', to: '#070a12', glow: '#7dd3fc' },
]

export function MonogramAvatar({ name, initials, image, className, rounded = 'rounded-xl' }) {
  const seed = hashString(name || 'Solvionix')
  const palette = PALETTES[seed % PALETTES.length]
  const gradientId = `mg-${seed.toString(36)}`
  const patternId = `mp-${seed.toString(36)}`
  const arcRotation = (seed % 40) - 20
  const lineOffset = seed % 12

  const label = initials
    ? initials
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : (name || 'SX').slice(0, 2).toUpperCase()

  if (image) {
    return (
      <img
        src={image}
        alt={`${name} — profile photograph`}
        loading="lazy"
        decoding="async"
        className={cn('size-full object-cover object-top', rounded, className)}
      />
    )
  }

  return (
    <div
      className={cn('relative isolate size-full overflow-hidden bg-ink-850', rounded, className)}
      role="img"
      aria-label={`${name} — generated placeholder portrait`}
    >
      <svg
        viewBox="0 0 400 400"
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.from} />
            <stop offset="100%" stopColor={palette.to} />
          </linearGradient>
          <pattern
            id={patternId}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(45 0 ${lineOffset})`}
          >
            <line x1="0" y1="0" x2="0" y2="14" stroke="#ffffff" strokeOpacity="0.035" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="400" height="400" fill={`url(#${gradientId})`} />
        <rect width="400" height="400" fill={`url(#${patternId})`} />

        <g
          transform={`rotate(${arcRotation} 200 200)`}
          fill="none"
          stroke={palette.glow}
          strokeOpacity="0.18"
        >
          <circle cx="200" cy="200" r="96" strokeWidth="1" />
          <circle cx="200" cy="200" r="138" strokeWidth="1" strokeDasharray="3 7" />
          <circle cx="200" cy="200" r="178" strokeWidth="1" strokeOpacity="0.7" />
        </g>

        <circle cx="272" cy="128" r="46" fill={palette.glow} opacity="0.1" />

        <text
          x="200"
          y="200"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#f4f6f8"
          fillOpacity="0.94"
          fontFamily="'Inter Variable', system-ui, sans-serif"
          fontSize="128"
          fontWeight="600"
          letterSpacing="-4"
        >
          {label}
        </text>

        <g stroke={palette.glow} strokeOpacity="0.5" strokeWidth="1.5">
          <line x1="24" y1="24" x2="24" y2="54" />
          <line x1="24" y1="24" x2="54" y2="24" />
          <line x1="376" y1="376" x2="376" y2="346" />
          <line x1="376" y1="376" x2="346" y2="376" />
        </g>
      </svg>
    </div>
  )
}

export default MonogramAvatar

import { cn, hashString } from '../../lib/cn'

/**
 * Generated project cover art.
 *
 * Project imagery is produced as deterministic SVG from the project id, so the
 * work grid looks designed without shipping stock photography, and a cover can
 * never fail to load. Swap in a real screenshot by passing `image`.
 */
export function GeneratedCover({ seed, title, image, className, ratio = 'aspect-[16/10]' }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`${title} — project screenshot`}
        loading="lazy"
        decoding="async"
        className={cn('size-full object-cover', className)}
      />
    )
  }

  const hash = hashString(seed || title || 'project')
  const uid = `gc-${hash.toString(36)}`
  const variant = hash % 4
  const rotation = (hash % 44) - 22
  const offsetX = 20 + (hash % 30)
  const rings = 3 + (hash % 3)

  return (
    <div className={cn('relative isolate overflow-hidden bg-ink-850', ratio, className)}>
      <svg
        viewBox="0 0 480 300"
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Abstract technical artwork for ${title}`}
      >
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b0f18" />
            <stop offset="100%" stopColor="#05070b" />
          </linearGradient>
          <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
          </linearGradient>
          <pattern id={`${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.04"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id={`${uid}-bloom`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="480" height="300" fill={`url(#${uid}-bg)`} />
        <rect width="480" height="300" fill={`url(#${uid}-grid)`} />
        <ellipse
          cx={offsetX * 8}
          cy="70"
          rx="190"
          ry="130"
          fill={`url(#${uid}-bloom)`}
        />

        <g transform={`rotate(${rotation} 240 150)`} fill="none" stroke={`url(#${uid}-stroke)`}>
          {Array.from({ length: rings }).map((_, index) => (
            <circle
              key={index}
              cx="240"
              cy="150"
              r={46 + index * 34}
              strokeWidth={index === 0 ? 1.4 : 1}
              strokeDasharray={index % 2 === 0 ? undefined : '2 6'}
            />
          ))}
          <path d="M 40 150 L 440 150" strokeWidth="0.75" strokeOpacity="0.5" />
          <path d="M 240 22 L 240 278" strokeWidth="0.75" strokeOpacity="0.5" />
        </g>

        {/* Node cluster — layout varies per project */}
        <g>
          {Array.from({ length: 5 + (hash % 4) }).map((_, index) => {
            const angle = (index / 7) * Math.PI * 2 + (hash % 12) * 0.12
            const radius = 52 + ((hash >> (index + 2)) % 40)
            const cx = 240 + Math.cos(angle) * radius
            const cy = 150 + Math.sin(angle) * radius * 0.62
            return (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r={2.5 + (index % 3)}
                fill={variant % 2 === 0 ? '#7dd3fc' : '#38bdf8'}
                fillOpacity={0.35 + (index % 4) * 0.15}
              />
            )
          })}
          <circle cx="240" cy="150" r="5" fill="#7dd3fc" fillOpacity="0.9" />
          <circle
            cx="240"
            cy="150"
            r="13"
            fill="none"
            stroke="#7dd3fc"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </g>
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
      />
    </div>
  )
}

export default GeneratedCover

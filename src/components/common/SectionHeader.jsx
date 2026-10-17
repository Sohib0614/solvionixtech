import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

/**
 * The heading block that opens every section.
 *
 * Three deliberate choices make the site read as one document rather than a
 * stack of unrelated blocks:
 *
 *   - the optional `number` renders in mono above the title, so sections can be
 *     referenced ("see 03") the way they would be in a technical document
 *   - body copy is capped at a measure, because long lines are what make a site
 *     feel like marketing rather than like a company writing
 *   - the heading uses the shared type ramp, so no page can introduce a louder
 *     style than the one above it
 */
export function SectionHeader({
  eyebrow,
  number,
  title,
  description,
  actions,
  size = 'default',
  align = 'left',
  className,
}) {
  const headingClass = size === 'large' ? 'type-display' : 'type-h2'

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'mx-auto items-center text-center',
        (actions || size === 'large') && 'lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className={cn(size === 'large' ? 'measure' : 'max-w-2xl', align === 'center' && 'mx-auto')}>
        {number || eyebrow ? (
          <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-signal-400 uppercase tracking-widest">
            {number ? <span className="text-signal-300">{number}</span> : null}
            {number && eyebrow ? <span className="text-fog-600">/</span> : null}
            {eyebrow ? <span>{eyebrow}</span> : null}
          </p>
        ) : null}

        <h2 className={cn(headingClass, 'font-display mt-3 font-bold tracking-tight text-fog-50 sm:text-3xl lg:text-4xl', number || eyebrow ? 'text-balance' : '')}>
          {title}
        </h2>

        {description ? (
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-fog-300">{description}</p>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Reveal>
  )
}

export default SectionHeader

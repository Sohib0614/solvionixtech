import { cn } from '../../lib/cn'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

/**
 * The requirement → approach → value spine.
 *
 * This is the structural argument of the whole site: we understand the problem
 * before we choose the technology. It is rendered as a three-row editorial
 * table rather than as three cards, because it is a sequence, and the labels
 * have to stay visible to make the sequence legible.
 *
 * `rows` is [{ label, body, mono? }]. The mono flag renders the label in the
 * mono face, which is used when the label is a system term rather than a
 * sentence.
 */
export function KeyLines({ rows, className }) {
  if (!rows?.length) return null

  return (
    <RevealGroup className={cn('border-t border-line', className)}>
      <dl className="divide-y divide-line">
        {rows.map((row) => (
          <RevealItem key={row.label} y={14}>
            <div className="grid gap-3 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 lg:grid-cols-[13rem_1fr]">
              <dt
                className={cn(
                  'font-semibold text-[0.9375rem] text-fog-400 sm:pt-1',
                  row.mono && 'font-mono text-[0.8125rem] font-semibold tracking-[0.14em] uppercase',
                )}
              >
                {row.label}
              </dt>
              <dd className="font-semibold type-body text-fog-200">{row.body}</dd>
            </div>
          </RevealItem>
        ))}
      </dl>
    </RevealGroup>
  )
}

/**
 * A list of short statements, marked with a hairline rather than a bullet or a
 * check. Used for scope, practice, deliverables and standards — anything that is
 * an enumeration the reader can scan.
 */
export function ProseList({ items, marker = 'rule', className, columns = false }) {
  if (!items?.length) return null

  return (
    <RevealGroup
      className={cn(
        columns && 'grid gap-x-10 sm:grid-cols-2 sm:gap-y-1',
        !columns && 'space-y-1',
        className,
      )}
    >
      <ul className={columns ? 'contents' : undefined}>
        {items.map((item) => (
          <RevealItem
            key={item}
            as="li"
            y={10}
            className="flex items-start gap-3.5 border-b border-line-soft py-3.5 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                'mt-2.5 shrink-0',
                marker === 'rule' ? 'h-px w-4 bg-signal-400/70' : 'size-1.5 rounded-full bg-signal-400/70',
              )}
            />
            <span className="font-semibold type-support text-fog-200">{item}</span>
          </RevealItem>
        ))}
      </ul>
    </RevealGroup>
  )
}

/**
 * The closing statement that appears at the end of a page: a short argument
 * followed by a contextual link onward. Deliberately not a CTA button — the
 * only "Start a Project" control on the site is the floating one.
 */
export function PageClose({ title, body, link, children, className }) {
  if (!title && !body && !link && !children) return null

  return (
    <Reveal className={cn('relative mt-12 overflow-hidden rounded-2xl border border-line-soft bg-gradient-to-br from-ink-900/80 via-ink-950 to-ink-900/60 p-8 sm:p-10 shadow-xl', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-signal-400/10 blur-[80px]"
      />
      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="max-w-2xl">
          {title ? <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fog-50">{title}</h2> : null}
          {body ? <p className="mt-2 text-sm sm:text-base text-fog-300 leading-relaxed">{body}</p> : null}
        </div>
        {link || children ? (
          <div className="shrink-0 flex items-center">
            {link ?? children}
          </div>
        ) : null}
      </div>
    </Reveal>
  )
}

export default KeyLines

import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

/**
 * The heading at the top of every inner page. Deliberately quieter than the
 * home hero: this is an introduction, not a first impression, so it is a
 * single column of text with a hairline underneath.
 *
 * Every page uses the same component, which is what keeps the secondary pages
 * looking like one site.
 */
export function PageHeader({ title, description, children, className }) {
  return (
    <div className={cn('relative border-b border-line/60 bg-ink-950 overflow-hidden', className)}>
      <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-24 h-48 w-96 rounded-full bg-signal-400/10 blur-3xl pointer-events-none" />

      <div className="container-page relative z-10 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fog-50 sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-fog-300 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </Reveal>
      </div>
    </div>
  )
}

export default PageHeader

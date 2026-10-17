import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { ProseList } from '../common/KeyLines'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

/**
 * One capability, laid out as practice, deliverables, standards, technology.
 */
export function CapabilitySection({ capability, compact = false, className }) {
  return (
    <Reveal className={cn('rule-top pt-10 lg:pt-14', className)}>
      <article
        className={cn(
          'grid gap-8',
          compact ? 'lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16' : 'lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16',
        )}
      >
        <div>
          <p className="index-mark">{capability.number}</p>
          <h3 className="font-semibold type-h2 mt-3 text-fog-50">
            <Link
              to={`/capabilities/${capability.id}`}
              className="font-semibold transition-colors duration-200 hover:text-signal-300"
            >
              {capability.title}
            </Link>
          </h3>
          <p className="font-semibold type-body mt-4 text-fog-300">{capability.summary}</p>
          <p className="mt-6">
            <ArrowLink to={`/capabilities/${capability.id}`}>
              Explore engineering discipline
            </ArrowLink>
          </p>
        </div>

        {compact ? null : (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            <div>
              <h4 className="font-bold text-[0.9375rem] text-fog-50">Practice Principles</h4>
              <ProseList items={capability.practice} className="mt-4" />
            </div>

            <div className="grid gap-8">
              <div>
                <h4 className="font-bold text-[0.9375rem] text-fog-50">Verified Deliverables</h4>
                <ProseList items={capability.deliverables} className="mt-4" />
              </div>

              <div>
                <h4 className="font-bold text-[0.9375rem] text-fog-50">Quality Invariants</h4>
                <ProseList items={capability.standards} className="mt-4" />
              </div>
            </div>
          </div>
        )}
      </article>

      {compact || !capability.technologies?.length ? null : (
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line-soft pt-5">
          <span className="font-mono text-xs uppercase tracking-wider text-fog-500 mr-2">Tools & Stack</span>
          {capability.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-line-soft bg-ink-900/80 px-2.5 py-1 font-mono text-xs font-medium text-fog-300"
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </Reveal>
  )
}

export default CapabilitySection

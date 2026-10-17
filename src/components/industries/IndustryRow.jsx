import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { ProseList } from '../common/KeyLines'
import { Reveal } from '../ui/Reveal'
import { getSolution } from '../../data/solutions'
import { cn } from '../../lib/cn'

/**
 * One industry, as a two-column editorial block.
 *
 * The left column states the operating conditions of the environment; the right
 * lists the requirements that follow from them. That ordering is deliberate: it
 * demonstrates that the industry is understood before the technology is
 * proposed, which is the argument the whole site is making.
 *
 * The related-solution rail is built from the solution ids in the data file, so
 * adding a solution link here is a data change, not a code change.
 *
 * `compact` is the home-page teaser: number, title, one-line summary and the
 * onward link. The operating conditions and the requirements that follow from
 * them are the argument for understanding the environment before proposing
 * technology, and on the home page that argument is a distraction from the
 * short version of it.
 */
export function IndustryRow({ industry, compact = false, className }) {
  const related = industry.relatedSolutions.map(getSolution).filter(Boolean)

  return (
    <Reveal className={cn('rule-top pt-10 lg:pt-14', className)}>
      <article
        className={cn(
          'grid gap-10',
          compact ? 'lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16' : 'lg:grid-cols-2 lg:gap-16',
        )}
      >
        <div>
          <p className="index-mark">{industry.number}</p>
          <h3 className="font-semibold type-h2 mt-3 text-fog-50">
            <Link
              to={`/industries/${industry.id}`}
              className="font-semibold transition-colors duration-200 hover:text-accent"
            >
              {industry.title}
            </Link>
          </h3>
          <p className="font-semibold type-body measure-tight mt-4 text-fog-300">
            {industry.summary}
          </p>
        </div>

        {compact ? null : (
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <h4 className="font-bold text-[0.9375rem] text-fog-50">Operating conditions</h4>
              <ProseList items={industry.conditions} className="mt-4" />
            </div>

            <div>
              <h4 className="font-bold text-[0.9375rem] text-fog-50">What follows from them</h4>
              <ProseList items={industry.requirements} className="mt-4" />
            </div>
          </div>
        )}
      </article>

      {/* The contextual onward link. Not a button, and not repeated on the row. */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ArrowLink to={`/industries/${industry.id}`}>Explore industry solutions</ArrowLink>
        {related.length > 0 ? (
          <p className="font-semibold type-support text-fog-500">
            Applies to{' '}
            {related.map((solution, index) => (
              <span key={solution.id}>
                {index > 0 ? ', ' : ''}
                <Link
                  to={`/solutions/${solution.id}`}
                  className="font-semibold text-fog-300 underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                >
                  {solution.title}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </Reveal>
  )
}

export default IndustryRow

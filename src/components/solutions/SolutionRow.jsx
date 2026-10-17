import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { KeyLines } from '../common/KeyLines'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

/**
 * One solution, presented as an editorial section rather than a card.
 *
 * Numbered row with an architecture spine (requirement, approach, value)
 * and technology chips.
 */
export function SolutionRow({ solution, className }) {
  return (
    <Reveal className={cn('rule-top pt-10 lg:pt-12', className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
        {/* Identity */}
        <div>
          <p className="index-mark">{solution.number}</p>
          <h3 className="font-semibold type-h2 mt-3 text-fog-50">
            <Link
              to={`/solutions/${solution.id}`}
              className="font-semibold transition-colors duration-200 hover:text-signal-300"
            >
              {solution.title}
            </Link>
          </h3>
          <p className="font-semibold type-body mt-4 text-fog-300">{solution.summary}</p>

          {/* Quick tech chips */}
          {solution.technologies?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {solution.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line-soft bg-ink-900/80 px-2.5 py-1 font-mono text-[11px] font-medium text-fog-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Button to={`/solutions/${solution.id}`} variant="secondary" size="sm">
              Explore architecture →
            </Button>
          </div>
        </div>

        {/* The spine: what the business needs, how we approach it, what it returns. */}
        <KeyLines
          rows={[
            { label: 'Business requirement', body: solution.requirement },
            { label: 'Technology approach', body: solution.approach },
            { label: 'Operational value', body: solution.value },
          ]}
        />
      </div>
    </Reveal>
  )
}

export default SolutionRow

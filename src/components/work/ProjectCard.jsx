import { Link } from 'react-router-dom'
import { ArrowLink } from '../ui/ArrowLink'
import { Reveal } from '../ui/Reveal'
import { ProjectVisual } from './ProjectVisual'
import { cn } from '../../lib/cn'

/**
 * A project, presented as a system.
 *
 * The old version of this card was image, name, stack, button. That format
 * describes a portfolio, and a portfolio is the wrong claim for a company that
 * has not delivered much client work yet. This one leads with the operating
 * context and the approach, and it carries the Internal / Demonstration / Client
 * label in the same position as the title so it cannot be skipped.
 *
 * There is now a visual, which reverses part of that decision — so it is worth
 * being precise about what was added and why it is not the thing it resembles.
 * The plate is a generated abstract diagram (see ProjectVisual), not a product
 * screenshot, because there are no real product images to publish and a faked one
 * would be worse than none: a visitor cannot distinguish a fabricated screenshot
 * from a real one. What the image carries is the project's shape — stations, routes,
 * travelling marks — which is a genuine signal about the work. The label still
 * leads, and the caption still states what the project is, so nothing about the
 * entry depends on recognising the artwork.
 *
 * `compact` is the home-page teaser: label, title, one-line summary and the
 * onward link. The context and status drop away, because on the home page they
 * are detail, and detail belongs on the page that is about the project.
 */
export function ProjectCard({ project, compact = false, className }) {
  return (
    <Reveal className={cn('h-full', className)}>
      <article className="glass-card group flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-signal-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.16)]">
        <div>
          {/* Mockup Frame Header */}
          <div className="mb-4 overflow-hidden rounded-xl border border-line-soft bg-ink-950">
            {/* Window title bar */}
            <div className="flex items-center justify-between border-b border-line-soft bg-ink-900/90 px-3.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-400/60" />
                <span className="size-2 rounded-full bg-amber-400/60" />
                <span className="size-2 rounded-full bg-emerald-400/60" />
              </div>
              <div className="truncate px-2 font-mono text-[0.6875rem] text-fog-500">
                system://{project.id}.internal
              </div>
              <span className="font-mono text-[0.625rem] text-signal-400 font-semibold uppercase">
                {project.label === 'Client Project' ? 'LIVE' : 'VERIFIED'}
              </span>
            </div>

            {/* Visual Plate inside frame */}
            {project.screenshot ? (
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-ink-950">
                <img
                  src={project.screenshot}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  className={cn(
                    'h-full w-full transition-transform duration-500 group-hover:scale-[1.03]',
                    project.isMobile ? 'object-contain p-2' : 'object-cover object-top'
                  )}
                />
              </div>
            ) : (
              <ProjectVisual
                seed={project.id}
                className="w-full bg-ink-950 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span className="rounded-md border border-line bg-ink-850 px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-wider text-signal-300 uppercase">
              {project.label}
            </span>
            <span className="font-mono text-[0.6875rem] text-fog-500 uppercase">
              {project.client ?? project.domain}
            </span>
          </div>

          <h3 className="font-display mt-3.5 text-xl font-bold tracking-tight text-fog-50">
            <Link
              to={`/work/${project.id}`}
              className="transition-colors duration-200 hover:text-signal-300"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-fog-300">{project.summary}</p>

          {/* Technology stack badges */}
          {project.technology?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technology.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-ink-800/80 px-2 py-0.5 font-mono text-[0.6875rem] text-fog-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Capabilities Preview */}
          {project.capabilitiesImplemented?.length > 0 && (
            <div className="mt-4 space-y-1 border-t border-line-soft pt-3">
              {project.capabilitiesImplemented.slice(0, 2).map((cap) => (
                <div key={cap} className="flex items-start gap-1.5 text-xs text-fog-400">
                  <span className="text-signal-400 font-bold">✓</span>
                  <span className="line-clamp-1">{cap}</span>
                </div>
              ))}
            </div>
          )}

          {compact ? null : (
            <dl className="mt-6 grid gap-4 border-t border-line-soft pt-5">
              <div>
                <dt className="font-mono text-xs text-fog-600 uppercase">Context</dt>
                <dd className="mt-1 text-xs leading-relaxed text-fog-400">
                  {project.caseStudy.context}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-fog-600 uppercase">System Status</dt>
                <dd className="mt-1 text-xs text-fog-400">{project.status}</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-6 border-t border-line-soft pt-4">
          <ArrowLink to={`/work/${project.id}`}>
            {project.label === 'Client Project' ? 'Examine Architecture & Case Study' : 'View System Specs'}
          </ArrowLink>
        </div>
      </article>
    </Reveal>
  )
}

export default ProjectCard

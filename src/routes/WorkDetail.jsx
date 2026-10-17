import { useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { ProseList } from '../components/common/KeyLines'
import { CaseStudy } from '../components/work/CaseStudy'
import { ProjectVisual } from '../components/work/ProjectVisual'
import { Section, Reveal } from '../components/ui/Reveal'
import { getWork } from '../data/work'
import { getSolution } from '../data/solutions'
import { getIndustry } from '../data/industries'
import { usePageTitle } from '../lib/usePageTitle'
import { cn } from '../lib/cn'
import { NotFound } from './NotFound'

/**
 * /work/:id — one project, read as a system.
 *
 * The label is repeated in the page header, not only on the listing card. A
 * project page is the one most likely to be shared or bookmarked, so it has to
 * state on its own that this is a demonstration or internal build.
 */
export function WorkDetail() {
  const { id } = useParams()
  const project = getWork(id)

  usePageTitle(
    project ? `${project.title} — Solvionix Work` : 'Project not found',
    project?.summary,
  )

  if (!project) return <NotFound />

  const relatedSolutions = (project.relatedSolutions ?? []).map(getSolution).filter(Boolean)
  const relatedIndustries = (project.relatedIndustries ?? []).map(getIndustry).filter(Boolean)

  return (
    <>
      <PageHeader title={project.title} description={project.summary}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-semibold border border-line bg-ink-900 px-2 py-1 font-mono text-[0.75rem] tracking-[0.12em] text-fog-300 uppercase">
            {project.label}
          </span>
          {/* A named client replaces the domain in this slot. On a client project
              the domain is implied by the client, and naming them is the more
              useful of the two. */}
          {project.client ? (
            <p className="font-semibold font-mono text-[0.75rem] tracking-[0.12em] text-fog-600 uppercase">
              {project.client} — {project.domain}
            </p>
          ) : (
            <p className="font-semibold font-mono text-[0.75rem] tracking-[0.12em] text-fog-600 uppercase">
              {project.domain}
            </p>
          )}
        </div>
      </PageHeader>

      <Section>
        <div className="container-page">
          {project.screenshot ? (
            <div className="mb-14 overflow-hidden rounded-2xl border border-line-soft bg-ink-950 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line-soft bg-ink-900/90 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/60" />
                  <span className="size-2.5 rounded-full bg-amber-400/60" />
                  <span className="size-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <span className="font-mono text-xs text-fog-500">{project.title} — Production Interface Preview</span>
                <span className="font-mono text-[0.625rem] text-signal-400 font-semibold uppercase">
                  {project.label === 'Client Project' ? 'LIVE DEPLOYMENT' : 'SYSTEM PREVIEW'}
                </span>
              </div>
              <div className={cn("flex w-full items-center justify-center bg-ink-950", project.isMobile ? "py-10 bg-grid-pattern" : "")}>
                <img
                  src={project.screenshot}
                  alt={`${project.title} — production interface`}
                  className={cn(
                    "transition-all duration-300",
                    project.isMobile
                      ? "max-h-[640px] w-auto rounded-3xl border-2 border-line-soft shadow-[0_0_50px_rgba(56,189,248,0.2)]"
                      : "w-full object-cover object-top max-h-[700px]"
                  )}
                />
              </div>
            </div>
          ) : (
            <ProjectVisual
              seed={project.id}
              className="mb-14 overflow-hidden border border-line-soft bg-ink-900"
            />
          )}
          <CaseStudy project={project} />
        </div>
      </Section>

      {/* Supporting detail and the onward links, kept below the case study so the
          reasoning is read first. */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Technology</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Supporting detail for the decisions described above.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
                {project.technology.map((item) => (
                  <span key={item} className="font-semibold font-mono text-sm text-fog-500">
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Solution areas</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {relatedSolutions.map((solution) => (
                  <li key={solution.id}>
                    <ArrowLink to={`/solutions/${solution.id}`}>{solution.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Environments</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">Target areas, not clients.</p>
              <ul className="mt-5 flex flex-col gap-3">
                {relatedIndustries.map((industry) => (
                  <li key={industry.id}>
                    <ArrowLink to={`/industries/${industry.id}`}>{industry.title}</ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal>
            <ProseList
              className="mt-14 max-w-3xl"
              items={[project.status]}
            />
          </Reveal>

          {/* Integrated Closing & Action Panel */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-line-soft bg-gradient-to-r from-ink-900/80 via-ink-950 to-ink-900/60 p-8 sm:p-10 shadow-xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <div className="max-w-xl">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal-400">
                  Similar Operational Challenge?
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-fog-50">
                  Ready to engineer a solution for your operations?
                </h3>
                <p className="mt-2 text-sm text-fog-300 leading-relaxed">
                  We can model, scope, and deliver a production build tailored around your team's specific requirements.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <Button to="/contact" variant="primary" size="md">
                  Discuss your requirements →
                </Button>
                <Button to="/work" variant="secondary" size="md">
                  All systems
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default WorkDetail

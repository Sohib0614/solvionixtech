import { useParams, Link } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { SolutionArchitectureConsole } from '../components/solutions/SolutionArchitectureConsole'
import { ProjectCard } from '../components/work/ProjectCard'
import { solutions, getSolution } from '../data/solutions'
import { getIndustry } from '../data/industries'
import { work } from '../data/work'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'
import { ShieldCheck, GitBranch, Zap, CheckCircle2, Terminal, ArrowRight, Sparkles } from 'lucide-react'

/**
 * /solutions/:id — one solution archetype, in full.
 *
 * Upgraded to senior engineering benchmark:
 * 1. The operational requirement spine (loss, approach, value, scope).
 * 2. An interactive architecture console (flow visualizer & contract spec matrix).
 * 3. Verified production case studies implementing this pattern from real work.
 * 4. Architectural SLAs & engineering guarantees.
 * 5. Architectural tier technology stackup.
 */
export function SolutionDetail() {
  const { id } = useParams()
  const solution = getSolution(id)

  usePageTitle(
    solution ? `${solution.title} — Solvionix Solutions` : 'Solution not found',
    solution?.summary,
  )

  if (!solution) return <NotFound />

  const index = solutions.findIndex((item) => item.id === id)
  const next = solutions[(index + 1) % solutions.length]

  const relatedIndustries = (solution.relatedIndustries ?? []).map(getIndustry).filter(Boolean)

  // Find real projects implementing this solution archetype
  const matchingProjects = work.filter((project) =>
    project.relatedSolutions?.includes(solution.id),
  )

  return (
    <>
      <PageHeader title={solution.title} description={solution.summary}>
        <p className="index-mark">{solution.number} / Solution Archetype</p>
      </PageHeader>

      {/* 01. The Operational Requirement */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <SectionHeader
              eyebrow="The Requirement"
              title="What the business needs"
              description="A solution is defined by the operational friction it removes, not the framework it uses."
            />

            <Reveal delay={0.1} className="lg:pt-4">
              {/* Connected 3-Stage Pipeline Spine */}
              <div className="relative border-l-2 border-signal-400/25 pl-6 sm:pl-8 space-y-6">
                <div className="relative rounded-2xl border border-line bg-gradient-to-r from-ink-900/60 to-ink-950/60 p-6 transition-all hover:border-signal-400/30">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex size-5 items-center justify-center rounded-full bg-signal-400 text-ink-950 font-mono text-[10px] font-bold shadow-md shadow-signal-400/30">
                    1
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                    01 · Operational Bottleneck
                  </span>
                  <p className="mt-2 text-base text-fog-100 font-medium leading-relaxed">
                    {solution.requirement}
                  </p>
                </div>

                <div className="relative rounded-2xl border border-line bg-gradient-to-r from-ink-900/60 to-ink-950/60 p-6 transition-all hover:border-signal-400/30">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex size-5 items-center justify-center rounded-full bg-signal-400 text-ink-950 font-mono text-[10px] font-bold shadow-md shadow-signal-400/30">
                    2
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                    02 · Architectural Strategy
                  </span>
                  <p className="mt-2 text-base text-fog-200 leading-relaxed">
                    {solution.approach}
                  </p>
                </div>

                <div className="relative rounded-2xl border border-line bg-gradient-to-r from-ink-900/60 to-ink-950/60 p-6 transition-all hover:border-signal-400/30">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex size-5 items-center justify-center rounded-full bg-signal-400 text-ink-950 font-mono text-[10px] font-bold shadow-md shadow-signal-400/30">
                    3
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                    03 · Measurable Business Value
                  </span>
                  <p className="mt-2 text-base text-fog-200 leading-relaxed">
                    {solution.value}
                  </p>
                </div>
              </div>

              <h2 className="font-semibold type-h3 mt-12 text-fog-50">Typical Delivery Scope</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {solution.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-line-soft bg-ink-950/60 p-3.5 text-xs font-semibold text-fog-200 transition-colors hover:border-signal-400/30"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-signal-400 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Integrated Requirement Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-line-soft">
                <Button
                  to={`/contact?solution=${solution.id}`}
                  variant="primary"
                  size="md"
                >
                  Start with this requirement →
                </Button>
                <Button
                  to="/contact"
                  variant="secondary"
                  size="md"
                >
                  Book 15-Min Discovery Call
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 02. Interactive System Architecture Console */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="System Architecture"
            title="How the approach is put together"
            description="The layers below run in the order shown. The boundary between them is where the interfaces live, and where the integration risk is contained."
          />

          <div className="mt-10">
            <SolutionArchitectureConsole solution={solution} />
          </div>
        </div>
      </Section>

      {/* 03. Implemented In Real Systems (Proof of Execution) */}
      {matchingProjects.length > 0 && (
        <Section>
          <div className="container-page">
            <SectionHeader
              eyebrow="Proof of Execution"
              title="Implemented in production"
              description={`Explore systems we engineered that implement the ${solution.title} architectural model in real environments.`}
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {matchingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 04. Engineering Guarantees & SLAs */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Architectural Standards"
            title="Non-negotiable delivery commitments"
            description="Every Solvionix solution is delivered under strict engineering standards to ensure permanent maintainability after handover."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <ShieldCheck className="size-6 text-signal-400 mb-4" />
              <h3 className="text-base font-bold text-fog-50">100% Code Ownership</h3>
              <p className="mt-2 text-xs text-fog-400 leading-relaxed">
                Full Git repository handover with clean commit history. No proprietary runtime lock-in.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <GitBranch className="size-6 text-signal-400 mb-4" />
              <h3 className="text-base font-bold text-fog-50">Deterministic Contracts</h3>
              <p className="mt-2 text-xs text-fog-400 leading-relaxed">
                Strict type boundaries and explicit failure queues. No unhandled silent exceptions.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <Zap className="size-6 text-signal-400 mb-4" />
              <h3 className="text-base font-bold text-fog-50">Automated Test Suites</h3>
              <p className="mt-2 text-xs text-fog-400 leading-relaxed">
                Unit and integration test suites covering critical workflows, delivered into your CI/CD.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-ink-900/50 p-6">
              <Terminal className="size-6 text-signal-400 mb-4" />
              <h3 className="text-base font-bold text-fog-50">Telemetry & Runbooks</h3>
              <p className="mt-2 text-xs text-fog-400 leading-relaxed">
                Structured health checks, automated error alerts, and documented operational runbooks.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 05. Application Domains & Technology Stack */}
      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Applied in Industries</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Operating sectors we architect this pattern for.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {relatedIndustries.map((industry) => (
                  <li key={industry.id}>
                    <ArrowLink to={`/industries/${industry.id}`}>
                      {industry.title}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">Core Technology Stack</h2>
              <p className="font-semibold type-support mt-3 text-fog-500">
                Instruments chosen per requirement. The architectural discipline is the point, not the framework.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {solution.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-line bg-ink-900/70 px-3 py-1.5 font-mono text-xs font-semibold text-signal-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <p className="mt-8">
                <ArrowLink to="/capabilities">Explore engineering disciplines</ArrowLink>
              </p>
            </div>
          </div>

          {/* Unified Engineering Consultation & Next Architecture Panel */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-signal-400/30 bg-gradient-to-b from-ink-900/90 via-ink-950 to-ink-950 p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3 py-1 font-mono text-xs font-semibold text-signal-300">
                  <Sparkles className="size-3.5" />
                  <span>Technical Consultation</span>
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                  Architecting a {solution.title} system?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-fog-300 leading-relaxed">
                  Discuss your technical constraints, latency budgets, data schemas, and sprint schedule directly with an engineering lead.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" size="md">
                    Book 15-Min Discovery Call →
                  </Button>
                  <Button to={`/contact?solution=${solution.id}`} variant="secondary" size="md">
                    Scope This Solution
                  </Button>
                </div>
              </div>

              {/* Seamless next architecture teaser */}
              <div className="rounded-2xl border border-line bg-ink-950/70 p-6 lg:max-w-xs w-full">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-400 block mb-1">
                  Next Architecture
                </span>
                <Link
                  to={`/solutions/${next.id}`}
                  className="group block text-lg font-bold text-fog-50 hover:text-signal-300 transition-colors"
                >
                  {next.title}
                  <span className="block text-xs font-normal text-fog-400 mt-1 line-clamp-2">
                    {next.summary}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-signal-400 mt-3 group-hover:gap-1.5 transition-all">
                    <span>Explore architecture</span>
                    <ArrowRight className="size-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default SolutionDetail

import { useParams, Link } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/work/ProjectCard'
import { capabilities, getCapability } from '../data/capabilities'
import { getSolution } from '../data/solutions'
import { work } from '../data/work'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'
import {
  CheckCircle2,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  FileCheck,
  Zap,
} from 'lucide-react'

/**
 * /capabilities/:id — one engineering discipline, in full.
 *
 * Upgraded to senior engineering benchmark:
 * 1. Engineering practice breakdown with architectural principles.
 * 2. Verified Handover Deliverables with explicit verification gates.
 * 3. Engineering Invariants & Standards.
 * 4. Cross-referenced Solutions & Live Production Case Studies.
 * 5. Architectural tooling classified by tier.
 * 6. Direct technical consultation CTA.
 */
export function CapabilityDetail() {
  const { id } = useParams()
  const capability = getCapability(id)

  usePageTitle(
    capability ? `${capability.title} — Solvionix Capabilities` : 'Capability not found',
    capability?.summary,
  )

  if (!capability) return <NotFound />

  const index = capabilities.findIndex((item) => item.id === id)
  const next = capabilities[(index + 1) % capabilities.length]
  const related = (capability.relatedSolutions ?? []).map(getSolution).filter(Boolean)

  // Find real work items that implement solutions related to this capability
  const matchingProjects = work.filter((project) =>
    project.relatedSolutions?.some((solId) =>
      capability.relatedSolutions?.includes(solId),
    ),
  )

  return (
    <>
      <PageHeader title={capability.title} description={capability.summary}>
        <p className="index-mark">{capability.number} / Engineering Discipline</p>
      </PageHeader>

      {/* 01. Practice Areas & Architectural Focus */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Practice"
            title="What the discipline covers"
            description="Our practice rules focus on domain fidelity, deterministic contracts, and long-term maintainability."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capability.practice.map((item, idx) => (
              <Reveal key={item} delay={idx * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-ink-900/40 p-6 transition-all hover:border-signal-400/40 hover:bg-ink-900/60">
                  <div>
                    <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-4">
                      <span className="font-mono text-xs font-bold text-signal-400">
                        RULE // {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Cpu className="size-4 text-fog-500" />
                    </div>
                    <p className="text-sm font-medium text-fog-100 leading-relaxed">
                      {item}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-line-soft/60 flex items-center gap-1.5 text-[11px] font-mono text-fog-500">
                    <span className="size-1.5 rounded-full bg-signal-400" />
                    <span>Production Standard</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 02. Deliverables & Engineering Standards */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Deliverables Column */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="size-5 text-signal-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400">
                  Verification Gates
                </span>
              </div>
              <h2 className="font-bold type-h3 text-fog-50">Handover Deliverables</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                What the client actually receives in source control, validated at delivery against agreed acceptance criteria.
              </p>

              <div className="mt-8 space-y-4">
                {capability.deliverables.map((deliverable, idx) => (
                  <div
                    key={deliverable}
                    className="flex items-start gap-4 rounded-xl border border-line bg-ink-950/70 p-4 transition-all hover:border-line-soft"
                  >
                    <span className="font-mono text-xs font-bold text-signal-300 mt-0.5 shrink-0">
                      [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-fog-100">
                        {deliverable}
                      </h4>
                      <p className="mt-1 text-xs text-fog-400">
                        Audited and handed over with 100% IP ownership in your Git repository.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards Column */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="size-5 text-signal-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400">
                  Non-Negotiable Invariants
                </span>
              </div>
              <h2 className="font-bold type-h3 text-fog-50">Engineering Standards</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                Commitments that prevent architectural drift, security debt, and unmaintainable code after handover.
              </p>

              <div className="mt-8 space-y-4">
                {capability.standards.map((standard) => (
                  <div
                    key={standard}
                    className="flex items-start gap-4 rounded-xl border border-line bg-ink-950/70 p-4 transition-all hover:border-line-soft"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-signal-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-fog-100">
                        {standard}
                      </h4>
                      <p className="mt-1 text-xs text-fog-400">
                        Enforced through automated CI gates and peer review before any branch merge.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03. Applied Solutions & Tangible Work */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Application & Context"
            title="Where this discipline is applied"
            description="Engineering disciplines exist to power concrete operational solutions and production builds."
          />

          {/* Related Solutions Grid */}
          {related.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((solution) => (
                <Link
                  key={solution.id}
                  to={`/solutions/${solution.id}`}
                  className="group flex flex-col justify-between rounded-xl border border-line bg-ink-900/40 p-5 transition-all hover:border-signal-400/50 hover:bg-ink-900/80"
                >
                  <div>
                    <span className="font-mono text-xs text-signal-400 font-semibold">
                      {solution.number} / SOLUTION
                    </span>
                    <h4 className="text-base font-bold text-fog-50 mt-1 group-hover:text-signal-300 transition-colors">
                      {solution.title}
                    </h4>
                    <p className="mt-2 text-xs text-fog-400 line-clamp-2">
                      {solution.summary}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-signal-300">
                    <span>View Solution Archetype</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Matching Production Case Studies */}
          {matchingProjects.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-signal-400">
                    Case Studies
                  </span>
                  <h3 className="text-xl font-bold text-fog-50 mt-1">
                    Production Systems Exercising This Discipline
                  </h3>
                </div>
                <Link
                  to="/work"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-signal-300 hover:underline"
                >
                  <span>ALL CASE STUDIES</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {matchingProjects.slice(0, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 04. Technology Stack & Consultation */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-bold type-h3 text-fog-50">Tools & Technologies</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                Chosen per requirement. The discipline principles above are the argument; these are the instruments.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {capability.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-line bg-ink-900/80 px-3.5 py-2 font-mono text-xs font-semibold text-fog-200 shadow-sm"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold type-h3 text-fog-50">Execution Guarantee</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                Every project built by Solvionix in this discipline includes:
              </p>
              <ul className="mt-6 space-y-3 font-mono text-xs text-fog-300">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-signal-400" />
                  <span>Full CI/CD Pipeline & GitHub Actions Automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-signal-400" />
                  <span>100% Comprehensive Intellectual Property Assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-signal-400" />
                  <span>Disaster Recovery & Tested Rollback Runbook</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-signal-400" />
                  <span>Zero Proprietary Framework or Vendor Lock-in</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Unified Engineering Capacity & Next Discipline Panel */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-signal-400/30 bg-gradient-to-b from-ink-900/90 via-ink-950 to-ink-950 p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                  Engineering Capacity
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                  Need senior engineering in {capability.title}?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-fog-300 leading-relaxed">
                  Whether you require a fixed-price sprint, architecture audit, or an embedded engineering squad, discuss your project directly with our lead engineers.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" size="md">
                    Book 15-Min Discovery Call →
                  </Button>
                  <Button to={`/contact?capability=${capability.id}`} variant="secondary" size="md">
                    Discuss Technical Specs
                  </Button>
                </div>
              </div>

              {/* Next discipline */}
              <div className="rounded-2xl border border-line bg-ink-950/70 p-6 lg:max-w-xs w-full">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-400 block mb-1">
                  Next Discipline
                </span>
                <Link
                  to={`/capabilities/${next.id}`}
                  className="group block text-lg font-bold text-fog-50 hover:text-signal-300 transition-colors"
                >
                  {next.title}
                  <span className="block text-xs font-normal text-fog-400 mt-1 line-clamp-2">
                    {next.summary}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-signal-400 mt-3 group-hover:gap-1.5 transition-all">
                    <span>Explore discipline</span>
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

export default CapabilityDetail

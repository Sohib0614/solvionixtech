import { useParams, Link } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/work/ProjectCard'
import { industries, getIndustry } from '../data/industries'
import { getSolution } from '../data/solutions'
import { work } from '../data/work'
import { usePageTitle } from '../lib/usePageTitle'
import { NotFound } from './NotFound'
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Server,
  Layers,
  FileCheck,
} from 'lucide-react'

// Industry compliance & data constraints
const industryComplianceMap = {
  healthcare: {
    standard: 'HIPAA & GDPR Compliant',
    dataSecurity: 'Zero-knowledge encryption, strictly role-gated patient data access',
    retention: 'Immutable audit logs with consent lifecycle management',
    latency: 'Sub-second clinic schedule locks to prevent double-booking',
  },
  'real-estate': {
    standard: 'SOC2 & Real Estate Standards Org (RESO)',
    dataSecurity: 'Granular permissions per transaction party & encrypted document vaults',
    retention: 'Audit-ready transaction records across full conveyancing lifecycle',
    latency: 'Real-time MLS / channel sync under 2 seconds to avoid stale listings',
  },
  'professional-services': {
    standard: 'Strict Client Privilege & SOC2 Type II',
    dataSecurity: 'Matter-isolated databases with mandatory ethical conflict barriers',
    retention: 'Append-only legal instruction log with complete version ancestry',
    latency: 'Local-first offline capture with zero-loss background synchronization',
  },
  hospitality: {
    standard: 'PCI-DSS Level 1 & GDPR',
    dataSecurity: 'Tokenized payment details & decoupled guest communication channels',
    retention: 'Centralized availability authority with atomic reservation locks',
    latency: 'Instant multi-channel inventory updates to eliminate overselling',
  },
}

/**
 * /industries/:id — one operating environment, in full.
 *
 * Upgraded to senior engineering benchmark:
 * 1. Environment conditions & regulatory constraints.
 * 2. Requirements & technical architecture responses.
 * 3. Tangible Case Studies from real work matching this industry.
 * 4. Architectural compliance invariants.
 * 5. Related Solution archetypes with direct deep-links.
 * 6. Direct technical consultation CTA.
 */
export function IndustryDetail() {
  const { id } = useParams()
  const industry = getIndustry(id)

  usePageTitle(
    industry ? `${industry.title} — Solvionix Industries` : 'Industry not found',
    industry?.summary,
  )

  if (!industry) return <NotFound />

  const index = industries.findIndex((item) => item.id === id)
  const next = industries[(index + 1) % industries.length]
  const related = (industry.relatedSolutions ?? []).map(getSolution).filter(Boolean)

  const compliance = industryComplianceMap[industry.id] || industryComplianceMap['professional-services']

  // Find real systems matching this industry
  const matchingProjects = work.filter((project) =>
    project.relatedIndustries?.includes(industry.id),
  )

  return (
    <>
      <PageHeader title={industry.title} description={industry.summary}>
        <p className="index-mark">{industry.number} / Operating Sector</p>
      </PageHeader>

      {/* 01. Operating Conditions & Constraints */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Operating Environment"
            title="Operating conditions & constraints"
            description="Software fails when it assumes universal conditions. In this sector, data sensitivities and workflow rhythms define the architecture."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {industry.conditions.map((condition, idx) => (
              <Reveal key={condition} delay={idx * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-ink-900/40 p-6 transition-all hover:border-signal-400/40 hover:bg-ink-900/60">
                  <div>
                    <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-4">
                      <span className="font-mono text-xs font-bold text-signal-400">
                        CONSTRAINT // {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Lock className="size-4 text-fog-500" />
                    </div>
                    <p className="text-sm font-medium text-fog-100 leading-relaxed">
                      {condition}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-line-soft/60 flex items-center gap-1.5 text-[11px] font-mono text-fog-500">
                    <span className="size-1.5 rounded-full bg-signal-400" />
                    <span>Architectural Invariant</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 02. Technical Requirements & Compliance Invariants */}
      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Requirements Column */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="size-5 text-signal-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400">
                  System Demands
                </span>
              </div>
              <h2 className="font-bold type-h3 text-fog-50">Architectural Requirements</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                Each requirement is a structural system to engineer, not a generic feature to plug in.
              </p>

              <div className="mt-8 space-y-3.5">
                {industry.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-3.5 rounded-xl border border-line bg-ink-950/70 p-4 transition-all hover:border-line-soft"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-signal-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-fog-100">
                        {req}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Data Invariants Column */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="size-5 text-signal-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400">
                  Data & Governance
                </span>
              </div>
              <h2 className="font-bold type-h3 text-fog-50">Sector Governance & Security</h2>
              <p className="font-semibold type-support mt-3 text-fog-400">
                Non-negotiable security postures enforced for this specific operational sector.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-line bg-ink-950/70 p-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-signal-400">
                    Regulatory Standard
                  </span>
                  <p className="mt-1 text-sm font-semibold text-fog-100">
                    {compliance.standard}
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-ink-950/70 p-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-signal-400">
                    Data Security Architecture
                  </span>
                  <p className="mt-1 text-sm text-fog-300">
                    {compliance.dataSecurity}
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-ink-950/70 p-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-signal-400">
                    Audit Trail & Lifecycle
                  </span>
                  <p className="mt-1 text-sm text-fog-300">
                    {compliance.retention}
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-ink-950/70 p-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-signal-400">
                    Latency & Consistency Objective
                  </span>
                  <p className="mt-1 text-sm text-fog-300">
                    {compliance.latency}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03. Production Case Studies in this Industry */}
      {matchingProjects.length > 0 && (
        <Section>
          <div className="container-page">
            <SectionHeader
              eyebrow="Proof of Work"
              title={`Systems engineered for ${industry.title}`}
              description="Explore real architectures and client solutions solving the specific friction points of this operating sector."
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {matchingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* 04. Applied Solution Archetypes */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Solution Mapping"
            title="The solution areas this maps to"
            description="Each solution archetype provides an established, reusable pattern for this sector's requirements."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((solution) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.id}`}
                className="group flex flex-col justify-between rounded-xl border border-line bg-ink-900/40 p-6 transition-all hover:border-signal-400/50 hover:bg-ink-900/80"
              >
                <div>
                  <span className="font-mono text-xs text-signal-400 font-semibold">
                    {solution.number} / ARCHETYPE
                  </span>
                  <h3 className="text-lg font-bold text-fog-50 mt-1.5 group-hover:text-signal-300 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="mt-2 text-xs text-fog-400 line-clamp-3">
                    {solution.summary}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-signal-300">
                  <span>Inspect System Flow</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Unified Sector Specialization & Next Environment Panel */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-signal-400/30 bg-gradient-to-b from-ink-900/90 via-ink-950 to-ink-950 p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                  Sector Specialization
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                  Operating in {industry.title}?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-fog-300 leading-relaxed">
                  Discuss your operational bottlenecks, compliance hurdles, data residency, and integration architecture directly with our team.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" size="md">
                    Book 15-Min Discovery Call →
                  </Button>
                  <Button to={`/contact?industry=${industry.id}`} variant="secondary" size="md">
                    Discuss Sector Requirements
                  </Button>
                </div>
              </div>

              {/* Next environment */}
              <div className="rounded-2xl border border-line bg-ink-950/70 p-6 lg:max-w-xs w-full">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-400 block mb-1">
                  Next Environment
                </span>
                <Link
                  to={`/industries/${next.id}`}
                  className="group block text-lg font-bold text-fog-50 hover:text-signal-300 transition-colors"
                >
                  {next.title}
                  <span className="block text-xs font-normal text-fog-400 mt-1 line-clamp-2">
                    {next.summary}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-signal-400 mt-3 group-hover:gap-1.5 transition-all">
                    <span>Explore sector</span>
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

export default IndustryDetail

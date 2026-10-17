import { Link } from 'react-router-dom'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { MonogramAvatar } from '../components/ui/MonogramAvatar'
import { DeliveryTimeline } from '../components/common/DeliveryTimeline'
import { KeyLines, PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { companyPage } from '../data/content'
import { deliveryStages } from '../data/delivery'
import { usePageTitle } from '../lib/usePageTitle'
import { ArrowRight, ShieldCheck, Cpu } from 'lucide-react'

/**
 * /company — who Solvionix is and how it operates.
 *
 * Four questions in order: why we exist, how we think about technology,
 * how we work with an organisation, and where we are going.
 * The delivery lifecycle is the proof of the third one.
 */
export function Company() {
  usePageTitle(companyPage.title, companyPage.description)

  const narrative = [
    { ...companyPage.exists, eyebrow: 'Why' },
    { ...companyPage.thinks, eyebrow: 'Thinking' },
    { ...companyPage.works, eyebrow: 'Working' },
    { ...companyPage.going, eyebrow: 'Direction' },
  ]

  return (
    <>
      <PageHeader title={companyPage.title} description={companyPage.description} />

      <Section>
        <div className="container-page">
          <div className="space-y-16 lg:space-y-20">
            {narrative.map((block, index) => (
              <Reveal key={block.title}>
                <article
                  className={`grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16 ${
                    index > 0 ? 'rule-top pt-14' : ''
                  }`}
                >
                  <div>
                    <p className="index-mark">{block.eyebrow}</p>
                    <h2 className="font-semibold type-h2 mt-3 text-fog-50">{block.title}</h2>
                  </div>

                  <div className="space-y-5">
                    {block.body.map((paragraph) => (
                      <p key={paragraph} className="font-semibold type-body max-w-3xl text-fog-200">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* The delivery lifecycle */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Delivery"
            title="The software delivery lifecycle"
            description="Nine stages, the same on every engagement. Each one produces a written output, so a client is never asked to take a decision on trust alone."
          />

          <div className="mt-14">
            <DeliveryTimeline stages={deliveryStages} />
          </div>
        </div>
      </Section>

      {/* Founder & Leadership Spotlight */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Leadership"
            title="Founder & Technical Direction"
            description="Solvionix is engineered and led from the front. The person who architects your system is the person directly accountable for its production delivery."
          />

          <div className="glass-card mt-12 rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/[0.08]">
            {/* Blueprint Grid & Lighting Accents */}
            <div className="blueprint-grid absolute inset-0 opacity-25 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-signal-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14 items-start relative z-10">
              {/* Founder Avatar & Title */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-signal-400/40 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(56,189,248,0.15)] aspect-[3/4] max-w-[17rem] bg-ink-950">
                  <MonogramAvatar
                    name="Muhammad Sohib"
                    initials="MS"
                    image="/founder/muhammad_sohib.jpg"
                    className="size-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-fog-50">Muhammad Sohib</h3>
                  <p className="font-mono text-xs font-semibold text-signal-400">Founder & Solutions Architect</p>
                  <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/20 bg-signal-400/10 px-3 py-1 mt-2">
                    <span className="size-1.5 rounded-full bg-signal-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-fog-300">24 Years Old • Systems & AI Engineer</span>
                  </div>
                </div>
              </div>

              {/* Founder Narrative & Philosophy */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-fog-50 leading-snug">
                    "We don't sell bloated agency hours or layer bureaucracy. We engineer tangible leverage that businesses own completely."
                  </h4>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-fog-300">
                    Muhammad Sohib founded Solvionix with a clear conviction: modern businesses do not need another bloated vendor with endless account managers—they need direct, high-velocity engineering from professionals who understand the entire stack. At 24, he drives Solvionix with deep technical immersion and architectural discipline, translating complex operational challenges into lean, automated software products.
                  </p>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-fog-300">
                    Under his direction, every engagement is treated as a dedicated engineering partnership. From initial discovery blueprinting and database schema design to automated LLM agents, cloud deployments, and handover documentation, systems are engineered for deterministic reliability, high throughput, and zero vendor lock-in.
                  </p>
                </div>

                {/* Core Focus Badges */}
                <div className="pt-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-fog-400 block mb-3">
                    Architectural & Engineering Focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Applied AI & RAG Agents',
                      'Full-Stack Architecture (React / Python / Node)',
                      'High-Throughput APIs & Microservices',
                      'Deterministic Business Automation',
                      'Cloud Infrastructure & Docker',
                      'Database Schema & Data Pipelines',
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-xl border border-line/80 bg-ink-950/70 px-3.5 py-1.5 text-xs font-medium text-fog-200 hover:border-signal-400/40 hover:text-signal-200 hover:bg-ink-900/60 transition-all"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button to="/contact" variant="primary" size="sm" className="shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                    Schedule Discovery with Muhammad →
                  </Button>
                  <a
                    href="https://wa.me/923041871434?text=Hi%20Muhammad%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20Solvionix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
                  >
                    <span>Chat on WhatsApp</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    to="/team"
                    className="text-xs font-semibold text-fog-400 hover:text-fog-200 transition-colors ml-auto sm:ml-0"
                  >
                    View Team Profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* How the company is set up, stated as structure rather than as size. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Structure" title={companyPage.structure.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <KeyLines
                rows={companyPage.structure.rows.map((row) => ({
                  label: row.label,
                  body: row.value,
                  mono: true,
                }))}
              />
            </Reveal>
          </div>

          {/* Unified Engineering Partnership & Team Panel */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-signal-400/30 bg-gradient-to-b from-ink-900/90 via-ink-950 to-ink-950 p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs uppercase tracking-wider text-signal-400 font-semibold">
                  Engineering Partnership
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-fog-50 sm:text-3xl">
                  Ready to engineer your next system?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-fog-300 leading-relaxed">
                  We engage as dedicated pods or fixed-price sprint partners. Discuss your architecture requirements directly with us.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button to="/contact" variant="primary" size="md">
                    Book 15-Min Discovery Call →
                  </Button>
                  <Button to="/contact" variant="secondary" size="md">
                    Discuss Architecture Requirements
                  </Button>
                </div>
              </div>

              {/* Team link */}
              <div className="rounded-2xl border border-line bg-ink-950/70 p-6 lg:max-w-xs w-full">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-400 block mb-1">
                  Our People
                </span>
                <Link
                  to="/team"
                  className="group block text-lg font-bold text-fog-50 hover:text-signal-300 transition-colors"
                >
                  {companyPage.teamLink.title}
                  <span className="block text-xs font-normal text-fog-400 mt-1 line-clamp-2">
                    {companyPage.teamLink.body}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-signal-400 mt-3 group-hover:gap-1.5 transition-all">
                    <span>Meet the team</span>
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

export default Company

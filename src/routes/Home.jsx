import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ProjectEstimator } from '../components/common/ProjectEstimator'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { TechEcosystemStrip } from '../components/common/TechEcosystemStrip'
import { ClientProblems } from '../components/common/ClientProblems'
import { EngagementModels } from '../components/common/EngagementModels'
import { TrustGuarantees } from '../components/common/TrustGuarantees'
import { SolutionsBentoGrid } from '../components/solutions/SolutionsBentoGrid'
import { ProjectCard } from '../components/work/ProjectCard'
import { featuredWork } from '../data/work'
import { usePageTitle } from '../lib/usePageTitle'
import { Calendar, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'

/**
 * The home page — streamlined, high-impact engineering studio narrative.
 *
 * Sequence:
 *   1. Hero + Proof Counters (First impression & credibility)
 *   2. Tech Ecosystem Strip (Social proof of modern stack)
 *   3. What We Build — Solutions Bento Grid (Architecture & interactive AI flow)
 *   4. Verified Builds — Featured Work (Browser mockups & KPI benchmarks)
 *   5. Interactive Scope & Schedule Estimator (Direct sprint estimation)
 *   6. Engagement Models & Trust Guarantees (Transparent pod pricing & enterprise IP)
 *   7. High-Impact Closing CTA (Direct booking action path)
 */
export function Home() {
  usePageTitle()

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Core Tech Ecosystem Strip */}
      <TechEcosystemStrip />

      {/* 2.5. Client Problems — Problem-First Architecture */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Client Challenges"
            title="What is slowing your business down?"
            description="Most companies don’t start with an AI framework or a database specification. They start with a problem. Tell us what's happening; we engineer the solution."
            actions={
              <ArrowLink to="/contact" className="font-semibold text-[1.0625rem]">
                Tell us your challenge
              </ArrowLink>
            }
          />

          <div className="mt-10">
            <ClientProblems />
          </div>
        </div>
      </Section>

      {/* 3. Solutions Bento Grid */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Architecture & Solutions"
            title="Software engineered around your business operations"
            description="We design and deploy high-throughput digital products, AI automation pipelines, and resilient internal platforms."
            actions={
              <ArrowLink to="/solutions" className="font-semibold text-[1.0625rem]">
                Explore all 5 solutions
              </ArrowLink>
            }
          />

          <div className="mt-12">
            <SolutionsBentoGrid />
          </div>
        </div>
      </Section>

      {/* 4. Selected Work (Case Studies) */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Proof of Work"
            title="Featured production builds & architectures"
            description="Explore systems engineered for reliability, deterministic state transitions, and zero operational friction."
            actions={
              <ArrowLink to="/work" className="font-semibold text-[1.0625rem]">
                View all case studies
              </ArrowLink>
            }
          />

          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:gap-x-12">
            {featuredWork.slice(0, 4).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Interactive Project Scope & Timeline Estimator */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Interactive Planning"
            title="Estimate your project scope & delivery schedule"
            description="Select your target architecture, deployment scale, and required modules to calculate an estimated sprint turnaround."
          />

          <div className="mt-12">
            <ProjectEstimator />
          </div>
        </div>
      </Section>

      {/* 6. Engagement Models & Enterprise Guarantees */}
      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Engagement & Trust"
            title="Transparent models, guaranteed code ownership"
            description="Engage as a fixed-price MVP sprint, a dedicated embedded engineering pod, or an architecture advisory partner."
          />

          <div className="mt-12">
            <EngagementModels />
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="size-5 text-signal-400" />
              <h3 className="text-xl font-bold text-fog-50">
                Non-Negotiable Delivery Commitments
              </h3>
            </div>
            <TrustGuarantees />
          </div>
        </div>
      </Section>

      {/* 7. High-Impact Closing CTA Banner */}
      <Section tone="raised">
        <div className="container-page">
          <div className="glass-card blueprint-grid relative overflow-hidden rounded-3xl border-signal-400/40 p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(56,189,248,0.12)]">
            {/* Ambient background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-signal-400/15 blur-[120px]"
            />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3 py-1 font-mono text-xs font-semibold text-signal-300">
                <Sparkles className="size-3.5" />
                <span>Ready to start building?</span>
              </span>

              <h2 className="font-display mt-5 text-3xl font-extrabold tracking-tight text-fog-50 sm:text-4xl lg:text-5xl">
                Turn your operational friction into an engineered system.
              </h2>

              <p className="mt-4 text-base font-medium text-fog-300 sm:text-lg leading-relaxed">
                Whether you need to replace messy spreadsheets, automate repetitive back-office handling, or launch a multi-tenant SaaS, our engineering team is ready to scope your build.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  to="/contact"
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  <span>Book a 15-Min Discovery Call</span>
                  <ArrowRight className="size-4 ml-1" />
                </Button>

                <Button
                  to="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Submit Written Project Brief
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-line-soft text-xs font-mono text-fog-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-signal-400" />
                  <span>100% IP & Source Code Ownership</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-signal-400" />
                  <span>Direct Access to Engineering Leads</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-signal-400" />
                  <span>Zero Vendor Lock-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Home

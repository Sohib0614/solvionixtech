import { useState } from 'react'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/work/ProjectCard'
import { caseStudySections, work } from '../data/work'
import { workPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react'

/**
 * /work — evidence of system thinking.
 *
 * The page opens by explaining how a project is presented, because the
 * structure is part of the evidence. Then the projects, then the case study
 * format. The disclosure is stated on this page rather than hidden behind each
 * card: client and demonstration builds are clearly labelled.
 */
export function Work() {
  usePageTitle(workPage.title, workPage.description)
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredWork = work.filter((project) => {
    if (activeFilter === 'client') return project.label === 'Client Project'
    if (activeFilter === 'demo') return project.label !== 'Client Project'
    return true
  })

  const clientCount = work.filter((p) => p.label === 'Client Project').length
  const demoCount = work.filter((p) => p.label !== 'Client Project').length

  return (
    <>
      <PageHeader title={workPage.title} description={workPage.description} />

      {/* How a project is read, stated before the projects themselves. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow={workPage.systems.eyebrow}
              title={workPage.systems.title}
            />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{workPage.systems.body}</p>

              {/* The nine headings, so the structure is visible without opening a project. */}
              <ProseList
                className="mt-8 max-w-xl"
                columns
                items={caseStudySections.map((section) => `${section.number} ${section.title}`)}
              />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Systems"
              title="Client and demonstration systems"
              description="Each one presented as a system rather than a portfolio entry, with the operational problem and the reasoning stated in full."
            />

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-line bg-ink-950/80 p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-ink-800 text-signal-300 shadow-sm border border-line-soft font-semibold'
                    : 'text-fog-400 hover:text-fog-200'
                }`}
              >
                All Systems ({work.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('client')}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  activeFilter === 'client'
                    ? 'bg-ink-800 text-signal-300 shadow-sm border border-line-soft font-semibold'
                    : 'text-fog-400 hover:text-fog-200'
                }`}
              >
                Client Work ({clientCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('demo')}
                className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                  activeFilter === 'demo'
                    ? 'bg-ink-800 text-signal-300 shadow-sm border border-line-soft font-semibold'
                    : 'text-fog-400 hover:text-fog-200'
                }`}
              >
                Prototypes & Demo ({demoCount})
              </button>
            </div>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
            {filteredWork.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Section>

      {/* Case Study Standards Section */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow={workPage.caseStudy.eyebrow}
              title={workPage.caseStudy.title}
            />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{workPage.caseStudy.body}</p>
              <p className="mt-8">
                <ArrowLink to="/work/case-studies">Inspect the 9-part case study format</ArrowLink>
              </p>
            </Reveal>
          </div>

          <PageClose
            className="mt-16"
            title={workPage.closing.title}
            body={workPage.closing.body}
            link={
              <Button to="/contact" variant="primary" size="md">
                Discuss your system requirements →
              </Button>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Work

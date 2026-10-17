import { PageHeader } from '../components/ui/PageHeader'
import { PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { ProjectCard } from '../components/work/ProjectCard'
import { workDisclosure, workPage } from '../data/content'
import { work } from '../data/work'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /work/projects — the full project index.
 *
 * Split out from /work so the listing has a stable, linkable URL of its own
 * rather than living as an anchor on a page that will keep changing. The
 * disclosure is repeated here: this is the page somebody would link to, so it
 * has to carry the label on its own.
 */
export function WorkProjects() {
  usePageTitle('Demonstration and internal projects', workPage.description)

  return (
    <>
      <PageHeader
        title="Demonstration and internal projects"
        description={`Every build published by Solvionix to date, presented as a system. ${workDisclosure}`}
      />

      <Section>
        <div className="container-page">
          <SectionHeader
            eyebrow="Index"
            title={`${work.length} builds, one structure`}
            description="Read in the same order each time: the operating context, the challenge, the approach, the architecture, and where the build currently stands."
          />

          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:gap-x-16">
            {work.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <Reveal>
            <PageClose
              className="mt-20"
              title="What a client project page adds"
              body="A client project carries the same nine sections. The difference is section eight, where outcomes describe implemented capability and current status rather than performance figures we have not measured, and the client's written permission is on record before anything is published."
              link={<span className="font-semibold type-support text-fog-500">Nothing is published without it.</span>}
            />
          </Reveal>
        </div>
      </Section>
    </>
  )
}

export default WorkProjects

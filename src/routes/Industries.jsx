import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { IndustryRow } from '../components/industries/IndustryRow'
import { industries } from '../data/industries'
import { industriesPage, targetAreasNote } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /industries — where the solutions are designed to apply.
 *
 * Each industry gets two columns: the operating conditions, then the
 * requirements that follow from them. That ordering is the argument — an
 * industry is understood before the technology is proposed.
 */
export function Industries() {
  usePageTitle(industriesPage.title, industriesPage.description)

  return (
    <>
      <PageHeader title={industriesPage.title} description={industriesPage.description} />

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Scope" title="Why the environment matters" />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">
                The same engineering answer is wrong in a different environment. Data
                sensitivity, compliance, transaction volume and customer expectation all
                change the architecture, which is why each area gets its own page.
              </p>
              <p className="font-semibold type-support mt-6 border-l-2 border-line pl-4 text-fog-500">
                {targetAreasNote}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 space-y-16">
            {industries.map((industry) => (
              <IndustryRow key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <PageClose
            title={industriesPage.closing.title}
            body={industriesPage.closing.body}
            link={
              <Button to="/contact" variant="primary" size="md">
                Discuss your requirements →
              </Button>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Industries

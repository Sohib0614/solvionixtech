import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { KeyLines, PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { CapabilitySection } from '../components/capabilities/CapabilitySection'
import { capabilities } from '../data/capabilities'
import { capabilitiesPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /capabilities — how the solutions get built.
 *
 * The page opens by drawing the distinction from Solutions explicitly, because
 * that separation is the thing a technical evaluator is checking for. If a CTO
 * cannot tell what you solve from what you do to solve it, the answer is that
 * you are a vendor.
 */
export function Capabilities() {
  usePageTitle(capabilitiesPage.title, capabilitiesPage.description)

  return (
    <>
      <PageHeader title={capabilitiesPage.title} description={capabilitiesPage.description} />

      {/* The distinction, stated before the content so the reader has a frame. */}
      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Framing" title={capabilitiesPage.distinction.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <KeyLines
                rows={capabilitiesPage.distinction.rows.map((row) => ({
                  label: row.question,
                  body: row.answer,
                }))}
              />
            </Reveal>
          </div>

          <div className="mt-16 space-y-16">
            {capabilities.map((capability) => (
              <CapabilitySection key={capability.id} capability={capability} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <PageClose
            title={capabilitiesPage.closing.title}
            body={capabilitiesPage.closing.body}
            link={
              <Button to="/work" variant="primary" size="md">
                View selected work →
              </Button>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Capabilities

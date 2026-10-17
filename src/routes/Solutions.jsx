import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { ProseList, PageClose } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { SolutionRow } from '../components/solutions/SolutionRow'
import { solutions } from '../data/solutions'
import { industries } from '../data/industries'
import { solutionsPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /solutions — what a business problem requires.
 *
 * The five solutions are written as sections, not cards, because the page's
 * argument is sequential: a requirement, an approach to it, and the value that
 * removes. A card grid would flatten that into a list of equivalent services,
 * which is exactly what this company is not.
 */
export function Solutions() {
  usePageTitle(solutionsPage.title, solutionsPage.description)

  return (
    <>
      <PageHeader title={solutionsPage.title} description={solutionsPage.description} />

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Framing" title={solutionsPage.intro.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{solutionsPage.intro.body}</p>
            </Reveal>
          </div>

          <div className="mt-16 space-y-16">
            {solutions.map((solution) => (
              <SolutionRow key={solution.id} solution={solution} />
            ))}
          </div>
        </div>
      </Section>

      {/* The bridge to the next question in the journey: does this apply to the
          environment I work in? */}
      <Section tone="raised">
        <div className="container-page">
          <SectionHeader
            eyebrow="Applied to"
            title="Where these solutions are used"
            description="The same engineering answers are shaped by the operating environment. Each of these is an area we design for, not a client list."
            actions={
              <ArrowLink to="/industries" className="font-semibold text-[1.0625rem]">
                Explore industry solutions
              </ArrowLink>
            }
          />

          <ProseList
            className="mt-10 max-w-3xl"
            columns
            items={industries.map((industry) => `${industry.title} — ${industry.summary}`)}
          />
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <PageClose
            title={solutionsPage.closing.title}
            body={solutionsPage.closing.body}
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

export default Solutions

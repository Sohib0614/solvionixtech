import { PageHeader } from '../components/ui/PageHeader'
import { KeyLines, PageClose, ProseList } from '../components/common/KeyLines'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { caseStudySections } from '../data/work'
import { workPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /work/case-studies — the case study format, published in advance.
 *
 * This page exists so the structure is on the record before there is anything
 * to fill it with. Publishing the format now means the first client case study
 * is a data change, not a redesign — and it is a more honest answer than an
 * empty "coming soon" page, because a reader can see exactly what would be
 * claimed, and what would be left out.
 */
export function WorkCaseStudies() {
  usePageTitle('Case study format', workPage.caseStudy.title)

  return (
    <>
      <PageHeader
        title="Case study format"
        description={workPage.caseStudy.body}
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <SectionHeader
              eyebrow="Structure"
              title="Nine sections, in this order"
              description="The order is the argument: the business situation, then the failure, then the reasoning, and only at the end the outcome."
            />

            <Reveal delay={0.1}>
              <ol className="border-t border-line">
                {caseStudySections.map((section) => (
                  <li
                    key={section.number}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_1fr] sm:gap-6"
                  >
                    <p className="index-mark">{section.number}</p>
                    <div>
                      <h2 className="text-[0.9375rem] font-bold text-fog-50">{section.title}</h2>
                      <p className="font-semibold type-support mt-1.5 text-fog-400">{section.hint}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-semibold type-h3 text-fog-50">What a case study will never contain</h2>
              <ProseList
                className="mt-6"
                items={[
                  'A number that has not been measured',
                  'A client, a logo or a testimonial without written permission',
                  'Revenue, conversion or time saved presented as a promise',
                  'An award, a certification or a partner logo used as evidence',
                ]}
              />
            </div>

            <div>
              <h2 className="font-semibold type-h3 text-fog-50">What replaces the numbers</h2>
              <KeyLines
                className="mt-6"
                rows={[
                  { label: 'System scope', body: 'The boundaries of what was built, stated explicitly.' },
                  { label: 'Implemented capabilities', body: 'What the system demonstrably does, as a list.' },
                  { label: 'Demonstrated workflow', body: 'The path through the system, step by step.' },
                  { label: 'Current status', body: 'Where the build actually is, without embellishment.' },
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <PageClose
            title={workPage.closing.title}
            body={workPage.closing.body}
          />
        </div>
      </Section>
    </>
  )
}

export default WorkCaseStudies

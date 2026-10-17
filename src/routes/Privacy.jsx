import { PageHeader } from '../components/ui/PageHeader'
import { Reveal, Section } from '../components/ui/Reveal'
import { privacyPage } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /legal/privacy — written to match what the code actually does.
 *
 * The reason this page is specific rather than generic: a boilerplate policy
 * would claim data handling the site does not do, and understate the handling
 * it does. Every statement here is checkable against the code, and the site
 * makes no network call to a third party.
 *
 * Terms are deliberately absent. There is no commercial engagement, no
 * subscription and no paid product, so publishing terms of sale would be
 * inventing a legal relationship that does not exist yet.
 */
export function Privacy() {
  usePageTitle(privacyPage.title, privacyPage.description)

  return (
    <>
      <PageHeader title={privacyPage.title} description={privacyPage.description}>
        <p className="font-semibold type-support text-fog-500">Last reviewed: {privacyPage.lastReviewed}</p>
      </PageHeader>

      <Section>
        <div className="container-page">
          <div className="measure mx-auto">
            <Reveal>
              <dl className="border-t border-line">
                {privacyPage.sections.map((section) => (
                  <div key={section.title} className="border-b border-line py-8">
                    <dt className="font-semibold type-h3 text-fog-50">{section.title}</dt>
                    <dd className="font-semibold type-body mt-4 text-fog-300">{section.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Privacy

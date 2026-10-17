import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { PageClose } from '../components/common/KeyLines'
import { MemberProfile } from '../components/team/MemberProfile'
import { Section, Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/common/SectionHeader'
import { teamPage } from '../data/content'
import { teamMembers } from '../data/team'
import { usePageTitle } from '../lib/usePageTitle'

/**
 * /team — the people responsible for delivery.
 *
 * The page states its own editorial policy, because for a company without a
 * large published team the absence of credentials is conspicuous and should be
 * explained rather than left to look like an omission. Names, roles and
 * specialisations are published because they are agreed; anything unverified is
 * left out rather than approximated.
 */
export function Team() {
  usePageTitle(teamPage.title, teamPage.description)

  return (
    <>
      <PageHeader title={teamPage.title} description={teamPage.description} />

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Editorial policy" title={teamPage.note.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{teamPage.note.body}</p>
            </Reveal>
          </div>

          <div className="mt-16 space-y-16">
            {teamMembers.map((member) => (
              <MemberProfile key={member.id} member={member} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeader eyebrow="Engagement" title={teamPage.closing.title} />
            <Reveal delay={0.1} className="lg:pt-16">
              <p className="font-semibold type-body text-fog-200">{teamPage.closing.body}</p>
            </Reveal>
          </div>

          <PageClose
            className="mt-16"
            title="How the work is organised"
            body="The delivery lifecycle, the company structure and the direction are all on the company page."
            link={
              <Button to="/company" variant="primary" size="md">
                About the company →
              </Button>
            }
          />
        </div>
      </Section>
    </>
  )
}

export default Team

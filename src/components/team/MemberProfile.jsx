import { ProseList } from '../common/KeyLines'
import { MonogramAvatar } from '../ui/MonogramAvatar'
import { SocialIcon } from '../ui/SocialIcon'
import { Reveal } from '../ui/Reveal'

/**
 * One team member, presented as a profile.
 *
 * Written as a profile rather than a card because a small team should be shown
 * as people, with their specialisation and responsibilities legible, not as a
 * row of headshots that has to be clicked into. It also removes the need for a
 * separate profile route.
 *
 * Everything rendered here comes from `data/team.js` and nothing is inferred:
 * if a member has no stated responsibilities, no section is drawn, and if a
 * social URL is not configured the icon stays inert rather than becoming a dead
 * link.
 */
export function MemberProfile({ member }) {
  const socials = [
    member.linkedin ? { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', href: member.linkedin } : null,
    member.github ? { id: 'github', label: 'GitHub', icon: 'Github', href: member.github } : null,
  ].filter(Boolean)

  return (
    <Reveal>
      <article className="rule-top grid gap-10 pt-12 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
        {/* Portrait */}
        <div>
          <div className="overflow-hidden rounded-xl border border-line">
            <MonogramAvatar
              name={member.name}
              initials={member.initials}
              image={member.image}
              className="aspect-[4/3]"
            />
          </div>
        </div>

        {/* Identity and detail */}
        <div>
          <h2 className="font-semibold type-h2 text-fog-50">{member.name}</h2>
          <p className="font-semibold type-body mt-2 text-signal-300 font-mono text-sm">{member.role}</p>

          <p className="font-semibold type-body mt-6 max-w-2xl text-fog-200">{member.about}</p>

          {socials.length > 0 ? (
            <ul className="mt-7 flex items-center gap-1">
              {socials.map((social) => (
                <SocialIcon
                  key={social.id}
                  href={social.href}
                  icon={social.icon}
                  label={`${member.name} on ${social.label}`}
                  size="sm"
                  tooltip="bottom"
                  align="left"
                />
              ))}
            </ul>
          ) : null}

          {member.skills?.length ? (
            <div className="mt-9">
              <h3 className="font-semibold index-mark text-fog-600">Specialisation</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-line bg-ink-900/70 px-3 py-1 font-mono text-xs font-semibold text-fog-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {member.responsibilities?.length ? (
            <div className="mt-9">
              <h3 className="font-semibold index-mark text-fog-600">Responsible for</h3>
              <ProseList className="mt-4 max-w-2xl" items={member.responsibilities} />
            </div>
          ) : null}

          {member.experience?.length ? (
            <div className="mt-9">
              <h3 className="font-semibold index-mark text-fog-600">Experience</h3>
              <dl className="mt-4 border-t border-line-soft">
                {member.experience.map((entry) => (
                  <div
                    key={`${entry.title}-${entry.period}`}
                    className="grid gap-1 border-b border-line-soft py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
                  >
                    <dt className="font-semibold type-support text-fog-400">
                      {entry.title}
                      {entry.period ? (
                        <span className="font-semibold mt-0.5 block text-fog-600">{entry.period}</span>
                      ) : null}
                    </dt>
                    <dd className="font-semibold type-support text-fog-300">{entry.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </article>
    </Reveal>
  )
}

export default MemberProfile

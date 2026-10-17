import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ProjectForm } from '../components/contact/ProjectForm'
import { DiscoveryBookingCard } from '../components/contact/DiscoveryBookingCard'
import { Icon } from '../components/ui/Icon'
import { PageHeader } from '../components/ui/PageHeader'
import { ProseList } from '../components/common/KeyLines'
import { Reveal, Section } from '../components/ui/Reveal'
import { SocialLinks } from '../components/ui/SocialLinks'
import { contactPage } from '../data/content'
import { contact, getWhatsappLink, hasWhatsapp } from '../data/config'
import { usePageTitle } from '../lib/usePageTitle'
import { Sparkles } from 'lucide-react'

/**
 * /contact — a project qualification step, not a message box.
 *
 * Offers dual conversion channels:
 * 1. 15-Minute Discovery Call with the engineering lead
 * 2. Detailed project scope & requirement intake form
 */
export function Contact() {
  usePageTitle(contactPage.title, contactPage.lead)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const hasEstimateParam = Boolean(searchParams.get('estimate'))
  const problemParam = searchParams.get('problem')
  const [activeTab, setActiveTab] = useState(hasEstimateParam || problemParam ? 'form' : 'call')

  const channels = [
    hasWhatsapp
      ? {
          key: 'whatsapp',
          label: contactPage.whatsappTitle,
          value: contactPage.whatsappNote,
          icon: 'Whatsapp',
        }
      : null,
    contact.email
      ? {
          key: 'email',
          label: 'Email',
          value: contact.email,
          icon: 'Mail',
          href: `mailto:${contact.email}`,
        }
      : null,
    contact.phone
      ? {
          key: 'phone',
          label: 'Phone',
          value: contact.phone,
          icon: 'Phone',
          href: `tel:${contact.phone}`,
        }
      : null,
  ].filter(Boolean)

  return (
    <>
      <PageHeader title={contactPage.lead} description={contactPage.intro} />

      <Section>
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              {hasEstimateParam && (
                <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-signal-400/30 bg-signal-400/10 p-4 text-xs">
                  <Sparkles className="size-4 shrink-0 text-signal-400" />
                  <span className="font-medium text-fog-200">
                    Configuration loaded from Project Estimator. Your scope and sprint targets have been pre-filled below.
                  </span>
                </div>
              )}

              {problemParam && !hasEstimateParam && (
                <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-signal-400/30 bg-signal-400/10 p-4 text-xs">
                  <Sparkles className="size-4 shrink-0 text-signal-400" />
                  <span className="font-medium text-fog-200">
                    Business challenge selected. Describe what is happening in your business in your own words below — no technical knowledge required.
                  </span>
                </div>
              )}

              {/* Dual-Mode Selector */}
              <div className="glass-card flex flex-wrap items-center gap-2 rounded-2xl p-2 mb-8 border border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setActiveTab('call')}
                  className={`flex-1 min-w-[140px] cursor-pointer rounded-xl px-5 py-3 text-center text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'call'
                      ? 'bg-signal-400 text-ink-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                      : 'text-fog-400 hover:text-fog-100 hover:bg-white/[0.04]'
                  }`}
                >
                  Book 15-Min Discovery Call
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 min-w-[140px] cursor-pointer rounded-xl px-5 py-3 text-center text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'form'
                      ? 'bg-signal-400 text-ink-950 font-bold shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                      : 'text-fog-400 hover:text-fog-100 hover:bg-white/[0.04]'
                  }`}
                >
                  Submit Written Project Brief
                </button>
              </div>

              {activeTab === 'call' ? (
                <DiscoveryBookingCard />
              ) : (
                <>
                  <div className="rule-top pt-8">
                    <h2 className="font-semibold type-h2 text-fog-50">
                      {contactPage.qualification.title}
                    </h2>
                    <p className="font-semibold type-body measure mt-3 text-fog-300">
                      {contactPage.qualification.body}
                    </p>
                  </div>

                  <div className="mt-8">
                    <ProjectForm />
                  </div>
                </>
              )}
            </Reveal>

            {/* Context: what happens next, and how else to reach us. */}
            <div className="flex flex-col gap-12">
              <Reveal>
                <div>
                  <h2 className="font-semibold type-h3 text-fog-50">{contactPage.response.title}</h2>
                  <ol className="mt-6 space-y-5">
                    {contactPage.response.steps.map((step, index) => (
                      <li key={step.label} className="flex gap-4">
                        <span aria-hidden="true" className="index-mark shrink-0 pt-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="type-support font-semibold text-fog-50">{step.label}</p>
                          <p className="font-semibold type-support mt-1 text-fog-400">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              {channels.length > 0 ? (
                <Reveal>
                  <div>
                    <h2 className="font-semibold type-h3 text-fog-50">{contactPage.channelsTitle}</h2>
                    <ul className="mt-5 flex flex-col gap-3">
                      {channels.map((channel) => {
                        const href = channel.href ?? getWhatsappLink()
                        const body = (
                          <>
                            <span className="font-semibold flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-accent">
                              <Icon name={channel.icon} className="size-4" />
                            </span>
                            <span>
                              <span className="block text-[0.9375rem] font-semibold text-fog-50">
                                {channel.label}
                              </span>
                              <span className="font-semibold mt-0.5 block text-[0.9375rem] text-fog-400">
                                {channel.value}
                              </span>
                            </span>
                          </>
                        )

                        return (
                          <li key={channel.key}>
                            {href ? (
                              <a
                                href={href}
                                target={channel.key === 'whatsapp' ? '_blank' : undefined}
                                rel={channel.key === 'whatsapp' ? 'noopener noreferrer' : undefined}
                                className="flex items-center gap-3.5 rounded-2xl border border-line/80 bg-ink-950/70 p-4 transition-all duration-200 hover:border-signal-400/40 hover:bg-ink-900/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]"
                              >
                                {body}
                              </a>
                            ) : (
                              <div className="flex items-center gap-3.5 rounded-2xl border border-line/80 bg-ink-950/70 p-4">
                                {body}
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              <Reveal>
                <div>
                  <h2 className="font-semibold type-h3 text-fog-50">{contactPage.socialTitle}</h2>
                  <SocialLinks className="mt-4" tooltip="top" align="left" />
                </div>
              </Reveal>

              <Reveal>
                <div className="rule-top pt-8">
                  <h2 className="font-semibold type-h3 text-fog-50">Before you write</h2>
                  <ProseList
                    className="mt-5"
                    items={[
                      'The operational problem is more useful to us than a feature list.',
                      'If you are still deciding whether the project is worth doing, say so — it is a useful answer too.',
                      'If we are not the right team for it, we will say that rather than take the enquiry.',
                    ]}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Contact

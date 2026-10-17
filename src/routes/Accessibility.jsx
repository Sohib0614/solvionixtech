import { usePageTitle } from '../lib/usePageTitle'
import { PageHeader } from '../components/ui/PageHeader'
import { Section, Reveal } from '../components/ui/Reveal'
import { ArrowLink } from '../components/ui/ArrowLink'
import { Button } from '../components/ui/Button'
import { ShieldCheck, Eye, Keyboard, Monitor, Sparkles, Mail } from 'lucide-react'
import { contact } from '../data/config'

export function Accessibility() {
  usePageTitle(
    'Accessibility Commitment (WCAG 2.2 AA)',
    'Our non-negotiable commitment to making Solvionix fully accessible for blind visitors and users of assistive technology.'
  )

  const commitments = [
    {
      icon: Eye,
      title: 'Screen Reader & Non-Visual Access',
      description:
        'Engineered with semantic HTML5 landmarks (header, nav, main, footer), descriptive page headings, explicit form labels, and ARIA live regions for status announcements. Blind visitors using NVDA, VoiceOver, or JAWS can navigate every workflow without impediment.',
    },
    {
      icon: Keyboard,
      title: '100% Keyboard Operability',
      description:
        'Every link, button, modal dialog, and interactive scope tool is operable via keyboard navigation alone. Includes a visible skip-to-main-content link, logical focus traversal, high-contrast focus rings, and zero keyboard traps.',
    },
    {
      icon: Monitor,
      title: 'Visual Contrast & Responsive Reflow',
      description:
        'All typography meets or exceeds WCAG 2.2 Level AA contrast ratios (minimum 4.5:1 for body copy and 3:1 for large display text and interface borders). Fully supports 200% browser zoom and fluid mobile reflow without horizontal scrolling or content clipping.',
    },
    {
      icon: Sparkles,
      title: 'Respect for User Motion Preferences',
      description:
        'All animations and visual effects listen to the CSS `prefers-reduced-motion` media query. Users with vestibular conditions experience instant, stable state transitions with zero disorienting movement or automatic media playback.',
    },
  ]

  return (
    <>
      <PageHeader
        title="Accessibility Statement"
        description="At Solvionix, accessibility is not a cosmetic checklist or an afterthought. It is a foundational engineering standard built directly into our software from day one."
      />

      <Section>
        <div className="container-page max-w-4xl">
          <Reveal>
            <div className="rounded-2xl border border-signal-400/30 bg-signal-400/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-signal-400">
                <ShieldCheck className="size-6 shrink-0" />
                <h2 className="text-lg font-bold text-fog-50 sm:text-xl">
                  Conformance Target: WCAG 2.2 Level AA
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fog-300 sm:text-base">
                Solvionix is committed to ensuring digital accessibility for all users, including individuals with visual, auditory, motor, or cognitive disabilities. We align our design system, public website, and client software builds with the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
              </p>
            </div>
          </Reveal>

          {/* Core Accessibility Pillars */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-fog-50">
              Core Technical Standards & Implementation
            </h2>
            <p className="mt-2 text-sm text-fog-400">
              How our design system and application architecture guarantee accessibility by default.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {commitments.map((item) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-xl border border-line bg-ink-900/60 p-6 transition-all hover:border-signal-400/30"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg border border-signal-400/20 bg-signal-400/10 text-signal-400">
                      <IconComponent className="size-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-fog-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-fog-300 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Non-Negotiable Rules */}
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="text-xl font-bold text-fog-50">
              Our Non-Negotiable Accessibility Rules
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-fog-300">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal-400" />
                <span>
                  <strong>No Automated Overlays:</strong> We reject third-party "accessibility widgets" that claim to fix broken code with a single script tag. True accessibility must be native to the semantic source code.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal-400" />
                <span>
                  <strong>Multiple Communication Channels:</strong> Our AI assistant and interactive tools are never the only route to contact us. Accessible email, phone, WhatsApp, and structured form paths are always prominently provided.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal-400" />
                <span>
                  <strong>No Text Trapped in Images:</strong> All critical content, headings, metrics, and architecture diagrams are presented as readable, scalable text or accompanied by comprehensive descriptive alternatives.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal-400" />
                <span>
                  <strong>Plain-Language Clarity:</strong> We avoid unnecessary jargon. Clear, descriptive labels and error messages guide visitors through every step without ambiguity.
                </span>
              </li>
            </ul>
          </div>

          {/* Feedback & Contact */}
          <div className="mt-14 rounded-2xl border border-line bg-ink-900/80 p-8">
            <h2 className="text-xl font-bold text-fog-50">
              Accessibility Feedback & Support
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fog-300">
              We actively welcome feedback on the accessibility of Solvionix. If you encounter any barrier, require an alternative document format, or have suggestions for improvement, please contact our engineering team directly:
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {contact.email && (
                <Button
                  href={`mailto:${contact.email}?subject=Accessibility%20Feedback%20-%20Solvionix`}
                  variant="primary"
                  size="md"
                  icon={Mail}
                  iconPosition="left"
                >
                  <span>Email: {contact.email}</span>
                </Button>
              )}

              <ArrowLink to="/contact">
                Submit an inquiry via our accessible contact form
              </ArrowLink>
            </div>

            <p className="mt-4 text-xs text-fog-400">
              We treat all accessibility reports as high-priority engineering tickets and aim to review and respond within two business days.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Accessibility

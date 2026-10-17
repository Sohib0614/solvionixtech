import { Link } from 'react-router-dom'
import { footerNavLinks, reachLine } from '../../data/content'
import { contact, getWhatsappLink, site } from '../../data/config'
import { cn } from '../../lib/cn'
import { LogoMark } from './LogoMark'
import { SocialLinks } from '../ui/SocialLinks'

/**
 * A structured corporate footer, in four columns rather than one row of links.
 *
 * Two decisions worth stating:
 *
 *   - The Communication column renders only once a real email or WhatsApp number
 *     exists in `data/config.js`. Publishing an empty column, or worse a mailto
 *     with no address, is the fastest way to lose a procurement reader's trust.
 *     Set the value and the column appears on its own.
 *   - There is no call to action here. The floating "Start a Project" control is
 *     the only one on the site, and the footer is navigation, not a pitch.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const whatsappLink = getWhatsappLink()
  const hasEmail = Boolean(contact.email)
  const hasContact = hasEmail || Boolean(whatsappLink)

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-page py-14 sm:py-16">
        {/* The column count follows the columns that actually exist, so an
            unconfigured Communication column does not leave a hole. */}
        <div
          className={cn(
            'grid gap-10 sm:grid-cols-2 lg:gap-8',
            hasContact ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
          )}
        >
          {/* Brand + positioning */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-8 shrink-0" />
              <p className="font-display text-[0.9375rem] font-bold tracking-[0.16em] text-fog-50">
                {site.name.toUpperCase()}
              </p>
            </div>
            <p className="font-semibold type-support mt-3 text-fog-400">{site.tagline}</p>
            <p className="font-semibold type-support mt-3 text-fog-500">{reachLine}</p>
            <SocialLinks className="mt-6" tooltip="top" />
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="font-semibold index-mark text-fog-600">Navigation</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    className="font-semibold type-support text-fog-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Communication — only rendered when a real channel exists. */}
          {hasContact ? (
            <div>
              <h2 className="font-semibold index-mark text-fog-600">Communication</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {hasEmail ? (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold type-support text-fog-400 transition-colors hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {whatsappLink ? (
                  <li>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold type-support text-fog-400 transition-colors hover:text-accent"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ) : null}

          {/* Legal */}
          <div>
            <h2 className="font-semibold index-mark text-fog-600">Legal</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  to="/accessibility"
                  className="font-semibold type-support text-fog-400 transition-colors hover:text-accent"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link
                  to="/legal/privacy"
                  className="font-semibold type-support text-fog-400 transition-colors hover:text-accent"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-sm text-fog-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-semibold text-sm text-fog-600">AI, Software &amp; Business Solutions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

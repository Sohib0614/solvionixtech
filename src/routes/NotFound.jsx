import { Link, useLocation } from 'react-router-dom'
import { footerNavLinks } from '../data/content'
import { usePageTitle } from '../lib/usePageTitle'
import { Icon } from '../components/ui/Icon'

/**
 * 404. Every route the visitor might have meant is listed, so a mistyped URL is
 * a dead end for nobody. The full navigation is used rather than the navbar
 * list, which is why Team appears here too.
 */
export function NotFound() {
  const location = useLocation()

  usePageTitle('Page not found')

  return (
    <section className="relative flex min-h-[80svh] items-center">
      <div
        aria-hidden="true"
        className="hairline-grid mask-fade-b pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="container-page relative py-20">
        <p className="eyebrow">Error 404</p>

        <h1 className="font-semibold type-h2 mt-5 max-w-xl text-fog-50">This page does not exist.</h1>

        <p className="font-semibold type-body measure-tight mt-5 text-fog-400">
          The address you followed is not part of this site. Every page is listed below.
        </p>

        <p className="font-semibold mt-4 font-mono text-sm break-all text-fog-600">{location.pathname}</p>

        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent transition-colors"
        >
          Back to home
          <Icon
            name="ArrowRight"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>

        <nav aria-label="All pages" className="mt-12 border-t border-line-soft pt-8">
          <h2 className="font-semibold index-mark text-fog-600">All pages</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {footerNavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="font-semibold type-support text-fog-400 transition-colors hover:text-fog-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/legal/privacy"
                className="font-semibold type-support text-fog-400 transition-colors hover:text-fog-50"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default NotFound

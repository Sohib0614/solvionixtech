import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { FloatingActions } from '../floating/FloatingActions'

/**
 * Page chrome: skip link, navbar, content, footer, and the three floating
 * actions. The spacer at the bottom keeps the floating buttons from covering
 * the last line of the footer.
 */
export function Layout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-lg focus:border focus:border-signal-400/60 focus:bg-ink-900 focus:px-4 focus:py-2.5 focus:text-[0.9375rem] focus:font-semibold focus:text-fog-50"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" tabIndex="-1" className="flex-1 focus:outline-none">
        {children}
      </main>

      <Footer />

      {/* Keeps the floating buttons clear of the footer text. */}
      <div aria-hidden="true" className="h-20 bg-ink-950 sm:h-24" />

      <FloatingActions />
    </div>
  )
}

export default Layout

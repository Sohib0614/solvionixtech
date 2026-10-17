import { useCallback, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { navLinks } from '../../data/content'
import { cn } from '../../lib/cn'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'
import { SocialLinks } from '../ui/SocialLinks'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { CommandPalette } from '../common/CommandPalette'
import { Search } from 'lucide-react'

/**
 * Minimal sticky navbar: wordmark on the left, six page links in the middle,
 * search button, theme toggle, and Book a Call CTA on the right.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const solid = scrolled || menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-all duration-300',
          solid
            ? 'border-white/[0.08] bg-ink-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-page relative flex h-16 items-center justify-between gap-4">
          <Logo onClick={closeMenu} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-ink-900/60 p-1 backdrop-blur-md">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200',
                        isActive
                          ? 'border border-signal-400/40 bg-signal-400/15 text-signal-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'text-fog-400 hover:text-fog-100 hover:bg-white/[0.04]',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Command Palette Trigger Button */}
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Search or press Ctrl+K"
              className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-line bg-ink-900/60 px-2.5 py-1.5 text-xs font-mono text-fog-400 transition-all hover:border-signal-400/40 hover:text-fog-200 hover:bg-ink-900"
            >
              <Search className="size-3.5 text-signal-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex rounded border border-line-soft bg-ink-950 px-1.5 py-0.5 text-[10px] text-fog-400">
                ⌘K
              </kbd>
            </button>

            <SocialLinks className="hidden xl:flex" tooltip="bottom" />

            <ThemeToggle />

            <Button
              to="/contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <span>Book a Call</span>
              <span aria-hidden="true">→</span>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'flex size-9 items-center justify-center rounded-lg border transition-colors lg:hidden',
                solid
                  ? 'border-line text-fog-100'
                  : 'border-[var(--overlay-border)] text-[var(--on-hero)]',
                !solid && 'bg-[var(--overlay-surface)]',
              )}
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} className="size-4" />
            </button>
          </div>
        </div>

        <MobileMenu
          open={menuOpen}
          links={navLinks}
          onClose={closeMenu}
          onOpenSearch={() => {
            closeMenu()
            setCommandOpen(true)
          }}
        />
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  )
}

export default Navbar

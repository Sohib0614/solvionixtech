import { Link } from 'react-router-dom'
import { site } from '../../data/config'
import { LogoMark } from './LogoMark'
import { cn } from '../../lib/cn'

/**
 * SOLVIONIX wordmark: the app icon beside the name. Links to the home page from
 * anywhere on the site.
 *
 * The icon is marked decorative here because the wordmark text beside it
 * already names the company and the link carries an accessible label. Use
 * `LogoMark` directly with a `title` anywhere the graphic appears on its own.
 */
export function Logo({ className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <LogoMark className="size-9 shrink-0 transition-opacity duration-200 group-hover:opacity-80" />

      <span className="text-[0.9375rem] font-bold tracking-[0.16em] text-fog-50">{site.name}</span>
    </Link>
  )
}

export default Logo

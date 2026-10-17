import { cn } from '../../lib/cn'
import { Icon } from './Icon'

const sizes = {
  sm: 'size-8 [&_svg]:size-3.5',
  md: 'size-9 [&_svg]:size-4',
}

/** Tooltip placement. `right` keeps it inside the viewport when the icons sit
 *  at the far edge of the bar; `center` is fine for a left-aligned group. */
const alignClasses = {
  right: 'right-0 left-auto',
  left: 'left-0 right-auto',
  center: 'left-1/2 -translate-x-1/2',
}

/**
 * One social icon. A configured `href` makes it a link that opens in a new tab;
 * a missing one keeps the icon visible but inert, with a tooltip that says so.
 * The layout never shifts and no dead link is published.
 */
export function SocialIcon({
  href,
  icon,
  label,
  size = 'md',
  tooltip = 'bottom',
  align = 'right',
}) {
  const configured = Boolean(href)

  return (
    <li className="group relative">
      {configured ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} (opens in a new tab)`}
          className={cn(
            'flex items-center justify-center rounded-lg border border-line bg-ink-800 text-fog-300 transition-colors duration-200 hover:border-signal-400/50 hover:text-accent',
            sizes[size],
          )}
        >
          <Icon name={icon} />
        </a>
      ) : (
        <span
          aria-label={`${label} — link not configured yet`}
          className={cn(
            'flex cursor-default items-center justify-center rounded-lg surface-glass text-fog-600',
            sizes[size],
          )}
        >
          <Icon name={icon} />
        </span>
      )}

      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 w-max rounded-md border border-line bg-ink-800 px-2 py-1 font-semibold text-[0.8125rem] text-fog-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100',
          alignClasses[align],
          tooltip === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
        )}
      >
        {configured ? label : `${label} — coming soon`}
      </span>
    </li>
  )
}

export default SocialIcon

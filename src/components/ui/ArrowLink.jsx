import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Icon } from './Icon'

/**
 * The "Learn More →" / "View All Services →" link used at the end of a preview
 * block. An arrow that shifts slightly on hover, so the link reads as
 * tappable without adding a button.
 */
export function ArrowLink({ to, children, className }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent transition-colors duration-200',
        className,
      )}
    >
      {children}
      <Icon
        name="ArrowRight"
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  )
}

export default ArrowLink

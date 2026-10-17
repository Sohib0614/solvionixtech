import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-gradient-to-r from-signal-400 via-sky-300 to-signal-400 text-ink-950 font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_25px_-5px_rgba(56,189,248,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_16px_32px_-6px_rgba(56,189,248,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-signal-300/40',
  secondary:
    'border border-line bg-ink-900/80 text-fog-100 hover:border-signal-400/40 hover:bg-ink-850 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm',
  glass:
    'border border-white/10 bg-white/[0.04] backdrop-blur-md text-fog-100 hover:bg-white/[0.08] hover:border-signal-400/30 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  ghost:
    'text-fog-300 hover:text-fog-50 hover:bg-white/[0.05] border border-transparent active:scale-[0.98]',
  outlineSignal:
    'border border-signal-400/40 bg-signal-400/5 text-signal-300 hover:border-signal-400 hover:bg-signal-400/15 hover:text-signal-200 hover:-translate-y-0.5 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-9 px-4 text-xs font-semibold rounded-lg',
  md: 'h-11 px-5 text-sm font-semibold rounded-xl',
  lg: 'h-12 sm:h-13 px-7 text-sm sm:text-base font-semibold rounded-xl',
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 tracking-tight transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-45'

/**
 * One button component that renders an <a>, a react-router <Link> or a
 * <button>, depending on the props it is given.
 */
export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    to,
    href,
    type = 'button',
    ...props
  },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  )
})

export default Button

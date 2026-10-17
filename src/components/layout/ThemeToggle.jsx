import { useEffect, useRef } from 'react'
import { Icon } from '../ui/Icon'
import { useTheme } from '../../lib/useTheme'

/**
 * Dark / light control.
 *
 * Deliberately a real button rather than a bare icon: it is keyboard reachable,
 * it announces its state through `aria-pressed`, and its accessible name states
 * the action ("Switch to light theme") rather than the current state, which is
 * what a screen reader user needs in order to predict what pressing it does.
 *
 * The first frame is rendered from the DOM rather than from state. The inline
 * script in `index.html` has already set `data-theme` before React boots, so
 * reading it directly is both correct and avoids a hydration-style flash of the
 * wrong icon.
 */
export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const firstRender = useRef(true)

  // Drive the class that CSS uses to animate the change, for no longer than the
  // animation itself.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return undefined
    }

    const root = document.documentElement
    root.classList.add('theme-switching')
    const timer = window.setTimeout(() => root.classList.remove('theme-switching'), 340)

    return () => window.clearTimeout(timer)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`hover-surface flex size-10 items-center justify-center rounded-full border border-line text-fog-300 transition-colors hover:text-fog-50 ${className}`}
    >
      <Icon
        name={isDark ? 'Moon' : 'Sun'}
        className="size-[18px]"
        strokeWidth={1.75}
      />
    </button>
  )
}

export default ThemeToggle

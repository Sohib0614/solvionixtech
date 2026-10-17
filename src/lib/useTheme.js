import { useCallback, useSyncExternalStore } from 'react'

/**
 * THEME
 * =====
 * Two themes, chosen by the visitor and remembered across visits.
 *
 * This is a tiny external store rather than a React context, for two reasons.
 * The 3D hero scene is four or five levels below any sensible provider and would
 * otherwise have to be threaded through the layout; and a store means the theme
 * can be read by non-React code too. `useSyncExternalStore` keeps it tear-free
 * under concurrent rendering.
 *
 * Colours are not stored in JavaScript. `[data-theme]` on <html> selects a
 * second set of the same CSS custom properties the whole site already uses, so
 * switching themes is a single attribute change and the utility classes in
 * every component follow automatically.
 *
 * The initial value is resolved by the inline script in `index.html` before
 * first paint; this module only has to agree with it.
 */

export const THEMES = ['dark', 'light']
export const DEFAULT_THEME = 'dark'
export const THEME_STORAGE_KEY = 'solvionix-theme'

function readStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEMES.includes(stored) ? stored : null
  } catch {
    // Private browsing and blocked storage both land here. The site still works;
    // the choice simply is not remembered.
    return null
  }
}

function readSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return DEFAULT_THEME
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

let current =
  typeof document !== 'undefined' && document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme
    : readStoredTheme() ?? readSystemTheme()

const listeners = new Set()

function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  // Keeps scrollbars, form controls and the canvas clear colour in step.
  root.style.colorScheme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f6f8' : '#05060a')
}

function commit(theme) {
  current = theme
  applyTheme(theme)
  listeners.forEach((listener) => listener())
}

export function setTheme(theme) {
  if (!THEMES.includes(theme) || theme === current) return
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Unrememberable, but still applied for this visit.
  }
  commit(theme)
}

function subscribe(listener) {
  listeners.add(listener)

  // Follow the operating system until the visitor states a preference of their
  // own. Once stored, their choice wins and the system is ignored.
  const query = window.matchMedia?.('(prefers-color-scheme: light)')
  const onSystemChange = (event) => {
    if (readStoredTheme()) return
    const next = event.matches ? 'light' : 'dark'
    if (next !== current) commit(next)
  }
  query?.addEventListener('change', onSystemChange)

  return () => {
    listeners.delete(listener)
    query?.removeEventListener('change', onSystemChange)
  }
}

function getSnapshot() {
  return current
}

function getServerSnapshot() {
  return DEFAULT_THEME
}

/**
 * @returns {{ theme: 'dark' | 'light', setTheme: (theme: string) => void, toggleTheme: () => void }}
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    setTheme(current === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, setTheme, toggleTheme }
}

export default useTheme

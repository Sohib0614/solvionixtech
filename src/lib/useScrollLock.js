import { useEffect } from 'react'

/**
 * Locks page scroll while an overlay is open, compensating for the scrollbar
 * so the layout does not shift on desktop.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [locked])
}

export default useScrollLock

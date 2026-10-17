import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query. Uses useSyncExternalStore so the value is read
 * during render rather than set from an effect, which avoids an extra render
 * pass and keeps the result correct on the very first paint.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const list = window.matchMedia(query)
      list.addEventListener('change', callback)
      return () => list.removeEventListener('change', callback)
    },
    [query],
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export default useMediaQuery

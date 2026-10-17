import { useEffect, useRef } from 'react'

/**
 * Pointer parallax, written straight to the DOM.
 *
 * Two custom properties on one element, `--px` and `--py`, normalised to -1..1
 * against the viewport. Everything that moves reads them from CSS: the depth bands
 * multiply them by their own distance, so the whole composition parallaxes from a
 * single pair of numbers.
 *
 * The point of doing it this way rather than with state is that a pointer move never
 * triggers a React render. On a page that also has scroll work to do, a hero that
 * re-renders on every mouse event is the difference between a visual that feels
 * attached to the page and one that makes the whole page feel heavier.
 *
 * Positions are coalesced to a single write per frame, because a mouse emits far
 * more events than a display has frames and there is nothing to gain from queueing
 * work that is overwritten before it is ever seen.
 *
 * Skipped entirely for reduced motion and for coarse pointers. For reduced motion
 * the properties are not merely zeroed, they are never written at all, so the
 * transforms fall back to whatever the stylesheet gives them.
 */
export function usePointerParallax(enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const root = ref.current
    if (!root) return undefined

    let frame = 0
    let nextX = 0
    let nextY = 0

    const onMove = (event) => {
      nextX = (event.clientX / window.innerWidth) * 2 - 1
      nextY = (event.clientY / window.innerHeight) * 2 - 1
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        root.style.setProperty('--px', nextX.toFixed(3))
        root.style.setProperty('--py', nextY.toFixed(3))
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled])

  return ref
}

export default usePointerParallax

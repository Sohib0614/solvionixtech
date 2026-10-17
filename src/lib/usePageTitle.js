import { useEffect } from 'react'
import { site } from '../data/config'

/**
 * Sets the browser tab title for the current page, and puts it back to the bare
 * site name on unmount. A single-page app never gets this for free from the
 * router, so each page calls it once.
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.name
  }, [title])
}

export default usePageTitle

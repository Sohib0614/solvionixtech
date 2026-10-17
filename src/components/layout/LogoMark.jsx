import { cn } from '../../lib/cn'

/**
 * The Solvionix app icon, inlined.
 *
 * Drawn as inline SVG rather than loaded as a file so it cannot fail to load,
 * cannot flash unstyled, and stays crisp at any size. The three paths and the
 * rounded plate are the supplied brand asset, reproduced without alteration:
 * the fills are the official brand colours and are deliberately not remapped
 * onto the site's `signal-*` tokens, because a logo is not a themed element.
 *
 * `title` is only needed where the mark stands alone with no adjacent
 * wordmark; pass it to expose the graphic to assistive technology, omit it
 * when a text label sits next to it.
 */
export function LogoMark({ className, title }) {
  return (
    <svg
      viewBox="0 0 115 111"
      className={cn('size-8', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="103" height="105" rx="18" fill="#062D5B" />
      <path
        fill="#0798F2"
        d="
          M31 39
          C27 35 28 29 31 25
          C35 19 41 17 48 17
          H77
          L68 28
          H48
          C44 28 41 30 41 33
          C41 36 44 37 49 37
          H59
          C67 37 72 40 77 47
          L68 58
          C65 52 61 49 56 49
          H47
          C40 49 35 46 31 42
          C30 41 30 40 31 39 Z"
      />
      <path
        fill="#0798F2"
        d="
          M17 51
          H48
          L64 74
          L54 88
          C50 94 41 96 36 91
          Z"
      />
      <path
        fill="#FFFFFF"
        d="
          M39 51
          H51
          L61 66
          L78 42
          H92
          L68 79
          C64 85 57 87 52 80
          Z"
      />
    </svg>
  )
}

export default LogoMark

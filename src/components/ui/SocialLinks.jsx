import { socialLinks } from '../../data/config'
import { cn } from '../../lib/cn'
import { SocialIcon } from './SocialIcon'

/**
 * The four social icons, used in the navbar, the mobile menu and the footer.
 * They read straight from `data/config.js`, so adding a real URL in one place is
 * all it takes. Every surface they sit on is dark, so there is no variant to
 * pass.
 */
export function SocialLinks({ className, size = 'md', tooltip = 'bottom', align = 'right' }) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {socialLinks.map((social) => (
        <SocialIcon
          key={social.id}
          href={social.href}
          icon={social.icon}
          label={social.label}
          size={size}
          tooltip={tooltip}
          align={align}
        />
      ))}
    </ul>
  )
}

export default SocialLinks

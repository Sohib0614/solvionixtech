import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Phone,
  Plug,
  Plus,
  Send,
  Smartphone,
  Sun,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from './BrandIcon'

/**
 * Icons referenced by name from the data layer. Keeping the map in one place
 * means the data files stay plain, serialisable objects.
 */
const iconMap = {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Facebook: FacebookIcon,
  Github: GithubIcon,
  Globe,
  Instagram: InstagramIcon,
  Layers,
  Linkedin: LinkedinIcon,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Phone,
  Plug,
  Plus,
  Send,
  Smartphone,
  Sun,
  Users,
  Whatsapp: WhatsAppIcon,
  Workflow,
  X,
}

/** Renders an icon by name, falling back to a neutral glyph. */
export function Icon({ name, className, ...props }) {
  const Component = iconMap[name] ?? Layers
  return <Component className={className} aria-hidden="true" {...props} />
}

export default Icon

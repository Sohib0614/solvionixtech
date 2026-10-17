/**
 * SITE CONFIGURATION
 * ==================
 * This is the only file you need to edit for links and contact details.
 * Every `null` below means "not provided yet" — nothing is faked and no dead
 * links are rendered. Fill in a value and the matching button starts working
 * everywhere it appears (navbar, footer, team profiles, contact section).
 */

export const site = {
  name: 'Solvionix',
  tagline: 'Turning business problems into technology solutions.',
  /** Used for canonical/OG tags. Change to the real domain before launch. */
  url: 'https://solvionix.com',
}

/**
 * SOCIAL LINKS
 * Paste the real profile URLs. They open in a new tab.
 * Leave as `null` and the icon stays visible but inactive, with a
 * "coming soon" tooltip.
 */
export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', href: null },
  { id: 'facebook', label: 'Facebook', icon: 'Facebook', href: null },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', href: null },
  { id: 'github', label: 'GitHub', icon: 'Github', href: null },
]

/**
 * DIRECT CONTACT
 * Same rule as above: `null` hides the channel rather than showing a blank.
 */
export const contact = {
  email: import.meta.env.VITE_CONTACT_EMAIL || null,
  phone: import.meta.env.VITE_CONTACT_PHONE || null,
  location: import.meta.env.VITE_CONTACT_LOCATION || null,
}

/**
 * WHATSAPP
 * Put the number in international format, digits only, no "+" and no spaces.
 * Example: '923001234567'
 *
 * The link is generated for you as: https://wa.me/<number>?text=<message>
 */
export const whatsapp = {
  number: import.meta.env.VITE_WHATSAPP_NUMBER || null,
  message: "Hi Solvionix, I'd like to talk about a project.",
}

/** True when a WhatsApp number has been set in `whatsapp.number`. */
export const hasWhatsapp = Boolean(whatsapp.number)

/** Builds the wa.me link, or returns null while no number is configured. */
export function getWhatsappLink() {
  if (!hasWhatsapp) return null
  let digits = String(whatsapp.number).replace(/\D/g, '')
  if (digits.startsWith('03') && digits.length === 11) {
    digits = `92${digits.slice(1)}`
  }
  const base = `https://wa.me/${digits}`
  return `${base}?text=${encodeURIComponent(whatsapp.message)}`
}

/**
 * CONTACT FORM
 * Set this to a form endpoint (Formspree, Web3Forms, your own API...) and the
 * form will POST to it as JSON. While it stays `null` the form runs in demo
 * mode and says so, instead of pretending a message was sent.
 */
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact'

/** True when a real endpoint is configured. */
export const hasFormEndpoint = Boolean(FORM_ENDPOINT)

export default site

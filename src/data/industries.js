/**
 * INDUSTRIES — where the solutions are designed to apply.
 *
 * These are target areas, not a client list. The portfolio is not one yet, so
 * nothing on these pages may imply delivered client work. Each entry describes
 * the operating conditions of the environment, because those conditions are
 * what actually change the architecture.
 *
 * The point of a per-industry page is that the same engineering answer is
 * wrong in a different environment. Healthcare carries consent and availability
 * constraints. Real estate carries document and listing lifecycles. Professional
 * services carry deadline-driven knowledge work. Hospitality carries
 * high-volume, date-sensitive inventory.
 *
 * Fields
 *   id            URL segment
 *   number        01–04, editorial index
 *   title         sector name
 *   summary       one line for the index page
 *   conditions    the operating environment, as a set of stated facts
 *   requirements  the requirements that follow from those conditions
 *   relatedSolutions  ids from solutions.js
 */

export const industries = [
  {
    id: 'healthcare',
    number: '01',
    title: 'Healthcare & Clinics',
    summary: 'Patient-facing digital experiences, appointment workflows and operational automation for clinical settings.',
    conditions: [
      'Patient data is sensitive, so consent, access control and retention are design constraints rather than features.',
      'The service is expected to be available during clinic hours, when an outage directly affects appointments.',
      'Administrative load is repetitive and falls on people who are clinically trained but doing data entry.',
      'Most of the surrounding software is legacy and cannot be replaced without disrupting care.',
    ],
    requirements: [
      'Digital patient experiences, self-service where it reduces phone volume',
      'Appointment and recall workflows that keep the schedule accurate',
      'AI reception and enquiry handling with escalation to a person',
      'Document handling for referrals, forms and correspondence',
      'Integration with existing clinical and administrative systems',
    ],
    relatedSolutions: ['intelligent-systems', 'business-systems', 'connected-infrastructure'],
  },
  {
    id: 'real-estate',
    number: '02',
    title: 'Real Estate',
    summary: 'Property platforms, lead management and customer portals across the transaction lifecycle.',
    conditions: [
      'A lead is worth a great deal and decays quickly if nobody responds, so response time is the operational problem.',
      'The transaction is document-heavy, with a long tail of contracts, viewings and compliance paperwork.',
      'Listings, availability and pricing change constantly and are duplicated across several channels.',
      'Clients expect to be able to act without a phone call during working hours.',
    ],
    requirements: [
      'Property platforms and listing portals with controlled publication',
      'Lead capture, routing and response tracking that makes delay visible',
      'Customer portals for viewings, offers and document exchange',
      'Workflow automation across enquiry, viewing, offer and completion',
      'Synchronisation between website, portal and internal system',
    ],
    relatedSolutions: ['digital-products', 'business-systems', 'connected-infrastructure'],
  },
  {
    id: 'professional-services',
    number: '03',
    title: 'Professional Services',
    summary: 'Client portals, document workflows and operational systems for deadline-driven knowledge work.',
    conditions: [
      'The work product is documents, and the constraint is a deadline rather than a physical process.',
      'Knowledge exists in the heads of a small number of people and leaves the firm with them.',
      'Enquiries arrive in a shared inbox with no consistent qualification or routing.',
      'Clients have no visibility of a matter until they are asked for something.',
    ],
    requirements: [
      'Client portals that make matter status visible without an email exchange',
      'Document intake, version control and approval workflows',
      'CRM structure matched to how the firm actually qualifies work',
      'Knowledge systems that retrieve the firm’s own material',
      'Operational automation around deadlines and follow-up',
    ],
    relatedSolutions: ['digital-products', 'business-systems', 'intelligent-systems'],
  },
  {
    id: 'hospitality',
    number: '04',
    title: 'Hospitality',
    summary: 'Guest-facing experiences, booking workflows and operational systems for hospitality operators.',
    conditions: [
      'Availability is date-sensitive inventory, and an oversold room cannot be unsold.',
      'Demand arrives in bursts, from channels that do not talk to each other.',
      'Guests expect an immediate answer at any hour, and that is exactly when staffing is lowest.',
      'Rates, policies and operational rules change often enough to make hard-coded systems a liability.',
    ],
    requirements: [
      'Guest-facing booking and enquiry experiences that reduce phone dependency',
      'Availability synchronisation across every selling channel',
      'Operational systems for front desk, housekeeping and maintenance',
      'AI-enabled guest support with handover to staff',
      'Reporting on occupancy, revenue and channel performance',
    ],
    relatedSolutions: ['digital-products', 'connected-infrastructure', 'data-decision-systems'],
  },
]

export const getIndustry = (id) => industries.find((industry) => industry.id === id) ?? null

export default industries

/**
 * TEAM — edit this file to add, remove or re-role team members.
 *
 * To change a role, edit the `role` field. The card, the profile page and the
 * chatbot all read from here, so nothing else needs changing.
 *
 * To add someone, copy an object, change `id`, `name`, `role` and `initials`.
 *
 * Fields
 *   id              unique key, used in the URL /team/<id>
 *   name            full name
 *   role            job title
 *   initials        shown on the generated portrait when there is no photo
 *   image           optional photo path; falls back to a generated monogram
 *   summary         1–2 lines, shown on the card
 *   about           full text, shown on the profile page
 *   skills          main skills
 *   responsibilities what this person is responsible for on a project
 *   experience     optional work history. The section only renders when this
 *                  has entries, so nothing is invented. Format:
 *                  { title: 'Role', period: '2023 – now', detail: 'One line.' }
 *   linkedin        profile URL or null
 *   github          profile URL or null
 *
 * Do not add a member who has not agreed to be listed, and do not fill in a
 * field with a guess. An empty field simply does not render.
 */

export const teamMembers = [
  {
    id: 'muhammad-sohib',
    name: 'Muhammad Sohib',
    role: 'Founder & Solutions Architect',
    initials: 'MS',
    image: '/founder/muhammad_sohib.jpg',
    summary: 'Founder of Solvionix. Engineers scalable web platforms, AI systems, and automated operations.',
    about:
      'Muhammad Sohib is a 24-year-old software engineer and the founder of Solvionix. He combines deep technical curiosity with pragmatic business architecture, designing systems that strip away operational bottlenecks. Across intelligent AI agents, high-performance web applications, and resilient cloud architectures, he leads engineering with direct ownership—ensuring what gets designed is exactly what gets delivered.',
    skills: ['System Architecture', 'AI & LLM Integration', 'React & Next.js', 'Python & Django', 'Node.js', 'PostgreSQL', 'Docker & Cloud Deployment'],
    responsibilities: [
      'Technical strategy, high-level system architecture, and solution design',
      'AI agent development, custom LLM workflows, and intelligent automations',
      'Direct technical discovery with business stakeholders and roadmap definition',
      'Code quality benchmarks, security auditing, and production delivery',
    ],
    experience: [],
    linkedin: null,
    github: null,
  },
]

/** Used by /team/:id. Returns null for an unknown id, so the page can 404. */
export function getTeamMember(id) {
  return teamMembers.find((member) => member.id === id) ?? null
}

export default teamMembers

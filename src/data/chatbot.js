/**
 * CHATBOT
 * =======
 * A website assistant, not a toy. Three rules shape the copy here:
 *
 *   1. It only ever says things that are true about the site. Every answer is
 *      either a route, a stated fact, or an honest "we will need to know more".
 *   2. It never invents capability, availability or a result.
 *   3. It hands over. Anything that needs a person is routed to contact rather
 *      than answered with a guess.
 *
 * `responses` keys are matched against the visitor's message. Keys are matched
 * on whole words, so "ai" will not fire on "said".
 */

export const welcome = {
  greeting: 'Welcome to Solvionix',
  message:
    'Welcome to Solvionix. I can help you explore our solutions, capabilities, projects, and engagement process.',
  preview: 'Need help? Chat with Solvionix.',
}

/** The four actions offered under the welcome message. */
export const quickActions = [
  { id: 'solutions', label: 'Explore Solutions', to: '/solutions' },
  { id: 'work', label: 'View Our Work', to: '/work' },
  { id: 'capabilities', label: 'Explore Capabilities', to: '/capabilities' },
  { id: 'contact', label: 'Discuss a Project', to: '/contact' },
]

/**
 * Answers, keyed by the words that should reach them. Each entry is an array of
 * lines so a reply can be more than one sentence without becoming a paragraph.
 */
export const responses = {
  /* --- Solutions --- */
  solutions: [
    'We work across five solution areas: intelligent systems, digital products, business systems, data and decision systems, and connected infrastructure.',
    'Each one is written as a business requirement first, then the technology approach, then the operational value it is expected to remove.',
  ],
  'intelligent systems': [
    'Intelligent systems cover work that depends on reading, classifying or drafting text, such as AI assistants, document intelligence and knowledge systems.',
    'The approach keeps a person in the loop for anything consequential, so the system proposes and a person confirms.',
  ],
  'digital products': [
    'Digital products are customer-facing platforms, portals and applications: web apps, SaaS products and self-service accounts.',
    'They are designed for the lifecycle of a real account rather than for a launch, including administration and roles.',
  ],
  'business systems': [
    'Business systems are the internal platforms a team runs its operation on: operational tools, CRM workflows, management systems and process automation.',
    'The process is modelled as explicit states, so the knowledge lives in the system rather than in one person.',
  ],
  'data': [
    'Data and decision systems cover pipelines, analytics, reporting and machine learning in an operational context.',
    'Every figure can be traced back to the records it came from, which is the part most reporting tools skip.',
  ],
  integrations: [
    'Connected infrastructure is the integration layer: APIs, third-party services, payments and system-to-system synchronisation.',
    'One system is the source of truth per field, so a synchronisation failure is visible instead of silently overwriting something.',
  ],
  automation: [
    'Automation is usually the first thing worth looking at, because the manual steps are already documented and the saving is measurable.',
    'We would want to know which step consumes the most time before recommending anything, since that is rarely obvious at the start.',
  ],

  /* --- Capabilities --- */
  capabilities: [
    'Capabilities describe how we build, which is a separate question from what the business needs.',
    'We cover product engineering, AI and machine learning, data engineering, platform engineering, and product design.',
  ],
  engineering: [
    'Our engineering practices are listed in full on the capabilities page, with the deliverables stated for each discipline.',
    'A handover is part of the deliverable, so your team can own the system without depending on us.',
  ],
  stack: [
    'We are technology-agnostic. While our common stack includes React, Python, Django, Node.js, PostgreSQL, Docker, and AWS, we adapt and use any modern technology according to the specific project requirements.',
  ],
  tools: [
    'We select and use any programming language, framework, database, or tool that best solves the client requirement.',
    'Whether your product needs modern AI agents, Next.js, Python, Node, Go, or specific cloud APIs, we adapt the tooling to fit the problem.',
  ],
  technology: [
    'We can use any technology or tool required by your project.',
    'We do not force generic templates—the tech stack is always chosen based on what your business operation and performance require.',
  ],

  /* --- Work --- */
  work: [
    'Internal and demonstration builds are labelled as such, and client work is published only where the client has given written permission.',
    'We do not attach numbers to results we have not measured, and that rule is not relaxed for client work.',
  ],
  projects: [
    'Our projects cover practice intake, enquiry qualification, operational reporting, appointment booking, offline field capture, grounded customer support and multi-channel inventory synchronisation.',
    'Each one is presented as a system: context, challenge, strategy, design, architecture, implementation, integrations, outcome and next.',
  ],
  'case study': [
    'Client case studies follow the same nine sections as every other project.',
    'The difference is section eight, which states implemented capability and current status rather than performance figures we have not measured.',
  ],
  demo: [
    'Yes — every project on the work pages carries a label, and the label says whether it is client, internal or demonstration work.',
    'We would rather show a smaller honest portfolio than present work we have not delivered.',
  ],

  /* --- Industries --- */
  industries: [
    'We design for four operating environments: healthcare and clinics, real estate, professional services, and hospitality.',
    'They are presented as target areas rather than as a client list, because the portfolio is not one yet.',
  ],
  industry: [
    'The industries page describes the operating conditions we design for — data sensitivity, compliance, volume and customer expectation.',
    'Those conditions change the architecture, which is why each one gets its own page.',
  ],

  /* --- Company, team, delivery --- */
  company: [
    'Solvionix is a founder-led technology company focused on software engineering, AI, data, automation and integration.',
    'The company page covers why we exist, how we decide what to build, and how we expect to work with an organisation over time.',
  ],
  team: [
    'Solvionix is founder-led, so the person who scopes the work is the person who builds it.',
    'We publish team details only where they are agreed, which is why the team page is short.',
  ],
  'how do you work': [
    'We follow a fixed delivery lifecycle: requirement, discovery, architecture, design, engineering, integration, validation, deployment, then monitoring and improvement.',
    'Each stage produces something written, so you can read what has been decided instead of taking it on trust.',
  ],
  process: [
    'The lifecycle starts with the business requirement and ends with monitoring and improvement, with a written output at every stage.',
    'The full sequence is on the company page.',
  ],

  /* --- Engagement --- */
  pricing: [
    'We do not publish a rate card. Cost depends on the scope, and a number quoted before discovery is usually a guess.',
    'What we do is give you a written plan and a fixed figure for it once the requirement is understood.',
  ],
  timeline: [
    'We cannot give a duration before the requirement is understood, because scope drives it directly.',
    'What we can commit to is the lifecycle: a written output at each stage, and something running early rather than at the end.',
  ],
  contact: [
    'The contact form is structured as the start of a discovery conversation, starting with what you are looking for and where the project stands.',
    'We read every enquiry and reply with a straight view, including whether we think we are the right team for it.',
  ],
  start: [
    'Use the "Start a Project" button, and the form will open on the contact page.',
    'If you are still deciding whether the project is worth doing, that is worth saying in the first line — it is a useful answer too.',
  ],
  email: [
    'A direct email address is not published yet, so the contact form is the reliable route.',
    'It is structured to get a useful first reply rather than a generic acknowledgement.',
  ],
  whatsapp: [
    'WhatsApp is available as a floating button on every page once a business number is configured.',
    'The contact form remains the better route for anything that needs detail.',
  ],

  founder: [
    'Solvionix was founded by Muhammad Sohib, a 24-year-old systems and software engineer.',
    'He leads system architecture, full-stack product builds, and applied AI automations with direct engineering accountability.',
    'You can explore more about our leadership on the Company (/company) and Team (/team) pages.',
  ],
  sohib: [
    'Muhammad Sohib is the 24-year-old founder and solutions architect of Solvionix.',
    'He directly scopes and leads engineering across web platforms, custom LLM agents, and internal business systems.',
  ],
  team: [
    'Solvionix is founder-led by Muhammad Sohib. We work as dedicated engineering pods where the architect who scopes your project is directly responsible for building and shipping it.',
    'Learn more about our engineering principles on the Team page (/team).',
  ],

  /* --- Fallback --- */
  default: [
    'I can help with our solutions, our capabilities, the industries we design for, our work, and how we deliver.',
    'For anything specific, the contact form is the best route — it starts with what you are trying to change rather than with a list of services.',
  ],
}

/** Shown above the input so the limits of the assistant are stated plainly. */
export const disclaimer =
  'Information only. Nothing here is binding until a requirement has been discussed.'

/** Shown as the placeholder in the input field. */
export const inputPlaceholder = 'Ask about solutions, capabilities or work…'

/** Used for the accessible name of the launcher. */
export const openLabel = 'Open the Solvionix assistant'
export const closeLabel = 'Minimise the Solvionix assistant'

/** Longest answer in the set, used to pace the typing state realistically. */
export const TYPING_MIN_MS = 420
export const TYPING_PER_CHAR_MS = 9
export const TYPING_MAX_MS = 1600

/** Lower-cased keywords, for whole-word matching at runtime. */
export const responseKeywords = Object.keys(responses).map((key) => key.toLowerCase())

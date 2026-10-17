/**
 * PAGE COPY
 * =========
 * One block per page. The rule this file is written to: no sentence appears on
 * two pages. Each page has to earn its place by adding something, which is why
 * the copy is split across the data files next door rather than collected here.
 *
 * The hero is NOT in this file. That design is approved and stays exactly as it
 * is, so its copy sits at the top of this file untouched.
 *
 * Language rules: talk about business requirements, systems, architecture and
 * delivery. No claims we cannot evidence, no statistics, no years, no clients.
 */

/* ---------------------------------------------------------- Navigation --- */

export const navLinks = [
  { id: 'solutions', label: 'Solutions', to: '/solutions' },
  { id: 'industries', label: 'Industries', to: '/industries' },
  { id: 'work', label: 'Work', to: '/work' },
  { id: 'capabilities', label: 'Capabilities', to: '/capabilities' },
  { id: 'company', label: 'Company', to: '/company' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

/** The footer adds Team to the main navigation, so it keeps its own order. */
export const footerNavLinks = [
  { id: 'solutions', label: 'Solutions', to: '/solutions' },
  { id: 'industries', label: 'Industries', to: '/industries' },
  { id: 'work', label: 'Work', to: '/work' },
  { id: 'capabilities', label: 'Capabilities', to: '/capabilities' },
  { id: 'company', label: 'Company', to: '/company' },
  { id: 'team', label: 'Team', to: '/team' },
  { id: 'contact', label: 'Contact', to: '/contact' },
]

/* ---------------------------------------------------------------- Hero --- */

/**
 * The hero is an approved design and is deliberately not part of any redesign
 * pass, so its copy is kept exactly as first written. The headline is an array
 * because each line rises into place on load.
 */
export const hero = {
  positioning: 'We Solve Business Problems With Technology',
  headline: ['Turning Business', 'Problems Into', 'Technology Solutions.'],
  description:
    'Solvionix helps startups and growing businesses save time, simplify operations, and build useful software through practical AI, automation, and resilient engineering.',
  reassurance: 'Clear language · No technical knowledge required',
  primaryCta: 'Tell Us Your Problem →',
  secondaryCta: 'Explore Our Solutions',
  capabilities: [
    'AI & Automation',
    'Custom Software',
    'Workflow Integrations',
    'Data & Analytics',
    'Machine Learning',
    'Web & SaaS Apps',
    'Internal Portals',
    'System Architecture',
  ],
}

/* ---------------------------------------------------------------- Home --- */

export const home = {
  positioning: {
    eyebrow: 'Positioning',
    title: 'Technology built around how your business operates.',
    body: 'We design and engineer digital products, intelligent systems and connected business platforms around the way organisations actually work — from initial architecture through deployment and continuous improvement.',
    /* The philosophy, stated as the order of work rather than as a claim. */
    method: [
      { label: 'Start', detail: 'With the business problem, not with a technology.' },
      { label: 'Locate', detail: 'Where time, money, leads or visibility are being lost.' },
      { label: 'Design', detail: 'The smallest system that removes that loss.' },
      { label: 'Improve', detail: 'Against real usage, after it goes live.' },
    ],
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'Solutions for complex business requirements',
    description:
      'Five areas of work, each defined by the operational problem it removes rather than by a list of technologies.',
  },
  work: {
    eyebrow: 'Selected Work',
    title: 'How we build, shown as systems',
    description:
      'Demonstration and internal projects presented as systems: the business context, the architecture, the decisions behind it and the current state of each build.',
  },
  capability: {
    eyebrow: 'Engineering Capability',
    title: 'Built to be maintained after we leave',
    description:
      'The disciplines behind every build. A handover is part of the deliverable, so your team can own what we make.',
  },
  industries: {
    eyebrow: 'Industries',
    title: 'Where these systems are applied',
    description:
      'Target areas for our solutions. We describe the operational conditions we design for, not a client list.',
  },
  delivery: {
    eyebrow: 'Delivery',
    title: 'How software actually gets delivered',
    description:
      'A fixed lifecycle. Every stage produces something you can read, so you always know what is decided and what happens next.',
  },
  team: {
    eyebrow: 'Company',
    title: 'The people behind the delivery',
    description:
      'Solvionix is founder-led. The person who scopes the work is the person who builds it.',
  },
  contact: {
    eyebrow: 'Next Step',
    title: 'Tell us what you are trying to change.',
    description:
      'The more precisely you can describe the operational problem, the more useful our first reply will be.',
  },
}

/* ------------------------------------------------------------- Solutions --- */

export const solutionsPage = {
  title: 'Solutions',
  description:
    'Business problems rarely arrive as technology requirements. These five areas cover the operational failures we are asked to remove, and how we approach each one.',
  intro: {
    title: 'What the business is losing',
    body: 'Time, money, leads, operational efficiency, visibility and productivity. One of these is usually the actual request, and it is worth naming before any architecture is drawn.',
  },
  closing: {
    title: 'Start with the requirement',
    body: 'If you are not sure which of these a problem belongs to, that is a normal place to start. Describe the operation that is not working and we will tell you how we would model it.',
  },
}

/* ------------------------------------------------------------ Industries --- */

export const industriesPage = {
  title: 'Industries',
  description:
    'Four operating environments we design for. Each has different constraints around data, compliance, staff and customer expectation, and those constraints change the architecture.',
  note: {
    title: 'A note on these sections',
    body: 'These are target areas where our solutions are designed to apply. We do not present them as a client list, because the portfolio is not one yet.',
  },
  closing: {
    title: 'Working in a different sector',
    body: 'The underlying engineering is the same. What changes is the compliance model, the data sensitivity and the shape of the customer journey. Tell us the sector and we will describe how that changes the system.',
  },
}

/* ------------------------------------------------------------------ Work --- */

export const workPage = {
  title: 'Work',
  description:
    'Evidence of how we engineer production systems. Systems published here include client deliveries, internal prototypes, and demonstration architectures, clearly labelled and documented in depth.',
  systems: {
    eyebrow: 'Systems',
    title: 'Every project is read as a system',
    body: 'A project page follows the same order each time: business context, challenge, solution strategy, design, architecture, implementation, integrations, outcome and what comes next. It is deliberately close to a technical document, because that is how we would present it internally.',
  },
  caseStudy: {
    eyebrow: 'Case Studies',
    title: 'Standardised 9-part case study architecture',
    body: 'Every case study follows strict engineering discipline: verifiable system flow, telemetry specifications, and concrete architectural constraints rather than unmeasured marketing claims.',
  },
  closing: {
    title: 'Engineered for operational durability',
    body: 'Whether delivered for an enterprise client or built internally as an architecture prototype, each system is documented with its complete data flow, failure modes, and code ownership handover.',
  },
}

export const workIndex = {
  projectsTitle: 'Client and demonstration systems',
  caseStudiesTitle: 'Case study format',
}

/* ---------------------------------------------------------- Capabilities --- */

export const capabilitiesPage = {
  title: 'Capabilities',
  description:
    'Solutions describe what a business problem needs. Capabilities describe how we build it. This page is the second of those two, and the two are deliberately kept apart.',
  distinction: {
    title: 'Two different questions',
    rows: [
      { question: 'What does the business need?', answer: 'Answered on the Solutions page, in terms of operational loss and expected value.' },
      { question: 'How would we build it?', answer: 'Answered here, in terms of engineering practice and deliverables.' },
    ],
  },
  closing: {
    title: 'Technology is a means, not the argument',
    body: 'Every capability below names specific tools, because that is what an engineering team needs to assess us on. The tools are listed after the capability, never in place of it.',
  },
}

/* --------------------------------------------------------------- Company --- */

export const companyPage = {
  title: 'Company',
  description:
    'Why Solvionix exists, how it decides what to build, and how it expects to work with an organisation over time.',
  exists: {
    title: 'Why Solvionix exists',
    body: [
      'Most organisations do not have a software shortage. They have a stack of generic tools, spreadsheets and workarounds that somebody maintains every day, and that somebody is usually the person with the least time.',
      'Solvionix exists to remove that layer. We look at where the operation loses time or money, build the smallest system that fixes it, and hand it over in a state the client’s own team can own.',
    ],
  },
  thinks: {
    title: 'How we think about technology',
    body: [
      'The business problem comes first. A technology is only worth proposing once we can state the loss it is meant to remove and how we will know it has been removed.',
      'That order is not a formality. It is the difference between software that is used and software that is written, delivered and then quietly ignored.',
    ],
  },
  works: {
    title: 'How we work with organisations',
    body: [
      'Directly, and with the person who made the decision staying on the engagement. Discovery, architecture and scope are discussed with the people who will live with the result, not handed to a delivery layer afterwards.',
      'Written outputs at every stage: requirements, architecture notes, a delivery plan and handover documentation. The intent is that a client is never dependent on us to understand their own system.',
    ],
  },
  going: {
    title: 'Where Solvionix is going',
    body: [
      'Solvionix is founder-led and intends to grow into a specialised software house combining software engineering, AI, data science, automation and digital growth.',
      'The long-term aim is to be a technology partner rather than a development vendor: involved early enough to shape the requirement, and retained long enough to keep improving the system after it ships.',
    ],
  },
  /* Stated as a structure, not as a claim of size. */
  structure: {
    title: 'How the company is organised',
    rows: [
      { label: 'Model', value: 'Founder-led, with delivery handled by the same people who scope the work.' },
      { label: 'Base', value: 'Working remotely with clients in Europe and further afield.' },
      { label: 'Engagement', value: 'Project based, with an optional ongoing improvement phase after launch.' },
      { label: 'Focus', value: 'Software engineering, AI, data, automation and integration.' },
    ],
  },
  teamLink: {
    title: 'Who does the work',
    body: 'The team is small and named. The people listed on the team page are the people who would be on the engagement.',
  },
}

/* ------------------------------------------------------------------ Team --- */

export const teamPage = {
  title: 'Team',
  description:
    'The people responsible for delivery. Roles and specialisations are listed as they stand; nothing here is inferred or filled in as a guess.',
  note: {
    title: 'Verified information only',
    body: 'We publish a team member’s name, role and specialisation only when those are agreed. Credentials, years of experience and achievements are left out rather than approximated.',
  },
  closing: {
    title: 'Working with a small team',
    body: 'A small team means the person you speak with is the person who does the work. It also means capacity is limited, and we would rather say so at the start of a conversation than halfway through one.',
  },
}

/* --------------------------------------------------------------- Contact --- */

export const contactPage = {
  title: 'Contact',
  lead: 'Let’s discuss your business challenge.',
  intro:
    'You do not need to know which technology you need. Describe what’s happening in your business in your own words, and an engineering lead will help evaluate the practical solution.',
  qualification: {
    title: 'The shape of your challenge',
    body: 'Selecting the closest category and stage gives our engineering team immediate context, so our very first response contains practical guidance rather than a generic sales pitch.',
  },
  requirement: {
    title: 'Describe the problem in your own words',
    body: 'The operational bottleneck matters far more than a feature list. What is not working today, who it affects, and what it is costing in manual hours or friction.',
  },
  details: {
    title: 'Where to reach you',
    body: 'Country is included because time zones and data handling both affect how a project is run.',
  },
  response: {
    title: 'What happens next',
    steps: [
      { label: 'We read the requirement', detail: 'Against the actual problem, not against a list of services.' },
      { label: 'We reply with a view', detail: 'Including whether we think we are the right team for it.' },
      { label: 'We schedule a call', detail: 'Only if the requirement looks like a fit for us.' },
    ],
  },
  channelsTitle: 'Other ways to reach us',
  socialTitle: 'Elsewhere',
  whatsappTitle: 'WhatsApp',
  whatsappNote: 'The quickest way to reach us.',
}

/* --------------------------------------------------------------- Privacy --- */

export const privacyPage = {
  title: 'Privacy Policy',
  description:
    'What this website does with the information you give it, written to match what the code actually does.',
  lastReviewed: 'September 2026',
  sections: [
    {
      title: 'What this site collects',
      body: 'This site does not use analytics, advertising pixels, tracking cookies or third-party embeds. Nothing is collected while you browse.',
    },
    {
      title: 'What happens to the enquiry form',
      body: 'The form on the contact page is not yet connected to a live submission service. Until it is, the form validates your input in the browser and does not transmit or store it anywhere. Nothing you type leaves your device.',
    },
    {
      title: 'Local storage',
      body: 'The site keeps the chatbot conversation in your browser’s memory for the length of the page view, so the thread stays readable while you scroll. It is not written to persistent storage and is cleared when you close the tab.',
    },
    {
      title: 'Third-party links',
      body: 'Links to external services open in a new tab. Once you follow one, that provider’s own privacy policy applies.',
    },
    {
      title: 'Your rights',
      body: 'Because this site does not collect or store personal data, there is nothing held for us to disclose, correct or delete. If an enquiry channel becomes active, this section will be updated before it does, and will name the processor and the retention period.',
    },
    {
      title: 'Contact',
      body: 'Questions about this policy can be sent through the contact page. A published email address will be added here once one is confirmed.',
    },
  ],
}

/* --------------------------------------------------------- Small strings --- */

/** Global reach statement, used once in the footer. */
export const reachLine = 'Working with organisations across Europe and further afield.'

/** Shown on the work pages so a demonstration build is never read as client work. */
export const workDisclosure =
  'Internal and demonstration builds are labelled as such. Named client work appears where the client has given written permission. We do not attach numbers to a result we have not measured, and that applies to client work too.'

/** Shown wherever a solution or capability page could be mistaken for a client claim. */
export const targetAreasNote =
  'Presented as an area we design for, not as a record of delivered client work.'

export default navLinks

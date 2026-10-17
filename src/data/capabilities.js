/**
 * CAPABILITIES — how the solutions get built.
 *
 * This file answers a different question from `solutions.js`:
 *
 *   solutions.js      "What does the business need, and what would removing
 *                      that loss require?"
 *   capabilities.js   "How would we build it, and what does the client receive?"
 * The two are never merged. Technology names live at the end of each entry as
 * supporting detail, because a capability is defined by its practice and
 * deliverables, not by a list of frameworks.
 *
 * Fields
 *   id            URL segment
 *   number        01–05
 *   title         capability name
 *   summary       one line
 *   practice      what the discipline covers, in engineering terms
 *   deliverables  what the client actually receives
 *   standards     the commitments that make the work maintainable
 *   technologies  supporting, shown last
 *   relatedSolutions
 *                  ids from solutions.js, used only to answer "where is this
 *                  actually applied — at the foot of the page. The two datasets
 *                  stay separate everywhere else.
 */

export const capabilities = [
  {
    id: 'product-engineering',
    number: '01',
    title: 'Product Engineering',
    summary: 'Digital products, SaaS platforms, customer portals and internal systems, built to be operated.',
    practice: [
      'Domain modelling before implementation, so the data model reflects the business rather than the database',
      'Typed, versioned API contracts shared by every client of the system',
      'Component-level interface construction with accessible primitives and a documented pattern for reuse',
      'Role-aware interfaces where the same data exposes different actions to different roles',
      'Performance budgets and progressive delivery, so a large product does not degrade as it grows',
    ],
    deliverables: [
      'A working application with an administration surface',
      'API documentation and a data model description',
      'A test suite covering the critical workflows',
      'Deployment configuration and a rollback procedure',
    ],
    standards: [
      'Modular code, with a stated reason for every abstraction',
      'Type safety across the API boundary',
      'Keyboard and screen-reader support built in, not retrofitted',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Vite'],
    relatedSolutions: ['digital-products', 'business-systems'],
  },
  {
    id: 'ai-ml',
    number: '02',
    title: 'AI & Machine Learning',
    summary: 'Assistants, retrieval systems, document intelligence and AI workflows that hold up in production.',
    practice: [
      'Retrieval-augmented generation grounded in the client’s own material, with citations back to source',
      'Document intelligence for structured extraction from unstructured input, including confidence scoring',
      'Evaluation as a deliverable: a test set, a measured baseline and a regression check before every release',
      'Model routing between a hosted API and a self-hosted model, chosen per workload on cost and data sensitivity',
      'Human confirmation on the consequential actions, with the model’s reasoning recorded alongside the result',
    ],
    deliverables: [
      'A working AI workflow integrated into an existing process',
      'An evaluation set and a measured baseline for the model’s behaviour',
      'Prompt and retrieval configuration as versioned source',
      'A documented plan for cost and latency at your expected volume',
    ],
    standards: [
      'No AI action commits to a system of record without a defined review step',
      'Grounding is verifiable, so an answer can be traced to its source',
      'Model dependency isolated behind an interface, so a provider change is a configuration change',
    ],
    technologies: ['Python', 'Retrieval pipelines', 'Language model APIs', 'Vector search', 'Model evaluation tooling'],
    relatedSolutions: ['intelligent-systems', 'business-systems'],
  },
  {
    id: 'data-engineering',
    number: '03',
    title: 'Data Engineering',
    summary: 'Pipelines, models and reporting that produce one agreed version of every number.',
    practice: [
      'Ingestion designed to be re-runnable, so a failed load is retried rather than repaired by hand',
      'Validation at the boundary, with schema, volume and range checks that alert instead of failing silently',
      'A modelled layer with one definition per business measure, agreed before it is built',
      'Traceability from any reported figure back to the records it was derived from',
      'Machine learning workflows versioned alongside the data version they were trained on',
    ],
    deliverables: [
      'A scheduled, monitored pipeline with documented recovery steps',
      'A metric model with agreed definitions',
      'A reporting layer and its access model',
      'Alerting for the failures that would otherwise be discovered by someone else',
    ],
    standards: [
      'Idempotent loads, so re-running a job cannot corrupt state',
      'Every transformation is versioned and reviewable',
      'No report is published without a route back to its source records',
    ],
    technologies: ['Python', 'SQL', 'Airflow or scheduled jobs', 'PostgreSQL', 'Warehouse', 'dbt-style modelling'],
    relatedSolutions: ['data-decision-systems', 'business-systems'],
  },
  {
    id: 'platform-engineering',
    number: '04',
    title: 'Platform Engineering',
    summary: 'Backend systems, APIs, authentication, databases and integrations that stay maintainable.',
    practice: [
      'API design with resource boundaries, versioning and a documented error contract',
      'Authentication and authorisation designed as a model, not a bolt-on, with permissions enforced server-side',
      'Database design around the access patterns the product actually has',
      'Integrations written to be idempotent, with explicit conflict rules and a dead-letter path',
      'Infrastructure as code, with environments that are reproducible rather than described',
    ],
    deliverables: [
      'A documented API with versioning policy',
      'Infrastructure-as-code with a reproducible environment',
      'Monitoring, alerting and a written runbook',
      'A backup and restore procedure that has been tested',
    ],
    standards: [
      'Authorization checked on the server, never only in the interface',
      'Secrets managed outside source control',
      'Rollback is a tested procedure, not a hope',
    ],
    technologies: ['Python', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'REST and webhook APIs', 'Cloud infrastructure'],
    relatedSolutions: ['connected-infrastructure', 'business-systems', 'digital-products'],
  },
  {
    id: 'product-design',
    number: '05',
    title: 'Product Design',
    summary: 'UX architecture, interface design and design systems for products that have to be used daily.',
    practice: [
      'UX architecture before pixels: flows, states and the order of decisions a user makes',
      'Every state designed, including empty, loading, partial, error and permission-denied',
      'A design system with tokens, primitives and documented composition rules',
      'Responsive design as a re-layout, not a scale-down, with touch targets and density considered per device',
      'Accessibility built into the primitives, so it survives feature work',
    ],
    deliverables: [
      'Flow and state documentation for every critical journey',
      'A component library with usage rules',
      'Responsive layouts specified per breakpoint',
      'An accessibility pass against the delivered build',
    ],
    standards: [
      'Every screen has a defined empty state and a defined failure state',
      'Contrast and focus order are verified, not assumed',
      'Components are composed from primitives rather than rebuilt per page',
    ],
    technologies: ['Figma', 'Design tokens', 'CSS architecture', 'Accessibility standards', 'Component libraries'],
    relatedSolutions: ['digital-products', 'intelligent-systems'],
  },
]

export const getCapability = (id) => capabilities.find((capability) => capability.id === id) ?? null

export default capabilities

/**
 * SOLUTIONS — what a business problem requires.
 *
 * A solution answers "what is being asked for" in operational terms. It never
 * names a language or framework, and it never shares a field with
 * `capabilities.js`, which answers "how we build it". Keeping the two files
 * separate is what stops the site collapsing into a services list.
 *
 * Every entry carries the same three-part spine, because that is the sequence
 * an engineering conversation actually follows:
 *
 *   requirement  the operational loss, stated in the client's language
 *   approach     the technology response, described as a shape not a product
 *   value        the effect to expect, never a number we have not measured
 *
 * Fields
 *   id             URL segment
 *   number         01–05, used as the editorial index
 *   title          category name
 *   summary        one line, shown on the index page
 *   requirement    the business problem
 *   approach       the technology approach
 *   value          expected operational value
 *   scope          what the work typically contains
 *   technologies   secondary, and only on the detail page
 *   relatedIndustries  ids from industries.js
 *   flow           architecture layers, rendered by the SystemFlow component
 */

export const solutions = [
  {
    id: 'intelligent-systems',
    number: '01',
    title: 'Intelligent Systems',
    summary: 'Software that reads, decides or drafts, with a person kept in the loop.',
    requirement:
      'Work that depends on reading, classifying or writing text, performed by a person several times a day and inconsistently.',
    approach:
      'A retrieval and language layer sits behind the existing process rather than in front of it. The system reads the source material, proposes an action against agreed criteria, and a person confirms it. Confidence thresholds decide what can be queued and what is escalated.',
    value:
      'Consistency across large volumes, faster handling of routine items, and a recorded reason behind every decision the system made.',
    scope: [
      'AI assistants embedded in an existing workflow',
      'Document intelligence for forms, contracts and records',
      'Knowledge systems grounded in an organisation’s own material',
      'Workflow automation with approval steps',
    ],
    technologies: ['Python', 'Retrieval pipelines', 'Language model APIs', 'Queueing', 'React'],
    relatedIndustries: ['healthcare', 'professional-services', 'hospitality'],
    flow: [
      { label: 'Source material', detail: 'Email, documents, forms, existing records' },
      { label: 'Ingestion', detail: 'Extract, normalise, remove duplicates' },
      { label: 'Language layer', detail: 'Retrieve context, classify, draft a response' },
      { label: 'Rules and thresholds', detail: 'Confidence decides: queue, or escalate' },
      { label: 'Human confirmation', detail: 'A person approves before anything is committed' },
      { label: 'System of record', detail: 'Written back with the decision reason attached' },
    ],
  },
  {
    id: 'digital-products',
    number: '02',
    title: 'Digital Products',
    summary: 'Customer-facing platforms, portals and applications built to be operated.',
    requirement:
      'A service delivered manually over email or paperwork, where the interaction with the customer is the product and it does not scale on people.',
    approach:
      'A multi-tenant application with a defined domain model, a role-aware interface and an API that the client’s own systems can call. The product is designed for the lifecycle of a real account, not for a launch.',
    value:
      'Customers complete a process without an intermediary, the organisation stops absorbing manual requests, and the product can carry new features without a rebuild.',
    scope: [
      'Customer portals and self-service accounts',
      'Web applications and SaaS products',
      'Booking, quoting and request flows',
      'Role-aware interfaces for staff and customers',
    ],
    technologies: ['React', 'Node.js or Django', 'PostgreSQL', 'REST APIs', 'Object storage'],
    relatedIndustries: ['real-estate', 'hospitality', 'professional-services'],
    flow: [
      { label: 'Customer', detail: 'Web or mobile interface' },
      { label: 'Application', detail: 'Accounts, permissions, domain rules' },
      { label: 'API layer', detail: 'Authenticated, versioned, rate limited' },
      { label: 'Business logic', detail: 'Pricing, availability, workflow state' },
      { label: 'Database', detail: 'Single source of truth per domain' },
      { label: 'Notifications', detail: 'Email, SMS, push, calendar invites' },
    ],
  },
  {
    id: 'business-systems',
    number: '03',
    title: 'Business Systems',
    summary: 'The internal platforms a team runs its operation on every day.',
    requirement:
      'A process that depends on one person knowing how it works, tracked in spreadsheets, with the state of the business understood by reading several files.',
    approach:
      'The process is modelled as explicit states with permitted transitions, then exposed as a system with an audit trail. Spreadsheets are replaced or, where they still earn their place, fed from the system rather than maintained alongside it.',
    value:
      'Process knowledge lives in the system rather than in someone’s head, the state of the operation is visible without asking, and every change is attributable.',
    scope: [
      'Operational platforms and internal tools',
      'CRM workflows and pipeline state',
      'Management and approval systems',
      'Business process automation between departments',
    ],
    technologies: ['React', 'Django', 'PostgreSQL', 'Background jobs', 'Role-based access'],
    relatedIndustries: ['real-estate', 'professional-services', 'healthcare'],
    flow: [
      { label: 'Staff interface', detail: 'The work as it is actually performed' },
      { label: 'Workflow engine', detail: 'States, transitions, permissions, approvals' },
      { label: 'API layer', detail: 'One contract for every client of the workflow' },
      { label: 'Operational database', detail: 'Every change recorded with actor and time' },
      { label: 'Reporting', detail: 'Live state, no spreadsheet reconciliation' },
      { label: 'External systems', detail: 'Email, accounting, calendar, storage' },
    ],
  },
  {
    id: 'data-decision-systems',
    number: '04',
    title: 'Data & Decision Systems',
    summary: 'Reporting and models built on data that can be traced back to its source.',
    requirement:
      'Decisions made on numbers that several people calculate differently, with no agreed definition of a metric and no way to check an aggregate against the records behind it.',
    approach:
      'Pipelines move and validate data from each source into a modelled store with defined metric definitions. Reporting reads from that model, and every figure can be traced to the underlying records. Models are versioned and retrained against a measured baseline.',
    value:
      'One agreed version of each number, a path from any figure back to the records it came from, and a reporting layer that does not need rebuilding when a source system changes.',
    scope: [
      'Analytics platforms and reporting layers',
      'Data pipelines with validation and alerting',
      'Business intelligence and dashboards',
      'Machine learning models in an operational context',
    ],
    technologies: ['Python', 'Airflow or scheduled jobs', 'PostgreSQL', 'Warehouse', 'Model serving'],
    relatedIndustries: ['hospitality', 'real-estate', 'healthcare'],
    flow: [
      { label: 'Source systems', detail: 'Operational databases and third-party feeds' },
      { label: 'Ingestion', detail: 'Scheduled, monitored, re-runnable' },
      { label: 'Validation', detail: 'Schema, volume and range checks with alerting' },
      { label: 'Metric model', detail: 'One agreed definition per business measure' },
      { label: 'Reporting and models', detail: 'Dashboards and ML outputs, both traceable' },
      { label: 'Delivery', detail: 'Scheduled exports, alerts, downstream systems' },
    ],
  },
  {
    id: 'connected-infrastructure',
    number: '05',
    title: 'Connected Infrastructure',
    summary: 'The integration layer that lets systems in different organisations act as one.',
    requirement:
      'Two systems that must agree, but do not, and every attempt to reconcile them is a person copying data between screens.',
    approach:
      'One system is treated as the source of truth for each field. The other is synchronised through an integration service with idempotent operations, explicit conflict handling and a dead-letter path, so a failure is visible instead of silent.',
    value:
      'Data entered once and consistent everywhere, manual copying removed, and integration failures surfaced rather than absorbed.',
    scope: [
      'Public and internal APIs',
      'Third-party service integrations',
      'Payment provider integration',
      'System-to-system synchronisation and event flows',
    ],
    technologies: ['Node.js', 'Python', 'REST and webhook APIs', 'PostgreSQL', 'Queueing', 'Idempotency keys'],
    relatedIndustries: ['hospitality', 'real-estate', 'professional-services'],
    flow: [
      { label: 'System A', detail: 'Source of truth for its own fields' },
      { label: 'Integration service', detail: 'Mapping, validation, idempotency' },
      { label: 'Queue', detail: 'Retry with backoff, dead-letter on exhaustion' },
      { label: 'System B', detail: 'Updated, with the origin recorded' },
      { label: 'Conflict handling', detail: 'Defined rule per field, never last-write-wins' },
      { label: 'Reconciliation', detail: 'Scheduled comparison and alerting' },
    ],
  },
]

export const getSolution = (id) => solutions.find((solution) => solution.id === id) ?? null

export default solutions

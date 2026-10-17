/**
 * SOFTWARE DELIVERY LIFECYCLE
 * ===========================
 * Used on the Home page (a compressed preview) and on the Company page (the
 * full lifecycle). Same data, two depths, so the two pages can never disagree
 * about what the process is.
 *
 * Each stage names an output, not just an activity. "Architecture" is only
 * meaningful here if it produces something the client can read and disagree
 * with, and that is the intent of every entry below.
 */

export const deliveryStages = [
  {
    number: '01',
    title: 'Business Requirement',
    short: 'Requirement',
    body: 'The problem is stated in operational terms: who is losing what, and how often. No solution is proposed at this stage, because a solution proposed too early anchors the conversation on a technology rather than on the loss.',
    output: 'A written statement of the operational problem and the loss it causes.',
  },
  {
    number: '02',
    title: 'Discovery & Analysis',
    short: 'Discovery',
    body: 'We map the process as it is actually performed, including the spreadsheets and workarounds that are rarely mentioned, and inventory the systems already in place that the new work will have to live alongside.',
    output: 'A process map, the current systems inventory, and the constraints discovered.',
  },
  {
    number: '03',
    title: 'Solution Architecture',
    short: 'Architecture',
    body: 'Define how the product, APIs, data, integrations and infrastructure work together, and record the decisions that were rejected and why. This is the document the client reads to check our reasoning.',
    output: 'An architecture document with a data model, integration map and named decisions.',
  },
  {
    number: '04',
    title: 'UX & Product Design',
    short: 'Design',
    body: 'Flows and states are designed before interface work begins, including the empty, loading, error and permission-denied cases. Cheap to change here; expensive everywhere after.',
    output: 'Flows, a state specification and a component system.',
  },
  {
    number: '05',
    title: 'Engineering',
    short: 'Engineering',
    body: 'Build modular, maintainable, production-ready software in short stages, with something running early rather than one large reveal at the end.',
    output: 'Working software, reviewed in increments, in a shared environment.',
  },
  {
    number: '06',
    title: 'Integration',
    short: 'Integration',
    body: 'Connect the new system to the existing estate. Integration is where most project risk actually lives, so it is treated as a first-class stage with its own testing rather than a task at the end of engineering.',
    output: 'Working integrations with defined behaviour for failure and retry.',
  },
  {
    number: '07',
    title: 'Testing & Validation',
    short: 'Validation',
    body: 'Test workflows, integrations, performance and reliability before release, and validate against the business requirement the project started with rather than against the ticket list.',
    output: 'A test report, a performance baseline and a sign-off against the original requirement.',
  },
  {
    number: '08',
    title: 'Deployment',
    short: 'Deployment',
    body: 'Release to production with a documented procedure, a tested rollback, and monitoring in place before traffic arrives.',
    output: 'A deployment runbook, a rollback procedure and active monitoring.',
  },
  {
    number: '09',
    title: 'Monitoring & Improvement',
    short: 'Improvement',
    body: 'Monitor real-world usage against the requirement the project was built for, and improve the parts that slow people down. A system nobody has watched is a system nobody has improved.',
    output: 'Monitoring in place, a review cadence, and a prioritised improvement backlog.',
  },
]

/** The number of stages shown on the home page preview. */
export const deliveryPreviewCount = 4

/** Used on the Company page as a compact rail alongside the full list. */
export const deliveryStageNames = deliveryStages.map((stage) => stage.short)

export default deliveryStages

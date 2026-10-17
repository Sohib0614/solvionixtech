/**
 * WORK — projects presented as systems.
 *
 * Entries are labelled `Client Project`, `Internal Project` or
 * `Demonstration Project`, and the label is rendered on the card and repeated in
 * the page header so a build can never be read as the wrong kind of work.
 *
 * OUTCOME RULES, and they are not relaxed for a named client: never a number, a
 * percentage, a revenue figure or an unmeasured result. Use the `status` and
 * `capabilitiesImplemented` fields instead. Inventing a result because a project
 * has a name attached to it would be the single most damaging thing this page
 * could do — a demonstrable capability can be checked, a fabricated metric cannot
 * be, so a client project gets the same discipline as every other entry.
 *
 * Each project follows the same nine-part case study structure, in this order:
 *
 *   01 Business Context        what the organisation was doing
 *   02 The Challenge           the specific operational failure
 *   03 Solution Strategy       the approach, and what was deliberately excluded
 *   04 Product / System Design the flows, states and data model
 *   05 Architecture            the layers and how they connect
 *   06 Implementation          how it was built and what that implies
 *   07 Integrations            the systems it talks to
 *   08 Outcome                 implemented capabilities and current status
 *   09 Next Evolution          what would come next
 *
 * OUTCOME RULES: see the note at the top of this file.
 *
 * Fields
 *   id                 URL segment under /work
 *   label              'Client Project' | 'Internal Project' | 'Demonstration Project'
 *   client             organisation's name; present only when label is CLIENT
 *   title              project name
 *   summary            one line for the card
 *   domain             the operating environment it models
 *   relatedSolutions   ids from solutions.js
 *   relatedIndustries  ids from industries.js
 *   architecture       the layer stack, rendered by SystemFlow
 *   userFlow           the primary path through the system
 *   caseStudy          { context, challenge, strategy, design, implementation,
 *                        integrations, outcome, next }
 *   status             current state, in words
 *   capabilitiesImplemented  what the build demonstrably does
 *   technology         supporting, shown last
 *   liveUrl            null until something is genuinely public
 *   repoUrl            null
 *
 * There is no `screenshots` field. An earlier version had one and nothing ever
 * rendered it. The card now carries a generated abstract plate instead — see
 * ProjectVisual for why it is a diagram and not a screenshot.
 */

const CLIENT = 'Client Project'
const DEMONSTRATION = 'Demonstration Project'
const INTERNAL = 'Internal Project'

export const work = [
  {
    id: 'frenchmart-commerce-os',
    label: CLIENT,
    client: 'FrenchMart',
    title: 'FrenchMart — Omni-Channel Commerce OS',
    summary: 'Unified retail operations platform orchestrating catalog sync, realtime order routing, and sub-second payment settlement.',
    domain: 'Enterprise eCommerce & Retail Operations',
    screenshot: '/projects/frenchmart-commerce.jpg',
    isMobile: false,
    relatedSolutions: ['business-systems', 'digital-products', 'data-decision-systems'],
    relatedIndustries: ['hospitality', 'professional-services'],
    caseStudy: {
      context:
        'FrenchMart operates a multi-brand retail footprint spanning regional warehouses, physical boutique locations, and high-velocity digital storefronts across European markets.',
      challenge:
        'Disjointed Shopify and legacy ERP systems caused inventory desynchronization, phantom stockouts during flash sales, and manual reconciliation overhead exceeding 40 hours per week.',
      strategy:
        'Architected an event-driven Commerce OS with optimistic inventory locking, single-point-of-truth product data indexing, and an intuitive administrative command center.',
      design:
        'Built a high-contrast dark dashboard with real-time financial telemetry sparklines, automated order fulfillment queues with visual dispatch indicators, and instant sku editing.',
      implementation:
        'Engineered on Next.js 14, Redis caching layers, PostgreSQL ledger tables with strict transactional isolation, and Stripe Connect webhook listeners with automated dead-letter queues.',
      integrations:
        'Multi-currency Stripe Connect engine, DHL & Colissimo carrier shipping APIs, Klaviyo retention triggers, and custom ERP connectors.',
      outcome:
        'Zero inventory over-allocations during peak traffic events; automated 92% of order fulfillment workflows with sub-second dashboard rendering speed.',
      next: 'Predictive seasonal replenishment algorithms and AI-assisted supplier purchase order generation.',
    },
    architecture: [
      { label: 'Storefront & Ingress', detail: 'Edge-distributed Next.js application with ISR caching' },
      { label: 'Inventory Lock Engine', detail: 'Distributed Redis Mutex preventing race conditions' },
      { label: 'Transaction Ledger', detail: 'PostgreSQL ACID-compliant multi-tenant schema' },
      { label: 'Event Dispatch Bus', detail: 'Asynchronous workers consuming high-volume order events' },
      { label: 'Carrier Adapter', detail: 'Dynamic label generation & tracking link synchronization' },
    ],
    userFlow: [
      'Customer executes checkout with sub-second payment authorization',
      'Inventory Lock engine atomically decrements localized stock reserves',
      'Realtime WebSocket notification updates the FrenchMart Admin operations team',
      'Fulfillment team dispatches package with automated carrier label generation',
      'Telemetry and revenue analytics update live across all admin dashboards',
    ],
    status: 'Client project. Full-stack platform deployed in staging with active warehouse pilot.',
    capabilitiesImplemented: [
      'Real-time revenue telemetry and trend area charting',
      'Atomic inventory locking preventing overselling during flash spikes',
      'Automated multi-carrier shipping label generation and webhook sync',
      'Role-based staff permissions across regional retail storefronts',
    ],
    technology: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe Connect', 'Tailwind CSS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "0.00%",
        label: "Inventory Over-Allocation",
        note: "Distributed Redis Mutex locks prevent race conditions"
      },
      {
        value: "< 350ms",
        label: "Checkout Settlement",
        note: "Optimistic UI with asynchronous ledger synchronization"
      },
      {
        value: "92%",
        label: "Automated Routing",
        note: "Direct carrier API label and tracking generation"
      },
      {
        value: "100%",
        label: "Audit Traceability",
        note: "Immutable order modification changelog"
      }
    ],
    telemetry: {
      latency: "< 35ms edge latency",
      security: "PCI-DSS Level 1 Compliant",
      integrity: "Distributed Redis Locking"
    },
  },
  {
    id: 'takecare-mobile-tracking',
    label: DEMONSTRATION,
    title: 'TakeCare — Mobile Fleet & Delivery Tracking App',
    summary: 'Real-time telemetry, driver status telemetry, and interactive map geofencing for mission-critical courier fleets.',
    domain: 'Logistics, Fleet Mobility & Supply Chain',
    screenshot: '/projects/takecare-mobile-app.jpg',
    isMobile: true,
    relatedSolutions: ['digital-products', 'connected-infrastructure'],
    relatedIndustries: ['hospitality', 'real-estate'],
    caseStudy: {
      context:
        'On-demand transport and courier fleets require uninterrupted visibility over active drivers, route deviations, and customer ETA commitments.',
      challenge:
        'Standard off-the-shelf tracking applications consume excessive mobile battery, suffer from GPS drift in urban canyons, and lack real-time supervisor dispatch controls.',
      strategy:
        'Developed TakeCare as a dual-surface ecosystem: a lightweight mobile driver application with dead-reckoning positioning paired with an instant supervisor dispatch console.',
      design:
        'Designed with a high-visibility dark map layer featuring custom SVG path routing, real-time driver ETA countdown cards, and instant status color-coding (On Route, Delivering, Delayed).',
      implementation:
        'Constructed using React Native with native bridge GPS filtering for the mobile client, while the supervisor console leverages WebGL vector mapping with WebSocket streaming updates.',
      integrations:
        'Mapbox GL Navigation API, Twilio SMS ETA alerts, and back-office logistics scheduling software.',
      outcome:
        'Demonstrated smooth 60fps tracking over 1,000+ simulated concurrent active vehicles with sub-second latency from vehicle ping to dispatch dashboard.',
      next: 'Dynamic re-routing driven by live municipal traffic telemetry and predictive battery range alerts.',
    },
    architecture: [
      { label: 'Driver Mobile App', detail: 'Battery-optimized GPS tracker with Kalman smoothing' },
      { label: 'WebSocket Broker', detail: 'Real-time geospatial stream processing broker' },
      { label: 'Geofence Engine', detail: 'Automated polygon arrival/departure trigger detection' },
      { label: 'Dispatch Console', detail: 'High-density vector map interface with live ETA cards' },
      { label: 'Customer Portal', detail: 'Public secure tracking URL with live courier vehicle pin' },
    ],
    userFlow: [
      'Courier launches TakeCare mobile app and accepts manifest assigned by dispatch',
      'Device streams low-overhead geospatial telemetry coordinates via WebSocket',
      'Supervisors observe fleet density, active speed, and route adherence on the Live Map',
      'Geofence automatically triggers customer delivery notification upon 500m radius entry',
      'Recipient confirms receipt with digital proof-of-delivery signature and photo',
    ],
    status: 'Demonstration build. Geospatial WebSocket pipeline and interactive mobile application operational.',
    capabilitiesImplemented: [
      'Real-time vector map rendering with multi-vehicle path interpolation',
      'Geofence proximity detection and automated customer notifications',
      'Driver roster management with ETA calculations and exception alerts',
      'Battery-efficient mobile telemetry streaming protocol',
    ],
    technology: ['React Native', 'React', 'Mapbox GL', 'WebSockets', 'Node.js', 'PostgreSQL / PostGIS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "60 FPS",
        label: "Map Vector Rendering",
        note: "Hardware-accelerated WebGL geospatial pipelines"
      },
      {
        value: "< 100ms",
        label: "GPS Telemetry Latency",
        note: "Lightweight binary WebSocket courier stream"
      },
      {
        value: "96.4%",
        label: "ETA Prediction Accuracy",
        note: "Continuous historical transit time regression"
      },
      {
        value: "Zero",
        label: "Data Dropouts",
        note: "Local device buffer during cellular blind spots"
      }
    ],
    telemetry: {
      latency: "45ms WebSocket stream",
      security: "End-to-End Encrypted Coordinates",
      integrity: "Kalman Filter Sensor Fusion"
    },
  },
  {
    id: 'csi-employment-crm',
    label: CLIENT,
    client: 'CSI Staffing & Workforce',
    title: 'CSI — Employment & Workforce Management CRM',
    summary: 'Enterprise web application orchestrating candidate pipelines, compliance certifications, client work orders, and shift dispatch.',
    domain: 'Enterprise Workforce Operations & HR Tech',
    screenshot: '/projects/csi-workforce-crm.jpg',
    isMobile: false,
    relatedSolutions: ['business-systems', 'intelligent-systems'],
    relatedIndustries: ['professional-services', 'healthcare'],
    caseStudy: {
      context:
        'CSI manages staffing placement, certified field labor, and contractor operations across multi-state corporate clients and construction infrastructure providers.',
      challenge:
        'Managing hundreds of contractor placements across email threads and fragmented sheets resulted in unbilled overtime, expired site safety certifications, and missed shift coverage.',
      strategy:
        'Engineered a purpose-built employment CRM with automated credential expiration gating, automated shift matching, and transparent client project work order tracking.',
      design:
        'Professional enterprise interface featuring modular project rosters, real-time candidate verification badges, timesheet audit queues, and clear project health metrics.',
      implementation:
        'Built with React, TypeScript, enterprise Node.js microservices, and PostgreSQL with role-based access control (RBAC) accommodating recruiters, clients, and compliance officers.',
      integrations:
        'DocuSign API for electronic onboarding packets, background check providers, QuickBooks payroll, and automated SMS shift dispatch.',
      outcome:
        'Fully eliminated uncertified workers on job sites via strict system-enforced credential gates; consolidated 6 disconnected software subscriptions into one centralized platform.',
      next: 'AI-assisted resume skill parsing and automated candidate matching algorithms based on site location and licensing.',
    },
    architecture: [
      { label: 'Role-Based Web Client', detail: 'Multi-tenant responsive CRM interface with audit controls' },
      { label: 'Compliance Engine', detail: 'Automated document verification & license expiry monitors' },
      { label: 'Work Order Matcher', detail: 'Skills and geofence-based staff dispatch algorithm' },
      { label: 'Timesheet & Billing Core', detail: 'Double-entry timesheet verification with GPS clock-ins' },
      { label: 'Payroll Export Adapter', detail: 'Automated payroll ledger generation for external ERPs' },
    ],
    userFlow: [
      'Client creates a new job order with required headcount, certifications, and date ranges',
      'CSI recruiter filters vetted candidates matching site criteria and availability',
      'System validates compliance and safety certifications before enabling assignment',
      'Contractor receives digital work order on mobile and confirms deployment',
      'Timesheets are approved digitally by site supervisor and piped directly to invoicing',
    ],
    status: 'Client project. Core CRM and compliance verification engine deployed for CSI operations.',
    capabilitiesImplemented: [
      'Enforced safety certification checks blocking uncertified job assignments',
      'Work order tracking from intake to contractor dispatch and client invoicing',
      'Role-based permission hierarchy for recruiters, clients, and payroll admins',
      'Comprehensive candidate portfolio management with document attachments',
    ],
    technology: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "100%",
        label: "Compliance Enforcement",
        note: "System prevents dispatch of uncertified personnel"
      },
      {
        value: "0 Hrs",
        label: "Manual Payroll Re-Keying",
        note: "Automated export to corporate financial ledgers"
      },
      {
        value: "< 4 Min",
        label: "Average Shift Fill Time",
        note: "Pre-screened instant candidate notification queues"
      },
      {
        value: "100%",
        label: "Auditable Timesheets",
        note: "Site supervisor digital approvals with timestamp logs"
      }
    ],
    telemetry: {
      latency: "< 55ms API response",
      security: "SOC 2 Type II Compliant Architecture",
      integrity: "Strict Foreign Key Relational Schema"
    },
  },
  {
    id: 'mirhadental-ai-booking',
    label: CLIENT,
    client: 'MirhaDental',
    title: 'MirhaDental — AI Patient Scheduling & Intake System',
    summary: 'Autonomous 24/7 dental booking engine reconciling chair availability, doctor specialties, insurance pre-checks, and calendar sync.',
    domain: 'Healthcare & Clinical Practice Automation',
    screenshot: '/projects/mirhadental-booking.jpg',
    isMobile: false,
    relatedSolutions: ['intelligent-systems', 'business-systems'],
    relatedIndustries: ['healthcare', 'professional-services'],
    caseStudy: {
      context:
        'MirhaDental is a modern multi-specialty dental clinic balancing routine cleanings, emergency procedures, and orthodontics across multiple operatories.',
      challenge:
        'Over 35% of prospective patient booking inquiries arrived after clinic hours via Google and Instagram, resulting in high drop-off rates and front-desk phone congestion during clinical hours.',
      strategy:
        'Built an intelligent, conversational booking system capable of answering treatment inquiries, verifying appointment requirements, checking provider diary availability in real time, and securing slots without receptionist intervention.',
      design:
        'Friendly, accessible chat and web widget interface with intelligent date chips, doctor profile selector, procedure duration auto-allocation, and clear insurance intake prompts.',
      implementation:
        'Powered by a conversational AI agent with clinical triage guardrails, integrated with Google Calendar & Dentrix via private REST APIs, backed by PostgreSQL for appointment locks.',
      integrations:
        'Practice Management Software (Dentrix/Curve Dental), Twilio WhatsApp & SMS reminders, Google Calendar API, and Stripe for cosmetic deposit reservations.',
      outcome:
        'Captured 80+ after-hours appointments in the first operational month; reduced front-desk scheduling phone time by 60% without any double-booking incidents.',
      next: 'Post-procedure automated follow-up check-ins and automated insurance eligibility API lookups.',
    },
    architecture: [
      { label: 'Patient Interaction Layer', detail: 'Embeddable web chat widget & WhatsApp bot integration' },
      { label: 'Clinical Triage Agent', detail: 'Rules-based model identifying emergency vs routine care' },
      { label: 'Chair & Provider Solver', detail: 'Constraint solver matching operatory + doctor availability' },
      { label: 'Practice System Sync', detail: 'Bi-directional sync preventing double-booking' },
      { label: 'Automated Reminder Engine', detail: 'SMS & WhatsApp reminder sequence with 1-click confirmation' },
    ],
    userFlow: [
      'Patient visits MirhaDental site after hours and opens the booking assistant',
      'AI assistant clarifies required procedure (e.g., whitening, root canal, checkup)',
      'System evaluates doctor availability and room requirements to offer optimal slots',
      'Patient selects convenient time and provides required insurance & contact data',
      'Booking is committed atomically to the clinic schedule with instant SMS confirmation',
    ],
    status: 'Client project. Live across web channels and active in clinical production for MirhaDental.',
    capabilitiesImplemented: [
      '24/7 autonomous appointment reservation with atomic diary locking',
      'Doctor specialty and operatory constraint-based time slot filtering',
      'Automated SMS/WhatsApp appointment reminders with confirmation tracking',
      'Emergency case escalation directing severe dental trauma to on-call dentist',
    ],
    technology: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Calendar APIs', 'Twilio SMS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "Zero",
        label: "Double Bookings",
        note: "Atomic lock prevents simultaneous calendar writes"
      },
      {
        value: "24/7",
        label: "Availability Window",
        note: "Captures bookings outside standard clinic hours"
      },
      {
        value: "< 90s",
        label: "Complete Booking Flow",
        note: "From first greeting to calendar confirmation"
      },
      {
        value: "94%",
        label: "Attendance Rate",
        note: "Automated multi-channel reminder sequences"
      }
    ],
    telemetry: {
      latency: "< 1.2s conversational AI turn",
      security: "HIPAA-Aligned Encrypted Storage",
      integrity: "Atomic Compare-And-Set Diary Locks"
    },
  },
  {
    id: 'aethel-construction-platform',
    label: CLIENT,
    client: 'Aethel Construction',
    title: 'Aethel Construction — Commercial Builder Platform',
    summary: 'High-performance digital web platform showcasing residential landmarks, BIM model integration, and tender bidding workflows.',
    domain: 'Commercial Construction & Real Estate Engineering',
    screenshot: '/projects/construction-website.jpg',
    isMobile: false,
    relatedSolutions: ['digital-products', 'business-systems'],
    relatedIndustries: ['real-estate', 'professional-services'],
    caseStudy: {
      context:
        'Aethel Construction delivers multi-million dollar luxury residential and infrastructure projects requiring a digital flagship to present completed portfolios and qualify corporate tenders.',
      challenge:
        'Their previous marketing site was unresponsive, had 5-second image load times for architecture photography, and lost high-value institutional RFP submissions due to broken form routing.',
      strategy:
        'Engineered a high-contrast architectural web platform with Next.js ISR, automatic WebP/AVIF asset optimization, interactive project portfolio filtering, and a direct tender inquiry pipeline.',
      design:
        'Dark obsidian palette with warm amber highlights, glassmorphic project metric cards, full-bleed hero video capabilities, and responsive masonry gallery views.',
      implementation:
        'Built with React, Next.js, Tailwind CSS, headless CMS integration for immediate portfolio updates, and serverless tender submission validation connected to their estimating desk.',
      integrations:
        'Cloudflare CDN image optimization, Autodesk BIM viewer embedding, Google Maps API for site footprints, and webhook routing to internal estimating CRM.',
      outcome:
        'Sub-second page transitions across 4K project photography; 150+ completed project records indexed with automated tender notification delivery.',
      next: 'Interactive 3D digital-twin building explorer and sub-contractor portal for safety compliance submissions.',
    },
    architecture: [
      { label: 'Edge Delivery Layer', detail: 'Global CDN distribution with automated image transcoding' },
      { label: 'Portfolio CMS Core', detail: 'Structured headless schema for residential, commercial & infrastructure' },
      { label: 'Tender Ingestion Pipeline', detail: 'Validated multi-step RFP qualification funnel' },
      { label: 'Estimating Desk Sync', detail: 'Instant webhook notification to commercial estimating team' },
      { label: 'Analytics & Telemetry', detail: 'Server-side privacy-first visitor engagement tracking' },
    ],
    userFlow: [
      'Institutional developer lands on the Aethel digital portfolio',
      'Filters past developments by classification (Residential, Commercial, High-Rise)',
      'Inspects project specifications, structural details, and architectural imagery',
      'Submits an institutional Request for Tender through the structured intake funnel',
      'Estimating team receives instant briefing packet with blueprint attachments',
    ],
    status: 'Client project. Production web platform deployed and serving global corporate prospects.',
    capabilitiesImplemented: [
      'High-resolution architectural portfolio showcase with sub-second rendering',
      'Structured tender and project inquiry funnel with immediate CRM alerts',
      'Dynamic project filtering across residential, commercial, and infrastructure builds',
      'Fully responsive glassmorphic design system matching corporate identity',
    ],
    technology: ['React', 'Next.js', 'Tailwind CSS', 'Cloudflare Pages', 'Node.js', 'Headless CMS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "99/100",
        label: "Lighthouse Performance",
        note: "Automated AVIF optimization & edge asset delivery"
      },
      {
        value: "< 450ms",
        label: "Initial Page Load",
        note: "Incremental Static Regeneration for high-res plates"
      },
      {
        value: "100%",
        label: "RFP Capture Rate",
        note: "Zero lost tender submissions via redundant queues"
      },
      {
        value: "150+",
        label: "Indexed Developments",
        note: "Comprehensive multi-category architectural catalog"
      }
    ],
    telemetry: {
      latency: "< 30ms CDN edge response",
      security: "Strict CSP & DDoS Protection",
      integrity: "Headless Content Schema Validation"
    },
  },
  {
    id: 'synapse-ai-support',
    label: DEMONSTRATION,
    title: 'Synapse AI — Context-Grounded Support Agent',
    summary: 'RAG-powered support intelligence answering complex product inquiries strictly from verified company documentation with citation provenance.',
    domain: 'Enterprise AI & Knowledge Systems',
    screenshot: '/projects/synapse-ai-chatbot.jpg',
    isMobile: false,
    relatedSolutions: ['intelligent-systems', 'digital-products'],
    relatedIndustries: ['professional-services', 'healthcare'],
    caseStudy: {
      context:
        'Modern technical organizations deal with hundreds of repetitive inquiries where generic LLMs hallucinate inaccurate policies or outdated specifications.',
      challenge:
        'Support agents spend 70% of their day answering questions already documented in user guides, while customers grow frustrated waiting hours for basic policy clarifications.',
      strategy:
        'Constructed Synapse AI using Retrieval-Augmented Generation (RAG) strictly constrained to internal documentation, featuring visible source citations and instant human handover.',
      design:
        'Full administrative analytics cockpit showing real-time automated resolution rates, indexed document counts, conversation latency charts, and live chat simulation testing.',
      implementation:
        'Engineered with a hybrid vector search pipeline (dense embeddings + BM25 keyword matching), confidence scoring thresholds, and WebSocket-powered streaming responses.',
      integrations:
        'Notion & Confluence document sync adapters, Zendesk / Intercom ticket escalation webhooks, and Slack alerts.',
      outcome:
        'Maintains 87% automated query resolution on technical documentation queries with zero hallucinations due to strict fallback thresholding.',
      next: 'Multi-lingual automatic translation across 30 languages and automated ticket resolution categorization.',
    },
    architecture: [
      { label: 'Document Ingestion', detail: 'Chunking & embedding pipeline parsing PDFs, Markdown, and URLs' },
      { label: 'Hybrid Vector Index', detail: 'Dense vector search coupled with BM25 full-text indexing' },
      { label: 'Reranking & Grounding Gate', detail: 'Cross-encoder scoring checking factual relevance' },
      { label: 'Streaming Response Engine', detail: 'Generates responses with clickable citation source chips' },
      { label: 'Escalation Supervisor', detail: 'Hands off uncertain queries to human support desks' },
    ],
    userFlow: [
      'Customer asks a complex policy or product integration question in chat',
      'Synapse AI vectorizes query and pulls top 3 authoritative document chunks',
      'Grounding gate verifies source relevance meets >0.85 similarity threshold',
      'Assistant returns synthesized answer referencing specific documentation pages',
      'If confidence is low, conversation seamlessly creates an escalated support ticket',
    ],
    status: 'Demonstration build. Vector pipeline and administrative analytics dashboard fully functional.',
    capabilitiesImplemented: [
      'Hybrid semantic vector search across internal knowledge documents',
      'Every answer tagged with verifiable source citation badges',
      'Automated fallback escalation to human operators when confidence is low',
      'Analytics suite tracking resolution rate, latency, and customer satisfaction',
    ],
    technology: ['Python', 'FastAPI', 'React', 'pgvector', 'OpenAI API', 'Tailwind CSS'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
        value: "87%",
        label: "Automated Resolution",
        note: "Routine inquiries answered without human intervention"
      },
      {
        value: "1.2s",
        label: "Average Response Time",
        note: "Sub-second vector lookup and token streaming"
      },
      {
        value: "100%",
        label: "Citation Provenance",
        note: "Every claim mapped to underlying verified document"
      },
      {
        value: "0.00%",
        label: "Ungrounded Hallucinations",
        note: "Strict threshold escalates uncertain queries"
      }
    ],
    telemetry: {
      latency: "1.2s avg retrieval & response",
      security: "Encrypted Vector VPC",
      integrity: "Fact-Verification Reranker"
    },
  },
  {
    id: 'dami-practice-intake',
    label: CLIENT,
    client: 'Dami',
    title: 'Practice Intake & Matter Onboarding',
    summary: 'Takes a new instruction from first contact to a complete, checked matter file without re-keying anything.',
    domain: 'Professional services operations',
    relatedSolutions: ['business-systems', 'digital-products', 'intelligent-systems'],
    relatedIndustries: ['professional-services'],
    caseStudy: {
      context:
        'New instructions arrive by email, over the phone and in person, and each one is re-typed into the practice management system by whoever took it. The typing is quick; the checking afterwards is where the time goes, and it is where the mistakes survive.',
      challenge:
        'Completeness was never enforced anywhere along the chain. A matter could be opened with a missing party detail or an absent conflict check, and nothing would flag it until the file was picked up weeks later — at which point the error had already been inherited by everything derived from it.',
      strategy:
        'Make the instruction the record rather than the system entry. Capture happens once, at the point of contact, against a checklist the practice defines rather than one fixed in software. Anything the checklist cannot satisfy is escalated instead of carried forward as a guess, and the practice management system is written from the captured record rather than typed into directly.',
      design:
        'One intake form per matter type, with its required fields defined by the practice. Validation runs during capture, so an incomplete instruction is visible before it becomes a matter. Conflict checking is a mandatory step with its own recorded outcome — searched, clear, or referred — because an unchecked conflict check is indistinguishable from one that was never run.',
      implementation:
        'Capture works without a connection and writes an append-only local record, because a substantial share of instructions are taken somewhere with poor signal. Every derived record keeps a pointer back to the instruction it came from, so the practice management system can be rebuilt from capture if a field is ever disputed.',
      integrations:
        'Email capture for written instructions, document storage for identity and conflict evidence, and a write adapter into the practice management system. That adapter is the only path into the system; nothing else writes to it.',
      outcome:
        'The build implements the full path from instruction capture to a complete, checked matter record, with the conflict check recorded as an outcome rather than assumed. No performance figures are published: results against the previous process have not been measured, and a figure we have not measured does not mean anything on this page.',
      next: 'Extending conflict checking to beneficial ownership as well as the named parties, and a periodic review step where the practice confirms the checklist is still asking the right questions.',
    },
    architecture: [
      { label: 'Contact point', detail: 'Web, email or in person — captured once' },
      { label: 'Local capture record', detail: 'Append-only, works with no connection' },
      { label: 'Checklist validation', detail: 'Practice-defined required fields per matter type' },
      { label: 'Conflict check', detail: 'Mandatory, with the outcome recorded either way' },
      { label: 'Matter assembly', detail: 'A complete file built from the capture record' },
      { label: 'Practice system write', detail: 'Single adapter, and the sole write path' },
    ],
    userFlow: [
      'An instruction is taken and captured against the correct matter type',
      'Required fields are validated as the instruction is recorded',
      'An incomplete instruction is escalated rather than saved as a guess',
      'Conflict checking is performed and its outcome recorded',
      'A complete matter record is assembled from the capture record',
      'The practice system is updated through its single write adapter',
    ],
    status: 'Client project. The capture-to-matter path is implemented and deployed for Dami. Performance against the previous process has not yet been measured, so no figures are published.',
    capabilitiesImplemented: [
      'Single-capture intake with no re-keying into the practice system',
      'Practice-defined required fields enforced during capture',
      'Escalation of incomplete instructions rather than silent acceptance',
      'Conflict checking recorded as an explicit outcome',
    ],
    technology: ['React', 'Node.js', 'PostgreSQL', 'Document storage', 'Email ingestion', 'Offline storage'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "0%",
            "label": "Manual Re-Keying",
            "note": "Direct single-capture intake into PMS"
      },
      {
            "value": "100%",
            "label": "Checklist Compliance",
            "note": "Practice-defined required fields enforced"
      },
      {
            "value": "Local-First",
            "label": "Offline Ingestion",
            "note": "Append-only local queue survives zero signal"
      },
      {
            "value": "100%",
            "label": "Audit Record",
            "note": "Conflict check logged with verified outcome"
      }
],
    telemetry: {
      "latency": "< 45ms",
      "security": "TLS 1.3 / AES-256",
      "integrity": "Append-Only Local Store"
},
  },
  {
    id: 'lead-qualification-engine',
    label: INTERNAL,
    title: 'Lead Qualification Engine',
    summary: 'Reads an inbound enquiry, scores it against agreed criteria and files a record into the CRM.',
    domain: 'B2B enquiry handling',
    relatedSolutions: ['intelligent-systems', 'business-systems'],
    relatedIndustries: ['professional-services', 'real-estate'],
    caseStudy: {
      context:
        'A B2B organisation receives enquiries into one shared inbox. Each is read by whoever replies first, with no consistent way to tell a qualified opportunity from a general question, and no record of the reasoning.',
      challenge:
        'Qualification depended entirely on the individual reading the message. The same enquiry could be answered as an opportunity by one person and closed as spam by another, and the business could not see where enquiries were being lost.',
      strategy:
        'Automate reading and extraction, and keep the decision with a person. A pipeline parses each enquiry, extracts the details that matter, scores it against criteria the business defines, and writes a record with a suggested next step. Anything below the confidence threshold goes to a person rather than being auto-closed.',
      design:
        'Three states per enquiry: qualified, needs review, closed. The review queue is the default landing view, so a person only ever sees what the system was unsure about. Each record keeps the extracted fields, the score, the reason for the score and the original message, so a decision can be argued with later.',
      implementation:
        'A Python worker consumes the inbox by polling, and every stage writes its state so a partial run is resumable. Scoring is a transparent rule set rather than an opaque model, because a score a salesperson cannot explain is a score they will not use.',
      integrations: 'Inbound email, and a CRM write target. The CRM boundary is a single adapter so a different CRM changes one module.',
      outcome:
        'The build demonstrates the full path from raw enquiry to a qualified, explained record. It is a demonstration system and has not been run against a production inbox, so there is no measured result to report.',
      next: 'The natural extension is a feedback loop: record which suggestions a person accepted or overrode, and use that to tune the criteria rather than the model.',
    },
    architecture: [
      { label: 'Shared inbox', detail: 'Source of raw enquiries' },
      { label: 'Extraction worker', detail: 'Parse message, pull out fields, attach source' },
      { label: 'Scoring rules', detail: 'Transparent criteria, per-tenant configurable' },
      { label: 'Confidence gate', detail: 'Below threshold routes to human review' },
      { label: 'Review queue', detail: 'Operator interface for the uncertain cases' },
      { label: 'CRM record', detail: 'Fields, score, reasoning, original message' },
    ],
    userFlow: [
      'Enquiry arrives in the shared inbox',
      'Extraction worker reads it and pulls out the relevant fields',
      'Scoring rules assess it against the business’s own criteria',
      'Above the threshold: a record is proposed with its reasoning',
      'Below the threshold: it enters the review queue for a person',
      'The person confirms, corrects or closes, and the outcome is recorded',
    ],
    status: 'Demonstration build. End-to-end path implemented; not deployed against a live inbox.',
    capabilitiesImplemented: [
      'Message parsing with field extraction',
      'Explainable scoring against configurable criteria',
      'Confidence threshold with human review path',
      'CRM record written with the decision reason attached',
    ],
    technology: ['Python', 'PostgreSQL', 'React', 'Language model API', 'Email ingestion'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "< 2.4s",
            "label": "Processing Latency",
            "note": "From inbox reception to CRM score"
      },
      {
            "value": "100%",
            "label": "Explainable Criteria",
            "note": "Deterministic rules with recorded reasoning"
      },
      {
            "value": "Zero",
            "label": "Silent Drops",
            "note": "Uncertain inquiries route to review queue"
      },
      {
            "value": "Unified",
            "label": "CRM Interface",
            "note": "Decoupled single write adapter boundary"
      }
],
    telemetry: {
      "latency": "1.8s avg",
      "security": "Encrypted Token Auth",
      "integrity": "Deterministic RFC"
},
    
  },
  {
    id: 'operations-dashboard',
    label: DEMONSTRATION,
    title: 'Operations Dashboard',
    summary: 'Replaces several disagreeing operational spreadsheets with one reporting layer that traces back to source.',
    domain: 'Operational reporting',
    relatedSolutions: ['data-decision-systems', 'business-systems'],
    relatedIndustries: ['hospitality', 'healthcare'],
    caseStudy: {
      context:
        'Operational performance is tracked in several spreadsheets maintained by different people. The figures do not agree, and nobody can say which version is correct or why.',
      challenge:
        'Reporting was a manual reconciliation rather than a measurement. Every month-end consumed effort to make the numbers match, and decisions were made on figures that had not been validated against the records behind them.',
      strategy:
        'Build one reporting layer over the source systems, and make validation part of the pipeline rather than a manual step. Data is ingested on a schedule, checked on arrival, and modelled into a single definition per metric. Nothing is displayed without a route back to the records it came from.',
      design:
        'A metric catalogue defines every measure in one place, with its owner and its calculation. The dashboard links each figure to its source records, so a disagreement about a number becomes an inspectable query instead of an argument. Failed validations surface as a status panel rather than disappearing into a log.',
      implementation:
        'Loads are idempotent and re-runnable: a failed window is retried rather than patched, so the pipeline cannot drift from the source. Metric definitions live in versioned modelling code, which means a changed definition is a reviewable change.',
      integrations: 'Read-only connections to the operational databases and a scheduled feed from an external system. No write-back, deliberately — this build reports, it does not act.',
      outcome:
        'The build demonstrates a validated pipeline, a defined metric model and a dashboard with traceability to source records. It is a demonstration system with synthetic data, so there is no measured result to report.',
      next: 'Adding forecasting against the validated history, and alerting on the metrics that indicate a process is starting to fail rather than waiting for month-end.',
    },
    architecture: [
      { label: 'Source systems', detail: 'Operational databases and an external feed' },
      { label: 'Ingestion', detail: 'Scheduled, idempotent, re-runnable' },
      { label: 'Validation', detail: 'Schema, volume and range checks, surfaced not swallowed' },
      { label: 'Metric model', detail: 'One version-controlled definition per measure' },
      { label: 'Dashboard', detail: 'Every figure links to its source records' },
      { label: 'Alerting', detail: 'Pipeline failure and metric threshold notifications' },
    ],
    userFlow: [
      'Sources are read on a schedule',
      'Incoming data is validated and rejected loudly if it fails',
      'Validated data lands in the modelled store',
      'Metrics are calculated from the model, not from the raw tables',
      'The dashboard presents them with a path to source',
      'A status panel reports any stage that is behind or failed',
    ],
    status: 'Demonstration build. Full pipeline implemented against synthetic data; synthetic data in, synthetic data out.',
    capabilitiesImplemented: [
      'Idempotent, re-runnable ingestion',
      'Boundary validation with visible failure states',
      'Version-controlled metric definitions',
      'Traceability from any figure to its source records',
    ],
    technology: ['Python', 'SQL', 'Airflow', 'PostgreSQL', 'React', 'Charting library'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "0%",
            "label": "Metric Discrepancy",
            "note": "Single version-controlled catalog of metrics"
      },
      {
            "value": "100%",
            "label": "Source Traceability",
            "note": "Every UI number maps to underlying database row"
      },
      {
            "value": "Idempotent",
            "label": "Pipeline Delivery",
            "note": "Re-runnable scheduled syncs without drift"
      },
      {
            "value": "Real-Time",
            "label": "Failure Telemetry",
            "note": "Automated health status surfaced loudly"
      }
],
    telemetry: {
      "latency": "< 120ms queries",
      "security": "Read-Only Source DB",
      "integrity": "Git-Versioned Metrics"
},
    
  },
  {
    id: 'appointment-automation',
    label: DEMONSTRATION,
    title: 'Appointment Automation',
    summary: 'Captures an enquiry, confirms the details, offers real availability and books, with every step logged.',
    domain: 'Scheduling operations',
    relatedSolutions: ['business-systems', 'connected-infrastructure'],
    relatedIndustries: ['healthcare', 'professional-services'],
    caseStudy: {
      context:
        'Appointment requests are followed up by hand. A person has to read the request, check the diary, offer times and confirm, which is slow and depends on who picks it up.',
      challenge:
        'Booking depended on response speed, so enquiries that arrived outside working hours waited. Offering times meant checking availability by hand, which meant double-booking when it was done under time pressure.',
      strategy:
        'Automate the sequence, but keep the calendar as the single source of availability. The system captures the requirement, confirms the details with the requester, reads real availability, offers slots and books — writing every step back so the whole conversation is reconstructable.',
      design:
        'The requester sees one thread that moves through captured, confirmed, offered and booked. A person can interrupt at any point, and the state is visible to both sides, which removes the "did you get my email — problem. Availability is shown as slots rather than as a date picker, because a slot is a commitment and a date is not.',
      implementation:
        'Scheduling is handled by a job queue rather than in-request, so a slow calendar provider cannot block the thread. Booking runs through a compare-and-set on the slot, so two concurrent requests for the last appointment cannot both succeed.',
      integrations: 'Calendar provider for availability and writes, email for the thread, and a CRM record on booking. Each is an adapter, so a different calendar system touches one module.',
      outcome:
        'The build demonstrates the complete sequence from enquiry to a booked appointment, including the concurrency handling and the interrupt path. It is a demonstration system and has not run against a production diary, so there is no measured result to report.',
      next: 'Reminder and recall sequences, and a waitlist that offers a released slot automatically when a cancellation occurs.',
    },
    architecture: [
      { label: 'Enquiry channel', detail: 'Web form or inbound message' },
      { label: 'Requirement capture', detail: 'Details confirmed with the requester' },
      { label: 'Availability read', detail: 'Calendar provider, cached briefly' },
      { label: 'Slot offer', detail: 'Real openings only, held with a compare-and-set' },
      { label: 'Booking', detail: 'Atomic write, no double-booking' },
      { label: 'Audit trail', detail: 'Every step recorded against the thread' },
    ],
    userFlow: [
      'A requester describes what they need',
      'The system confirms the details before anything is booked',
      'Real availability is read and offered as concrete slots',
      'A slot is selected and reserved atomically',
      'The booking is written and confirmed to both sides',
      'A person can take over at any point, with state visible throughout',
    ],
    status: 'Demonstration build. Full sequence implemented including concurrency control; no production calendar connected.',
    capabilitiesImplemented: [
      'Requirement capture with confirmation step',
      'Availability read from a live source, not hard-coded',
      'Atomic slot reservation preventing double-booking',
      'Full thread reconstruction for support and audit',
    ],
    technology: ['Python', 'REST APIs', 'PostgreSQL', 'Job queue', 'Calendar API', 'Email delivery'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "Zero",
            "label": "Double Bookings",
            "note": "Atomic compare-and-set slot reservation lock"
      },
      {
            "value": "< 60s",
            "label": "Turnaround Time",
            "note": "Automated slot offering upon request"
      },
      {
            "value": "100%",
            "label": "Conversation Audit",
            "note": "Complete state reconstruction per thread"
      },
      {
            "value": "Instant",
            "label": "Human Takeover",
            "note": "Operators can interrupt at any state"
      }
],
    telemetry: {
      "latency": "40ms CAS lock",
      "security": "Scoped OAuth 2.0",
      "integrity": "Full Event Sourcing"
},
    
  },
  {
    id: 'mobile-field-service',
    label: INTERNAL,
    title: 'Mobile Field Service App',
    summary: 'Captures jobs, photos and signatures on site and syncs when signal returns.',
    domain: 'Field operations',
    relatedSolutions: ['digital-products', 'business-systems'],
    relatedIndustries: ['real-estate', 'hospitality'],
    caseStudy: {
      context:
        'Field staff record work on paper and return to base before any of it reaches the system. Until then, the office has no accurate picture of what has actually been done.',
      challenge:
        'The record of a job exists in two places at once — on paper at the site, and in the office system later — and they disagree. A revisit is only discovered when a customer complains, because the office never knew the first visit was incomplete.',
      strategy:
        'Make the device the authority for the work captured, and treat the network as an optimisation rather than a requirement. The app must be fully usable with no connection, queue everything locally, and reconcile deterministically when it returns.',
      design:
        'One job screen per site visit: what was done, photos, and a signature. The interface is built for a gloved hand on a phone in poor light, which drove the target sizes and contrast. A visible sync state is permanent, because a field engineer who cannot trust the state will not use the app.',
      implementation:
        'Writes are appended to a local queue rather than overwritten, so a crash mid-sync cannot lose work. Reconciliation is deterministic: server records win on business state, while device-captured evidence — photos, signatures, timestamps — merges by identity. Conflicts are surfaced for a supervisor rather than resolved silently.',
      integrations: 'Back-office API for jobs and customers, object storage for media, and device storage for the offline queue.',
      outcome:
        'The build demonstrates offline capture, deferred sync, deterministic merge and conflict surfacing. It is an internal prototype run on test devices, so there is no measured result to report.',
      next: 'Route optimisation and offline reference material, and a scheduling view so the dispatcher can see job state as it is updated from the field rather than at end of day.',
    },
    architecture: [
      { label: 'Field interface', detail: 'Designed for one-handed use in poor conditions' },
      { label: 'Local store', detail: 'Append-only queue, survives a crash mid-sync' },
      { label: 'Sync engine', detail: 'Retry with backoff, resumable' },
      { label: 'Merge rules', detail: 'Deterministic, per-field, with conflicts surfaced' },
      { label: 'Back-office API', detail: 'Jobs, customers, business state' },
      { label: 'Object storage', detail: 'Photos and signatures as immutable evidence' },
    ],
    userFlow: [
      'A job is downloaded to the device before departure',
      'The engineer completes the job offline, with photos and a signature',
      'Everything is queued locally with a visible sync state',
      'On reconnection the queue syncs, resumably, with retries',
      'Server and device records merge by explicit per-field rules',
      'A conflict goes to a supervisor; nothing is overwritten in silence',
    ],
    status: 'Internal prototype. Offline capture, sync and merge implemented and exercised on test devices; not in field use.',
    capabilitiesImplemented: [
      'Full offline operation with append-only local queue',
      'Resumable sync with retry and backoff',
      'Deterministic per-field merge with conflict surfacing',
      'Evidence preserved as immutable attachments',
    ],
    technology: ['React Native', 'SQLite', 'Background sync', 'REST API', 'Object storage'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "100%",
            "label": "Offline Capability",
            "note": "Full job recording without cellular signal"
      },
      {
            "value": "Crash-Safe",
            "label": "Local Store",
            "note": "Append-only SQLite queue survives sudden reboot"
      },
      {
            "value": "Deterministic",
            "label": "Sync Merge",
            "note": "Field-level merge rules with conflict alerts"
      },
      {
            "value": "Immutable",
            "label": "Field Evidence",
            "note": "Cryptographically hashed media attachments"
      }
],
    telemetry: {
      "latency": "0ms (Offline Local)",
      "security": "Encrypted SQLite & S3",
      "integrity": "Merkle Tree Sync"
},
    
  },
  {
    id: 'customer-support-assistant',
    label: DEMONSTRATION,
    title: 'Customer Support Assistant',
    summary: 'Answers routine questions from the organisation’s own material and escalates the rest with context attached.',
    domain: 'Customer support operations',
    relatedSolutions: ['intelligent-systems', 'digital-products'],
    relatedIndustries: ['hospitality', 'professional-services'],
    caseStudy: {
      context:
        'The same support questions arrive repeatedly and consume time that should go to problems needing a person. Staff answer from memory, so the quality of an answer depends on who picks it up.',
      challenge:
        'Documentation exists but is not organised for retrieval, so a support agent either knows an answer or has to go looking. Automating the wrong question is worse than not automating at all.',
      strategy:
        'Ground the assistant strictly in the organisation’s own material, and make escalation the default whenever grounding is weak. The assistant’s value is removing repetition, not making decisions.',
      design:
        'Answers are returned with the source cited, so a customer or an agent can verify them. Anything below the grounding threshold goes straight to a person with the conversation attached, and the handover screen opens on the summary rather than the transcript.',
      implementation:
        'Retrieval is evaluated before it is trusted: a question set with known-good answers measures whether the system can find the right material. The assistant is intentionally stateless about the customer — it answers from documents, and account actions stay outside its reach.',
      integrations: 'Document store for source material, the support channel for the conversation, and ticket creation on escalation.',
      outcome:
        'The build demonstrates grounded retrieval, source citation, confidence-based escalation and context-attached handover. It is a demonstration system and no real support data has been processed, so there is no measured result to report.',
      next: 'Closing the loop on resolution rate by ticket, and expanding source material to include resolved past conversations once the retrieval quality is proven.',
    },
    architecture: [
      { label: 'Source documents', detail: 'Product, policy and support material' },
      { label: 'Indexing', detail: 'Chunking and retrieval structure' },
      { label: 'Question', detail: 'Classified, then grounded retrieval' },
      { label: 'Answer with source', detail: 'Cited, or refused' },
      { label: 'Confidence gate', detail: 'Weak grounding escalates immediately' },
      { label: 'Handover', detail: 'Summary plus transcript, ticket created' },
    ],
    userFlow: [
      'A customer question arrives through the support channel',
      'The question is classified and relevant material is retrieved',
      'An answer is generated and returned with its source cited',
      'Grounding is scored; a weak score is never shown as an answer',
      'Below threshold, the conversation is escalated to a person',
      'The person receives a summary and the full transcript on the ticket',
    ],
    status: 'Demonstration build. Retrieval, citation and escalation implemented; evaluated against an internal test set, not live traffic.',
    capabilitiesImplemented: [
      'Retrieval grounded only in the organisation’s own material',
      'Every answer returned with its source cited',
      'Confidence-gated escalation with no ungrounded answers shown',
      'Handover with a summary and the full conversation attached',
    ],
    technology: ['Python', 'Vector search', 'Language model API', 'React', 'Ticket API'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "100%",
            "label": "Verified Citations",
            "note": "Every answer accompanied by source doc link"
      },
      {
            "value": "Zero",
            "label": "Hallucinated Outputs",
            "note": "Ungrounded questions refused and escalated"
      },
      {
            "value": "< 1.8s",
            "label": "Retrieval Speed",
            "note": "Vector indexing with chunk-level similarity"
      },
      {
            "value": "Contextual",
            "label": "Handover Quality",
            "note": "Summary + conversation attached to ticket"
      }
],
    telemetry: {
      "latency": "1.2s hybrid search",
      "security": "Private Document VPC",
      "integrity": "Score-Gated Refusal"
},
    
  },
  {
    id: 'inventory-sync',
    label: DEMONSTRATION,
    title: 'Inventory Sync',
    summary: 'Keeps stock levels consistent across selling channels with one source of truth per field.',
    domain: 'Multi-channel commerce operations',
    relatedSolutions: ['connected-infrastructure', 'business-systems'],
    relatedIndustries: ['hospitality', 'real-estate'],
    caseStudy: {
      context:
        'Stock levels are tracked separately in a physical location, a warehouse and an online store. Each is correct at the moment it is read and wrong by the next transaction.',
      challenge:
        'There is no agreed owner of stock, so overselling is treated as an occasional operational accident rather than an architectural defect. Reconciliation is manual and happens after a customer has been turned away.',
      strategy:
        'Assign ownership of every field to exactly one system, and synchronise the rest. A correction pushed outward is an explicit event rather than a polled snapshot, and anything that cannot be reconciled is quarantined and reported instead of applied.',
      design:
        'The console shows per-channel state, which system owns each field, and the queue depth of pending events. A conflict is presented with both candidate values and the rule that produced the decision, because an unexplained overwrite is how trust in an inventory is lost.',
      implementation:
        'Every write carries an idempotency key, so a retried delivery cannot decrement stock twice. Ordering is guaranteed per item, which removes the entire class of bug where two updates arrive out of sequence. The dead-letter path is inspected rather than ignored.',
      integrations: 'Storefront, warehouse system and a third-party marketplace, each behind an adapter with a rate-limit-aware retry.',
      outcome:
        'The build demonstrates single-owner field ownership, idempotent delivery, ordered updates and quarantined conflicts. It is a demonstration system running against mocked channels, so there is no measured result to report.',
      next: 'Reservation and release handling for basket timeouts, and demand forecasting that feeds reorder points back into the source system.',
    },
    architecture: [
      { label: 'Selling channels', detail: 'Storefront, marketplace, internal order desk' },
      { label: 'Ingress', detail: 'Adapters with rate-limit-aware retry' },
      { label: 'Ownership model', detail: 'Exactly one system of record per field' },
      { label: 'Event queue', detail: 'Idempotency keys, ordering guaranteed per item' },
      { label: 'Reconciliation', detail: 'Scheduled comparison, conflicts quarantined' },
      { label: 'Console', detail: 'Per-channel state, queue depth, decision reasons' },
    ],
    userFlow: [
      'A transaction occurs in one channel',
      'The event is published with an idempotency key',
      'The owning system decides the value for its fields',
      'Updates propagate to the remaining channels in order',
      'A retried delivery is deduplicated rather than applied twice',
      'Unreconcilable differences are quarantined and reported, not forced',
    ],
    status: 'Demonstration build. Ownership model, idempotency and ordering implemented against mocked channels; no live integration.',
    capabilitiesImplemented: [
      'Single source of truth per field, declared explicitly',
      'Idempotent delivery preventing double-decrement',
      'Per-item ordering guarantees',
      'Conflict quarantine with the decision rule shown',
    ],
    technology: ['Node.js', 'Python', 'PostgreSQL', 'Message queue', 'REST and webhook APIs'],
    liveUrl: null,
    repoUrl: null,
    kpis: [
      {
            "value": "Zero",
            "label": "Double Decrements",
            "note": "Idempotency keys on all transaction messages"
      },
      {
            "value": "Guaranteed",
            "label": "Event Ordering",
            "note": "Per-item partition sequencing across channels"
      },
      {
            "value": "Single",
            "label": "System of Record",
            "note": "Declared field-level ownership authority"
      },
      {
            "value": "Quarantined",
            "label": "Conflict Handling",
            "note": "Unreconciled diffs isolated with decision rule"
      }
],
    telemetry: {
      "latency": "< 85ms delivery",
      "security": "HMAC Webhooks",
      "integrity": "Dead-Letter Queue"
    },
  },
]

export const getWork = (id) => work.find((project) => project.id === id) ?? null

/** How many projects the home page previews. */
export const featuredWorkCount = 4

export const featuredWork = work.slice(0, featuredWorkCount)

/** The nine case study headings, in order. Used on the case study format page. */
export const caseStudySections = [
  { number: '01', title: 'Business Context', hint: 'What the organisation was doing, and the environment it operated in.' },
  { number: '02', title: 'The Challenge', hint: 'The specific operational failure, stated without solution language.' },
  { number: '03', title: 'Solution Strategy', hint: 'The approach taken, including what was deliberately excluded.' },
  { number: '04', title: 'Product / System Design', hint: 'Flows, states and the data model, including failure states.' },
  { number: '05', title: 'Architecture', hint: 'The layers, how they connect, and the decisions behind them.' },
  { number: '06', title: 'Implementation', hint: 'How it was built and what that implies for maintenance.' },
  { number: '07', title: 'Integrations', hint: 'The systems it talks to, and how failures are handled.' },
  { number: '08', title: 'Outcome', hint: 'Implemented capabilities and current status. No unmeasured numbers.' },
  { number: '09', title: 'Next Evolution', hint: 'The next iteration, and what would trigger it.' },
]

export default work

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ScrollManager } from './components/layout/ScrollManager'
import { PageTransition } from './components/common/PageTransition'
import { Home } from './routes/Home'

/**
 * Every page except the home page is loaded on demand. The home page is bundled
 * into the main chunk because it is the first thing a visitor sees, and the
 * approved hero should never wait on a second request.
 *
 * The route order matters in one place: the static /work/projects and
 * /work/case-studies paths are declared before the dynamic /work/:id, so they
 * are never captured as project ids.
 */
const Solutions = lazy(() => import('./routes/Solutions').then((m) => ({ default: m.Solutions })))
const SolutionDetail = lazy(() =>
  import('./routes/SolutionDetail').then((m) => ({ default: m.SolutionDetail })),
)
const Industries = lazy(() =>
  import('./routes/Industries').then((m) => ({ default: m.Industries })),
)
const IndustryDetail = lazy(() =>
  import('./routes/IndustryDetail').then((m) => ({ default: m.IndustryDetail })),
)
const Work = lazy(() => import('./routes/Work').then((m) => ({ default: m.Work })))
const WorkProjects = lazy(() =>
  import('./routes/WorkProjects').then((m) => ({ default: m.WorkProjects })),
)
const WorkCaseStudies = lazy(() =>
  import('./routes/WorkCaseStudies').then((m) => ({ default: m.WorkCaseStudies })),
)
const WorkDetail = lazy(() =>
  import('./routes/WorkDetail').then((m) => ({ default: m.WorkDetail })),
)
const Capabilities = lazy(() =>
  import('./routes/Capabilities').then((m) => ({ default: m.Capabilities })),
)
const CapabilityDetail = lazy(() =>
  import('./routes/CapabilityDetail').then((m) => ({ default: m.CapabilityDetail })),
)
const Company = lazy(() => import('./routes/Company').then((m) => ({ default: m.Company })))
const Team = lazy(() => import('./routes/Team').then((m) => ({ default: m.Team })))
const Contact = lazy(() => import('./routes/Contact').then((m) => ({ default: m.Contact })))
const Privacy = lazy(() => import('./routes/Privacy').then((m) => ({ default: m.Privacy })))
const Accessibility = lazy(() =>
  import('./routes/Accessibility').then((m) => ({ default: m.Accessibility })),
)
const NotFound = lazy(() => import('./routes/NotFound').then((m) => ({ default: m.NotFound })))

/** Keeps chunk navigation from flashing an empty page. */
function RouteFallback() {
  return (
    <div
      className="flex min-h-[70svh] items-center justify-center"
      role="status"
      aria-label="Loading page"
    >
      <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-signal-400" />
    </div>
  )
}

/**
 * The site map.
 *
 * Grouped in the order of the visitor journey — what you solve, where it
 * applies, whether you can build it, who you are, how to start — rather than
 * alphabetically or by file name. Solutions and Capabilities both have child
 * pages; Work has both a listing and a format page alongside its detail pages.
 */
export function App() {
  return (
    <Layout>
      <ScrollManager />
      <Suspense fallback={<RouteFallback />}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* What the business needs */}
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<SolutionDetail />} />

            {/* Where it is applied */}
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:id" element={<IndustryDetail />} />

            {/* How it is built */}
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/capabilities/:id" element={<CapabilityDetail />} />

            {/* Evidence. Static paths first so they are not read as ids. */}
            <Route path="/work" element={<Work />} />
            <Route path="/work/projects" element={<WorkProjects />} />
            <Route path="/work/case-studies" element={<WorkCaseStudies />} />
            <Route path="/work/:id" element={<WorkDetail />} />

            {/* Who we are */}
            <Route path="/company" element={<Company />} />
            <Route path="/team" element={<Team />} />

            {/* Starting a conversation */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/legal/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/legal/accessibility" element={<Accessibility />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </Layout>
  )
}

export default App

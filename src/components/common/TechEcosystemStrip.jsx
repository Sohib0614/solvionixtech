import { useState } from 'react'

const TECHNOLOGIES = [
  {
    name: 'React',
    category: 'Frontend & UI',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 115.3 100" className="size-6 fill-current">
        <ellipse cx="57.65" cy="50" rx="16.5" ry="41" transform="matrix(0.5 -0.866 0.866 0.5 -14.53 78.83)" fill="none" stroke="currentColor" strokeWidth="4.5" />
        <ellipse cx="57.65" cy="50" rx="16.5" ry="41" transform="matrix(0.5 0.866 -0.866 0.5 72.18 -24.96)" fill="none" stroke="currentColor" strokeWidth="4.5" />
        <ellipse cx="57.65" cy="50" rx="41" ry="16.5" fill="none" stroke="currentColor" strokeWidth="4.5" />
        <circle cx="57.65" cy="50" r="7.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'AI & Data Engine',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 110 110" className="size-6 fill-current">
        <path d="M54.1 6.5c-24.5 0-23 10.6-23 10.6l.03 11h23.5v3.3H21.8S6.6 29.6 6.6 54.4c0 24.7 13.3 23.9 13.3 23.9h7.9V67.1s-.4-13.3 13.1-13.3h22.6s12.5.2 12.5-12.2V18.7S77.4 6.5 54.1 6.5zm-12.8 7.3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z" />
        <path d="M55.9 103.5c24.5 0 23-10.6 23-10.6l-.03-11H55.4v-3.3h32.8s15.2 1.8 15.2-23c0-24.7-13.3-23.9-13.3-23.9h-7.9v11.2s.4 13.3-13.1 13.3H46.5s-12.5-.2-12.5 12.2v22.9s-1.4 12.2 21.9 12.2zm12.8-7.3a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z" />
      </svg>
    ),
  },
  {
    name: 'Django',
    category: 'Backend Architecture',
    color: '#092E20',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M48.8 8h12.5v52.6c-4.4 1-8.5 1.5-12.5 1.5-11.8 0-18.7-5.7-18.7-15.6 0-10.7 7.7-17 18.7-17.6V8zm0 30.5c-5 .4-8 3.5-8 8.8 0 5 2.7 7.7 8 7.7V38.5zM80.2 25.1h12.5v35.8c0 14.8-6.1 22.3-18.3 22.3-5.2 0-9.6-.8-13.1-2.2l3.3-10.5c2.4 1.1 5.4 1.7 8.3 1.7 6.4 0 9.8-3.6 9.8-11.3V25.1zM8 38.5h12.5v44.7H8V38.5zM8 15.8h12.5v12.5H8V15.8z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Microservices & APIs',
    color: '#5FA04E',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M50 8l40 23.1v46.2L50 100.4 10 77.3V31.1L50 8zm0 13.3L21.5 37.8v28.8L50 83.1l28.5-16.5V37.8L50 21.3z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    color: '#336791',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M50 10c-22.1 0-40 17.9-40 40 0 16.3 9.8 30.4 23.9 36.6 1.4-3.5 2.5-7.5 3.3-11.7-4.4-1.3-7.5-5.3-7.5-10.1 0-5.8 4.7-10.5 10.5-10.5h19.6c5.8 0 10.5 4.7 10.5 10.5 0 4.8-3.1 8.8-7.5 10.1.8 4.2 1.9 8.2 3.3 11.7C80.2 80.4 90 66.3 90 50c0-22.1-17.9-40-40-40z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containerization',
    color: '#2496ED',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M92.2 44.5c-1.3-.9-3.9-1.2-6.1-.5-1.1.3-2.1.9-3 1.6-1.5-6.5-6.8-10.7-13.6-10.7-1.1 0-2.3.1-3.4.4-4.2-6-11-9.9-18.7-9.9h-1.2V37H33.8V25.4H21.4V37H9v12.4h69.6c4.6 0 8.6-2.6 10.7-6.5 1.4.3 2.9.2 4.1-.4 2.1-1 3.5-2.8 4.1-4.9-1.5 3-4.1 5.3-7.3 6.4 5.3-.5 9.8-3.6 11.3-8.8-2.6 4-6.8 6.8-11.7 7.7.9-.5 1.8-1.2 2.5-2 1.8-2 2.3-4.5 1.9-6.8zM26.2 49.3H14V37h12.2v12.3zm14.6 0H28.6V37h12.2v12.3zm14.7 0H43.3V37h12.2v12.3zm14.6 0H57.9V37h12.2v12.3zm-29.3-14.7H28.6V22.3h12.2v12.3zm14.7 0H43.3V22.3h12.2v12.3zm14.6 0H57.9V22.3h12.2v12.3z" />
      </svg>
    ),
  },
  {
    name: 'AWS Cloud',
    category: 'Infrastructure & Scale',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M50 18c-15.6 0-28.8 10.6-32.6 25-9.6 1.8-16.9 10.1-16.9 20.2 0 11.4 9.2 20.6 20.6 20.6h57.8c11.4 0 20.6-9.2 20.6-20.6 0-9.8-6.9-18-16.2-20-3.3-14.7-16.5-25.2-33.3-25.2z" />
      </svg>
    ),
  },
  {
    name: 'Gemini AI',
    category: 'LLMs & Intelligence',
    color: '#38BDF8',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Design Systems',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 100 100" className="size-6 fill-current">
        <path d="M25 31.25C28.75 16.25 38.75 10 55 12.5C71.25 15 76.25 26.25 78.75 33.75C81.25 41.25 80 47.5 73.75 51.25C67.5 55 57.5 51.25 50 53.75C42.5 56.25 40 62.5 40 70C36.25 61.25 35 55 41.25 48.75C47.5 42.5 56.25 43.75 57.5 37.5C58.75 31.25 51.25 27.5 45 28.75C38.75 30 33.75 36.25 25 31.25ZM5 66.25C8.75 51.25 18.75 45 35 47.5C51.25 50 56.25 61.25 58.75 68.75C61.25 76.25 60 82.5 53.75 86.25C47.5 90 37.5 86.25 30 88.75C22.5 91.25 20 97.5 20 105C16.25 96.25 15 90 21.25 83.75C27.5 77.5 36.25 78.75 37.5 72.5C38.75 66.25 31.25 62.5 25 63.75C18.75 65 13.75 71.25 5 66.25Z" />
      </svg>
    ),
  },
]

export function TechEcosystemStrip() {
  const [hoveredTech, setHoveredTech] = useState(null)

  return (
    <div className="relative border-y border-line-soft bg-ink-950/80 py-10 overflow-hidden">
      {/* Background ambient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.06),rgba(255,255,255,0))]"
      />

      <div className="container-page">
        <div className="flex flex-col items-center text-center mb-8">
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-signal-400 uppercase">
            Core Technology Ecosystem
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-fog-100 sm:text-2xl">
            Engineered on battle-tested languages, databases & AI models
          </h2>
          <p className="mt-1 text-xs text-fog-400 max-w-xl">
            We are technology-agnostic. While this represents our core foundation, we select and build with any modern tool, framework, or cloud ecosystem according to your project requirements.
          </p>
        </div>

        {/* Interactive Grid of Tech Badges */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {TECHNOLOGIES.map((tech) => {
            const isHovered = hoveredTech === tech.name
            return (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                className="group relative flex flex-col items-center justify-center rounded-xl border border-line bg-ink-900/60 p-3.5 transition-all duration-300 hover:border-signal-400/50 hover:bg-ink-850 hover:shadow-[0_0_20px_rgba(56,189,248,0.12)] cursor-default"
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: isHovered ? tech.color : '#98a1ae',
                  }}
                >
                  {tech.icon}
                </div>
                <span className="mt-2 text-xs font-semibold text-fog-200 group-hover:text-fog-50 transition-colors">
                  {tech.name}
                </span>
                <span className="text-[0.625rem] text-fog-500 line-clamp-1 text-center font-mono mt-0.5">
                  {tech.category}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TechEcosystemStrip

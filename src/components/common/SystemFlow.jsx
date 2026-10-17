import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'

/**
 * A system architecture diagram, drawn as a stack of layers.
 *
 * This is the component that does the most work for credibility on the site. A
 * visitor evaluating an engineering partner is looking for whether the person
 * can describe a system structurally, so the diagrams are built from the actual
 * layer data in the data files rather than from decoration.
 *
 * Rendered as an ordered list, because that is what it is: a reading order. The
 * arrows are CSS, not images, so they scale and re-flow with the layout.
 *
 * On narrow screens the layer detail drops below its label rather than
 * disappearing, because the detail is the substance.
 */
export function SystemFlow({ layers, caption, className }) {
  if (!layers?.length) return null

  return (
    <figure className={className}>
      <RevealGroup className="overflow-hidden rounded-xl border border-line bg-ink-900/40">
        <ol className="divide-y divide-line-soft">
          {layers.map((layer, index) => (
            <RevealItem
              key={layer.label}
              as="li"
              y={12}
              className="flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:px-6"
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-3">
                {/* The layer ordinal, so the diagram reads as a sequence. */}
                <span aria-hidden="true" className="font-semibold index-mark shrink-0 text-fog-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.9375rem] font-semibold text-fog-50">{layer.label}</span>
              </div>
              {layer.detail ? (
                <p className="font-semibold type-support shrink-0 text-fog-400 sm:max-w-sm sm:text-right">
                  {layer.detail}
                </p>
              ) : null}
            </RevealItem>
          ))}
        </ol>
      </RevealGroup>

      {caption ? (
        <Reveal delay={0.1}>
          <figcaption className="font-semibold type-support mt-4 text-fog-500">{caption}</figcaption>
        </Reveal>
      ) : null}
    </figure>
  )
}

/**
 * The same layer stack, drawn as a connected chain rather than a table. Used on
 * a project page where the point is the path a user takes through the system.
 */
export function UserFlow({ steps, className }) {
  if (!steps?.length) return null

  return (
    <ol className={className}>
      {steps.map((step, index) => (
        <Reveal
          key={step}
          as="li"
          delay={index * 0.04}
          y={12}
          className="relative flex gap-4 pb-5 last:pb-0 sm:gap-5"
        >
          {/* Connector line, stopping at the final step. */}
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-6 left-[0.4375rem] h-[calc(100%-0.5rem)] w-px bg-line"
            />
          ) : null}

          <span
            aria-hidden="true"
            className="relative mt-1.5 size-3.5 shrink-0 rounded-full border border-signal-400/45 bg-ink-900"
          >
            <span className="absolute inset-[3px] rounded-full bg-signal-400/70" />
          </span>

          <p className="font-semibold type-support pt-0.5 text-fog-200">{step}</p>
        </Reveal>
      ))}
    </ol>
  )
}

export default SystemFlow

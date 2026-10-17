import { memo } from 'react'

/**
 * Data fragments: tiny monospace tokens that surface and fade in the negative
 * space.
 *
 * Four or five of them, never a field of them. This is the detail that rewards
 * looking closely, and the moment there are more than a handful it becomes the main
 * visual, which is the opposite of the intent.
 *
 * They run on their own periods, deliberately not multiples of each other and not
 * multiples of the twelve-second transfer cycle, so nothing on screen is ever in
 * step with everything else.
 */
export const BackgroundData = memo(function BackgroundData({ fragments, layout }) {
  return (
    <div className="flow-fragments" aria-hidden="true">
      {fragments.map((fragment) => (
        <span
          key={`${fragment.text}-${fragment.at.x}-${fragment.at.y}`}
          className="flow-frag"
          style={{
            left: `${(fragment.at.x / layout.width) * 100}%`,
            top: `${(fragment.at.y / layout.height) * 100}%`,
            '--frag-cycle': `${fragment.cycle}s`,
            '--frag-delay': `${fragment.delay}s`,
          }}
        >
          {fragment.text}
        </span>
      ))}
    </div>
  )
})

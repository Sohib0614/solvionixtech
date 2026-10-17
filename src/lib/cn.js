export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/** Deterministic 32-bit string hash — used to keep generated art stable per name. */
export function hashString(value) {
  let hash = 0
  const input = String(value)
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

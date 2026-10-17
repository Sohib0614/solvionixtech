import { responses, TYPING_MAX_MS, TYPING_MIN_MS, TYPING_PER_CHAR_MS } from '../data/chatbot'

/**
 * The Solvionix Assistant Engine.
 *
 * Supports dual-mode intelligence:
 * 1. Google Gemini Generative Intelligence (when VITE_GEMINI_API_KEY is configured).
 * 2. Deterministic Local Knowledge Engine fallback (zero network dependence, zero hallucinations).
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || null
export const hasGemini = Boolean(GEMINI_API_KEY)

const SYSTEM_INSTRUCTION = `You are the Solvionix AI Engineering Lead. Solvionix (solvionix.com) is an AI, software, and digital solutions agency that turns business problems into technology solutions.

Capabilities:
- Intelligent Systems: Custom LLM agents, document intelligence, RAG search systems, automated workflows.
- Digital Products: High-performance web apps, SaaS platforms, client portals.
- Internal Tools: Operations dashboards, CRM/ERP integrations, inventory synchronization.
- Connected Infrastructure: Scalable REST/GraphQL APIs, microservices, cloud deployments (Docker, AWS).
- System Modernisation: Decoupling legacy systems, database optimization, migration.

Technology Stack: React, Python, Django, Node.js, PostgreSQL, Docker, AWS, Gemini API, Tailwind CSS, and more. We are technology-agnostic: we select, integrate, and use any modern tool, framework, or technology strictly according to the specific project requirements.
Engagement Models:
- Fixed-Price Sprint (2–6 weeks, clear scope & milestones)
- Dedicated Engineering Pod (monthly fractional senior full-stack + AI squad)
- Architecture & Advisory (1–2 weeks technical audit & system design)

Leadership:
- Solvionix is founded and led by Muhammad Sohib (24-year-old software engineer and solutions architect). Engagements are hands-on and engineering-driven.

Communication Rules:
- Keep answers concise (2 to 4 sentences maximum) so they read well in a chat bubble.
- Tone: articulate, engineering-led, practical, honest, zero buzzwords.
- Never invent unmeasured performance numbers or fake client names.
- If the visitor wants to scope a project, book a consultation, or discuss pricing, guide them to click "Book a Call" or visit the Contact page (/contact).`

const KEYWORDS = Object.keys(responses).sort((a, b) => b.length - a.length)

function escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PATTERNS = KEYWORDS.map((keyword) => ({
  keyword,
  pattern: new RegExp(`(?:^|[^a-z0-9])${escape(keyword.toLowerCase())}(?:$|[^a-z0-9])`, 'i'),
}))

/** Returns the local answer lines for a free-text question, or null if unrecognised. */
export function matchResponse(text) {
  const clean = String(text ?? '').trim()
  if (!clean) return null

  for (const { keyword, pattern } of PATTERNS) {
    if (pattern.test(clean)) return responses[keyword]
  }

  return null
}

/** Returns the answer lines for a quick action by its id. */
export function findResponse(id) {
  return responses[id] ?? null
}

/** Flattens an answer into the single string a message bubble renders. */
export function toMessage(lines, fallback) {
  if (Array.isArray(lines) && lines.length > 0) return lines.join(' ')
  return fallback
}

/** Fallback reply from the approved responses set. */
export function fallbackReply() {
  return responses.default.join(' ')
}

/** Paces typing indicator off reply length. */
export function typingDuration(text) {
  const length = String(text ?? '').length
  return Math.min(TYPING_MAX_MS, TYPING_MIN_MS + length * TYPING_PER_CHAR_MS)
}

/**
 * Queries Gemini API if available, or seamlessly falls back to the local matcher.
 */
export async function getAssistantReply(userText, history = []) {
  const clean = String(userText ?? '').trim()
  if (!clean) return { text: fallbackReply(), source: 'local' }

  // 1. Try secure server-side API proxy first (protects API key)
  try {
    const apiRes = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: clean, history }),
    })

    if (apiRes.ok) {
      const data = await apiRes.json()
      if (data.text) {
        return { text: data.text, source: 'gemini' }
      }
    }
  } catch {
    // If serverless proxy is unavailable, fall through
  }

  // 2. Direct client-side fallback if VITE_GEMINI_API_KEY is present
  if (GEMINI_API_KEY) {
    try {
      const contents = history
        .slice(-6)
        .map((msg) => ({
          role: msg.from === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }))

      contents.push({
        role: 'user',
        parts: [{ text: clean }],
      })

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: {
            maxOutputTokens: 350,
            temperature: 0.7,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        if (replyText) {
          return { text: replyText, source: 'gemini' }
        }
      }
    } catch {
      // Fall through to deterministic local response on error
    }
  }

  // Local Matcher Fallback
  const localMatch = matchResponse(clean)
  const text = toMessage(localMatch, fallbackReply())
  return { text, source: 'local' }
}

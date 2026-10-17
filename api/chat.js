/**
 * Serverless API Route: /api/chat
 * Secure server-side proxy for Google Gemini API.
 * Keeps GEMINI_API_KEY protected and never exposes it to the browser bundle.
 */

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
- Keep answers concise (1 to 3 sentences maximum) so they read well in a chat bubble.
- Tone: simple, articulate, engineering-led, practical, honest, zero buzzwords.
- Never invent unmeasured performance numbers or fake client names.
- If the visitor wants to scope a project, book a consultation, or discuss pricing, guide them to click "Book a Call" or visit the Contact page (/contact).`

// Simple in-memory sliding window rate limiter
const rateLimits = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25 // 25 messages per minute per IP

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimits.get(ip) || { count: 0, reset: now + RATE_LIMIT_WINDOW_MS }
  
  if (now > entry.reset) {
    entry.count = 1
    entry.reset = now + RATE_LIMIT_WINDOW_MS
    rateLimits.set(ip, entry)
    return false
  }
  
  entry.count += 1
  rateLimits.set(ip, entry)
  return entry.count > MAX_REQUESTS_PER_WINDOW
}

import fs from 'node:fs'
import path from 'node:path'

function ensureEnvLoaded() {
  if (process.env.GEMINI_API_KEY) return
  try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      content.split('\n').forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
        if (match) {
          const key = match[1]
          const value = (match[2] || '').trim().replace(/^['"]|['"]$/g, '')
          if (!process.env[key]) process.env[key] = value
        }
      })
    }
  } catch {}
}

export default async function handler(req, res) {
  ensureEnvLoaded()

  // Polyfill helper for Node ServerResponse in dev environments
  if (res && !res.status) {
    res.status = (code) => {
      res.statusCode = code
      return res
    }
  }
  if (res && !res.json) {
    res.json = (data) => {
      if (!res.headersSent) res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
      return res
    }
  }

  // Support both Node HTTP (req, res) and Fetch API (Request)
  if (req.method !== 'POST') {
    if (res && res.status) {
      return res.status(405).json({ error: 'Method not allowed' })
    }
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Retrieve client IP for basic DDoS / quota abuse protection
  const clientIp =
    req.headers?.['x-forwarded-for'] ||
    req.headers?.['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '127.0.0.1'

  if (isRateLimited(clientIp)) {
    const errorBody = { error: 'Too many requests. Please wait a minute.' }
    if (res && res.status) {
      return res.status(429).json(errorBody)
    }
    return new Response(JSON.stringify(errorBody), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Parse body
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  const { message, history = [] } = body || {}
  const cleanMessage = String(message || '').trim()

  if (!cleanMessage) {
    const errorBody = { error: 'Message cannot be empty.' }
    if (res && res.status) return res.status(400).json(errorBody)
    return new Response(JSON.stringify(errorBody), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    const errorBody = { error: 'Gemini API key is not configured on server.' }
    if (res && res.status) return res.status(503).json(errorBody)
    return new Response(JSON.stringify(errorBody), { status: 503, headers: { 'Content-Type': 'application/json' } })
  }

  try {
    const contents = (history || [])
      .slice(-6)
      .map((msg) => ({
        role: msg.from === 'user' ? 'user' : 'model',
        parts: [{ text: String(msg.text || '').slice(0, 1000) }],
      }))

    contents.push({
      role: 'user',
      parts: [{ text: cleanMessage.slice(0, 1500) }],
    })

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`

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

    if (!response.ok) {
      const errText = await response.text()
      const errorBody = { error: `Gemini API error: ${response.status}`, details: errText }
      if (res && res.status) return res.status(response.status).json(errorBody)
      return new Response(JSON.stringify(errorBody), { status: response.status, headers: { 'Content-Type': 'application/json' } })
    }

    const data = await response.json()
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!replyText) {
      throw new Error('Empty response from model')
    }

    const responsePayload = { text: replyText, source: 'gemini' }
    if (res && res.status) {
      return res.status(200).json(responsePayload)
    }
    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const errorBody = { error: 'Failed to process AI response', message: err.message }
    if (res && res.status) {
      return res.status(500).json(errorBody)
    }
    return new Response(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

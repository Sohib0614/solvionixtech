/**
 * Serverless API Route: /api/contact
 * Handles project enquiries, 15-min discovery call bookings, validates form inputs,
 * logs leads, and delivers notification emails via Resend to solvionixtech@gmail.com.
 */

import fs from 'node:fs'
import path from 'node:path'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function ensureEnvLoaded() {
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) return
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

  if (req.method !== 'POST') {
    if (res && res.status) return res.status(405).json({ error: 'Method not allowed' })
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  const {
    type = 'project_enquiry',
    name,
    organisation,
    email,
    phone = '',
    country = '',
    lookingFor,
    stage,
    requirement,
  } = body || {}

  const isDiscoveryCall = type === 'discovery_call'

  // Validation
  if (!name?.trim()) {
    const err = { error: 'Please provide your name.' }
    if (res && res.status) return res.status(400).json(err)
    return new Response(JSON.stringify(err), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  if (!email?.trim() || !EMAIL_PATTERN.test(email.trim())) {
    const err = { error: 'Please provide a valid email address.' }
    if (res && res.status) return res.status(400).json(err)
    return new Response(JSON.stringify(err), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  if (!isDiscoveryCall && !organisation?.trim()) {
    const err = { error: 'Please provide your organisation.' }
    if (res && res.status) return res.status(400).json(err)
    return new Response(JSON.stringify(err), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  if (!isDiscoveryCall && !requirement?.trim()) {
    const err = { error: 'Please provide details on your project requirement.' }
    if (res && res.status) return res.status(400).json(err)
    return new Response(JSON.stringify(err), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }

  const timestamp = new Date().toISOString()
  const leadData = {
    type: isDiscoveryCall ? 'Discovery Call Booking' : 'Project Scope Enquiry',
    name: name.trim(),
    organisation: organisation?.trim() || (isDiscoveryCall ? 'Discovery Call Client' : 'Direct Client'),
    email: email.trim(),
    phone: phone.trim(),
    country: country.trim(),
    lookingFor: lookingFor || (isDiscoveryCall ? 'Discovery Call' : 'Not specified'),
    stage: stage || 'Not specified',
    requirement: requirement?.trim() || (isDiscoveryCall ? `15-min discovery call reservation requested by ${name.trim()}` : ''),
    submittedAt: timestamp,
  }

  console.log('[SOLVIONIX LEAD INTAKE]:', JSON.stringify(leadData, null, 2))

  // Dispatch Email via Resend
  const resendApiKey = process.env.RESEND_API_KEY
  const notificationEmail = process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL || 'solvionixtech@gmail.com'

  let emailDispatchStatus = 'skipped'
  let emailResponseData = null

  if (resendApiKey) {
    try {
      const emailSubject = isDiscoveryCall
        ? `[Discovery Call Booked] ${leadData.name} - Slot: ${leadData.stage}`
        : `[Solvionix Lead] New Enquiry from ${leadData.name} (${leadData.organisation})`

      const emailText = isDiscoveryCall
        ? `
New 15-Minute Discovery Call Reserved on Solvionix!

Client Name: ${leadData.name}
Client Email: ${leadData.email}
Discussion Topic: ${leadData.lookingFor}
Selected Time Slot: ${leadData.stage}

Details:
${leadData.requirement}

Received at: ${leadData.submittedAt}
Action: Check your calendar and send calendar invite or reach out to client.
        `.trim()
        : `
New Project Enquiry received for Solvionix:

Name: ${leadData.name}
Organisation: ${leadData.organisation}
Email: ${leadData.email}
Phone: ${leadData.phone || 'N/A'}
Country: ${leadData.country || 'N/A'}
Looking For: ${leadData.lookingFor}
Project Stage: ${leadData.stage}

Requirement:
${leadData.requirement}

Submitted at: ${leadData.submittedAt}
        `.trim()

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Solvionix Lead Bot <onboarding@resend.dev>',
          to: [notificationEmail],
          reply_to: leadData.email,
          subject: emailSubject,
          text: emailText,
        }),
      })

      emailResponseData = await emailRes.json().catch(() => ({}))
      if (!emailRes.ok) {
        console.error('[RESEND API ERROR]:', emailRes.status, emailResponseData)
        emailDispatchStatus = 'error'
      } else {
        console.log('[RESEND API SUCCESS]: Dispatched to', notificationEmail, emailResponseData)
        emailDispatchStatus = 'sent'
      }
    } catch (err) {
      console.error('[EMAIL DISPATCH NETWORK ERROR]:', err)
      emailDispatchStatus = 'network_error'
    }
  } else {
    console.warn('[CONTACT API]: No RESEND_API_KEY found in environment!')
  }

  const successPayload = {
    ok: true,
    message: isDiscoveryCall
      ? 'Call slot reserved successfully. Confirmation email dispatched.'
      : 'Thank you. Your enquiry has been recorded and our team will get in touch.',
    data: leadData,
    emailStatus: emailDispatchStatus,
  }

  if (res && res.status) {
    return res.status(200).json(successPayload)
  }
  return new Response(JSON.stringify(successPayload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

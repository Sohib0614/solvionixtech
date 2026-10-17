import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FORM_ENDPOINT, hasFormEndpoint } from '../../data/config'
import { ChoiceField } from '../forms/ChoiceField'
import { Field } from '../forms/Field'
import { TextAreaField } from '../forms/TextAreaField'
import { Button } from '../ui/Button'

/**
 * The project enquiry form.
 *
 * This is a qualification step, not a message box. The order of the questions
 * is the order a discovery conversation would take them in:
 *
 *   1. What are you looking for?     the shape of the requirement
 *   2. Where does the project stand? how much is already decided
 *   3. Tell us about the requirement. the operational problem
 *   4. Contact details.              enough to reply
 *
 * Budget was removed deliberately. A currency-bracketed budget field is a
 * sales-procedure artefact, it produces a bad first conversation with
 * European buyers, and it says nothing about whether we are the right team.
 *
 * The form posts to `FORM_ENDPOINT` in `data/config.js`. While that is `null` it
 * validates and then says plainly that no endpoint is configured. It never
 * pretends a message was sent.
 */

const LOOKING_FOR = [
  'New digital product',
  'Existing system improvement',
  'AI & automation',
  'Business platform',
  'Data & analytics',
  'System integration',
  'Not sure yet',
]

const CURRENT_STAGE = [
  'Exploring an idea',
  'Requirements defined',
  'Existing product',
  'Scaling / improving an existing system',
]

const empty = {
  lookingFor: '',
  stage: '',
  requirement: '',
  name: '',
  organisation: '',
  email: '',
  phone: '',
  country: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}

  if (!values.lookingFor) errors.lookingFor = 'Please choose the closest option.'
  if (!values.stage) errors.stage = 'Please choose where the project currently stands.'
  if (!values.requirement.trim()) {
    errors.requirement = 'Please describe the requirement, even briefly.'
  }
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.organisation.trim()) errors.organisation = 'Please enter your organisation.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please check the email address.'
  }

  return errors
}

export function ProjectForm() {
  const location = useLocation()
  const [values, setValues] = useState(() => {
    const searchParams = new URLSearchParams(location.search)
    const estimate = searchParams.get('estimate')
    const problem = searchParams.get('problem')

    if (estimate) {
      return {
        ...empty,
        lookingFor: estimate.includes('AI') ? 'AI & automation' : 'New digital product',
        stage: 'Requirements defined',
        requirement: `Scope Specification from Estimator:\n${estimate}\n\nKey Goals & Details:\n`,
      }
    }

    if (problem) {
      const problemMap = {
        automation: {
          lookingFor: 'AI & automation',
          requirement: 'Operational Challenge — Manual Work:\nOur team is spending too much manual time on repetitive tasks and paperwork. We are looking to automate:\n',
        },
        support: {
          lookingFor: 'AI & automation',
          requirement: 'Operational Challenge — Customer Support Lag:\nCustomers and prospects wait too long for responses and quotes. We are looking for 24/7 automated assistance / scheduling for:\n',
        },
        integrations: {
          lookingFor: 'System integration',
          requirement: 'Operational Challenge — Disconnected Tools:\nOur business software and tools do not talk to each other. We are looking to connect:\n',
        },
        data: {
          lookingFor: 'Data & analytics',
          requirement: 'Operational Challenge — Data trapped in spreadsheets:\nOur business data is hard to interpret and extract insights from. We are looking for automated dashboards and analytics for:\n',
        },
        software: {
          lookingFor: 'New digital product',
          requirement: 'Product Challenge — Digital Product / SaaS:\nWe are looking to design and build a modern, scalable web application or SaaS product for:\n',
        },
      }
      const match = problemMap[problem]
      if (match) {
        return {
          ...empty,
          lookingFor: match.lookingFor,
          stage: 'Exploring an idea',
          requirement: match.requirement,
        }
      }
    }

    return empty
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | demo | error
  const [failure, setFailure] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear the error as soon as the field is touched, so nobody is left
    // reading a complaint about something they have already fixed.
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)

    // Move focus to the first problem rather than only colouring it. Colour
    // alone is invisible to a keyboard or screen-reader user.
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0]
      const target = event.currentTarget.querySelector(`[name="${firstKey}"]`)
      target?.focus()
      return
    }

    if (!hasFormEndpoint) {
      setStatus('demo')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setValues(empty)
      setStatus('sent')
    } catch (error) {
      setFailure(error.message)
      setStatus('error')
    }
  }

  return (
    <form
      id="project-enquiry"
      onSubmit={handleSubmit}
      noValidate
      className="flex scroll-mt-28 flex-col gap-10"
    >
      <div className="flex flex-col gap-6">
        <ChoiceField
          name="lookingFor"
          label="What are you looking for?"
          hint='The closest match is enough. If none of them fit, "Not sure yet" is a useful answer.'
          options={LOOKING_FOR}
          columns={2}
          value={values.lookingFor}
          onChange={handleChange}
          error={errors.lookingFor}
        />

        <ChoiceField
          name="stage"
          label="Current stage"
          hint="This tells us how much of the thinking is already done."
          options={CURRENT_STAGE}
          columns={2}
          value={values.stage}
          onChange={handleChange}
          error={errors.stage}
        />
      </div>

      <TextAreaField
        name="requirement"
        label="Tell us about the requirement"
        required
        maxLength={2000}
        rows={7}
        placeholder="What is not working today, who it affects, and what it costs in time or money. A couple of paragraphs is fine."
        hint="The operational problem is more useful to us than a feature list."
        value={values.requirement}
        onChange={handleChange}
        error={errors.requirement}
      />

      <fieldset className="flex flex-col gap-5">
        <legend className="font-semibold type-h3 text-fog-50">Where to reach you</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            name="name"
            label="Name"
            required
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Field
            name="organisation"
            label="Business / Organisation"
            required
            autoComplete="organization"
            placeholder="Organisation name"
            value={values.organisation}
            onChange={handleChange}
            error={errors.organisation}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            name="phone"
            label="Phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional, including country code"
            value={values.phone}
            onChange={handleChange}
          />
          <Field
            name="country"
            label="Country"
            autoComplete="country-name"
            placeholder="Optional"
            value={values.country}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="font-semibold text-sm text-fog-500">
          Fields marked <span className="font-semibold text-accent">*</span> are required.
        </p>
      </div>

      <div role="status" aria-live="polite">
        {status === 'sent' ? (
          <p className="font-semibold rounded-lg border border-signal-400/30 bg-signal-400/10 px-4 py-3 text-[0.9375rem] text-signal-200">
            Thank you. Your enquiry is with us and we will reply with a view on it.
          </p>
        ) : null}

        {status === 'demo' ? (
          <p className="font-semibold rounded-lg border border-line bg-ink-850/60 px-4 py-3 text-[0.9375rem] text-fog-300">
            The form is working, but no submission endpoint is configured yet, so nothing
            was sent and nothing was stored. Add one in{' '}
            <code className="font-semibold text-accent">src/data/config.js</code> to receive
            enquiries.
          </p>
        ) : null}

        {status === 'error' ? (
          <p className="font-semibold rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-[0.9375rem] text-red-300">
            The enquiry could not be sent{failure ? ` (${failure})` : ''}. Please try again
            or use WhatsApp.
          </p>
        ) : null}
      </div>
    </form>
  )
}

export default ProjectForm

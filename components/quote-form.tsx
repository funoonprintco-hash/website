"use client"

import { useActionState } from "react"
import { submitEnquiry, type EnquiryState } from "@/app/actions"
import { serviceOptions } from "@/lib/services"
import { SixBars } from "@/components/six-bars"
import { cn } from "@/lib/utils"

const initialState: EnquiryState = { status: "idle" }

const fieldBase =
  "w-full rounded-[2px] border border-border bg-background px-4 py-3.5 font-sans text-sm text-ink transition-colors duration-200 placeholder:text-graphite-mid/70 focus:border-ink focus-visible:outline-none"

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)

  if (state.status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[2px] border border-border bg-offwhite p-10">
        <SixBars className="mb-8 h-8 text-ink" />
        <h3 className="font-display text-3xl font-semibold tracking-[-0.02em]">Enquiry received.</h3>
        <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-graphite-mid">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={state.errors?.name}>
          <input name="name" type="text" placeholder="Your name" className={fieldBase} />
        </Field>
        <Field label="Email" error={state.errors?.email}>
          <input name="email" type="email" placeholder="you@company.com" className={fieldBase} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" optional>
          <input name="phone" type="tel" placeholder="+971 —" className={fieldBase} />
        </Field>
        <Field label="Company" optional>
          <input name="company" type="text" placeholder="Company name" className={fieldBase} />
        </Field>
      </div>

      <Field label="Service" error={state.errors?.service}>
        <div className="relative">
          <select
            name="service"
            defaultValue={defaultService ?? ""}
            className={cn(fieldBase, "appearance-none pr-10")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-graphite-mid">
            ↓
          </span>
        </div>
      </Field>

      <Field label="Project details" error={state.errors?.message}>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project — quantities, timelines, and anything else that helps."
          className={cn(fieldBase, "resize-none")}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p className="font-sans text-sm text-ink" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group mt-2 inline-flex items-center justify-center gap-3 rounded-[2px] bg-ink px-7 py-4 font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-graphite disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  )
}

function Field({
  label,
  children,
  error,
  optional,
}: {
  label: string
  children: React.ReactNode
  error?: string
  optional?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between">
        <span className="font-sans text-[11px] uppercase tracking-label text-graphite-mid">
          {label}
        </span>
        {optional ? (
          <span className="font-sans text-[10px] uppercase tracking-label text-graphite-mid/60">
            Optional
          </span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block font-sans text-xs text-ink" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}

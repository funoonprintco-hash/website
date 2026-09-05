"use server"

import { Resend } from "resend"

export type EnquiryState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: Record<string, string>
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const company = String(formData.get("company") ?? "").trim()
  const service = String(formData.get("service") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  // Honeypot — bots fill hidden fields.
  const trap = String(formData.get("company_website") ?? "")

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Please enter your name."
  if (!email) errors.email = "Please enter your email."
  else if (!isEmail(email)) errors.email = "Please enter a valid email."
  if (!service) errors.service = "Please choose a service."
  if (!message) errors.message = "Please tell us a little about your project."

  if (trap) {
    // Silently succeed for bots.
    return { status: "success", message: "Thank you." }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
    to: process.env.RESEND_TO ?? "enquiry@funoonprintco.com",
    replyTo: email,
    subject: `New enquiry — ${service}`,
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "—"}`,
      `Company: ${company || "—"}`,
      `Service: ${service}`,
      ``,
      message,
    ].join("\n"),
  })

  if (error) {
    console.error("[resend] delivery failed:", error.message)
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again or email us directly.",
    }
  }

  return {
    status: "success",
    message: "Thank you — your enquiry has been received. We will be in touch shortly.",
  }
}

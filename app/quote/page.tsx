import type { Metadata } from "next"
import { Eyebrow } from "@/components/section-heading"
import { QuoteForm } from "@/components/quote-form"
import { Reveal } from "@/components/reveal"
import { SixBars } from "@/components/six-bars"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Send Funoon Print Co. your project details and we'll get back to you with a quote.",
}

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-ink text-background">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
          <Reveal>
            <SixBars className="mb-8 h-7 text-background/60" />
          </Reveal>
          <Reveal delay={60}>
            <Eyebrow className="mb-6 text-background/40">Request a Quote</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="max-w-4xl font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.03em] text-balance">
              Tell us what you need to print.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-background/60">
              Tell us what you have in mind, what you need, and when you need it. We'll take it
              from there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="space-y-10">
                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    Prefer to call?
                  </p>
                  <a
                    href={site.phoneHref}
                    className="font-display text-xl font-medium tracking-[-0.01em] transition-colors hover:text-graphite-mid"
                  >
                    {site.phone}
                  </a>
                </div>

                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    WhatsApp
                  </p>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl font-medium tracking-[-0.01em] transition-colors hover:text-graphite-mid"
                  >
                    Message us directly
                  </a>
                </div>

                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    Email
                  </p>
                  <a
                    href={site.emailHref}
                    className="font-display text-xl font-medium tracking-[-0.01em] transition-colors hover:text-graphite-mid"
                  >
                    {site.email}
                  </a>
                </div>

                <div className="border-t border-border pt-10">
                  <p className="font-sans text-sm leading-relaxed text-graphite-mid">
                    Share as much or as little as you have at this stage. We'll ask the right
                    questions and work through the details with you.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

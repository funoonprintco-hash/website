import type { Metadata } from "next"
import { BrandButton } from "@/components/brand-button"
import { Eyebrow } from "@/components/section-heading"
import { QuoteForm } from "@/components/quote-form"
import { Reveal } from "@/components/reveal"
import { SixBars } from "@/components/six-bars"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Funoon Print Co. in Sharjah, UAE. Call, email, or send us an enquiry.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28 md:pt-48">
          <Reveal>
            <Eyebrow className="mb-6">Contact</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="max-w-3xl font-display text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em] text-balance">
              Let's talk print.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <Reveal>
              <SixBars className="mb-10 h-7 text-ink" />

              <div className="space-y-10">
                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    Phone
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
                    Message us
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

                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    Location
                  </p>
                  <p className="font-display text-xl font-medium tracking-[-0.01em]">
                    {site.location}
                  </p>
                </div>

                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.22em] text-graphite-mid">
                    Hours
                  </p>
                  <p className="font-sans text-base text-graphite">
                    {site.hours.days}
                    <br />
                    <span className="text-graphite-mid">{site.hours.time}</span>
                  </p>
                </div>

                <div className="pt-4">
                  <BrandButton href={site.whatsappHref} variant="primary">
                    WhatsApp Us
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <Eyebrow className="mb-8">Send an Enquiry</Eyebrow>
              <QuoteForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="border-t border-border">
        <div className="relative h-[400px] w-full overflow-hidden bg-offwhite md:h-[500px]">
          {/* Replace src with exact Google Maps embed URL once office address is confirmed */}
          <iframe
            src={site.mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) contrast(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Funoon Print Co. location — Sharjah, UAE"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/10" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-10">
          <p className="font-sans text-xs text-graphite-mid">
            Exact address to be confirmed — map currently centred on Sharjah, UAE.
          </p>
        </div>
      </section>
    </>
  )
}

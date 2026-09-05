import Image from "next/image"
import { BrandButton } from "@/components/brand-button"
import { Reveal } from "@/components/reveal"

// Placeholder case study — replace with real project data when available.
const project = {
  label: "Featured Project",
  title: "Corporate Identity Materials",
  subtitle:
    "A cohesive printed identity designed to carry a brand consistently across every physical touchpoint.",
  image: "/work/corporate-stationery.png",
  imageAlt:
    "Corporate stationery set including letterhead, business cards, folder and envelope on a neutral surface",
  details: [
    { label: "Client", value: "Example Project" },
    { label: "Scope", value: "Stationery, Cards, Packaging, Gifts" },
    { label: "Materials", value: "Premium uncoated stock, soft-touch finish" },
  ],
}

export function CaseStudyFeature() {
  return (
    <section className="bg-ink text-background">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <span className="block font-sans text-[11px] uppercase tracking-[0.22em] text-background/40">
            {project.label}
          </span>
        </Reveal>

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12">
          {/* Image */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-graphite-dark">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover opacity-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          </div>

          {/* Content */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={100}>
              <h2 className="font-display text-3xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-background/60">
                {project.subtitle}
              </p>

              <dl className="mt-10 border-t border-white/10 pt-8">
                {project.details.map((d) => (
                  <div key={d.label} className="flex gap-6 py-3 border-b border-white/10">
                    <dt className="w-24 shrink-0 font-sans text-[11px] uppercase tracking-[0.22em] text-background/40">
                      {d.label}
                    </dt>
                    <dd className="font-sans text-sm text-background/80">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <BrandButton href="/work" variant="outlineDark">
                  View Our Work
                </BrandButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

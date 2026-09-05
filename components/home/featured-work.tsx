import { BrandButton } from "@/components/brand-button"
import { Eyebrow } from "@/components/section-heading"
import { PortfolioCard } from "@/components/portfolio-card"
import { Reveal } from "@/components/reveal"
import { workItems } from "@/lib/portfolio"

export function FeaturedWork() {
  const featured = workItems.slice(0, 6)

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow className="mb-5">Selected Work</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-balance md:text-6xl">
              Work that speaks
              <br />for your brand.
            </h2>
          </div>
          <BrandButton href="/work" variant="outlineLight">
            View All Work
          </BrandButton>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item, i) => (
          <Reveal key={item.slug} delay={(i % 3) * 80}>
            <PortfolioCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { CinematicHero } from "@/components/ui/cinematic-landing-hero"
import { PageCard } from "@/components/ui/page-card"
import { Hero } from "@/components/home/hero"
import { BrandStatement } from "@/components/home/brand-statement"
import { WhatWeDo } from "@/components/home/what-we-do"
import { QualityBand } from "@/components/home/quality-band"
import { FeaturedWork } from "@/components/home/featured-work"
import { WhyFunoon } from "@/components/why-funoon"
import { ProcessSteps } from "@/components/home/process-steps"
import { IndustriesSection } from "@/components/industries-section"
import { EnquiryCta } from "@/components/home/enquiry-cta"

export default function HomePage() {
  return (
    <>
      <CinematicHero tagline1="Print that speaks" tagline2="for itself." />
      <PageCard>
        <Hero />
        <BrandStatement />
        <WhatWeDo />
        <QualityBand />
        <FeaturedWork />
        <WhyFunoon />
        <ProcessSteps />
        <IndustriesSection />
        <EnquiryCta />
      </PageCard>
    </>
  )
}

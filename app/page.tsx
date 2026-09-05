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
      <Hero />
      <BrandStatement />
      <WhatWeDo />
      <QualityBand />
      <FeaturedWork />
      <WhyFunoon />
      <ProcessSteps />
      <IndustriesSection />
      <EnquiryCta />
    </>
  )
}

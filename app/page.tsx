import Link from "next/link";
import { BrandMarquee } from "@/components/brand-marquee";

import Image from "next/image";

import { solutions } from "@/lib/solutions";

import { ProjectCTA, Process } from "@/components/editorial";

import { WorkCard } from "@/components/work-card";

import { workItems } from "@/lib/portfolio";

import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Corporate Branding, Printing & Merchandise in UAE",
  "Funoon FZC brings your brand to life through corporate printing, custom packaging, gifts, apparel and merchandise. Based in Sharjah, serving the UAE.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <section className="home-hero dark-surface">
        <div className="shell hero-layout">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-line">
                <span>YOUR BRAND.</span>
              </span>
              <span className="hero-line hero-line-muted">
                <span>MADE TO</span>
              </span>
              <span className="hero-line">
                <span>BE SEEN.</span>
              </span>
            </h1>
            <p>
              Premium branding. Thoughtful execution.
              <br />
              Reliable corporate supply.
            </p>
            <div className="hero-actions">
              <Link href="/quote" className="button button-white">
                Request a Quote
              </Link>
              <Link href="/work" className="text-link">
                Explore Our Work
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src="/work/packaging.png"
              alt="Temporary packaging concept; Funoon business-card photography will replace this image"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 55vw"
            />
            <div className="hero-media-caption">
              <span>Form. Material. Detail.</span>
              <span>Packaging concept</span>
            </div>
          </div>
        </div>
        <div className="shell hero-bottom">
          <span>PRINT · PACKAGING · MERCHANDISE</span>
          <span>Made for business. Based in the UAE.</span>
        </div>
      </section>

      <BrandMarquee />
      <section className="shell brand-introduction">
        <p>
          From premium business essentials to custom packaging, corporate gifts
          and branded merchandise, we bring your brand to life through
          thoughtfully crafted physical experiences.
        </p>
        <span>
          FUNOON FZC
          <br />
          MADE TO BE SEEN.
        </span>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <h2>
            Everything your brand needs.
            <br />
            One reliable partner.
          </h2>
          <Link className="text-link" href="/solutions">
            Explore our solutions
          </Link>
        </div>
        <div className="solution-grid">
          {solutions.map((s, i) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className={`solution-tile solution-tile-${i}`}
            >
              <div className="solution-image">
                <Image
                  src={s.image}
                  alt={`${s.name} product concept`}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
                <span>Product concept</span>
              </div>
              <div className="solution-title">
                <h3>{s.name}</h3>
                <span className="view-label">Explore</span>
              </div>
              <p>{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="selected-work">
        <div className="shell section">
          <div className="section-heading">
            <h2>
              Made for brands
              <br />
              that mean business.
            </h2>
            <div>
              <p>A closer look at completed work.</p>
              <Link href="/work" className="text-link">
                View our work
              </Link>
            </div>
          </div>
          <div className="work-pair">
            {workItems.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section shell detail-section">
        <div>
          <h2>
            The details make
            <br />
            the difference.
          </h2>
          <p className="large-copy">
            It’s how the paper feels. How the colour carries. How every piece
            belongs to the same brand.
          </p>
          <Link href="/about" className="text-link">
            Get to know Funoon FZC
          </Link>
        </div>
        <div className="detail-list">
          {[
            [
              "Material matters",
              "Consider paper, fabric, structure and finish in the context of the product and its purpose.",
            ],
            [
              "One consistent identity",
              "Bring your brand guidelines into every product, from a single card to a complete corporate kit.",
            ],
            [
              "Clarity before production",
              "Agree specifications, quotation and artwork before moving ahead.",
            ],
            [
              "Considered coordination",
              "Keep your requirements, approvals and delivery details in one conversation.",
            ],
          ].map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="process-band">
        <Process />
      </div>

      <section className="partnership dark-surface">
        <div className="shell partnership-inner">
          <div>
            <h2>
              One partner.
              <br />
              Every brand requirement.
            </h2>
            <p>
              For procurement, HR and marketing teams with an ongoing need for
              print, packaging and branded products. Bring your recurring
              requirements together with a considered approach to corporate
              supply.
            </p>
            <Link
              href="/quote?service=Corporate%20Partnership"
              className="button button-white"
            >
              Discuss Corporate Requirements
            </Link>
          </div>
          <div className="partnership-note">
            <span>
              From the everyday essentials
              <br />
              to the next big occasion.
            </span>
            <div>
              Business essentials
              <br />
              Employee welcome kits
              <br />
              Client gifting
              <br />
              Brand launches
              <br />
              Repeat orders
            </div>
          </div>
        </div>
      </section>

      <ProjectCTA />
    </>
  );
}

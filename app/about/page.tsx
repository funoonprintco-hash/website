import {
  PageIntro,
  ProductImage,
  Process,
  ProjectCTA,
} from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About Funoon FZC",
  "Meet Funoon FZC, a Sharjah-based partner for corporate printing, branding, packaging and merchandise across the UAE.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="Good brands deserve thoughtful execution."
        description="We’re Funoon FZC. A corporate branding, printing and merchandise partner in Sharjah, helping businesses turn their identity into something tangible."
        dark
      />
      <section className="shell section split-editorial">
        <ProductImage
          src="/work/quality-detail.png"
          alt="Paper texture and print detail, illustrative material study"
          concept
          priority
        />
        <div>
          <h2>
            From an idea
            <br />
            to the thing itself.
          </h2>
          <p className="large-copy">
            The way a brand looks is only part of the story. The way it feels in
            someone’s hands matters, too.
          </p>
          <p>
            We work across print, packaging, gifts, apparel and branded
            products, helping teams make considered choices about materials,
            presentation and use.
          </p>
          <p>
            Our approach is built around a clear brief, practical
            recommendations, agreed artwork and coordinated production. Whether
            you’re planning a single project or recurring corporate
            requirements, the aim is the same: a result that represents your
            business well.
          </p>
        </div>
      </section>
      <section className="about-values section">
        <div className="shell">
          <h2>Considered from every angle.</h2>
          <div className="values-grid">
            {[
              [
                "The material",
                "Paper, fabric and packaging should suit the purpose as well as the identity. We help work through the options.",
              ],
              [
                "The detail",
                "Artwork, placement and finishing deserve a clear conversation before production begins.",
              ],
              [
                "The relationship",
                "Useful communication and an understanding of your recurring needs make the next project easier to plan.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <ProjectCTA title="Let’s build something that represents you." />
    </>
  );
}

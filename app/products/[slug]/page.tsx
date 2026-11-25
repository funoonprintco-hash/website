import { CorporateGiftGallery } from "@/components/corporate-gift-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { workItems } from "@/lib/portfolio";
import { PageIntro, ProductImage, ProjectCTA } from "@/components/editorial";
import { WorkCard } from "@/components/work-card";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  return s
    ? pageMetadata(`${s.name} in UAE`, s.description, `/products/${slug}`)
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const examples = workItems.filter((w) => w.relatedProducts.includes(slug));
  return (
    <>
      <PageIntro title={s.name} description={s.description}>
        <Link
          href={`/quote?service=${encodeURIComponent(s.name)}`}
          className="button button-black"
        >
          Request a Quote
        </Link>
      </PageIntro>
      {slug === "corporate-gifts" && <CorporateGiftGallery />}
      <section className="shell section split-editorial">
        <ProductImage src={s.image} alt={s.imageAlt} concept priority />
        <div>
          <h2>Make it yours.</h2>
          <p>
            {slug === "business-cards" ? "All our business cards have rounded corners. Choose 400 GSM with matte or glossy lamination, with or without spot UV; or 760 MIC with velvet lamination and spot UV. Orders are available in 500 or 1,000 pieces." : "Every project starts with your requirements. These are options to discuss; availability and the final specification are confirmed in your quotation."}
          </p>
          <dl className="spec-list">
            {s.options.map((o) => (
              <div key={o.label}>
                <dt>{o.label}</dt>
                <dd>{o.examples.join(" · ")}</dd>
              </div>
            ))}
          </dl>
          <h3>Made for</h3>
          <ul className="tag-list">
            {s.goodFor.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>
      {slug === "business-cards" && (
        <section className="shell section split-editorial">
          <h2>
            A printed introduction.
            <br />A digital connection.
          </h2>
          <div>
            <p>
              A QR code can connect each card to a personal contact page,
              tailored to the individual. Bring their role, company details,
              WhatsApp, LinkedIn, email and website together in one place.
            </p>
            <p>
              Offer a downloadable contact card (vCard) so visitors can add the
              details to their phone, with confirmation handled by their device.
              We scope the page, links and contact fields with you as part of
              the project.
            </p>
            <Link className="text-link" href="/quote?service=Business%20Cards">
              Discuss QR-linked business cards
            </Link>
          </div>
        </section>
      )}
      {slug !== "corporate-gifts" && examples.length > 0 && (
        <section className="shell section">
          <div className="section-heading">
            <h2>See it in practice.</h2>
            <Link href="/work" className="text-link">
              Our completed work
            </Link>
          </div>
          <div className="work-pair">
            {examples.map((w) => (
              <WorkCard key={w.slug} item={w} />
            ))}
          </div>
        </section>
      )}
      <section className="shell section faq-section">
        <h2>A few useful details.</h2>
        <div>
          {[
            [
              `Can I customise ${s.name.toLowerCase()}?`,
              slug === "business-cards" ? "Personalise the artwork within our rounded-corner range. Choose 400 GSM with matte or glossy lamination and optional spot UV, or 760 MIC with velvet lamination and spot UV. Ask about gold foil compatibility when requesting your quote." : "Yes. Share your preferred dimensions, quantities, materials and branding requirements. We’ll confirm feasible options and pricing in your quotation.",
            ],
            [
              "Is there a minimum order quantity?",
              slug === "business-cards" ? "Business cards are available in quantities of 500 or 1,000 pieces." : "Minimum quantities depend on the product, material and production method. Include your estimated quantity and we’ll advise on suitable options.",
            ],
            [
              "How long will my order take?",
              "Timing depends on specifications, quantity, artwork approval and availability. Share your required delivery date so we can confirm a realistic schedule before you proceed.",
            ],
            [
              "What artwork should I send?",
              "Send a print-ready PDF if available, or a reference image to begin the conversation. We’ll advise on the artwork requirements and share a proof for approval before production.",
            ],
            [
              "Can I reorder later?",
              "Yes. Mention your previous project or enquiry reference and any changes to quantity or artwork. We’ll reconfirm pricing, availability and delivery for the new order.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <ProjectCTA
        href={`/quote?service=${encodeURIComponent(s.name)}`}
        label="Request Your Quote"
      />
    </>
  );
}

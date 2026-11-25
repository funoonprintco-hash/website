import { CorporateGiftGallery } from "@/components/corporate-gift-gallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/lib/solutions";
import { getService } from "@/lib/services";
import {
  PageIntro,
  ProductImage,
  Process,
  ProjectCTA,
} from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  return s ? pageMetadata(s.fullName, s.description, `/solutions/${slug}`) : {};
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  return (
    <>
      <PageIntro title={s.fullName} description={s.description}>
        <Link
          href={`/quote?service=${encodeURIComponent(s.fullName)}`}
          className="button button-black"
        >
          Discuss Your Requirements
        </Link>
      </PageIntro>
      {slug === "corporate-gifts" && <CorporateGiftGallery />}
      <section className="shell section split-editorial">
        <ProductImage
          src={s.image}
          alt={`${s.name} product concept`}
          concept
          priority
        />
        <div>
          <h2>Built around your brief.</h2>
          <p className="large-copy">{s.details}</p>
          <h3>For {s.audience.toLowerCase()}</h3>
          <ul className="plain-list">
            {s.applications.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="shell section related-section">
        <h2>Products to bring it together.</h2>
        <div className="product-links">
          {s.products.map((slug) => {
            const p = getService(slug);
            return p ? (
              <Link key={slug} href={`/products/${slug}`}>
                <h3>{p.name}</h3>
                <p>{p.short}</p>
                <span className="text-link">Explore products</span>
              </Link>
            ) : null;
          })}
        </div>
      </section>
      <Process />
      <ProjectCTA href={`/quote?service=${encodeURIComponent(s.fullName)}`} />
    </>
  );
}

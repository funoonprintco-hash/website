import { coreProducts } from "@/lib/core-products";
import Link from "next/link";
import { services } from "@/lib/services";
import { PageIntro, ProductImage, ProjectCTA } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Printing, Packaging & Branded Products",
  "Explore business cards, corporate gifts, packaging, apparel, brochures and branded products. Custom quantities and finishes, quoted to your brief.",
  "/products",
);
export default function ProductsPage() {
  return (
    <>
      <PageIntro
        title="Tangible expressions of your brand."
        description="Business essentials, considered gifts and everything in between. Explore a starting point, then make it your own with the right format, material and finish."
      />
      <section className="shell section">
        <div className="catalogue-grid">
          {[
            ...coreProducts.map((p) =>
              services.find((s) => s.slug === p.slug)!,
            ),
            ...services.filter(
              (s) => !coreProducts.some((p) => p.slug === s.slug),
            ),
          ].map((s) => (
            <Link href={`/products/${s.slug}`} key={s.slug}>
              <ProductImage src={s.image} alt={s.imageAlt} concept />
              <h2>{s.name}</h2>
              <p>{s.short}</p>
              <span className="text-link">Explore options</span>
            </Link>
          ))}
        </div>
      </section>
      <ProjectCTA
        title="Something specific in mind?"
        label="Share Your Brief"
      />
    </>
  );
}

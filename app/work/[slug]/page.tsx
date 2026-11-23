import { MaxlineComparison } from "@/components/maxline-comparison";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workItems } from "@/lib/portfolio";
import { getService } from "@/lib/services";
import { PageIntro, ProductImage, ProjectCTA } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return workItems.map((w) => ({ slug: w.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = workItems.find((w) => w.slug === slug);
  return w
    ? pageMetadata(`${w.client} — ${w.title}`, w.description, `/work/${slug}`)
    : {};
}
export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = workItems.find((w) => w.slug === slug);
  if (!w) notFound();
  return (
    <>
      <PageIntro title={`${w.client}. ${w.title}.`} description={w.description}>
        <Link href="/work" className="text-link">
          All completed work
        </Link>
      </PageIntro>
      {slug === "business-cards" ? (
        <div className="shell section">
          <MaxlineComparison />
          <Link
            className="text-link"
            href="/case-studies#maxline-business-cards"
          >
            Read the project story
          </Link>
        </div>
      ) : (
        <section className="shell section project-gallery">
          {w.gallery.map((img, i) => (
            <ProductImage
              key={img.src}
              src={img.src}
              alt={img.alt}
              priority={i === 0}
            />
          ))}
          {w.note && <p className="image-note">{w.note}</p>}
          {w.video && (
            <video
              controls
              preload="metadata"
              src={w.video}
              aria-label={`${w.title} project video`}
            />
          )}
        </section>
      )}
      <section className="shell project-deliverables">
        <h2>What we produced.</h2>
        <ul>
          {w.deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {w.caseStudy?.approved && (
        <section className="shell project-story">
          {[
            ["The brief", w.caseStudy.brief],
            ["The challenge", w.caseStudy.challenge],
            ["Our approach", w.caseStudy.approach],
            ["The result", w.caseStudy.outcome],
          ].map(([heading, body]) => (
            <article key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </article>
          ))}
          <article className="project-lessons">
            <h2>What we learned.</h2>
            <ul>
              {w.caseStudy.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </article>
        </section>
      )}
      <section className="shell project-details">
        <div>
          <h2>Project overview</h2>
          <dl className="spec-list">
            <div>
              <dt>Client</dt>
              <dd>{w.client}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{w.category}</dd>
            </div>
            {w.specifications?.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            Materials, dimensions and finishing are specified individually for
            each new quotation.
          </p>
        </div>
        <div>
          <h2>Related products</h2>
          <div className="related-links">
            {w.relatedProducts.map((slug) => (
              <Link key={slug} href={`/products/${slug}`}>
                {getService(slug)?.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProjectCTA
        title="A similar project. Your own identity."
        label="Request a Similar Project"
        href={`/quote?service=${encodeURIComponent(w.title)}&project=${encodeURIComponent(`${w.client} — ${w.title}`)}`}
      />
    </>
  );
}

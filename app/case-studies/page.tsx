import Link from "next/link";
import { PageIntro, ProjectCTA } from "@/components/editorial";
import { caseStudies } from "@/lib/case-studies";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Real Project Stories",
  "Real Funoon FZC project stories: quality checks under pressure, clearer sampling, considered apparel and Maxline business cards.",
  "/case-studies",
);
export default function CaseStudiesPage() {
  return (
    <>
      <PageIntro
        title="Quality is a decision. Here are some of ours."
        description="First-hand accounts from our projects: what challenged us, how we responded and what we learned. Some client identities are kept private."
      />
      <nav className="shell story-index" aria-label="Project stories">
        {caseStudies.map((s) => (
          <Link key={s.slug} href={`#${s.slug}`}>
            {s.title}
          </Link>
        ))}
      </nav>
      <div className="shell story-collection">
        {caseStudies.map((s) => (
          <article className="client-story" id={s.slug} key={s.slug}>
            <header>
              <h2>{s.title}</h2>
              <p>{s.category}</p>
              <p className="large-copy">{s.summary}</p>
              {s.portfolio && (
                <Link className="text-link" href={s.portfolio}>
                  See the completed cards
                </Link>
              )}
            </header>
            <div className="story-body">
              {[
                ["The brief", s.brief],
                ["Our response", s.decision],
                ["The result", s.result],
                ["What we learned", s.lesson],
              ].map(([title, copy]) => (
                <section key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section className="shell section story-note">
        <h2>More work for Maxline.</h2>
        <p>
          Our work for Maxline has also included a corporate gifts order,
          extending the relationship beyond business cards and display
          materials.
        </p>
        <Link className="text-link" href="/products/corporate-gifts">
          Explore corporate gifts
        </Link>
      </section>
      <ProjectCTA title="Tell us what your project needs." />
    </>
  );
}

import Link from "next/link";
import { PageIntro, ProductImage, ProjectCTA } from "@/components/editorial";
import { solutions } from "@/lib/solutions";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Corporate Solutions",
  "Corporate branding, employee welcome kits, packaging, uniforms, event materials and custom merchandise for UAE businesses.",
  "/solutions",
);
export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        title="A shared vision. Every detail aligned."
        description="Practical solutions for the people who build brands. Tell us what you’re working towards, and we’ll help bring the right physical elements together."
      />
      <div className="shell solution-rows">
        {solutions.map((s) => (
          <article key={s.slug} className="solution-row">
            <ProductImage src={s.image} alt={`${s.name} concept`} concept />
            <div>
              <h2>{s.fullName}</h2>
              <p>{s.details}</p>
              <p className="audience">For {s.audience.toLowerCase()}</p>
              <Link href={`/solutions/${s.slug}`} className="text-link">
                Explore this solution
              </Link>
            </div>
          </article>
        ))}
      </div>
      <ProjectCTA
        title="Bring your requirements together."
        label="Discuss Your Project"
      />
    </>
  );
}

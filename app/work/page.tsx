import Link from "next/link";
import { PageIntro, ProjectCTA } from "@/components/editorial";
import { WorkGrid } from "@/components/work/work-grid";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Work",
  "Explore approved completed Funoon FZC projects, including Maxline business cards and branded event displays.",
  "/work",
);
export default function WorkPage() {
  return (
    <>
      <PageIntro
        title="Made to represent. Made to be remembered."
        description="A selection of completed projects. Different formats, one intention: bringing a brand into the physical world with clarity and care."
      />
      <section className="shell section work-section">
        <p className="work-story-link">
          <Link className="text-link" href="/case-studies">
            Read the decisions and lessons behind our projects
          </Link>
        </p>
        <WorkGrid />
      </section>
      <ProjectCTA />
    </>
  );
}

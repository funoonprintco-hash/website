import { PageIntro } from "@/components/editorial";
import { ContactDetails } from "@/components/contact-details";
import { QuoteForm } from "@/components/quote-form";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Request a Quote",
  "Share your corporate printing, packaging, gifts or merchandise requirements with Funoon FZC. Request a quotation tailored to your project.",
  "/quote",
);
export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; project?: string }>;
}) {
  const query = await searchParams;
  const service =
    typeof query.service === "string" ? query.service.slice(0, 150) : undefined;
  const project =
    typeof query.project === "string" ? query.project.slice(0, 200) : undefined;
  return (
    <>
      <PageIntro
        title="Your next project starts here."
        description="Share the essentials. We’ll help with the details. Every quotation is shaped around your products, quantities, specifications and delivery requirements."
        dark
      />
      <section className="shell section enquiry-layout">
        <ContactDetails />
        <div>
          <h2 className="form-heading">Your project brief</h2>
          <QuoteForm defaultService={service} referenceProject={project} />
        </div>
      </section>
    </>
  );
}

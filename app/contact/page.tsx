import { PageIntro } from "@/components/editorial";
import { ContactDetails } from "@/components/contact-details";
import { QuoteForm } from "@/components/quote-form";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact",
  "Contact Funoon FZC at Sharjah Research Technology and Innovation Park for corporate printing, gifts, packaging and merchandise enquiries.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="A good project starts with a conversation."
        description="Tell us about your next project, an ongoing requirement or an idea you’d like to explore. We’ll help you work through the details."
      />
      <section className="shell section enquiry-layout">
        <ContactDetails />
        <div>
          <h2 className="form-heading">Tell us what you have in mind.</h2>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

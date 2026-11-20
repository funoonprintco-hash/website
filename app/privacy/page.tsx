import { PageIntro } from "@/components/editorial";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Enquiry Privacy",
  "How Funoon FZC uses information and files submitted through the website enquiry form.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        title="Your enquiry. Handled with care."
        description="Information about the details you share through this website."
      />
      <article className="shell section prose-page">
        <h2>Information you provide</h2>
        <p>
          Our enquiry form collects your contact and company details, project
          requirements and any artwork or reference file you choose to attach.
          Please share only information needed to discuss your project.
        </p>
        <h2>How it is used</h2>
        <p>
          Funoon FZC uses this information to respond to your request, prepare
          quotations and coordinate related project discussions. Enquiries and
          attachments are delivered to our team by our email provider, Resend.
          Uploaded files are not published on the website.
        </p>
        <h2>Service providers</h2>
        <p>
          The website is hosted on Vercel. Hosting and email providers process
          the technical information needed to operate the website and deliver
          enquiries. We do not ask for payment card details through this form.
        </p>
        <h2>Questions and requests</h2>
        <p>
          To ask about information you have submitted, request a correction or
          discuss deletion, contact <a href={site.emailHref}>{site.email}</a>.
          Please include enough detail for us to identify your enquiry.
        </p>
        <h2>External links</h2>
        <p>
          WhatsApp and Google Maps links open services operated by those
          providers. Their own privacy terms apply when you use them.
        </p>
      </article>
    </>
  );
}

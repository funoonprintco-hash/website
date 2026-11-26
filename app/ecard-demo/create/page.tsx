import { ECardBuilder } from "@/components/ecard-builder";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Try Your Business E-card",
  "Build a private business e-card demo. Add your details, choose a design and colour, and preview your digital introduction.",
  "/ecard-demo/create",
);
export default function ECardDemoPage() {
  return (
    <section className="shell ecard-page">
      <ECardBuilder />
    </section>
  );
}

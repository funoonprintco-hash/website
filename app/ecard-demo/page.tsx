import { PrintDigitalDemo } from "@/components/print-digital-demo";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Printed Business Cards Meet Digital E-cards",
  "Try the connection from a printed business card to an employee e-card. Call, WhatsApp, email and download a contact in one place.",
  "/ecard-demo",
);
export default function ECardDemoPage() {
  return (
    <PrintDigitalDemo />
  );
}

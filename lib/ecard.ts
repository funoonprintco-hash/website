export const designs = ["minimal", "bold", "classic"] as const;
export const consentText =
  "I agree that Funoon FZC may retain my contact details and send me marketing updates by email, phone or WhatsApp. This is optional, and I can withdraw consent at any time by emailing enquiry@funoonprintco.com.";
export const consentVersion = "ecard-marketing-v1-2026-11-26";
export type ECard = {
  name: string;
  phone: string;
  website: string;
  color: string;
  email: string;
  design: string;
  company: string;
  role: string;
  whatsapp: string;
  linkedin: string;
  instagram: string;
  address: string;
  bio: string;
  extraLinks: string;
  marketing: boolean;
};
export const emptyCard: ECard = {
  name: "",
  phone: "",
  website: "",
  color: "#2563eb",
  email: "",
  design: "minimal",
  company: "",
  role: "",
  whatsapp: "",
  linkedin: "",
  instagram: "",
  address: "",
  bio: "",
  extraLinks: "",
  marketing: false,
};
export function safeWeb(value: string): string {
  if (!value.trim()) return "";
  try {
    const input = value.trim();
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:/i.test(input) ? input : `https://${input}`,
    );
    return ["https:", "http:"].includes(url.protocol) &&
      !url.username &&
      !url.password &&
      url.hostname.includes(".")
      ? url.href
      : "";
  } catch {
    return "";
  }
}
export function validateCard(input: unknown) {
  const errors: Record<string, string> = {};
  const raw =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const card = { ...emptyCard };
  for (const key of Object.keys(emptyCard) as (keyof ECard)[]) {
    if (key === "marketing") {
      card.marketing = raw.marketing === true;
      continue;
    }
    const v = typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
    const max =
      key === "bio" || key === "extraLinks"
        ? 1000
        : key === "address"
          ? 300
          : 200;
    if (v.length > max) errors[key] = `Use ${max} characters or fewer.`;
    card[key] = v;
  }
  if (!card.name || /[\r\n]/.test(card.name))
    errors.name = "Enter your name on one line.";
  if (
    !/^[+()\d .-]{7,25}$/.test(card.phone) ||
    card.phone.replace(/\D/g, "").length < 7
  )
    errors.phone = "Enter a valid phone number with country code.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(card.email))
    errors.email = "Enter a valid email address.";
  for (const key of ["website", "linkedin", "instagram"] as const)
    if (card[key]) {
      const u = safeWeb(card[key]);
      if (!u) errors[key] = "Enter a valid http or https website address.";
      else card[key] = u;
    }
  if (card.whatsapp && !/^[+()\d .-]{7,25}$/.test(card.whatsapp))
    errors.whatsapp = "Enter a valid WhatsApp number.";
  if (!/^#[0-9a-f]{6}$/i.test(card.color))
    errors.color = "Choose a valid colour.";
  if (!designs.includes(card.design as (typeof designs)[number]))
    errors.design = "Choose one of the available designs.";
  const links = card.extraLinks
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (links.length > 5 || links.some((s) => !safeWeb(s)))
    errors.extraLinks = "Add up to five valid website links, one per line.";
  return { card, errors };
}
export function vCard(card: ECard) {
  const esc = (s: string) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\r?\n/g, "\\n")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,");
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${esc(card.name)}`,
    `TEL;TYPE=CELL:${esc(card.phone)}`,
    `EMAIL:${esc(card.email)}`,
    card.company ? `ORG:${esc(card.company)}` : "",
    card.role ? `TITLE:${esc(card.role)}` : "",
    card.website ? `URL:${esc(safeWeb(card.website))}` : "",
    card.address ? `ADR;TYPE=WORK:;;${esc(card.address)};;;;` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

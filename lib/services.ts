// Service catalogue. Images and copy are placeholders that can be replaced
// without touching component code. `options` values are EXAMPLES only.

export type Service = {
  number: string
  slug: string
  name: string
  short: string
  description: string
  image: string
  imageAlt: string
  goodFor: string[]
  // Example option groups — not confirmed specifications.
  options: { label: string; examples: string[] }[]
}

export const services: Service[] = [
  {
    number: "01",
    slug: "business-cards",
    name: "Business Cards",
    short: "The first thing you hand over. Made to be remembered.",
    description:
      "Considered business cards that carry a brand with confidence — from paper weight and finish to the feel of the edge in hand.",
    image: "/work/hero-business-cards.png",
    imageAlt: "Stack of premium matte black business cards showing layered paper edges",
    goodFor: ["Corporate teams", "Sales teams", "Networking", "Client meetings", "Events"],
    options: [
      { label: "Paper", examples: ["Uncoated", "Textured", "Heavy cotton"] },
      { label: "Finish", examples: ["Matte", "Emboss", "Foil"] },
      { label: "Size", examples: ["Standard", "Square", "Custom"] },
      { label: "Quantity", examples: ["100", "250", "500", "1000+"] },
    ],
  },
  {
    number: "02",
    slug: "corporate-gifts",
    name: "Corporate Gifts",
    short: "Branded pieces people actually want to keep.",
    description:
      "Thoughtfully selected and branded gift items that extend a brand beyond the office and into everyday hands.",
    image: "/work/corporate-gifts.png",
    imageAlt: "Branded notebook, pen and canvas tote arranged on a concrete surface",
    goodFor: ["Client gifting", "Onboarding kits", "Events", "Team welcome packs"],
    options: [
      { label: "Items", examples: ["Notebooks", "Pens", "Bottles", "Totes"] },
      { label: "Branding", examples: ["Print", "Emboss", "Engrave"] },
      { label: "Packaging", examples: ["Gift box", "Sleeve", "Wrap"] },
    ],
  },
  {
    number: "03",
    slug: "roll-up-banners",
    name: "Roll-Up Banners",
    short: "Presence that stands on its own.",
    description:
      "Clean, high-impact pull-up banners for events, showrooms and reception spaces where a brand needs to hold the room.",
    image: "/work/large-format.png",
    imageAlt: "Tall blank roll-up banner standing in a minimal concrete interior",
    goodFor: ["Exhibitions", "Showrooms", "Reception areas", "Conferences"],
    options: [
      { label: "Size", examples: ["Standard", "Wide", "Custom"] },
      { label: "Base", examples: ["Standard", "Premium", "Double-sided"] },
      { label: "Material", examples: ["Matte", "Satin"] },
    ],
  },
  {
    number: "04",
    slug: "flyers",
    name: "Flyers",
    short: "A clear message, printed to be handed over.",
    description:
      "Crisp, well-produced flyers for campaigns, launches and in-store communication that feel considered rather than disposable.",
    image: "/work/corporate-print.png",
    imageAlt: "Arrangement of corporate printed materials on a graphite surface",
    goodFor: ["Launches", "Promotions", "In-store", "Events"],
    options: [
      { label: "Size", examples: ["A6", "A5", "A4", "Custom"] },
      { label: "Paper", examples: ["Silk", "Uncoated", "Recycled"] },
      { label: "Finish", examples: ["Matte", "Gloss"] },
    ],
  },
  {
    number: "05",
    slug: "brochures",
    name: "Brochures",
    short: "The full story, in the right order.",
    description:
      "Folded and bound brochures that present a brand, a project or a portfolio with editorial pacing and a premium finish.",
    image: "/work/brochure.png",
    imageAlt: "Open tri-fold brochure with blank pages showing fold detail",
    goodFor: ["Company profiles", "Real estate", "Product ranges", "Portfolios"],
    options: [
      { label: "Format", examples: ["Tri-fold", "Bi-fold", "Booklet"] },
      { label: "Binding", examples: ["Saddle stitch", "Perfect bound"] },
      { label: "Finish", examples: ["Matte", "Soft-touch", "Spot detail"] },
    ],
  },
  {
    number: "06",
    slug: "corporate-apparel",
    name: "Corporate Apparel",
    short: "Your team, consistently on brand.",
    description:
      "Branded apparel and uniforms produced with attention to fabric, fit and finish for teams that represent the brand in person.",
    image: "/work/apparel.png",
    imageAlt: "Neatly folded premium cotton t-shirts and a cap on a graphite surface",
    goodFor: ["Retail teams", "Hospitality staff", "Events", "Uniforms"],
    options: [
      { label: "Garment", examples: ["T-shirts", "Polos", "Caps", "Aprons"] },
      { label: "Branding", examples: ["Print", "Embroidery"] },
      { label: "Fabric", examples: ["Cotton", "Blend"] },
    ],
  },
  {
    number: "07",
    slug: "corporate-printing",
    name: "Corporate Printing",
    short: "The everyday essentials, done properly.",
    description:
      "A complete set of corporate print — stationery, forms and internal materials — kept consistent across every touchpoint.",
    image: "/work/corporate-stationery.png",
    imageAlt: "Overhead flatlay of corporate stationery: letterhead, folder and envelope",
    goodFor: ["Offices", "Operations", "Client-facing teams"],
    options: [
      { label: "Items", examples: ["Letterheads", "Envelopes", "Folders", "Forms"] },
      { label: "Paper", examples: ["Uncoated", "Textured"] },
      { label: "Finish", examples: ["Matte", "Emboss"] },
    ],
  },
  {
    number: "08",
    slug: "packaging",
    name: "Packaging",
    short: "The moment a brand is opened.",
    description:
      "Branded packaging and boxes that protect the product and carry the brand through the unboxing experience.",
    image: "/work/packaging.png",
    imageAlt: "Set of premium matte rigid packaging boxes stacked on a dark surface",
    goodFor: ["Retail", "E-commerce", "Hospitality", "Gifting"],
    options: [
      { label: "Type", examples: ["Rigid box", "Folding carton", "Sleeve"] },
      { label: "Finish", examples: ["Matte", "Soft-touch", "Emboss"] },
      { label: "Insert", examples: ["Foam", "Card", "Fabric"] },
    ],
  },
  {
    number: "09",
    slug: "stickers-labels",
    name: "Stickers & Labels",
    short: "Small details that finish the piece.",
    description:
      "Die-cut stickers and product labels for packaging, promotions and finishing touches that hold up close.",
    image: "/work/stickers-labels.png",
    imageAlt: "Blank die-cut stickers and product labels arranged on a light surface",
    goodFor: ["Product labels", "Packaging seals", "Promotions", "Branding"],
    options: [
      { label: "Shape", examples: ["Die-cut", "Circle", "Square", "Custom"] },
      { label: "Material", examples: ["Paper", "Vinyl", "Clear"] },
      { label: "Finish", examples: ["Matte", "Gloss"] },
    ],
  },
  {
    number: "10",
    slug: "letterheads",
    name: "Letterheads",
    short: "Correspondence that carries the brand.",
    description:
      "Refined letterheads and correspondence sets that keep official communication consistent and considered.",
    image: "/work/letterheads.png",
    imageAlt: "Single premium letterhead sheet on a textured desk with a fountain pen",
    goodFor: ["Official correspondence", "Proposals", "Contracts", "Statements"],
    options: [
      { label: "Size", examples: ["A4", "US Letter"] },
      { label: "Paper", examples: ["Uncoated", "Cotton", "Textured"] },
      { label: "Detail", examples: ["Print", "Emboss", "Foil"] },
    ],
  },
  {
    number: "11",
    slug: "other-printing-solutions",
    name: "Other Printing Solutions",
    short: "If it can be printed well, we can help.",
    description:
      "Have something specific in mind? Share the idea and we will work through the right materials, format and finish with you.",
    image: "/work/studio-detail.png",
    imageAlt: "Freshly printed sheets stacked with aligned edges in a print studio",
    goodFor: ["Custom projects", "Special formats", "Mixed material runs"],
    options: [
      { label: "Approach", examples: ["Custom brief", "Material sampling"] },
      { label: "Formats", examples: ["Small run", "Large format", "Mixed"] },
    ],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

// Options for the enquiry form service dropdown.
export const serviceOptions = [
  "Business Cards",
  "Corporate Gifts",
  "Roll-Up Banners",
  "Flyers",
  "Brochures",
  "Corporate Apparel",
  "Corporate Printing",
  "Packaging",
  "Stickers & Labels",
  "Letterheads",
  "Other",
]

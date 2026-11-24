// Client names and images approved by the user for publication on 20 November 2026.
// Do not infer production specifications or project outcomes from photographs.
export type WorkCategory =
  | "Business Cards & Stationery"
  | "Corporate Gifts"
  | "Apparel"
  | "Packaging"
  | "Events & Promotional Merchandise"
  | "Digital Business Cards";
export type WorkItem = {
  slug: string;
  title: string;
  category: WorkCategory;
  image: string;
  imageAlt: string;
  client: string;
  size?: "wide" | "tall" | "regular";
  note?: string;
  description: string;
  relatedProducts: string[];
  gallery: { src: string; alt: string }[];
  specifications?: { label: string; value: string }[];
  video?: string;
  deliverables: string[];
  // Publish project narratives only after the client supplies and approves the facts.
  caseStudy?: {
    approved: boolean;
    brief: string;
    challenge: string;
    approach: string;
    outcome: string;
    lessons: string[];
  };
};
export const workItems: WorkItem[] = [
  {
    slug: "business-cards",
    title: "Business Cards",
    category: "Business Cards & Stationery",
    image: "/work/maxline-card-after-v2.webp",
    imageAlt:
      "Maxline vertical business-card redesign mockup with rounded corners and sample contact details",
    client: "Maxline",
    deliverables: [
      "Printed business cards",
      "Vertical card design with rounded corners",
    ],
    size: "wide",
    note: "Mockups use sample contact details; QR codes are blurred.",
    description:
      "A business-card project for Maxline, bringing the company’s identity into an everyday point of contact. The redesign moves from a horizontal layout to a vertical format, with rounded corners and a prominent blue contact area.",
    relatedProducts: ["business-cards", "corporate-printing"],
    gallery: [
      {
        src: "/work/maxline-card-after-v2.webp",
        alt: "Maxline redesigned vertical business cards",
      },
    ],
  },
  {
    slug: "exhibition-banner",
    title: "Roll-Up Banner",
    category: "Events & Promotional Merchandise",
    image: "/work/maxline-banner.jpeg",
    imageAlt: "Completed Maxline roll-up banner displayed in an interior",
    client: "Maxline",
    deliverables: [
      "Branded roll-up banner",
      "Freestanding display shown in the completed-project photograph",
    ],
    size: "tall",
    description:
      "A freestanding roll-up banner for Maxline, translating its corporate identity into a larger display format. The completed piece brings the company’s message into a shared physical space.",
    relatedProducts: ["roll-up-banners", "brochures"],
    gallery: [
      {
        src: "/work/maxline-banner.jpeg",
        alt: "The completed Maxline roll-up banner",
      },
    ],
  },
  {
    slug: "maxline-corporate-gifts",
    title: "Corporate Gifts",
    category: "Corporate Gifts",
    image: "/work/maxline-gifts-mug.webp",
    imageAlt: "Styled image of a black Maxline-branded mug with a contrasting base",
    client: "Maxline",
    deliverables: ["Branded carry bags", "Branded USB drives", "Branded desk accessories", "Branded mugs", "Branded spiral notebooks"],
    description: "A corporate-gifts project for Maxline, carrying its identity across bags, USB drives, desk accessories, mugs and notebooks. A consistent brand presence across a selection of everyday items.",
    note: "Styled product images supplied for this project. Product specifications are confirmed individually for each new order.",
    relatedProducts: ["corporate-gifts"],
    gallery: [
      {src:"/work/maxline-gifts-bag.webp",alt:"Maxline branded carry bag — styled product image"},
      {src:"/work/maxline-gifts-usb.webp",alt:"Maxline branded USB drive — styled product image"},
      {src:"/work/maxline-gifts-desk-accessory.webp",alt:"Maxline branded desk accessory — styled product image"},
      {src:"/work/maxline-gifts-notebook.webp",alt:"Maxline blue spiral notebook with world-map cover — styled product image"},
      {src:"/work/maxline-gifts-mug.webp",alt:"Maxline branded mug — styled product image"},
    ],
  },
  {
    slug: "maxline-polo",
    title: "Branded Polo",
    category: "Apparel",
    image: "/work/maxline-polo.webp",
    imageAlt: "Styled image of a white polo shirt with Maxline branding on the chest",
    client: "Maxline",
    deliverables: ["Maxline-branded polo shirt"],
    description: "A white polo carrying Maxline’s identity on the chest. A simple, consistent presentation for branded corporate apparel.",
    note: "Styled product image supplied for this project. Fabric, sizing and branding methods are confirmed individually for each new order.",
    relatedProducts: ["corporate-apparel"],
    gallery: [{src:"/work/maxline-polo.webp",alt:"White Maxline-branded polo shirt — styled product image"}],
  },
];
export const workFilters: (WorkCategory | "All")[] = [
  "All",
  "Business Cards & Stationery",
  "Corporate Gifts",
  "Apparel",
  "Packaging",
  "Events & Promotional Merchandise",
  "Digital Business Cards",
];

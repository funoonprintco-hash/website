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
};
export const workItems: WorkItem[] = [
  {
    slug: "business-cards",
    title: "Business Cards",
    category: "Business Cards & Stationery",
    image: "/work/Maxline-Business-card.png",
    imageAlt:
      "Completed Maxline business cards showing the front and reverse designs",
    client: "Maxline",
    size: "wide",
    note: "Contact details are obscured for privacy.",
    description:
      "A business-card project for Maxline, bringing the company’s identity into an everyday point of contact. The front and reverse designs balance the brand mark with the information a business card needs to carry.",
    relatedProducts: ["business-cards", "corporate-printing"],
    gallery: [
      {
        src: "/work/Maxline-Business-card.png",
        alt: "Maxline business-card front and reverse",
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

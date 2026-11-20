export const solutions = [
  {
    slug: "corporate-branding",
    name: "Business essentials",
    fullName: "Corporate Branding & Business Essentials",
    description:
      "A consistent first impression, from the first handshake to the next proposal.",
    audience: "Procurement, administration & marketing teams",
    image: "/work/corporate-stationery.png",
    products: [
      "business-cards",
      "letterheads",
      "corporate-printing",
      "brochures",
    ],
    details:
      "Coordinate business cards, stationery and company literature around one set of brand guidelines. Share your artwork, team requirements and preferred finishes so we can build a consistent specification.",
    applications: [
      "Company stationery suites",
      "Sales and presentation materials",
      "New office branding",
      "Recurring departmental print requirements",
    ],
  },
  {
    slug: "corporate-gifts",
    name: "Gifts & welcome kits",
    fullName: "Corporate Gifts & Employee Welcome Kits",
    description:
      "Thoughtful introductions. Lasting connections. Gifts with a purpose.",
    audience: "HR, people & client relationship teams",
    image: "/work/corporate-gifts.png",
    products: ["corporate-gifts", "packaging"],
    details:
      "Bring useful branded products together for a warm employee welcome or a considered client gift. We help you think through the items, presentation and quantities as a complete kit.",
    applications: [
      "Employee onboarding",
      "Client appreciation",
      "Team milestones",
      "Event delegate gifts",
    ],
  },
  {
    slug: "packaging-retail",
    name: "Packaging & retail",
    fullName: "Packaging & Retail Branding",
    description: "Make the unboxing as considered as the product inside.",
    audience: "Retail, hospitality & e-commerce teams",
    image: "/work/packaging.png",
    products: ["packaging", "stickers-labels"],
    details:
      "Build a coherent packaging experience with boxes, sleeves, labels and inserts. Dimensions, material choices and finishing are scoped around your product and how it will be delivered.",
    applications: [
      "Product launches",
      "Retail packaging",
      "Hospitality gifting",
      "Presentation and sample kits",
    ],
  },
  {
    slug: "apparel-uniforms",
    name: "Apparel & uniforms",
    fullName: "Corporate Apparel & Uniforms",
    description: "A shared identity, worn with confidence.",
    audience: "HR, operations & customer-facing teams",
    image: "/work/apparel.png",
    products: ["corporate-apparel"],
    details:
      "Choose branded apparel with the role, fit and day-to-day use in mind. We coordinate garment options, size breakdowns and branding placement before production.",
    applications: [
      "Staff uniforms",
      "Event team clothing",
      "Branded polos and T-shirts",
      "Corporate merchandise",
    ],
  },
  {
    slug: "events-exhibitions",
    name: "Events & exhibitions",
    fullName: "Events & Exhibitions",
    description:
      "Bring your brand into the room, and keep it in people’s hands.",
    audience: "Event organizers, marketing & real estate teams",
    image: "/work/large-format.png",
    products: ["roll-up-banners", "flyers", "brochures", "corporate-gifts"],
    details:
      "Coordinate display graphics, printed collateral and giveaways for your next event. A single brief helps keep the message, colour and timing aligned across the full set.",
    applications: [
      "Exhibitions and conferences",
      "Property launches",
      "Corporate events",
      "Reception and showroom displays",
    ],
  },
  {
    slug: "custom-merchandise",
    name: "Custom merchandise",
    fullName: "Custom Merchandise & Promotional Products",
    description:
      "Useful objects. Distinctive branding. More ways to be remembered.",
    audience: "Marketing, campaign & procurement teams",
    image: "/work/stickers-labels.png",
    products: [
      "corporate-gifts",
      "stickers-labels",
      "other-printing-solutions",
    ],
    details:
      "Turn a campaign idea into tangible branded products. We work through the purpose, audience, quantities and branding method to find an appropriate direction.",
    applications: [
      "Brand campaigns",
      "Promotional giveaways",
      "Community and team merchandise",
      "Custom sourcing briefs",
    ],
  },
];
export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

// Portfolio / work items. These are PLACEHOLDER examples using premium mockups.
// Replace `image`, `title` and `client` with real project data when available.

export type WorkCategory =
  | "Business Cards"
  | "Corporate"
  | "Packaging"
  | "Gifts"
  | "Apparel"
  | "Large Format"
  | "Print"

export type WorkItem = {
  slug: string
  title: string
  category: WorkCategory
  image: string
  imageAlt: string
  // Placeholder — no real client names are used.
  client: string
  size?: "wide" | "tall" | "regular"
}

export const workItems: WorkItem[] = [
  {
    slug: "layered-business-cards",
    title: "Layered Business Cards",
    category: "Business Cards",
    image: "/work/hero-business-cards.png",
    imageAlt: "Stack of premium matte black business cards with visible paper edges",
    client: "Example Project",
    size: "tall",
  },
  {
    slug: "corporate-identity-set",
    title: "Corporate Identity Set",
    category: "Corporate",
    image: "/work/corporate-print.png",
    imageAlt: "Cohesive corporate print identity set arranged on a graphite surface",
    client: "Example Project",
    size: "wide",
  },
  {
    slug: "rigid-packaging-series",
    title: "Rigid Packaging Series",
    category: "Packaging",
    image: "/work/packaging.png",
    imageAlt: "Premium matte rigid packaging boxes stacked on a dark surface",
    client: "Example Project",
    size: "regular",
  },
  {
    slug: "client-gift-set",
    title: "Client Gift Set",
    category: "Gifts",
    image: "/work/corporate-gifts.png",
    imageAlt: "Branded notebook, pen and canvas tote arranged on concrete",
    client: "Example Project",
    size: "regular",
  },
  {
    slug: "team-apparel",
    title: "Team Apparel",
    category: "Apparel",
    image: "/work/apparel.png",
    imageAlt: "Folded premium cotton apparel and a cap on a graphite surface",
    client: "Example Project",
    size: "regular",
  },
  {
    slug: "exhibition-banner",
    title: "Roll-Up Banner",
    category: "Large Format",
    image: "/work/maxline-banner.jpeg",
    imageAlt: "Maxline Global Logistic Solutions pull-up banner with blue chevron design in a corporate lobby",
    client: "Maxline",
    size: "tall",
  },
  {
    slug: "corporate-stationery",
    title: "Corporate Stationery",
    category: "Print",
    image: "/work/corporate-stationery.png",
    imageAlt: "Corporate stationery flatlay with letterhead, folder and envelope",
    client: "Example Project",
    size: "wide",
  },
  {
    slug: "product-labels",
    title: "Product Labels",
    category: "Print",
    image: "/work/stickers-labels.png",
    imageAlt: "Die-cut stickers and product labels arranged on a light surface",
    client: "Example Project",
    size: "regular",
  },
  {
    slug: "folded-brochure",
    title: "Folded Brochure",
    category: "Print",
    image: "/work/brochure.png",
    imageAlt: "Open tri-fold brochure showing fold and paper detail",
    client: "Example Project",
    size: "regular",
  },
]

export const workFilters: (WorkCategory | "All")[] = [
  "All",
  "Business Cards",
  "Corporate",
  "Packaging",
  "Gifts",
  "Apparel",
  "Large Format",
  "Print",
]

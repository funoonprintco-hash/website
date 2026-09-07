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
    slug: "business-cards",
    title: "Business Cards",
    category: "Business Cards",
    image: "/work/hero-business-cards.png",
    imageAlt: "Stack of premium matte black business cards with visible paper edges",
    client: "",
    size: "tall",
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
]

export const workFilters: (WorkCategory | "All")[] = [
  "All",
  "Business Cards",
  "Large Format",
]

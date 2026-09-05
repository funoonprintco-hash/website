export type Industry = {
  number: string
  name: string
  description: string
  image: string
  imageAlt: string
}

export const industries: Industry[] = [
  {
    number: "01",
    name: "Corporate",
    description:
      "Business essentials, stationery, gifts, apparel and branded materials.",
    image: "/work/corporate-stationery.png",
    imageAlt: "Corporate stationery set arranged neatly on a surface",
  },
  {
    number: "02",
    name: "Real Estate",
    description:
      "Presentation materials, brochures, folders, signage and client-facing collateral.",
    image: "/work/brochure.png",
    imageAlt: "Premium brochure and presentation materials",
  },
  {
    number: "03",
    name: "Hospitality",
    description:
      "Menus, packaging, labels, promotional materials and branded items for premium cafés and restaurants.",
    image: "/work/packaging.png",
    imageAlt: "Premium branded packaging for hospitality",
  },
]

import Image from "next/image";
import Link from "next/link";
export function PageIntro({
  title,
  description,
  dark = false,
  children,
}: {
  title: string;
  description: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-intro ${dark ? "dark-surface" : ""}`}>
      <div className="shell">
        <h1>{title}</h1>
        <div className="intro-bottom">
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
export function ProductImage({
  src,
  alt,
  concept = false,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  concept?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`product-image ${className}`}>
      <Image
        src={src}
        unoptimized={src === "/work/funoon-business-card-hq.webp"}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 45vw"
        className="object-contain"
        priority={priority}
      />
      {concept && <figcaption>Product concept</figcaption>}
    </figure>
  );
}
export function ProjectCTA({
  title = "Let’s make your brand impossible to overlook.",
  label = "Start Your Project",
  href = "/quote",
}: {
  title?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="project-cta">
      <div className="shell">
        <h2>{title}</h2>
        <Link href={href} className="button button-black">
          {label}
        </Link>
      </div>
    </section>
  );
}
export const process = [
  [
    "Understand",
    "Tell us about your brand, quantities, budget and delivery requirements.",
  ],
  [
    "Recommend",
    "We work through suitable products, materials and finishing options.",
  ],
  [
    "Quote & approve",
    "Review the quotation and artwork proof before production is confirmed.",
  ],
  [
    "Produce & check",
    "Production follows the agreed specification, with checks on the finished pieces.",
  ],
  [
    "Deliver & support",
    "Coordinate delivery and keep the details ready for your next enquiry.",
  ],
];
export function Process() {
  return (
    <section className="section shell">
      <div className="section-heading">
        <h2>
          A considered process.
          <br />
          From brief to delivery.
        </h2>
        <p>
          Clear steps. Shared expectations.
          <br />
          Attention at every stage.
        </p>
      </div>
      <ol className="process-list">
        {process.map(([title, copy], i) => (
          <li key={title}>
            <span className="process-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

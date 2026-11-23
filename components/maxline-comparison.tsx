import Image from "next/image";
export function MaxlineComparison() {
  return (
    <section
      className="maxline-comparison"
      aria-label="Maxline business card before and after"
    >
      <div className="comparison-images">
        <figure>
          <figcaption>
            <strong>Before</strong>
            <span>Original horizontal design</span>
          </figcaption>
          <Image
            src="/work/maxline-card-before-v2.webp"
            alt="Original Maxline horizontal business card with square corners, showing both sides; sample contact details"
            width={1672}
            height={941}
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </figure>
        <figure>
          <figcaption>
            <strong>After</strong>
            <span>Funoon’s bilingual vertical redesign</span>
          </figcaption>
          <Image
            src="/work/maxline-card-after-v2.webp"
            alt="Redesigned Maxline vertical business cards with rounded corners and a blue contact area; sample contact details and blurred QR codes"
            width={1254}
            height={1254}
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </figure>
      </div>
      <p className="image-note">
        Design mockups use sample names and contact details. QR codes are blurred.
      </p>
    </section>
  );
}

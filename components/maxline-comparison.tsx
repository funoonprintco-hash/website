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
            src="/work/maxline-card-before.webp"
            alt="Original Maxline horizontal business card with square corners, showing both sides; contact details obscured"
            width={1672}
            height={941}
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </figure>
        <figure>
          <figcaption>
            <strong>After</strong>
            <span>Funoon’s vertical redesign</span>
          </figcaption>
          <Image
            src="/work/maxline-card-after.webp"
            alt="Redesigned Maxline vertical business cards with rounded corners and a blue contact area; contact details and QR codes obscured"
            width={1254}
            height={1254}
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </figure>
      </div>
      <p className="image-note">
        Client-approved design mockups. Contact details and QR codes are
        obscured for privacy.
      </p>
    </section>
  );
}

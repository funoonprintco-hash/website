import { site } from "@/lib/site";
export function ContactDetails() {
  return (
    <div className="contact-details">
      <div>
        <h2>Speak with us</h2>
        <a href={site.phoneHref}>{site.phone}</a>
        <a href={site.whatsappHref} className="text-link">
          Message on WhatsApp
        </a>
      </div>
      <div>
        <h2>Write to us</h2>
        <a href={site.emailHref}>{site.email}</a>
      </div>
      <div>
        <h2>Find us</h2>
        <address>
          {site.name}
          <br />
          {site.address}
        </address>
        <a
          className="text-link"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
      <div className="contact-note">
        <h2>What happens next?</h2>
        <p>
          We review your brief, clarify the requirements and discuss a
          quotation. Artwork and production details are agreed before work
          proceeds.
        </p>
      </div>
    </div>
  );
}

import { ProductImage } from "@/components/editorial";
import { workItems } from "@/lib/portfolio";
export function CorporateGiftGallery() {
  const items = workItems.filter(w => w.category === "Corporate Gifts").flatMap(w => w.gallery);
  return <section className="shell section gift-samples">
    <div className="section-heading"><h2>Corporate gifts we’ve made.</h2><p>Explore samples from our work. Styled product images.</p></div>
    <div className="gift-sample-grid">{items.map(item => <div key={item.src}><ProductImage src={item.src} alt={item.alt} /><h3>{item.alt.replace(/^Maxline branded /, "").replace(/^Maxline blue spiral notebook with world-map cover/, "Spiral notebook").replace(/ — styled product image$/, "")}</h3></div>)}</div>
  </section>;
}

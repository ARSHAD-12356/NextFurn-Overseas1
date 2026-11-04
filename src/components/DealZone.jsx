import imgChair from '../assets/deal-zone/deal-chair-cutout.png';
import imgWorkstation from '../assets/deal-zone/deal-workstation-cutout.png';
import imgStudy from '../assets/deal-zone/deal-study-space-cutout.png';
import imgLounge from '../assets/deal-zone/deal-lounge-sofa.png';
import imgPublicSeating from '../assets/deal-zone/deal-public-seating.png';
import '../styles/deal-zone.css';

const DEALS = [
  { image: imgChair, alt: 'Black ergonomic mesh office chair', title: 'Best Buys', subtitle: 'Under ₹10,000', visual: 'chair' },
  { image: imgWorkstation, alt: 'Modular workstation with desks, partitions and chairs', title: 'Clearance Sale', badge: '140+ Options', visual: 'workstation' },
  { image: imgStudy, alt: 'Study tables and chairs with books and a plant', title: 'Study Space', subtitle: 'Deals for every learner', visual: 'study' },
  { image: imgLounge, alt: 'NF-Regal upholstered sofa', title: 'Lounge Deals', subtitle: 'Comfort made timeless', visual: 'lounge' },
  { image: imgPublicSeating, alt: 'NF-Bennett two-seat public seating', title: 'Public Seating', subtitle: 'Comfort for shared spaces', visual: 'seating' },
];

export default function DealZone() {
  return (
    <section className="deal-zone" aria-labelledby="deal-zone-title">
      <div className="deal-zone__inner">
        <h2 id="deal-zone-title">Deal Zone</h2>
        <div className="deal-zone__rail" role="region" aria-label="Furniture deals">
          <div className="deal-zone__track">
            {[false, true].map((isDuplicate) => (
              <div
                className="deal-zone__group"
                role="list"
                aria-label={isDuplicate ? undefined : 'Furniture deals'}
                aria-hidden={isDuplicate || undefined}
                key={isDuplicate ? 'duplicate' : 'original'}
              >
                {DEALS.map((deal) => (
                  <article className={`deal-zone__card deal-zone__card--${deal.visual}`} role="listitem" key={deal.title}>
                    <img className="deal-zone__visual" src={deal.image} alt={deal.alt} loading="lazy" decoding="async" draggable="false" />
                    <div className="deal-zone__copy">
                      <h3>{deal.title}</h3>
                      {deal.badge ? (
                        <p className="deal-zone__badge">{deal.badge}</p>
                      ) : (
                        <p className="deal-zone__subtitle">{deal.subtitle}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

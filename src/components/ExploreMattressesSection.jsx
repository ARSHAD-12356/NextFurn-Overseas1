import { MATTRESSES } from '../data/mattresses.js';
import { TvUnitGrid } from './ExploreTvUnitsSection.jsx';
import '../styles/mattress-banner.css';

export default function ExploreMattressesSection({ onNavigate, onNavigateProduct }) {
  return (
    <section className="explore-tv-units explore-mattresses" aria-labelledby="explore-mattresses-title">
      <div className="explore-tv-units__inner">
        <div className="explore-tv-units__heading-row">
          <h2 id="explore-mattresses-title">Explore Our Mattresses</h2>
          <a
            className="explore-tv-units__view-all"
            href="/mattresses"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.('mattresses');
            }}
          >
            <span>View All</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </a>
        </div>
        <TvUnitGrid products={MATTRESSES} label="Mattresses" onNavigateProduct={onNavigateProduct} rail />
      </div>
    </section>
  );
}

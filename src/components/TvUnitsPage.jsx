import { TV_UNITS } from '../data/tvUnits.js';
import { TvUnitGrid } from './ExploreTvUnitsSection.jsx';

export default function TvUnitsPage({ onNavigateProduct }) {
  return (
    <main className="tv-units-page">
      <section className="tv-units-page__inner" aria-labelledby="tv-units-page-title">
        <h1 id="tv-units-page-title">TV Cabinets</h1>
        <TvUnitGrid products={TV_UNITS} onNavigateProduct={onNavigateProduct} />
      </section>
    </main>
  );
}

import { MATTRESSES } from '../data/mattresses.js';
import { TvUnitGrid } from './ExploreTvUnitsSection.jsx';

export default function MattressesPage({ onNavigateProduct }) {
  return (
    <main className="tv-units-page tv-units-page--mattresses">
      <section className="tv-units-page__inner" aria-labelledby="mattresses-page-title">
        <h1 id="mattresses-page-title">Mattresses</h1>
        <TvUnitGrid products={MATTRESSES} label="Mattresses" onNavigateProduct={onNavigateProduct} />
      </section>
    </main>
  );
}

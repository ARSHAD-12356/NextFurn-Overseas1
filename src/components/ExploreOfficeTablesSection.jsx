import { PRODUCTS, slugify } from '../data/products.js';
import '../styles/explore-office-tables.css';

const OFFICE_TABLE_IDS = ['charm', 'colton', 'emerson', 'revival'];
const OFFICE_TABLE_SUBHEADINGS = {
  charm: 'Teakwood finish with a polished tile top',
  colton: 'Veneer finish with PU paint',
  emerson: 'Laminated finish with PU paint',
  revival: 'Membrane finish with PU paint',
};
const OFFICE_TABLES = OFFICE_TABLE_IDS.map((id) => {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) throw new Error(`Missing office table product: ${id}`);
  return product;
});

const formatINR = (price) => `₹${price.toLocaleString('en-IN')}`;

export default function ExploreOfficeTablesSection({ onNavigate, onNavigateProduct }) {
  return (
    <section className="explore-office-tables" aria-labelledby="explore-office-tables-title">
      <div className="explore-office-tables__inner">
        <div className="explore-office-tables__heading-row">
          <h2 id="explore-office-tables-title">Explore Office Tables</h2>
          <a
            className="explore-office-tables__view-all"
            href="/executive-office-tables"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.('executive-office-tables');
            }}
          >
            <span>View All</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </a>
        </div>
        <div className="explore-office-tables__rail" role="list" aria-label="Office tables">
          {OFFICE_TABLES.map((product) => (
            <div className="explore-office-tables__item" role="listitem" key={product.id}>
              <a
                className="explore-office-tables__card"
                href={`/product/${product.slug || slugify(product.name)}`}
                onClick={(event) => {
                  event.preventDefault();
                  const slug = product.slug || slugify(product.name);
                  if (onNavigateProduct) {
                    onNavigateProduct(slug);
                  } else {
                    window.location.hash = `#product/${slug}`;
                  }
                }}
              >
                <img
                  className="explore-office-tables__image"
                  src={product.variants[0].image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                />
                <span className="explore-office-tables__details">
                  <span className="explore-office-tables__name">{product.name}</span>
                  <span className="explore-office-tables__subtitle">{OFFICE_TABLE_SUBHEADINGS[product.id]}</span>
                  <span className="explore-office-tables__price">{formatINR(product.variants[0].price)}</span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

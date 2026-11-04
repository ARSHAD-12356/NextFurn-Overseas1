import { useRef, useState } from 'react';
import { ALL_PRODUCTS, slugify } from '../data/products.js';
import { PRODUCT_ROWS } from './NewArrivalsPage.jsx';
import '../styles/new-arrivals-rail.css';

const CATEGORY_LABELS = {
  sofas: 'SOFAS',
  office: 'OFFICE FURNITURE',
  care: 'CARE & LEARNING',
  cafeteria: 'CAFETERIA TABLE',
  storage: 'STORAGE',
  public: 'PUBLIC SEATING',
};

const ARRIVAL_CATEGORY_IDS = ['sofas', 'office', 'care', 'cafeteria', 'storage'];

const ARRIVAL_CARDS = ARRIVAL_CATEGORY_IDS.map((categoryId) => {
  const row = PRODUCT_ROWS.find((item) => item.id === categoryId);
  if (!row) throw new Error(`Missing New Arrivals category: ${categoryId}`);
  const productId = row.products[0];
  const product = ALL_PRODUCTS.find((item) => item.id === productId);
  if (!product) throw new Error(`Missing New Arrivals product: ${productId}`);
  return { row, product };
});

export default function NewArrivalsRail({ onNavigateProduct }) {
  const railRef = useRef(null);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = (event) => {
    if (event.pointerType !== 'mouse') return;
    dragRef.current = { startX: event.clientX, scrollLeft: railRef.current.scrollLeft };
    setIsDragging(true);
  };

  const moveDrag = (event) => {
    if (!dragRef.current) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 5) {
      draggedRef.current = true;
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
    railRef.current.scrollLeft = dragRef.current.scrollLeft - distance;
  };

  const stopDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const openProduct = (event, product) => {
    if (draggedRef.current) {
      event.preventDefault();
      draggedRef.current = false;
      return;
    }
    event.preventDefault();
    const slug = product.slug || slugify(product.name);
    onNavigateProduct(slug, product.variants[0].image);
  };

  return (
    <section className="na-home" aria-labelledby="na-home-title">
      <div className="na-home__inner">
        <header className="na-home__header">
          <p>JUST ARRIVED</p>
          <h2 id="na-home-title">New Arrivals</h2>
        </header>
        <div
          className={`na-home__rail${isDragging ? ' is-dragging' : ''}`}
          ref={railRef}
          role="list"
          aria-label="New arrival furniture"
          tabIndex={0}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
        >
          {ARRIVAL_CARDS.map(({ row, product }, index) => (
            <a
              className="na-home-card"
              role="listitem"
              key={`${row.id}-${product.id}`}
              href={`/product/${product.slug || slugify(product.name)}`}
              aria-label={`View ${product.name}`}
              onClick={(event) => openProduct(event, product)}
            >
              <img
                src={product.variants[0].image}
                alt=""
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
              />
              <div className="na-home-card__copy">
                <h3>{CATEGORY_LABELS[row.id] || product.type}</h3>
                <p>{row.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
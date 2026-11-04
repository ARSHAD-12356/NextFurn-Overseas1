import { useRef } from 'react';
import { TV_UNITS, formatTVUnitPrice } from '../data/tvUnits.js';
import '../styles/tv-units.css';

export function TvUnitCard({ product, onNavigateProduct }) {
  const slug = product.slug || product.id;

  return (
    <a
      className="tv-unit-card"
      href={`/product/${slug}`}
      onClick={(event) => {
        if (onNavigateProduct) {
          event.preventDefault();
          onNavigateProduct(slug, product.image);
        }
      }}
    >
      <img
        className="tv-unit-card__image"
        src={product.image}
        alt={product.name}
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div className="tv-unit-card__details">
        <span className="tv-unit-card__brand">NextFurn</span>
        <h2 className="tv-unit-card__name">{product.name}</h2>
        <div className="tv-unit-card__price-row" aria-label={`${formatTVUnitPrice(product.price)}, was ${formatTVUnitPrice(product.originalPrice)}, ${product.discount}% off`}>
          <span className="tv-unit-card__price">{formatTVUnitPrice(product.price)}</span>
          <span className="tv-unit-card__original-price">{formatTVUnitPrice(product.originalPrice)}</span>
          <span className="tv-unit-card__discount">{product.discount}% OFF</span>
        </div>
      </div>
    </a>
  );
}

export function TvUnitGrid({ products, onNavigateProduct, rail = false, label = 'TV units' }) {
  const railRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);

  const handlePointerDown = (event) => {
    if (!rail || event.pointerType !== 'mouse' || event.button !== 0) return;
    dragRef.current = { startX: event.clientX, scrollLeft: railRef.current.scrollLeft, moved: false };
    event.currentTarget.classList.add('is-dragging');
    event.target.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || !railRef.current) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      railRef.current.scrollLeft = drag.scrollLeft - distance;
    }
  };

  const finishPointerDrag = () => {
    if (dragRef.current?.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
    dragRef.current = null;
    railRef.current?.classList.remove('is-dragging');
  };

  return (
    <div
      ref={railRef}
      className={`tv-units-grid${rail ? ' tv-units-grid--rail' : ''}`}
      role="list"
      aria-label={label}
      onPointerDown={rail ? handlePointerDown : undefined}
      onPointerMove={rail ? handlePointerMove : undefined}
      onPointerUp={rail ? finishPointerDrag : undefined}
      onPointerCancel={rail ? finishPointerDrag : undefined}
      onLostPointerCapture={rail ? finishPointerDrag : undefined}
      onClickCapture={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }
      }}
    >
      {products.map((product) => (
        <div className="tv-units-grid__item" role="listitem" key={product.id}>
          <TvUnitCard product={product} onNavigateProduct={onNavigateProduct} />
        </div>
      ))}
    </div>
  );
}

export default function ExploreTvUnitsSection({ onNavigate, onNavigateProduct }) {
  return (
    <section className="explore-tv-units" aria-labelledby="explore-tv-units-title">
      <div className="explore-tv-units__inner">
        <div className="explore-tv-units__heading-row">
          <h2 id="explore-tv-units-title">Explore TV Units</h2>
          <a
            className="explore-tv-units__view-all"
            href="/tv-units"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.('tv-units');
            }}
          >
            <span>View All</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" />
            </svg>
          </a>
        </div>
        <TvUnitGrid products={TV_UNITS} onNavigateProduct={onNavigateProduct} rail />
      </div>
    </section>
  );
}

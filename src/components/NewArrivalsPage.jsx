import { useRef } from 'react';
import { ALL_PRODUCTS, slugify } from '../data/products.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/new-arrivals.css';

export const PRODUCT_ROWS = [
  { id: 'sofas', title: 'The Sofa Edit', subtitle: 'Comfort made for the way you live.', products: ['modern', 'classic', 'regal', 'diplomat'] },
  { id: 'office', title: 'Work, Refined', subtitle: 'Thoughtful pieces for productive spaces.', products: ['ditto', 'polar', 'feather-hb', 'titan'] },
  { id: 'care', title: 'Made for Every Space', subtitle: 'Furniture that supports learning and wellbeing.', products: ['gk-1000', 'revive', 'cure', 'gk-1003'] },
  { id: 'cafeteria', title: 'Gather Around', subtitle: 'Bring people together with inviting café furniture.', products: ['gc-948', 'gc-928', 'gc-949', 'gc-938'] },
  { id: 'storage', title: 'A Place for Everything', subtitle: 'Smart storage with a clean, considered look.', products: ['gms-vertical', 'gms-lateral', 'gms-10', 'gms-12'] },
  { id: 'public', title: 'Welcome Them In', subtitle: 'Comfortable seating for shared spaces.', products: ['magnum', 'cubis-3', 'bennett-2', 'magnum-ss'] },
];

const ROWS_BEFORE_RIBBON = 3;

const getProducts = (ids) =>
  ids.map((id) => {
    const product = ALL_PRODUCTS.find((item) => item.id === id);
    if (!product) throw new Error(`Missing New Arrivals product: ${id}`);
    return product;
  });

const formatINR = (price) => `₹${price.toLocaleString('en-IN')}`;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function SaleRibbon({ featured = false }) {
  return (
    <aside className={`na-sale-ribbon${featured ? ' na-sale-ribbon--featured' : ''}`} aria-label="Diwali sale">
      <span className="na-sale-ribbon__ornament" aria-hidden="true">✦</span>
      <div className="na-sale-ribbon__sale">
        <span>Big Diwali</span>
        <strong>SALE</strong>
      </div>
      <span className="na-sale-ribbon__divider" aria-hidden="true" />
      <p className="na-sale-ribbon__offer">
        <span>UP TO</span>
        <strong>70% OFF</strong>
      </p>
      <span className="na-sale-ribbon__plus" aria-hidden="true">+</span>
      <p className="na-sale-ribbon__discount">
        <span>UP TO</span>
        <strong>₹25,000</strong>
        <small>INSTANT DISCOUNT<sup>*</sup><br />on Bank EMI</small>
      </p>
      <span className="na-sale-ribbon__terms">*T&amp;C Apply</span>
      <span className="na-sale-ribbon__ornament" aria-hidden="true">✦</span>
    </aside>
  );
}

function ProductCard({ product, onNavigateProduct }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const variant = product.variants[0];
  const slug = product.slug || slugify(product.name);
  const liked = isWishlisted(product.id);

  const navigate = (event) => {
    event.preventDefault();
    if (onNavigateProduct) {
      onNavigateProduct(slug, variant.image);
    } else {
      window.location.hash = `#product/${slug}`;
    }
  };

  return (
    <article className="na-card">
      <div className="na-card__media" style={{ '--na-card-image': `url("${variant.image}")` }}>
        <a href={`/product/${slug}`} onClick={navigate} aria-label={`View ${product.name}`}>
          <img src={variant.image} alt={product.name} loading="lazy" decoding="async" draggable="false" />
        </a>
        <button
          type="button"
          className={`na-card__wishlist${liked ? ' is-liked' : ''}`}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={liked}
          onClick={() => toggleWishlist({ ...product, selectedVariant: variant })}
        >
          <HeartIcon filled={liked} />
        </button>
      </div>
      <div className="na-card__body">
        <p className="na-card__category">{product.type}</p>
        <h3 className="na-card__name"><a href={`/product/${slug}`} onClick={navigate}>{product.name}</a></h3>
        <p className="na-card__description">{product.desc}</p>
        <div className="na-card__footer">
          <span className="na-card__price">{formatINR(variant.price)}</span>
          <span className="na-card__variant">{variant.label}</span>
          <a className="na-card__link" href={`/product/${slug}`} onClick={navigate} aria-label={`View details for ${product.name}`}>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

// Lets mouse users drag the row sideways; touch devices keep native swipe scrolling.
function useDragScroll() {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, scrollLeft: 0 });

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const track = trackRef.current;
    drag.current = { active: true, moved: false, startX: event.clientX, scrollLeft: track.scrollLeft };
  };

  const onPointerMove = (event) => {
    const state = drag.current;
    if (!state.active) return;
    const deltaX = event.clientX - state.startX;
    if (!state.moved && Math.abs(deltaX) > 5) {
      state.moved = true;
      trackRef.current.classList.add('is-dragging');
      trackRef.current.setPointerCapture(event.pointerId);
    }
    if (state.moved) trackRef.current.scrollLeft = state.scrollLeft - deltaX;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    trackRef.current.classList.remove('is-dragging');
  };

  // Swallow the click that ends a drag so it doesn't open a product.
  const onClickCapture = (event) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  return {
    ref: trackRef,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onClickCapture,
  };
}

function ProductRow({ row, onNavigateProduct }) {
  const products = getProducts(row.products);
  const dragScroll = useDragScroll();

  return (
    <section className="na-product-row" aria-labelledby={`na-row-${row.id}`}>
      <header className="na-product-row__heading">
        <div>
          <p className="na-product-row__eyebrow">New arrivals</p>
          <h2 id={`na-row-${row.id}`}>{row.title}</h2>
        </div>
        <p>{row.subtitle}</p>
      </header>
      <div className="na-product-grid" {...dragScroll}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onNavigateProduct={onNavigateProduct}
          />
        ))}
      </div>
    </section>
  );
}

export default function NewArrivalsPage({ onNavigate, onNavigateProduct }) {
  const navigateToProducts = (event) => {
    event.preventDefault();
    onNavigate('home', '#products');
  };

  return (
    <main className="new-arrivals-page">
      <div className="new-arrivals-page__shape new-arrivals-page__shape--left" aria-hidden="true" />
      <div className="new-arrivals-page__shape new-arrivals-page__shape--right" aria-hidden="true" />

      <div className="new-arrivals-shell">
        <SaleRibbon />

        <nav className="new-arrivals-breadcrumb" aria-label="Breadcrumb">
          <a href="/" onClick={navigateToProducts}>Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">New Arrivals</span>
        </nav>

        <header className="new-arrivals-hero">
          <p className="new-arrivals-hero__eyebrow">Made for living well</p>
          <h1 id="new-arrivals-title">
            Meet your <em>new favourites.</em>
          </h1>
          <p>Discover thoughtfully designed furniture for the moments and spaces that matter.</p>
        </header>

        <div className="new-arrivals-products-panel">
          <div className="new-arrivals-products" aria-labelledby="new-arrivals-title">
            {PRODUCT_ROWS.map((row, index) => (
              <div key={row.id}>
                {index === ROWS_BEFORE_RIBBON && <SaleRibbon featured />}
                <ProductRow row={row} onNavigateProduct={onNavigateProduct} />
              </div>
            ))}
          </div>
        </div>

        <section className="new-arrivals-cta" aria-labelledby="new-arrivals-cta-title">
          <div className="new-arrivals-cta__content">
            <p>Find your fit</p>
            <h2 id="new-arrivals-cta-title">A better space starts with the right piece.</h2>
            <span>Explore furniture thoughtfully made for your home, office and every space in between.</span>
          </div>
          <a href="/#products" onClick={navigateToProducts}>
            Explore the collection
            <ArrowIcon />
          </a>
        </section>
      </div>
    </main>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, slugify } from '../data/products.js';
import { OFFICE_DETAIL_PRODUCTS } from '../data/officeFurnitureProducts.js';
import imgOffice from '../assets/categories/hd/cat-office-desk-hd.jpg';
import imgSofa from '../assets/categories/hd/cat-sofa-lounge-hd.jpg';
import imgEducation from '../assets/categories/hd/cat-education-hd.jpg';
import imgHealthcare from '../assets/categories/hd/cat-healthcare-hd.jpg';
import imgPublicSeating from '../assets/categories/hd/cat-public-seating-hd.jpg';
import imgCafeteria from '../assets/categories/hd/cat-cafeteria-hd.jpg';
import imgStorage from '../assets/categories/hd/cat-storage-utility-hd.jpg';
import '../styles/our-products.css';

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_MS = 3500;
const formatINR = (n) => `\u20B9${n.toLocaleString('en-IN')}`;

// Exactly 7 categories matching reference specification
const CATEGORY_ITEMS = [
  { id: 'office', label: 'Office', image: imgOffice },
  { id: 'sofa', label: 'Sofa & Lounge', image: imgSofa },
  { id: 'education', label: 'Education', image: imgEducation },
  { id: 'healthcare', label: 'Healthcare', image: imgHealthcare },
  { id: 'public', label: 'Public Seating', image: imgPublicSeating },
  { id: 'cafeteria', label: 'Cafeteria', image: imgCafeteria },
  { id: 'storage', label: 'Storage & Utility', image: imgStorage },
];

const CATEGORY_PAGE_PRODUCTS = {
  office: {
    page: 'office-furniture',
    href: '/office-furniture',
    label: 'Office Furniture',
    products: OFFICE_DETAIL_PRODUCTS,
  },
};

function perViewFor(width) {
  if (width >= 1080) return 4;
  if (width >= 768) return 3;
  if (width >= 520) return 2;
  return 1;
}

function measureSlideStep(track) {
  if (!track?.children.length) return 0;
  const firstSlide = track.children[0];
  const secondSlide = track.children[1];
  const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
  return secondSlide
    ? secondSlide.offsetLeft - firstSlide.offsetLeft
    : firstSlide.getBoundingClientRect().width + gap;
}

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'heart': return <svg {...c}><path d="M12 20s-7-4.35-9.2-8.7C1.3 8.3 3.2 5 6.4 5c2 0 3.3 1.1 3.9 2.2h3.4C14.3 6.1 15.6 5 17.6 5c3.2 0 5.1 3.3 3.6 6.3C19 15.65 12 20 12 20z" /></svg>;
    case 'cart': return <svg {...c} strokeWidth="1.9"><path d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7" /><circle cx="10" cy="19.5" r="1.4" fill="currentColor" /><circle cx="17" cy="19.5" r="1.4" fill="currentColor" /></svg>;
    case 'check': return <svg {...c} strokeWidth="2.2"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
    default: return null;
  }
}

// Exactly matches 2nd reference image card layout
export function ProductCard({ product, inactive, onNavigateProduct }) {
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [vi] = useState(0);
  const variant = product.variants[vi] || product.variants[0];
  const cartKey = `${product.id}:${variant.model}:${variant.label}`;
  const added = isInCart(cartKey);
  const isLiked = isWishlisted(product.id);
  const priceOnRequest = product.priceOnRequest || variant.price == null;
  const tab = inactive ? -1 : 0;
  const specLabel = variant.label;
  const targetSlug = product.slug || slugify(product.name);

  const handleCardClick = (e) => {
    // Prevent navigation if clicking Add to Cart or Like button
    if (e.target.closest('.fp-card__cart') || e.target.closest('.fp-card__like')) {
      return;
    }
    if (onNavigateProduct) {
      onNavigateProduct(targetSlug);
    } else {
      window.location.hash = `#product/${targetSlug}`;
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      key: cartKey,
      name: product.name,
      model: variant.model,
      spec: variant.label,
      price: variant.price,
      image: variant.image,
      category: product.type,
    });
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onNavigateProduct) {
      onNavigateProduct(targetSlug);
    } else {
      window.location.hash = `#product/${targetSlug}`;
    }
  };

  return (
    <article
      className="fp-card fp-card--clickable"
      data-fp-card
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="fp-card__media">
        <img
          src={variant.image}
          alt={`${product.name} ${variant.label}`}
          className="fp-card__img"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
        <button
          type="button"
          className={`fp-card__like${isLiked ? ' is-liked' : ''}`}
          aria-pressed={isLiked}
          aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          tabIndex={tab}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist({ ...product, selectedVariant: variant });
          }}
        >
          <Icon name="heart" />
        </button>
      </div>

      <div className="fp-card__body">
        {specLabel && (
          <div className="fp-card__spec-wrap">
            <span className="fp-card__spec">{specLabel}</span>
          </div>
        )}
        <p className="fp-card__category">{product.type}</p>
        <h3 className="fp-card__name">
          <a
            href={`#product/${targetSlug}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onNavigateProduct) {
                onNavigateProduct(targetSlug);
              } else {
                window.location.hash = `#product/${targetSlug}`;
              }
            }}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {product.name}
          </a>
        </h3>
        <p className="fp-card__desc">{product.desc}</p>
        <div className="fp-card__price-row">
          <span className={`fp-card__price${priceOnRequest ? ' is-request' : ''}`}>
            {priceOnRequest ? 'Price on request' : formatINR(variant.price)}
          </span>
          <span className="fp-card__model">{variant.model}</span>
        </div>
        <button
          type="button"
          className={`fp-card__cart${!priceOnRequest && added ? ' is-added' : ''}`}
          tabIndex={tab}
          onClick={priceOnRequest ? handleViewDetails : handleAddToCart}
          aria-label={priceOnRequest ? `View details for ${product.name}` : `Add ${product.name} to Cart`}
        >
          <span>{priceOnRequest ? 'View Details' : added ? 'Added to Cart' : 'Add to Cart'}</span>
          <Icon name={priceOnRequest ? 'arrow' : added ? 'check' : 'cart'} />
        </button>
      </div>
    </article>
  );
}

export default function OurProductsSection({ onNavigate, onNavigateProduct, initialCategory, showCategoryGallery = true }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [active, setActive] = useState(() =>
    CATEGORY_ITEMS.some((category) => category.id === initialCategory)
      ? initialCategory
      : CATEGORY_ITEMS[0].id
  );
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const categoryPage = CATEGORY_PAGE_PRODUCTS[active];
  const products = categoryPage?.products || PRODUCTS.filter((p) => p.category === active);
  const pages = Math.max(1, products.length - perView + 1);
  const page = Math.min(index, pages - 1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const updatePv = () => setPerView(perViewFor(el.clientWidth));
    updatePv();
    const ro = new ResizeObserver(([e]) => setPerView(perViewFor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = () => setReducedMotion(mq.matches);
    onMq();
    document.addEventListener('visibilitychange', onVis);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const go = (n) => {
    const next = ((n % pages) + pages) % pages;
    setIndex(next);
    const slideStep = measureSlideStep(trackRef.current);
    if (slideStep) {
      viewportRef.current?.scrollTo({
        left: next * slideStep,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const updatePageFromScroll = () => {
    const viewport = viewportRef.current;
    const slideStep = measureSlideStep(trackRef.current);
    if (!viewport || !slideStep) return;
    const next = Math.max(0, Math.min(pages - 1, Math.round(viewport.scrollLeft / slideStep)));
    setIndex((current) => (current === next ? current : next));
  };

  const startMouseDrag = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    dragRef.current = { startX: event.clientX, scrollLeft: viewportRef.current.scrollLeft, moved: false };
    event.currentTarget.classList.add('is-dragging');
    event.target.setPointerCapture?.(event.pointerId);
  };

  const moveMouseDrag = (event) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      viewport.scrollLeft = drag.scrollLeft - distance;
    }
  };

  const finishMouseDrag = () => {
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
      updatePageFromScroll();
    }
    dragRef.current = null;
    viewportRef.current?.classList.remove('is-dragging');
  };

  const suppressDraggedClick = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  useEffect(() => {
    if (pages < 2 || paused || pageHidden || reducedMotion) return undefined;
    const id = setTimeout(() => go(page + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  });

  const choose = (id) => {
    setActive(id);
    setIndex(0);
    viewportRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  };

  useEffect(() => {
    if (CATEGORY_ITEMS.some((category) => category.id === initialCategory)) {
      setActive(initialCategory);
      setIndex(0);
      viewportRef.current?.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [initialCategory]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia(section);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      const st = (t, start = 'top 82%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });

      if (showCategoryGallery) {
        gsap.from(q('[data-op-head]'), {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: st(q('.op-head')[0], 'top 85%'),
        });

        gsap.from(q('[data-op-cat-card]'), {
          autoAlpha: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: st(q('.op-cat-grid')[0], 'top 86%'),
        });
      }

      gsap.from(q('[data-fp-head]'), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: st(q('.fp-head')[0], 'top 85%'),
      });

      gsap.from(q('[data-fp-card]'), {
        autoAlpha: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: st(q('.fp-viewport')[0], 'top 86%'),
      });
    });
    return () => mm.revert();
  }, [showCategoryGallery]);

  return (
    <section
      id="products"
      className={`op-section${showCategoryGallery ? '' : ' op-section--featured-only'}`}
      ref={sectionRef}
      aria-labelledby={showCategoryGallery ? 'op-title' : 'fp-title'}
    >
      {showCategoryGallery && (
        <>
          {/* ---------------- PART 1: Category Gallery (3 + 3 + 1) ---------------- */}
          <header className="op-head">
            <p className="op-eyebrow" data-op-head>
              <span aria-hidden="true" />
              OUR PRODUCTS
              <span aria-hidden="true" />
            </p>
            <h2 id="op-title" className="op-title" data-op-head>
              Discover Our <span>Complete Range</span>
            </h2>
            <p className="op-subtitle" data-op-head>
              Furniture solutions for every space.
            </p>
          </header>

          <div className="op-cat-grid" role="region" aria-label="Product categories">
            {CATEGORY_ITEMS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`op-cat-card${active === c.id ? ' is-active' : ''}`}
                aria-pressed={active === c.id}
                onClick={() => choose(c.id)}
                data-op-cat-card
              >
                <div className="op-cat-card__media">
                  <img
                    src={c.image}
                    alt={c.label}
                    className="op-cat-card__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="op-cat-card__title">{c.label}</h3>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ---------------- PART 2: Featured Products (Rebuilt Exactly from 2nd Reference Image) ---------------- */}
      <div className="fp-showcase">
        <header className="fp-head">
          <p className="fp-eyebrow" data-fp-head>
            <span aria-hidden="true" />
            FEATURED PRODUCTS
            <span aria-hidden="true" />
          </p>
          <h2 className="fp-title" data-fp-head>
            Most Popular <span>Furniture</span>
          </h2>
          <p className="fp-subtitle" data-fp-head>
            Premium furniture designed for comfort, style and long lasting performance.
          </p>
        </header>

        {/* Category Navigation Bar with Pills and Dividers */}
        <div className="fp-nav-bar" data-fp-head>
          <ul className="fp-tabs" role="tablist" aria-label="Filter featured products">
            {CATEGORY_ITEMS.map((c, i) => (
              <li key={c.id} className="fp-tab-item">
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === c.id}
                  className={`fp-tab${active === c.id ? ' is-active' : ''}`}
                  onClick={() => choose(c.id)}
                >
                  {c.label}
                </button>
                {i < CATEGORY_ITEMS.length - 1 && (
                  <span className="fp-tab-divider" aria-hidden="true">|</span>
                )}
              </li>
            ))}
          </ul>

        </div>

        {/* Product Carousel: 4 cards visible simultaneously on desktop */}
        <div
          className="fp-viewport"
          ref={viewportRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
          onPointerDown={startMouseDrag}
          onPointerMove={moveMouseDrag}
          onPointerUp={finishMouseDrag}
          onPointerCancel={finishMouseDrag}
          onLostPointerCapture={finishMouseDrag}
          onScroll={updatePageFromScroll}
          onClickCapture={suppressDraggedClick}
          onDragStart={(event) => event.preventDefault()}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <ul
            ref={trackRef}
            className="fp-track"
            style={{
              '--pv': perView,
            }}
          >
            {products.map((p, i) => (
              <li key={p.id} className="fp-slide">
                <ProductCard
                  product={p}
                  inactive={i < page || i >= page + perView}
                  onNavigateProduct={onNavigateProduct}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Dots Pagination */}
        {pages > 1 && (
          <div className="fp-dots">
            {Array.from({ length: Math.min(pages, 4) }, (_, i) => {
              const activeDot = Math.min(page, Math.min(pages, 4) - 1);
              return (
                <button
                  key={i}
                  type="button"
                  className={`fp-dot${i === activeDot ? ' is-active' : ''}`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activeDot}
                  onClick={() => go(i)}
                />
              );
            })}
          </div>
        )}

        {categoryPage && (
          <div className="fp-view-all-wrap">
            <a
              className="fp-view-all"
              href={categoryPage.href}
              aria-label={`View all ${categoryPage.label}`}
              onClick={onNavigate ? (event) => {
                event.preventDefault();
                onNavigate(categoryPage.page);
              } : undefined}
            >
              <span>View All</span>
              <Icon name="arrow" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

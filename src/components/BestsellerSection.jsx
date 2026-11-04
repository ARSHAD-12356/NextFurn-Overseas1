import { useLayoutEffect, useRef } from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, slugify } from '../data/products.js';
import '../styles/bestseller-section.css';

import imgDitto from '../assets/bestseller/ditto-grey.jpg';
import imgRevival from '../assets/bestseller/table-revival.jpg';
import imgEquino from '../../Assets/new Bestselling img/furniture 3rd card img.png';
import imgFeather from '../assets/bestseller/feather-hb.jpg';
import imgModularMeeting from '../../Assets/new Bestselling img/Modular meeting table.png';
import imgColton from '../../Assets/new Bestselling img/office table.png';
import imgDiplomat from '../../Assets/new Bestselling img/furniture 2nd card img.png';
import imgTitan from '../assets/bestseller/titan.jpg';
import imgCharm from '../assets/bestseller/table-charm.jpg';
import imgRegal from '../../Assets/new Bestselling img/2 seater sofa.png';

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   Bestseller Products — 10 products in the catalog, 5 fixed in the showcase
   ========================================================================== */
export const BESTSELLER_PRODUCTS = [
  {
    id: 'ditto-grey',
    category: 'Task Chair',
    name: 'Ditto NF Grey Chair',
    rating: 4.5,
    reviews: 98,
    price: 8275,
    image: imgDitto,
    badge: 'Popular',
    badgeType: 'green',
    badgeIcon: 'flame',
    href: '#office-furniture',
  },
  {
    id: 'revival',
    category: 'Office Table',
    name: 'Revival Executive Table',
    rating: 4.5,
    reviews: 27,
    price: 265365,
    image: imgRevival,
    badge: 'Popular',
    badgeType: 'green',
    badgeIcon: 'flame',
    href: '#office-furniture',
  },
  {
    id: 'equino-3',
    category: 'Sofa · Leatherette',
    name: 'Equino 3 Seater Sofa',
    rating: 4.5,
    reviews: 61,
    price: 32310,
    image: imgEquino,
    badge: 'Trending',
    badgeType: 'orange',
    badgeIcon: 'flame',
    href: '#sofas',
  },
  {
    id: 'feather-hb',
    category: 'Mesh High-Back Chair',
    name: 'Feather NF HB Chair',
    rating: 4.5,
    reviews: 120,
    price: 11550,
    image: imgFeather,
    badge: 'Bestseller',
    badgeType: 'orange',
    badgeIcon: 'crown',
    href: '#office-furniture',
  },
  {
    id: 'modular-meeting',
    category: 'Conference Table',
    name: 'Modular Meeting Table',
    rating: 4.5,
    reviews: 43,
    price: 95420,
    image: imgModularMeeting,
    badge: 'Bestseller',
    badgeType: 'green',
    badgeIcon: 'crown',
    href: '#office-furniture',
  },
  {
    id: 'colton',
    category: 'Office Table',
    name: 'Colton Executive Table',
    rating: 4.5,
    reviews: 41,
    price: 367980,
    image: imgColton,
    badge: 'Top Rated',
    badgeType: 'green',
    badgeIcon: 'crown',
    href: '#office-furniture',
  },
  {
    id: 'diplomat-3',
    category: 'Sofa · Leatherette',
    name: 'Diplomat 3 Seater Sofa',
    rating: 4.5,
    reviews: 63,
    price: 50400,
    image: imgDiplomat,
    badge: 'Trending',
    badgeType: 'orange',
    badgeIcon: 'flame',
    href: '#sofas',
  },
  {
    id: 'titan',
    category: 'Executive Chair',
    name: 'Titan NF Chair',
    rating: 4.5,
    reviews: 86,
    price: 17850,
    image: imgTitan,
    badge: 'Best Value',
    badgeType: 'green',
    badgeIcon: 'crown',
    href: '#office-furniture',
  },
  {
    id: 'charm',
    category: 'Office Table',
    name: 'Charm Executive Table',
    rating: 4.5,
    reviews: 38,
    price: 305145,
    image: imgCharm,
    badge: 'Bestseller',
    badgeType: 'orange',
    badgeIcon: 'crown',
    href: '#office-furniture',
  },
  {
    id: 'regal-2',
    category: 'Sofa · Leatherette',
    name: 'Regal 2 Seater Sofa',
    rating: 4.5,
    reviews: 57,
    price: 58950,
    image: imgRegal,
    badge: 'Top Rated',
    badgeType: 'green',
    badgeIcon: 'crown',
    href: '#sofas',
  },
];

const getOurProductCard = (id, badge, badgeType, badgeIcon) => {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return null;
  const variant = product.variants[0];

  return {
    id: product.id,
    slug: product.slug,
    category: product.type,
    name: product.name,
    price: variant.price,
    image: variant.image,
    badge,
    badgeType,
    badgeIcon,
  };
};

const STATIC_BESTSELLER_LAYOUT = [
  BESTSELLER_PRODUCTS.find((product) => product.id === 'modular-meeting'),
  BESTSELLER_PRODUCTS.find((product) => product.id === 'colton'),
  BESTSELLER_PRODUCTS.find((product) => product.id === 'diplomat-3'),
  getOurProductCard('student-1', 'Trending', 'orange', 'flame'),
  getOurProductCard('revive', 'Top Rated', 'green', 'crown'),
];

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

function openProduct(slug, onNavigateProduct, image) {
  if (onNavigateProduct) {
    onNavigateProduct(slug, image);
  } else {
    window.location.hash = `#product/${slug}`;
  }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.35-9.2-8.7C1.3 8.3 3.2 5 6.4 5c2 0 3.3 1.1 3.9 2.2h3.4C14.3 6.1 15.6 5 17.6 5c3.2 0 5.1 3.3 3.6 6.3C19 15.65 12 20 12 20z" />
    </svg>
  );
}

function BadgeIcon({ name }) {
  if (name === 'crown') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 2c1 3.5 5 6 5 11a5 5 0 0 1-10 0c0-2.2 1-3.8 2.3-5 .2 1.8 1.1 3 2.4 3.4C11 9 11 5.2 12 2z" />
    </svg>
  );
}

/* Featured Card Inner Content */
function FeaturedCardContent({ product, onNavigateProduct }) {
  if (!product) return null;
  const slug = product.slug || slugify(product.name);
  const handleCardClick = (e) => {
    if (e.target.closest('.bs-featured-card__btn')) return;
    openProduct(slug, onNavigateProduct, product.image);
  };
  return (
    <article className={`bs-featured-card${product.id === 'modular-meeting' ? ' bs-featured-card--full-bleed' : ''}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={`bs-featured-card__media${product.id === 'modular-meeting' ? ' bs-featured-card__media--full-bleed' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className="bs-featured-card__img"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="bs-featured-card__body">
        <div>
          <p className="bs-featured-card__category">{product.category}</p>
          <h3 className="bs-featured-card__title">{product.name}</h3>
        </div>

        <div className="bs-featured-card__footer">
          <span className="bs-featured-card__price">{formatINR(product.price)}</span>
          <button
            type="button"
            className="bs-featured-card__btn"
            aria-label={`View details for ${product.name}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openProduct(slug, onNavigateProduct, product.image);
            }}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

/* Small Card Inner Content */
function SmallCardContent({ product, isLiked, onToggleLike, onNavigateProduct }) {
  if (!product) return null;
  const slug = product.slug || slugify(product.name);
  const handleCardClick = (e) => {
    if (e.target.closest('.bs-heart-btn')) return;
    openProduct(slug, onNavigateProduct, product.image);
  };
  return (
    <article className={`bs-small-card${product.id === 'regal-2' ? ' bs-small-card--regal' : ''}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={`bs-small-card__media${product.id === 'regal-2' ? ' bs-small-card__media--regal' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className="bs-small-card__img"
          loading="lazy"
          decoding="async"
        />
        {product.badge && (
          <span className={`bs-badge bs-badge--${product.badgeType}`}>
            <BadgeIcon name={product.badgeIcon} />
            {product.badge}
          </span>
        )}
        <button
          type="button"
          className={`bs-heart-btn${isLiked ? ' is-liked' : ''}`}
          aria-label={isLiked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleLike(product);
          }}
        >
          <HeartIcon />
        </button>
      </div>

      <div className="bs-small-card__body">
        <p className="bs-small-card__category">{product.category}</p>
        <h3 className="bs-small-card__title">{product.name}</h3>
        <div className="bs-small-card__footer">
          <span className="bs-small-card__price">{formatINR(product.price)}</span>
          <button
            type="button"
            className="bs-small-card__btn"
            aria-label={`View details for ${product.name}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openProduct(slug, onNavigateProduct, product.image);
            }}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

/* Fixed product slot: keep the screenshot lineup in place without carousel transitions. */
function StaticSlot({ className, product, renderContent }) {
  return (
    <div className={`bs-slot ${className}`}>
      <div className="bs-slot-viewport">
        {renderContent(product)}
      </div>
    </div>
  );
}

export default function BestsellerSection({ onNavigateProduct }) {
  const sectionRef = useRef(null);
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Scroll entrance animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      gsap.from(q('[data-bs-head]'), {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: q('.bs-section__header')[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(q('.bs-layout'), {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: q('.bs-layout')[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="bestsellers"
      className="bs-section"
      ref={sectionRef}
      aria-labelledby="bs-section-title"
    >
      <div className="bs-section__container">
        {/* Section Header */}
        <header className="bs-section__header">
          <p className="bs-section__eyebrow" data-bs-head>
            <span className="bs-section__eyebrow-line" aria-hidden="true" />
            Bestseller Products
            <span className="bs-section__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="bs-section-title" className="bs-section__title" data-bs-head>
            Our <span className="bs-section__title-accent">Bestselling</span> Furniture
          </h2>
          <p className="bs-section__subtitle" data-bs-head>
            Most loved furniture pieces chosen by our customers for their quality, comfort and style.
          </p>
        </header>

        {/* Asymmetric Product Layout */}
        <div className="bs-layout">
          {/* Left Side: Large Featured Card */}
          <StaticSlot
            className="bs-slot--white bs-slot--featured"
            product={STATIC_BESTSELLER_LAYOUT[0]}
            renderContent={(product) => (
              <FeaturedCardContent
                product={product}
                onNavigateProduct={onNavigateProduct}
              />
            )}
          />

          {/* Right Side: 2x2 Grid of 4 Smaller Cards */}
          <div className="bs-grid">
            {/* Slot 1: Top-Left (Peach) */}
            <StaticSlot
              className="bs-slot--peach bs-slot--small-1"
              product={STATIC_BESTSELLER_LAYOUT[1]}
              renderContent={(product) => (
                <SmallCardContent
                  product={product}
                  isLiked={isWishlisted(product.id)}
                  onToggleLike={toggleWishlist}
                  onNavigateProduct={onNavigateProduct}
                />
              )}
            />

            {/* Slot 2: Top-Right (Deep Forest Green) */}
            <StaticSlot
              className="bs-slot--green bs-slot--small-2"
              product={STATIC_BESTSELLER_LAYOUT[2]}
              renderContent={(product) => (
                <SmallCardContent
                  product={product}
                  isLiked={isWishlisted(product.id)}
                  onToggleLike={toggleWishlist}
                  onNavigateProduct={onNavigateProduct}
                />
              )}
            />

            {/* Slot 3: Bottom-Left (Deep Forest Green) */}
            <StaticSlot
              className="bs-slot--green bs-slot--small-3"
              product={STATIC_BESTSELLER_LAYOUT[3]}
              renderContent={(product) => (
                <SmallCardContent
                  product={product}
                  isLiked={isWishlisted(product.id)}
                  onToggleLike={toggleWishlist}
                  onNavigateProduct={onNavigateProduct}
                />
              )}
            />

            {/* Slot 4: Bottom-Right (Peach) */}
            <StaticSlot
              className="bs-slot--peach bs-slot--small-4"
              product={STATIC_BESTSELLER_LAYOUT[4]}
              renderContent={(product) => (
                <SmallCardContent
                  product={product}
                  isLiked={isWishlisted(product.id)}
                  onToggleLike={toggleWishlist}
                  onNavigateProduct={onNavigateProduct}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

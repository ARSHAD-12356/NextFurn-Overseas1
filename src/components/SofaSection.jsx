import { slugify } from '../data/products.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/sofa-section.css';

import imgRegalL from '../assets/sofas/pdf/regal-l.jpg';
import imgZap2 from '../assets/sofas/pdf/zap-2.jpg';
import imgErgo4 from '../assets/sofas/pdf/ergo-4.jpg';
import imgAura3 from '../assets/sofas/pdf/aura-3.jpg';
import imgDiplomat3 from '../assets/sofas/pdf/diplomat-3.jpg';
import imgStephen3 from '../assets/sofas/pdf/stephen-3.jpg';
import imgRegal2 from '../assets/sofas/pdf/regal-2.jpg';
import imgRosemount2 from '../assets/sofas/pdf/rosemount-2.jpg';
import imgEquino3 from '../assets/sofas/pdf/equino-3.jpg';
import imgColumbia2 from '../assets/sofas/pdf/columbia-2.jpg';
import imgBadaSofa from '../../Assets/bada sofa.png';
import imgSofaCard1 from '../../Assets/Bestseller sofa/sofa card 1.png';
import imgSofaCard2 from '../../Assets/Bestseller sofa/sofa card 2.png';
import imgSofaCard3 from '../../Assets/Bestseller sofa/2 seater sofa.png';
import imgSofaCard4 from '../../Assets/Bestseller sofa/sofa card 4.png';

const SMALL_CARD_IMAGES = {
  'stephen-3': imgSofaCard1,
  'regal-2': imgSofaCard2,
  'rosemount-2': imgSofaCard3,
  'equino-3': imgSofaCard4,
};

export const SOFA_PRODUCTS = [
  {
    id: 'regal-l',
    name: 'NF-Regal L-Shape Sofa',
    category: 'SOFA',
    size: '3600 × 3000 × 1000 mm',
    price: 167175,
    finish: 'Asmara Leatherette',
    rating: 5,
    reviews: 28,
    image: imgRegalL,
    badge: { text: 'Bestseller', type: 'green', icon: 'crown' },
  },
  {
    id: 'zap-2',
    name: 'NF-Zap 2 Seater Sofa',
    category: 'SOFA',
    size: '1280 × 755 × 740 mm',
    price: 39960,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 47,
    image: imgZap2,
    badge: { text: 'Bestseller', type: 'green', icon: 'crown' },
  },
  {
    id: 'ergo-4',
    name: 'NF-Ergo 4 Single Seater',
    category: 'SOFA',
    size: '650 × 825 × 860 mm',
    price: 38610,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 36,
    image: imgErgo4,
    badge: { text: 'Trending', type: 'orange', icon: 'flame' },
  },
  {
    id: 'aura-3',
    name: 'NF-Aura 3 Seater Sofa',
    category: 'SOFA',
    size: '2120 × 935 × 850 mm',
    price: 49770,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 52,
    image: imgAura3,
    badge: { text: 'Popular', type: 'orange', icon: 'flame' },
  },
  {
    id: 'diplomat-3',
    name: 'NF-Diplomat 3 Seater Sofa',
    category: 'SOFA',
    size: '2155 × 840 × 760 mm',
    price: 50400,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 63,
    image: imgDiplomat3,
    badge: { text: 'Bestseller', type: 'green', icon: 'crown' },
  },
  {
    id: 'stephen-3',
    name: 'NF-Stephen 3 Seater Sofa',
    category: 'SOFA',
    size: '2120 × 900 × 850 mm',
    price: 59535,
    finish: 'Asmara Leatherette',
    rating: 4.5,
    reviews: 33,
    image: imgStephen3,
    badge: { text: 'Trending', type: 'orange', icon: 'flame' },
  },
  {
    id: 'regal-2',
    name: 'NF-Regal 2 Seater Sofa',
    category: 'SOFA',
    size: '1930 × 1000 × 730 mm',
    price: 58950,
    finish: 'Leatherette',
    rating: 5,
    reviews: 57,
    image: imgRegal2,
    badge: { text: 'Popular', type: 'orange', icon: 'flame' },
  },
  {
    id: 'rosemount-2',
    name: 'NF-Rosemount 2 Seater Sofa',
    category: 'SOFA',
    size: '1860 × 760 × 760 mm',
    price: 37755,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 39,
    image: imgRosemount2,
    badge: { text: 'Trending', type: 'orange', icon: 'flame' },
  },
  {
    id: 'equino-3',
    name: 'NF-Equino 3 Seater Sofa',
    category: 'SOFA',
    size: '1860 × 835 × 785 mm',
    price: 32310,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 61,
    image: imgEquino3,
    badge: { text: 'Bestseller', type: 'green', icon: 'crown' },
  },
  {
    id: 'columbia-2',
    name: 'NF-Columbia 2 Seater Sofa',
    category: 'SOFA',
    size: '1450 × 755 × 750 mm',
    price: 26460,
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 58,
    image: imgColumbia2,
    badge: { text: 'Popular', type: 'orange', icon: 'flame' },
  },
];

const TOTAL_PRODUCTS = SOFA_PRODUCTS.length;
const INITIAL_FEATURED_STEP = SOFA_PRODUCTS.findIndex((product) => product.id === 'diplomat-3');

const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

function Icon({ name, filled }) {
  const c = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'arrow':
      return (
        <svg {...c} strokeWidth="2.4" width="18" height="18">
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'heart':
      return filled ? (
        <svg viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5" width="18" height="18" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg {...c} width="18" height="18">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" width="14" height="14" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="12" height="12" aria-hidden="true">
          <path d="M2 19h20v2H2zM2 5l5 7 5-7 5 7 5-7v11H2z" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="12" height="12" aria-hidden="true">
          <path d="M12 2c-.3 0-.5.2-.6.4C10.3 4.8 7 10 7 14c0 3.3 2.2 6 5 6s5-2.7 5-6c0-2-.8-3.9-1.9-5.4-.2-.3-.6-.3-.8 0-.5.6-1.1 1.2-1.7 1.7-.3.3-.8.1-.8-.3.2-1.7-.1-4.7-.8-8z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SofaSection({ onNavigateProduct }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const navigateToProduct = (p) => {
    const slug = p.slug || slugify(p.name);
    const image = p.id === 'diplomat-3'
      ? imgBadaSofa
      : SMALL_CARD_IMAGES[p.id] || p.image;
    if (onNavigateProduct) {
      onNavigateProduct(slug, image);
    } else {
      window.location.hash = `#product/${slug}`;
    }
  };

  const handleSofaClick = (p) => (e) => {
    if (e.target.closest('.sofa-heart-btn') || e.target.closest('.sofa-arrow-btn')) return;
    navigateToProduct(p);
  };

  const toggleLike = (product) => {
    const image = product.id === 'diplomat-3'
      ? imgBadaSofa
      : SMALL_CARD_IMAGES[product.id] || product.image;
    toggleWishlist({
      ...product,
      selectedVariant: {
        model: product.id,
        label: product.size || product.finish || '',
        price: product.price,
        image,
      },
    });
  };

  const pLarge = SOFA_PRODUCTS[INITIAL_FEATURED_STEP];
  const pTopLeft = SOFA_PRODUCTS[(INITIAL_FEATURED_STEP + 1) % TOTAL_PRODUCTS];
  const pTopRight = SOFA_PRODUCTS[(INITIAL_FEATURED_STEP + 2) % TOTAL_PRODUCTS];
  const pBottomLeft = SOFA_PRODUCTS[(INITIAL_FEATURED_STEP + 3) % TOTAL_PRODUCTS];
  const pBottomRight = SOFA_PRODUCTS[(INITIAL_FEATURED_STEP + 4) % TOTAL_PRODUCTS];

  return (
    <section id="sofas" className="sofa-section" aria-labelledby="sofa-title">
      {/* Rebuilt Bestselling Sofa Collection Showcase */}
      <div
        className="sofa-showcase-section"
      >
        <div className="sofa-showcase-inner">
          {/* Section Header */}
          <div className="sofa-showcase-header">
            <div className="sofa-showcase-eyebrow">
              <span className="sofa-showcase-eyebrow-line" />
              <span>FEATURED SOFAS</span>
              <span className="sofa-showcase-eyebrow-line" />
            </div>
            <h2 className="sofa-showcase-title" id="sofa-title">
              <span className="sofa-title-orange">Bestselling</span>{' '}
              <span className="sofa-title-green">Sofa Collection</span>
            </h2>
            <p className="sofa-showcase-subtitle">
              Our most loved sofas, chosen for their comfort, quality and modern designs.
            </p>
          </div>

          {/* Showcase Cards Grid */}
          <div className="sofa-showcase-grid">
            {/* Large Featured Card (Left) */}
            <div className="sofa-large-card-wrapper">
              <div
                className="sofa-card sofa-large-card"
                onClick={handleSofaClick(pLarge)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`sofa-card-img-wrap sofa-large-img-wrap ${pLarge.id === 'diplomat-3' ? 'sofa-large-img-wrap--bada-sofa' : ''}`}>
                  {pLarge.badge && (
                    <span className={`sofa-badge sofa-badge--${pLarge.badge.type}`}>
                      <Icon name={pLarge.badge.icon} />
                      <span>{pLarge.badge.text}</span>
                    </span>
                  )}
                  <img
                    src={pLarge.id === 'diplomat-3' ? imgBadaSofa : pLarge.image}
                    alt={pLarge.name}
                    className={`sofa-card-img ${pLarge.id === 'diplomat-3' ? 'sofa-card-img--featured-static' : ''}`}
                    loading="eager"
                    decoding="async"
                  />
                  <button
                    type="button"
                    className={`sofa-heart-btn ${isWishlisted(pLarge.id) ? 'is-liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(pLarge);
                    }}
                    aria-label={isWishlisted(pLarge.id) ? `Remove ${pLarge.name} from wishlist` : `Add ${pLarge.name} to wishlist`}
                  >
                    <Icon name="heart" filled={isWishlisted(pLarge.id)} />
                  </button>
                </div>

                <div className="sofa-card-body sofa-large-body">
                  <div className="sofa-card-meta">
                    <span className="sofa-card-cat">{pLarge.category}</span>
                    <h3 className="sofa-card-title sofa-large-title">{pLarge.name}</h3>
                  </div>

                  <div className="sofa-card-footer sofa-large-footer">
                    <div className="sofa-price-group">
                      <span className="sofa-card-price">{formatINR(pLarge.price)}</span>
                      {pLarge.finish && <span className="sofa-material-pill">{pLarge.finish}</span>}
                    </div>
                    <button
                      type="button"
                      className="sofa-arrow-btn sofa-arrow-btn--green"
                      aria-label={`View details for ${pLarge.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigateToProduct(pLarge);
                      }}
                    >
                      <Icon name="arrow" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Small Cards Grid (Right 2x2) */}
            <div className="sofa-small-grid">
              {/* Card 1: Top-Left (Peach Theme) */}
              <div className="sofa-small-card-wrapper">
                <div
                  className="sofa-card sofa-small-card sofa-card--peach"
                  onClick={handleSofaClick(pTopLeft)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sofa-card-img-wrap sofa-small-img-wrap">
                    {pTopLeft.badge && (
                      <span className={`sofa-badge sofa-badge--${pTopLeft.badge.type}`}>
                        <Icon name={pTopLeft.badge.icon} />
                        <span>{pTopLeft.badge.text}</span>
                      </span>
                    )}
                    <img
                      src={SMALL_CARD_IMAGES[pTopLeft.id] || pTopLeft.image}
                      alt={pTopLeft.name}
                      className="sofa-card-img"
                      loading="eager"
                      decoding="async"
                    />
                    <button
                      type="button"
                      className={`sofa-heart-btn ${isWishlisted(pTopLeft.id) ? 'is-liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pTopLeft);
                      }}
                      aria-label={isWishlisted(pTopLeft.id) ? `Remove ${pTopLeft.name} from wishlist` : `Add ${pTopLeft.name} to wishlist`}
                    >
                      <Icon name="heart" filled={isWishlisted(pTopLeft.id)} />
                    </button>
                  </div>

                  <div className="sofa-card-body sofa-small-body">
                    <span className="sofa-card-cat">{pTopLeft.category}</span>
                    <h3 className="sofa-card-title sofa-small-title" title={pTopLeft.name}>{pTopLeft.name}</h3>
                    <div className="sofa-card-footer sofa-small-footer">
                      <div className="sofa-price-group">
                        <span className="sofa-card-price">{formatINR(pTopLeft.price)}</span>
                        {pTopLeft.finish && <span className="sofa-material-pill">{pTopLeft.finish}</span>}
                      </div>
                      <button
                        type="button"
                        className="sofa-arrow-btn sofa-arrow-btn--green"
                        aria-label={`View details for ${pTopLeft.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToProduct(pTopLeft);
                        }}
                      >
                        <Icon name="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Top-Right (Deep Green Theme) */}
              <div className="sofa-small-card-wrapper">
                <div
                  className="sofa-card sofa-small-card sofa-card--green"
                  onClick={handleSofaClick(pTopRight)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sofa-card-img-wrap sofa-small-img-wrap">
                    {pTopRight.badge && (
                      <span className={`sofa-badge sofa-badge--${pTopRight.badge.type}`}>
                        <Icon name={pTopRight.badge.icon} />
                        <span>{pTopRight.badge.text}</span>
                      </span>
                    )}
                    <img
                      src={SMALL_CARD_IMAGES[pTopRight.id] || pTopRight.image}
                      alt={pTopRight.name}
                      className="sofa-card-img"
                      loading="eager"
                      decoding="async"
                    />
                    <button
                      type="button"
                      className={`sofa-heart-btn ${isWishlisted(pTopRight.id) ? 'is-liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pTopRight);
                      }}
                      aria-label={isWishlisted(pTopRight.id) ? `Remove ${pTopRight.name} from wishlist` : `Add ${pTopRight.name} to wishlist`}
                    >
                      <Icon name="heart" filled={isWishlisted(pTopRight.id)} />
                    </button>
                  </div>

                  <div className="sofa-card-body sofa-small-body">
                    <span className="sofa-card-cat sofa-card-cat--light">{pTopRight.category}</span>
                    <h3 className="sofa-card-title sofa-small-title sofa-title--white" title={pTopRight.name}>{pTopRight.name}</h3>
                    <div className="sofa-card-footer sofa-small-footer">
                      <div className="sofa-price-group">
                        <span className="sofa-card-price sofa-price--white">{formatINR(pTopRight.price)}</span>
                        {pTopRight.finish && <span className="sofa-material-pill">{pTopRight.finish}</span>}
                      </div>
                      <button
                        type="button"
                        className="sofa-arrow-btn sofa-arrow-btn--white"
                        aria-label={`View details for ${pTopRight.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToProduct(pTopRight);
                        }}
                      >
                        <Icon name="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Bottom-Left (Deep Green Theme) */}
              <div className="sofa-small-card-wrapper">
                <div
                  className="sofa-card sofa-small-card sofa-card--green"
                  onClick={handleSofaClick(pBottomLeft)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sofa-card-img-wrap sofa-small-img-wrap">
                    {pBottomLeft.badge && (
                      <span className={`sofa-badge sofa-badge--${pBottomLeft.badge.type}`}>
                        <Icon name={pBottomLeft.badge.icon} />
                        <span>{pBottomLeft.badge.text}</span>
                      </span>
                    )}
                    <img
                      src={SMALL_CARD_IMAGES[pBottomLeft.id] || pBottomLeft.image}
                      alt={pBottomLeft.name}
                      className="sofa-card-img"
                      loading="eager"
                      decoding="async"
                    />
                    <button
                      type="button"
                      className={`sofa-heart-btn ${isWishlisted(pBottomLeft.id) ? 'is-liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pBottomLeft);
                      }}
                      aria-label={isWishlisted(pBottomLeft.id) ? `Remove ${pBottomLeft.name} from wishlist` : `Add ${pBottomLeft.name} to wishlist`}
                    >
                      <Icon name="heart" filled={isWishlisted(pBottomLeft.id)} />
                    </button>
                  </div>

                  <div className="sofa-card-body sofa-small-body">
                    <span className="sofa-card-cat sofa-card-cat--light">{pBottomLeft.category}</span>
                    <h3 className="sofa-card-title sofa-small-title sofa-title--white" title={pBottomLeft.name}>{pBottomLeft.name}</h3>
                    <div className="sofa-card-footer sofa-small-footer">
                      <div className="sofa-price-group">
                        <span className="sofa-card-price sofa-price--white">{formatINR(pBottomLeft.price)}</span>
                        {pBottomLeft.finish && <span className="sofa-material-pill">{pBottomLeft.finish}</span>}
                      </div>
                      <button
                        type="button"
                        className="sofa-arrow-btn sofa-arrow-btn--white"
                        aria-label={`View details for ${pBottomLeft.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToProduct(pBottomLeft);
                        }}
                      >
                        <Icon name="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Bottom-Right (Peach Theme) */}
              <div className="sofa-small-card-wrapper">
                <div
                  className="sofa-card sofa-small-card sofa-card--peach"
                  onClick={handleSofaClick(pBottomRight)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="sofa-card-img-wrap sofa-small-img-wrap">
                    {pBottomRight.badge && (
                      <span className={`sofa-badge sofa-badge--${pBottomRight.badge.type}`}>
                        <Icon name={pBottomRight.badge.icon} />
                        <span>{pBottomRight.badge.text}</span>
                      </span>
                    )}
                    <img
                      src={SMALL_CARD_IMAGES[pBottomRight.id] || pBottomRight.image}
                      alt={pBottomRight.name}
                      className="sofa-card-img"
                      loading="eager"
                      decoding="async"
                    />
                    <button
                      type="button"
                      className={`sofa-heart-btn ${isWishlisted(pBottomRight.id) ? 'is-liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(pBottomRight);
                      }}
                      aria-label={isWishlisted(pBottomRight.id) ? `Remove ${pBottomRight.name} from wishlist` : `Add ${pBottomRight.name} to wishlist`}
                    >
                      <Icon name="heart" filled={isWishlisted(pBottomRight.id)} />
                    </button>
                  </div>

                  <div className="sofa-card-body sofa-small-body">
                    <span className="sofa-card-cat">{pBottomRight.category}</span>
                    <h3 className="sofa-card-title sofa-small-title" title={pBottomRight.name}>{pBottomRight.name}</h3>
                    <div className="sofa-card-footer sofa-small-footer">
                      <div className="sofa-price-group">
                        <span className="sofa-card-price">{formatINR(pBottomRight.price)}</span>
                        {pBottomRight.finish && <span className="sofa-material-pill">{pBottomRight.finish}</span>}
                      </div>
                      <button
                        type="button"
                        className="sofa-arrow-btn sofa-arrow-btn--green"
                        aria-label={`View details for ${pBottomRight.name}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigateToProduct(pBottomRight);
                        }}
                      >
                        <Icon name="arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

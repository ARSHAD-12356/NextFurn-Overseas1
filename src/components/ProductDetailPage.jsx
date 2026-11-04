import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import {
  CATEGORIES,
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
  slugify,
} from '../data/products.js';
import imgDiplomatMain from '../assets/products-range/diplomat-main.jpg';
import ProductReviews, { Stars, useProductReviews } from './ProductReviews.jsx';
import { getProductContent, getProductKind, getSpecRows } from '../data/productPageContent.js';
import '../styles/product-page.css';

const formatINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

// Breadcrumb trail per product category: [category page] > [product type] > product.
const CATEGORY_CRUMBS = {
  'office-furniture': { label: 'Office Furniture', href: '/office-furniture', page: 'office-furniture' },
  office: { label: 'Office Furniture', href: '/office-furniture', page: 'office-furniture' },
  'modular-workstation': { label: 'Modular Workstation', href: '/modular-workstation', page: 'modular-workstation' },
  'educational-furniture': { label: 'Educational Furniture', href: '/educational-furniture', page: 'educational-furniture' },
  'restaurant-cafe-furniture': { label: 'Restaurant & Cafe Furniture', href: '/restaurant-cafe-furniture', page: 'restaurant-cafe-furniture' },
  'institute-furniture': { label: 'Institute Furniture', href: '/institute-furniture', page: 'institute-furniture' },
  'tv-units': { label: 'TV Cabinets', href: '/tv-units', page: 'tv-units' },
  'home-sofas': { label: 'Sofas', href: '/home-sofas', page: 'home-sofas' },
  'home-tables': { label: 'Tables', href: '/home-tables', page: 'home-tables' },
  'home-beds': { label: 'Beds', href: '/home-beds', page: 'home-beds' },
  gifting: { label: 'Gifting', href: '/gifting', page: 'gifting' },
  mattresses: { label: 'Mattresses', href: '/mattresses', page: 'mattresses' },
  'hospital-furniture': { label: 'Hospital Furniture', href: '/hospital-furniture', page: 'hospital-furniture' },
  sofa: { label: 'Sofas', href: '/home-sofas', page: 'home-sofas' },
};

// "SOFA · LEATHERETTE" -> "Leatherette Sofa", "EXECUTIVE CHAIR" -> "Executive Chair".
function formatProductType(type) {
  if (!type) return '';
  const tidy = type === type.toUpperCase()
    ? type.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    : type;
  const [first, rest] = tidy.split(' · ');
  return first.toLowerCase() === 'sofa' && rest ? `${rest} Sofa` : tidy;
}

function getBreadcrumb(product, onNavigate) {
  const category = CATEGORIES.find((c) => c.id === product.category);
  const crumb = CATEGORY_CRUMBS[product.category] || {
    label: category?.label || 'Products',
    href: `/?category=${product.category}#products`,
    page: 'home',
    hash: '#products',
    category: product.category,
  };
  const go = () => {
    if (onNavigate) onNavigate(crumb.page, crumb.hash || '', crumb.category || '');
    else window.location.href = crumb.href;
  };
  const typeLabel = formatProductType(product.type);
  return { ...crumb, go, typeLabel: typeLabel && typeLabel !== crumb.label ? typeLabel : '' };
}

export default function ProductDetailPage({
  slug = 'nf-diplomat-sofa',
  initialImage,
  onNavigate,
  onNavigateProduct,
}) {
  const { addToCart, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(() => getProductBySlug(slug) || PRODUCTS[0]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    () => getProductBySlug(slug)?.variants?.[0]?.image || imgDiplomatMain
  );
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const productReviews = useProductReviews(product?.id || slug);
  const breadcrumb = getBreadcrumb(product, onNavigate);
  // Only the NF-Diplomat Sofa has its own written copy; every other product uses catalogue data.
  const isDiplomat = product?.id === 'diplomat';
  const content = getProductContent(product);
  const specRows = getSpecRows(product);
  const warranty = specRows.find(([label]) => label === 'Warranty')?.[1] || '1 Year';
  const seatingKinds = ['sofa', 'seating'];
  const relatedDragRef = useRef({
    isPointerDown: false,
    startX: 0,
    startScrollLeft: 0,
    didDrag: false,
  });
  const suppressRelatedClickUntilRef = useRef(0);
  const isLiked = isWishlisted(product.id);

  // Sync product when slug prop changes
  useEffect(() => {
    const found = getProductBySlug(slug) || PRODUCTS[0];
    setProduct(found);
    setSelectedVariantIndex(0);
    setQuantity(1);
    setActiveImage(initialImage || found.variants?.[0]?.image || imgDiplomatMain);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug, initialImage]);

  const variant = product?.variants?.[selectedVariantIndex] || product?.variants?.[0] || {
    price: 29970,
    model: 'NF-DIPLOMAT 1',
    label: '1 Seater',
  };

  // Original price calculation (approx 19% off matching reference)
  const originalPrice = variant.originalPrice ?? Math.round(variant.price / 0.81);
  const discountPercent = variant.discount ?? 19;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      key: `${product.id}:${variant.model}:${variant.label}`,
      name: product.name,
      model: variant.model,
      spec: variant.label,
      price: variant.price,
      image: variant.image || activeImage,
      category: product.type,
      quantity,
    });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  const handleRelatedPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a')) {
      return;
    }

    relatedDragRef.current = {
      isPointerDown: true,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      didDrag: false,
    };
  };

  const handleRelatedPointerMove = (event) => {
    const drag = relatedDragRef.current;
    if (!drag.isPointerDown) return;

    const distance = event.clientX - drag.startX;
    if (!drag.didDrag && Math.abs(distance) > 5) {
      drag.didDrag = true;
      // Capturing on press would retarget the click to the row, so card clicks would never fire.
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (drag.didDrag) {
      event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  const handleRelatedPointerUp = () => {
    if (relatedDragRef.current.didDrag) {
      suppressRelatedClickUntilRef.current = Date.now() + 250;
    }
    relatedDragRef.current.isPointerDown = false;
  };

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <div id="product-detail-page" className="pdp-page">
      {/* ---------- Breadcrumb ---------- */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <div className="pdp-container">
          <ol className="pdp-breadcrumb__list">
            <li>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate ? onNavigate('home') : (window.location.hash = '');
                }}
              >
                Home
              </a>
            </li>
            <li aria-hidden="true" className="pdp-breadcrumb__sep">&gt;</li>
            <li>
              <a
                href={breadcrumb.href}
                onClick={(e) => {
                  e.preventDefault();
                  breadcrumb.go();
                }}
              >
                {breadcrumb.label}
              </a>
            </li>
            <li aria-hidden="true" className="pdp-breadcrumb__sep">&gt;</li>
            {breadcrumb.typeLabel && (
              <>
                <li>
                  <a
                    href={breadcrumb.href}
                    onClick={(e) => {
                      e.preventDefault();
                      breadcrumb.go();
                    }}
                  >
                    {breadcrumb.typeLabel}
                  </a>
                </li>
                <li aria-hidden="true" className="pdp-breadcrumb__sep">&gt;</li>
              </>
            )}
            <li className="pdp-breadcrumb__current" aria-current="page">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* ---------- Main Product Layout ---------- */}
      <section className="pdp-main" aria-labelledby="pdp-title">
        <div className="pdp-container pdp-main__grid">
          {/* Left Column: Image Gallery */}
          <div className="pdp-gallery">
            <div className="pdp-gallery__stage">
              <img
                src={activeImage}
                alt={product.name}
                className="pdp-gallery__main-img"
                onClick={() => setIsZoomOpen(true)}
              />

              {/* Top-Right Favorite / Wishlist Button */}
              <button
                type="button"
                className={`pdp-gallery__heart${isLiked ? ' is-liked' : ''}`}
                onClick={() => toggleWishlist({ ...product, selectedVariant: variant })}
                aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isLiked}
              >
                <svg viewBox="0 0 24 24" fill={isLiked ? '#e95d24' : 'none'} stroke={isLiked ? '#e95d24' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>

              {/* Bottom-Left 360° Icon Badge */}
              <div className="pdp-gallery__badge-360" title="360° View Available">
                <span>360°</span>
              </div>

              {/* Bottom-Right Zoom/Fullscreen Icon */}
              <button
                type="button"
                className="pdp-gallery__zoom-btn"
                onClick={() => setIsZoomOpen(true)}
                aria-label="Zoom image"
                title="Zoom Fullscreen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>

          </div>

          {/* Right Column: Product Information */}
          <div className="pdp-info">
            <div className="pdp-info__tag">
              {product.type ? product.type.toUpperCase() : 'SOFA · LEATHERETTE'}
            </div>

            <h1 id="pdp-title" className="pdp-info__title">
              {product.name}
            </h1>

            <p className="pdp-info__subtitle">
              {product.desc || 'Wooden frame, wooden leg, tufted back.'}
            </p>

            {/* Rating & SKU */}
            <div className="pdp-info__rating-row">
              <a
                href="#reviews"
                className="pdp-info__rating-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Stars value={productReviews.average} size={16} />
                {productReviews.count > 0 ? (
                  <>
                    <span className="pdp-info__score">{productReviews.average.toFixed(1)}</span>
                    <span className="pdp-info__reviews">({productReviews.count} {productReviews.count === 1 ? 'Review' : 'Reviews'})</span>
                  </>
                ) : (
                  <span className="pdp-info__reviews">No reviews yet</span>
                )}
              </a>
              <span className="pdp-info__sep" aria-hidden="true">|</span>
              <span className="pdp-info__sku">SKU: {variant.model}</span>
            </div>

            {/* Price Row */}
            <div className="pdp-info__price-row">
              <span className="pdp-info__price">{product.priceOnRequest ? 'Price on request' : formatINR(variant.price)}</span>
              {!product.catalogPriceOnly && (
                <>
                  <span className="pdp-info__orig-price">{formatINR(originalPrice)}</span>
                  <span className="pdp-info__discount">{discountPercent}% OFF</span>
                </>
              )}
            </div>

            {/* Select Variant */}
            {product.variants && product.variants.length > 1 && (
              <div className="pdp-info__variants">
                <div className="pdp-info__label">Select Variant</div>
                <div className="pdp-variant-chips">
                  {product.variants.map((v, i) => (
                    <button
                      key={`${v.model || ""}:${v.label || i}`}
                      type="button"
                      className={`pdp-variant-chip${selectedVariantIndex === i ? ' is-active' : ''}`}
                      onClick={() => {
                        setSelectedVariantIndex(i);
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart / Buy Now */}
            <div className="pdp-info__actions">
              <div className="pdp-info__qty-wrap">
                <div className="pdp-info__label">Quantity</div>
                <div className="pdp-qty-stepper">
                  <button
                    type="button"
                    className="pdp-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="pdp-qty-val" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="pdp-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              <div className="pdp-cta-btns">
                <button
                  type="button"
                  className="pdp-btn pdp-btn--cart"
                  onClick={handleAddToCart}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="9" cy="20" r="1.4" />
                    <circle cx="18" cy="20" r="1.4" />
                    <path d="M1 1h4l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 6H5.4" />
                  </svg>
                  <span>{addedMessage ? '✓ Added to Cart' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  className="pdp-btn pdp-btn--buy"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust and Delivery Strip */}
            <div className="pdp-trust-grid">
              <div className="pdp-trust-item">
                <div className="pdp-trust-icon pdp-trust-icon--green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <div className="pdp-trust-title">Free Delivery</div>
                  <div className="pdp-trust-desc">Pan India delivery available</div>
                </div>
              </div>

              <div className="pdp-trust-item">
                <div className="pdp-trust-icon pdp-trust-icon--green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="pdp-trust-title">{warranty} Warranty</div>
                  <div className="pdp-trust-desc">Manufacturing warranty</div>
                </div>
              </div>

              <div className="pdp-trust-item pdp-trust-item--row">
                <div className="pdp-trust-icon pdp-trust-icon--orange">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <div className="pdp-trust-title">Secure Payment</div>
                </div>
              </div>

              <div className="pdp-trust-item pdp-trust-item--row">
                <div className="pdp-trust-icon pdp-trust-icon--orange">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                </div>
                <div>
                  <div className="pdp-trust-title">Easy Returns</div>
                  <div className="pdp-trust-desc">7 Days</div>
                </div>
              </div>

              <div className="pdp-trust-item pdp-trust-item--row">
                <div className="pdp-trust-icon pdp-trust-icon--orange">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div>
                  <div className="pdp-trust-title">Customisation</div>
                  <div className="pdp-trust-desc">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Horizontal Product Benefits Strip ---------- */}
      <section className="pdp-benefits-section">
        <div className="pdp-container">
          <div className="pdp-benefits-strip">
            <div className="pdp-benefit-item">
              <div className="pdp-benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 0 0 18" />
                  <path d="M12 8a4 4 0 0 1 4 4" />
                </svg>
              </div>
              <div className="pdp-benefit-content">
                <h4 className="pdp-benefit-title">{isDiplomat ? 'Premium Materials' : content.benefits[0][0]}</h4>
                <p className="pdp-benefit-desc">{isDiplomat ? 'High-quality leatherette with solid wooden frame' : content.benefits[0][1]}</p>
              </div>
            </div>

            <div className="pdp-benefit-item">
              <div className="pdp-benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 3h12l4 6-10 12L2 9z" />
                  <path d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" />
                </svg>
              </div>
              <div className="pdp-benefit-content">
                <h4 className="pdp-benefit-title">{isDiplomat ? 'Elegant Design' : content.benefits[1][0]}</h4>
                <p className="pdp-benefit-desc">{isDiplomat ? 'Modern look with tufted back detail' : content.benefits[1][1]}</p>
              </div>
            </div>

            <div className="pdp-benefit-item">
              <div className="pdp-benefit-icon">
                {seatingKinds.includes(getProductKind(product)) ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
                    <path d="M6 18v2M18 18v2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12 2.5 2.5 4.5-5" />
                  </svg>
                )}
              </div>
              <div className="pdp-benefit-content">
                <h4 className="pdp-benefit-title">{isDiplomat ? 'Comfort Assured' : content.benefits[2][0]}</h4>
                <p className="pdp-benefit-desc">{isDiplomat ? 'Ergonomic seating for long hours' : content.benefits[2][1]}</p>
              </div>
            </div>

            <div className="pdp-benefit-item">
              <div className="pdp-benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className="pdp-benefit-content">
                <h4 className="pdp-benefit-title">{content.benefits[3][0]}</h4>
                <p className="pdp-benefit-desc">{content.benefits[3][1]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Product Information Tabs Section ---------- */}
      <section className="pdp-tabs-section">
        <div className="pdp-container pdp-tabs-layout">
          {/* Horizontal Tabs Navigation */}
          <nav className="pdp-tabs-nav" aria-label="Product Information Tabs">
            {[
              { id: 'description', label: 'Product Description' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'dimensions', label: 'Dimensions' },
              { id: 'materials', label: 'Materials & Care' },
              { id: 'shipping', label: 'Shipping & Returns' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`pdp-tab-btn${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Tab Panel Content */}
          <div className="pdp-tabs-panel">
            {!isDiplomat && (activeTab === 'description' || activeTab === 'specifications') && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">{activeTab === 'description' ? 'Product Description' : 'Specifications'}</h3>
                {activeTab === 'description' && <p className="pdp-tab-desc">{product.desc}</p>}
                <table className="pdp-spec-table">
                  <tbody>
                    <tr><th>Model</th><td>{variant.model}</td></tr>
                    {specRows.map(([label, value]) => (
                      <tr key={label}><th>{label}</th><td>{value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isDiplomat && activeTab === 'description' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Product Description</h3>
                <p className="pdp-tab-desc">
                  The NF-Diplomat Sofa is a perfect blend of modern design and classic elegance. Crafted with a strong wooden frame and premium leatherette upholstery, it features a stylish tufted back that enhances the overall look. Ideal for living rooms, offices, lounges and commercial spaces, this sofa offers superior comfort and long-lasting durability.
                </p>

                <div className="pdp-features-grid">
                  <div className="pdp-feature-card">
                    <div className="pdp-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M9 21V9" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="pdp-feature-title">Tufted Back Design</h5>
                      <p className="pdp-feature-desc">Adds a premium and elegant look.</p>
                    </div>
                  </div>

                  <div className="pdp-feature-card">
                    <div className="pdp-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="pdp-feature-title">Sturdy Wooden Frame</h5>
                      <p className="pdp-feature-desc">Ensures long-lasting strength and stability.</p>
                    </div>
                  </div>

                  <div className="pdp-feature-card">
                    <div className="pdp-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.77L12 20.65l7.65-7.65.77-.77a5.4 5.4 0 0 0 0-7.65z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="pdp-feature-title">Premium Leatherette</h5>
                      <p className="pdp-feature-desc">Soft, durable and easy to maintain.</p>
                    </div>
                  </div>

                  <div className="pdp-feature-card">
                    <div className="pdp-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
                        <path d="M6 18v2M18 18v2" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="pdp-feature-title">Comfortable Seating</h5>
                      <p className="pdp-feature-desc">Designed for maximum relaxation.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isDiplomat && activeTab === 'specifications' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Specifications</h3>
                <table className="pdp-spec-table">
                  <tbody>
                    <tr><th>Model Series</th><td>{variant.model}</td></tr>
                    <tr><th>Upholstery</th><td>Commercial Grade High-Density Leatherette</td></tr>
                    <tr><th>Internal Structure</th><td>Kiln-Dried Solid Hardwood / Salwood Frame</td></tr>
                    <tr><th>Leg Type</th><td>Tapered Solid Wooden Legs with Floor Glides</td></tr>
                    <tr><th>Backrest Style</th><td>Deep Diamond Button Tufted Chesterfield Style</td></tr>
                    <tr><th>Foam Density</th><td>High Resilient 32-Density Super Soft Foam</td></tr>
                    <tr><th>Warranty</th><td>1 Year Comprehensive Manufacturing Warranty</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {!isDiplomat && activeTab === 'dimensions' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Dimensions</h3>
                <p className="pdp-tab-desc">{product.size || 'Dimensions are not listed in the catalogue for this model. Contact us for exact measurements.'}</p>
              </div>
            )}

            {isDiplomat && activeTab === 'dimensions' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Dimensions</h3>
                <table className="pdp-spec-table">
                  <tbody>
                    {product.size ? (
                      <tr><th>Overall Dimensions</th><td>{product.size}</td></tr>
                    ) : (
                      <>
                        <tr><th>1 Seater</th><td>W 980 mm &times; D 840 mm &times; H 760 mm</td></tr>
                        <tr><th>2 Seater</th><td>W 1520 mm &times; D 840 mm &times; H 760 mm</td></tr>
                        <tr><th>3 Seater</th><td>W 2155 mm &times; D 840 mm &times; H 760 mm</td></tr>
                      </>
                    )}
                    <tr><th>Seating Height</th><td>440 mm from floor</td></tr>
                    <tr><th>Ground Clearance</th><td>140 mm for easy cleaning underneath</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Materials & Care</h3>
                <p className="pdp-tab-desc">
                  {isDiplomat
                    ? 'Crafted using wear-tested, breathable faux leatherette that resists spills and scratches. The interior structure uses seasoned hardwood treated against termites and warping.'
                    : product.desc}
                </p>
                <ul className="pdp-care-list">
                  {content.care.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="pdp-tab-content">
                <h3 className="pdp-tab-heading">Shipping & Returns</h3>
                <table className="pdp-spec-table">
                  <tbody>
                    <tr><th>Dispatch Timeline</th><td>Within 3 to 5 business days from factory</td></tr>
                    <tr><th>Delivery Locations</th><td>All serviceable pin codes across India</td></tr>
                    <tr><th>Packaging</th><td>Heavy-duty 5-ply corrugated carton with edge guards</td></tr>
                    <tr><th>Return Policy</th><td>7 days free return or replacement for transit defects</td></tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </section>

      <ProductReviews productName={product.name} {...productReviews} />

      {/* ---------- "You May Also Like" Section (Dynamic Homepage Integration) ---------- */}
      <section className="pdp-related-section">
        <div className="pdp-container">
          <div className="pdp-related-header">
            <h2 className="pdp-related-title">
              <span>You May Also </span>
              <span className="pdp-related-title__highlight">Like</span>
            </h2>
            <a
              href="#products"
              className="pdp-related-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate ? onNavigate('home', '#products') : (window.location.hash = '#products');
              }}
            >
              <span>View All Products</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div
            className="pdp-related-grid"
            onPointerDown={handleRelatedPointerDown}
            onPointerMove={handleRelatedPointerMove}
            onPointerUp={handleRelatedPointerUp}
            onPointerCancel={handleRelatedPointerUp}
            onClickCapture={(event) => {
              if (Date.now() < suppressRelatedClickUntilRef.current) {
                event.preventDefault();
                event.stopPropagation();
                suppressRelatedClickUntilRef.current = 0;
              }
            }}
            onDragStart={(event) => event.preventDefault()}
          >
            {relatedProducts.map((p) => {
              const v0 = p.variants[0] || {};
              const pLiked = isWishlisted(p.id);
              return (
                <article
                  key={p.id}
                  className="pdp-rel-card"
                  onClick={() => onNavigateProduct && onNavigateProduct(p.slug || slugify(p.name))}
                >
                  <div className="pdp-rel-card__media">
                    <img src={v0.image} alt={p.name} loading="lazy" draggable="false" />
                    <button
                      type="button"
                      className={`pdp-rel-card__like${pLiked ? ' is-liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist({ ...p, selectedVariant: v0 });
                      }}
                      aria-label="Wishlist"
                    >
                      <svg viewBox="0 0 24 24" fill={pLiked ? '#e95d24' : 'none'} stroke={pLiked ? '#e95d24' : 'currentColor'} strokeWidth="1.8">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                    {v0.label && <span className="pdp-rel-card__pill">{v0.label}</span>}
                  </div>

                  <div className="pdp-rel-card__body">
                    <div className="pdp-rel-card__category">{p.type ? p.type.toUpperCase() : 'SOFA'}</div>
                    <h4 className="pdp-rel-card__name">{p.name}</h4>
                    <p className="pdp-rel-card__desc">{p.desc}</p>

                    <div className="pdp-rel-card__price-row">
                      <span className="pdp-rel-card__price">{formatINR(v0.price)}</span>
                      <span className="pdp-rel-card__sku">{v0.model}</span>
                    </div>

                    <button
                      type="button"
                      className="pdp-rel-card__cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: p.id,
                          key: `${p.id}:${v0.model}:${v0.label}`,
                          name: p.name,
                          model: v0.model,
                          spec: v0.label,
                          price: v0.price,
                          image: v0.image,
                          category: p.type,
                        });
                      }}
                    >
                      <span>Add to Cart</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="9" cy="20" r="1.4" />
                        <circle cx="18" cy="20" r="1.4" />
                        <path d="M1 1h4l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 6H5.4" />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Fullscreen Image Lightbox Modal ---------- */}
      {isZoomOpen && (
        <div className="pdp-lightbox" onClick={() => setIsZoomOpen(false)} role="dialog" aria-modal="true">
          <div className="pdp-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="pdp-lightbox__close"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close zoom"
            >
              &times;
            </button>
            <img src={activeImage} alt={product.name} className="pdp-lightbox__img" />
          </div>
        </div>
      )}
    </div>
  );
}

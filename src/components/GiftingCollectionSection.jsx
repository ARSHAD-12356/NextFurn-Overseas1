import { ALL_PRODUCTS } from '../data/products.js';
import { GIFTING_NEW_PRODUCTS } from '../data/giftingProducts.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/gifting-collection.css';

const GIFTING_PRODUCT_IDS = ['diplomat', 'classic', 'gc-948', 'gms-vertical'];
const GIFTING_PRODUCTS = [
  ...GIFTING_PRODUCT_IDS.map((id) => {
    const product = ALL_PRODUCTS.find((item) => item.id === id);
    if (!product) throw new Error(`Missing gifting collection product: ${id}`);
    return product;
  }),
  ...GIFTING_NEW_PRODUCTS,
];

const formatINR = (price) => `₹${price.toLocaleString('en-IN')}`;

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3h2l2.2 12.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

function GiftingProductCard({ product, onNavigateProduct }) {
  const { addToCart, isInCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const variant = product.variants[0];
  const liked = isWishlisted(product.id);
  const image = variant.image;
  const cartKey = `${product.id}:${variant.model}:${variant.label}`;
  const productSlug = product.slug;
  const added = isInCart(cartKey);

  const navigateToProduct = (event) => {
    event.preventDefault();
    if (onNavigateProduct) {
      onNavigateProduct(productSlug, image);
    } else {
      window.location.hash = `#product/${productSlug}`;
    }
  };

  const addProductToCart = () => {
    addToCart({
      id: product.id,
      key: cartKey,
      name: product.name,
      model: variant.model,
      spec: variant.label,
      price: variant.price,
      image,
      category: product.type,
    });
  };

  return (
    <article className="gift-card">
      <div className="gift-card__media">
        <a
          className="gift-card__image-link"
          href={`#product/${productSlug}`}
          onClick={navigateToProduct}
          aria-label={`View ${product.name}`}
        >
          <img
            className="gift-card__image"
            src={image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </a>
        <button
          type="button"
          className={`gift-card__wishlist${liked ? ' is-liked' : ''}`}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={liked}
          onClick={() => toggleWishlist({ ...product, selectedVariant: variant })}
        >
          <HeartIcon />
        </button>
      </div>

      <div className="gift-card__body">
        <span className="gift-card__variant">{variant.label}</span>
        <p className="gift-card__category">{product.type}</p>
        <h3 className="gift-card__name">
          <a href={`#product/${productSlug}`} onClick={navigateToProduct}>{product.name}</a>
        </h3>
        <p className="gift-card__description">{product.desc}</p>
        <div className="gift-card__price-row">
          <span className="gift-card__price">{formatINR(variant.price)}</span>
          <span className="gift-card__model">{variant.model}</span>
        </div>
        <button
          type="button"
          className={`gift-card__cart${added ? ' is-added' : ''}`}
          onClick={addProductToCart}
          aria-label={`${added ? 'Add another' : 'Add'} ${product.name} to cart`}
        >
          <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
          <CartIcon />
        </button>
      </div>
    </article>
  );
}

export default function GiftingCollectionSection({ onNavigateProduct }) {
  return (
    <section className="gifting-collection" aria-labelledby="gifting-collection-title">
      <header className="gifting-collection__heading">
        <p className="gifting-collection__eyebrow"><span>Gifting</span></p>
        <h2 id="gifting-collection-title" className="gifting-collection__title">
          Gifting <span>Collection</span>
        </h2>
        <p className="gifting-collection__subtitle">
          Thoughtful furniture gifting options for homes, offices and special moments.
        </p>
        <span className="gifting-collection__divider" aria-hidden="true"><span /></span>
      </header>

      <div className="gifting-collection__grid">
        {GIFTING_PRODUCTS.map((product) => (
          <GiftingProductCard
            key={product.id}
            product={product}
            onNavigateProduct={onNavigateProduct}
          />
        ))}
      </div>
    </section>
  );
}

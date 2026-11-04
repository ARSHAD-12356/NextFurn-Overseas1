import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/wishlist-page.css';

const formatINR = (price) => `₹${Number(price || 0).toLocaleString('en-IN')}`;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

export default function WishlistPage({ onNavigate, onNavigateProduct }) {
  const { wishlistItems, removeWishlistItem } = useWishlist();

  const navigateToProduct = (item) => {
    if (onNavigateProduct) {
      onNavigateProduct(item.slug, item.image);
    } else {
      window.location.href = `/product/${item.slug}`;
    }
  };

  return (
    <main className="wishlist-page">
      <div className="wishlist-page__shell">
        <header className="wishlist-page__header">
          <p className="wishlist-page__eyebrow">Saved for later</p>
          <h1>Your <span>wishlist</span></h1>
          <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'piece' : 'pieces'} you love</p>
        </header>

        {wishlistItems.length ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <article className="wishlist-card" key={item.id}>
                <button
                  type="button"
                  className="wishlist-card__remove"
                  onClick={() => removeWishlistItem(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <HeartIcon />
                </button>
                <button
                  type="button"
                  className="wishlist-card__image"
                  onClick={() => navigateToProduct(item)}
                  aria-label={`View ${item.name}`}
                >
                  {item.image ? <img src={item.image} alt={item.name} loading="lazy" /> : <span>{item.name}</span>}
                </button>
                <div className="wishlist-card__body">
                  <p>{item.category}</p>
                  <h2>{item.name}</h2>
                  {item.variant && <span className="wishlist-card__variant">{item.variant}</span>}
                  <div className="wishlist-card__footer">
                    <strong>{formatINR(item.price)}</strong>
                    <button type="button" onClick={() => navigateToProduct(item)} aria-label={`View ${item.name} details`}>
                      <ArrowIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="wishlist-empty">
            <span className="wishlist-empty__icon"><HeartIcon /></span>
            <h2>Your wishlist is waiting</h2>
            <p>Tap the heart on any product to save it here.</p>
            <button type="button" onClick={() => onNavigate?.('home', '#products')}>
              Explore products <ArrowIcon />
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

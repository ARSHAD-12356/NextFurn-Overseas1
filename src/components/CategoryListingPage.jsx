import { useEffect, useMemo, useRef, useState } from 'react';
import { useWishlist } from '../context/WishlistContext.jsx';
import '../styles/office-furniture.css';

// Shared category listing page (Office Furniture, Modular Workstation, …).
// Each category page passes its products, filter groups and banner; filter groups only
// list values that actually occur in that category's data.

// No popularity or launch-date data exists in the catalogues, so only data-backed sorts are offered.
const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Name: A to Z' },
];

const formatPrice = (price) => (price == null ? 'Price on request' : `₹${price.toLocaleString('en-IN')}`);

function optionsFor(items, key) {
  return [...new Set(items.map((p) => p[key]).filter(Boolean))];
}

const comparePrice = (direction) => (a, b) => {
  // Products without a catalogue price always sort last.
  if (a.price == null) return b.price == null ? a.order - b.order : 1;
  if (b.price == null) return -1;
  return direction * (a.price - b.price);
};

const SORTERS = {
  featured: (a, b) => a.order - b.order,
  'price-asc': comparePrice(1),
  'price-desc': comparePrice(-1),
  'name-asc': (a, b) => a.name.localeCompare(b.name),
};

const Chevron = () => (
  <svg className="of-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M3 6h11M18 6h3M3 12h5M12 12h9M3 18h13M20 18h1" />
    <circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

function OptionList({ items, groupKey, selected, onToggle }) {
  return (
    <ul className="of-options">
      {optionsFor(items, groupKey).map((value) => (
        <li key={value}>
          <label className="of-option">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => onToggle(groupKey, value)}
            />
            <span className="of-option__label">{value}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function ProductCard({ product, detail, onOpen }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const saved = isWishlisted(product.id);
  const visibleSwatches = product.colors.slice(0, 3);
  const extraSwatches = Math.max(product.colors.length - 3, 0);
  const optionCount = product.variants.length;
  const optionNoun = /Table|Workstation/.test(product.category) ? 'sizes' : 'options';

  return (
    <article className="of-card">
      <div className="of-card__media">
        <button type="button" className="of-card__image-btn" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="900" height="900" />
        </button>
        {product.badge && <span className={`of-card__badge of-card__badge--${product.badge.tone}`}>{product.badge.label}</span>}
        <button
          type="button"
          className={`of-card__wish${saved ? ' is-active' : ''}`}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => toggleWishlist(detail)}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <button type="button" className="of-card__body" onClick={() => onOpen(product)}>
        <span className="of-card__brand">{product.brand}</span>
        <span className="of-card__name">{product.name}</span>
        <span className="of-card__desc">{product.subtitle}</span>
        <span className="of-card__price-row">
          <span className={`of-card__price${product.price == null ? ' is-request' : ''}`}>{formatPrice(product.price)}</span>
          <span className="of-card__model">{product.model || `Similar to ${product.refModel}`}</span>
        </span>
      </button>

      {(visibleSwatches.length > 0 || optionCount > 1) && (
        <div className="of-card__swatches" aria-label="Available colours and variants">
          {visibleSwatches.map((color) => (
            <span key={color} className="of-swatch" style={{ background: color }} />
          ))}
          {extraSwatches > 0 && <span className="of-swatch of-swatch--more">+{extraSwatches}</span>}
          {optionCount > 1 && <span className="of-card__options">{optionCount} {optionNoun}</span>}
        </div>
      )}
    </article>
  );
}

export default function CategoryListingPage({
  title,
  items,
  detailItems,
  filterGroups,
  drawerGroups = [{ key: 'category', label: 'Product Type' }, ...filterGroups],
  banner,
  onNavigate,
  onNavigateProduct,
}) {
  const detailById = useMemo(() => new Map(detailItems.map((p) => [p.id, p])), [detailItems]);
  const [filters, setFilters] = useState({});
  const [sortId, setSortId] = useState('featured');
  const [openMenu, setOpenMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (!openMenu) return undefined;
    const close = (event) => {
      if (event.type === 'keydown' ? event.key === 'Escape' : !barRef.current?.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [openMenu]);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const toggleFilter = (key, value) => {
    setFilters((current) => {
      const values = current[key] || [];
      const next = values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
      return { ...current, [key]: next };
    });
  };

  const activeChips = Object.entries(filters).flatMap(([key, values]) => values.map((value) => ({ key, value })));

  const products = useMemo(() => items
    .filter((p) => Object.entries(filters).every(([key, values]) => values.length === 0 || values.includes(p[key])))
    .sort(SORTERS[sortId]), [items, filters, sortId]);

  const openProduct = (product) => onNavigateProduct?.(product.slug, product.image);
  const sortLabel = SORT_OPTIONS.find((o) => o.id === sortId)?.label;

  return (
    <main className="office-page">
      <div className="office-page__inner">
        <header className="office-page__head">
          <div className="office-page__title-block">
            <nav className="of-breadcrumb" aria-label="Breadcrumb">
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate?.('home'); }}>Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <h1 className="office-page__title">
              {title}
            </h1>
          </div>

          {banner && (
            <div className="office-page__promo" style={{ '--promo-image': `url(${banner.image})` }}>
              <p className="office-page__promo-title">{banner.title}</p>
              <p className="office-page__promo-text">{banner.text}</p>
            </div>
          )}
        </header>

        <div className="of-bar" ref={barRef}>
          <div className="of-bar__scroll">
            <button type="button" className="of-bar__btn of-bar__btn--all" onClick={() => { setOpenMenu(null); setDrawerOpen(true); }}>
              <FilterIcon />
              All Filters
              {activeChips.length > 0 && <span className="of-bar__badge">{activeChips.length}</span>}
            </button>

            {filterGroups.map((group) => {
              const count = filters[group.key]?.length || 0;
              const isOpen = openMenu === group.key;
              return (
                <div key={group.key} className="of-bar__item">
                  <button
                    type="button"
                    className={`of-bar__btn${count ? ' has-value' : ''}${isOpen ? ' is-open' : ''}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : group.key)}
                  >
                    {group.label}
                    {count > 0 && <span className="of-bar__badge">{count}</span>}
                    <Chevron />
                  </button>
                  {isOpen && (
                    <div className="of-menu" role="dialog" aria-label={group.label}>
                      <OptionList items={items} groupKey={group.key} selected={filters[group.key] || []} onToggle={toggleFilter} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="of-bar__item of-bar__item--sort">
            <button
              type="button"
              className={`of-bar__btn${openMenu === 'sort' ? ' is-open' : ''}`}
              aria-expanded={openMenu === 'sort'}
              aria-label={`Sort by: ${sortLabel}`}
              onClick={() => setOpenMenu(openMenu === 'sort' ? null : 'sort')}
            >
              Sort By
              <Chevron />
            </button>
            {openMenu === 'sort' && (
              <div className="of-menu of-menu--right" role="listbox" aria-label="Sort by">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    role="option"
                    aria-selected={sortId === option.id}
                    className={`of-sort-option${sortId === option.id ? ' is-active' : ''}`}
                    onClick={() => { setSortId(option.id); setOpenMenu(null); }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="of-chips">
            {activeChips.map(({ key, value }) => (
              <button key={`${key}:${value}`} type="button" className="of-chip" onClick={() => toggleFilter(key, value)}>
                {value} <span aria-hidden="true">×</span>
              </button>
            ))}
            <button type="button" className="of-chips__clear" onClick={() => setFilters({})}>Clear all</button>
          </div>
        )}

        {products.length > 0 ? (
          <div className="of-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} detail={detailById.get(product.id)} onOpen={openProduct} />
            ))}
          </div>
        ) : (
          <div className="of-empty">
            <p>No products match these filters.</p>
            <button type="button" onClick={() => setFilters({})}>Clear filters</button>
          </div>
        )}
      </div>

      <div className={`of-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen}>
        <button type="button" className="of-drawer__scrim" tabIndex={-1} aria-label="Close filters" onClick={() => setDrawerOpen(false)} />
        <aside className="of-drawer__panel" role="dialog" aria-modal="true" aria-label="All filters">
          <div className="of-drawer__head">
            <h2>All Filters</h2>
            <button type="button" className="of-drawer__close" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>×</button>
          </div>
          <div className="of-drawer__body">
            {drawerGroups.map((group) => (
              <fieldset key={group.key} className="of-drawer__group">
                <legend>{group.label}</legend>
                <OptionList items={items} groupKey={group.key} selected={filters[group.key] || []} onToggle={toggleFilter} />
              </fieldset>
            ))}
          </div>
          <div className="of-drawer__foot">
            <button type="button" className="of-drawer__clear" onClick={() => setFilters({})}>Clear all</button>
            <button type="button" className="of-drawer__apply" onClick={() => setDrawerOpen(false)}>
              Show Products
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

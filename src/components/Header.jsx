import { useEffect, useState, useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { ALL_PRODUCTS } from '../data/products.js';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark-green.png';
import imgOffice from '../assets/categories/cat-office.jpg';
import imgEducation from '../assets/categories/hd/cat-education-hd.jpg';
import imgHospital from '../assets/categories/cat-hospital.jpg';
import imgRestaurant from '../assets/categories/cat-restaurant.png';
import sofaHeroImg from '../assets/sofas/sofa-hero.jpg';
import '../styles/header.css';

const PRODUCT_CATEGORIES = [
  {
    id: 'home-furniture',
    image: sofaHeroImg,
    title: 'Home Furniture',
    desc: 'Comfortable furniture for living spaces and bedrooms.',
    href: '/home-sofas',
    subItems: [
      { title: 'Sofas', href: '/home-sofas' },
      { title: 'Tables', href: '/home-tables' },
      { title: 'TV Cabinets', href: '/tv-units' },
      { title: 'Beds', href: '/home-beds' },
      { title: 'Wardrobes', disabled: true },
      { title: 'Dining Table & Chairs', disabled: true },
      { title: 'Kids Beds', disabled: true },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    id: 'office',
    image: imgOffice,
    title: 'Office Furniture',
    desc: 'Ergonomic chairs, desks, workstations and more for modern offices.',
    href: '/office-furniture',
    subItems: [
      { title: 'Executive Office Tables', href: '/executive-office-tables' },
      { title: 'Executive Office Chair', href: '/executive-office-chairs' },
      { title: 'Modular Workstation', href: '/modular-workstation' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 3h10v8a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V3z" />
        <path d="M5 9h2" />
        <path d="M17 9h2" />
        <path d="M12 14v4" />
        <path d="M8 21l4-3 4 3" />
        <circle cx="8" cy="21" r="1" />
        <circle cx="16" cy="21" r="1" />
      </svg>
    ),
  },
  {
    id: 'education-furniture',
    image: imgEducation,
    title: 'Education Furniture',
    desc: 'Durable, comfortable furniture for classrooms and learning spaces.',
    href: '/educational-furniture',
    subItems: [
      { title: 'Institute Furniture', href: '/institute-furniture' },
      { title: 'School Furniture', href: '/school-furniture' },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'restaurant',
    image: imgRestaurant,
    title: 'Restaurant & Cafe Furniture',
    desc: 'Stylish, strong and comfortable furniture for dining spaces.',
    href: '/restaurant-cafe-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 21v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8" />
        <path d="M6 7h12" />
        <path d="M12 7v4" />
        <path d="M4 14h2" />
        <path d="M18 14h2" />
      </svg>
    ),
  },
  {
    id: 'hospital-furniture',
    image: imgHospital,
    title: 'Hospital Furniture',
    desc: 'High-quality furniture for hospitals and healthcare spaces.',
    href: '/hospital-furniture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 4v16" />
        <path d="M2 14h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8" />
        <path d="M22 10v10" />
        <circle cx="6" cy="10" r="1.5" />
        <path d="M14 6v4" />
        <path d="M12 8h4" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT US', href: '#about' },
  { id: 'products', label: 'PRODUCT CATEGORY', href: '#products', isDropdown: true },
  { id: 'new-arrivals', label: 'NEW ARRIVALS', href: '/new-arrivals' },
  { id: 'gifting', label: 'GIFTING', href: '#gifting' },
  { id: 'investor', label: 'INVESTOR RELATIONS', href: '#investor' },
  { id: 'brochures', label: 'BROCHURES', href: '/brochures' },
];

function ArrowRight() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ChevronDown({ className = '' }) {
  return (
    <svg className={`chevron-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronRight({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="7" height="7" x="3" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="14" rx="1.5" />
      <rect width="7" height="7" x="3" y="14" rx="1.5" />
    </svg>
  );
}

function InvestorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="13" width="4" height="8" rx="1.5" />
      <rect x="10" y="8" width="4" height="13" rx="1.5" />
      <rect x="17" y="3" width="4" height="18" rx="1.5" />
    </svg>
  );
}

function BrochuresIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    </svg>
  );
}

function DecorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <path d="M2 13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
      <path d="M5 19v2M19 19v2" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M12 8H7.5a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8z" />
      <path d="M12 8h4.5a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8z" />
    </svg>
  );
}

function getDrawerIcon(id) {
  switch (id) {
    case 'home': return <HomeIcon />;
    case 'about': return <UsersIcon />;
    case 'products': return <CategoryIcon />;
    case 'new-arrivals': return <SparklesIcon />;
    case 'decor': return <DecorIcon />;
    case 'wedding':
    case 'gifting': return <GiftIcon />;
    case 'investor': return <InvestorIcon />;
    case 'brochures': return <BrochuresIcon />;
    default: return <HomeIcon />;
  }
}

export default function Header({ currentPage = 'home', onNavigate, onNavigateProduct }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const [active, setActive] = useState(
    currentPage === 'about' ? '#about' : currentPage === 'gifting' ? '#gifting' : currentPage === 'brochures' ? '/brochures' : '#home',
  );
  const [previewIndex, setPreviewIndex] = useState(0);
  const dropdownCloseTimeoutRef = useRef(null);

  useEffect(() => {
    if (currentPage === 'about') {
      setActive('#about');
    } else if (currentPage === 'investor') {
      setActive('#investor');
    } else if (currentPage === 'gifting') {
      setActive('#gifting');
    } else if (currentPage === 'new-arrivals') {
      setActive('/new-arrivals');
    } else if (currentPage === 'brochures') {
      setActive('/brochures');
    } else if (active === '#about' || active === '#investor' || active === '#gifting' || active === '/new-arrivals' || active === '/brochures') {
      setActive('#home');
    }
  }, [currentPage]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleMouseEnter = () => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 120);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prev) => !prev);
  };

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const searchResults = trimmedQuery.length >= 1
    ? ALL_PRODUCTS.filter((product) => {
        const name = (product.name || '').toLowerCase();
        const type = (product.type || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const desc = (product.desc || '').toLowerCase();
        const variantMatch = (product.variants || []).some(
          (v) => (v.model || '').toLowerCase().includes(trimmedQuery) ||
                 (v.label || '').toLowerCase().includes(trimmedQuery)
        );
        return name.includes(trimmedQuery) ||
               type.includes(trimmedQuery) ||
               category.includes(trimmedQuery) ||
               desc.includes(trimmedQuery) ||
               variantMatch;
      }).sort((a, b) => {
        const aName = (a.name || '').toLowerCase();
        const bName = (b.name || '').toLowerCase();
        const aStarts = aName.startsWith(trimmedQuery);
        const bStarts = bName.startsWith(trimmedQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return aName.localeCompare(bName);
      }).slice(0, 8)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const inDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(e.target);
      const inMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!inDesktop && !inMobile) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelectProduct = (product) => {
    if (!product) return;
    setSearchQuery('');
    setIsSearchOpen(false);
    setActiveSearchIndex(-1);
    setMenuOpen(false);
    setDropdownOpen(false);

    const targetSlug = product.slug || product.id;
    const targetImage = product.variants?.[0]?.image || product.image;

    if (onNavigateProduct) {
      onNavigateProduct(targetSlug, targetImage);
    } else if (onNavigate) {
      onNavigate('product', targetSlug);
    } else {
      window.location.hash = `#product/${targetSlug}`;
    }
  };

  const handleSearchKeyDown = (e) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSearchIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSearchIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = activeSearchIndex >= 0 ? searchResults[activeSearchIndex] : searchResults[0];
      if (chosen) handleSelectProduct(chosen);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  const { openCart, totalCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const chosen = activeSearchIndex >= 0 ? searchResults[activeSearchIndex] : searchResults[0];
      handleSelectProduct(chosen);
      return;
    }
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    if (currentPage === 'about' || currentPage === 'investor' || currentPage === 'gifting' || currentPage === 'new-arrivals' || currentPage === 'home-sofas' || currentPage === 'home-tables' || currentPage === 'home-beds' || currentPage === 'tv-units' || currentPage === 'office-furniture' || currentPage === 'hospital-furniture' || currentPage === 'school-furniture' || currentPage === 'executive-office-tables' || currentPage === 'executive-office-chairs' || currentPage === 'modular-workstation' || currentPage === 'educational-furniture' || currentPage === 'restaurant-cafe-furniture' || currentPage === 'institute-furniture') {
      if (onNavigate) onNavigate('home', '#products');
      else window.location.hash = '#products';
    } else {
      const el = document.getElementById('products') || document.getElementById('bestseller');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderSearchDropdown = () => {
    if (!isSearchOpen || trimmedQuery.length < 1) return null;

    return (
      <div className="site-search-dropdown" role="listbox">
        {searchResults.length > 0 ? (
          <>
            <div className="site-search-dropdown__header">
              <span>{searchResults.length} {searchResults.length === 1 ? 'Product found' : 'Products found'}</span>
              <span className="site-search-dropdown__hint">Click to view product</span>
            </div>
            <div className="site-search-dropdown__list">
              {searchResults.map((product, idx) => {
                const firstVariant = product.variants?.[0];
                const price = firstVariant?.price;
                const thumb = firstVariant?.image || product.image;
                const isSelected = activeSearchIndex === idx;

                return (
                  <div
                    key={product.id || product.slug || idx}
                    role="option"
                    aria-selected={isSelected}
                    className={`site-search-dropdown__item${isSelected ? ' is-active' : ''}`}
                    onClick={() => handleSelectProduct(product)}
                    onMouseEnter={() => setActiveSearchIndex(idx)}
                  >
                    <div className="site-search-dropdown__thumb-wrap">
                      {thumb ? (
                        <img src={thumb} alt={product.name} className="site-search-dropdown__thumb" />
                      ) : (
                        <div className="site-search-dropdown__thumb-placeholder" />
                      )}
                    </div>
                    <div className="site-search-dropdown__content">
                      <div className="site-search-dropdown__name">{product.name}</div>
                      <div className="site-search-dropdown__sub">
                        <span className="site-search-dropdown__type">{product.type || product.category}</span>
                        {product.source && (
                          <span className="site-search-dropdown__badge">{product.source}</span>
                        )}
                      </div>
                    </div>
                    <div className="site-search-dropdown__action">
                      {price && (
                        <span className="site-search-dropdown__price">
                          ₹{Number(price).toLocaleString('en-IN')}
                        </span>
                      )}
                      <svg className="site-search-dropdown__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="site-search-dropdown__empty">
            <div className="site-search-dropdown__empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="site-search-dropdown__empty-title">
              No products found for "<strong>{searchQuery}</strong>"
            </p>
            <p className="site-search-dropdown__empty-desc">
              Try searching for <em>sofa</em>, <em>chair</em>, <em>table</em>, <em>bed</em>, or <em>desk</em>.
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleWishlistClick = () => {
    if (onNavigate) onNavigate('wishlist');
    else window.location.href = '/wishlist';
  };

  const close = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setOpenSubmenuId(null);
  };

  const handleNavClick = (e, href) => {
    if (href === '/home-sofas' || href === '/home-tables' || href === '/home-beds' || href === '/tv-units' || href === '/office-furniture' || href === '/hospital-furniture' || href === '/school-furniture' || href === '/executive-office-tables' || href === '/executive-office-chairs' || href === '/modular-workstation' || href === '/educational-furniture' || href === '/restaurant-cafe-furniture' || href === '/institute-furniture') {
      e.preventDefault();
      setActive(href);
      close();
      if (onNavigate) {
        onNavigate(href.slice(1));
      } else {
        window.location.href = href;
      }
      return;
    }

    if (href === '/brochures') {
      e.preventDefault();
      setActive('/brochures');
      close();
      if (onNavigate) {
        onNavigate('brochures');
      } else {
        window.location.href = href;
      }
      return;
    }

    if (href === '/new-arrivals') {
      e.preventDefault();
      setActive('/new-arrivals');
      close();
      if (onNavigate) {
        onNavigate('new-arrivals');
      } else {
        window.location.href = href;
      }
      return;
    }

    if (href === '#gifting') {
      e.preventDefault();
      setActive('#gifting');
      close();
      if (onNavigate) {
        onNavigate('gifting');
      } else {
        window.location.hash = 'gifting';
      }
      return;
    }

    if (href === '#investor') {
      e.preventDefault();
      setActive('#investor');
      close();
      if (onNavigate) {
        onNavigate('investor');
      } else {
        window.location.hash = 'investor';
      }
      return;
    }

    if (href === '#about') {
      e.preventDefault();
      setActive('#about');
      close();
      if (onNavigate) {
        onNavigate('about');
      } else {
        window.location.hash = 'about';
      }
      return;
    }

    if (href === '#home' || href === '/') {
      e.preventDefault();
      setActive('#home');
      close();
      if (onNavigate) {
        onNavigate('home');
      } else {
        window.location.hash = '';
      }
      return;
    }

    // Anchor links on home page (e.g. #products, #bestsellers, #contact)
    setActive(href);
    close();
    if (currentPage === 'about' || currentPage === 'investor' || currentPage === 'gifting' || currentPage === 'new-arrivals' || currentPage === 'home-sofas' || currentPage === 'home-tables' || currentPage === 'home-beds' || currentPage === 'tv-units' || currentPage === 'office-furniture' || currentPage === 'hospital-furniture' || currentPage === 'school-furniture' || currentPage === 'executive-office-tables' || currentPage === 'executive-office-chairs' || currentPage === 'modular-workstation' || currentPage === 'educational-furniture' || currentPage === 'restaurant-cafe-furniture' || currentPage === 'institute-furniture') {
      e.preventDefault();
      if (onNavigate) {
        onNavigate('home', href);
      } else {
        window.location.hash = href;
      }
    }
  };

  return (
    <header className={`site-header${menuOpen ? ' is-open' : ''}`}>
      {/* Row 1: Logo (Left) and Action Controls (Right) */}
      <div className="site-header__top">
        {/* Left: Hamburger menu (mobile only) + Logo */}
        <div className="site-header__left">
          <button
            type="button"
            className={`site-header__toggle${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="site-header__toggle-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <a
            href="#home"
            className="site-header__logo"
            aria-label="NextFurn Overseas — Home"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <img src={logoIcon} alt="" className="site-header__logo-icon" width="553" height="466" />
            <img src={logoWordmark} alt="NextFurn Overseas" className="site-header__logo-wordmark" width="900" height="184" />
          </a>
        </div>

        {/* Right controls: 1. Search Bar, 2. Wishlist, 3. Cart, 4. Contact Us */}
        <div className="site-header__actions">
          {/* 1. Desktop Search Bar (hidden on mobile) */}
          <form
            ref={desktopSearchRef}
            className="site-header__search"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <input
              type="text"
              role="searchbox"
              enterKeyHint="search"
              className="site-header__search-input"
              placeholder="Search furniture..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
                setActiveSearchIndex(-1);
              }}
              onFocus={() => {
                if (trimmedQuery.length >= 1) setIsSearchOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
              aria-label="Search furniture"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="site-header__search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                  setActiveSearchIndex(-1);
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <button type="submit" className="site-header__search-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            {renderSearchDropdown()}
          </form>

          {/* 2. Wishlist Icon (shown on mobile & desktop) */}
          <button
            type="button"
            className="site-header__icon site-header__icon--wishlist"
            onClick={handleWishlistClick}
            aria-label={`Wishlist (${wishlistCount} ${wishlistCount === 1 ? 'item' : 'items'})`}
            title="Wishlist"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </button>

          {/* 3. Shopping Cart Icon (Placed to the right of Wishlist on mobile) */}
          <button
            type="button"
            className="site-header__icon site-header__icon--cart"
            onClick={openCart}
            aria-label={`Shopping Cart (${totalCount} items)`}
            title="Shopping Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
              <path d="M1 1h4l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 6H5.4" />
            </svg>
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </button>

          {/* 4. Contact Us Button (desktop only) */}
          <a
            href="#contact"
            className="site-header__contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>CONTACT US</span>
            <ArrowRight />
          </a>
        </div>
      </div>

      {/* Row 2: Mobile Broad Search Bar (visible only on mobile) */}
      <div className="site-header__mobile-search">
        <form
          ref={mobileSearchRef}
          className="site-header__mobile-search-form"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <input
            type="text"
            role="searchbox"
            enterKeyHint="search"
            className="site-header__mobile-search-input"
            placeholder="Search Products, Color & More..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
              setActiveSearchIndex(-1);
            }}
            onFocus={() => {
              if (trimmedQuery.length >= 1) setIsSearchOpen(true);
            }}
            onKeyDown={handleSearchKeyDown}
            aria-label="Search Products, Color & More"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className="site-header__search-clear"
              aria-label="Clear search"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
                setActiveSearchIndex(-1);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          <button type="submit" className="site-header__mobile-search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          {renderSearchDropdown()}
        </form>
      </div>


      {/* Row 2: Dedicated Navigation Menu Row */}
      <div className="site-header__bottom">
        <nav className="site-header__nav" aria-label="Primary Navigation">
          <ul>
            {NAV_LINKS.map((link) => {
              if (link.isDropdown) {
                return (
                  <li
                    key={link.label}
                    className={`nav-item--dropdown${dropdownOpen ? ' is-open' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      className={`nav-link nav-link--dropdown${dropdownOpen ? ' is-active' : ''}`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="nav-link__chevron" />
                    </button>

                    <div
                      className={`cat-menu${dropdownOpen ? ' is-visible' : ''}`}
                      role="menu"
                      aria-label="Product Categories"
                    >
                      <div className="cat-menu__list">
                        <p className="cat-menu__eyebrow">
                          <span>Product Categories</span>
                          <span className="cat-menu__count">0{PRODUCT_CATEGORIES.length}</span>
                        </p>

                        <ul>
                          {PRODUCT_CATEGORIES.map((category, i) => (
                            <li key={category.id} className="cat-menu__entry" style={{ '--i': i }}>
                              <a
                                href={category.href}
                                className={`cat-menu__item${previewIndex === i ? ' is-current' : ''}`}
                                role="menuitem"
                                onMouseEnter={() => setPreviewIndex(i)}
                                onFocus={() => setPreviewIndex(i)}
                                onClick={(e) => {
                                  if (category.subItems) {
                                    e.preventDefault();
                                    setOpenSubmenuId(openSubmenuId === category.id ? null : category.id);
                                    return;
                                  }
                                  handleNavClick(e, category.href);
                                  setDropdownOpen(false);
                                }}
                              >
                                <span className="cat-menu__icon">{category.icon}</span>
                                <span className="cat-menu__title">{category.title}</span>
                                {!category.subItems && (
                                  <svg className="cat-menu__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" />
                                  </svg>
                                )}
                              </a>
                              {category.subItems && (
                                <button
                                  type="button"
                                  className="cat-menu__toggle"
                                  aria-expanded={openSubmenuId === category.id}
                                  aria-label={`Show ${category.title} submenu`}
                                  onMouseEnter={() => setPreviewIndex(i)}
                                  onFocus={() => setPreviewIndex(i)}
                                  onClick={() => setOpenSubmenuId(openSubmenuId === category.id ? null : category.id)}
                                >
                                  <ChevronDown className={openSubmenuId === category.id ? 'is-rotated' : ''} />
                                </button>
                              )}
                              {category.subItems && (<div className={`menu-collapse${openSubmenuId === category.id ? ' is-open' : ''}`}><div className="menu-collapse__inner">
                                <ul className="cat-menu__sub">
                                  {category.subItems.map((sub) => (
                                    <li key={sub.href || sub.title}>
                                      {sub.href ? (
                                        <a
                                          href={sub.href}
                                          className="cat-menu__sub-link"
                                          role="menuitem"
                                          onMouseEnter={() => setPreviewIndex(i)}
                                          onFocus={() => setPreviewIndex(i)}
                                          onClick={(e) => {
                                            handleNavClick(e, sub.href);
                                            setDropdownOpen(false);
                                          }}
                                        >
                                          {sub.title}
                                        </a>
                                      ) : (
                                        <span className="cat-menu__sub-link is-disabled" role="menuitem" aria-disabled="true">
                                          {sub.title}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div></div>)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={PRODUCT_CATEGORIES[previewIndex].href}
                        className="cat-menu__preview"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={(e) => {
                          handleNavClick(e, PRODUCT_CATEGORIES[previewIndex].href);
                          setDropdownOpen(false);
                        }}
                      >
                        {PRODUCT_CATEGORIES.map((category, i) => (
                          <img
                            key={category.id}
                            src={category.image}
                            alt=""
                            loading="lazy"
                            className={`cat-menu__img${previewIndex === i ? ' is-current' : ''}`}
                          />
                        ))}
                        <span className="cat-menu__preview-body" key={previewIndex}>
                          <span className="cat-menu__preview-num">
                            {String(previewIndex + 1).padStart(2, '0')} / 0{PRODUCT_CATEGORIES.length}
                          </span>
                          <span className="cat-menu__preview-title">{PRODUCT_CATEGORIES[previewIndex].title}</span>
                          <span className="cat-menu__preview-desc">{PRODUCT_CATEGORIES[previewIndex].desc}</span>
                          <span className="cat-menu__preview-link">
                            Explore range
                            <ArrowRight />
                          </span>
                        </span>
                      </a>
                    </div>
                  </li>
                );
              }

              const isActive = (currentPage === 'about' && link.href === '#about') ||
                               (currentPage === 'gifting' && link.href === '#gifting') ||
                               (currentPage === 'investor' && link.href === '#investor') ||
                               (currentPage === 'brochures' && link.href === '/brochures') ||
                               (currentPage === 'new-arrivals' && link.href === '/new-arrivals') ||
                               (currentPage === 'home' && (active === link.href || (active === '#home' && link.href === '#home')));

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`nav-link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop${menuOpen ? ' is-visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile Left Drawer */}
      <aside
        id="mobile-drawer"
        className={`drawer-container${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Bottom Decorative Green Furniture Interior Scene */}
        <div className="drawer-decor-bg" aria-hidden="true">
          <div className="drawer-decor-overlay" />
        </div>

        {/* Scrollable Content Container */}
        <div className="drawer-content">
          {/* Drawer Header: Logo + Circular Close Button */}
          <div className="drawer-header">
            <a
              href="#home"
              className="drawer-logo"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="NextFurn Overseas — Home"
            >
              <img src={logoIcon} alt="" className="drawer-logo-icon" width="553" height="466" />
              <img src={logoWordmark} alt="NextFurn Overseas" className="drawer-logo-wordmark" width="900" height="184" />
            </a>

            <button
              type="button"
              className="drawer-close-btn"
              onClick={close}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Items List */}
          <nav className="drawer-nav" aria-label="Mobile Navigation">
            <ul className="drawer-nav-list">
              {NAV_LINKS.map((link) => {
                const isCurrentActive = (currentPage === 'about' && link.href === '#about') ||
                                        (currentPage === 'gifting' && link.href === '#gifting') ||
                                        (currentPage === 'investor' && link.href === '#investor') ||
                                        (currentPage === 'brochures' && link.href === '/brochures') ||
                                        (currentPage === 'new-arrivals' && link.href === '/new-arrivals') ||
                                        (currentPage === 'home' && (active === link.href || (active === '#home' && link.href === '#home')));

                if (link.isDropdown) {
                  return (
                    <li key={link.label} className="drawer-nav-item drawer-nav-item--dropdown">
                      <button
                        type="button"
                        className={`drawer-nav-btn${mobileCategoryOpen ? ' is-expanded' : ''}${isCurrentActive ? ' is-active' : ''}`}
                        aria-expanded={mobileCategoryOpen}
                        onClick={() => setMobileCategoryOpen((prev) => !prev)}
                      >
                        {isCurrentActive && <span className="drawer-active-pill" aria-hidden="true" />}
                        <span className={`drawer-nav-icon${isCurrentActive ? ' is-active-icon' : ''}`}>
                          <CategoryIcon />
                        </span>
                        <span className="drawer-nav-label">{link.label}</span>
                        <ChevronDown className={`drawer-nav-chevron${mobileCategoryOpen ? ' is-rotated' : ''}`} />
                      </button>

                      <div className={`menu-collapse${mobileCategoryOpen ? ' is-open' : ''}`}><div className="menu-collapse__inner">
                        <div className="drawer-category-dropdown">
                          {PRODUCT_CATEGORIES.map((category) => (
                            <div key={category.id} className="drawer-category-group">
                              <a
                                href={category.href}
                                className={`drawer-category-item${category.subItems ? ' has-submenu' : ''}`}
                                onClick={(e) => {
                                  if (category.subItems) {
                                    e.preventDefault();
                                    setOpenSubmenuId(openSubmenuId === category.id ? null : category.id);
                                    return;
                                  }
                                  handleNavClick(e, category.href);
                                }}
                              >
                                <span className="drawer-category-item-icon">{category.icon}</span>
                                <div className="drawer-category-item-text">
                                  <span className="drawer-category-item-title">{category.title}</span>
                                </div>
                                {!category.subItems && <ChevronRight className="drawer-category-item-arrow" />}
                              </a>
                              {category.subItems && (
                                <>
                                  <button
                                    type="button"
                                    className="drawer-category-toggle"
                                    aria-expanded={openSubmenuId === category.id}
                                    aria-label={`Show ${category.title} submenu`}
                                    onClick={() => setOpenSubmenuId(openSubmenuId === category.id ? null : category.id)}
                                  >
                                    <ChevronDown className={`drawer-category-item-arrow${openSubmenuId === category.id ? ' is-rotated' : ''}`} />
                                  </button>
                                  <div className={`menu-collapse${openSubmenuId === category.id ? ' is-open' : ''}`}><div className="menu-collapse__inner">
                                    <div className="drawer-subcategory-list">
                                      {category.subItems.map((sub) => sub.href ? (
                                        <a
                                          key={sub.href}
                                          href={sub.href}
                                          className="drawer-subcategory-item"
                                          onClick={(e) => handleNavClick(e, sub.href)}
                                        >
                                          {sub.title}
                                          <ChevronRight className="drawer-category-item-arrow" />
                                        </a>
                                      ) : (
                                        <span key={sub.title} className="drawer-subcategory-item is-disabled" aria-disabled="true">
                                          {sub.title}
                                        </span>
                                      ))}
                                    </div>
                                  </div></div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div></div>
                    </li>
                  );
                }

                return (
                  <li key={link.label} className="drawer-nav-item">
                    <a
                      href={link.href}
                      className={`drawer-nav-link${isCurrentActive ? ' is-active' : ''}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {isCurrentActive && <span className="drawer-active-pill" aria-hidden="true" />}
                      <span className={`drawer-nav-icon${isCurrentActive ? ' is-active-icon' : ''}`}>
                        {getDrawerIcon(link.id)}
                      </span>
                      <span className="drawer-nav-label">{link.label}</span>
                      <ChevronRight className="drawer-nav-chevron" />
                    </a>
                  </li>
                );
              })}

              {/* Shopping Cart Drawer Link */}
              <li className="drawer-nav-item">
                <button
                  type="button"
                  className="drawer-nav-link"
                  onClick={() => {
                    close();
                    openCart();
                  }}
                >
                  <span className="drawer-nav-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                      <circle cx="9" cy="20" r="1.3" />
                      <circle cx="18" cy="20" r="1.3" />
                      <path d="M1 1h4l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.5L22 6H5.4" />
                    </svg>
                  </span>
                  <span className="drawer-nav-label">Shopping Cart</span>
                  {totalCount > 0 && (
                    <span className="cart-badge" style={{ position: 'static', marginLeft: 'auto' }}>
                      {totalCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact Us action */}
          <div className="drawer-contact-wrap">
            <a
              href="#contact"
              className="drawer-contact-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span className="drawer-contact-icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              <span className="drawer-contact-label">CONTACT US</span>
              <span className="drawer-contact-arrow" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </a>

          </div>
        </div>
      </aside>
    </header>
  );
}

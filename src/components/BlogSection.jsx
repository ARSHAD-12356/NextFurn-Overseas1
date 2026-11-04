import { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import POSTS from '../data/blogPosts.js';
import '../styles/blog-section.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'Office Furniture', label: 'Office Furniture' },
  { id: 'Healthcare', label: 'Healthcare' },
  { id: 'Institutional', label: 'Institutional' },
  { id: 'Public Seating', label: 'Public Seating' },
  { id: 'Design Trends', label: 'Design Trends' },
  { id: 'Product Guides', label: 'Product Guides' },
  { id: 'Industry Insights', label: 'Industry Insights' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chev-left': return <svg {...c} strokeWidth="2.2"><path d="m15 18-6-6 6-6" /></svg>;
    case 'chev-right': return <svg {...c} strokeWidth="2.2"><path d="m9 18 6-6-6-6" /></svg>;
    case 'search': return <svg {...c} strokeWidth="2"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
    case 'close': return <svg {...c} strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case 'calendar': return <svg {...c}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>;
    case 'clock': return <svg {...c}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>;
    default: return null;
  }
}

function Meta({ post }) {
  return (
    <p className="bl-meta">
      <span><Icon name="calendar" />{post.date}</span>
      <span><Icon name="clock" />{post.read}</span>
    </p>
  );
}

function Cats({ post }) {
  return <p className="bl-cats">{post.cats.map((c, i) => <span key={c}>{i > 0 && <i aria-hidden="true">|</i>}{c}</span>)}</p>;
}

export default function BlogSection({ onNavigateBlog }) {
  const ref = useRef(null);
  const searchRef = useRef(null);
  const touchStartX = useRef(null);
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visible cards count (Desktop: 3, Tablet: 2, Mobile: 1)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 680) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1060) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = POSTS.filter((p) =>
    (cat === 'all' || p.cats.includes(cat)) &&
    (!q || `${p.title} ${p.excerpt} ${p.cats.join(' ')}`.toLowerCase().includes(q)));

  const maxIndex = Math.max(0, filtered.length - visibleCount);

  // Reset current index when filter/query changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cat, query]);

  // Make sure currentIndex never exceeds maxIndex if items shrink
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay smooth sliding effect (pauses on hover)
  useEffect(() => {
    if (isHovered || maxIndex <= 0) return undefined;
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
  }, [isHovered, maxIndex, goNext]);

  const toggleSearch = () => {
    setSearchOpen((o) => {
      if (o) setQuery('');
      else requestAnimationFrame(() => searchRef.current?.focus());
      return !o;
    });
  };

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const s = gsap.utils.selector(el);
      const st = (t, start = 'top 82%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.from(s('.bl-heading'), { autoAlpha: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: st(s('.bl-heading')[0]) });
      gsap.from(s('.bl-filters'), { autoAlpha: 0, y: 18, duration: 0.7, ease: 'power3.out', scrollTrigger: st(s('.bl-filters')[0], 'top 90%') });
      gsap.from(s('.bl-carousel-viewport'), { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: st(s('.bl-carousel-viewport')[0]) });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="blog" className="bl" ref={ref} aria-labelledby="bl-title">
      <header className="bl-heading">
        <p className="bl-heading__eyebrow"><span aria-hidden="true" />Our Blog<span aria-hidden="true" /></p>
        <h2 id="bl-title">Insights &amp; <span>Ideas</span></h2>
        <p className="bl-heading__subtitle">Explore our latest articles on furniture, design trends and industry insights.</p>
      </header>

      {/* ---------- Filters ---------- */}
      <div className="bl-filters">
        <ul className="bl-filters__list" role="tablist" aria-label="Blog categories">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button type="button" role="tab" aria-selected={cat === c.id} className={`bl-pill${cat === c.id ? ' is-active' : ''}`} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <div className={`bl-search${searchOpen ? ' is-open' : ''}`}>
          <input ref={searchRef} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" aria-label="Search articles" tabIndex={searchOpen ? 0 : -1} />
          <button type="button" className="bl-search__btn" aria-label={searchOpen ? 'Close search' : 'Search articles'} aria-expanded={searchOpen} onClick={toggleSearch}>
            <Icon name={searchOpen ? 'close' : 'search'} />
          </button>
        </div>
      </div>

      {/* ---------- Single-Row Carousel Viewport ---------- */}
      <div
        className="bl-carousel-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) goNext();
            else goPrev();
          }
          touchStartX.current = null;
        }}
      >
        {/* Navigation Arrow Controls */}
        {maxIndex > 0 && (
          <>
            <button
              type="button"
              className="bl-nav-btn bl-nav-btn--prev"
              onClick={goPrev}
              aria-label="Previous articles"
            >
              <Icon name="chev-left" />
            </button>
            <button
              type="button"
              className="bl-nav-btn bl-nav-btn--next"
              onClick={goNext}
              aria-label="Next articles"
            >
              <Icon name="chev-right" />
            </button>
          </>
        )}

        <div className="bl-carousel-viewport" aria-live="polite">
          {!filtered.length && <p className="bl-empty">No articles match your search. Try another keyword or category.</p>}
          <div
            className="bl-carousel-track"
            style={{
              '--current-index': currentIndex,
              '--visible-count': visibleCount,
            }}
          >
            {filtered.map((post) => (
              <a
                key={post.id}
                className="bl-card"
                href={`/blog/${post.id}`}
                onClick={(event) => {
                  if (onNavigateBlog) {
                    event.preventDefault();
                    onNavigateBlog(post.id);
                  }
                }}
              >
                <div className="bl-card__media">
                  <img src={post.image} alt={post.alt} loading="lazy" decoding="async" />
                </div>
                <div className="bl-card__body">
                  <Cats post={post} />
                  <h3 className="bl-card__title">{post.title}</h3>
                  <p className="bl-card__excerpt">{post.excerpt}</p>
                  <Meta post={post} />
                  <span className="bl-read">
                    Read More<span className="bl-read__circle"><Icon name="arrow" /></span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        {maxIndex > 0 && (
          <div className="bl-dots" role="tablist" aria-label="Article slides">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`bl-dot${i === currentIndex ? ' is-active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === currentIndex}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

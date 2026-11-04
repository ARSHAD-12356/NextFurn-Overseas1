import { useEffect, useRef, useState } from 'react';
import officeCover from '../assets/brochures/office-furniture-cover-with-logo.png';
import healthcareCover from '../assets/brochures/healthcare-furniture-cover-with-logo.png';
import mainCatalogue from '../assets/brochures/main-furniture-catalogue.png';
import educationalCover from '../assets/brochures/educational-furniture-cover-with-logo.png';
import sofaLoungeCover from '../assets/brochures/sofa-lounge-cover-with-logo.png';
import '../styles/brochures-page.css';

const BOOKLETS = [
  {
    id: 'office-furniture',
    title: 'Office Furniture',
    subtitle: 'Desks, Workstations & Executive Chairs',
    src: officeCover,
  },
  {
    id: 'healthcare-furniture',
    title: 'Healthcare Furniture',
    subtitle: 'Hospital Beds, Medical Cabinets & Seating',
    src: healthcareCover,
  },
  {
    id: 'main-furniture-catalogue',
    title: 'Main Furniture Catalogue',
    subtitle: 'Premium Furniture For Modern Spaces',
    src: mainCatalogue,
  },
  {
    id: 'educational-furniture',
    title: 'Educational Furniture',
    subtitle: 'Classroom Desks, Library & Campus Seating',
    src: educationalCover,
  },
  {
    id: 'sofa-lounge',
    title: 'Sofa and Lounge',
    subtitle: 'Luxury Sofas, Sectionals & Accent Chairs',
    src: sofaLoungeCover,
  },
];

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export default function BrochuresPage({ onNavigate }) {
  // Default active index: 2 (Main Furniture Catalogue in front center)
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches || isPaused) return undefined;

    // Smooth carousel transition from right to middle, middle to left every 3.6s
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % BOOKLETS.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    let resumeTimer;
    const pauseWhileScrolling = () => {
      setIsPaused(true);
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => setIsPaused(false), 900);
    };

    window.addEventListener('scroll', pauseWhileScrolling, { passive: true });
    window.addEventListener('touchmove', pauseWhileScrolling, { passive: true });
    return () => {
      window.clearTimeout(resumeTimer);
      window.removeEventListener('scroll', pauseWhileScrolling);
      window.removeEventListener('touchmove', pauseWhileScrolling);
    };
  }, []);

  const focusShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const activeBooklet = BOOKLETS[activeIndex] || BOOKLETS[2];

  // Helper to determine the slot class for each booklet based on activeIndex
  // 0: Center (Front, biggest)
  // 1: Mid Right (moving towards center)
  // 2: Far Right
  // 3: Far Left
  // 4: Mid Left (moving from center to left)
  const getSlotClass = (index) => {
    const offset = (index - activeIndex + BOOKLETS.length) % BOOKLETS.length;
    switch (offset) {
      case 0:
        return 'brochures-booklet--slot-center';
      case 1:
        return 'brochures-booklet--slot-mid-right';
      case 2:
        return 'brochures-booklet--slot-far-right';
      case 3:
        return 'brochures-booklet--slot-far-left';
      case 4:
        return 'brochures-booklet--slot-mid-left';
      default:
        return 'brochures-booklet--slot-center';
    }
  };

  return (
    <main className="brochures-page">
      <section className="brochures-hero" aria-labelledby="brochures-title">
        <div className="brochures-copy">
          <p className="brochures-eyebrow">
            <span>BROCHURES</span>
            <span className="brochures-eyebrow__rule" aria-hidden="true" />
          </p>

          <h1 id="brochures-title" className="brochures-title">
            <span>Explore Our</span>
            <span className="brochures-title__accent">Furniture Catalogues</span>
          </h1>

          <p className="brochures-description">
            Discover our complete range of furniture solutions across offices, healthcare, education,
            hospitality and more. Browse our catalogues to explore designs, specifications
            and ideas for your space.
          </p>

          <div className="brochures-actions">
            <button
              type="button"
              className="brochures-button brochures-button--primary"
              onClick={focusShowcase}
            >
              <span>Explore Collections</span>
              <ArrowRight />
            </button>
          </div>

          <div className="brochures-active-pill" aria-live="polite">
            <span className="brochures-active-pill__dot" />
            <span className="brochures-active-pill__label">Active Catalogue:</span>
            <strong className="brochures-active-pill__name">{activeBooklet.title}</strong>
          </div>
        </div>

        <div
          className="brochures-showcase-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="brochures-showcase"
            id="brochure-showcase"
            ref={showcaseRef}
            role="region"
            aria-label="Furniture catalogue showcase"
          >
            {/* Ground shadow plane */}
            <div className="brochures-ground-shadow" aria-hidden="true" />

            {BOOKLETS.map((booklet, index) => {
              const isActive = index === activeIndex;
              const slotClass = getSlotClass(index);
              return (
                <div
                  key={booklet.id}
                  className={`brochures-booklet ${slotClass} ${isActive ? 'brochures-booklet--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={isActive ? `${booklet.title} catalogue.` : `${booklet.title} catalogue. Click to bring to front.`}
                >
                  <img
                    className="brochures-booklet__img"
                    src={booklet.src}
                    alt={booklet.title}
                    draggable="false"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>

          {/* Quick selector tabs */}
          <div className="brochures-tabs" role="tablist" aria-label="Choose catalogue">
            {BOOKLETS.map((booklet, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={booklet.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`brochures-tab-btn ${isActive ? 'brochures-tab-btn--active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {booklet.title.replace(' Furniture', '').replace(' Catalogue', '')}
                </button>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

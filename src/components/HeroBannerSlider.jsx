import { useState, useEffect, useRef, useCallback } from 'react';
import banner1Desktop from '../assets/banners/banner-first-desktop.webp';
import banner1Mobile from '../assets/banners/banner-first-mobile.webp';
import banner2Desktop from '../assets/banners/new-banner.webp';
import banner2Mobile from '../assets/banners/new-banner-mobile.webp';
import banner3Desktop from '../assets/banners/hero-banner-2.jpg';
import banner3Mobile from '../assets/banners/hero-banner-2-mobile.png';
import banner4Desktop from '../assets/banners/banner-festive-desktop.webp';
import banner4Mobile from '../assets/banners/banner-festive-mobile.webp';
import '../styles/hero.css';

const HERO_SLIDES = [
  {
    id: 'hero-slide-1',
    desktop: banner1Desktop,
    mobile: banner1Mobile,
    alt: 'NextFurn Overseas — Premium Commercial & Workspace Furniture Solutions',
  },
  {
    id: 'hero-slide-2',
    desktop: banner2Desktop,
    mobile: banner2Mobile,
    alt: 'NextFurn Overseas — Executive Office Furniture & Commercial Solutions',
  },
  {
    id: 'hero-slide-3',
    desktop: banner3Desktop,
    mobile: banner3Mobile,
    alt: 'NextFurn Overseas — Luxury Modern Workspace Furniture',
  },
  {
    id: 'hero-slide-4',
    desktop: banner4Desktop,
    mobile: banner4Mobile,
    alt: 'A celebration of timeless Indian charm. Let your home tell a story this festive season',
  },
];

const DEFAULT_AUTOPLAY_DELAY = 5000;

export default function HeroBannerSlider({
  id = 'hero-slider',
  title,
  className = '',
  autoplayMs = DEFAULT_AUTOPLAY_DELAY,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  // Clear any existing autoplay timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start autoplay timer; it keeps running while the cursor is over the banner
  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoplayMs);
  }, [clearTimer, totalSlides, autoplayMs]);

  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    };
  }, [startTimer, clearTimer]);

  const goToSlide = (index) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
    startTimer();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    startTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startTimer();
  };

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
    clearTimer();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const swipeThreshold = 50;
      if (distance > swipeThreshold) {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      } else if (distance < -swipeThreshold) {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    startTimer();
  };

  return (
    <section
      className={`hero-banner ${className}`.trim()}
      id={id}
      aria-label="NextFurn Overseas Showcase Carousel"
      role="region"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {title && <h1 className="visually-hidden">{title}</h1>}

      <div className="hero-banner__image-wrapper">
        <div
          className="hero-banner__track"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-banner__slide ${currentIndex === index ? 'hero-banner__slide--active' : ''}`}
              aria-hidden={currentIndex !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}`}
            >
              <picture className="hero-banner__picture">
                <source media="(max-width: 768px)" srcSet={slide.mobile} />
                <img
                  src={slide.desktop}
                  alt={slide.alt}
                  className="hero-banner__image"
                  fetchpriority={index === 0 ? 'high' : 'auto'}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              className="hero-banner__nav hero-banner__nav--prev"
              onClick={prevSlide}
              aria-label="Previous banner"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              className="hero-banner__nav hero-banner__nav--next"
              onClick={nextSlide}
              aria-label="Next banner"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Dots / Indicators */}
            <div
              className="hero-banner__dots"
              role="tablist"
              aria-label="Hero banner pagination"
            >
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  id={`${id}-dot-${index}`}
                  aria-selected={currentIndex === index}
                  aria-label={`Show banner ${index + 1}`}
                  className={`hero-banner__dot ${currentIndex === index ? 'hero-banner__dot--active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

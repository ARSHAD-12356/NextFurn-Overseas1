import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import aboutDirectorImg from '../assets/about-director-cutout.webp';
import missionImg from '../assets/about-mission-reference.png';
import visionImg from '../assets/about-vision-reference.png';
import '../styles/about-section.css';

export default function AboutPage() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const el = ref.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(q('.ap-hero__eyebrow'), { autoAlpha: 0, y: -16, duration: 0.6 })
        .from(q('.ap-hero__title span'), { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 }, '<0.1')
        .from(q('.ap-hero__description'), { autoAlpha: 0, y: 18, duration: 0.6 }, '<0.2')
        .from(q('.ap-hero__features'), { autoAlpha: 0, y: 16, duration: 0.6 }, '<0.1')
        .from(q('.ap-hero__visual'), { autoAlpha: 0, scale: 0.98, duration: 0.85 }, '<0.2')
        .from(q('.ap-hero__director'), { autoAlpha: 0, x: 24, y: 20, duration: 0.7 }, '<0.3');
    });
    return () => mm.revert();
  }, []);

  return (
    <div id="about-page" className="ab-page" ref={ref}>
      <section className="ap-hero" aria-labelledby="ap-hero-title">
        <div className="ap-hero__content">
          <p className="ap-hero__eyebrow"><span>ABOUT US</span><i aria-hidden="true" /></p>
          <h1 id="ap-hero-title" className="ap-hero__title">
            <span>Driven by People,</span>
            <span>Inspired by <strong>Better Spaces</strong></span>
          </h1>
          <p className="ap-hero__description">
            At NextFurn Overseas, we believe furniture is more than just products — it’s about creating spaces that improve the way people live, work and learn. Our journey is guided by quality, functionality and a deeper understanding of real needs.
          </p>

          <div className="ap-hero__features">
            <article className="ap-hero__feature">
              <span className="ap-hero__feature-icon ap-hero__feature-icon--sage" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
                  <path d="M4 11h16a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2Z" />
                  <path d="M4 17v3m16-3v3" />
                </svg>
              </span>
              <h2>Quality First</h2>
              <p>Reliable and durable<br />furniture solutions</p>
            </article>
            <article className="ap-hero__feature">
              <span className="ap-hero__feature-icon ap-hero__feature-icon--peach" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1" />
                  <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.6V20" />
                </svg>
              </span>
              <h2>People Focused</h2>
              <p>Spaces designed<br />for real people</p>
            </article>
            <article className="ap-hero__feature">
              <span className="ap-hero__feature-icon ap-hero__feature-icon--sage" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z" />
                  <path d="M4 21c3-5 7-8 12-11" />
                </svg>
              </span>
              <h2>Sustainable Growth</h2>
              <p>Responsible choices<br />for a better tomorrow</p>
            </article>
          </div>

          <a className="ap-hero__cta" href="#ms-title">
            <span>Our Story</span>
            <span className="ap-hero__cta-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </a>
        </div>

        <div className="ap-hero__visual">
          <div className="ap-hero__media">
            <div className="ap-hero__scene" aria-hidden="true" />
            <span className="ap-hero__pendant" aria-hidden="true"><i /></span>
            <div className="ap-hero__niche">
              <img
                src={aboutDirectorImg}
                alt="Rakhi Kumari, Director of NextFurn Overseas"
                className="ap-hero__portrait"
                loading="eager"
                decoding="async"
                width="1076"
                height="1414"
              />
            </div>
          </div>
          <aside className="ap-hero__director" aria-label="About Rakhi Kumari">
            <span className="ap-hero__director-rule" aria-hidden="true" />
            <h2>Rakhi Kumari</h2>
            <p className="ap-hero__director-role">Director</p>
            <p className="ap-hero__director-company">NextFurn Overseas</p>
            <span className="ap-hero__director-divider" aria-hidden="true" />
            <span className="ap-hero__quote-mark" aria-hidden="true">“</span>
            <p className="ap-hero__quote">Better spaces create brighter futures for everyone.</p>
          </aside>
        </div>
      </section>

      {/* ---------- Our Mission Section (Matched to Reference) ---------- */}
      <section className="ab-mission" aria-labelledby="ms-title">
        <div className="ab-mission__container">
          {/* Left Column: Heading, Statement, Description & 4 Feature Cards */}
          <div className="ms-content">
            <h2 id="ms-title" className="ms-title">
              <span className="ms-title__our">Our </span>
              <span className="ms-title__mission">Mission</span>
            </h2>

            <p className="ms-statement">
              To create inspiring, functional and sustainable spaces through high-quality furniture solutions.
            </p>

            <div className="ms-divider" aria-hidden="true" />

            <p className="ms-desc">
              At <strong>NextFurn Overseas</strong>, our mission is to design and deliver furniture that enhances the way people live, work, learn and heal. We are committed to combining innovation, quality and sustainability to create spaces that are comfortable, functional and built for a better tomorrow.
            </p>

            {/* 4 Feature Cards Grid */}
            <div className="ms-cards">
              {/* Card 1: Quality Spaces */}
              <div className="ms-card">
                <div className="ms-card__icon ms-card__icon--orange" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="ms-card__info">
                  <h3 className="ms-card__title">Quality Spaces</h3>
                  <p className="ms-card__desc">Deliver durable and stylish furniture solutions.</p>
                </div>
              </div>

              {/* Card 2: People Centric */}
              <div className="ms-card">
                <div className="ms-card__icon ms-card__icon--green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="ms-card__info">
                  <h3 className="ms-card__title">People Centric</h3>
                  <p className="ms-card__desc">Design spaces that meet real needs.</p>
                </div>
              </div>

              {/* Card 3: Continuous Innovation */}
              <div className="ms-card">
                <div className="ms-card__icon ms-card__icon--green" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
                  </svg>
                </div>
                <div className="ms-card__info">
                  <h3 className="ms-card__title">Continuous Innovation</h3>
                  <p className="ms-card__desc">Bring modern designs and practical solutions.</p>
                </div>
              </div>

              {/* Card 4: Sustainable Growth */}
              <div className="ms-card">
                <div className="ms-card__icon ms-card__icon--orange" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div className="ms-card__info">
                  <h3 className="ms-card__title">Sustainable Growth</h3>
                  <p className="ms-card__desc">Create a greener and better tomorrow.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Furniture Interior Photograph */}
          <div className="ms-media-wrap">
            {/* Dark Forest-Green Offset Backing Shape */}
            <div className="ms-media__backing" aria-hidden="true" />

            {/* Thin Orange Outline Shape */}
            <div className="ms-media__outline" aria-hidden="true" />

            {/* Main Photograph Frame */}
            <div className="ms-media__frame">
              <img
                src={missionImg}
                alt="NextFurn Overseas premium commercial furniture lounge interior"
                className="ms-media__img"
                loading="lazy"
                decoding="async"
                width="1445"
                height="1088"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our Vision Section (Matched to Reference) ---------- */}
      <section className="ab-vision" aria-labelledby="vs-main-heading">
        <div className="ab-vision__container">
          {/* 1. Centered Section Heading at Top */}
          <h2 id="vs-main-heading" className="vs-top-heading">
            <span className="vs-top-heading__our">Our </span>
            <span className="vs-top-heading__vision">Vision</span>
          </h2>

          {/* 2. Main Two-Column Layout (Left: Image, Right: Content) */}
          <div className="vs-main-grid">
            {/* Left Column: Layered Furniture Interior Photograph */}
            <div className="vs-media-wrap">
              {/* Dark Forest-Green Offset Backing Shape (Top-left) */}
              <div className="vs-media__backing" aria-hidden="true" />

              {/* Thin Outlined Frame Offset (Lower-right) - NextFurn Logo Brownie Color */}
              <div className="vs-media__outline" aria-hidden="true" />

              {/* Main Photo Frame */}
              <div className="vs-media__frame">
                <img
                  src={visionImg}
                  alt="NextFurn Overseas modern showroom and lounge interior"
                  className="vs-media__img"
                  loading="lazy"
                  decoding="async"
                  width="1751"
                  height="898"
                />
              </div>
            </div>

            {/* Right Column: Vision Heading, Divider & Description */}
            <div className="vs-content">
              <h3 className="vs-title">
                <span className="vs-title__line">Building Inspiring</span>
                <span className="vs-title__line">Spaces for a</span>
                <span className="vs-title__line vs-title__brownie">Better Tomorrow</span>
              </h3>

              <div className="vs-divider" aria-hidden="true" />

              <p className="vs-desc">
                We envision a world where thoughtfully designed furniture transforms everyday spaces into healthier, more productive and inspiring environments. At NextFurn Overseas, we aim to set new standards in quality, design and sustainability, making modern spaces accessible for everyone.
              </p>
            </div>
          </div>

          {/* 3. Three Feature Cards Row */}
          <div className="vs-cards">
            {/* Card 1: Exceptional Design & Quality */}
            <div className="vs-card-wrapper">
              <div className="vs-card-strip vs-card-strip--brownie" aria-hidden="true" />
              <div className="vs-card">
                <div className="vs-card__left">
                  <div className="vs-card__icon vs-card__icon--brownie" aria-hidden="true">
                    {/* Diamond Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                      <path d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" />
                    </svg>
                  </div>
                  <div className="vs-card__info">
                    <h4 className="vs-card__title">Exceptional Design<br />& Quality</h4>
                    <p className="vs-card__desc">Delivering furniture solutions that combine timeless design with lasting durability.</p>
                  </div>
                </div>
                <div className="vs-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2: People First Approach */}
            <div className="vs-card-wrapper">
              <div className="vs-card-strip vs-card-strip--green" aria-hidden="true" />
              <div className="vs-card">
                <div className="vs-card__left">
                  <div className="vs-card__icon vs-card__icon--green" aria-hidden="true">
                    {/* Users / People Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="vs-card__info">
                    <h4 className="vs-card__title">People First<br />Approach</h4>
                    <p className="vs-card__desc">Creating spaces that enhance comfort, productivity and well-being for every individual.</p>
                  </div>
                </div>
                <div className="vs-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3: Innovative & Future Ready */}
            <div className="vs-card-wrapper">
              <div className="vs-card-strip vs-card-strip--brownie" aria-hidden="true" />
              <div className="vs-card">
                <div className="vs-card__left">
                  <div className="vs-card__icon vs-card__icon--brownie" aria-hidden="true">
                    {/* Leaf Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>
                  <div className="vs-card__info">
                    <h4 className="vs-card__title">Innovative &<br />Future Ready</h4>
                    <p className="vs-card__desc">Continuously evolving with modern designs and sustainable practices for a better tomorrow.</p>
                  </div>
                </div>
                <div className="vs-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


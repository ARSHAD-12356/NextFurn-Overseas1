import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imgOffice from '../assets/banners/banner-1.jpg';
import imgLounge from '../assets/banners/banner-3.jpg';
import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import founderImg from '../assets/founderimg.png';
import '../styles/about-section.css';

gsap.registerPlugin(ScrollTrigger);

// Set this when a brand film exists; until then the play button is shown as "coming soon".
const STORY_VIDEO_URL = null;

const BADGE_ROWS = [
  { icon: 'diamond', label: 'Global Presence' },
  { icon: 'gear', label: 'Customized Solutions' },
  { icon: 'users', label: 'Trusted Partnerships' },
];

const FEATURES = [
  { icon: 'chair', title: 'Modern & Functional Designs', text: 'Beautiful furniture that fits real-world needs.' },
  { icon: 'gear', title: 'Premium Quality Materials', text: 'Built to last with global manufacturing standards.' },
  { icon: 'leaf', title: 'Sustainable Approach', text: 'Eco-friendly furniture for a greener future.' },
  { icon: 'users', title: 'Client-Centric Solutions', text: 'Tailored designs for every space and industry.' },
];

function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'play': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>;
    case 'diamond': return <svg {...c}><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l3 16 3-16" /></svg>;
    case 'gear': return <svg {...c}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>;
    case 'users': return <svg {...c}><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.4" /><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" /></svg>;
    case 'chair': return <svg {...c}><path d="M6 11V7a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4" /><path d="M4 12a2 2 0 0 1 4 0v2h8v-2a2 2 0 0 1 4 0v4H4z" /><path d="M6 16v4M18 16v4" /></svg>;
    case 'leaf': return <svg {...c}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19 14 10" /></svg>;
    default: return null;
  }
}

function PlayButton({ url, label, className }) {
  const inner = <span className="ab-play__ring"><Icon name="play" /></span>;
  return url
    ? <a className={`ab-play ${className}`} href={url} target="_blank" rel="noopener noreferrer">{inner}<span>{label}</span></a>
    : <span className={`ab-play ${className} is-pending`} title="Video coming soon">{inner}<span>{label}</span></span>;
}

export default function AboutSection() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const mm = gsap.matchMedia(el);
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const st = (t, start = 'top 80%') => ({ trigger: t, start, toggleActions: 'play none none reverse' });
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: st(q('.ab-hero')[0]) })
        .from(q('.ab-hero__pill'), { autoAlpha: 0, y: -16, duration: 0.6 })
        .from(q('.ab-hero__title span'), { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.1 }, '<0.1')
        .from(q('.ab-hero__desc'), { autoAlpha: 0, y: 18, duration: 0.6 }, '<0.2')
        .from(q('.ab-hero__values'), { autoAlpha: 0, y: 16, duration: 0.6 }, '<0.1')
        .from(q('.ab-portrait-wrap'), { autoAlpha: 0, scale: 0.95, y: 30, duration: 0.9 }, '<0.2')
        .from(q('.ab-founder-card'), { autoAlpha: 0, x: 20, y: 20, duration: 0.7 }, '<0.3');
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="ab" ref={ref} aria-labelledby="ab-title">
      {/* ---------- Rebuilt About Us Hero Section (Ref-Matched) ---------- */}
      <div className="ab-hero">
        <div className="ab-hero__container">
          {/* A. Top Label */}
          <div className="ab-hero__pill">
            <span className="ab-hero__pill-dot-wrap" aria-hidden="true">
              <span className="ab-hero__pill-dot" />
            </span>
            <span className="ab-hero__pill-text">ABOUT NEXTFURN OVERSEAS</span>
            <span className="ab-hero__pill-dash" aria-hidden="true">—</span>
          </div>

          {/* B. Main Heading */}
          <h1 id="ab-title" className="ab-hero__title">
            <span className="ab-hero__title-line1">Creating Spaces for a</span>
            <span className="ab-hero__title-line2">Better Tomorrow</span>
          </h1>

          {/* C. Supporting Description */}
          <p className="ab-hero__desc">
            Thoughtful, durable furniture solutions for homes, offices, schools<br />
            and public spaces.
          </p>

          {/* D. Three Compact Value Points */}
          <div className="ab-hero__values">
            <div className="ab-value-point">
              {/* Diamond Icon (Orange) */}
              <svg className="ab-value-icon ab-value-icon--diamond" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" />
              </svg>
              <span className="ab-value-label">Quality First</span>
            </div>

            <span className="ab-value-divider" aria-hidden="true" />

            <div className="ab-value-point">
              {/* People Icon (Dark Green) */}
              <svg className="ab-value-icon ab-value-icon--people" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="ab-value-label">People Focused</span>
            </div>

            <span className="ab-value-divider" aria-hidden="true" />

            <div className="ab-value-point">
              {/* Leaf Icon (Green) */}
              <svg className="ab-value-icon ab-value-icon--leaf" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="#FAF8F4" strokeWidth="1.5" />
              </svg>
              <span className="ab-value-label">Sustainable</span>
            </div>
          </div>

          {/* E. Centered Portrait Section with Layered Shapes */}
          <div className="ab-portrait-wrap">
            {/* Dark Forest-Green Offset Backing Shape (Visible on left) */}
            <div className="ab-portrait__backing" aria-hidden="true" />

            {/* Thin Orange Outline Shape (Visible on right & bottom) */}
            <div className="ab-portrait__outline" aria-hidden="true" />

            {/* Main Portrait Photo */}
            <div className="ab-portrait__frame">
              <img
                src={founderImg}
                alt="Rakhi Kumari, Founder of NextFurn Overseas"
                className="ab-portrait__img"
                loading="eager"
                decoding="async"
                width="420"
                height="510"
              />
            </div>

            {/* F. Founder Information Card (Overlapping lower-right) */}
            <div className="ab-founder-card">
              <div className="ab-founder-card__content">
                <div className="ab-founder-card__name-row">
                  <span className="ab-founder-card__name">Rakhi Kumari</span>
                  {/* Orange Verified Checkmark Badge */}
                  <span className="ab-founder-card__badge-check" title="Verified Founder">
                    <svg viewBox="0 0 24 24" fill="#F4510B" aria-hidden="true">
                      <path d="M12 2l2.4 2.1 3.2-.4 1.3 2.9 3 .9-.4 3.2 2.1 2.4-2.1 2.4.4 3.2-3 .9-1.3 2.9-3.2-.4L12 22l-2.4-2.1-3.2.4-1.3-2.9-3-.9.4-3.2L.4 12l2.1-2.4-.4-3.2 3-.9 1.3-2.9 3.2.4L12 2z" />
                      <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </span>
                </div>
                <span className="ab-founder-card__role">FOUNDER</span>
                <span className="ab-founder-card__company">NextFurn Overseas</span>
              </div>

              {/* Circular Dark Green Icon with White Architecture Building */}
              <div className="ab-founder-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
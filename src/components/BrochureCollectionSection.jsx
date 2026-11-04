import officeBook from '../assets/brochures/office-furniture-cover.png';
import healthcareBook from '../assets/brochures/healthcare-furniture-cover.png';
import mainBook from '../assets/brochures/main-furniture-catalogue.png';
import educationalBook from '../assets/brochures/educational-furniture-cover.png';
import sofaBook from '../assets/brochures/sofa-lounge-cover.png';
import '../styles/brochure-collection.css';

// SVG Icons
function ChairIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Office ergonomic chair icon */}
      <path d="M7 3h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M5 13h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2z" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="M4 8v3M20 8v3" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function MedicalCrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-5v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-5H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h5V3z" />
    </svg>
  );
}

function SofaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
      <path d="M3 13h18" />
      <path d="M4 18v2M20 18v2" />
      <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export default function BrochureCollectionSection() {
  const BROCHURES = {
    office: {
      title: 'Office Furniture',
      cover: officeBook,
    },
    educational: {
      title: 'Educational & Institutional',
      cover: educationalBook,
    },
    main: {
      title: 'Main Catalogue',
      cover: mainBook,
    },
    healthcare: {
      title: 'Healthcare Furniture',
      cover: healthcareBook,
    },
    sofa: {
      title: 'Sofa & Lounge',
      cover: sofaBook,
    },
  };

  return (
    <section className="bc-section" aria-labelledby="bc-heading">
      <div className="bc-container">
        {/* Section Heading */}
        <header className="bc-header">
          <p className="bc-eyebrow">
            <span className="bc-eyebrow__line" aria-hidden="true" />
            <span>BROCHURES</span>
            <span className="bc-eyebrow__line" aria-hidden="true" />
          </p>
          <h2 id="bc-heading" className="bc-title">
            <span>Explore Our</span> <span className="bc-title__accent">Brochures</span>
          </h2>
        </header>

        {/* 5-Card Asymmetric Grid */}
        <div className="bc-grid">
          {/* ================= LEFT COLUMN ================= */}
          <div className="bc-col bc-col--left">
            {/* Card 1: Office Furniture (Top Left, Deep Green) */}
            <article className="bc-card bc-card--office">
              <div className="bc-card__backdrop" aria-hidden="true" />
              <div className="bc-card__book-container">
                <img
                  src={BROCHURES.office.cover}
                  alt="Office Furniture Brochure Cover"
                  className="bc-card__book-img"
                  loading="lazy"
                />
              </div>
              <div className="bc-card__content">
                <div className="bc-card__badge bc-card__badge--office" aria-hidden="true">
                  <ChairIcon />
                </div>
                <h3 className="bc-card__title bc-card__title--white">Office Furniture</h3>
              </div>
            </article>

            {/* Card 2: Educational & Institutional (Bottom Left, Cream) */}
            <article className="bc-card bc-card--educational">
              <div className="bc-card__book-container">
                <img
                  src={BROCHURES.educational.cover}
                  alt="Educational & Institutional Brochure Cover"
                  className="bc-card__book-img"
                  loading="lazy"
                />
              </div>
              <div className="bc-card__content">
                <div className="bc-card__badge bc-card__badge--brown" aria-hidden="true">
                  <GraduationCapIcon />
                </div>
                <h3 className="bc-card__title bc-card__title--green">
                  Educational &amp; Institutional
                </h3>
              </div>
            </article>
          </div>

          {/* ================= CENTER COLUMN (MAIN HERO CARD) ================= */}
          <div className="bc-col bc-col--center">
            <article className="bc-card bc-card--main">
              <div className="bc-card__main-card-bg" aria-hidden="true" />
              <div className="bc-card__main-book-wrap">
                <img
                  src={BROCHURES.main.cover}
                  alt="Main Furniture Catalogue 2026"
                  className="bc-card__main-book-img"
                  loading="eager"
                />
              </div>
            </article>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="bc-col bc-col--right">
            {/* Card 4: Healthcare Furniture (Top Right, Mint Green) */}
            <article className="bc-card bc-card--healthcare">
              <div className="bc-card__book-container">
                <img
                  src={BROCHURES.healthcare.cover}
                  alt="Healthcare Furniture Brochure Cover"
                  className="bc-card__book-img"
                  loading="lazy"
                />
              </div>
              <div className="bc-card__content">
                <div className="bc-card__badge bc-card__badge--green" aria-hidden="true">
                  <MedicalCrossIcon />
                </div>
                <h3 className="bc-card__title bc-card__title--green">Healthcare Furniture</h3>
              </div>
            </article>

            {/* Card 5: Sofa & Lounge (Bottom Right, Peach/Cream) */}
            <article className="bc-card bc-card--sofa">
              <div className="bc-card__book-container">
                <img
                  src={BROCHURES.sofa.cover}
                  alt="Sofa and Lounge Brochure Cover"
                  className="bc-card__book-img"
                  loading="lazy"
                />
              </div>
              <div className="bc-card__content">
                <div className="bc-card__badge bc-card__badge--brown" aria-hidden="true">
                  <SofaIcon />
                </div>
                <h3 className="bc-card__title bc-card__title--green">Sofa &amp; Lounge</h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

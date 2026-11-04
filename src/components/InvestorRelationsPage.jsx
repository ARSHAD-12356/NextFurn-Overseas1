import investorHeroImage from '../assets/banners/investor-relations-hero.webp';
import '../styles/investor-relations.css';

function ValueIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'fundamentals') {
    return <svg {...common}><path d="M4 20v-6h4v6M10 20V9h4v11M16 20V4h4v16" /></svg>;
  }
  if (name === 'sustainable') {
    return <svg {...common}><path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 8-8 8-16Z" /><path d="M4 21c3-5 7-8 12-11" /></svg>;
  }
  return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}

export default function InvestorRelationsPage({ onNavigate }) {
  return (
    <section id="investor" className="ir-hero" aria-labelledby="ir-title">
      <div
        className="ir-hero__art"
        style={{ backgroundImage: `url(${investorHeroImage})` }}
        aria-hidden="true"
      />
      <div className="ir-hero__content">
        <p className="ir-hero__eyebrow"><span>Investor Relations</span></p>
        <h1 id="ir-title" className="ir-hero__title">
          <span>Building</span>
          <span className="ir-hero__title-accent">Sustainable Growth</span>
        </h1>
        <p className="ir-hero__description">
          Creating long-term value through strong fundamentals, innovation and a
          commitment to a better tomorrow.
        </p>

        <ul className="ir-hero__values" aria-label="Our values">
          <li className="ir-value">
            <span className="ir-value__icon"><ValueIcon name="fundamentals" /></span>
            <span>Strong<br />Fundamentals</span>
          </li>
          <li className="ir-value">
            <span className="ir-value__icon ir-value__icon--accent"><ValueIcon name="sustainable" /></span>
            <span>Sustainable<br />Business</span>
          </li>
          <li className="ir-value">
            <span className="ir-value__icon"><ValueIcon name="long-term" /></span>
            <span>Long-Term<br />Value</span>
          </li>
        </ul>

        <div className="ir-hero__actions">
          <a className="ir-button ir-button--primary" href="#contact" onClick={(event) => {
            event.preventDefault();
            if (onNavigate) onNavigate('home', '#contact');
          }}>
            Investor Information
            <span aria-hidden="true">→</span>
          </a>
          <a className="ir-button ir-button--outline" href="#contact" onClick={(event) => {
            event.preventDefault();
            if (onNavigate) onNavigate('home', '#contact');
          }}>
            Get in Touch
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

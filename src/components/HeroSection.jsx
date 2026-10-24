import Header from './Header.jsx';
import officeDesk from '../assets/rooms/office-desk.webp';
import '../styles/hero.css';

export default function HeroSection() {
  return (
    <>
      <Header />
      <section className="hero-banner" id="home" aria-label="Executive Office Showcase">
        <h1 className="visually-hidden">
          NextFurn Overseas — Executive Office Furniture
        </h1>
        <div className="hero-banner__image-wrapper">
          <img
            src={officeDesk}
            alt="NextFurn Overseas Executive Office Desk and Interior"
            className="hero-banner__image"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>
    </>
  );
}

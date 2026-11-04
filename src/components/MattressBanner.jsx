import desktopBanner from '../assets/banners/mattress-banner-desktop.webp';
import mobileBanner from '../assets/banners/mattress-banner-mobile.webp';
import '../styles/mattress-banner.css';

export default function MattressBanner({ onNavigate }) {
  return (
    <section className="mattress-banner" aria-label="Mattresses starting from ₹2,999">
      <a
        href="/mattresses"
        onClick={(event) => {
          event.preventDefault();
          onNavigate?.('mattresses');
        }}
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileBanner} width="1200" height="900" />
          <img
            src={desktopBanner}
            alt="Mattresses starting from ₹2,999, with breathable fabric, multi-layer comfort and orthopedic support"
            width="2000"
            height="504"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </a>
    </section>
  );
}

import logoIcon from '../assets/banners/logo-icon.png';
import logoWordmark from '../assets/banners/logo-wordmark.png';
import '../styles/footer.css';

/* ---------- Site configuration: edit here ---------- */
// Contact details from the NextFurn Overseas 2026 price lists.
const CONTACT = {
  address: 'Alpaaye Colony, Gate No. 1, Zero Mile, Transport Nagar,',
  addressNote: 'Near Vikas Transport, Kumhrar, Patna - 800 026',
  phone: '+91 99909 26199',
  phoneHref: 'tel:+919990926199',
  phoneNote: 'N.K. Singh \u00B7 +91 96647 61989',
  email: 'nextfurn12@gmail.com',
  emailNote: 'Sales & product enquiries',
};

// Social media channels
const SOCIAL = [
  { id: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/919990926199' },
  { id: 'mail', label: 'Email Us', url: 'mailto:nextfurn12@gmail.com' },
];

// `href: null` = page not built yet; the item shows but is not a link.
const COLUMNS = [
  { title: 'Quick Links', links: [
    { label: 'Home', href: '#home' }, { label: 'About Us', href: '#about' }, { label: 'Our Collections', href: '#products' },
    { label: 'Projects', href: null }, { label: 'Blog', href: null }, { label: 'Contact Us', href: '#contact' },
  ] },
  { title: 'Our Collections', links: [
    { label: 'Office Furniture', href: '#products' }, { label: 'Institutional Furniture', href: '#products' },
    { label: 'Healthcare Furniture', href: '#products' }, { label: 'Public Seating', href: '#products' },
    { label: 'Custom Furniture', href: '#contact' }, { label: 'Executive Collection', href: '#bestsellers' },
  ] },
  { title: 'Support', links: [
    { label: 'FAQs', href: null }, { label: 'Shipping & Delivery', href: null }, { label: 'Returns & Refunds', href: null },
    { label: 'Warranty Policy', href: null }, { label: 'Privacy Policy', href: null }, { label: 'Terms & Conditions', href: null },
  ] },
];


function Icon({ name }) {
  const c = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'arrow': return <svg {...c} strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'chev': return <svg {...c} strokeWidth="2"><path d="m9 6 6 6-6 6" /></svg>;
    case 'mail': return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
    case 'pin': return <svg {...c}><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>;
    case 'phone': return <svg {...c}><path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
    case 'facebook': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" /></svg>;
    case 'instagram': return <svg {...c} strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" /></svg>;
    case 'whatsapp': return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.3-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.6 2.5 3.9 3.4.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" /></svg>;
    default: return null;
  }
}

function FootLink({ link, currentPage, onNavigate }) {
  const inner = <><span className="ft-chev"><Icon name="chev" /></span>{link.label}</>;
  if (!link.href) {
    return <span className="ft-link is-pending" title="Page coming soon">{inner}</span>;
  }

  const handleClick = (e) => {
    if (link.href === '#about') {
      e.preventDefault();
      if (onNavigate) onNavigate('about');
      else window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.href === '#home' || link.href === '#') {
      e.preventDefault();
      if (onNavigate) onNavigate('home');
      else window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage === 'about' || currentPage === 'investor' || currentPage === 'gifting') {
      e.preventDefault();
      if (onNavigate) onNavigate('home', link.href);
      else window.location.hash = link.href;
    }
  };

  return <a className="ft-link" href={link.href} onClick={handleClick}>{inner}</a>;
}

export default function Footer({ currentPage = 'home', onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="ft">
      <div className="ft-body">
        <svg className="ft-map" viewBox="0 0 1000 500" aria-hidden="true">
          <defs>
            <pattern id="ft-dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.6" fill="#7aa48e" /></pattern>
          </defs>
          <g fill="url(#ft-dots)">
            <path d="M80 90c60-40 170-50 240-20 30 14 20 50-10 70-30 20-40 50-70 70-30 20-60 10-80-20-20-30-60-40-80-60s-20-30 0-40z" />
            <path d="M260 280c40-10 80 10 90 50 10 50-20 110-50 140-20 20-40 0-40-30s-30-60-20-100c4-30 0-55 20-60z" />
            <path d="M440 90c40-30 110-30 140-10 20 14 0 40-20 50-30 14-20 40-50 40s-60-20-70-40c-6-14-10-30 0-40z" />
            <path d="M470 210c40-20 100-10 120 30 20 40 10 100-20 140-30 40-60 30-70 0-10-34-30-60-40-100-6-30-10-56 10-70z" />
            <path d="M580 80c80-40 230-40 320 0 40 18 30 60-10 80-50 24-60 60-110 70-60 12-90-20-130-30-40-10-90-10-100-40-10-30 0-60 30-80z" />
            <path d="M800 320c40-16 100-10 120 20 14 24-10 60-50 66-40 6-80-6-90-30-8-20 0-46 20-56z" />
          </g>
        </svg>
        <div className="ft-main">
          <div className="ft-brand">
            <div className="ft-logo">
              <img className="ft-logo__icon" src={logoIcon} alt="" width="553" height="466" loading="lazy" />
              <img className="ft-logo__word" src={logoWordmark} alt="NextFurn Overseas" width="900" height="184" loading="lazy" />
            </div>
            <p className="ft-brand__text">
              NextFurn Overseas is a global furniture brand dedicated to creating modern, functional and elegant spaces for offices,
              institutions, healthcare facilities and public environments.
            </p>
            <ul className="ft-social">
              {SOCIAL.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target={s.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={s.label}
                    title={s.label}
                    className={`ft-social__btn ft-social__btn--${s.id}`}
                  >
                    <Icon name={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="ft-col" aria-label={col.title}>
              <h3 className="ft-col__title">{col.title}</h3>
              <span className="ft-col__line" aria-hidden="true" />
              <ul>{col.links.map((l) => <li key={l.label}><FootLink link={l} currentPage={currentPage} onNavigate={onNavigate} /></li>)}</ul>
            </nav>
          ))}

          <div className="ft-col ft-contact">
            <h3 className="ft-col__title">Get In Touch</h3>
            <span className="ft-col__line" aria-hidden="true" />
            <ul>
              <li><span className="ft-contact__icon"><Icon name="pin" /></span><span><strong>{CONTACT.address}</strong>{CONTACT.addressNote}</span></li>
              <li><span className="ft-contact__icon"><Icon name="phone" /></span><span><a href={CONTACT.phoneHref}><strong>{CONTACT.phone}</strong></a>{CONTACT.phoneNote}</span></li>
              <li><span className="ft-contact__icon"><Icon name="mail" /></span><span><a href={`mailto:${CONTACT.email}`}><strong>{CONTACT.email}</strong></a>{CONTACT.emailNote}</span></li>
            </ul>
            <a className="ft-cta" href={`mailto:${CONTACT.email}`}>
              <span>Contact Us</span>
              <span className="ft-cta__circle"><Icon name="arrow" /></span>
            </a>
          </div>
        </div>

        <div className="ft-bottom">
          <p>&copy; {year} NextFurn Overseas. All rights reserved.</p>
          <p className="ft-bottom__slogan">Designing Better Spaces Across the World<span aria-hidden="true" /></p>
        </div>
      </div>
    </footer>
  );
}

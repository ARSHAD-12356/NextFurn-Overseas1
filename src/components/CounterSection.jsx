import { useEffect, useRef, useState } from 'react';
import '../styles/counter-section.css';

const STATS = [
  { icon: 'users', value: '1000+', title: 'Happy Clients', text: 'Trusted by organizations worldwide' },
  { icon: 'building', value: '50+', title: 'Project Categories', text: 'Offices, Healthcare, Institutions & More' },
  { icon: 'globe', value: '10+', title: 'State', text: 'Delivering quality across India' },
  { icon: 'shield', value: '98%', title: 'Client Satisfaction', text: 'Built on trust and quality' },
];

function Icon({ name }) {
  const c = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'users':
      return (
        <svg {...c}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" />
        </svg>
      );
    case 'building':
      return (
        <svg {...c}>
          <path d="M4 21V4h10v17M14 9h6v12M2 21h20" />
          <path d="M7 8h1M10 8h1M7 12h1M10 12h1M7 16h1M10 16h1M17 13h1M17 17h1" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...c}>
          <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z" />
          <path d="m8.5 12 2.4 2.4 4.6-4.8" />
        </svg>
      );
    default:
      return null;
  }
}

const COUNT_MS = 1600;
const HOLD_MS = 3000;

function Counter({ value }) {
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? match[1] : value;
  const suffix = match ? match[2] : '';
  const target = Number(num);
  const ref = useRef(null);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    let hold = 0;
    let visible = false;

    const run = () => {
      cancelAnimationFrame(raf);
      clearTimeout(hold);
      if (!visible) return;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(target * eased));
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          hold = setTimeout(run, HOLD_MS);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          run();
        } else {
          cancelAnimationFrame(raf);
          clearTimeout(hold);
          setShown(target);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) io.observe(ref.current);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(hold);
    };
  }, [target]);

  return (
    <strong className="nf-stat__value" ref={ref} aria-label={value}>
      <span aria-hidden="true">{shown}{suffix}</span>
    </strong>
  );
}

export default function CounterSection() {
  return (
    <section className="nf-counter-wrapper" aria-label="NextFurn Overseas Achievements">
      <div className="nf-counter-container">
        <ul className="nf-stats-card" aria-label="NextFurn in numbers">
          {STATS.map((s) => (
            <li key={s.title} className="nf-stat-item">
              <span className="nf-stat__icon">
                <Icon name={s.icon} />
              </span>
              <div className="nf-stat__content">
                <Counter value={s.value} />
                <span className="nf-stat__title">{s.title}</span>
                <span className="nf-stat__text">{s.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

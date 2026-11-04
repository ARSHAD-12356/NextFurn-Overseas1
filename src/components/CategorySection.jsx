import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/category-section.css';

import imgOffice from '../assets/categories/cat-office.jpg';
import imgModular from '../assets/categories/cat-modular.png';
import imgEducation from '../assets/categories/hd/cat-education-hd.jpg';
import imgRestaurant from '../assets/categories/cat-restaurant.png';
import imgInstitute from '../assets/categories/cat-institute.jpg';
import imgSchool from '../assets/categories/cat-school.jpg';
import imgHospital from '../assets/categories/cat-hospital.jpg';

gsap.registerPlugin(ScrollTrigger);

// Set hidden: true to take a category off the homepage; its page and menu link stay.
const CATEGORIES = [
  {
    id: 'office-furniture',
    title: 'Office Furniture',
    image: imgOffice,
    alt: 'Executive office with office desk, chair and storage cabinets',
    href: '/office-furniture',
    page: 'office-furniture',
  },
  {
    id: 'modular-workstation',
    title: 'Modular Workstation',
    image: imgModular,
    alt: 'Modern office workspace with modular workstations, partitions and ergonomic chairs',
    href: '/modular-workstation',
    page: 'modular-workstation',
    hidden: true,
  },
  {
    id: 'education-furniture',
    title: 'Education Furniture',
    image: imgEducation,
    alt: 'Classroom with student desks, chairs and teacher chalkboard',
    href: '/educational-furniture',
    page: 'educational-furniture',
  },
  {
    id: 'restaurant-cafe-furniture',
    title: 'Restaurant & Cafe Furniture',
    image: imgRestaurant,
    alt: 'Restaurant and cafe interior with dining tables and chairs under warm pendant lighting',
    href: '/restaurant-cafe-furniture',
    page: 'restaurant-cafe-furniture',
  },
  {
    id: 'institute-furniture',
    title: 'Institute Furniture',
    image: imgInstitute,
    alt: 'Institutional seminar hall and lecture room with rows of desks and presentation screen',
    href: '/institute-furniture',
    page: 'institute-furniture',
  },
  {
    id: 'school-educational-furniture',
    title: 'School Furniture',
    image: imgSchool,
    alt: 'Primary school classroom with colorful student desks and chairs',
    href: '/school-furniture',
    page: 'school-furniture',
  },
  {
    id: 'hospital-furniture',
    title: 'Hospital Furniture',
    image: imgHospital,
    alt: 'Hospital patient room with adjustable medical bed and bedside cabinet',
    href: '/hospital-furniture',
    page: 'hospital-furniture',
  },
];

function CategoryCard({ item, onNavigate }) {
  return (
    <a
      href={item.href}
      onClick={item.page && onNavigate ? (e) => { e.preventDefault(); onNavigate(item.page); } : undefined}
      className="cat-card"
      data-cat-card
      aria-label={`Explore ${item.title}`}
    >
      <div className="cat-card__media">
        <img
          src={item.image}
          alt={item.alt}
          className="cat-card__img"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="cat-card__title">{item.title}</h3>
    </a>
  );
}

export default function CategorySection({ onNavigate }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia(section);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      gsap.from(q('[data-cat-head]'), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: q('.cat-section__header')[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(q('[data-cat-card]'), {
        autoAlpha: 0,
        y: 32,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: q('.cat-grid')[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="categories"
      className="cat-section"
      ref={sectionRef}
      aria-labelledby="cat-section-title"
    >
      <div className="cat-section__container">
        <header className="cat-section__header">
          <p className="cat-section__eyebrow" data-cat-head>
            <span className="cat-section__eyebrow-line" aria-hidden="true" />
            Our Categories
            <span className="cat-section__eyebrow-line" aria-hidden="true" />
          </p>
          <h2 id="cat-section-title" className="cat-section__title" data-cat-head>
            Explore Our <span className="cat-section__title-accent">Furniture Range</span>
          </h2>
          <p className="cat-section__subtitle" data-cat-head>
            Thoughtfully designed furniture solutions for every space and every need.
          </p>
        </header>

        <div className="cat-grid">
          {CATEGORIES.filter((item) => !item.hidden).map((item) => (
            <CategoryCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

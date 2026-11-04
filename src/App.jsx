import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import CartPage from './components/CartPage.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutPage from './components/AboutPage.jsx';
import BrochuresPage from './components/BrochuresPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import CounterSection from './components/CounterSection.jsx';
import CategorySection from './components/CategorySection.jsx';
import NewArrivalsRail from './components/NewArrivalsRail.jsx';
import DealZone from './components/DealZone.jsx';
import ExploreOfficeTablesSection from './components/ExploreOfficeTablesSection.jsx';
import ExploreTvUnitsSection from './components/ExploreTvUnitsSection.jsx';
import MattressBanner from './components/MattressBanner.jsx';
import ExploreMattressesSection from './components/ExploreMattressesSection.jsx';
import MattressesPage from './components/MattressesPage.jsx';
import HospitalFurniturePage from './components/HospitalFurniturePage.jsx';
import TvUnitsPage from './components/TvUnitsPage.jsx';
import OfficeFurniturePage, { ExecutiveOfficeTablesPage, ExecutiveOfficeChairsPage } from './components/OfficeFurniturePage.jsx';
import ModularWorkstationPage from './components/ModularWorkstationPage.jsx';
import EducationalFurniturePage, { SchoolFurniturePage } from './components/EducationalFurniturePage.jsx';
import RestaurantCafePage from './components/RestaurantCafePage.jsx';
import { HomeBedsPage, HomeSofasPage, HomeTablesPage } from './components/HomeFurnitureProductsPage.jsx';
import InstituteFurniturePage from './components/InstituteFurniturePage.jsx';
import BestsellerSection from './components/BestsellerSection.jsx';
import SofaSection from './components/SofaSection.jsx';
import OurProductsSection from './components/OurProductsSection.jsx';
import sofaBanner from '../Assets/Banners/sofa banner.jpeg';
import sofaBannerMobile from '../Assets/Banners/sofa banner mobile.png';
import Footer from './components/Footer.jsx';
import FaqSection from './components/FaqSection.jsx';
import BlogSection from './components/BlogSection.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import ContactSection from './components/ContactSection.jsx';
import InvestorRelationsPage from './components/InvestorRelationsPage.jsx';
import GiftingPage from './components/GiftingPage.jsx';
import NewArrivalsPage from './components/NewArrivalsPage.jsx';
import WishlistPage from './components/WishlistPage.jsx';

function resolveRouteFromUrl() {
  if (typeof window === 'undefined') return { page: 'home', slug: 'nf-diplomat-sofa' };

  const pathname = window.location.pathname || '';
  const hash = window.location.hash || '';
  const category = new URLSearchParams(window.location.search).get('category') || '';

  // 1. Path-based product route: /product/:slug
  const pathMatch = pathname.match(/^\/product\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) {
    return { page: 'product', slug: pathMatch[1] };
  }

  const blogPathMatch = pathname.match(/^\/blog\/([a-zA-Z0-9_-]+)/);
  if (blogPathMatch) {
    return { page: 'blog', slug: blogPathMatch[1] };
  }

  if (pathname === '/new-arrivals') {
    return { page: 'new-arrivals', slug: '' };
  }

  if (pathname === '/hospital-furniture') {
    return { page: 'hospital-furniture', slug: '' };
  }

  if (pathname === '/mattresses') {
    return { page: 'mattresses', slug: '' };
  }

  if (pathname === '/tv-units') {
    return { page: 'tv-units', slug: '' };
  }

  if (pathname === '/home-sofas' || pathname === '/home-tables' || pathname === '/home-beds') {
    return { page: pathname.slice(1), slug: '' };
  }

  if (pathname === '/office-furniture') {
    return { page: 'office-furniture', slug: '' };
  }

  if (pathname === '/executive-office-tables') {
    return { page: 'executive-office-tables', slug: '' };
  }

  if (pathname === '/executive-office-chairs') {
    return { page: 'executive-office-chairs', slug: '' };
  }

  if (pathname === '/modular-workstation') {
    return { page: 'modular-workstation', slug: '' };
  }

  if (pathname === '/school-furniture') {
    return { page: 'school-furniture', slug: '' };
  }

  if (pathname === '/educational-furniture') {
    return { page: 'educational-furniture', slug: '' };
  }

  if (pathname === '/restaurant-cafe-furniture') {
    return { page: 'restaurant-cafe-furniture', slug: '' };
  }

  if (pathname === '/institute-furniture') {
    return { page: 'institute-furniture', slug: '' };
  }

  if (pathname === '/wishlist') {
    return { page: 'wishlist', slug: '' };
  }

  if (pathname === '/investor-relations' || hash === '#investor') {
    return { page: 'investor', slug: '' };
  }

  if (pathname === '/gifting' || hash === '#gifting') {
    return { page: 'gifting', slug: '' };
  }

  // 2. Hash-based product route: #/product/:slug or #product/:slug
  const hashProductMatch = hash.match(/^#(?:|\/)product\/([a-zA-Z0-9_-]+)/);
  if (hashProductMatch) {
    return { page: 'product', slug: hashProductMatch[1] };
  }

  // 3. About page
  if (pathname === '/about' || hash === '#about') {
    return { page: 'about', slug: '' };
  }

  if (pathname === '/brochures' || hash === '#brochures') {
    return { page: 'brochures', slug: '' };
  }

  // 4. Auth (Login & Sign Up)
  if (pathname === '/login' || hash === '#login' || pathname === '/auth' || hash === '#auth') {
    return { page: 'auth', slug: 'login' };
  }

  if (pathname === '/signup' || hash === '#signup') {
    return { page: 'auth', slug: 'signup' };
  }

  return { page: 'home', slug: 'nf-diplomat-sofa', category };
}

export default function App() {
  const [routeState, setRouteState] = useState(() => resolveRouteFromUrl());
  const pageMotionRef = useRef(null);
  const currentPage = routeState.page;
  const currentProductSlug = routeState.slug || 'nf-diplomat-sofa';

  useLayoutEffect(() => {
    const root = pageMotionRef.current;
    if (!root) return undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return undefined;

    const sections = [...root.querySelectorAll('section')]
      .filter((section) => !section.parentElement?.closest('section'));
    if (sections.length === 0) return undefined;

    const visibleSections = new Set();
    sections.forEach((section, index) => {
      section.classList.add('scroll-reveal');
      section.style.setProperty('--scroll-reveal-delay', `${Math.min(index * 35, 105)}ms`);
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        section.classList.add('is-scroll-visible');
        visibleSections.add(section);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-scroll-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    sections.filter((section) => !visibleSections.has(section)).forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('scroll-reveal', 'is-scroll-visible');
        section.style.removeProperty('--scroll-reveal-delay');
      });
    };
  }, [currentPage]);

  useEffect(() => {
    const handleLocationChange = () => {
      const route = resolveRouteFromUrl();
      setRouteState(route);
      if (route.page === 'about' || route.page === 'brochures' || route.page === 'investor' || route.page === 'gifting' || route.page === 'product' || route.page === 'blog' || route.page === 'auth' || route.page === 'new-arrivals' || route.page === 'tv-units' || route.page === 'home-sofas' || route.page === 'home-tables' || route.page === 'home-beds' || route.page === 'mattresses' || route.page === 'hospital-furniture' || route.page === 'office-furniture' || route.page === 'executive-office-tables' || route.page === 'executive-office-chairs' || route.page === 'modular-workstation' || route.page === 'educational-furniture' || route.page === 'school-furniture' || route.page === 'restaurant-cafe-furniture' || route.page === 'institute-furniture' || route.page === 'wishlist') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash && window.location.hash !== '#') {
        window.setTimeout(() => {
          document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToProduct = (slug, image) => {
    const productSlug = slug || 'nf-diplomat-sofa';
    setRouteState({ page: 'product', slug: productSlug, image });
    try {
      window.history.pushState({ page: 'product', slug: productSlug, image }, '', `/product/${productSlug}`);
    } catch {
      window.location.hash = `#product/${productSlug}`;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToBlog = (slug) => {
    setRouteState({ page: 'blog', slug });
    window.history.pushState({ page: 'blog', slug }, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToPage = (page, targetHash = '', targetCategory = '') => {
    if (page === 'product') {
      navigateToProduct(targetHash || 'nf-diplomat-sofa');
      return;
    }

    if (page === 'investor') {
      setRouteState({ page: 'investor', slug: '' });
      try {
        window.history.pushState({ page: 'investor' }, '', '/investor-relations');
      } catch {
        window.location.hash = 'investor';
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'gifting') {
      setRouteState({ page: 'gifting', slug: '' });
      try {
        window.history.pushState({ page: 'gifting' }, '', '/gifting');
      } catch {
        window.location.hash = 'gifting';
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'new-arrivals') {
      setRouteState({ page: 'new-arrivals', slug: '' });
      window.history.pushState({ page: 'new-arrivals' }, '', '/new-arrivals');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'hospital-furniture') {
      setRouteState({ page: 'hospital-furniture', slug: '' });
      window.history.pushState({ page: 'hospital-furniture' }, '', '/hospital-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'mattresses') {
      setRouteState({ page: 'mattresses', slug: '' });
      window.history.pushState({ page: 'mattresses' }, '', '/mattresses');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'tv-units') {
      setRouteState({ page: 'tv-units', slug: '' });
      window.history.pushState({ page: 'tv-units' }, '', '/tv-units');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'home-sofas' || page === 'home-tables' || page === 'home-beds') {
      setRouteState({ page, slug: '' });
      window.history.pushState({ page }, '', `/${page}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'office-furniture') {
      setRouteState({ page: 'office-furniture', slug: '' });
      window.history.pushState({ page: 'office-furniture' }, '', '/office-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'executive-office-tables' || page === 'executive-office-chairs') {
      setRouteState({ page, slug: '' });
      window.history.pushState({ page }, '', `/${page}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'modular-workstation') {
      setRouteState({ page: 'modular-workstation', slug: '' });
      window.history.pushState({ page: 'modular-workstation' }, '', '/modular-workstation');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'school-furniture') {
      setRouteState({ page: 'school-furniture', slug: '' });
      window.history.pushState({ page: 'school-furniture' }, '', '/school-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'educational-furniture') {
      setRouteState({ page: 'educational-furniture', slug: '' });
      window.history.pushState({ page: 'educational-furniture' }, '', '/educational-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'restaurant-cafe-furniture') {
      setRouteState({ page: 'restaurant-cafe-furniture', slug: '' });
      window.history.pushState({ page: 'restaurant-cafe-furniture' }, '', '/restaurant-cafe-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'institute-furniture') {
      setRouteState({ page: 'institute-furniture', slug: '' });
      window.history.pushState({ page: 'institute-furniture' }, '', '/institute-furniture');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'wishlist') {
      setRouteState({ page: 'wishlist', slug: '' });
      window.history.pushState({ page: 'wishlist' }, '', '/wishlist');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'auth' || page === 'login' || page === 'signup') {
      const authMode = page === 'signup' || targetHash === 'signup' ? 'signup' : 'login';
      setRouteState({ page: 'auth', slug: authMode });
      try {
        window.history.pushState({ page: 'auth', slug: authMode }, '', `/${authMode}`);
      } catch {
        window.location.hash = authMode;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'about') {
      setRouteState({ page: 'about', slug: '' });
      try {
        window.history.pushState({ page: 'about' }, '', '/#about');
      } catch {}
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'brochures') {
      setRouteState({ page: 'brochures', slug: '' });
      try {
        window.history.pushState({ page: 'brochures' }, '', '/brochures');
      } catch {
        window.location.href = '/brochures';
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setRouteState({ page: 'home', slug: '', category: targetCategory });
      try {
        const destination = targetCategory
          ? `/?category=${encodeURIComponent(targetCategory)}${targetHash || ''}`
          : targetHash ? `/${targetHash}` : '/';
        window.history.pushState({ page: 'home', category: targetCategory }, '', destination);
      } catch {}
      if (targetHash) {
        window.location.hash = targetHash;
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <WishlistProvider>
      <CartProvider>
        <Header currentPage={currentPage} onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        <div
          key={`${currentPage}:${currentPage === 'product' ? currentProductSlug : ''}`}
          className="page-transition"
          ref={pageMotionRef}
        >
        {currentPage === 'product' ? (
          <ProductDetailPage
            slug={currentProductSlug}
            initialImage={routeState.image}
            onNavigate={navigateToPage}
            onNavigateProduct={navigateToProduct}
          />
        ) : currentPage === 'blog' ? (
          <BlogPostPage slug={routeState.slug} onNavigate={navigateToPage} />
        ) : currentPage === 'about' ? (
          <AboutPage onNavigate={navigateToPage} />
        ) : currentPage === 'brochures' ? (
          <BrochuresPage onNavigate={navigateToPage} />
        ) : currentPage === 'investor' ? (
          <main>
            <InvestorRelationsPage onNavigate={navigateToPage} />
          </main>
        ) : currentPage === 'gifting' ? (
          <main>
            <GiftingPage onNavigateProduct={navigateToProduct} />
          </main>
        ) : currentPage === 'new-arrivals' ? (
          <NewArrivalsPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'hospital-furniture' ? (
          <HospitalFurniturePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'mattresses' ? (
          <MattressesPage onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'tv-units' ? (
          <TvUnitsPage onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'home-sofas' ? (
          <HomeSofasPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'home-tables' ? (
          <HomeTablesPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'home-beds' ? (
          <HomeBedsPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'office-furniture' ? (
          <OfficeFurniturePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'executive-office-tables' ? (
          <ExecutiveOfficeTablesPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'executive-office-chairs' ? (
          <ExecutiveOfficeChairsPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'modular-workstation' ? (
          <ModularWorkstationPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'school-furniture' ? (
          <SchoolFurniturePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'educational-furniture' ? (
          <EducationalFurniturePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'restaurant-cafe-furniture' ? (
          <RestaurantCafePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'institute-furniture' ? (
          <InstituteFurniturePage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'wishlist' ? (
          <WishlistPage onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
        ) : currentPage === 'auth' ? (
          <AuthPage
            initialMode={currentProductSlug || 'login'}
            onNavigate={navigateToPage}
          />
        ) : (
          <main>
            <HeroSection />
            <CounterSection />
            <CategorySection onNavigate={navigateToPage} />
            <NewArrivalsRail onNavigateProduct={navigateToProduct} />
            <DealZone />
            <ExploreOfficeTablesSection onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
            <ExploreTvUnitsSection onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
            <MattressBanner onNavigate={navigateToPage} />
            <ExploreMattressesSection onNavigate={navigateToPage} onNavigateProduct={navigateToProduct} />
            <BestsellerSection onNavigateProduct={navigateToProduct} />
            <section className="sofa-promo-banner" aria-label="Featured sofa collection">
              <picture>
                <source media="(max-width: 767px)" srcSet={sofaBannerMobile} />
                <img src={sofaBanner} alt="Discover our sofa collection" loading="lazy" decoding="async" />
              </picture>
            </section>
            <SofaSection onNavigateProduct={navigateToProduct} />
            <OurProductsSection
              onNavigate={navigateToPage}
              onNavigateProduct={navigateToProduct}
              initialCategory={routeState.category}
              showCategoryGallery={false}
            />
            <BlogSection onNavigateBlog={navigateToBlog} />
            <FaqSection />
            <ContactSection />
          </main>
        )}
        </div>
        <Footer currentPage={currentPage} onNavigate={navigateToPage} />
        <CartPage />
      </CartProvider>
    </WishlistProvider>
  );
}

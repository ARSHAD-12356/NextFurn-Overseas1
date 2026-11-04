import CategoryListingPage from './CategoryListingPage.jsx';
import { EXTRA_CATALOG_PRODUCTS, HOME_FURNITURE_PRODUCTS } from '../data/products.js';
import sofaHeroImage from '../assets/sofas/sofa-hero.jpg';

const SOFA_PRODUCTS = EXTRA_CATALOG_PRODUCTS.filter((product) => product.category === 'sofa');
const TABLE_PRODUCTS = HOME_FURNITURE_PRODUCTS.filter((product) => product.category === 'home-tables');
const BED_PRODUCTS = HOME_FURNITURE_PRODUCTS.filter((product) => product.category === 'home-beds');
const PRODUCT_TYPE_FILTER = [{ key: 'type', label: 'Product Type' }];

function toListingItem(product, order) {
  const firstVariant = product.variants?.[0] || {};
  return {
    ...product,
    order,
    image: firstVariant.image || '',
    brand: product.brand || 'NextFurn',
    model: firstVariant.model || '',
    price: firstVariant.price ?? null,
    category: product.type || product.category,
    colors: product.colors || [],
    subtitle: product.desc || '',
  };
}

function HomeFurnitureProductsPage({ title, products, banner, onNavigate, onNavigateProduct }) {
  const items = products.map(toListingItem);

  return (
    <CategoryListingPage
      title={title}
      items={items}
      detailItems={products}
      filterGroups={PRODUCT_TYPE_FILTER}
      drawerGroups={PRODUCT_TYPE_FILTER}
      banner={banner}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

export function HomeSofasPage(props) {
  return (
    <HomeFurnitureProductsPage
      {...props}
      title="Sofas"
      products={SOFA_PRODUCTS}
      banner={{ image: sofaHeroImage, title: <>Make Room<br />for Comfort</>, text: 'Sofas for relaxed living spaces' }}
    />
  );
}

export function HomeTablesPage(props) {
  return (
    <HomeFurnitureProductsPage
      {...props}
      title="Tables"
      products={TABLE_PRODUCTS}
      banner={{ image: TABLE_PRODUCTS[0]?.variants?.[0]?.image, title: <>Everyday Tables,<br />Distinctive Style</>, text: 'Tables for your home' }}
    />
  );
}

export function HomeBedsPage(props) {
  return (
    <HomeFurnitureProductsPage
      {...props}
      title="Beds"
      products={BED_PRODUCTS}
      banner={{ image: BED_PRODUCTS[0]?.variants?.[0]?.image, title: <>Rest Easy,<br />Every Night</>, text: 'A bed for a comfortable home' }}
    />
  );
}

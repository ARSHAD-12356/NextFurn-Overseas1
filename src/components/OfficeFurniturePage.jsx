import CategoryListingPage from './CategoryListingPage.jsx';
import { OFFICE_FURNITURE_PRODUCTS, OFFICE_DETAIL_PRODUCTS } from '../data/officeFurnitureProducts.js';
import bannerImage from '../assets/office-furniture/56-nf-rex.webp';
import chairBannerImage from '../assets/office-furniture/10-nf-014-chrome-ribbed-hb.webp';

const FILTER_GROUPS = [
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'brand', label: 'Brand' },
  { key: 'storage', label: 'Storage Type' },
  { key: 'seating', label: 'Seating Capacity' },
  { key: 'tableTop', label: 'Table Top Material' },
];

const BANNER = { image: bannerImage, title: <>Design Better<br />Workspaces</>, text: 'Modern furniture for productive spaces' };

const TABLE_FILTER_GROUPS = [
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'storage', label: 'Storage Type' },
  { key: 'tableTop', label: 'Table Top Material' },
];

const CHAIR_FILTER_GROUPS = [{ key: 'primaryMaterial', label: 'Primary Material' }];

const EXECUTIVE_TABLES = OFFICE_FURNITURE_PRODUCTS.filter((p) => p.category === 'Executive Table');
const EXECUTIVE_CHAIRS = OFFICE_FURNITURE_PRODUCTS.filter((p) => p.category === 'Executive Chair');
const TABLE_BANNER = { image: bannerImage, title: <>Lead From<br />the Front</>, text: 'Executive tables for leadership spaces' };
const CHAIR_BANNER = { image: chairBannerImage, title: <>Sit Well,<br />Lead Well</>, text: 'Executive chairs built for long days' };

export default function OfficeFurniturePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Office Furniture"
      items={OFFICE_FURNITURE_PRODUCTS}
      detailItems={OFFICE_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

export function ExecutiveOfficeTablesPage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Executive Office Tables"
      items={EXECUTIVE_TABLES}
      detailItems={OFFICE_DETAIL_PRODUCTS}
      filterGroups={TABLE_FILTER_GROUPS}
      drawerGroups={TABLE_FILTER_GROUPS}
      banner={TABLE_BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

export function ExecutiveOfficeChairsPage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Executive Office Chair"
      items={EXECUTIVE_CHAIRS}
      detailItems={OFFICE_DETAIL_PRODUCTS}
      filterGroups={CHAIR_FILTER_GROUPS}
      drawerGroups={CHAIR_FILTER_GROUPS}
      banner={CHAIR_BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

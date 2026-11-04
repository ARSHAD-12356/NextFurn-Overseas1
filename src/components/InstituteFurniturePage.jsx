import CategoryListingPage from './CategoryListingPage.jsx';
import { INSTITUTE_FURNITURE_PRODUCTS, INSTITUTE_DETAIL_PRODUCTS } from '../data/instituteFurnitureProducts.js';
import bannerImage from '../assets/institute-furniture/10.webp';

const FILTER_GROUPS = [
  { key: 'space', label: 'Space' },
  { key: 'category', label: 'Product Type' },
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'seating', label: 'Seating Capacity' },
  { key: 'brand', label: 'Brand' },
];

const BANNER = { image: bannerImage, title: <>Furnish Your<br />Institute</>, text: 'For seminar halls and lecture rooms' };

export default function InstituteFurniturePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Institute Furniture"
      items={INSTITUTE_FURNITURE_PRODUCTS}
      detailItems={INSTITUTE_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      drawerGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

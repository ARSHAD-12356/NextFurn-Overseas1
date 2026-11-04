import CategoryListingPage from './CategoryListingPage.jsx';
import { EDUCATIONAL_FURNITURE_PRODUCTS, EDUCATIONAL_DETAIL_PRODUCTS } from '../data/educationalFurnitureProducts.js';
import bannerImage from '../assets/educational-furniture/21.webp';

const FILTER_GROUPS = [
  { key: 'space', label: 'Space' },
  { key: 'category', label: 'Product Type' },
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'seating', label: 'Seating Capacity' },
  { key: 'brand', label: 'Brand' },
];

const BANNER = { image: bannerImage, title: <>Built for Better<br />Learning</>, text: 'Durable furniture for schools, colleges and hostels' };

export default function EducationalFurniturePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Educational Furniture"
      items={EDUCATIONAL_FURNITURE_PRODUCTS}
      detailItems={EDUCATIONAL_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      drawerGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

export function SchoolFurniturePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="School Furniture"
      items={EDUCATIONAL_FURNITURE_PRODUCTS}
      detailItems={EDUCATIONAL_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      drawerGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

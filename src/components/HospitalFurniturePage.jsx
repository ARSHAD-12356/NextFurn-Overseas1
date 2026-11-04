import CategoryListingPage from './CategoryListingPage.jsx';
import { HOSPITAL_FURNITURE_PRODUCTS, HOSPITAL_DETAIL_PRODUCTS } from '../data/hospitalFurnitureProducts.js';
import bannerImage from '../assets/hospital-furniture/48.webp';

const FILTER_GROUPS = [
  { key: 'category', label: 'Product Type' },
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'brand', label: 'Brand' },
];

const BANNER = { image: bannerImage, title: <>Built for Better<br />Patient Care</>, text: 'Beds, trolleys and lab furniture for hospitals' };

export default function HospitalFurniturePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Hospital Furniture"
      items={HOSPITAL_FURNITURE_PRODUCTS}
      detailItems={HOSPITAL_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      drawerGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

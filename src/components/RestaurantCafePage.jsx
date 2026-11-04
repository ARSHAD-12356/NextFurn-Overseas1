import CategoryListingPage from './CategoryListingPage.jsx';
import { RESTAURANT_CAFE_PRODUCTS, RESTAURANT_CAFE_DETAIL_PRODUCTS } from '../data/restaurantCafeProducts.js';
import bannerImage from '../assets/restaurant-cafe/07.webp';

const FILTER_GROUPS = [
  { key: 'category', label: 'Product Type' },
  { key: 'primaryMaterial', label: 'Primary Material' },
  { key: 'finish', label: 'Frame Finish' },
  { key: 'seating', label: 'Seating Capacity' },
  { key: 'brand', label: 'Brand' },
];

const BANNER = { image: bannerImage, title: <>Set the Mood<br />for Dining</>, text: 'Stylish, strong furniture for restaurants and cafes' };

export default function RestaurantCafePage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Restaurant & Cafe Furniture"
      items={RESTAURANT_CAFE_PRODUCTS}
      detailItems={RESTAURANT_CAFE_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      drawerGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

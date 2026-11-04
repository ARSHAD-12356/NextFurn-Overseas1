import CategoryListingPage from './CategoryListingPage.jsx';
import { MODULAR_WORKSTATION_PRODUCTS, MODULAR_WORKSTATION_DETAIL_PRODUCTS } from '../data/modularWorkstationProducts.js';
import bannerImage from '../assets/modular-workstation/06-oak-cluster-4-seater.webp';

const FILTER_GROUPS = [
  { key: 'layout', label: 'Layout' },
  { key: 'seating', label: 'Seating Capacity' },
  { key: 'screen', label: 'Screen Type' },
  { key: 'topFinish', label: 'Top Finish' },
  { key: 'brand', label: 'Brand' },
];

const BANNER = { image: bannerImage, title: <>Smarter Shared<br />Workspaces</>, text: 'Modular workstations for growing teams' };

export default function ModularWorkstationPage({ onNavigate, onNavigateProduct }) {
  return (
    <CategoryListingPage
      title="Modular Workstation"
      items={MODULAR_WORKSTATION_PRODUCTS}
      detailItems={MODULAR_WORKSTATION_DETAIL_PRODUCTS}
      filterGroups={FILTER_GROUPS}
      banner={BANNER}
      onNavigate={onNavigate}
      onNavigateProduct={onNavigateProduct}
    />
  );
}

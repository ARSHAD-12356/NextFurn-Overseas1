import HeroBannerSlider from './HeroBannerSlider.jsx';
import GiftingCollectionSection from './GiftingCollectionSection.jsx';

export default function GiftingPage({ onNavigateProduct }) {
  return (
    <>
      <HeroBannerSlider
        id="gifting"
        title="NextFurn Overseas — Wedding and Gifting Furniture"
      />
      <GiftingCollectionSection onNavigateProduct={onNavigateProduct} />
    </>
  );
}

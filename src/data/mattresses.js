// Mattress range for the "Explore Our Mattresses" section and the /mattresses page.
//
// Images: 01-19 are 3x upscaled, sharpened 1305 x 1305 copies of
// `Assets/NextFurn_19_Mattress_Images_435x435.zip`; 20 is a 1200 x 1200 copy of `Assets/Mattress/`
// (that zip has no image for it). Stored as src/assets/mattresses/<NN>.webp. Cards show them at
// 435 x 435, see tv-units.css.
//
// Names, prices and discounts are placeholders chosen for display, not catalogue data.

const IMAGES = import.meta.glob('../assets/mattresses/*.webp', { eager: true, import: 'default' });

const mattress = (code, name, price, discount) => ({
  id: `mattress-${code}`,
  slug: `mattress-${code}`,
  image: IMAGES[`../assets/mattresses/${code}.webp`],
  name,
  price,
  originalPrice: Math.round(price / (1 - discount / 100) / 100) * 100 - 1,
  discount,
});

export const MATTRESSES = [
  mattress('20', 'Royal Rest Mattress in Navy Blue', 8999, 38),
  mattress('01', 'Ruby Rest Mattress in Burgundy', 6499, 40),
  mattress('10', 'Sage Breeze Mattress in Sage Green', 5799, 36),
  mattress('02', 'Slate Comfort Mattress in Stone Grey', 4299, 42),
  mattress('11', 'Graphite Edge Mattress in Charcoal', 7499, 35),
  mattress('03', 'Evergreen Calm Mattress in Forest Green', 5299, 41),
  mattress('12', 'Indigo Leaf Mattress in Royal Blue', 8299, 37),
  mattress('04', 'Cocoa Cloud Mattress in Chocolate Brown', 3999, 43),
  mattress('13', 'Rosewood Soft Mattress in Blush Pink', 6899, 39),
  mattress('05', 'Azure Dream Mattress in Sky Blue', 4799, 40),
  mattress('14', 'Crimson Line Mattress in Steel Grey', 9499, 34),
  mattress('06', 'Ember Night Mattress in Charcoal and Orange', 7199, 38),
  mattress('15', 'Amber Leaf Mattress in Caramel Brown', 3499, 44),
  mattress('07', 'Lavender Bloom Mattress in Royal Purple', 5999, 40),
  mattress('16', 'Midnight Wave Mattress in Navy Blue', 8699, 36),
  mattress('08', 'Teal Haven Mattress in Deep Teal', 4599, 42),
  mattress('17', 'Olive Retreat Mattress in Olive Green', 6199, 39),
  mattress('09', 'Ivory Grace Mattress in Cream', 3299, 45),
  mattress('18', 'Copper Quilt Mattress in Smoke Grey', 7899, 37),
  mattress('19', 'Pearl Horizon Mattress in White and Navy', 9899, 33),
];

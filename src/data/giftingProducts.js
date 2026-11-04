// New products for the Gifting Collection, shown after the four existing catalogue products.
//
// Images: web-optimised copies of the renders in `Assets/Gifting/Gifting New/` (originals untouched),
// stored as src/assets/gifting/<slug>.webp. Two files in that folder show the same blush petal chair;
// the one carrying another brand's name is left out.
//
// Names and descriptions come from what each render shows, not from a catalogue, so nothing here
// states materials, sizes or warranty. Prices are placeholders between ₹10,000 and ₹25,000, not catalogue prices.

const IMAGES = import.meta.glob('../assets/gifting/*.webp', { eager: true, import: 'default' });

const gift = (slug, name, type, desc, colour, code, price) => ({
  id: `gift-${slug}`,
  slug,
  category: 'gifting',
  type,
  name,
  desc,
  size: '',
  specs: [['Product Type', type], ['Design', desc], ['Colour', colour]],
  catalogPriceOnly: true,
  variants: [{
    model: `NF-GIFT-${code}`,
    label: 'Standard',
    price,
    image: IMAGES[`../assets/gifting/${slug}.webp`],
  }],
});

export const GIFTING_NEW_PRODUCTS = [
  gift('nf-scarlet-round-bed', 'NF-Scarlet Round Bed', 'Bed', 'Round upholstered bed with a curved padded headboard', 'Scarlet Red', '13', 24750),
  gift('nf-blush-petal-chair', 'NF-Blush Petal Chair', 'Accent Chair', 'Translucent petal-shaped shell with a dark tufted cushion and slim gold-tone legs', 'Blush Pink, Black & Gold', '01', 14299),
  gift('nf-sculpted-wave-chair', 'NF-Sculpted Wave Chair', 'Accent Chair', 'Flowing one-piece wave silhouette with a sculptural base', 'Copper Brown', '02', 18650),
  gift('nf-seashell-velvet-bench', 'NF-Seashell Velvet Bench', 'Bench', 'Curved upholstered seat with a seashell back detail and gold-tone hoop legs', 'Burgundy & Gold', '03', 13499),
  gift('nf-leaf-lounge-chair', 'NF-Leaf Lounge Chair', 'Lounge Chair', 'Leaf-shaped cushioned back on a swept wood-finish base with an attached side table', 'Cream & Walnut', '04', 21999),
  gift('nf-colosseum-coffee-table', 'NF-Colosseum Coffee Table', 'Coffee Table', 'Round glass top on a stone-look arched base with warm glow lighting', 'Ivory & Clear Glass', '05', 23400),
  gift('nf-crescent-curved-sofa', 'NF-Crescent Curved Sofa', 'Curved Sofa', 'Sweeping crescent shape with plush upholstery and a gold-tone base', 'Rust Orange & Gold', '06', 24250),
  gift('nf-golden-tortoise-coffee-table', 'NF-Golden Tortoise Coffee Table', 'Coffee Table', 'Sculpted tortoise base carrying a round glass top', 'Antique Gold & Clear Glass', '07', 19899),
  gift('nf-ruby-bloom-chair', 'NF-Ruby Bloom Chair', 'Accent Chair', 'Translucent flower-petal seat on a clear pedestal base', 'Ruby Red & Clear', '08', 12750),
  gift('nf-floral-embroidered-sofa', 'NF-Floral Embroidered Sofa', 'Sofa', 'Wave-shaped back with floral embroidery, a wood-finish frame and round feet', 'Chocolate Brown & Walnut', '09', 22600),
  gift('nf-zebra-console-table', 'NF-Zebra Console Table', 'Console Table', 'Sculpted standing zebra base with a slim striped top', 'Black & White', '10', 16499),
  gift('nf-emerald-shell-chair', 'NF-Emerald Shell Chair', 'Accent Chair', 'Scalloped shell back with plush channel tufting, a round seat cushion and gold-tone trim', 'Emerald Green & Gold', '11', 20350),
  gift('nf-ivory-leaf-chair', 'NF-Ivory Leaf Chair', 'Accent Chair', 'Leaf-shaped upholstered back with vein detailing and slim copper-tone legs', 'Ivory & Copper', '12', 11999),
];

// Modular Workstation catalogue for the /modular-workstation listing page.
//
// Images: web-optimised copies of every render in `Assets/modular workstation image/`
// (10 files, originals untouched), stored as src/assets/modular-workstation/<NN>-<name>.webp
// where NN is the file's position in that folder sorted by name.
//
// Data: "Nextfurn__Collection__2026 (1).pdf" is the only catalogue with workstations
// (PDF pages 8–11: Numero, Optima, Polar, Max series). The NFSOC and special-collection
// price lists cover chairs and sofas, and "BURO Catalogue 2026.pdf" is Spacewood's range.
//
// match:
//   'likely'  – same design as the catalogue model (frame, screen and layout agree); the render's
//               top colour or module count may differ from the catalogue photo.
//   'similar' – no exact catalogue model for this layout; named descriptively and given the
//               specification and price of the closest catalogue model (`refModel`).
//               Those prices are estimates — confirm before quoting customers.
// The catalogue gives one price per model; there is no MRP or discount.

const IMAGES = import.meta.glob('../assets/modular-workstation/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => {
  const prefix = `/${String(n).padStart(2, '0')}-`;
  const key = Object.keys(IMAGES).find((path) => path.includes(prefix));
  return key ? IMAGES[key] : '';
};

const CATALOGUE = 'Nextfurn Collection 2026';
const SWATCH = { white: '#f1f1ef', oak: '#d8bf98', teal: '#1fb5b8', screenWhite: '#e4e4e2', grey: '#a7a9ac' };

// Catalogue entries used by the products below, exactly as printed.
const MODELS = {
  'NF-OPTIMA 1': { page: 9, spec: 'Workstation Table, Desk Based Partition, Particle Board Edge Banded Top', sizes: [{ size: 'W1100 × D1100 × H1050', price: 97695 }] },
  'NF-OPTIMA 5': { page: 10, spec: 'Workstation Table, Glass Screen, Particle Board Edge Banded Top', sizes: [{ size: 'W1200 × D1200 × H1050', price: 69615 }] },
  'NF-OPTIMA 8': { page: 10, spec: 'Workstation Table, Laquer Glass Screen, Pre-Laminated Particle Board Top', sizes: [{ size: 'W2400 × D1200 × H1050', price: 74700 }] },
  'NF-OPTIMA 10': { page: 10, spec: 'Workstation Table, Laquer Glass Screen, Pre-Laminated Particle Board Top', sizes: [{ size: 'W2400 × D1200 × H1100', price: 99630 }] },
  'NF-POLAR 1': { page: 9, spec: 'Workstation Table, Desk Based Partition, Particle Board Edge Banded Top, Chrome Plated Metal Leg', sizes: [{ size: 'W3000 × D1500 × H1050', price: 125640 }] },
  'NF-MAX 7': { page: 11, spec: 'Workstation Table, Panel Based Partition, Particle Board Edge Banded Top', sizes: [{ size: 'W1560 × D1560 × H1200', price: 58500 }] },
  'NF-NUMERO 6': {
    page: 8,
    spec: 'Executive Table, Particle Board Top',
    sizes: [{ size: 'W1650 × D1650 × H750', price: 37755 }, { size: 'W1800 × D1650 × H750', price: 39015 }, { size: 'W1950 × D1750 × H750', price: 42885 }],
  },
  'NF-NUMERO 10': {
    page: 8,
    spec: 'Study Table, Particle Board Top, MS Powder Coated Legs',
    sizes: [{ size: 'W900 × D600 × H750', price: 9495 }, { size: 'W1200 × D600 × H750', price: 10395 }, { size: 'W1350 × D600 × H750', price: 11970 }],
  },
};

// Attributes visible in each render (top finish, screen, layout, seats) drive the filters.
const workstation = ({ n, model, refModel, name, subtitle, layout, seating, topFinish, screen, colors }) => {
  const source = MODELS[model || refModel];
  const visible = [['Layout', layout], ['Seating', seating], ['Top Finish', topFinish], ['Screen', screen]];
  return {
    imageIndex: n,
    model: model || '',
    refModel: refModel || '',
    name,
    subtitle,
    category: layout === 'Study Table' ? 'Study Table' : 'Workstation',
    primaryMaterial: 'Engineered Wood',
    layout,
    seating,
    topFinish,
    screen,
    price: Math.min(...source.sizes.map((s) => s.price)),
    variants: source.sizes.map((s) => ({ label: s.size, price: s.price })),
    dimensions: source.sizes.map((s) => s.size).join(' / '),
    specs: [
      ['Specification', source.spec],
      ['Sizes (mm)', source.sizes.map((s) => s.size).join(', ')],
      ...visible,
      ...(refModel ? [['Price basis', `Estimated from catalogue model ${refModel}`]] : []),
    ],
    colors,
    source: { catalogue: CATALOGUE, page: source.page, ...(refModel ? { reference: refModel } : {}) },
    match: model ? 'likely' : 'similar',
  };
};

const WORKSTATIONS = [
  workstation({
    n: 2, model: 'NF-OPTIMA 1', name: 'NF-Optima 1 Cluster Workstation',
    subtitle: 'Desk-based teal partitions, pinwheel cluster layout',
    layout: 'Cluster', seating: '4 Seater', topFinish: 'White', screen: 'Teal Pin-up Screen', colors: [SWATCH.white, SWATCH.teal],
  }),
  workstation({
    n: 7, model: 'NF-OPTIMA 5', name: 'NF-Optima 5 Workstation',
    subtitle: 'Glass screen, particle board edge-banded top',
    layout: 'Linear', seating: '2 Seater', topFinish: 'Oak', screen: 'White Screen', colors: [SWATCH.oak, SWATCH.screenWhite],
  }),
  workstation({
    n: 9, model: 'NF-NUMERO 10', name: 'NF-Numero 10 Study Table',
    subtitle: 'Particle board top, MS powder-coated legs',
    layout: 'Study Table', seating: '1 Seater', topFinish: 'Oak', screen: 'No Screen', colors: [SWATCH.oak, SWATCH.white],
  }),
  workstation({
    n: 1, refModel: 'NF-OPTIMA 1', name: 'Teal Screen L-Shaped 3-Seater Workstation',
    subtitle: 'L-shaped desk run with teal pin-up screens',
    layout: 'L-Shaped', seating: '3 Seater', topFinish: 'White', screen: 'Teal Pin-up Screen', colors: [SWATCH.white, SWATCH.teal],
  }),
  workstation({
    n: 4, refModel: 'NF-MAX 7', name: 'Teal Screen Corner 2-Seater Workstation',
    subtitle: 'Corner L-shape with teal screens on both runs',
    layout: 'L-Shaped', seating: '2 Seater', topFinish: 'White', screen: 'Teal Pin-up Screen', colors: [SWATCH.white, SWATCH.teal],
  }),
  workstation({
    n: 3, refModel: 'NF-OPTIMA 10', name: 'Teal Screen Linear 4-Seater Workstation',
    subtitle: 'Face-to-face bench with two teal pin-up screens',
    layout: 'Linear', seating: '4 Seater', topFinish: 'White', screen: 'Teal Pin-up Screen', colors: [SWATCH.white, SWATCH.teal],
  }),
  workstation({
    n: 10, refModel: 'NF-OPTIMA 8', name: 'Teal Screen Linear Bench Workstation',
    subtitle: 'Open-plan bench with teal screens, white frame',
    layout: 'Linear', seating: '4 Seater', topFinish: 'White', screen: 'Teal Pin-up Screen', colors: [SWATCH.white, SWATCH.teal],
  }),
  workstation({
    n: 6, refModel: 'NF-OPTIMA 1', name: 'Oak Cluster 4-Seater Workstation',
    subtitle: 'Four-way cluster with white desk screens',
    layout: 'Cluster', seating: '4 Seater', topFinish: 'Oak', screen: 'White Screen', colors: [SWATCH.oak, SWATCH.screenWhite],
  }),
  workstation({
    n: 5, refModel: 'NF-POLAR 1', name: 'Oak L-Shaped Twin Workstation',
    subtitle: 'Two facing L-desks with white screens',
    layout: 'L-Shaped', seating: '2 Seater', topFinish: 'Oak', screen: 'White Screen', colors: [SWATCH.oak, SWATCH.screenWhite],
  }),
  workstation({
    n: 8, refModel: 'NF-NUMERO 6', name: 'Oak L-Shaped Single Workstation',
    subtitle: 'L-shaped desk with white privacy screen',
    layout: 'L-Shaped', seating: '1 Seater', topFinish: 'Oak', screen: 'White Screen', colors: [SWATCH.oak, SWATCH.screenWhite],
  }),
];

const slugFor = (p) => `workstation-${(p.model || p.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;

export const MODULAR_WORKSTATION_PRODUCTS = WORKSTATIONS.map((p, order) => ({
  brand: 'NextFurn',
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const MODULAR_WORKSTATION_DETAIL_PRODUCTS = MODULAR_WORKSTATION_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'modular-workstation',
  type: p.category,
  name: p.name,
  desc: p.subtitle,
  size: p.dimensions,
  specs: p.specs,
  catalogPriceOnly: true,
  variants: p.variants.map((v) => ({
    model: p.model || `Similar to ${p.refModel}`,
    label: v.label,
    price: v.price,
    image: p.image,
  })),
}));

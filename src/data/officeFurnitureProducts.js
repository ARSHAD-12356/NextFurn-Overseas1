// Office Furniture catalogue for the /office-furniture listing page.
//
// Images: web-optimised copies of every render in
// `Assets/next furn office furniture product_saman/` (60 files, originals untouched),
// stored as src/assets/office-furniture/<NN>-<model>.webp where NN is the file's
// position in that folder sorted by name.
//
// Data: taken from the NextFurn catalogue PDFs in the project root.
//   NFSOC  – "Nextfurn Overseas (NFSOC) Price list 2026.pdf"      (mesh chairs)
//   SPC    – "Nextfurn Overseas 2026 special collection price list.pdf" (executive/mesh chairs, w.e.f. 01 May 2026)
//   COLL   – "Nextfurn__Collection__2026 (1).pdf"                 (executive tables & workstations)
// "Chair Pricee List.pdf", "Nextfurn Mesh Back Chair.pdf" and "BURO Catalogue 2026.pdf"
// were also reviewed: none of their models matched these renders (BURO is a Spacewood range).
//
// match:
//   'verified' – model number, look and colourway all agree with the catalogue picture
//   'likely'   – same silhouette and catalogue description; colour/base details may differ in the render
//   'similar'  – no exact catalogue entry; named descriptively and given the specification and
//                prices of the closest catalogue model (`refModel`). Those prices are estimates.
// All other prices are the catalogue prices exactly as printed; the catalogues give no MRP or discount.

const IMAGES = import.meta.glob('../assets/office-furniture/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => {
  const prefix = `/${String(n).padStart(2, '0')}-`;
  const key = Object.keys(IMAGES).find((path) => path.includes(prefix));
  return key ? IMAGES[key] : '';
};

const SOURCES = {
  NFSOC: 'Nextfurn Overseas (NFSOC) Price List 2026',
  SPC: 'Nextfurn Overseas 2026 Special Collection Price List',
  COLL: 'Nextfurn Collection 2026',
};

const SWATCH = { black: '#1f1f1f', grey: '#a7a9ac', white: '#ececec', blue: '#2f5aa8', green: '#9bb07a', red: '#c8202c', tan: '#b98455', cream: '#e6dccb', walnut: '#6b4428' };

// ---------- Mesh chairs (NFSOC price list, 3-year warranty on every model) ----------
const mesh = (n, model, name, page, price, subtitle, specs, extra = {}) => ({
  imageIndex: n,
  model,
  name,
  subtitle,
  category: 'Mesh Chair',
  primaryMaterial: 'Mesh',
  seating: 'Single User',
  price,
  variants: [{ label: 'Standard', price }],
  specs: [['Warranty', '3 Years'], ...specs],
  source: { catalogue: SOURCES.NFSOC, page },
  ...extra,
});

const NFSOC_BASE_3 = ['Gas Lift / Base / Castor', 'Class 3 85 mm / Star Nylon 25" / Nylon 50 mm twin wheel'];
const NFSOC_BASE_4 = ['Gas Lift / Base / Castor', 'Class 4 85 mm / Star Nylon 26" / Nylon 60 mm twin wheel'];
const SCALES_BASE = ['Gas Lift / Base / Castor', 'Class 4 85 mm / Boing chrome base / Silver ring wheel'];
const ZOOM_BASE = ['Gas Lift / Base / Castor', 'Class 4 60 mm / Star Nylon 28" grey base / 60 mm Optimus grey wheel'];

const MESH_CHAIRS = [
  mesh(40, 'NF1', 'Ditto Mesh Chair – Black', 2, 6500, 'Mesh back with fixed lumbar support', [
    ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Self fixed'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS centre tilting with single locking and tension adjustment'], NFSOC_BASE_3,
  ], { colors: [SWATCH.black, SWATCH.grey], match: 'likely' }),
  mesh(38, 'NF2', 'Ditto Mesh Chair – Grey', 2, 8275, 'Grey mesh back with fixed lumbar support', [
    ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Self fixed'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS centre tilting with single locking and tension adjustment'], NFSOC_BASE_3,
  ], { colors: [SWATCH.grey, SWATCH.black], match: 'likely' }),
  mesh(6, 'NF3', 'Polar Mesh Chair – Black', 2, 8863, 'Glass-fibre backrest with adjustable lumbar', [
    ['Backrest', 'Glass fibre backrest, ergonomically designed'], ['Lumbar Support', 'Adjustable'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { colors: [SWATCH.black, SWATCH.grey], match: 'likely' }),
  mesh(34, 'NF5', 'Eiffel High Back Mesh Chair', 2, 10763, '2D headrest with grey fabric seat', [
    ['Headrest', '2D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded with plastic pan, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { match: 'verified' }),
  mesh(18, 'NF7', 'Glanza High Back Mesh Chair', 2, 11550, '2D headrest, fabric seat with seat cover', [
    ['Headrest', '2D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric with seat cover'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { match: 'likely' }),
  mesh(31, 'NF8', 'Glanza Mesh Chair', 3, 11550, 'Mesh back with fixed lumbar support', [
    ['Headrest', '2D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric with seat cover'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { match: 'likely' }),
  mesh(7, 'NF9', 'Feather High Back Mesh Chair', 3, 11550, 'Adjustable lumbar, blue fabric seat', [
    ['Headrest', '2D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Adjustable'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { colors: [SWATCH.blue], match: 'verified' }),
  mesh(17, 'NF10', 'Feather Mesh Chair', 3, 10413, 'Adjustable lumbar, green fabric seat', [
    ['Headrest', 'NA'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Adjustable'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { colors: [SWATCH.green], match: 'verified' }),
  mesh(14, 'NF11', 'Mustang High Back Mesh Chair', 3, 11550, 'Adjustable headrest, red fabric seat', [
    ['Headrest', 'Adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Adjustable'], ['Armrest', '3D adjustable with PU pad'],
    ['Seat', 'PU moulded with plastic pan, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { colors: [SWATCH.red], match: 'verified' }),
  mesh(42, 'NF12', 'Mustang Mesh Chair', 3, 10615, 'Adjustable lumbar with 1D armrests', [
    ['Headrest', 'NA'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Adjustable'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded with plastic pan, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { match: 'likely' }),
  mesh(44, 'NF13', 'Quartz High Back Mesh Chair', 3, 8456, '2D headrest with centre-tilt mechanism', [
    ['Headrest', '2D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Self fixed'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS centre tilting with single locking and tension adjustment'], NFSOC_BASE_3,
  ], { match: 'likely' }),
  mesh(48, 'NF14', 'Quartz Mesh Chair', 3, 7669, 'Fixed lumbar with centre-tilt mechanism', [
    ['Headrest', 'NA'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Self fixed'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS centre tilting with single locking and tension adjustment'], NFSOC_BASE_3,
  ], { match: 'likely' }),
  mesh(58, 'NF15', 'Bravo Mesh Chair', 4, 8925, 'Adjustable lumbar with synchro mechanism', [
    ['Headrest', 'NA'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Adjustable'], ['Armrest', '1D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], NFSOC_BASE_4,
  ], { match: 'likely' }),
  mesh(59, 'NF16', 'Scales Mesh Chair – Grey', 4, 15225, '3D armrests with seat slider, chrome base', [
    ['Headrest', '1D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', '3D adjustable with grey PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', '4 stage locking with seat slider'], SCALES_BASE,
  ], { colors: [SWATCH.grey, SWATCH.black], match: 'likely' }),
  mesh(53, 'NF18', 'Scales Mesh Chair – Black', 4, 13125, '3D armrests with seat slider, chrome base', [
    ['Headrest', '1D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', '3D adjustable with PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', '4 stage locking with seat slider'], SCALES_BASE,
  ], { colors: [SWATCH.black, SWATCH.grey], match: 'likely' }),
  mesh(37, 'NF20', 'Zoom High Back Mesh Chair – Grey', 4, 13588, '1D headrest with grey PU armrests', [
    ['Headrest', '1D adjustable, upholstered with fabric'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Adjustable with grey PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], ZOOM_BASE,
  ], { colors: [SWATCH.grey], match: 'likely' }),
  mesh(8, 'NF21', 'Zoom Mesh Chair – Grey', 4, 12600, 'Grey mesh back with synchro mechanism', [
    ['Headrest', 'NA'], ['Backrest', 'Ergonomically designed, upholstered with mesh fabric'], ['Lumbar Support', 'Fixed'], ['Armrest', 'Adjustable with grey PU pad'],
    ['Seat', 'PU moulded and plywood hot compressed, upholstered with fabric'], ['Mechanism', 'MS synchro with single locking and tension adjustment'], ZOOM_BASE,
  ], { colors: [SWATCH.grey], match: 'likely' }),
];

// ---------- Special collection chairs (SPC price list) ----------
const SPC_CHAIRS = [
  {
    imageIndex: 55, model: 'NF-117', name: 'NF-117 Premium Ergonomic Mesh Chair', category: 'Mesh Chair', primaryMaterial: 'Mesh',
    subtitle: '4D arms, auto-weight mechanism, aluminium frame',
    price: 118395, variants: [{ label: 'Aluminium Frame', price: 118395 }],
    specs: [['Headrest', 'Adjustable (up-down)'], ['Backrest', 'Adjustable (up-down)'], ['Armrest', 'PU adjustable (4D)'],
      ['Mechanism', 'Auto weight mechanism with inbuilt seat slider, gas lift'], ['Base', 'Aluminium base with 60 mm castor wheel'], ['Upholstery', 'Seat and back high elasticity mesh tapestry']],
    source: { catalogue: SOURCES.SPC, page: 13 }, match: 'verified',
  },
  {
    imageIndex: 9, model: 'NF-118', name: 'NF-118 Ergonomic Mesh Chair with Footrest', category: 'Mesh Chair', primaryMaterial: 'Mesh',
    subtitle: '4D arms, synchro tilt, manual footrest',
    price: 32850, variants: [{ label: 'Foot Rest (Manual)', price: 32850 }],
    specs: [['Headrest', 'Adjustable (up-down)'], ['Armrest', 'PU adjustable (4D)'], ['Mechanism', 'Synchro tilt mechanism, gas lift'],
      ['Base', 'Aluminium base with 60 mm castor wheel'], ['Upholstery', 'Seat and back high elasticity mesh tapestry'], ['Feature', 'Foot rest (manual)']],
    source: { catalogue: SOURCES.SPC, page: 13 }, colors: [SWATCH.grey, SWATCH.white], match: 'verified',
  },
  {
    imageIndex: 10, model: 'NF-014', name: 'NF-014 High Back Chrome Frame Chair', category: 'Executive Chair', primaryMaterial: 'Leather / Leatherette',
    subtitle: 'Chrome-plated pipe frame, leatherette on arm',
    price: 19080,
    variants: [
      { label: 'Leatherette · Swivel Tilt', price: 19080 }, { label: 'Leatherette · Knee Tilt', price: 22815 },
      { label: 'Pure Leather · Swivel Tilt', price: 35640 }, { label: 'Pure Leather · Knee Tilt', price: 38160 },
    ],
    specs: [['Back', 'High back'], ['Frame', 'Chrome plated pipe frame and arm, leatherette on arm'], ['Mechanism', 'Knee tilt or swivel tilt, gas lift'], ['Base', 'Chrome base']],
    source: { catalogue: SOURCES.SPC, page: 3 }, colors: [SWATCH.black], match: 'likely',
  },
  {
    imageIndex: 1, model: 'NF-016', name: 'NF-016 Medium Back Chrome Frame Chair', category: 'Executive Chair', primaryMaterial: 'Leather / Leatherette',
    subtitle: 'Chrome-plated pipe frame and arm, chrome base',
    price: 18270,
    variants: [
      { label: 'Leatherette · Swivel Tilt', price: 18270 }, { label: 'Leatherette · Knee Tilt', price: 22050 },
      { label: 'Pure Leather · Swivel Tilt', price: 31590 }, { label: 'Pure Leather · Knee Tilt', price: 35730 },
    ],
    specs: [['Back', 'Medium back'], ['Frame', 'Chrome plated pipe frame and arm'], ['Mechanism', 'Knee tilt or swivel tilt, gas lift'], ['Base', 'Chrome base']],
    source: { catalogue: SOURCES.SPC, page: 3 }, colors: [SWATCH.black], match: 'likely',
  },
  {
    imageIndex: 47, model: 'NF-004', name: 'NF-004 Medium Back Executive Chair', category: 'Executive Chair', primaryMaterial: 'Leather / Leatherette',
    subtitle: 'Wooden frame, cushion arm, knee tilt',
    price: 41040,
    variants: [{ label: 'Leatherette', price: 41040 }, { label: 'Pure Leather', price: 65655 }],
    specs: [['Back', 'Medium back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Aluminium base']],
    source: { catalogue: SOURCES.SPC, page: 2 }, colors: [SWATCH.cream, SWATCH.walnut], match: 'likely',
  },
].map((p) => ({ seating: 'Single User', ...p }));

// ---------- Executive tables & workstations (Collection 2026, PDF pages 3–4) ----------
const desk = (n, model, name, page, category, subtitle, tableTop, primaryMaterial, sizes, extra = {}) => ({
  imageIndex: n,
  model,
  name,
  subtitle,
  category,
  primaryMaterial,
  tableTop,
  seating: category === 'Workstation' ? 'Multi User' : 'Single User',
  price: Math.min(...sizes.map((s) => s.price)),
  variants: sizes.map((s) => ({ label: s.size, price: s.price })),
  dimensions: sizes.map((s) => s.size).join(' / '),
  specs: [['Specification', subtitle], ['Sizes (mm)', sizes.map((s) => s.size).join(', ')]],
  source: { catalogue: SOURCES.COLL, page },
  ...extra,
});

const DESKS = [
  desk(28, 'NF-MANHATTAN 1', 'NF-Manhattan 1 Executive Table', 3, 'Executive Table', 'Table with veneer, MDF top with PU polish', 'Veneer', 'Wood (MDF / Veneer)',
    [{ size: 'W2400 × D1200 × H750', price: 622260 }, { size: 'W3000 × D1200 × H750', price: 708120 }], { storage: 'Drawers', match: 'verified' }),
  desk(49, 'NF-REVIVAL 1', 'NF-Revival 1 Executive Table', 3, 'Executive Table', 'MDF structure, membrane, PU paint', 'Membrane MDF', 'Wood (MDF / Veneer)',
    [{ size: 'W3000 × D1800 × H750', price: 265365 }], { storage: 'Side Storage', match: 'likely' }),
  desk(32, 'NF-MARTINI 1', 'NF-Martini 1 Executive Table', 3, 'Executive Table', 'MDF structure, veneer PU polish, PU paint', 'Veneer', 'Wood (MDF / Veneer)',
    [{ size: 'W3000 × D2400 × H750', price: 500085 }], { match: 'verified' }),
  desk(24, 'NF-CHARM 1', 'NF-Charm 1 Executive Table', 3, 'Executive Table', 'MDF, teakwood, melamine polish, tile top', 'Tile', 'Wood (MDF / Veneer)',
    [{ size: 'W2100 × D1600 × H750', price: 305145 }], { storage: 'Side Storage', match: 'verified' }),
  desk(35, 'NF-COLTON 1', 'NF-Colton 1 Executive Table', 3, 'Executive Table', 'MDF structure, veneer, PU paint', 'Veneer', 'Wood (MDF / Veneer)',
    [{ size: 'W2500 × D1900 × H750', price: 367980 }], { storage: 'Side Storage', match: 'likely' }),
  desk(19, 'NF-EMERSON 1', 'NF-Emerson 1 Executive Table', 3, 'Executive Table', 'MDF structure, laminated, PU paint', 'Laminate', 'Wood (MDF / Veneer)',
    [{ size: 'W2200 × D1800 × H750', price: 194760 }], { match: 'verified' }),
  desk(20, 'NF-ENTERACT 3', 'NF-Enteract 3 Workstation', 4, 'Workstation', 'PLPB top, flaper box, extruded aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W3100 × D2400 × H750', price: 125370 }], { storage: 'Pedestal & Storage Units', match: 'verified' }),
  desk(33, 'NF-EWOKE 1', 'NF-Ewoke 1 Executive Table', 4, 'Executive Table', 'PLPB top, flaper box, extruded aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W2400 × D2100 × H750', price: 84780 }], { match: 'likely' }),
  desk(60, 'NF-EWOKE 2', 'NF-Ewoke 2 Executive Table', 4, 'Executive Table', 'PLPB top, flaper box, extruded aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W2200 × D1850 × H750', price: 80820 }], { storage: 'Side Storage', match: 'likely' }),
  desk(11, 'NF-PARCO 1', 'NF-Parco 1 Workstation', 4, 'Workstation', 'PLPB top, wire manager cap, glass screen, aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W1500 × D1200 × H750', price: 55305 }], { storage: 'Pedestal Drawers', match: 'verified' }),
  desk(51, 'NF-PARCO 2', 'NF-Parco 2 Workstation', 4, 'Workstation', 'PLPB top, wire manager cap, glass screen, aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W3600 × D1200 × H750', price: 175140 }], { storage: 'Pedestal Drawers', match: 'likely' }),
  desk(25, 'NF-PARCO 3', 'NF-Parco 3 Workstation', 4, 'Workstation', 'PLPB top, wire manager cap, glass screen, aluminium profile', 'Pre-laminated Particle Board', 'Engineered Wood',
    [{ size: 'W2400 × D1200 × H750', price: 119520 }], { storage: 'Pedestal Drawers', match: 'likely' }),
  desk(43, 'NF-PAVE 1', 'NF-Pave 1 Executive Table', 4, 'Executive Table', 'Executive table, particle board top', 'Particle Board', 'Engineered Wood',
    [{ size: 'W1650 × D1750 × H750', price: 81450 }, { size: 'W1800 × D1750 × H750', price: 84285 }], { match: 'likely' }),
  desk(5, 'NF-BROADWAY', 'NF-Broadway Executive Table', 4, 'Executive Table', 'Executive table, MDF top', 'MDF', 'Wood (MDF / Veneer)',
    [{ size: 'W2450 × D2330 × H750', price: 152145 }, { size: 'W2750 × D2330 × H750', price: 156465 }], { storage: 'Side Storage', match: 'verified' }),
  desk(56, 'NF-REX', 'NF-Rex Executive Table', 4, 'Executive Table', 'Executive table, MDF top', 'MDF', 'Wood (MDF / Veneer)',
    [{ size: 'W2400 × D1840 × H750', price: 115425 }, { size: 'W2700 × D1840 × H750', price: 119430 }], { storage: 'Side Storage', match: 'verified' }),
  desk(46, 'NF-OXFORD', 'NF-Oxford Executive Table', 4, 'Executive Table', 'Executive table, MDF top', 'MDF', 'Wood (MDF / Veneer)',
    [{ size: 'W1600 × D1400 × H750', price: 47835 }, { size: 'W1900 × D1400 × H750', price: 48510 }], { storage: 'Side Storage', match: 'verified' }),
  desk(27, 'NF-EXCLUSIVE 2', 'NF-Exclusive 2 Executive Table', 4, 'Executive Table', 'Executive table, particle board top', 'Particle Board', 'Engineered Wood',
    [{ size: 'W1800 × D1750 × H750', price: 63810 }, { size: 'W2000 × D1850 × H750', price: 66330 }, { size: 'W2200 × D1950 × H750', price: 68895 }],
    { storage: 'Side Storage', match: 'likely' }),
];

// ---------- Renders with no exact catalogue entry (priced from the closest catalogue model) ----------
// These 21 renders have no exact model in any catalogue. Each one is given a descriptive name and the
// specification + Leatherette / Pure Leather prices of the closest SPC model (same back height, frame,
// arm and base type). The prices are ESTIMATES borrowed from that reference model, not catalogue
// prices for the chair in the photo — confirm with the NextFurn team before quoting customers.
const SPC_REFERENCE = {
  'NF-001': { page: 2, leatherette: 40635, leather: 81225, specs: [['Back', 'High back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Torsion bar mechanism, gas lift'], ['Base', 'Wooden base']] },
  'NF-003': { page: 2, leatherette: 42570, leather: 68220, specs: [['Back', 'High back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Aluminium base']] },
  'NF-004': { page: 2, leatherette: 41040, leather: 65655, specs: [['Back', 'Medium back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Aluminium base']] },
  'NF-005': { page: 2, leatherette: 45600, leather: 63090, specs: [['Back', 'High back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Aluminium base']] },
  'NF-006': { page: 2, leatherette: 30150, leather: 59400, specs: [['Back', 'Medium back'], ['Frame', 'Wooden frame, cushion arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Aluminium base']] },
  'NF-010': { page: 2, leatherette: 41040, leather: 66960, specs: [['Back', 'High back'], ['Frame', 'Wooden frame, wooden cushion arm'], ['Mechanism', 'Synchro knee tilt, gas lift'], ['Base', 'Aluminium base']] },
  'NF-012': { page: 3, leatherette: 30465, leather: 55755, specs: [['Back', 'High back, movable'], ['Frame', 'Wooden frame, pipe cushion arm'], ['Mechanism', 'Torsion bar, gas lift'], ['Base', 'Aluminium base']] },
  'NF-013': { page: 3, leatherette: 29610, leather: 54090, specs: [['Back', 'Medium back, movable'], ['Frame', 'Wooden frame, pipe cushion arm'], ['Mechanism', 'Torsion bar, gas lift'], ['Base', 'Aluminium base']] },
  'NF-014': { page: 3, leatherette: 22815, leather: 38160, specs: [['Back', 'High back'], ['Frame', 'Chrome plated pipe frame and arm, leatherette on arm'], ['Mechanism', 'Knee tilt, gas lift'], ['Base', 'Chrome base']] },
};

const similar = (n, name, subtitle, colors, refModel) => {
  const ref = SPC_REFERENCE[refModel];
  return {
    imageIndex: n,
    model: '',
    refModel,
    name,
    subtitle,
    category: 'Executive Chair',
    primaryMaterial: 'Leather / Leatherette',
    seating: 'Single User',
    price: ref.leatherette,
    variants: [{ label: 'Leatherette', price: ref.leatherette }, { label: 'Pure Leather', price: ref.leather }],
    specs: [...ref.specs, ['Price basis', `Estimated from catalogue model ${refModel}`]],
    colors,
    source: { catalogue: SOURCES.SPC, page: ref.page, reference: refModel },
    match: 'similar',
  };
};

const SIMILAR_CHAIRS = [
  similar(2, 'Aria Mid Back Executive Chair – Taupe', 'Wood-panel armrests, knee tilt, aluminium base', [SWATCH.tan, SWATCH.walnut], 'NF-006'),
  similar(3, 'Arc Mid Back Executive Chair – Ivory', 'Sweeping pipe arms, torsion bar, aluminium base', [SWATCH.cream], 'NF-013'),
  similar(4, 'Lumen High Back Executive Chair – Taupe', 'Padded headrest, pipe cushion arms, torsion bar', [SWATCH.tan], 'NF-012'),
  similar(12, 'Curve High Back Executive Chair – Taupe & Walnut', 'Walnut-tone back shell, knee tilt, aluminium base', [SWATCH.tan, SWATCH.walnut], 'NF-003'),
  similar(13, 'Arc High Back Executive Chair – Ivory', 'Headrest bolster, sweeping pipe arms, torsion bar', [SWATCH.cream], 'NF-012'),
  similar(15, 'Curve Mid Back Executive Chair – Ivory & Walnut', 'Sculpted arms, walnut-tone shell, knee tilt', [SWATCH.cream, SWATCH.walnut], 'NF-004'),
  similar(16, 'Aria High Back Executive Chair – Taupe', 'Wood-panel armrests, knee tilt, aluminium base', [SWATCH.tan, SWATCH.walnut], 'NF-005'),
  similar(21, 'Regent High Back Executive Chair – Navy', 'Chrome pipe frame and arms, chrome base', ['#2c3550'], 'NF-014'),
  similar(22, 'Lumen Grip High Back Executive Chair – Taupe', 'Carry-handle back, pipe cushion arms, torsion bar', [SWATCH.tan], 'NF-012'),
  similar(23, 'Lumen Mid Back Executive Chair – Grey', 'Pipe cushion arms, torsion bar, aluminium base', [SWATCH.grey], 'NF-013'),
  similar(26, 'Summit High Back Executive Chair – Taupe', 'Integrated headrest, synchro knee tilt', [SWATCH.tan], 'NF-010'),
  similar(29, 'Halo Mid Back Executive Chair – Ivory & Walnut', 'Curved walnut-tone shell, flared arms, knee tilt', [SWATCH.cream, SWATCH.walnut], 'NF-004'),
  similar(30, 'Halo High Back Executive Chair – Ivory & Walnut', 'Headrest, curved walnut-tone shell, knee tilt', [SWATCH.cream, SWATCH.walnut], 'NF-003'),
  similar(36, 'Regent Channel High Back Executive Chair – Navy', 'Channel-stitched back, torsion bar, aluminium base', ['#2c3550'], 'NF-012'),
  similar(39, 'Aria High Back Executive Chair – Black', 'Wood-panel armrests, knee tilt, aluminium base', [SWATCH.black, SWATCH.walnut], 'NF-005'),
  similar(41, 'Lumen Mid Back Executive Chair – Ivory', 'Pipe cushion arms, torsion bar, aluminium base', [SWATCH.cream], 'NF-013'),
  similar(45, 'Halo Plus High Back Executive Chair – Ivory & Walnut', 'Headrest, walnut-tone back shell, torsion bar', [SWATCH.cream, SWATCH.walnut], 'NF-001'),
  similar(50, 'Lumen High Back Executive Chair – Light Grey', 'Headrest cushion, pipe cushion arms, torsion bar', [SWATCH.grey], 'NF-012'),
  similar(52, 'Summit High Back Executive Chair – Ivory & Walnut', 'Walnut-tone back, cushion arms, torsion bar', [SWATCH.cream, SWATCH.walnut], 'NF-001'),
  similar(54, 'Aria Mid Back Executive Chair – Black', 'Wood-panel armrests, knee tilt, aluminium base', [SWATCH.black, SWATCH.walnut], 'NF-006'),
  similar(57, 'Summit High Back Executive Chair – Ivory & Tan', 'Tan back shell, cushion arms, torsion bar', [SWATCH.cream, SWATCH.tan], 'NF-001'),
];

const slugFor = (p) => `office-${(p.model || p.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;

// Listing order: tables & workstations first, then catalogue-matched chairs, then chairs priced from a reference model.
export const OFFICE_FURNITURE_PRODUCTS = [...DESKS, ...SPC_CHAIRS, ...MESH_CHAIRS, ...SIMILAR_CHAIRS].map((p, order) => ({
  brand: 'NextFurn',
  storage: '',
  tableTop: '',
  colors: [],
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const OFFICE_DETAIL_PRODUCTS = OFFICE_FURNITURE_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'office-furniture',
  type: p.category,
  name: p.name,
  desc: p.subtitle,
  size: p.dimensions || '',
  specs: p.specs,
  priceOnRequest: p.price == null,
  catalogPriceOnly: true,
  variants: (p.variants.length ? p.variants : [{ label: 'Standard', price: null }]).map((v) => ({
    model: p.model || `Similar to ${p.refModel}`,
    label: v.label,
    price: v.price,
    image: p.image,
  })),
}));

export const formatOfficePrice = (price) => (price == null ? 'Price on request' : `₹${price.toLocaleString('en-IN')}`);

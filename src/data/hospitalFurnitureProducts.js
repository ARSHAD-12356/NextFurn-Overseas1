// Hospital Furniture catalogue for the /hospital-furniture listing page.
//
// Images: web-optimised copies of `Assets/hospital furniture.zip` (zip untouched), stored as
// src/assets/hospital-furniture/<NN>.webp where NN is the file's position inside the zip.
// Files 18, 24, 26, 39 and 66 repeat a product already shown here and are left out.
//
// Data: "Nextfurn__Collection__2026 (1).pdf", NF Healthcare Series, Lab Furniture and steel storage.
// Names, specifications, sizes and prices are as printed; `source.page` is the printed page number.
// Prices include 18% GST per the catalogue terms; there is no MRP or discount.
//
// match:
//   'verified' – model and look agree with the catalogue picture
//   'likely'   – closest catalogue model; lab table lengths and sides cannot be told from a photo
//   'similar'  – no catalogue entry; named from the photo and priced from `refModel`, so an estimate

const IMAGES = import.meta.glob('../assets/hospital-furniture/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => IMAGES[`../assets/hospital-furniture/${String(n).padStart(2, '0')}.webp`] || '';

const CATALOGUE = 'Nextfurn Collection 2026';
const SS = 'Stainless Steel';
const PC = 'Powder Coated Steel';

const item = (n, model, name, page, type, material, spec, size, options, extra = {}) => ({
  imageIndex: n,
  model,
  name,
  subtitle: spec,
  category: type,
  primaryMaterial: material,
  price: Math.min(...options.map(([, price]) => price)),
  variants: options.map(([label, price, image]) => ({ label, price, image })),
  dimensions: size,
  specs: [['Specification', spec], ...(size ? [['Size (mm)', size]] : [])],
  colors: [],
  brand: 'NextFurn',
  storage: '',
  source: { catalogue: CATALOGUE, page },
  match: extra.match || 'verified',
  refModel: extra.refModel,
});
const one = (price) => [['Standard', price]];

const BED = 'Hospital Bed';
const COUCH = 'Examination Table';
const STRETCHER = 'Stretcher & Wheelchair';
const TROLLEY = 'Medical Trolley';
const STOOL = 'Stool & Footstep';
const WARD = 'Ward Accessory';
const LAB = 'Lab Table';
const STORE = 'Storage';

const PRODUCTS = [
  // ---------- Beds (printed pages 49–50) ----------
  item(48, 'NF-REVIVE', 'NF-Revive ICU Bed', 49, BED, PC, 'Motorized ICU bed with detachable moulded polymer head and foot panel', '2140 × 1020', [
    ['Pro · 4 Motors', 182205, 48], ['Vital · 4 Motors', 162585, 49], ['Standard · Semi Motorized, 3 Motors', 136620, 48],
  ]),
  item(47, 'NF-CURE', 'NF-Cure Fowler Electric Bed', 49, BED, PC, 'Fowler electric bed with detachable moulded polymer head and foot panel', '2100 × 1020 × 600', [
    ['Vital', 97605], ['Fowler', 91035], ['Active · Semi-Motorised', 82890],
  ]),
  item(46, 'NF-GK 1000', 'NF-GK 1000 ICU Bed', 49, BED, PC, 'Detachable moulded polymer head and foot panel, adjustable backrest and upper leg, powder coated MS parts', '2170 × 1050', one(71550)),
  item(45, 'NF-GK 1003', 'NF-GK 1003 Fowler Bed', 49, BED, PC, 'Detachable moulded polymer head and foot panel, back and upper leg adjusted by crank mechanism', '2010 × 900 × 600', one(40680)),
  item(44, 'NF-GK 1005', 'NF-GK 1005 Semi Fowler Bed', 50, BED, PC, 'Detachable moulded polymer head and foot panel, crank mechanism, powder coated', '2010 × 900 × 600', one(27090)),
  item(43, 'NF-GK 1006', 'NF-GK 1006 Semi Fowler Bed', 50, BED, PC, 'Head and foot panel of SS pipe and 18 mm ply laminated on both sides, powder coated', '2010 × 900 × 600', one(26055)),
  item(42, 'NF-GK 1007', 'NF-GK 1007 Basic Bed', 50, BED, PC, 'Flat platform, MS head and foot panel, powder coated', '1800 × 900 × 510', one(19710)),
  item(41, 'NF-GK 1008', 'NF-GK 1008 Pediatric General Bed', 50, BED, PC, 'MS head and foot panel, powder coated', '1370 × 825 × 560', one(27675)),
  item(38, 'NF-GK 1011', 'NF-GK 1011 Pediatric Deluxe Bed', 50, BED, PC, 'Detachable moulded polymer head and foot panel, backrest movement through crank mechanism', '1370 × 825 × 560', one(37440)),
  item(40, 'NF-GK 1009', 'NF-GK 1009 Attendant Bed', 50, BED, PC, 'Powder coated, rubber shoe', '1800 × 610 × 380', one(15615)),

  // ---------- Examination and gynae tables (printed pages 50–51) ----------
  item(36, 'NF-GK 7000', 'NF-GK 7000 Examination Couch', 50, COUCH, PC, 'Electrically operated, top with stainless steel', '1900 × 640', one(81315)),
  item(37, 'NF-GK 7002', 'NF-GK 7002 Examination Deluxe Couch', 50, COUCH, PC, 'Ratchet mechanism, five drawers, powder coated', '1880 × 610 × 850', one(53685)),
  item(34, 'NF-GK 7003', 'NF-GK 7003 Examination Couch', 50, COUCH, PC, 'Gas spring, three drawer and three cabinet, powder coated', '1875 × 640 × 850', one(53685), { match: 'likely' }),
  item(35, 'NF-GK 7003 A', 'NF-GK 7003 A Examination Couch with Footrest', 50, COUCH, PC, 'Footrest, gas spring, three drawer and three cabinet, powder coated', '1830 × 560 × 810', one(57780), { match: 'likely' }),
  item(33, 'NF-GK 7004', 'NF-GK 7004 Gynae Examination Deluxe Table', 50, COUCH, SS, 'Three section top moulded mattress, sliding footrest, SS construction', '1750 × 660 × 810', one(78300)),
  item(32, 'NF-GK 7005', 'NF-GK 7005 Gynae Examination Deluxe Table', 51, COUCH, PC, 'Three section top moulded mattress, sliding footrest, powder coated', '1750 × 660 × 810', one(58770)),
  item(31, 'NF-GK 7006', 'NF-GK 7006 Gynae Examination Table', 51, COUCH, PC, 'Three section top with fixed mattress, powder coated', '1750 × 660 × 810', one(43695)),
  item(29, 'NF-GK 7007', 'NF-GK 7007 Examination Table', 51, COUCH, PC, 'Two section top with fixed mattress, powder coated', '1830 × 740 × 810', one(18900)),
  item(28, 'NF-GK 7009', 'NF-GK 7009 Blood Donation Chair with Recline', 51, COUCH, PC, 'Cushion seat and back with arm, leatherette tapestry, MS powder coated frame', '', one(33660)),

  // ---------- Stretchers and wheelchair (printed page 51) ----------
  item(30, 'NF-GK 8000', 'NF-GK 8000 Emergency & Recovery Trolley', 51, STRETCHER, PC, 'Hydraulic foot pump, gas spring, ratchet mechanism, powder coated', '2110 × 710', one(87840)),
  item(27, 'NF-GK 8001', 'NF-GK 8001 Stretcher Deluxe Trolley', 51, STRETCHER, SS, 'Two section top with moulded mattress, ratchet mechanism, stainless steel construction', '2030 × 620 × 880', one(50400)),
  item(25, 'NF-GK 8002', 'NF-GK 8002 Stretcher Deluxe Trolley', 51, STRETCHER, PC, 'Two section top with moulded mattress, ratchet mechanism, powder coated', '2030 × 620 × 880', one(34110)),
  item(23, 'NF-GK 8003', 'NF-GK 8003 Stretcher Deluxe Trolley', 51, STRETCHER, SS, 'Removable top, stainless steel construction', '2030 × 620 × 880', one(37440)),
  item(22, 'NF-GK 8006', 'NF-GK 8006 Wheel Chair', 51, STRETCHER, PC, 'Rigid wheel chair, adjustable aluminium footrest, powder coated', '700 × 1050 × 980', one(18810)),

  // ---------- Medical trolleys (printed page 53) ----------
  item(21, 'NF-GK 3000', 'NF-GK 3000 Crash Cart', 53, TROLLEY, SS, 'Complete SS frame, polystyrene lockable storage', '970 × 500 × 1630', one(47160)),
  item(20, 'NF-GK 3001', 'NF-GK 3001 OT Drug Trolley', 53, TROLLEY, SS, 'Complete SS structure', '670 × 1540 (H)', one(40680)),
  item(19, 'NF-GK 3002', 'NF-GK 3002 Medicine Trolley', 53, TROLLEY, SS, 'Complete SS structure, polystyrene lockable storage', '750 × 380 × 910', one(40680)),
  item(16, 'NF-GK 3004', 'NF-GK 3004 Suction Machine Trolley', 53, TROLLEY, SS, 'SS top, powder coated', '610 × 510 × 850', one(12330), { match: 'likely' }),
  item(15, 'NF-GK 3005', 'NF-GK 3005 Instrument Trolley', 53, TROLLEY, SS, 'Stainless steel structure', '475 × 610 × 850', one(15615)),
  item(17, 'NF-GK 3007', 'NF-GK 3007 Dressing Trolley', 53, TROLLEY, SS, 'Stainless steel frame, SS shelves', '610 × 475 × 850', one(20160)),
  item(11, 'NF-GK 3009', 'NF-GK 3009 Mayo Table', 53, TROLLEY, SS, 'Stainless steel frame, height adjustable through knob', '1315 × 620 × 910/1215', one(21150)),
  item(10, 'Similar to NF-GK 3007', 'Dressing Trolley with Drawers, Bowl and Bin', 53, TROLLEY, SS, 'Four tier stainless steel trolley with two drawers, a bowl holder and a pedal bin', '', one(20160), { match: 'similar', refModel: 'NF-GK 3007' }),
  item(4, 'Similar to NF-GK 3005', 'Two Shelf Instrument Trolley with Handle', 53, TROLLEY, PC, 'White frame with two steel shelves, push handle and castors', '', one(15615), { match: 'similar', refModel: 'NF-GK 3005' }),

  // ---------- Stools and footsteps (printed pages 53–54) ----------
  item(12, 'NF-GK 4000', 'NF-GK 4000 Revolving Stool', 53, STOOL, SS, 'Cushioned top, stainless steel structure, height adjustable', '510–690 (H)', one(6075)),
  item(13, 'NF-GK 4002', 'NF-GK 4002 Revolving Stool', 53, STOOL, PC, 'SS top, powder coated, height adjustable', '510–690 (H)', one(4095), { match: 'likely' }),
  item(14, 'NF-GK 4002 A', 'NF-GK 4002 A Revolving Stool', 53, STOOL, SS, 'SS top, stainless steel structure, height adjustable', '510–690 (H)', one(5265)),
  item(9, 'NF-GK 4004', 'NF-GK 4004 Bed Side Stool', 54, STOOL, PC, 'Powder coated', '300 × 300 × 510', one(3020), { match: 'likely' }),
  item(8, 'NF-GK 4005', 'NF-GK 4005 Double Footstep', 54, STOOL, SS, 'Stainless steel frame', '300 × 500 × 450', one(5355)),
  item(7, 'NF-GK 4007', 'NF-GK 4007 Single Footstep Stool', 54, STOOL, SS, 'Stainless steel structure', '450 × 250 × 230', one(3150)),
  item(6, 'NF-GK 4008', 'NF-GK 4008 Single Footstep Stool', 54, STOOL, PC, 'Powder coated', '450 × 250 × 230', one(1800)),

  // ---------- Ward accessories (printed page 54) ----------
  item(5, 'NF-GK 4009', 'NF-GK 4009 Saline Stand', 54, WARD, SS, 'Height adjustable, stainless steel frame, SS base', '1350–2200 (H)', one(4770)),
  item(3, 'NF-GK 4012', 'NF-GK 4012 Basin Stand Single', 54, WARD, SS, 'Complete SS construction', '850 (H)', one(5040)),
  item(2, 'NF-GK 4013', 'NF-GK 4013 Kick Bucket', 54, WARD, SS, 'Stainless steel frame, nylon castors', '345 diameter', one(3735)),
  item(1, 'NF-GK 4015', 'NF-GK 4015 Four Fold Screen', 54, WARD, PC, 'MS frame with curtain', '1675 (H) × 2450 (L)', one(9540)),

  // ---------- Lab furniture (printed pages 47–48) ----------
  item(62, 'NF-LAB 1', 'NF-LAB 1 Lab Table with Island Unit', 47, LAB, PC, 'With island unit', '2480 × 1540 × 900', one(246150)),
  item(61, 'NF-LAB 2', 'NF-LAB 2 Lab Table Wall Side Unit', 47, LAB, PC, 'Wall side unit', '2480 × 770 × 900', one(118350)),
  item(60, 'NF-LAB 3', 'NF-LAB 3 Lab Table with Reagent Shelf and Sink', 47, LAB, PC, 'Single side with reagent shelf and sink', '2480 × 770 × 900', one(192600), { match: 'likely' }),
  item(50, 'NF-LAB 4', 'NF-LAB 4 Lab Table with Reagent Shelf and Sink', 47, LAB, PC, 'Single side with reagent shelf and sink', '3680 × 770 × 900', one(256140), { match: 'likely' }),
  item(59, 'NF-LAB 5', 'NF-LAB 5 Lab Table with Reagent Shelf and Sink', 47, LAB, PC, 'Single side with reagent shelf and sink', '6080 × 770 × 900', one(364590), { match: 'likely' }),
  item(56, 'NF-LAB 6', 'NF-LAB 6 Lab Table with Reagent Shelf and Sink', 47, LAB, PC, 'Double side with reagent shelf and sink', '2480 × 1540 × 900', one(331830), { match: 'likely' }),
  item(55, 'NF-LAB 7', 'NF-LAB 7 Lab Table with Reagent Shelf and Sink', 48, LAB, PC, 'Double side with reagent shelf and sink', '3680 × 1540 × 900', one(460215), { match: 'likely' }),
  item(58, 'NF-LAB 9', 'NF-LAB 9 Lab Table with Electrical Trunking', 48, LAB, PC, 'Single side with electrical trunking', '4880 × 770 × 900', one(216090), { match: 'likely' }),
  item(51, 'NF-LAB 10', 'NF-LAB 10 Lab Table with Electrical Trunking', 48, LAB, PC, 'Single side with electrical trunking', '3680 × 770 × 900', one(169425), { match: 'likely' }),
  item(53, 'NF-LAB 11', 'NF-LAB 11 Lab Table with Electrical Trunking', 48, LAB, PC, 'Single side with electrical trunking', '2480 × 770 × 900', one(116685), { match: 'likely' }),
  item(54, 'NF-LAB 12', 'NF-LAB 12 Lab Table with Electrical Trunking', 48, LAB, PC, 'Double side with electrical trunking', '2480 × 1540 × 900', one(222930), { match: 'likely' }),
  item(52, 'NF-LAB 13', 'NF-LAB 13 Lab Table with Electrical Trunking', 48, LAB, PC, 'Double side with electrical trunking', '3680 × 1540 × 900', one(320355), { match: 'likely' }),
  item(57, 'NF-LAB 16', 'NF-LAB 16 Lab Table with Reagent Shelf and Sink', 48, LAB, PC, 'Single side with reagent shelf and sink', '4880 × 770 × 900', one(310095), { match: 'likely' }),

  // ---------- Steel storage (printed page 47) ----------
  item(70, 'NF-GMS 61', 'NF-GMS 61 Sliding Door Storage Unit', 47, STORE, PC, 'Sliding door storage unit, thickness 0.8 mm', '900 × 450 × 980', one(16245)),
  item(69, 'NF-GMS 62 A', 'NF-GMS 62 A Magazine Rack', 47, STORE, PC, 'Magazine rack, thickness 0.8 mm', '900 × 550 × 1600', one(14985)),
  item(68, 'Similar to NF-GMS 62 A', 'Mobile Magazine Rack', 47, STORE, PC, 'Four tier magazine rack on castors', '', one(14985), { match: 'similar', refModel: 'NF-GMS 62 A' }),
  item(64, 'NF-GMS 63', 'NF-GMS 63 Five Shelf Rack – Grey', 47, STORE, PC, 'Rack with 5 shelves, thickness 0.8 mm', '900 × 400 × 1200', one(15075), { match: 'likely' }),
  item(67, 'NF-GMS 63', 'NF-GMS 63 Five Shelf Rack – White', 47, STORE, PC, 'Rack with 5 shelves, thickness 0.8 mm', '900 × 400 × 1200', one(15075), { match: 'likely' }),
  item(65, 'NF-GMS 63', 'NF-GMS 63 Three Shelf Rack', 47, STORE, PC, 'Rack with 3 shelves, thickness 0.8 mm', '900 × 400 × 750', one(12150)),
  item(63, 'NF-GMS 64', 'NF-GMS 64 Rack with Door', 47, STORE, PC, 'Rack with door and 5 shelves, thickness 0.8 mm', '900 × 400 × 1200', one(18090), { match: 'likely' }),
];

const slugFor = (p) => `hospital-${p.imageIndex}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;

export const HOSPITAL_FURNITURE_PRODUCTS = PRODUCTS.map((p, order) => ({
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const HOSPITAL_DETAIL_PRODUCTS = HOSPITAL_FURNITURE_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'hospital-furniture',
  type: p.category,
  name: p.name,
  desc: p.subtitle,
  size: p.dimensions,
  specs: p.specs,
  catalogPriceOnly: true,
  variants: p.variants.map((v) => ({
    model: p.model,
    label: v.label,
    price: v.price,
    image: v.image ? imageByIndex(v.image) : p.image,
  })),
}));

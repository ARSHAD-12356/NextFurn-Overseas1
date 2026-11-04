import diplomatSofaImage from '../../Assets/Gifting/Diplomat sofa.png';
import classicSofaImage from '../../Assets/Gifting/Classic sofa.png';
import cafeTableImage from '../../Assets/Gifting/cafe table.png';
import verticalFilingImage from '../../Assets/Gifting/vertical filling furn.png';
import { TV_UNITS } from './tvUnits.js';
import { OFFICE_DETAIL_PRODUCTS } from './officeFurnitureProducts.js';
import { MODULAR_WORKSTATION_DETAIL_PRODUCTS } from './modularWorkstationProducts.js';
import { EDUCATIONAL_DETAIL_PRODUCTS } from './educationalFurnitureProducts.js';
import { RESTAURANT_CAFE_DETAIL_PRODUCTS } from './restaurantCafeProducts.js';
import { INSTITUTE_DETAIL_PRODUCTS } from './instituteFurnitureProducts.js';
import { GIFTING_NEW_PRODUCTS } from './giftingProducts.js';
import { MATTRESSES } from './mattresses.js';
import { HOSPITAL_DETAIL_PRODUCTS } from './hospitalFurnitureProducts.js';

/* NextFurn Overseas product range used by the "Our Products" homepage section.
   Source PDFs (all w.e.f. 01 May 2026):
     NFSOC = "Nextfurn Overseas (NFSOC) Price list 2026.pdf"
     COLL  = "Nextfurn__Collection__2026 (1).pdf"
   `page` is the printed page number in that PDF. Prices are in INR exactly as listed.
   Each product's `variants` are genuine sibling models or listed options from the same row/series;
   the thumbnails switch between them. Ratings, reviews and discounts are not in the PDFs, so none are shown. */

const IMAGES = import.meta.glob('../assets/products-range/*.jpg', { eager: true, query: '?url', import: 'default' });
const NAMED_PRODUCT_IMAGES = import.meta.glob('../../Assets/New folder/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});
const img = (name) => {
  const url = IMAGES[`../assets/products-range/${name}.jpg`];
  if (!url) throw new Error(`Missing product image: ${name}.jpg`);
  return url;
};

export const CATEGORIES = [
  { id: 'office', label: 'Office Furniture', image: img('table-charm') },
  { id: 'sofa', label: 'Sofa & Lounge', image: img('diplomat-3') },
  { id: 'education', label: 'Education Furniture', image: img('student-1-two') },
  { id: 'healthcare', label: 'Healthcare Furniture', image: img('revive-pro') },
  { id: 'public', label: 'Public Seating', image: img('magnum-3') },
  { id: 'cafeteria', label: 'Cafeteria Furniture', image: img('gc-948-small') },
  { id: 'storage', label: 'Storage & Utility', image: img('gms-1') },
];

const v = (model, label, price, image, extra = {}) => ({ model, label, price, image: img(image), ...extra });

export const PRODUCTS = [
  // ---------- Office Furniture ----------
  { id: 'charm', category: 'office', type: 'Office Table', name: 'NF-Charm 1', source: 'COLL p.1',
    desc: 'MDF structure, teakwood, melamine polish, tile top · W2100 × D1600 × H750',
    variants: [v('NF-CHARM 1', 'W2100 × D1600', 305145, 'table-charm')] },
  { id: 'colton', category: 'office', type: 'Office Table', name: 'NF-Colton 1', source: 'COLL p.1',
    desc: 'MDF structure, veneer, PU paint · W2500 × D1900 × H750',
    variants: [v('NF-COLTON 1', 'W2500 × D1900', 367980, 'table-colton')] },
  { id: 'emerson', category: 'office', type: 'Office Table', name: 'NF-Emerson 1', source: 'COLL p.1',
    desc: 'MDF structure, laminated, PU paint · W2200 × D1800 × H750',
    variants: [v('NF-EMERSON 1', 'W2200 × D1800', 194760, 'table-emerson')] },
  { id: 'revival', category: 'office', type: 'Office Table', name: 'NF-Revival 1', source: 'COLL p.1',
    desc: 'MDF structure, membrane, PU paint · W3000 × D1800 × H750',
    variants: [v('NF-REVIVAL 1', 'W3000 × D1800', 265365, 'table-revival')] },
  { id: 'ditto', category: 'office', type: 'Mesh Chair', name: 'Ditto NF Chair', source: 'NFSOC p.2',
    desc: 'Ergonomic mesh back, fixed lumbar support, 3 years warranty',
    variants: [v('NF1', 'Black', 6500, 'ditto-black'), v('NF2', 'Grey', 8275, 'ditto-grey')] },
  { id: 'polar', category: 'office', type: 'Mesh Chair', name: 'Polar NF Chair', source: 'NFSOC p.2',
    desc: 'Glass fibre backrest, adjustable lumbar support, synchro mechanism',
    variants: [v('NF3', 'Black', 8863, 'polar-black'), v('NF4', 'Grey', 11813, 'polar-grey')] },

  // ---------- Sofa & Lounge (leatherette & fabric prices) ----------
  { id: 'diplomat', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Diplomat Sofa', source: 'COLL p.17',
    desc: 'Wooden frame, wooden leg, tufted back',
    variants: [v('NF-DIPLOMAT 1', '1 Seater', 29970, 'diplomat-1'), v('NF-DIPLOMAT 2', '2 Seater', 39645, 'diplomat-2'), v('NF-DIPLOMAT 3', '3 Seater', 50400, 'diplomat-3')] },
  { id: 'classic', category: 'sofa', type: 'Sofa · Fabric', name: 'NF-Classic Sofa', source: 'COLL p.18',
    desc: 'Wooden frame, wooden leg, tufted back',
    variants: [v('NF-CLASSIC 1', '1 Seater', 28500, 'sofa-classic')] },
  { id: 'regal', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Regal Sofa', source: 'COLL p.17',
    desc: 'Wooden frame, cushion arm, tufted back, SS leg',
    variants: [v('NF-REGAL 1', '1 Seater', 41535, 'regal-1'), v('NF-REGAL 2', '2 Seater', 58950, 'regal-2'), v('NF-REGAL L', 'L-Shape', 167175, 'regal-l')] },
  { id: 'modern', category: 'sofa', type: 'Sofa · Fabric', name: 'NF-Modern Sofa', source: 'COLL p.18',
    desc: 'Wooden frame, SS pipe leg',
    variants: [v('NF-MODERN 1', '1 Seater', 27490, 'sofa-modern')] },
  { id: 'zap', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Zap Sofa', source: 'COLL p.19',
    desc: 'Wooden frame, SS pipe leg frame',
    variants: [v('NF-ZAP 1', '1 Seater', 32895, 'zap-1'), v('NF-ZAP 2', '2 Seater', 39960, 'zap-2'), v('NF-ZAP 3', '3 Seater', 47160, 'zap-3')] },
  { id: 'columbia', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Columbia Sofa', source: 'COLL p.21',
    desc: 'Wooden frame, SS pipe leg',
    variants: [v('NF-COLUMBIA 1', '1 Seater', 19080, 'columbia-1'), v('NF-COLUMBIA 2', '2 Seater', 26460, 'columbia-2'), v('NF-COLUMBIA 3', '3 Seater', 33885, 'columbia-3')] },

  // ---------- Education Furniture ----------
  { id: 'student-1', category: 'education', type: 'Student Desk', name: 'NF-Student 1', source: 'COLL p.39',
    desc: 'PLPB edge banded top, seat & back, powder coated pipe frame',
    variants: [v('NF-STUDENT 1', 'Two Seater', 15345, 'student-1-two'), v('NF-STUDENT 1', 'Three Seater', 19035, 'student-1-three')] },
  { id: 'student-2', category: 'education', type: 'Student Desk', name: 'NF-Student 2', source: 'COLL p.39',
    desc: 'PLPB edge banded top & seat back, powder coated pipe frame',
    variants: [v('NF-STUDENT 2', 'Single Seater', 9585, 'student-2-single'), v('NF-STUDENT 2', 'Two Seater', 14580, 'student-2-two')] },
  { id: 'student-7', category: 'education', type: 'Student Desk', name: 'NF-Student 7', source: 'COLL p.39',
    desc: 'Dual desk, PLPB top & seat back · Overall 900 × 900 × 640',
    variants: [v('NF-STUDENT 7', 'Two Seater', 12285, 'student-7')] },
  { id: 'student-10', category: 'education', type: 'Student Desk', name: 'NF-Student 10', source: 'COLL p.39',
    desc: 'Knockdown dual desk, post forming top · Overall 1065 × 950 × 750',
    variants: [v('NF-STUDENT 10', 'Two Seater', 14625, 'student-10')] },

  // ---------- Healthcare Furniture ----------
  { id: 'revive', category: 'healthcare', type: 'ICU Bed', name: 'NF-Revive ICU Bed', source: 'COLL p.49',
    desc: 'Motorized ICU bed, moulded polymer head & foot panel · 2140 × 1020 mm',
    variants: [v('NF-REVIVE PRO', 'Pro · 4 Motors', 182205, 'revive-pro'), v('NF-REVIVE VITAL', 'Vital · 4 Motors', 162585, 'revive-vital'), v('NF-REVIVE STANDARD', 'Standard · 3 Motors', 136620, 'revive-standard')] },
  { id: 'cure', category: 'healthcare', type: 'Fowler Electric Bed', name: 'NF-Cure Fowler Bed', source: 'COLL p.49',
    desc: 'Fowler electric bed, moulded polymer panels · 2100 × 1020 × 600 mm',
    variants: [v('NF-CURE VITAL', 'Vital', 97605, 'cure-vital'), v('NF-CURE ACTIVE', 'Active', 82890, 'cure-active'), v('NF-CURE FOWLER', 'Fowler', 91035, 'cure-fowler')] },
  { id: 'gk-1000', category: 'healthcare', type: 'ICU Bed', name: 'NF-GK 1000', source: 'COLL p.49',
    desc: 'ICU bed, adjustable backrest & upper leg · 2170 × 1050 mm',
    variants: [v('NF-GK 1000', 'ICU Bed', 71550, 'gk-1000')] },
  { id: 'gk-1003', category: 'healthcare', type: 'Fowler Bed', name: 'NF-GK 1003', source: 'COLL p.49',
    desc: 'Crank mechanism fowler bed · 2010 × 900 × 600 mm',
    variants: [v('NF-GK 1003', 'Fowler Bed', 40680, 'gk-1003')] },

  // ---------- Public Seating ----------
  { id: 'magnum', category: 'public', type: 'Waiting Seating', name: 'NF-Magnum Seating', source: 'COLL p.23',
    desc: 'Perforated powder coated seat & back, without cushion',
    variants: [v('NF-MAGNUM 1', '1 Seater', 13230, 'magnum-1'), v('NF-MAGNUM 3', '3 Seater', 18585, 'magnum-3'), v('NF-MAGNUM 4', '4 Seater', 20925, 'magnum-4')] },
  { id: 'magnum-ss', category: 'public', type: 'Waiting Seating · SS 202', name: 'NF-Magnum SS Seating', source: 'COLL p.23',
    desc: 'SS arms & legs, perforated seat & back, powder coated beam',
    variants: [v('NF-MAGNUM 5', '1 Seater', 12690, 'magnum-5'), v('NF-MAGNUM 6', '2 Seater', 15705, 'magnum-6'), v('NF-MAGNUM 7', '3 Seater', 20205, 'magnum-7')] },
  { id: 'cubis-3', category: 'public', type: 'Waiting Seating', name: 'NF-Cubis 3', source: 'COLL p.23',
    desc: '3 seater, perforated seat back, leatherette tapestry · 1750 × 630 × 810',
    variants: [v('NF-CUBIS 3', '3 Seater', 34425, 'cubis-3')] },
  { id: 'bennett-2', category: 'public', type: 'Waiting Seating', name: 'NF-Bennett 2', source: 'COLL p.23',
    desc: '2 seater, PP seat back, MS powder coated stand · 1150 × 460 × 840',
    variants: [v('NF-BENNETT 2', '2 Seater', 11205, 'bennett-2')] },

  // ---------- Cafeteria Furniture ----------
  { id: 'gc-948', category: 'cafeteria', type: 'Café Table', name: 'NF-GC 948', source: 'COLL p.31',
    desc: 'Chrome plated pipe stand, 25mm PLPB edge banded top',
    variants: [v('NF-GC 948', '1200 × 600', 9945, 'gc-948-small'), v('NF-GC 948', '1800 × 900', 13815, 'gc-948-large')] },
  { id: 'gc-928', category: 'cafeteria', type: 'Café Chair', name: 'NF-GC 928', source: 'COLL p.31',
    desc: 'Pipe frame, PP seat shell, chrome plated',
    variants: [v('NF-GC 928', 'Chrome Plated', 3060, 'gc-928')] },
  { id: 'gc-949', category: 'cafeteria', type: 'Lobby Chair', name: 'NF-GC 949', source: 'COLL p.31',
    desc: 'Chrome plated pipe frame, leatherette tapestry',
    variants: [v('NF-GC 949', 'Chrome Plated', 6885, 'gc-949')] },
  { id: 'gc-938', category: 'cafeteria', type: 'Bar Stool', name: 'NF-GC 938', source: 'COLL p.31',
    desc: 'Revolving bar stool, cushion seat, red leatherette tapestry',
    variants: [v('NF-GC 938', 'Revolving', 8370, 'gc-938')] },

  // ---------- Storage & Utility ----------
  { id: 'gms-vertical', category: 'storage', type: 'Vertical Filing Cabinet', name: 'NF-GMS Vertical Filing', source: 'COLL p.43',
    desc: 'Steel filing cabinet, 0.8mm thickness · W470 × D620',
    variants: [v('NF-GMS 1', '4 Drawers', 24435, 'gms-1'), v('NF-GMS 2', '3 Drawers', 19305, 'gms-2'), v('NF-GMS 3', '2 Drawers', 14175, 'gms-3')] },
  { id: 'gms-lateral', category: 'storage', type: 'Lateral Filing Cabinet', name: 'NF-GMS Lateral Filing', source: 'COLL p.43',
    desc: 'Steel lateral cabinet, 0.8mm thickness · W900 × D450',
    variants: [v('NF-GMS 7', '4 Drawers', 27675, 'gms-7'), v('NF-GMS 8', '3 Drawers', 24030, 'gms-8'), v('NF-GMS 9', '2 Drawers', 17730, 'gms-9')] },
  { id: 'gms-10', category: 'storage', type: 'Steel Almirah', name: 'NF-GMS 10', source: 'COLL p.43',
    desc: '2 doors, 4 adjustable shelves, 0.8mm · W900 × D450 × H1830',
    variants: [v('NF-GMS 10', '2 Doors', 31140, 'gms-10')] },
  { id: 'gms-12', category: 'storage', type: 'Steel Almirah', name: 'NF-GMS 12', source: 'COLL p.43',
    desc: '2 glass doors, 2 steel doors, 0.8mm · W900 × D450 × H1830',
    variants: [v('NF-GMS 12', 'Glass + Steel', 30465, 'gms-12')] },
];

PRODUCTS.forEach((product) => {
  const image = NAMED_PRODUCT_IMAGES[`../../Assets/New folder/${product.name}.png`];
  if (image) {
    product.variants.forEach((variant) => {
      variant.image = image;
    });
  }
});

// Sofa and Bestseller Showcase catalog items
import imgRegalL from '../assets/sofas/pdf/regal-l.jpg';
import imgZap2 from '../assets/sofas/pdf/zap-2.jpg';
import imgErgo4 from '../assets/sofas/pdf/ergo-4.jpg';
import imgAura3 from '../assets/sofas/pdf/aura-3.jpg';
import imgDiplomat3 from '../../Assets/new Bestselling img/furniture 2nd card img.png';
import imgDiplomat2 from '../assets/products-range/diplomat-2.jpg';
import imgDiplomat1 from '../assets/products-range/diplomat-1.jpg';
import imgStephen3 from '../assets/sofas/pdf/stephen-3.jpg';
import imgRegal2 from '../../Assets/new Bestselling img/2 seater sofa.png';
import imgRosemount2 from '../assets/sofas/pdf/rosemount-2.jpg';
import imgEquino3 from '../../Assets/new Bestselling img/furniture 3rd card img.png';
import imgColumbia2 from '../assets/sofas/pdf/columbia-2.jpg';

import imgDitto from '../assets/bestseller/ditto-grey.jpg';
import imgRevival from '../assets/bestseller/table-revival.jpg';
import imgFeather from '../assets/bestseller/feather-hb.jpg';
import imgModularMeeting from '../../Assets/new Bestselling img/Modular meeting table.png';
import imgColton from '../../Assets/new Bestselling img/office table.png';
import imgTitan from '../assets/bestseller/titan.jpg';
import imgCharm from '../assets/bestseller/table-charm.jpg';

export const EXTRA_CATALOG_PRODUCTS = [
  {
    id: 'regal-l',
    category: 'sofa',
    type: 'SOFA · ASMARA LEATHERETTE',
    name: 'NF-Regal L-Shape Sofa',
    desc: 'L-shape modular luxury sofa, solid wood frame, Asmara leatherette upholstery',
    size: '3600 × 3000 × 1000 mm',
    finish: 'Asmara Leatherette',
    rating: 5,
    reviews: 28,
    variants: [
      { model: 'NF-REGAL L', label: 'L-Shape', price: 167175, image: imgRegalL },
      { model: 'NF-REGAL 2', label: '2 Seater', price: 58950, image: imgRegal2 },
    ],
  },
  {
    id: 'zap-2',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Zap 2 Seater Sofa',
    desc: 'Wooden frame, SS pipe leg frame, high-density comfort foam',
    size: '1280 × 755 × 740 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 47,
    variants: [
      { model: 'NF-ZAP 2', label: '2 Seater', price: 39960, image: imgZap2 },
    ],
  },
  {
    id: 'ergo-4',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Ergo 4 Single Seater',
    desc: 'Ergonomic lounge sofa chair, premium leatherette, kiln-dried wooden base',
    size: '650 × 825 × 860 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 36,
    variants: [
      { model: 'NF-ERGO 4', label: 'Single Seater', price: 38610, image: imgErgo4 },
    ],
  },
  {
    id: 'aura-3',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Aura 3 Seater Sofa',
    desc: 'Contoured armrest luxury sofa with deep seating and wooden structure',
    size: '2120 × 935 × 850 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 52,
    variants: [
      { model: 'NF-AURA 3', label: '3 Seater', price: 49770, image: imgAura3 },
    ],
  },
  {
    id: 'diplomat-3',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Diplomat 3 Seater Sofa',
    desc: 'Wooden frame, wooden leg, tufted back, deep button Chesterfield styling',
    size: '2155 × 840 × 760 mm',
    finish: 'Leatherette',
    rating: 4.8,
    reviews: 120,
    variants: [
      { model: 'NF-DIPLOMAT 3', label: '3 Seater', price: 50400, image: imgDiplomat3 },
      { model: 'NF-DIPLOMAT 2', label: '2 Seater', price: 39645, image: imgDiplomat2 },
      { model: 'NF-DIPLOMAT 1', label: '1 Seater', price: 29970, image: imgDiplomat1 },
    ],
  },
  {
    id: 'stephen-3',
    category: 'sofa',
    type: 'SOFA · ASMARA LEATHERETTE',
    name: 'NF-Stephen 3 Seater Sofa',
    desc: 'Asmara leatherette luxury sofa with solid wood support and padded arms',
    size: '2120 × 900 × 850 mm',
    finish: 'Asmara Leatherette',
    rating: 4.5,
    reviews: 33,
    variants: [
      { model: 'NF-STEPHEN 3', label: '3 Seater', price: 59535, image: imgStephen3 },
    ],
  },
  {
    id: 'regal-2',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Regal 2 Seater Sofa',
    desc: 'Wooden frame, cushion arm, tufted back, SS leg structure',
    size: '1930 × 1000 × 730 mm',
    finish: 'Leatherette',
    rating: 5,
    reviews: 57,
    variants: [
      { model: 'NF-REGAL 2', label: '2 Seater', price: 58950, image: imgRegal2 },
    ],
  },
  {
    id: 'rosemount-2',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Rosemount 2 Seater Sofa',
    desc: 'Refined contemporary sofa with high resilience cushioning',
    size: '1860 × 760 × 760 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 39,
    variants: [
      { model: 'NF-ROSEMOUNT 2', label: '2 Seater', price: 37755, image: imgRosemount2 },
    ],
  },
  {
    id: 'equino-3',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Equino 3 Seater Sofa',
    desc: 'Modern linear profile sofa with wooden frame and leatherette upholstery',
    size: '1830 × 840 × 760 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 61,
    variants: [
      { model: 'NF-EQUINO 3', label: '3 Seater', price: 32310, image: imgEquino3 },
    ],
  },
  {
    id: 'columbia-2',
    category: 'sofa',
    type: 'SOFA · LEATHERETTE',
    name: 'NF-Columbia 2 Seater Sofa',
    desc: 'Compact lounge sofa with durable SS pipe legs and wooden frame',
    size: '1360 × 760 × 760 mm',
    finish: 'Leatherette',
    rating: 4.5,
    reviews: 42,
    variants: [
      { model: 'NF-COLUMBIA 2', label: '2 Seater', price: 26460, image: imgColumbia2 },
    ],
  },
  {
    id: 'ditto-grey',
    category: 'office',
    type: 'TASK CHAIR',
    name: 'Ditto NF Grey Chair',
    desc: 'Ergonomic mesh back, fixed lumbar support, 3 years warranty',
    rating: 4.5,
    reviews: 98,
    variants: [
      { model: 'NF-DITTO GREY', label: 'Grey', price: 8275, image: imgDitto },
    ],
  },
  {
    id: 'feather-hb',
    category: 'office',
    type: 'MESH HIGH-BACK CHAIR',
    name: 'Feather NF HB Chair',
    desc: 'High-back ergonomic office chair with breathable mesh and lumbar contour',
    rating: 4.5,
    reviews: 120,
    variants: [
      { model: 'NF-FEATHER HB', label: 'Standard', price: 11550, image: imgFeather },
    ],
  },
  {
    id: 'modular-meeting',
    category: 'office',
    type: 'CONFERENCE TABLE',
    name: 'Modular Meeting Table',
    desc: 'Modular conference table with wire management and heavy duty metal legs',
    rating: 4.5,
    reviews: 43,
    variants: [
      { model: 'NF-MODULAR 1', label: 'Standard', price: 95420, image: imgModularMeeting },
    ],
  },
  {
    id: 'titan',
    category: 'office',
    type: 'EXECUTIVE CHAIR',
    name: 'Titan NF Chair',
    desc: 'High comfort executive chair with cushioned armrests and tilt-lock mechanism',
    rating: 4.5,
    reviews: 86,
    variants: [
      { model: 'NF-TITAN 1', label: 'Standard', price: 17850, image: imgTitan },
    ],
  },
];

export const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// Ensure every product has a permanent unique slug
export const HOME_FURNITURE_PRODUCTS = GIFTING_NEW_PRODUCTS
  .filter((product) => product.type === 'Bed' || /Table/.test(product.type))
  .map((product) => {
    const category = product.type === 'Bed' ? 'home-beds' : 'home-tables';
    return {
      ...product,
      id: `${category}-${product.id}`,
      slug: `${category}-${product.slug}`,
      category,
      variants: product.variants.map((variant) => ({ ...variant })),
    };
  });

export const ALL_PRODUCTS = [...PRODUCTS, ...EXTRA_CATALOG_PRODUCTS, ...HOME_FURNITURE_PRODUCTS];

// Temporary display catalogue for the TV unit section; these prices are examples, not verified catalogue prices.
export const TV_PRODUCTS = TV_UNITS.map((item) => ({
  id: item.id,
  slug: item.id,
  category: 'tv-units',
  type: 'TV Unit',
  name: item.name,
  desc: 'A contemporary media unit with practical storage and a clean, room-ready finish.',
  rating: 4.8,
  reviews: 120,
  variants: [{
    model: `NF-TV-${item.id.slice(-2).toUpperCase()}`,
    label: 'Standard Finish',
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    image: item.image,
  }],
}));

export const MATTRESS_PRODUCTS = MATTRESSES.map((item) => ({
  id: item.id,
  slug: item.slug,
  category: 'mattresses',
  type: 'Mattress',
  name: item.name,
  desc: 'A comfortable, room-ready mattress with a quilted top and a clean, finished side panel.',
  variants: [{
    model: `NF-${item.id.toUpperCase()}`,
    label: 'Standard',
    price: item.price,
    originalPrice: item.originalPrice,
    discount: item.discount,
    image: item.image,
  }],
}));

const PRODUCT_IMAGE_OVERRIDES = new Map([
  ['diplomat', diplomatSofaImage],
  ['classic', classicSofaImage],
  ['gc-948', cafeTableImage],
  ['gms-vertical', verticalFilingImage],
]);

ALL_PRODUCTS.forEach((p) => {
  const image = PRODUCT_IMAGE_OVERRIDES.get(p.id);
  if (image) {
    p.variants.forEach((variant) => {
      variant.image = image;
    });
  }

  if (!p.slug) {
    p.slug = slugify(p.name);
  }
});

export const getProductBySlug = (slug) => {
  if (!slug) return null;
  const target = String(slug).toLowerCase().trim();
  const detailProducts = [...ALL_PRODUCTS, ...TV_PRODUCTS, ...OFFICE_DETAIL_PRODUCTS, ...MODULAR_WORKSTATION_DETAIL_PRODUCTS, ...EDUCATIONAL_DETAIL_PRODUCTS, ...RESTAURANT_CAFE_DETAIL_PRODUCTS, ...INSTITUTE_DETAIL_PRODUCTS, ...GIFTING_NEW_PRODUCTS, ...MATTRESS_PRODUCTS, ...HOSPITAL_DETAIL_PRODUCTS];
  // 1. Exact match on slug, slugified name, or id
  const direct = detailProducts.find(
    (p) => p.slug === target || slugify(p.name) === target || p.id === target
  );
  if (direct) return direct;

  // 2. Partial/fuzzy match
  return (
    detailProducts.find(
      (p) =>
        target.includes(p.id) ||
        p.id.includes(target) ||
        target.includes(slugify(p.name)) ||
        slugify(p.name).includes(target)
    ) || null
  );
};

export const getProductById = (id) => ALL_PRODUCTS.find((p) => p.id === id) || TV_PRODUCTS.find((p) => p.id === id) || MATTRESS_PRODUCTS.find((p) => p.id === id) || OFFICE_DETAIL_PRODUCTS.find((p) => p.id === id) || MODULAR_WORKSTATION_DETAIL_PRODUCTS.find((p) => p.id === id) || EDUCATIONAL_DETAIL_PRODUCTS.find((p) => p.id === id) || RESTAURANT_CAFE_DETAIL_PRODUCTS.find((p) => p.id === id) || INSTITUTE_DETAIL_PRODUCTS.find((p) => p.id === id) || null;

export const getProductsByCategory = (category) => category === 'tv-units'
  ? TV_PRODUCTS
  : ALL_PRODUCTS.filter((p) => p.category === category);

export const getRelatedProducts = (product, limit = 4) => {
  if (!product) return [];
  const productPool = product.category === 'tv-units' ? TV_PRODUCTS
    : product.category === 'office-furniture' ? OFFICE_DETAIL_PRODUCTS
    : product.category === 'modular-workstation' ? MODULAR_WORKSTATION_DETAIL_PRODUCTS
    : product.category === 'educational-furniture' ? EDUCATIONAL_DETAIL_PRODUCTS
    : product.category === 'restaurant-cafe-furniture' ? RESTAURANT_CAFE_DETAIL_PRODUCTS
    : product.category === 'institute-furniture' ? INSTITUTE_DETAIL_PRODUCTS
    : product.category === 'gifting' ? GIFTING_NEW_PRODUCTS
    : product.category === 'mattresses' ? MATTRESS_PRODUCTS
    : product.category === 'hospital-furniture' ? HOSPITAL_DETAIL_PRODUCTS
    : ALL_PRODUCTS;
  const siblings = productPool.filter(
    (p) => p.category === product.category && p.id !== product.id && p.slug !== product.slug
  );
  return siblings.slice(0, limit);
};

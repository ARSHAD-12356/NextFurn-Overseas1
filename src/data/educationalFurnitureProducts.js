// Educational Furniture catalogue for the /educational-furniture listing page.
//
// Only school, college, training-room and auditorium furniture belongs on this page. That folder
// also holds hostel, dining, cafe and lounge renders, which are left out here.
//
// Images: web-optimised copies of the renders used below, from `Assets/next furn educational image/`
// (originals untouched), stored as src/assets/educational-furniture/<NN>.webp where NN is the
// file's position in that folder sorted by name.
//
// Data: "Nextfurn__Collection__2026 (1).pdf", PDF pages 39–42 and 44 (Student, Auditorium and
// Kindergarten series). Names, specifications, sizes and prices are as printed. The other catalogues
// (chair price lists, Mesh Back, BURO) have no education products.
//
// match:
//   'verified' – model, look and colourway agree with the catalogue picture
//   'likely'   – same model and shape; frame or fabric colour in the render may differ
// NF-STUDENT 7 has two renders; each keeps its own card, the second named "– Alternate View".
// The catalogue gives one price per option; there is no MRP or discount.

const IMAGES = import.meta.glob('../assets/educational-furniture/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => {
  const key = Object.keys(IMAGES).find((path) => path.endsWith(`/${String(n).padStart(2, '0')}.webp`));
  return key ? IMAGES[key] : '';
};

const CATALOGUE = 'Nextfurn Collection 2026';
const C = {
  black: '#1f1f1f', grey: '#8f9296', chrome: '#c7c9cc', blue: '#1f4fa3', navy: '#27365f', red: '#c8202c', yellow: '#efc11a',
  purple: '#6d2a7c', beige: '#d9b48f', stone: '#a79e8f', cream: '#efe6cf', walnut: '#5e3a24', teak: '#a9622d', oak: '#d9a766',
  green: '#7fb52c', orange: '#ef7a1a',
};

// Space and type drive the filters; everything else is the catalogue entry.
const item = (n, model, name, page, type, space, material, subtitle, spec, options, extra = {}) => ({
  imageIndex: n,
  model,
  name,
  subtitle,
  category: type,
  space,
  primaryMaterial: material,
  price: Math.min(...options.map(([, price]) => price)),
  variants: options.map(([label, price]) => ({ label, price })),
  dimensions: extra.size || '',
  specs: [['Specification', spec], ...(extra.size ? [['Size (mm)', extra.size]] : []), ...(extra.notes || [])],
  colors: extra.colors || [],
  seating: extra.seating || '',
  source: { catalogue: CATALOGUE, page },
  match: extra.match || 'verified',
});

const STUDENT_DESK = 'Student Desk';
const WRITING = 'Writing Pad Chair';
const AUDI = 'Auditorium Chair';
const CLASSROOM = 'Classroom';
const LECTURE = 'Lecture & Training';
const AUDITORIUM = 'Auditorium';
const LIBRARY = 'Library & Reading';
const METAL_BOARD = 'Metal & Laminated Board';
const METAL_FABRIC = 'Metal & Fabric';
const PLASTIC = 'Plastic (PP)';
const COMMON_ARM = 'Common Arm';
const INDIVIDUAL_ARM = 'Individual Arm';

const CLASSROOM_ITEMS = [
  item(15, 'NF-STUDENT 1', 'NF-Student 1 Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB edge-banded top and seat, powder-coated frame',
    'Dual / Three Seater Desk, PLPB Edge Banded Top, Seat & Back, Powder Coated Pipe Frame', [['Two Seater', 15345], ['Three Seater', 19035]],
    { size: '1050 × 980 × 750 / 1500 × 980 × 750', seating: '2 Seater', colors: [C.walnut, C.grey] }),
  item(27, 'NF-STUDENT 2', 'NF-Student 2 Single Seater Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB top and seat, pipe and sheet frame',
    'Single Seater Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Pipe Frame & Sheet, Top Size 600 × 400 × 18 mm', [['Single Seater', 9585]],
    { size: '600 × 980 × 750', seating: '1 Seater', colors: [C.walnut, C.cream] }),
  item(38, 'NF-STUDENT 2', 'NF-Student 2 Two Seater Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB top and seat, pipe and sheet frame',
    'Dual Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Pipe Frame & Sheet, Top Size 1050 × 400 × 18 mm', [['Two Seater', 14580]],
    { size: '1050 × 980 × 750', seating: '2 Seater', colors: [C.walnut, C.cream] }),
  item(32, 'NF-STUDENT 4', 'NF-Student 4 Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Post-forming top and seat, sheet and pipe frame',
    'Dual Desk, Post Forming Particle Board Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 1007 × 380 × 18 mm', [['Two Seater', 14130]],
    { size: '1065 × 950 × 750', seating: '2 Seater', colors: [C.navy, C.stone] }),
  item(4, 'NF-STUDENT 5', 'NF-Student 5 Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Post-forming top and seat, powder-coated frame',
    'Dual Desk, Post Forming Particle Board Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 1007 × 454 × 18 mm', [['Two Seater', 14580]],
    { size: '1065 × 1000 × 750', seating: '2 Seater', colors: [C.oak, C.walnut] }),
  item(26, 'NF-STUDENT 7', 'NF-Student 7 Colourful Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Junior dual desk, PLPB top, sheet and pipe frame',
    'Dual Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 846 × 380 × 18 mm', [['Two Seater', 12285]],
    { size: '900 × 900 × 640', seating: '2 Seater', colors: [C.green, C.blue, C.orange] }),
  item(30, 'NF-STUDENT 7', 'NF-Student 7 Colourful Desk – Alternate View', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Junior dual desk, PLPB top, sheet and pipe frame',
    'Dual Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 846 × 380 × 18 mm', [['Two Seater', 12285]],
    { size: '900 × 900 × 640', seating: '2 Seater', colors: [C.green, C.blue, C.orange] }),
  item(23, 'NF-GST 835', 'NF-GST 835 Student Table with Chair', 40, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Single seater, PP edge-banded PLPB top',
    'Student Table With Chair, Blue Colour Powder Coated Pipe Frame, Injection Moulded PP Edge Banding PLPB Top, 18 mm Thick', [['Single Seater', 7830]],
    { size: 'Top 600 × 400 × 760', seating: '1 Seater', colors: [C.grey, C.black], match: 'likely' }),
  item(12, 'NF-GST 836', 'NF-GST 836 Two Seater Student Table', 40, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Two seater with chairs, PP edge-banded PLPB top',
    '2 Seater Student Table With Chair, Injection Moulded PP Edge Banding PLPB Top, Blue Colour Powder Coated Pipe Frame, 18 mm Thick', [['Two Seater', 13185]],
    { size: 'Top 1100 × 400 × 760', seating: '2 Seater', colors: [C.grey, C.black], match: 'likely' }),
  item(1, 'NF-GST 821', 'NF-GST 821 Student Chair', 40, 'Student Chair', CLASSROOM, PLASTIC, 'PP seat and back, powder-coated pipe frame',
    'Student Chair, PP Seat Back, Blue Colour Powder Coated Pipe Frame', [['Dark Blue Powder Coated', 4500]],
    { seating: '1 Seater', colors: [C.grey, C.black], match: 'likely' }),
  item(45, 'NF-GKF 1', 'NF-GKF 1 Kindergarten Chair', 44, 'Kindergarten Chair', CLASSROOM, PLASTIC, 'One-piece PP chair, seat height 330 mm',
    'One Piece PP Chair, Seat Height 330 mm', [['Standard', 1215]],
    { size: '470 × 420 × 600', seating: '1 Seater', colors: [C.red] }),
];

const LECTURE_ITEMS = [
  item(21, 'NF-TASK 2', 'NF-Task 2 Lecture Bench', 40, 'Lecture Bench', LECTURE, METAL_BOARD, 'Wooden seat and back with tip-up, PLPB writing top',
    'Two Seater Student Desk, CRCA Powder Coated Pipe Frame, PLPB Writing Top, Wooden Seat Back With Tip-Up Seat, Top Size 465 × 350 × 18 mm', [['First', 17505], ['Last', 17865], ['Middle', 19305]],
    { size: 'Desk 1090 (L) × 850 (H)', seating: '2 Seater', colors: [C.oak, C.black] }),
  item(58, 'NF-TASK 3', 'NF-Task 3 Lecture Bench', 40, 'Lecture Bench', LECTURE, METAL_BOARD, 'Perforated back, wooden tip-up seat, PLPB top',
    'Two Seater Student Desk, CRCA Powder Coated Pipe Frame, PLPB Writing Top Perforated Back, Wooden Seat With Tip-Up, Top Size 590 × 375 × 18 mm', [['First', 15705], ['Last', 16065], ['Middle', 17505]],
    { size: 'Desk 1090 (L) × 830 (H)', seating: '2 Seater', colors: [C.black, C.oak] }),
  item(41, 'NF-TASK 5', 'NF-Task 5 Folding Training Table', 40, 'Training Table', LECTURE, METAL_BOARD, 'Folding top, movable, 25 mm PLPB',
    'Training Table With Folding Top, Movable, Powder Coated, PLPB Edge Banded Top 25 mm Thick', [['2 Seater (L1200 × D500 × H750)', 15390], ['3 Seater (L1800 × D500 × H750)', 22365]],
    { size: 'L1200 × D500 × H750 / L1800 × D500 × H750', seating: '2 Seater', colors: [C.teak, C.chrome] }),
  item(54, 'NF-GST 801', 'NF-GST 801 Training Room Chair', 39, WRITING, LECTURE, METAL_FABRIC, 'PP folding writing pad, chrome pipe frame',
    'Student / Training Room Chair, PP Folding Writing Pad, Chrome Plated Pipe Frame, PP Back, Seat Fabric Tapestry', [['Chrome Plated', 6075]],
    { seating: '1 Seater', colors: [C.red, C.black, C.chrome] }),
  item(50, 'NF-GST 832', 'NF-GST 832 Training Room Chair – Rack Tray', 40, WRITING, LECTURE, METAL_FABRIC, 'Full PLPB writing pad, PU arm, rack under seat',
    'Student / Training Room Chair, PU Arm, Injection Moulded PP Edge Banding Full PLPB Writing Pad, Powder Coated Pipe Frame, Book Tray Under Seat, Seat Back Fabric Tapestry, Writing Pad 600 × 400 × 18 mm', [['Standard', 6525]],
    { seating: '1 Seater', colors: [C.blue, C.black], match: 'likely' }),
  item(6, 'NF-GST 808', 'NF-GST 808 Training Room Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'PLPB writing pad, chrome pipe frame',
    'Student / Training Room Chair, PLPB Writing Pad, Chrome Plated Pipe Frame, Seat Back Fabric Tapestry', [['Chrome Plated', 6210]],
    { seating: '1 Seater', colors: [C.black, C.chrome] }),
  item(62, 'NF-GST 823', 'NF-GST 823 Student Chair', 40, WRITING, LECTURE, PLASTIC, 'PLPB folding writing pad, PP seat and back shell',
    'Student Chair, PLPB Folding Writing Pad, PP Seat Back Shell, Pipe Frame', [['Chrome Plated', 5445]],
    { seating: '1 Seater', colors: [C.yellow, C.chrome] }),
  item(64, 'NF-GST 825', 'NF-GST 825 Student Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'Metal frame with PP desklet',
    'Student Chair, Metal Frame, PP Desklet', [['Powder Coated', 6840], ['Chrome Plated', 7245]],
    { seating: '1 Seater', colors: [C.blue, C.black, C.chrome] }),
  item(22, 'NF-GST 832', 'NF-GST 832 Training Room Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'Full PLPB writing pad, PU arm, book tray',
    'Student / Training Room Chair, PU Arm, Injection Moulded PP Edge Banding Full PLPB Writing Pad, Powder Coated Pipe Frame, Book Tray Under Seat, Seat Back Fabric Tapestry, Writing Pad 600 × 400 × 18 mm', [['Standard', 6525]],
    { seating: '1 Seater', colors: [C.blue, C.black] }),
];

const AUDITORIUM_OPTIONS = (common, individual) => [[COMMON_ARM, common], [INDIVIDUAL_ARM, individual]];
const AUDITORIUM_ITEMS = [
  item(55, 'NF-AUDI 1', 'NF-Audi 1 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU foam, PU arm',
    'Auditorium Chair, Push Back, PU Foam, PU Arm, Fabric Tapestry', AUDITORIUM_OPTIONS(12645, 15210),
    { size: '550 (L) × 660 (D) × 965 (H)', seating: '1 Seater', colors: [C.beige, C.walnut] }),
  item(63, 'NF-AUDI 2', 'NF-Audi 2 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU arm with cup holder',
    'Auditorium Chair, Push Back, PU Foam, PU Arm With Cup Holder, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(13275, 15840),
    { size: '550 (L) × 711 (D) × 1025 (H)', seating: '1 Seater', colors: [C.red, C.black] }),
  item(31, 'NF-AUDI 10', 'NF-Audi 10 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Fixed back, tip-up seat, PU arm',
    'Auditorium Chair, Fix Back With Tip-Up Seat, PU Foam Seat, PU Arm, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12420, 15030),
    { size: '560 (L) × 710 (D) × 1010 (H)', seating: '1 Seater', colors: [C.purple, C.black] }),
  item(28, 'NF-AUDI 11', 'NF-Audi 11 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PP arm with cup holder',
    'Auditorium Chair, Push Back, PU Foam, PP Arm With Cup Holder, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12060, 14580),
    { size: '560 (L) × 710 (D) × 1010 (H)', seating: '1 Seater', colors: [C.stone, C.black] }),
  item(18, 'NF-AUDI 12', 'NF-Audi 12 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Fixed back, tip-up seat, PU arm',
    'Auditorium Chair, Fix Back With Tip-Up Seat, PU Foam, PU Arm, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12645, 15210),
    { size: '550 (L) × 710 (D) × 1010 (H)', seating: '1 Seater', colors: [C.red, C.black], match: 'likely' }),
  item(29, 'NF-AUDI 13', 'NF-Audi 13 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU arm, powder-coated pipe frame',
    'Auditorium Chair, Push Back, PU Arm, Powder Coated Pipe Frame, Fabric Tapestry', AUDITORIUM_OPTIONS(8370, 9180),
    { size: '560 (L) × 560 (D) × 880 (H)', seating: '1 Seater', colors: [C.blue, C.black] }),
  item(57, 'NF-AUDI 15', 'NF-Audi 15 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Fixed back, tip-up seat, wooden arm, writing pad',
    'Auditorium Chair, Fix Back With Tip-Up Seat, PU Foam, Wooden Arm, Writing Pad, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(13905, 16425),
    { size: '560 (L) × 710 (D) × 1010 (H)', seating: '1 Seater', colors: [C.red, C.black], match: 'likely' }),
  item(5, 'NF-AUDI 16', 'NF-Audi 16 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, wooden arm with writing pad',
    'Auditorium Chair, Push Back, PU Moulded Foam, Wooden Arm With Writing Pad, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(16290, 19035),
    { size: '580 (L) × 775 (D) × 1030 (H)', seating: '1 Seater', colors: [C.red, C.walnut] }),
  item(59, 'NF-AUDI 19', 'NF-Audi 19 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU foam, PU arm',
    'Auditorium Chair, Push Back, PU Foam, PU Arm, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12645, 15210),
    { size: '550 (L) × 770 (D) × 1060 (H)', seating: '1 Seater', colors: [C.red, C.black], match: 'likely' }),
];

const LIBRARY_ITEMS = [
  item(37, 'NF-NPS 1', 'NF-NPS 1 Newspaper Stand', 41, 'Reading Stand', LIBRARY, METAL_BOARD, '18 mm PLPB reading board, MS powder-coated frame',
    'Newspaper Stand, MS Powder Coated Frame, 18 mm Thick PLPB Reading Board', [['MS Powder Coated Frame', 10170]],
    { size: 'Reading board 900 × 600', colors: [C.teak, C.chrome] }),
];

const slugFor = (p) => `education-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;

// Listing order: classroom first, then lecture and training rooms, auditoriums, then library.
export const EDUCATIONAL_FURNITURE_PRODUCTS = [...CLASSROOM_ITEMS, ...LECTURE_ITEMS, ...AUDITORIUM_ITEMS, ...LIBRARY_ITEMS].map((p, order) => ({
  brand: 'NextFurn',
  refModel: '',
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const EDUCATIONAL_DETAIL_PRODUCTS = EDUCATIONAL_FURNITURE_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'educational-furniture',
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

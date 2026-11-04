// Institute Furniture catalogue for the /institute-furniture listing page.
//
// Beds in the source zip are left out on purpose: this page is seating, desks and reading stands only.
//
// Images: web-optimised copies of the renders used below, from `Assets/next furn institiude.zip`
// (zip untouched), stored as src/assets/institute-furniture/<NN>.webp where NN is the file's
// position in the zip's contents sorted by name.
//
// Data: "Nextfurn__Collection__2026 (1).pdf", Student and Auditorium series, PDF pages 39–42.
// Names, specifications, sizes and prices are as printed; `source.page` is the PDF page.
//
// match:
//   'verified' – model and look agree with the catalogue picture
//   'likely'   – closest catalogue model; a similar model could also fit, or a detail differs
// The catalogue gives one price per option; there is no MRP or discount.

const IMAGES = import.meta.glob('../assets/institute-furniture/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => {
  const key = Object.keys(IMAGES).find((path) => path.endsWith(`/${String(n).padStart(2, '0')}.webp`));
  return key ? IMAGES[key] : '';
};

const CATALOGUE = 'Nextfurn Collection 2026';
const C = {
  black: '#1f1f1f', grey: '#8f9296', chrome: '#c7c9cc', blue: '#1f4fa3', navy: '#27365f', red: '#c8202c', yellow: '#efc11a',
  purple: '#6d2a7c', beige: '#d9b48f', stone: '#a79e8f', cream: '#efe6cf', walnut: '#5e3a24', teak: '#a9622d', green: '#7fb52c', orange: '#ef7a1a',
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
const AUDITORIUM = 'Seminar & Auditorium';
const LIBRARY = 'Library & Reading';
const METAL_BOARD = 'Metal & Laminated Board';
const METAL_FABRIC = 'Metal & Fabric';
const PLASTIC = 'Plastic (PP)';
const AUDITORIUM_OPTIONS = (common, individual) => [['Common Arm', common], ['Individual Arm', individual]];

const AUDITORIUM_ITEMS = [
  item(6, 'NF-AUDI 1', 'NF-Audi 1 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU foam, PU arm',
    'Auditorium Chair, Push Back, PU Foam, PU Arm, Fabric Tapestry', AUDITORIUM_OPTIONS(12645, 15210),
    { size: '550 (L) × 660 (D) × 965 (H)', seating: '1 Seater', colors: [C.beige, C.walnut] }),
  item(10, 'NF-AUDI 2', 'NF-Audi 2 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU arm with cup holder',
    'Auditorium Chair, Push Back, PU Foam, PU Arm With Cup Holder, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(13275, 15840),
    { size: '550 (L) × 711 (D) × 1025 (H)', seating: '1 Seater', colors: [C.red, C.black] }),
  item(19, 'NF-AUDI 10', 'NF-Audi 10 Auditorium Chair', 41, AUDI, AUDITORIUM, METAL_FABRIC, 'Fixed back, tip-up seat, PU arm',
    'Auditorium Chair, Fix Back With Tip-Up Seat, PU Foam Seat, PU Arm, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12420, 15030),
    { size: '560 (L) × 710 (D) × 1010 (H)', seating: '1 Seater', colors: [C.purple, C.black] }),
  item(11, 'NF-AUDI 13', 'NF-Audi 13 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU arm, powder-coated pipe frame',
    'Auditorium Chair, Push Back, PU Arm, Powder Coated Pipe Frame, Fabric Tapestry', AUDITORIUM_OPTIONS(8370, 9180),
    { size: '560 (L) × 560 (D) × 880 (H)', seating: '1 Seater', colors: [C.blue, C.black] }),
  item(18, 'NF-AUDI 16', 'NF-Audi 16 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, wooden arm with writing pad',
    'Auditorium Chair, Push Back, PU Moulded Foam, Wooden Arm With Writing Pad, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(16290, 19035),
    { size: '580 (L) × 775 (D) × 1030 (H)', seating: '1 Seater', colors: [C.red, C.walnut] }),
  item(20, 'NF-AUDI 19', 'NF-Audi 19 Auditorium Chair', 42, AUDI, AUDITORIUM, METAL_FABRIC, 'Push back, PU foam, PU arm',
    'Auditorium Chair, Push Back, PU Foam, PU Arm, Fire Retardant Fabric Tapestry', AUDITORIUM_OPTIONS(12645, 15210),
    { size: '550 (L) × 770 (D) × 1060 (H)', seating: '1 Seater', colors: [C.red, C.black], match: 'likely' }),
];

const LECTURE_ITEMS = [
  item(16, 'NF-GST 801', 'NF-GST 801 Training Room Chair', 39, WRITING, LECTURE, METAL_FABRIC, 'PP folding writing pad, chrome pipe frame',
    'Student / Training Room Chair, PP Folding Writing Pad, Chrome Plated Pipe Frame, PP Back, Seat Fabric Tapestry', [['Chrome Plated', 6075]],
    { seating: '1 Seater', colors: [C.red, C.black, C.chrome] }),
  item(17, 'NF-GST 807', 'NF-GST 807 Training Room Chair', 39, WRITING, LECTURE, METAL_FABRIC, 'PLPB writing pad, book tray under seat',
    'Student / Training Room Chair, PLPB Writing Pad, Powder Coated Pipe Frame, Book Tray Under Seat, Seat Back Fabric Tapestry', [['Powder Coated', 5040]],
    { seating: '1 Seater', colors: [C.blue, C.black] }),
  item(13, 'NF-GST 808', 'NF-GST 808 Training Room Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'PLPB writing pad, chrome pipe frame',
    'Student / Training Room Chair, PLPB Writing Pad, Chrome Plated Pipe Frame, Seat Back Fabric Tapestry', [['Chrome Plated', 6210]],
    { seating: '1 Seater', colors: [C.black, C.chrome] }),
  item(8, 'NF-GST 823', 'NF-GST 823 Student Chair', 40, WRITING, LECTURE, PLASTIC, 'PLPB folding writing pad, PP seat and back shell',
    'Student Chair, PLPB Folding Writing Pad, PP Seat Back Shell, Pipe Frame', [['Chrome Plated', 5445]],
    { seating: '1 Seater', colors: [C.yellow, C.chrome] }),
  item(15, 'NF-GST 825', 'NF-GST 825 Student Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'Metal frame with PP desklet',
    'Student Chair, Metal Frame, PP Desklet', [['Powder Coated', 6840], ['Chrome Plated', 7245]],
    { seating: '1 Seater', colors: [C.blue, C.black, C.chrome] }),
  item(3, 'NF-GST 832', 'NF-GST 832 Training Room Chair', 40, WRITING, LECTURE, METAL_FABRIC, 'Full PLPB writing pad, PU arm, book tray',
    'Student / Training Room Chair, PU Arm, Injection Moulded PP Edge Banding Full PLPB Writing Pad, Powder Coated Pipe Frame, Book Tray Under Seat, Seat Back Fabric Tapestry, Writing Pad 600 × 400 × 18 mm', [['Standard', 6525]],
    { seating: '1 Seater', colors: [C.blue, C.black] }),
  item(22, 'NF-GST 832', 'NF-GST 832 Training Room Chair – Rack Tray', 40, WRITING, LECTURE, METAL_FABRIC, 'Full PLPB writing pad, PU arm, rack under seat',
    'Student / Training Room Chair, PU Arm, Injection Moulded PP Edge Banding Full PLPB Writing Pad, Powder Coated Pipe Frame, Book Tray Under Seat, Seat Back Fabric Tapestry, Writing Pad 600 × 400 × 18 mm', [['Standard', 6525]],
    { seating: '1 Seater', colors: [C.blue, C.black], match: 'likely' }),
  item(1, 'NF-NPS 1', 'NF-NPS 1 Newspaper Stand', 41, 'Reading Stand', LIBRARY, METAL_BOARD, '18 mm PLPB reading board, MS powder-coated frame',
    'Newspaper Stand, MS Powder Coated Frame, 18 mm Thick PLPB Reading Board', [['MS Powder Coated Frame', 10170]],
    { size: 'Reading board 900 × 600', colors: [C.teak, C.chrome] }),
];

const CLASSROOM_ITEMS = [
  item(14, 'NF-STUDENT 1', 'NF-Student 1 Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB edge-banded top and seat, powder-coated frame',
    'Dual / Three Seater Desk, PLPB Edge Banded Top, Seat & Back, Powder Coated Pipe Frame', [['Two Seater', 15345], ['Three Seater', 19035]],
    { size: '1050 × 980 × 750 / 1500 × 980 × 750', seating: '2 Seater', colors: [C.walnut, C.grey] }),
  item(5, 'NF-STUDENT 2', 'NF-Student 2 Single Seater Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB top and seat, pipe and sheet frame',
    'Single Seater Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Pipe Frame & Sheet, Top Size 600 × 400 × 18 mm', [['Single Seater', 9585]],
    { size: '600 × 980 × 750', seating: '1 Seater', colors: [C.walnut, C.cream], match: 'likely' }),
  item(4, 'NF-STUDENT 2', 'NF-Student 2 Two Seater Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'PLPB top and seat, pipe and sheet frame',
    'Dual Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Pipe Frame & Sheet, Top Size 1050 × 400 × 18 mm', [['Two Seater', 14580]],
    { size: '1050 × 980 × 750', seating: '2 Seater', colors: [C.walnut, C.cream], match: 'likely' }),
  item(23, 'NF-STUDENT 4', 'NF-Student 4 Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Post-forming top and seat, sheet and pipe frame',
    'Dual Desk, Post Forming Particle Board Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 1007 × 380 × 18 mm', [['Two Seater', 14130]],
    { size: '1065 × 950 × 750', seating: '2 Seater', colors: [C.navy, C.stone] }),
  item(21, 'NF-STUDENT 7', 'NF-Student 7 Colourful Desk', 41, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Junior dual desk, PLPB top, sheet and pipe frame',
    'Dual Desk, PLPB Edge Banded Top & Seat Back, Powder Coated Sheet & Pipe Frame, Top Size 846 × 380 × 18 mm', [['Two Seater', 12285]],
    { size: '900 × 900 × 640', seating: '2 Seater', colors: [C.green, C.blue, C.orange] }),
  item(24, 'NF-GST 835', 'NF-GST 835 Student Table with Chair', 40, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Single seater, PP edge-banded PLPB top',
    'Student Table With Chair, Blue Colour Powder Coated Pipe Frame, Injection Moulded PP Edge Banding PLPB Top, 18 mm Thick', [['Single Seater', 7830]],
    { size: 'Top 600 × 400 × 760', seating: '1 Seater', colors: [C.grey, C.black], match: 'likely' }),
  item(7, 'NF-GST 836', 'NF-GST 836 Two Seater Student Table', 40, STUDENT_DESK, CLASSROOM, METAL_BOARD, 'Two seater with chairs, PP edge-banded PLPB top',
    '2 Seater Student Table With Chair, Injection Moulded PP Edge Banding PLPB Top, Blue Colour Powder Coated Pipe Frame, 18 mm Thick', [['Two Seater', 13185]],
    { size: 'Top 1100 × 400 × 760', seating: '2 Seater', colors: [C.grey, C.black], match: 'likely' }),
];

const slugFor = (p) => `institute-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;

// Listing order: seminar halls first, then lecture and training rooms, classrooms.
export const INSTITUTE_FURNITURE_PRODUCTS = [...AUDITORIUM_ITEMS, ...LECTURE_ITEMS, ...CLASSROOM_ITEMS].map((p, order) => ({
  brand: 'NextFurn',
  refModel: '',
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const INSTITUTE_DETAIL_PRODUCTS = INSTITUTE_FURNITURE_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'institute-furniture',
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
    image: p.image,
  })),
}));

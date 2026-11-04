// Restaurant & Cafe Furniture catalogue for the /restaurant-cafe-furniture listing page.
//
// Images: web-optimised copies of all 54 renders in `Assets/nextfurn resturant cafe.zip`
// (zip untouched), stored as src/assets/restaurant-cafe/<NN>.webp where NN is the file's
// position in the zip's contents sorted by name.
//
// Data: "Nextfurn__Collection__2026 (1).pdf", Cafe series, PDF pages 33–39 (printed pages 30–37).
// Names, specifications, sizes and prices are as printed; `source.page` is the PDF page.
//
// match:
//   'verified' – model and look agree with the catalogue picture
//   'likely'   – closest catalogue model; a similar model could also fit, or a colour differs
// The catalogue gives one price per option; there is no MRP or discount.

const IMAGES = import.meta.glob('../assets/restaurant-cafe/*.webp', { eager: true, import: 'default' });
const imageByIndex = (n) => {
  const key = Object.keys(IMAGES).find((path) => path.endsWith(`/${String(n).padStart(2, '0')}.webp`));
  return key ? IMAGES[key] : '';
};

const CATALOGUE = 'Nextfurn Collection 2026';
const C = {
  black: '#1f1f1f', brown: '#4a2f24', tan: '#b4693a', maroon: '#7a2230', red: '#d3202a', orange: '#ef5a1a', yellow: '#efc11a',
  blue: '#1f8fd6', royal: '#1f4fa3', green: '#2f9e44', grey: '#8f9296', white: '#f1f1ef', beige: '#b8a896', oak: '#d9a766',
  teak: '#a9622d', walnut: '#5e3a24', marble: '#e7e4df', gold: '#c7a14a', chrome: '#c7c9cc', glass: '#d7e6e8',
};

// Type, material and finish drive the filters; everything else is the catalogue entry.
const item = (n, model, name, page, type, material, finish, subtitle, spec, options, extra = {}) => ({
  imageIndex: n,
  model,
  name,
  subtitle,
  category: type,
  primaryMaterial: material,
  finish,
  seating: extra.seating || (extra.size ? '' : '1 Seater'),
  price: Math.min(...options.map(([, price]) => price)),
  variants: options.map(([label, price]) => ({ label, price })),
  dimensions: extra.size || '',
  specs: [['Specification', spec], ...(extra.size ? [['Size (mm)', extra.size]] : [])],
  colors: extra.colors || [],
  source: { catalogue: CATALOGUE, page },
  match: extra.match || 'verified',
});

const CAFE_TABLE = 'Cafe Table';
const CAFE_SET = 'Cafeteria Table Set';
const CAFE_CHAIR = 'Cafe Chair';
const LOBBY = 'Lobby Chair';
const BAR = 'Bar Stool';
const STOOL = 'Cafe Stool';
const PP = 'Plastic (PP)';
const LEATHERETTE = 'Leatherette';
const FABRIC = 'Fabric';
const VELVET = 'Velvet';
const WOOD = 'Wood';
const TILE = 'Tile Top';
const BOARD = 'Laminated Board';
const GLASS = 'Glass Top';
const STEEL = 'Steel Top';
const CHROME = 'Chrome Plated';
const STAINLESS = 'Stainless Steel';
const COATED = 'Powder Coated';
const GOLD = 'Gold Plated';
const WOOD_LEG = 'Wooden Leg';
const PP_LEG = 'PP Leg';
const SEATER_4 = '4 Seater';
const SEATER_6 = '6 Seater';
const CHROME_OR_COATED = (chrome, coated) => [[COATED, coated], [CHROME, chrome]];

const TABLES = [
  item(7, 'NF-DECORI', 'NF-Decori 6 Seater Cafe Table', 33, CAFE_TABLE, TILE, GOLD, 'Gloss tile top, gold-plated base plates',
    'Cafe Table, 6 Seater, SS 304 Gold Plated Base Plate & Powder Coated Pole Pipe, Tile Top with Gloss Finish, Top Thickness 50 mm', [['W1800 × D750 × H750', 77275]],
    { size: 'W1800 × D750 × H750', seating: SEATER_6, colors: [C.marble, C.gold] }),
  item(53, 'NF-DECORI', 'NF-Decori 4 Seater Cafe Table', 33, CAFE_TABLE, TILE, GOLD, 'Gloss tile top, gold-plated base plate',
    'Cafe Table, 4 Seater, SS 304 Gold Plated Base Plate & Powder Coated Pole Pipe, Tile Top with Gloss Finish, Top Thickness 50 mm', [['W750 × D750 × H750', 42660]],
    { size: 'W750 × D750 × H750', seating: SEATER_4, colors: [C.marble, C.gold] }),
  item(10, 'NF-RHYTHM', 'NF-Rhythm Cafe Table', 33, CAFE_TABLE, TILE, GOLD, 'Teak top with tile, gold-plated base plate',
    'Cafe Table, 4 Seater, SS 304 Gold Plated Base Plate & Powder Coated Pole Pipe, Teak Wood Top with Tile, Top Thickness 50 mm', [['W750 × D750 × H750', 34290]],
    { size: 'W750 × D750 × H750', seating: SEATER_4, colors: [C.teak, C.gold] }),
  item(23, 'NF-GC 9086', 'NF-GC 9086 Cafe Table – Gold Frame', 39, CAFE_TABLE, TILE, GOLD, 'Tile top, SS 304 gold-plated frame and leg',
    'Cafe Table, 4 Seater, SS 304 Gold Plated Frame and Leg, Tile Top with Gloss Finish, Top Thickness 50 mm', [['SS Gold Plated Frame', 104265]],
    { size: '900 × 900 × 750', seating: SEATER_4, colors: [C.marble, C.gold] }),
  item(49, 'NF-GC 9086', 'NF-GC 9086 Cafe Table – Matt Frame', 39, CAFE_TABLE, TILE, STAINLESS, 'Tile top, SS 304 matt-finish frame and leg',
    'Cafe Table, 4 Seater, SS 304 Matt Finish Frame and Leg, Tile Top with Gloss Finish, Top Thickness 50 mm', [['SS Matt Finish Frame', 57960]],
    { size: '900 × 900 × 750', seating: SEATER_4, colors: [C.marble, C.walnut] }),
  item(27, 'NF-GC 948', 'NF-GC 948 Cafe Table', 34, CAFE_TABLE, BOARD, CHROME, '25 mm PLPB top, chrome-plated pipe stand',
    'Cafe Table, Chrome Plated Pipe Stand, 25 mm PLPB Edge Banded Top', [['1200 × 600', 9945], ['1800 × 900', 13815]],
    { size: '1200 × 600 / 1800 × 900', colors: [C.oak, C.chrome] }),
  item(51, 'NF-GC 985', 'NF-GC 985 Round Cafe Table', 35, CAFE_TABLE, BOARD, STAINLESS, '25 mm PLPB top, SS frame and base plate',
    'Cafe Table, 25 mm Thick PLPB Edge Banded Top, SS Pipe Frame & Base Plate', [['SS Matt Finish', 16740]],
    { size: 'Dia. 900', colors: [C.oak, C.chrome], match: 'likely' }),
  item(19, 'NF-GC 904', 'NF-GC 904 Glass Cafe Table', 33, CAFE_TABLE, GLASS, STAINLESS, '12 mm glass top, SS pipe stand',
    'Cafe Table, Dia. 900 mm, 12 mm Thick Glass Top, SS Pipe Stand', [['Stainless Steel', 10755]],
    { size: 'Dia. 900', colors: [C.glass, C.chrome] }),
  item(21, 'NF-GC 9084', 'NF-GC 9084 Four Seater Cafeteria Set', 39, CAFE_SET, STEEL, COATED, 'Coloured PP shell seats, SS top, pipe frame',
    'Cafe Four Seater Table, PP Shell, Pipe Frame, SS Top, 25 mm Thick', [['SS Top', 27810]],
    { size: '1200 × 600', seating: SEATER_4, colors: [C.royal, C.green, C.yellow] }),
  item(36, 'NF-GC 9083', 'NF-GC 9083 Four Seater Cafeteria Set', 38, CAFE_SET, STEEL, COATED, 'Red PP shell seats, SS top, pipe frame',
    'Cafe Four Seater Table, PP Shell, Pipe Frame, SS Top, 25 mm Thick', [['SS Top', 29430]],
    { size: '1200 × 600', seating: SEATER_4, colors: [C.red, C.grey] }),
];

const CAFE_CHAIRS = [
  item(15, 'NF-SYDNEY', 'NF-Sydney Wooden Cafe Chair', 33, CAFE_CHAIR, WOOD, WOOD_LEG, 'Teakwood, natural polish, fabric seat',
    'Wooden Chair, Teakwood, Natural Polish, Seat Fabric Tapestry', [['Wooden Back', 14670]],
    { colors: [C.oak, C.grey] }),
  item(44, 'NF-GC 9091', 'NF-GC 9091 Cafe Chair', 39, CAFE_CHAIR, PP, PP_LEG, 'PP shell, brown',
    'Cafe Chair, PP Shell', [['Brown Color', 4050]],
    { colors: [C.teak] }),
  item(20, 'NF-GC 9015', 'NF-GC 9015 Cafe Chair', 39, CAFE_CHAIR, PP, PP_LEG, 'Canned-type PP seat, without arm',
    'Cafe Chair Without Arm, PP Seat & Back', [['Canned Type PP Seat', 4500]],
    { colors: [C.brown, C.beige] }),
  item(34, 'NF-GC 9100', 'NF-GC 9100 Cafe Chair', 39, CAFE_CHAIR, PP, PP_LEG, 'Plastic seat and back',
    'Cafe Chair, Plastic Seat and Back', [['Plastic Chair', 4095]],
    { colors: [C.orange, C.grey] }),
  item(25, 'NF-GC 9101', 'NF-GC 9101 Cafe Chair', 39, CAFE_CHAIR, PP, PP_LEG, 'Plastic seat and back',
    'Cafe Chair, Plastic Seat and Back', [['Plastic Chair', 6300]],
    { colors: [C.royal, C.white] }),
  item(47, 'NF-GC 9053', 'NF-GC 9053 Cafe Chair', 37, CAFE_CHAIR, PP, PP_LEG, 'PP seat and back, PP legs',
    'Cafe Chair, PP Seat & Back', [['PP Leg', 5355]],
    { colors: [C.yellow] }),
  item(11, 'NF-GC 9025', 'NF-GC 9025 Cafe Chair', 36, CAFE_CHAIR, PP, PP_LEG, 'PP shell with seat cushion, PP legs',
    'PP Shell Chair With Seat Cushion', [['PP Leg', 6435]],
    { colors: [C.red], match: 'likely' }),
  item(16, 'NF-GC 9040', 'NF-GC 9040 Cafe Chair', 36, CAFE_CHAIR, PP, PP_LEG, 'PP seat and back, black',
    'Cafe Chair, PP Seat & Back', [['Black', 4275]],
    { colors: [C.black] }),
  item(3, 'NF-GC 9044', 'NF-GC 9044 Cafe Chair', 36, CAFE_CHAIR, PP, PP_LEG, 'PP seat and back, red',
    'Cafe Chair, PP Seat & Back', [['Red', 3600]],
    { colors: [C.red] }),
  item(50, 'NF-GC 9024', 'NF-GC 9024 PP Shell Chair', 36, CAFE_CHAIR, PP, PP_LEG, 'One-piece PP shell chair',
    'PP Shell Chair', [['Black', 2565]],
    { colors: [C.brown] }),
  item(28, 'NF-GC 9070', 'NF-GC 9070 Cafe Chair', 38, CAFE_CHAIR, PP, PP_LEG, 'PP shell, yellow',
    'Cafe Chair, PP Shell', [['Yellow Color', 3105]],
    { colors: [C.yellow] }),
  item(42, 'NF-GC 9071', 'NF-GC 9071 Cafe Chair', 38, CAFE_CHAIR, PP, COATED, 'PP lattice shell, white',
    'Cafe Chair, PP Shell', [['White Color', 6210]],
    { colors: [C.white] }),
  item(13, 'NF-GC 9072', 'NF-GC 9072 Cafe Chair', 38, CAFE_CHAIR, PP, WOOD_LEG, 'PP lattice shell, wooden-colour MS frame',
    'Cafe Chair, PP Shell, MS Frame', [['MS Frame Wooden Color', 7695]],
    { colors: [C.grey, C.teak] }),
  item(17, 'NF-GC 9039', 'NF-GC 9039 PP Chair with Wooden Legs', 36, CAFE_CHAIR, PP, WOOD_LEG, 'PP seat and back, wooden legs',
    'Bar Stool, Without Arm, PP Seat & Back', [['Wooden Leg', 4275]],
    { colors: [C.orange, C.teak] }),
  item(2, 'NF-GC 988', 'NF-GC 988 Cafe Chair', 35, CAFE_CHAIR, PP, CHROME, 'PP seat shell, chrome pipe frame',
    'Cafe Chair, Without Arm, PP Seat Shell, Chrome Plated Pipe Frame', [[CHROME, 3510]],
    { colors: [C.yellow, C.chrome] }),
  item(46, 'NF-GC 994', 'NF-GC 994 Cafe Chair', 35, CAFE_CHAIR, PP, CHROME, 'PP seat and back shell, pipe frame',
    'Cafe Chair, Without Arm, Pipe Frame, PP Seat Back Shell', [[CHROME, 4185]],
    { colors: [C.red, C.chrome] }),
  item(32, 'NF-GC 928', 'NF-GC 928 Cafe Chair', 34, CAFE_CHAIR, PP, CHROME, 'PP seat shell, pipe frame',
    'Cafe Chair, Pipe Frame, PP Seat Shell', CHROME_OR_COATED(3060, 2925),
    { colors: [C.brown, C.chrome] }),
  item(24, 'NF-GC 9061', 'NF-GC 9061 Cafe Chair', 37, CAFE_CHAIR, PP, CHROME, 'PP seat and back shell, without arm',
    'Cafe Chair, Without Arm, PP Seat Back Shell', [['MS Pipe Frame', 4635], ['SS Pipe Frame', 5625]],
    { colors: [C.blue, C.chrome] }),
  item(39, 'NF-GC 975', 'NF-GC 975 Stackable Cafe Chair', 34, CAFE_CHAIR, PP, CHROME, 'Stackable, PP seat and back shell',
    'Cafe Chair, Without Arm, Chrome Plated Pipe Frame, Stackable, PP Seat & Back Shell', CHROME_OR_COATED(3735, 3510),
    { colors: [C.brown, C.chrome] }),
  item(26, 'NF-GC 976', 'NF-GC 976 Stackable Cafe Chair', 35, CAFE_CHAIR, PP, CHROME, 'Stackable, PP back, leatherette seat',
    'Cafe Chair, Without Arm, Chrome Plated Pipe Frame, Stackable, PP Back, Seat Leatherette Tapestry', CHROME_OR_COATED(4095, 3825),
    { colors: [C.black, C.maroon, C.chrome] }),
  item(6, 'NF-GC 919', 'NF-GC 919 Cafe Chair', 33, CAFE_CHAIR, WOOD, CHROME, 'Pipe frame, wooden seat',
    'Cafe Chair, Pipe Frame, Wooden Seat', CHROME_OR_COATED(3690, 3240),
    { colors: [C.oak, C.chrome] }),
  item(37, 'NF-GC 950', 'NF-GC 950 Restaurant Chair', 34, CAFE_CHAIR, LEATHERETTE, CHROME, 'Chrome reducing pipe frame, leatherette',
    'Cafe / Restaurant Chair, Chrome Plated Reducing Pipe Frame, Leatherette Tapestry', [[CHROME, 4275]],
    { colors: [C.brown, C.chrome] }),
  item(45, 'NF-GC 955', 'NF-GC 955 Cafe Chair', 34, CAFE_CHAIR, LEATHERETTE, STAINLESS, 'SS pipe frame, leatherette, without arm',
    'Cafe Chair, Without Arm, SS Pipe Frame Chrome Finish, Leatherette Tapestry', [['Chrome Finish', 5715]],
    { colors: [C.brown, C.chrome] }),
  item(48, 'NF-GC 970', 'NF-GC 970 Cafe Chair', 34, CAFE_CHAIR, LEATHERETTE, STAINLESS, 'SS pipe frame, leatherette, without arm',
    'Cafe Chair, Without Arm, SS Pipe Frame, Leatherette Tapestry', [['Chrome Finish', 7245]],
    { colors: [C.beige, C.chrome] }),
  item(41, 'NF-GC 9004', 'NF-GC 9004 Revolving Cafe Chair', 35, CAFE_CHAIR, PP, CHROME, 'PP shell with cushion seat, gas lift, chrome base',
    'Cafe Chair, Without Arms, Chrome Base, Gas Lift, PP Shell With Cushion Seat, Leatherette Tapestry', [[CHROME, 6705]],
    { colors: [C.orange, C.chrome] }),
  item(1, 'NF-GC 951', 'NF-GC 951 Revolving Chair', 34, CAFE_CHAIR, LEATHERETTE, CHROME, 'Without arm, chrome pipe frame and base',
    'Revolving Chair, Without Arm, Chrome Plated Pipe Frame & Base, Leatherette Tapestry', [['Revolving', 6345]],
    { colors: [C.brown, C.chrome] }),
];

const LOBBY_CHAIRS = [
  item(5, 'NF-GC 9065', 'NF-GC 9065 Lobby Chair', 37, LOBBY, VELVET, GOLD, 'SS 202 gold-plated frame, velvet seat and back',
    'Lobby Chair, SS 202 Grade, Pipe Frame, Seat & Back Velvet Tapestry', [['Gold Plated Frame', 19620]],
    { colors: [C.brown, C.gold] }),
  item(33, 'NF-GC 944', 'NF-GC 944 Lobby Chair', 34, LOBBY, LEATHERETTE, CHROME, 'Chrome-plated pipe frame, leatherette',
    'Lobby Chair, Chrome Plated Pipe Frame, Leatherette Tapestry', [[CHROME, 10170]],
    { colors: [C.brown, C.chrome] }),
  item(4, 'NF-GC 949', 'NF-GC 949 Lobby Chair', 34, LOBBY, LEATHERETTE, CHROME, 'Chrome-plated pipe frame, leatherette',
    'Lobby Chair, Chrome Plated Pipe Frame, Leatherette Tapestry', [[CHROME, 6885]],
    { colors: [C.tan, C.brown, C.chrome] }),
];

const BAR_SEATING = [
  item(18, 'NF-GC 9058', 'NF-GC 9058 Bar Chair', 37, BAR, LEATHERETTE, CHROME, 'Revolving, chrome base, gas lift',
    'Bar Chair, Chrome Plated Pipe Frame & Footrest, Chrome Base, Gas Lift, Leatherette Tapestry', [['Revolving', 11115]],
    { colors: [C.black, C.chrome] }),
  item(12, 'NF-GC 9059', 'NF-GC 9059 Bar Chair', 37, BAR, LEATHERETTE, CHROME, 'Revolving, chrome base, gas lift',
    'Bar Chair, Chrome Plated Pipe Frame & Footrest, Chrome Base, Gas Lift, Leatherette Tapestry', [['Revolving', 8955]],
    { colors: [C.brown, C.chrome] }),
  item(35, 'NF-GC 989', 'NF-GC 989 Bar Stool', 35, BAR, FABRIC, CHROME, 'Revolving, footrest, gas lift',
    'Bar Stool, Without Arm, Chrome Plated Base, Pipe Frame With Foot Rest, Gas Lift, Seat & Back Fabric Tapestry', [['Revolving', 10800]],
    { colors: [C.tan, C.chrome] }),
  item(38, 'NF-GC 938', 'NF-GC 938 Bar Stool', 34, BAR, LEATHERETTE, CHROME, 'Revolving, cushion seat, red leatherette',
    'Bar Stool, Cushion Seat, Chrome Plated Pipe Frame, Red Colour Leatherette Tapestry', [['Revolving', 8370]],
    { colors: [C.red, C.chrome] }),
  item(52, 'NF-GC 9037', 'NF-GC 9037 Bar Stool', 36, BAR, PP, CHROME, 'Revolving, gas lift, chrome footrest and base',
    'Bar Stool, Without Arm, PP Seat & Back, Gas Lift, Chrome Plated Pipe Frame, Footrest & Base', [['Revolving', 6345]],
    { colors: [C.black, C.chrome] }),
  item(9, 'NF-GC 936', 'NF-GC 936 Bar Stool', 34, BAR, LEATHERETTE, CHROME, 'Chrome pipe frame, cushion seat and back',
    'Bar Stool, Chrome Plated Pipe Frame, Cushion Seat & Back, Leatherette Tapestry', [[CHROME, 5670]],
    { colors: [C.maroon, C.chrome] }),
  item(8, 'NF-GC 9078', 'NF-GC 9078 Bar Stool', 38, BAR, LEATHERETTE, COATED, 'MS frame, cushion seat and back',
    'Bar Stool, MS Frame, Cushion Seat and Back, Leatherette Tapestry', [['Cushion Seat and Back', 7965]],
    { colors: [C.brown, C.black] }),
  item(54, 'NF-GC 9006', 'NF-GC 9006 Bar Stool', 35, BAR, LEATHERETTE, WOOD_LEG, 'Powder-coated frame, cushion seat and back',
    'Bar Stool, Without Arms, Powder Coated Pipe Frame, Cushion Seat & Back, Leatherette Tapestry', [[COATED, 7245]],
    { colors: [C.black, C.teak] }),
  item(31, 'NF-GC 9076', 'NF-GC 9076 Bar Chair', 38, BAR, PP, COATED, 'PP shell, MS powder-coated frame',
    'Cafe Chair, PP Shell, MS Powder Coated Frame', [[COATED, 7245]],
    { colors: [C.black] }),
  item(40, 'NF-GC 9077', 'NF-GC 9077 Bar Stool', 38, BAR, PP, WOOD_LEG, 'Without arms, MS powder-coated frame',
    'Bar Stool Without Arms, MS Powder Coated Frame', [['MS Frame', 6525]],
    { colors: [C.black, C.teak] }),
  item(43, 'NF-GC 9082', 'NF-GC 9082 Bar Stool', 38, BAR, PP, COATED, 'Plastic seat, powder-coated pipe frame',
    'Bar Stool, Without Arms, Powder Coated Pipe Frame, Plastic Seat', [['Plastic Seat', 4770]],
    { colors: [C.red, C.chrome] }),
  item(14, 'NF-GC 9074', 'NF-GC 9074 Cafe Stool', 38, STOOL, LEATHERETTE, CHROME, 'Cushion seat, leatherette, chrome legs',
    'Cafe Stool, Cushion Seat, Leatherette Tapestry', [[CHROME, 3825]],
    { colors: [C.black, C.chrome] }),
  item(22, 'NF-GC 9075', 'NF-GC 9075 Cafe Stool', 38, STOOL, FABRIC, CHROME, 'Cushion seat, mesh tapestry, chrome frame',
    'Cafe Stool, Cushion Seat, Mesh Tapestry', [[CHROME, 2295]],
    { colors: [C.red, C.chrome] }),
];

const slugFor = (p) => `restaurant-cafe-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;

// Listing order: tables first, then cafe chairs, lobby chairs, and bar and counter seating.
export const RESTAURANT_CAFE_PRODUCTS = [...TABLES, ...CAFE_CHAIRS, ...LOBBY_CHAIRS, ...BAR_SEATING].map((p, order) => ({
  brand: 'NextFurn',
  refModel: '',
  ...p,
  id: slugFor(p),
  slug: slugFor(p),
  order,
  image: imageByIndex(p.imageIndex),
}));

// Shape expected by ProductDetailPage / wishlist / cart (same as the other catalogues in products.js).
export const RESTAURANT_CAFE_DETAIL_PRODUCTS = RESTAURANT_CAFE_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.slug,
  category: 'restaurant-cafe-furniture',
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

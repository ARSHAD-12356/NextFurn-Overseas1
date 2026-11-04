import tvUnit01 from '../../Assets/tv_unit_images_15_individual/tv_unit_01.jpg';
import tvUnit02 from '../../Assets/tv_unit_images_15_individual/tv_unit_02.jpg';
import tvUnit03 from '../../Assets/tv_unit_images_15_individual/tv_unit_03.jpg';
import tvUnit04 from '../../Assets/tv_unit_images_15_individual/tv_unit_04.jpg';
import tvUnit05 from '../../Assets/tv_unit_images_15_individual/tv_unit_05.jpg';
import tvUnit06 from '../../Assets/tv_unit_images_15_individual/tv_unit_06.jpg';
import tvUnit07 from '../../Assets/tv_unit_images_15_individual/tv_unit_07.jpg';
import tvUnit08 from '../../Assets/tv_unit_images_15_individual/tv_unit_08.jpg';
import tvUnit09 from '../../Assets/tv_unit_images_15_individual/tv_unit_09.jpg';
import tvUnit10 from '../../Assets/tv_unit_images_15_individual/tv_unit_10.jpg';
import tvUnit11 from '../../Assets/tv_unit_images_15_individual/tv_unit_11.jpg';
import tvUnit12 from '../../Assets/tv_unit_images_15_individual/tv_unit_12.jpg';
import tvUnit13 from '../../Assets/tv_unit_images_15_individual/tv_unit_13.jpg';
import tvUnit14 from '../../Assets/tv_unit_images_15_individual/tv_unit_14.jpg';
import tvUnit15 from '../../Assets/tv_unit_images_15_individual/tv_unit_15.jpg';

const TV_UNITS_BY_IMAGE = [
  { id: 'tv-unit-01', image: tvUnit01, name: 'Nova Solid Wood TV Unit in Walnut Finish', price: 24999, originalPrice: 39999, discount: 38 },
  { id: 'tv-unit-02', image: tvUnit02, name: 'Harbor Solid Wood TV Console in Smoked Oak Finish', price: 26499, originalPrice: 42999, discount: 38 },
  { id: 'tv-unit-03', image: tvUnit03, name: 'Luna Contemporary TV Cabinet in Ivory and Oak Finish', price: 19499, originalPrice: 31999, discount: 39 },
  { id: 'tv-unit-04', image: tvUnit04, name: 'Sienna Fluted TV Unit in Honey Oak Finish', price: 23999, originalPrice: 39999, discount: 40 },
  { id: 'tv-unit-05', image: tvUnit05, name: 'Orion Engineered Wood TV Unit with Open Shelves', price: 21999, originalPrice: 36999, discount: 41 },
  { id: 'tv-unit-06', image: tvUnit06, name: 'Arden Floating TV Console in Warm Walnut Finish', price: 22499, originalPrice: 37999, discount: 41 },
  { id: 'tv-unit-07', image: tvUnit07, name: 'Mira Modular TV Unit in White Oak Finish', price: 20999, originalPrice: 35999, discount: 42 },
  { id: 'tv-unit-08', image: tvUnit08, name: 'Obsidian Stone-Front TV Cabinet in Charcoal Finish', price: 31499, originalPrice: 52999, discount: 41 },
  { id: 'tv-unit-09', image: tvUnit09, name: 'Woodland Rattan TV Unit in Natural Teak Finish', price: 27499, originalPrice: 44999, discount: 39 },
  { id: 'tv-unit-10', image: tvUnit10, name: 'Solis Fluted TV Console in Soft White Finish', price: 24499, originalPrice: 40999, discount: 40 },
  { id: 'tv-unit-11', image: tvUnit11, name: 'Cedar Media Console in Walnut and Black Finish', price: 26999, originalPrice: 44999, discount: 40 },
  { id: 'tv-unit-12', image: tvUnit12, name: 'Astra Modern TV Cabinet in Frost White Finish', price: 18999, originalPrice: 32999, discount: 42 },
  { id: 'tv-unit-13', image: tvUnit13, name: 'Alder Mid-Century TV Unit in Natural Walnut Finish', price: 25999, originalPrice: 42999, discount: 40 },
  { id: 'tv-unit-14', image: tvUnit14, name: 'Zenith Wooden TV Unit in Matte Black Finish', price: 29999, originalPrice: 49999, discount: 40 },
  { id: 'tv-unit-15', image: tvUnit15, name: 'Atlas Wide TV Unit in Natural Oak Finish', price: 28499, originalPrice: 46999, discount: 39 },
];

const REFERENCE_ORDER = ['tv-unit-01', 'tv-unit-12', 'tv-unit-09', 'tv-unit-14', 'tv-unit-05'];
export const TV_UNITS = [
  ...REFERENCE_ORDER.map((id) => TV_UNITS_BY_IMAGE.find((product) => product.id === id)),
  ...TV_UNITS_BY_IMAGE.filter((product) => !REFERENCE_ORDER.includes(product.id)),
];

export const formatTVUnitPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

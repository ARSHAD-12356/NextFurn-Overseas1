// Wording for the product detail page, chosen by what kind of product it is, so a bed or a desk
// never shows sofa text. Model-specific facts (sizes, materials, prices) come from each product's
// catalogue data; the copy here stays general on purpose and must not state specifications.

const COMMON_CARE = 'Avoid direct, continuous sunlight and do not use abrasive pads or harsh chemicals.';

const CONTENT = {
  sofa: {
    benefits: [
      ['Premium Materials', 'Quality upholstery on a strong frame'],
      ['Elegant Design', 'Modern look for lounges and living spaces'],
      ['Comfort Assured', 'Comfortable seating for long hours'],
      ['Built to Last', 'Durable construction for everyday use'],
    ],
    care: ['Dust regularly with a dry microfibre cloth.', 'Wipe spills promptly using a mild soap solution and a damp cloth.', COMMON_CARE],
  },
  seating: {
    benefits: [
      ['Quality Materials', 'Sturdy frame with a durable seat and back'],
      ['Clean Design', 'Smart look for work, study and public spaces'],
      ['Comfort Assured', 'Comfortable seating for everyday use'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Dust regularly with a dry, soft cloth.', 'Wipe seat and back with a damp cloth and mild soap, then dry.', 'Check and tighten fittings from time to time.', COMMON_CARE],
  },
  table: {
    benefits: [
      ['Quality Materials', 'Durable top on a strong, stable frame'],
      ['Clean Design', 'Simple lines that suit modern spaces'],
      ['Practical Use', 'Well-proportioned surface for daily use'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Clean the top with a soft, slightly damp cloth, then dry it.', 'Wipe spills promptly and use coasters under hot items.', 'Lift the table when moving it instead of dragging it.', COMMON_CARE],
  },
  workspace: {
    benefits: [
      ['Quality Materials', 'Durable worktops on a stable frame'],
      ['Space-Smart Layout', 'Organised desks for shared work areas'],
      ['Practical Use', 'Made for productive everyday work'],
      ['Built to Last', 'Durable construction for busy offices'],
    ],
    care: ['Clean tops and screens with a soft, slightly damp cloth.', 'Wipe spills promptly, especially near edges and joints.', 'Check and tighten fittings from time to time.', COMMON_CARE],
  },
  bed: {
    benefits: [
      ['Quality Materials', 'Strong frame made for daily use'],
      ['Clean Design', 'Simple, tidy look for any room'],
      ['Practical Use', 'Stable support for everyday rest'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Clean the frame with a soft, dry cloth.', 'Keep metal parts dry and wipe away moisture promptly.', 'Check and tighten fittings from time to time.', COMMON_CARE],
  },
  mattress: {
    benefits: [
      ['Quality Materials', 'Soft quilted top for everyday sleep'],
      ['Clean Design', 'Tidy, finished look for any bedroom'],
      ['Comfort Assured', 'Comfortable support night after night'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Air the mattress regularly and keep it dry.', 'Use a mattress protector and clean spills promptly with a slightly damp cloth.', 'Rotate the mattress from time to time so it wears evenly.', COMMON_CARE],
  },
  storage: {
    benefits: [
      ['Quality Materials', 'Sturdy build for everyday storage'],
      ['Clean Design', 'Neat look that suits any workspace or room'],
      ['Practical Use', 'Keeps everyday items organised'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Clean with a soft, slightly damp cloth, then dry.', 'Spread weight evenly and do not overload shelves or drawers.', 'Keep away from standing water and damp walls.', COMMON_CARE],
  },
  medical: {
    benefits: [
      ['Quality Materials', 'Sturdy construction for clinical settings'],
      ['Functional Design', 'Practical for patient care and staff'],
      ['Practical Use', 'Made for daily use in healthcare spaces'],
      ['Built to Last', 'Durable construction for regular use'],
    ],
    care: ['Clean surfaces using products suited to the material, following your facility’s protocol.', 'Check moving parts, castors and locks regularly.', 'Keep electrical parts, if any, away from liquids.', COMMON_CARE],
  },
};

export function getProductKind(product) {
  const text = `${product?.type || ''} ${product?.category || ''}`.toLowerCase();
  if (/healthcare|hospital/.test(text)) return 'medical';
  if (/mattress/.test(text)) return 'mattress';
  if (/sofa/.test(text)) return 'sofa';
  if (/workstation/.test(text)) return 'workspace';
  if (/\bbed\b/.test(text)) return 'bed';
  if (/cabinet|almirah|locker|rack|storage|tv unit/.test(text)) return 'storage';
  if (/chair|stool|seating|bench/.test(text)) return 'seating';
  return 'table';
}

export const getProductContent = (product) => CONTENT[getProductKind(product)];

// Catalogue facts for the Specifications tab. Older catalogue entries have no `specs` list yet.
export function getSpecRows(product) {
  if (product?.specs) return product.specs;
  return [
    ['Specification', product?.desc],
    ['Finish', product?.finish],
    ['Size', product?.size],
  ].filter(([, value]) => value);
}

import { hydratants } from './hydratants';
import { serums } from './serums';
import { masques } from './masques';
import { toniques } from './toniques';
import { nettoyants } from './nettoyants';
import { traitements } from './traitements';
import { baumes } from './baumes';
import { yeux } from './yeux';
import { specifiques } from './specifiques';
import { Product } from '../../types/skincare';

// Combine all products into a single record
export const skinProducts: Record<string, Product> = {
  ...Object.fromEntries(hydratants.map(product => [product.id, product])),
  ...Object.fromEntries(serums.map(product => [product.id, product])),
  ...Object.fromEntries(masques.map(product => [product.id, product])),
  ...Object.fromEntries(toniques.map(product => [product.id, product])),
  ...Object.fromEntries(nettoyants.map(product => [product.id, product])),
  ...Object.fromEntries(traitements.map(product => [product.id, product])),
  ...Object.fromEntries(baumes.map(product => [product.id, product])),
  ...Object.fromEntries(yeux.map(product => [product.id, product])),
  ...Object.fromEntries(specifiques.map(product => [product.id, product]))
};

// Export individual categories
export { hydratants } from './hydratants';
export { serums } from './serums';
export { masques } from './masques';
export { toniques } from './toniques';
export { nettoyants } from './nettoyants';
export { traitements } from './traitements';
export { baumes } from './baumes';
export { yeux } from './yeux';
export { specifiques } from './specifiques';
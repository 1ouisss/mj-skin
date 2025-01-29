import { hydratants } from './hydratants';
import { serums } from './serums';
import { masques } from './masques';
import { toniques } from './toniques';
import { nettoyants } from './nettoyants';
import { traitements } from './traitements';
import { huiles } from './huiles';
import { Product } from '../../types/skincare';

// Combine all products into a single record
export const skinProducts: Record<string, Product> = {
  ...Object.fromEntries(hydratants.map(product => [product.id, product])),
  ...Object.fromEntries(serums.map(product => [product.id, product])),
  ...Object.fromEntries(masques.map(product => [product.id, product])),
  ...Object.fromEntries(toniques.map(product => [product.id, product])),
  ...Object.fromEntries(nettoyants.map(product => [product.id, product])),
  ...Object.fromEntries(traitements.map(product => [product.id, product])),
  ...Object.fromEntries(huiles.map(product => [product.id, product]))
};

// Export individual categories
export { hydratants } from './hydratants';
export { serums } from './serums';
export { masques } from './masques';
export { toniques } from './toniques';
export { nettoyants } from './nettoyants';
export { traitements } from './traitements';
export { huiles } from './huiles';
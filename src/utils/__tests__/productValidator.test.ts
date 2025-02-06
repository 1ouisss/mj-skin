
import { describe, it, expect } from 'vitest';
import { validateProducts, validateProductImages } from '../productValidator';
import { skinProducts } from '../../data/products';
import { masques } from '../../data/products/masques';
import { yeux } from '../../data/products/yeux';

describe('Product Validator', () => {
  it('should identify products with missing required fields', () => {
    const validationResult = validateProducts();
    
    expect(validationResult).toBeDefined();
    expect(Array.isArray(validationResult.invalidProducts)).toBe(true);
    expect(Array.isArray(validationResult.missingImages)).toBe(true);
  });

  it('should validate all product data is complete', () => {
    const { invalidProducts } = validateProducts();
    
    if (invalidProducts.length > 0) {
      console.warn('Produits invalides trouvés:', invalidProducts);
    }
    
    expect(invalidProducts.length).toBe(0);
  });

  it('should check that all products have valid image paths', async () => {
    const missingImages = await validateProductImages();
    
    if (missingImages.length > 0) {
      console.warn('Images manquantes:', missingImages);
    }
    
    expect(missingImages.length).toBe(0);
  });

  it('should verify all products have required arrays populated', () => {
    const products = Object.values(skinProducts);
    
    products.forEach(product => {
      expect(product.skinTypes.length).toBeGreaterThan(0);
      expect(product.conditions.length).toBeGreaterThan(0);
      expect(product.benefits.length).toBeGreaterThan(0);
    });
  });

  it('should validate masques images specifically', () => {
    masques.forEach(product => {
      const hasValidImage = product.image && !product.image.includes('placeholder');
      if (!hasValidImage) {
        console.warn(`Masque sans image valide : ${product.name}`);
      }
      expect(hasValidImage).toBe(true);
    });
  });

  it('should validate yeux products images specifically', () => {
    yeux.forEach(product => {
      const hasValidImage = product.image && !product.image.includes('placeholder');
      if (!hasValidImage) {
        console.warn(`Produit yeux sans image valide : ${product.name}`);
      }
      expect(hasValidImage).toBe(true);
    });
  });
});

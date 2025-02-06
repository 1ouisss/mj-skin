
import { skinProducts } from '../data/products';
import { Product } from '../types/skincare';

interface ValidationResult {
  missingImages: string[];
  invalidProducts: Array<{
    id: string;
    issues: string[];
  }>;
}

export const validateProducts = (): ValidationResult => {
  const result: ValidationResult = {
    missingImages: [],
    invalidProducts: []
  };

  Object.entries(skinProducts).forEach(([id, product]) => {
    const issues: string[] = [];

    // Vérifier les champs requis
    if (!product.name) issues.push('Nom manquant');
    if (!product.type) issues.push('Type manquant');
    if (!product.description) issues.push('Description manquante');
    if (!product.ingredients) issues.push('Ingrédients manquants');
    if (!product.format) issues.push('Format manquant');
    
    // Vérifier l'image
    if (!product.image) {
      issues.push('Image manquante');
      result.missingImages.push(id);
    }

    // Vérifier les tableaux requis
    if (!product.skinTypes?.length) issues.push('Types de peau manquants');
    if (!product.conditions?.length) issues.push('Conditions manquantes');
    if (!product.benefits?.length) issues.push('Bénéfices manquants');

    if (issues.length > 0) {
      result.invalidProducts.push({ id, issues });
    }
  });

  return result;
};

export const validateProductImages = async (): Promise<string[]> => {
  const missingImages: string[] = [];
  
  for (const product of Object.values(skinProducts)) {
    if (!product.image) {
      missingImages.push(product.id);
      continue;
    }

    try {
      const response = await fetch(product.image);
      if (!response.ok) {
        missingImages.push(product.id);
      }
    } catch (error) {
      missingImages.push(product.id);
    }
  }

  return missingImages;
};

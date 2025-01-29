import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  duration: RoutineDuration;
  texture: TexturePreference;
  noEssentialOils: boolean;
  timeOfDay?: 'morning' | 'evening';
}

interface ScoredProduct {
  product: Product;
  score: number;
}

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  const maxScore = 100;

  // Skin type match (30%)
  if (product.skinTypes.includes(criteria.skinType)) score += 30;

  // Conditions match (30%)
  const conditionScore = criteria.conditions.reduce((acc, condition) => {
    if (product.conditions.includes(condition)) {
      return acc + (30 / criteria.conditions.length);
    }
    return acc;
  }, 0);
  score += conditionScore;

  // Secondary criteria (40%)
  if (product.texture.toLowerCase() === criteria.texture.toLowerCase()) score += 15;
  if (criteria.noEssentialOils === !product.hasEssentialOils) score += 10;
  if (product.duration === criteria.duration) score += 10;
  
  // Time of day bonus (5%)
  if (criteria.timeOfDay && 
      (product.timeOfDay === criteria.timeOfDay || product.timeOfDay === 'both')) {
    score += 5;
  }

  return (score / maxScore) * 100;
};

const diversifyResults = (scoredProducts: ScoredProduct[]): Product[] => {
  const categories = ['Hydratant', 'Sérum', 'Masque'];
  const result: Product[] = [];
  
  categories.forEach(category => {
    const categoryProducts = scoredProducts
      .filter(sp => sp.product.type === category && sp.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    
    result.push(...categoryProducts.map(sp => sp.product));
  });

  return result.slice(0, 6); // Return max 6 products to account for multiple conditions
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  const allProducts = [...hydratants, ...serums, ...masques];
  
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria)
  }));

  return diversifyResults(scoredProducts);
};
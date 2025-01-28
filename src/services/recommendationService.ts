import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";

interface FilterCriteria {
  skinType: SkinType;
  condition: SkinCondition;
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

  // Critères prioritaires (60%)
  if (product.skinTypes.includes(criteria.skinType)) score += 30;
  if (product.conditions.includes(criteria.condition)) score += 30;

  // Critères secondaires (40%)
  if (product.texture.toLowerCase() === criteria.texture.toLowerCase()) score += 15;
  if (criteria.noEssentialOils === !product.hasEssentialOils) score += 10;
  if (product.duration === criteria.duration) score += 10;
  
  // Bonus pour correspondance moment de la journée
  if (criteria.timeOfDay && 
      (product.timeOfDay === criteria.timeOfDay || product.timeOfDay === 'both')) {
    score += 5;
  }

  return (score / maxScore) * 100;
};

const diversifyResults = (scoredProducts: ScoredProduct[]): Product[] => {
  // Assure une diversité dans les types de produits
  const categories = ['Hydratant', 'Sérum', 'Masque'];
  const result: Product[] = [];
  
  categories.forEach(category => {
    const categoryProducts = scoredProducts
      .filter(sp => sp.product.type === category && sp.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    
    result.push(...categoryProducts.map(sp => sp.product));
  });

  return result.slice(0, 4); // Retourne max 4 produits
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  const allProducts = [...hydratants, ...serums, ...masques];
  
  // Calculer les scores pour chaque produit
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria)
  }));

  // Filtrer et diversifier les résultats
  return diversifyResults(scoredProducts);
};
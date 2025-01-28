import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";

interface FilterCriteria {
  skinType: SkinType;
  condition: SkinCondition;
  duration: RoutineDuration;
  texture: TexturePreference;
  noEssentialOils: boolean;
  timeOfDay?: 'morning' | 'evening';
}

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  const maxScore = 100;

  // Critères obligatoires (50% du score)
  if (product.skinTypes.includes(criteria.skinType)) score += 25;
  if (product.conditions.includes(criteria.condition)) score += 25;

  // Critères secondaires (50% du score)
  if (product.texture.toLowerCase() === criteria.texture.toLowerCase()) score += 20;
  if (criteria.noEssentialOils === !product.hasEssentialOils) score += 15;
  if (product.duration === criteria.duration) score += 15;

  return (score / maxScore) * 100;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  const allProducts = [...hydratants, ...serums];
  
  // Calculer les scores pour chaque produit
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria)
  }));

  // Filtrer les produits avec un score minimum de 50%
  const validProducts = scoredProducts
    .filter(item => item.score >= 50)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  // Séparer les produits du matin et du soir
  if (criteria.timeOfDay) {
    const timeSpecificProducts = validProducts.filter(product => {
      const isNightProduct = product.name.toLowerCase().includes('nuit');
      return criteria.timeOfDay === 'evening' ? isNightProduct : !isNightProduct;
    });
    return timeSpecificProducts.slice(0, 4);
  }

  return validProducts.slice(0, 4);
};
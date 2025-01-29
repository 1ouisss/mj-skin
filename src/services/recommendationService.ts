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

const WEIGHT_MULTIPLIERS = {
  TEXTURE: 1.5,
  DURATION: 1.3,
  SKIN_TYPE: 1.0,
  CONDITIONS: 1.2
};

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  const maxScore = 100;

  // Texture match (weighted)
  if (product.texture.toLowerCase() === criteria.texture.toLowerCase()) {
    score += 30 * WEIGHT_MULTIPLIERS.TEXTURE;
  }

  // Duration match (weighted)
  if (product.duration === criteria.duration) {
    score += 20 * WEIGHT_MULTIPLIERS.DURATION;
  }

  // Skin type match
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 25 * WEIGHT_MULTIPLIERS.SKIN_TYPE;
  }

  // Conditions match (weighted)
  const conditionScore = criteria.conditions.reduce((acc, condition) => {
    if (product.conditions.includes(condition)) {
      return acc + (25 / criteria.conditions.length) * WEIGHT_MULTIPLIERS.CONDITIONS;
    }
    return acc;
  }, 0);
  score += conditionScore;

  // Essential oils preference
  if (criteria.noEssentialOils === !product.hasEssentialOils) {
    score += 10;
  }

  return Math.min((score / maxScore) * 100, 100);
};

const filterProductsByDuration = (products: Product[], duration: RoutineDuration): Product[] => {
  if (duration === "< 5 minutes") {
    // For quick routines, prefer products with shorter application times
    return products.filter(product => product.duration === "< 5 minutes");
  }
  // For longer routines, include all products but prioritize them in scoring
  return products;
};

const filterProductsByTexture = (products: Product[], texture: TexturePreference): Product[] => {
  // Strict texture matching
  return products.filter(product => product.texture.toLowerCase() === texture.toLowerCase());
};

const diversifyResults = (scoredProducts: ScoredProduct[], criteria: FilterCriteria): Product[] => {
  // Filter by texture and duration first
  let filteredProducts = scoredProducts
    .map(sp => sp.product)
    .filter(p => p.texture.toLowerCase() === criteria.texture.toLowerCase());
  
  // Apply duration-based filtering
  filteredProducts = filterProductsByDuration(filteredProducts, criteria.duration);

  // Categories to include based on routine duration
  const categories = criteria.duration === "< 5 minutes" 
    ? ['Hydratant', 'Sérum'] // Simplified routine
    : ['Hydratant', 'Sérum', 'Masque']; // Complete routine

  const result: Product[] = [];
  
  categories.forEach(category => {
    const categoryProducts = scoredProducts
      .filter(sp => sp.product.type === category && filteredProducts.includes(sp.product))
      .sort((a, b) => b.score - a.score)
      .slice(0, criteria.duration === "< 5 minutes" ? 1 : 2);
    
    result.push(...categoryProducts.map(sp => sp.product));
  });

  return result;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  const allProducts = [...hydratants, ...serums, ...masques];
  
  // First, filter by texture
  const textureFilteredProducts = filterProductsByTexture(allProducts, criteria.texture);
  
  // Then score the filtered products
  const scoredProducts = textureFilteredProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria)
  }));

  // Finally, diversify and return the results
  return diversifyResults(scoredProducts, criteria);
};
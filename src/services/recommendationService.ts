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

// Enhanced weight multipliers with critical and secondary criteria
const WEIGHT_MULTIPLIERS = {
  // Critical criteria (60%)
  SKIN_TYPE: 0.25,
  CONDITIONS: 0.20,
  TEXTURE: 0.15,
  
  // Secondary criteria (40%)
  DURATION: 0.15,
  ESSENTIAL_OILS: 0.15,
  TIME_OF_DAY: 0.10
};

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  let criteriaMet = 0;
  const maxScore = 100;

  // Critical criteria (60%)
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 25 * WEIGHT_MULTIPLIERS.SKIN_TYPE;
    criteriaMet++;
  }

  const conditionScore = criteria.conditions.reduce((acc, condition) => {
    if (product.conditions.includes(condition)) {
      criteriaMet++;
      return acc + (20 / criteria.conditions.length) * WEIGHT_MULTIPLIERS.CONDITIONS;
    }
    return acc;
  }, 0);
  score += conditionScore;

  if (product.texture.toLowerCase() === criteria.texture.toLowerCase()) {
    score += 15 * WEIGHT_MULTIPLIERS.TEXTURE;
    criteriaMet++;
  }

  // Secondary criteria (40%)
  if (product.duration === criteria.duration) {
    score += 15 * WEIGHT_MULTIPLIERS.DURATION;
    criteriaMet++;
  }

  if (criteria.noEssentialOils === !product.hasEssentialOils) {
    score += 15 * WEIGHT_MULTIPLIERS.ESSENTIAL_OILS;
    criteriaMet++;
  }

  if (criteria.timeOfDay) {
    if (product.timeOfDay === criteria.timeOfDay || product.timeOfDay === 'both') {
      score += 10 * WEIGHT_MULTIPLIERS.TIME_OF_DAY;
      criteriaMet++;
    }
  }

  // Ensure at least 2 criteria are met for a recommendation
  return criteriaMet >= 2 ? Math.min((score / maxScore) * 100, 100) : 0;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const filterProductsByDuration = (products: Product[], duration: RoutineDuration): Product[] => {
  if (duration === "< 5 minutes") {
    return products.filter(product => product.duration === "< 5 minutes");
  }
  return products;
};

const filterProductsByTexture = (products: Product[], texture: TexturePreference): Product[] => {
  return products.filter(product => product.texture.toLowerCase() === texture.toLowerCase());
};

const diversifyResults = (scoredProducts: ScoredProduct[], criteria: FilterCriteria): Product[] => {
  // Filter by texture and duration
  let filteredProducts = scoredProducts
    .filter(sp => sp.score > 0) // Only include products that met at least 2 criteria
    .map(sp => sp.product)
    .filter(p => p.texture.toLowerCase() === criteria.texture.toLowerCase());
  
  // Apply duration-based filtering
  filteredProducts = filterProductsByDuration(filteredProducts, criteria.duration);

  // Categories to include based on routine duration
  const categories = criteria.duration === "< 5 minutes" 
    ? ['Hydratant', 'Sérum'] 
    : ['Hydratant', 'Sérum', 'Masque'];

  const result: Product[] = [];
  
  categories.forEach(category => {
    const categoryProducts = scoredProducts
      .filter(sp => 
        sp.product.type === category && 
        filteredProducts.includes(sp.product) &&
        sp.score > 0
      )
      .sort((a, b) => b.score - a.score);

    // Take top scoring products and shuffle optional ones
    const essentialProducts = categoryProducts.slice(0, 1);
    const optionalProducts = shuffleArray(categoryProducts.slice(1));
    
    // Add essential products
    result.push(...essentialProducts.map(sp => sp.product));
    
    // Add some randomized optional products based on routine duration
    if (criteria.duration !== "< 5 minutes") {
      result.push(...optionalProducts.slice(0, 1).map(sp => sp.product));
    }
  });

  return result;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  const allProducts = [...hydratants, ...serums, ...masques];
  
  // Score all products
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria)
  }));

  // Return diversified results
  return diversifyResults(scoredProducts, criteria);
};
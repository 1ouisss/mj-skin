import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";
import { skinProducts } from "../data/products";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  duration: RoutineDuration;
  textures: TexturePreference[];
  noEssentialOils: boolean;
  timeOfDay?: 'morning' | 'evening';
  fragrancePreference?: string;
}

interface ScoredProduct {
  product: Product;
  score: number;
}

const ESSENTIAL_OIL_FREE_PRODUCTS = [
  'huile-jojoba',
  'creme-fraiche',
  'sublimateur',
  'gel-aloes',
  'serum-neutre',
  'mousseline-calendule'
];

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

  // If "Sans huiles essentielles" is selected, only consider essential oil free products
  if (criteria.fragrancePreference === "Sans huiles essentielles") {
    if (!ESSENTIAL_OIL_FREE_PRODUCTS.includes(product.id)) {
      return 0;
    }
    // Boost score for essential oil free products
    score += 25;
    criteriaMet++;
  }

  // Special case for Mousseline Calendule
  if (product.id === 'mousseline-calendule' && criteria.skinType !== 'Sèche') {
    return 0;
  }

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

  if (criteria.textures.includes(product.texture)) {
    score += 15 * WEIGHT_MULTIPLIERS.TEXTURE;
    criteriaMet++;
  }

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

const filterProductsByTexture = (products: Product[], textures: TexturePreference[]): Product[] => {
  return products.filter(product => textures.includes(product.texture));
};

const diversifyResults = (scoredProducts: ScoredProduct[], criteria: FilterCriteria): Product[] => {
  // Filter by texture and duration
  let filteredProducts = scoredProducts
    .filter(sp => sp.score > 0) // Only include products that met at least 2 criteria
    .map(sp => sp.product)
    .filter(p => criteria.textures.includes(p.texture));
  
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

  // Filter and sort products by score
  const filteredProducts = scoredProducts
    .filter(sp => sp.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(sp => sp.product);

  // If "Sans huiles essentielles" is selected, ensure only allowed products are included
  if (criteria.fragrancePreference === "Sans huiles essentielles") {
    return filteredProducts.filter(product => 
      ESSENTIAL_OIL_FREE_PRODUCTS.includes(product.id) &&
      (product.id !== 'mousseline-calendule' || criteria.skinType === 'Sèche')
    );
  }

  return filteredProducts;
};

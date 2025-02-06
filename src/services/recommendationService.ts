
import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";
import { nettoyants } from "../data/products/nettoyants";
import { skinProducts } from "../data/products";
import { huiles } from "../data/products/huiles";
import { specifiques } from "../data/products/specifiques";
import { skinTypeRecommendations } from "../data/skinTypes";
import { conditionRecommendations } from "../data/conditions";

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
  priority: number;
}

const PRODUCT_TYPE_ORDER = {
  "Nettoyant": 1,
  "Tonique": 2,
  "Sérum": 3,
  "Traitement": 4,
  "Masque": 5,
  "Hydratant": 6
};

const calculateProductScore = (
  product: Product, 
  criteria: FilterCriteria, 
  isFromSkinType: boolean,
  isFromCondition: boolean
): ScoredProduct => {
  let score = 0;
  let priority = isFromSkinType ? 1 : (isFromCondition ? 2 : 3);

  // Vérification des huiles essentielles
  if (criteria.fragrancePreference === "Sans huiles essentielles" && product.hasEssentialOils) {
    return { product, score: 0, priority };
  }

  // Score pour le type de peau
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 25;
  }

  // Score pour les conditions
  const matchingConditions = criteria.conditions.filter(condition => 
    product.conditions.includes(condition)
  );
  
  if (matchingConditions.length > 0) {
    score += (20 * (matchingConditions.length / criteria.conditions.length));
  }

  // Score pour la texture
  if (criteria.textures.includes(product.texture)) {
    score += 15;
  }

  // Score pour le moment de la journée
  if (criteria.timeOfDay) {
    if (product.timeOfDay === criteria.timeOfDay || product.timeOfDay === 'both') {
      score += 10;
    }
  }

  return { product, score, priority };
};

const getProductsByStepAndType = (
  products: Product[], 
  criteria: FilterCriteria
): Product[] => {
  const scoredProducts = products.map(product => {
    const isFromSkinType = skinTypeRecommendations[criteria.skinType]?.products.some(p => p.id === product.id);
    const isFromCondition = criteria.conditions.some(condition => 
      conditionRecommendations[condition]?.products.some(p => p.id === product.id)
    );
    
    return calculateProductScore(product, criteria, isFromSkinType, isFromCondition);
  });

  // Filtrer les produits avec un score > 0 et trier par type et priorité
  return scoredProducts
    .filter(sp => sp.score > 0)
    .sort((a, b) => {
      const typeOrderDiff = (PRODUCT_TYPE_ORDER[a.product.type] || 99) - (PRODUCT_TYPE_ORDER[b.product.type] || 99);
      if (typeOrderDiff !== 0) return typeOrderDiff;
      
      // Si même type, trier par priorité puis par score
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.score - a.score;
    })
    .map(sp => sp.product);
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  let baseProducts: Product[] = [];
  let conditionProducts: Product[] = [];

  // Obtenir les produits de base selon le type de peau
  if (skinTypeRecommendations[criteria.skinType]) {
    baseProducts = skinTypeRecommendations[criteria.skinType].products;
  }

  // Obtenir les produits spécifiques aux conditions
  criteria.conditions.forEach(condition => {
    if (condition !== "Aucune" && conditionRecommendations[condition]) {
      conditionProducts = [
        ...conditionProducts,
        ...conditionRecommendations[condition].products
      ];
    }
  });

  // Combiner tous les produits
  const allProducts = [...baseProducts, ...conditionProducts];
  
  // Organiser les produits par étape et type
  return getProductsByStepAndType(allProducts, criteria);
};

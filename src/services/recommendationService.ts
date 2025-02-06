
import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { generateRoutine } from "../data/skinRoutines";
import { skinProducts } from "../data/products";
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
  routine: ReturnType<typeof generateRoutine>
): number => {
  let score = 0;

  // Vérification des huiles essentielles
  if (criteria.fragrancePreference === "Sans huiles essentielles" && product.hasEssentialOils) {
    return 0;
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

  // Bonus si le produit est dans la routine recommandée
  Object.values(routine).forEach(step => {
    if (step.products && step.products.includes(product.id)) {
      score += 30;
    }
  });

  return score;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);
  
  // Obtenir tous les produits recommandés
  const allProducts = Object.values(skinProducts);

  // Calculer les scores et trier les produits
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, criteria, customRoutine),
    type: product.type
  }));

  // Filtrer les produits avec un score > 0 et trier
  return scoredProducts
    .filter(sp => sp.score > 0)
    .sort((a, b) => {
      const typeOrderDiff = (PRODUCT_TYPE_ORDER[a.product.type] || 99) - (PRODUCT_TYPE_ORDER[b.product.type] || 99);
      if (typeOrderDiff !== 0) return typeOrderDiff;
      return b.score - a.score;
    })
    .map(sp => sp.product);
};

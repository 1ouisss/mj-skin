
import { SkinType, SkinCondition, Product, TexturePreference } from "../types/skincare";
import { generateRoutine } from "../data/skinRoutines";
import { skinProducts } from "../data/products";
import { skinTypeRecommendations } from "../data/skinTypes";
import { conditionRecommendations } from "../data/conditions";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  textures?: TexturePreference[];
  noEssentialOils?: boolean;
}

const PRODUCT_TYPE_ORDER = {
  "Nettoyant": 1,
  "Tonique": 2,
  "Sérum": 3,
  "Traitement": 4,
  "Masque": 5,
  "Hydratant": 6
};

const ESSENTIAL_PRODUCTS = [
  "huile-nettoyante",  // Huile Nettoyante
  "eau-neroli-enrichie" // Eau de Néroli Enrichie
];

const calculateProductScore = (
  product: Product, 
  criteria: FilterCriteria,
  routine: ReturnType<typeof generateRoutine>
): number => {
  let score = 0;

  // Vérification des huiles essentielles
  if (criteria.noEssentialOils && product.hasEssentialOils) {
    return 0;
  }

  // Bonus pour les produits essentiels
  if (ESSENTIAL_PRODUCTS.includes(product.id)) {
    score += 100; // Score très élevé pour s'assurer qu'ils sont toujours inclus
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
  if (criteria.textures?.includes(product.texture)) {
    score += 15;
  }

  // Bonus si le produit est dans la routine recommandée
  Object.values(routine).forEach(step => {
    if (step && Array.isArray(step.products) && step.products.includes(product.id)) {
      score += 30;
    }
  });

  return score;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);
  
  // Obtenir tous les produits
  const allProducts = Object.values(skinProducts);

  // D'abord, s'assurer que les produits essentiels sont inclus
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (product) {
      // Ajouter "Essentiel" à la description pour ces produits
      return {
        ...product,
        description: `${product.description} (Essentiel)`
      };
    }
    return null;
  }).filter((p): p is Product => p !== null);

  // Calculer les scores pour les autres produits
  const scoredProducts = allProducts
    .filter(product => !ESSENTIAL_PRODUCTS.includes(product.id))
    .map(product => ({
      product,
      score: calculateProductScore(product, criteria, customRoutine),
      type: product.type
    }));

  // Filtrer les produits avec un score > 0 et trier
  const rankedProducts = scoredProducts
    .filter(sp => sp.score > 0)
    .sort((a, b) => {
      const typeOrderDiff = (PRODUCT_TYPE_ORDER[a.product.type] || 99) - (PRODUCT_TYPE_ORDER[b.product.type] || 99);
      if (typeOrderDiff !== 0) return typeOrderDiff;
      return b.score - a.score;
    })
    .map(sp => sp.product);

  // Prendre les 6 meilleurs produits (8 au total avec les 2 essentiels)
  const topProducts = rankedProducts.slice(0, 6);

  // Combiner les produits essentiels avec les meilleurs produits
  return [...essentialProducts, ...topProducts];
};

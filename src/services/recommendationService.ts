
import { SkinType, SkinCondition, Product, TexturePreference } from "../types/skincare";
import { generateRoutine } from "../data/skinRoutines";
import { skinProducts } from "../data/products";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  textures?: TexturePreference[];
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
  "huile-nettoyante",    // Nettoyant de base
  "eau-neroli-enrichie", // Tonique essentiel
  "gel-aloes",           // Hydratant universel
  "exfopur"             // Traitement exfoliant
];

const CONDITION_SPECIFIC_PRODUCTS = {
  "Rougeurs": ["formule-apaisante"]
};

// Produits à exclure pour certains types de peau
const EXCLUDED_PRODUCTS = {
  "Acnéique": ["huile-tamanu"]
};

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  
  // Vérifier si le produit doit être exclu pour ce type de peau
  if (EXCLUDED_PRODUCTS[criteria.skinType]?.includes(product.id)) {
    return -1000; // Score très négatif pour exclure le produit
  }
  
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 2;
  }
  
  criteria.conditions.forEach(condition => {
    if (product.conditions.includes(condition)) {
      score += 3;
      
      if (CONDITION_SPECIFIC_PRODUCTS[condition]?.includes(product.id)) {
        score += 5;
      }
    }
  });
  
  if (criteria.conditions.length > 1) {
    const matchingConditions = product.conditions.filter(c => 
      criteria.conditions.includes(c)
    ).length;
    if (matchingConditions > 1) {
      score += matchingConditions * 2;
    }
  }

  return score;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  console.log('Démarrage de la génération des recommandations...'); 
  
  if (!criteria || !criteria.skinType) {
    console.error('Critères invalides pour les recommandations');
    return [];
  }

  const allProducts = Object.values(skinProducts);
  
  if (!allProducts || allProducts.length === 0) {
    console.error('Aucun produit disponible');
    return [];
  }
  
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      console.error(`ERREUR: Produit essentiel introuvable : ${id}`);
      return null;
    }
    console.log(`Produit essentiel trouvé : ${id}`);
    return product;
  }).filter((p): p is Product => p !== null);

  const conditionSpecificIds = new Set<string>();
  criteria.conditions.forEach(condition => {
    const specificProducts = CONDITION_SPECIFIC_PRODUCTS[condition];
    if (specificProducts) {
      specificProducts.forEach(id => conditionSpecificIds.add(id));
    }
  });

  const conditionSpecificProducts = Array.from(conditionSpecificIds)
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => p !== null);

  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions || []);

  const routineProductIds = new Set<string>();
  if (customRoutine) {
    Object.values(customRoutine).forEach(step => {
      if (step && Array.isArray(step.products)) {
        step.products.forEach(id => routineProductIds.add(id));
      }
    });
  }

  ESSENTIAL_PRODUCTS.forEach(id => routineProductIds.add(id));
  conditionSpecificIds.forEach(id => routineProductIds.add(id));

  const scoredProducts = Array.from(routineProductIds)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id) && !conditionSpecificIds.has(id))
    .map(id => {
      const product = allProducts.find(p => p.id === id);
      if (!product) return null;
      return {
        product,
        score: calculateProductScore(product, criteria)
      };
    })
    .filter((item): item is { product: Product; score: number } => item !== null)
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return (PRODUCT_TYPE_ORDER[a.product.type] || 99) - (PRODUCT_TYPE_ORDER[b.product.type] || 99);
    });

  console.log('Scores des produits:', scoredProducts.map(({ product, score }) => ({
    id: product.id,
    score,
    conditions: product.conditions
  })));

  const routineProducts = scoredProducts
    .map(item => item.product)
    .filter(product => item => item.score > -1000) // Exclure les produits avec un score très négatif
    .slice(0, Math.max(0, 8 - essentialProducts.length - conditionSpecificProducts.length));

  const finalProducts = [
    ...essentialProducts,
    ...conditionSpecificProducts,
    ...routineProducts
  ];

  console.log('Recommandations finales générées:', finalProducts.map(p => p.id));
  return finalProducts;
};

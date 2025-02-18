
import { SkinType, SkinCondition, Product, TexturePreference } from "../types/skincare";
import { generateRoutine } from "../data/skinRoutines";
import { skinProducts } from "../data/products";

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
  "huile-nettoyante",    // Nettoyant de base
  "eau-neroli-enrichie", // Tonique essentiel
  "gel-aloes",           // Hydratant universel
  "exfopur"             // Traitement exfoliant
];

// Fonction pour calculer le score de pertinence d'un produit
const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  
  // Points pour la compatibilité avec le type de peau
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 2;
  }
  
  // Points pour chaque condition traitée
  criteria.conditions.forEach(condition => {
    if (product.conditions.includes(condition)) {
      score += 3;
    }
  });
  
  // Bonus pour les produits qui traitent plusieurs conditions simultanément
  if (criteria.conditions.length > 1) {
    const matchingConditions = product.conditions.filter(c => 
      criteria.conditions.includes(c)
    ).length;
    if (matchingConditions > 1) {
      score += matchingConditions * 2; // Bonus supplémentaire pour chaque condition supplémentaire
    }
  }

  // Malus pour les huiles essentielles si l'utilisateur n'en veut pas
  if (criteria.noEssentialOils && product.hasEssentialOils) {
    score -= 5;
  }

  return score;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  console.log('Démarrage de la génération des recommandations...'); 
  
  if (!criteria || !criteria.skinType) {
    console.error('Critères invalides pour les recommandations');
    return [];
  }

  // Obtenir tous les produits disponibles
  const allProducts = Object.values(skinProducts);
  
  if (!allProducts || allProducts.length === 0) {
    console.error('Aucun produit disponible');
    return [];
  }
  
  // Récupérer les produits essentiels
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      console.error(`ERREUR: Produit essentiel introuvable : ${id}`);
      return null;
    }
    console.log(`Produit essentiel trouvé : ${id}`);
    return product;
  }).filter((p): p is Product => p !== null);

  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions || []);

  // Collecter les IDs des produits de la routine et calculer leurs scores
  const routineProductIds = new Set<string>();
  if (customRoutine) {
    Object.values(customRoutine).forEach(step => {
      if (step && Array.isArray(step.products)) {
        step.products.forEach(id => routineProductIds.add(id));
      }
    });
  }

  // Ajouter les produits essentiels
  ESSENTIAL_PRODUCTS.forEach(id => routineProductIds.add(id));

  // Obtenir les produits de routine avec leurs scores
  const scoredProducts = Array.from(routineProductIds)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id))
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
      // D'abord trier par score
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      // En cas d'égalité, utiliser l'ordre des types de produits
      return (PRODUCT_TYPE_ORDER[a.product.type] || 99) - (PRODUCT_TYPE_ORDER[b.product.type] || 99);
    });

  // Logs pour le debugging
  console.log('Scores des produits:', scoredProducts.map(({ product, score }) => ({
    id: product.id,
    score,
    conditions: product.conditions
  })));

  // Sélectionner les meilleurs produits
  const routineProducts = scoredProducts
    .map(item => item.product)
    .slice(0, Math.max(0, 8 - essentialProducts.length));

  // Combiner les produits en donnant priorité aux essentiels
  const finalProducts = [
    ...essentialProducts,
    ...routineProducts
  ];

  console.log('Recommandations finales générées:', finalProducts.map(p => p.id));
  return finalProducts;
};

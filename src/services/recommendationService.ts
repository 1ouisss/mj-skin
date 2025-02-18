
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

const EXCLUDED_PRODUCTS = {
  "Acnéique": ["huile-tamanu"]
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

  // Générer d'abord la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions || []);
  
  // Collecter tous les IDs de produits mentionnés dans la routine
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
  
  // Ajouter les produits spécifiques aux conditions
  criteria.conditions.forEach(condition => {
    const specificProducts = CONDITION_SPECIFIC_PRODUCTS[condition];
    if (specificProducts) {
      specificProducts.forEach(id => routineProductIds.add(id));
    }
  });

  // Convertir les IDs en produits réels
  const finalProducts = Array.from(routineProductIds)
    .map(id => {
      const product = allProducts.find(p => p.id === id);
      if (!product) {
        console.error(`ERREUR: Produit non trouvé : ${id}`);
        return null;
      }
      return product;
    })
    .filter((p): p is Product => p !== null && !EXCLUDED_PRODUCTS[criteria.skinType]?.includes(p.id))
    .sort((a, b) => (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99));

  // Filtrer les produits exclus pour ce type de peau
  console.log('Recommandations finales générées:', finalProducts.map(p => p.id));
  return finalProducts;
};

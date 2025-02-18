
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
  "Rougeurs": ["formule-apaisante"],
  "Eczéma": ["formule-eczema", "baume-apaisant"],
  "Acné": ["dermopur-acne", "exfopur"],
  "Taches": ["claripro", "lotion-aha"]
};

const EXCLUDED_PRODUCTS = {
  "Acnéique": ["huile-tamanu"],
  "Sensible": ["spice-scrub"]  // Éviter les produits trop agressifs pour les peaux sensibles
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  console.log('Démarrage de la génération des recommandations...'); 
  console.log('Critères reçus:', { ...criteria });
  
  if (!criteria || !criteria.skinType) {
    console.error('Critères invalides pour les recommandations');
    return [];
  }

  const allProducts = Object.values(skinProducts);
  
  if (!allProducts || allProducts.length === 0) {
    console.error('Aucun produit disponible');
    return [];
  }

  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions || []);
  
  // Collecter tous les IDs de produits
  const routineProductIds = new Set<string>();
  
  // 1. Ajouter les produits de la routine
  if (customRoutine) {
    Object.values(customRoutine).forEach(step => {
      if (step && Array.isArray(step.products)) {
        step.products.forEach(id => {
          if (!EXCLUDED_PRODUCTS[criteria.skinType]?.includes(id)) {
            routineProductIds.add(id);
          }
        });
      }
    });
  }
  
  // 2. Ajouter les produits essentiels
  ESSENTIAL_PRODUCTS.forEach(id => {
    if (!EXCLUDED_PRODUCTS[criteria.skinType]?.includes(id)) {
      routineProductIds.add(id);
    }
  });
  
  // 3. Ajouter les produits spécifiques à chaque condition
  criteria.conditions.forEach(condition => {
    const specificProducts = CONDITION_SPECIFIC_PRODUCTS[condition];
    if (specificProducts) {
      specificProducts.forEach(id => {
        if (!EXCLUDED_PRODUCTS[criteria.skinType]?.includes(id)) {
          routineProductIds.add(id);
          console.log(`Ajout du produit spécifique ${id} pour la condition ${condition}`);
        }
      });
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
    .filter((p): p is Product => p !== null)
    .sort((a, b) => (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99));

  console.log('Recommandations finales générées:', finalProducts.map(p => p.id));
  return finalProducts;
};

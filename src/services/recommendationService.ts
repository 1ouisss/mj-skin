
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

// Liste mise à jour des produits essentiels avec commentaires explicatifs
const ESSENTIAL_PRODUCTS = [
  "huile-nettoyante",    // Nettoyant de base
  "eau-neroli-enrichie", // Tonique essentiel
  "gel-aloes",           // Hydratant universel
  "exfopur"             // Traitement exfoliant
];

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
  
  // Récupérer d'abord tous les produits essentiels avec vérification stricte
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

  // Collecter les IDs des produits de la routine
  const routineProductIds = new Set<string>();
  if (customRoutine) {
    Object.values(customRoutine).forEach(step => {
      if (step && Array.isArray(step.products)) {
        step.products.forEach(id => routineProductIds.add(id));
      }
    });
  }

  // Ajouter automatiquement tous les produits essentiels
  ESSENTIAL_PRODUCTS.forEach(id => routineProductIds.add(id));

  // Obtenir les produits de routine (excluant les essentiels)
  const routineProducts = Array.from(routineProductIds)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id))
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => p !== null && p !== undefined) // Ajout de la vérification undefined
    .sort((a, b) => {
      return (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99);
    });

  // Logs détaillés pour le debugging
  console.log('État des produits essentiels:', {
    total: essentialProducts.length,
    ids: essentialProducts.map(p => p.id),
    images: essentialProducts.map(p => p.image)
  });

  // Vérification finale des produits essentiels
  const missingEssentials = ESSENTIAL_PRODUCTS.filter(id => 
    !essentialProducts.some(p => p.id === id)
  );

  if (missingEssentials.length > 0) {
    console.error('ALERTE: Produits essentiels manquants:', missingEssentials);
  }

  // Combiner les produits en donnant priorité aux essentiels
  const finalProducts = [
    ...essentialProducts,
    ...routineProducts.slice(0, Math.max(0, 8 - essentialProducts.length))
  ];

  console.log('Recommandations finales générées:', finalProducts.map(p => p.id));
  return finalProducts;
};

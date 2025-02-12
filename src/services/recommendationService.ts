
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
  "huile-nettoyante",
  "eau-neroli-enrichie",
  "gel-aloes",
  "exfopur"
];

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Obtenir tous les produits disponibles
  const allProducts = Object.values(skinProducts);
  
  // Récupérer d'abord tous les produits essentiels
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      console.error(`Produit essentiel introuvable : ${id}`);
      return null;
    }
    return product;
  }).filter((p): p is Product => p !== null);

  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);

  // Collecter les IDs des produits de la routine
  const routineProductIds = new Set<string>();
  Object.values(customRoutine).forEach(step => {
    if (step && Array.isArray(step.products)) {
      step.products.forEach(id => routineProductIds.add(id));
    }
  });

  // Ajouter automatiquement tous les produits essentiels
  ESSENTIAL_PRODUCTS.forEach(id => routineProductIds.add(id));

  // Obtenir les produits de routine (excluant les essentiels)
  const routineProducts = Array.from(routineProductIds)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id))
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => p !== null)
    .sort((a, b) => {
      return (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99);
    });

  // Logs pour debug
  console.log('Produits essentiels trouvés:', essentialProducts.map(p => p.id));
  console.log('Images des produits essentiels:', essentialProducts.map(p => p.image));
  console.log('Produits de routine trouvés:', routineProducts.map(p => p.id));

  // Combiner les produits en donnant priorité aux essentiels
  const finalProducts = [
    ...essentialProducts,
    ...routineProducts.slice(0, Math.max(0, 8 - essentialProducts.length))
  ];

  return finalProducts;
};

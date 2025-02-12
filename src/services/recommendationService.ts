
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
  "huile-nettoyante",  // Huile Nettoyante
  "eau-neroli-enrichie", // Eau de Néroli Enrichie
  "gel-aloes", // Gel d'Aloès
  "exfopur" // Ajout d'Exfopur comme produit essentiel
];

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);
  
  // Obtenir tous les produits
  const allProducts = Object.values(skinProducts);

  // Vérifier si les produits essentiels existent et les récupérer
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      console.error(`Produit essentiel non trouvé : ${id}`); // Changé en error pour plus de visibilité
      return null;
    }
    return product;
  }).filter((p): p is Product => p !== null);

  // Récupérer les produits mentionnés dans la routine
  const routineProductIds = new Set<string>();
  Object.values(customRoutine).forEach(step => {
    if (step && Array.isArray(step.products)) {
      step.products.forEach(productId => routineProductIds.add(productId));
    }
  });

  // Ajouter les produits essentiels à la routine s'ils n'y sont pas déjà
  ESSENTIAL_PRODUCTS.forEach(id => routineProductIds.add(id));

  // Obtenir les produits de routine (en excluant les essentiels déjà inclus)
  const routineProducts = Array.from(routineProductIds)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id))
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => p !== null)
    .sort((a, b) => {
      const typeOrderDiff = (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99);
      if (typeOrderDiff !== 0) return typeOrderDiff;
      return a.name.localeCompare(b.name);
    });

  // S'assurer que nous avons tous les produits essentiels
  const missingEssentials = ESSENTIAL_PRODUCTS.filter(id => 
    !essentialProducts.some(p => p.id === id)
  );
  
  if (missingEssentials.length > 0) {
    console.error('Produits essentiels manquants:', missingEssentials);
  }

  // Combiner les produits en donnant la priorité aux essentiels
  const finalProducts = [
    ...essentialProducts,
    ...routineProducts.slice(0, Math.max(0, 8 - essentialProducts.length))
  ];

  // Logs de debug
  console.log('Nombre de produits essentiels :', essentialProducts.length);
  console.log('Produits essentiels présents :', essentialProducts.map(p => p.id));
  console.log('Nombre total de produits :', finalProducts.length);
  console.log('IDs des produits finaux :', finalProducts.map(p => p.id));

  // Vérification finale de la présence des images
  finalProducts.forEach(p => {
    if (!p.image) {
      console.error(`Image manquante pour le produit : ${p.id}`);
    }
  });

  return finalProducts;
};

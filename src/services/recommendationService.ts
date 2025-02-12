
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
  "gel-aloes" // Ajout du Gel d'Aloès comme produit essentiel
];

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Générer la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);
  
  // Obtenir tous les produits
  const allProducts = Object.values(skinProducts);

  // Vérifier si les produits essentiels existent
  const essentialProducts = ESSENTIAL_PRODUCTS.map(id => {
    const product = allProducts.find(p => p.id === id);
    if (!product) {
      console.warn(`Produit essentiel non trouvé : ${id}`);
      return null;
    }
    return {
      ...product,
      description: `${product.description} (Essentiel)`
    };
  }).filter((p): p is Product => p !== null);

  // Récupérer les produits mentionnés dans la routine
  const routineProducts = new Set<string>();
  Object.values(customRoutine).forEach(step => {
    if (step && Array.isArray(step.products)) {
      step.products.forEach(productId => {
        // Vérifier si le produit existe avant de l'ajouter
        const product = allProducts.find(p => p.id === productId);
        if (product) {
          routineProducts.add(productId);
        } else {
          console.warn(`Produit de routine non trouvé : ${productId}`);
        }
      });
    }
  });

  // Obtenir les produits de la routine (en excluant les essentiels qui sont déjà inclus)
  const routineProductsList = Array.from(routineProducts)
    .filter(id => !ESSENTIAL_PRODUCTS.includes(id))
    .map(id => {
      const product = allProducts.find(p => p.id === id);
      if (!product) {
        console.warn(`Produit non trouvé lors de la création de la liste : ${id}`);
        return null;
      }
      return product;
    })
    .filter((p): p is Product => p !== null)
    .sort((a, b) => {
      const typeOrderDiff = (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99);
      if (typeOrderDiff !== 0) return typeOrderDiff;
      return a.name.localeCompare(b.name);
    });

  // Combiner tous les produits en s'assurant que les produits de la routine sont inclus
  const allRecommendedProducts = [...essentialProducts, ...routineProductsList];

  // Limiter à 8 produits maximum tout en gardant les produits essentiels
  const maxRoutineProducts = 8 - essentialProducts.length;
  const finalProducts = [
    ...essentialProducts,
    ...routineProductsList.slice(0, maxRoutineProducts)
  ];

  // Log du nombre de produits
  console.log('Nombre de produits essentiels :', essentialProducts.length);
  console.log('Nombre de produits de routine :', routineProductsList.length);
  console.log('Produits essentiels :', essentialProducts.map(p => p.id));
  console.log('Produits de routine :', routineProductsList.map(p => p.id));

  // Vérification finale
  if (finalProducts.some(p => !p || !p.image)) {
    console.error('Produits invalides détectés :', finalProducts);
  }

  return finalProducts;
};

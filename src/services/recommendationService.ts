import { SkinType, SkinCondition, Product, TexturePreference } from "../types/skincare";
import { generateRoutine } from "../data/skinRoutines";
import { skinProducts } from "../data/products";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  textures?: TexturePreference[];
}

// Ordre logique des produits dans la routine
const PRODUCT_TYPE_ORDER = {
  "Nettoyant": 1,
  "Tonique": 2,
  "Sérum": 3,
  "Traitement": 4,
  "Masque": 5,
  "Hydratant": 6
};

// Produits essentiels par type de peau
const ESSENTIAL_PRODUCTS = {
  "default": [
    "huile-nettoyante",    // Nettoyant de base universel
    "eau-neroli-enrichie", // Tonique essentiel
    "gel-aloes"            // Hydratant universel
  ],
  "Acnéique": [
    "huile-nettoyante",    // Nettoyant adapté
    "eau-neroli-enrichie", // Tonique apaisant
    "gel-sebo",            // Hydratant spécifique
    "exfopur"              // Traitement exfoliant
  ],
  "Sensible": [
    "huile-nettoyante",    // Nettoyant doux
    "eau-neroli-enrichie", // Tonique apaisant
    "gel-apaisant"         // Hydratant calmant
  ]
};

// Produits spécifiques par condition avec leurs descriptions
const CONDITION_SPECIFIC_PRODUCTS = {
  "Rougeurs": {
    products: ["formule-apaisante", "eau-camomille"],
    description: "Formules apaisantes pour calmer les rougeurs"
  },
  "Eczéma": {
    products: ["formule-eczema", "baume-apaisant"],
    description: "Soins spécifiques pour l'eczéma"
  },
  "Acné": {
    products: ["dermopur-acne", "exfopur"],
    description: "Traitement purifiant anti-acné"
  },
  "Taches": {
    products: ["claripro", "lotion-aha"],
    description: "Soins éclaircissants anti-taches"
  },
  "Déshydratation": {
    products: ["hydrogel", "mousseline-kukui"],
    description: "Soins ultra-hydratants"
  }
};

// Produits exclus par type de peau
const EXCLUDED_PRODUCTS = {
  "Acnéique": ["huile-tamanu"],
  "Sensible": ["spice-scrub", "lotion-aha"]  // Éviter les produits agressifs
};

// Produits de remplacement pour les exclusions
const REPLACEMENT_PRODUCTS = {
  "Acnéique": {
    "huile-tamanu": "huile-nettoyante" // Remplacer Tamanu par l'huile nettoyante
  }
};

// Mapping des textures alternatives acceptables
const TEXTURE_ALTERNATIVES: Record<TexturePreference, TexturePreference[]> = {
  "Légère": ["Légère", "Fluide"],
  "Fluide": ["Fluide", "Légère"],
  "Crémeuse": ["Crémeuse", "Riche"],
  "Riche": ["Riche", "Crémeuse"]
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  console.log('Démarrage de la génération des recommandations...', criteria); 

  if (!criteria?.skinType) {
    console.error('Critères invalides pour les recommandations');
    return [];
  }

  const allProducts = Object.values(skinProducts);
  if (!allProducts?.length) {
    console.error('Aucun produit disponible');
    return [];
  }

  // Collecter les IDs de produits
  const productIds = new Set<string>();

  // 1. Ajouter les produits essentiels selon le type de peau
  const essentialProducts = ESSENTIAL_PRODUCTS[criteria.skinType] || ESSENTIAL_PRODUCTS.default;
  essentialProducts.forEach(id => productIds.add(id));

  // 2. Ajouter les produits de la routine personnalisée
  const customRoutine = generateRoutine(criteria.skinType, criteria.conditions);
  if (customRoutine) {
    Object.values(customRoutine).forEach(step => {
      if (step?.products) {
        step.products.forEach(id => {
          if (!EXCLUDED_PRODUCTS[criteria.skinType]?.includes(id)) {
            productIds.add(id);
          } else {
            // Si le produit est exclu, ajouter son remplaçant
            const replacement = REPLACEMENT_PRODUCTS[criteria.skinType]?.[id];
            if (replacement) {
              productIds.add(replacement);
              console.log(`Produit ${id} remplacé par ${replacement}`);
            }
          }
        });
      }
    });
  }

  // 3. Ajouter les produits spécifiques pour chaque condition
  criteria.conditions.forEach(condition => {
    const conditionProducts = CONDITION_SPECIFIC_PRODUCTS[condition]?.products;
    if (conditionProducts) {
      conditionProducts.forEach(id => {
        if (!EXCLUDED_PRODUCTS[criteria.skinType]?.includes(id)) {
          productIds.add(id);
          console.log(`Ajout du produit spécifique ${id} pour ${condition}`);
        }
      });
    }
  });

  // Convertir les IDs en produits et appliquer les filtres finaux
  const finalProducts = Array.from(productIds)
    .map(id => {
      const product = allProducts.find(p => p.id === id);
      if (!product) {
        console.warn(`Produit non trouvé : ${id}`);
        return null;
      }
      return product;
    })
    .filter((p): p is Product => {
      if (!p) return false;

      // Vérifier la compatibilité avec le type de peau
      if (!p.skinTypes.includes(criteria.skinType)) {
        console.log(`Produit ${p.id} incompatible avec le type de peau ${criteria.skinType}`);
        return false;
      }

      // Filtrer par texture si spécifiée
      if (criteria.textures?.length) {
        const preferredTexture = criteria.textures[0];
        const acceptableTextures = TEXTURE_ALTERNATIVES[preferredTexture] || [preferredTexture];
        
        if (!acceptableTextures.includes(p.texture)) {
          console.log(`Produit ${p.id} exclu car texture ${p.texture} ne correspond pas à la préférence ${preferredTexture}`);
          
          // Exception pour les produits essentiels
          if (ESSENTIAL_PRODUCTS[criteria.skinType]?.includes(p.id) || 
              ESSENTIAL_PRODUCTS.default.includes(p.id)) {
            console.log(`Produit ${p.id} conservé car essentiel malgré texture différente`);
            return true;
          }
          
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Trier par type de produit selon l'ordre logique
      return (PRODUCT_TYPE_ORDER[a.type] || 99) - (PRODUCT_TYPE_ORDER[b.type] || 99);
    });

  console.log('Recommandations finales :', finalProducts.map(p => p.name));
  return finalProducts;
};


import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";
import { nettoyants } from "../data/products/nettoyants";
import { skinProducts } from "../data/products";
import { huiles } from "../data/products/huiles";
import { specifiques } from "../data/products/specifiques";
import { skinTypeRecommendations } from "../data/skinTypes";
import { conditionRecommendations } from "../data/conditions";

interface FilterCriteria {
  skinType: SkinType;
  conditions: SkinCondition[];
  duration: RoutineDuration;
  textures: TexturePreference[];
  noEssentialOils: boolean;
  timeOfDay?: 'morning' | 'evening';
  fragrancePreference?: string;
}

interface ScoredProduct {
  product: Product;
  score: number;
}

const ESSENTIAL_OIL_FREE_PRODUCTS = [
  'huile-jojoba',
  'creme-fraiche',
  'sublimateur',
  'gel-aloes',
  'serum-neutre',
  'mousseline-calendule'
];

const calculateProductScore = (product: Product, criteria: FilterCriteria): number => {
  let score = 0;
  let criteriaMet = 0;

  // Vérification des huiles essentielles
  if (criteria.fragrancePreference === "Sans huiles essentielles" && product.hasEssentialOils) {
    return 0;
  }

  // Vérification du type de peau
  if (product.skinTypes.includes(criteria.skinType)) {
    score += 25;
    criteriaMet++;
  }

  // Score pour les conditions de peau
  if (criteria.conditions.length > 0) {
    const matchingConditions = criteria.conditions.filter(condition => 
      product.conditions.includes(condition)
    );
    
    if (matchingConditions.length > 0) {
      score += (20 * (matchingConditions.length / criteria.conditions.length));
      criteriaMet++;
    }
  }

  // Vérification de la texture
  if (criteria.textures.includes(product.texture)) {
    score += 15;
    criteriaMet++;
  }

  // Vérification de la durée
  if (product.duration === criteria.duration) {
    score += 15;
    criteriaMet++;
  }

  // Vérification du moment de la journée
  if (criteria.timeOfDay) {
    if (product.timeOfDay === criteria.timeOfDay || product.timeOfDay === 'both') {
      score += 10;
      criteriaMet++;
    }
  }

  return criteriaMet >= 2 ? score : 0;
};

const getBestProductForCategory = (
  products: Product[], 
  criteria: FilterCriteria, 
  productType: string
): Product | null => {
  const categoryProducts = products.filter(p => p.type === productType);
  const scoredProducts = categoryProducts
    .map(product => ({
      product,
      score: calculateProductScore(product, criteria)
    }))
    .filter(sp => sp.score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredProducts.length > 0 ? scoredProducts[0].product : null;
};

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  let baseRecommendations: Product[] = [];
  let conditionAdjustments: Product[] = [];

  // Obtenir les recommandations de base selon le type de peau
  if (skinTypeRecommendations[criteria.skinType]) {
    baseRecommendations = skinTypeRecommendations[criteria.skinType].products;
  }

  // Ajouter les ajustements pour chaque condition
  criteria.conditions.forEach(condition => {
    if (condition !== "Aucune" && conditionRecommendations[condition]) {
      conditionAdjustments = [
        ...conditionAdjustments,
        ...conditionRecommendations[condition].products
      ];
    }
  });

  // Combiner les recommandations en évitant les doublons
  const combinedProducts = [...baseRecommendations];
  
  conditionAdjustments.forEach(product => {
    if (!combinedProducts.find(p => p.id === product.id)) {
      combinedProducts.push(product);
    }
  });

  // Trier les produits selon leur ordre d'utilisation
  const productTypeOrder = ["Nettoyant", "Tonique", "Sérum", "Traitement", "Masque", "Hydratant"];
  
  return combinedProducts.sort((a, b) => {
    const aIndex = productTypeOrder.indexOf(a.type);
    const bIndex = productTypeOrder.indexOf(b.type);
    return aIndex - bIndex;
  });
};

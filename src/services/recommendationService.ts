import { SkinType, SkinCondition, Product, RoutineDuration, TexturePreference } from "../types/skincare";
import { hydratants } from "../data/products/hydratants";
import { serums } from "../data/products/serums";
import { masques } from "../data/products/masques";
import { nettoyants } from "../data/products/nettoyants";
import { skinProducts } from "../data/products";
import { huiles } from "../data/products/huiles";
import { specifiques } from "../data/products/specifiques";

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

  // Prioriser les produits pour l'acné si c'est la condition sélectionnée
  if (criteria.conditions.includes("Acné") && product.conditions.includes("Acné")) {
    score += 50;
    criteriaMet++;
  }

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
  // Si la condition est Acné, retourner la routine spécifique
  if (criteria.conditions.includes("Acné")) {
    return [
      skinProducts.huileJojoba,
      skinProducts.gelAloes,
      skinProducts.eauNeroli,
      skinProducts.exfopur,
      skinProducts.gelSebo,
      skinProducts.dermopurAcne,
      skinProducts.huileTamanu,
      skinProducts.mousselineKukui
    ];
  }

  const recommendations: Product[] = [];
  
  // 1. Nettoyant
  const cleanser = getBestProductForCategory(nettoyants, criteria, "Nettoyant");
  if (cleanser) recommendations.push(cleanser);

  // 2. Sérum
  const serum = getBestProductForCategory(serums, criteria, "Sérum");
  if (serum) recommendations.push(serum);

  // 3. Hydratant
  const moisturizer = getBestProductForCategory(hydratants, criteria, "Hydratant");
  if (moisturizer) recommendations.push(moisturizer);

  // 4. Masque/Traitement (optionnel, uniquement pour le soir ou si durée ≥ 10 minutes)
  if (
    (criteria.timeOfDay === 'evening' || criteria.duration === "> 10 minutes") &&
    criteria.conditions.length > 0 &&
    criteria.conditions[0] !== "Aucune"
  ) {
    const treatment = getBestProductForCategory(masques, criteria, "Masque");
    if (treatment) recommendations.push(treatment);
  }

  return recommendations;
};

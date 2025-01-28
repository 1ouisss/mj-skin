import { SkinType, SkinCondition, RoutineDuration, TexturePreference, Product } from "../types/skincare";
import { routineRecommendations } from "../data/routines";
import { conditionRecommendations } from "../data/conditions";
import { skinProducts } from "../data/products";

interface FilterCriteria {
  skinType: SkinType;
  condition: SkinCondition;
  duration: RoutineDuration;
  texture: TexturePreference;
  noEssentialOils: boolean;
  timeOfDay?: 'morning' | 'evening';
}

export const getFilteredRecommendations = (criteria: FilterCriteria): Product[] => {
  // Commencer avec tous les produits
  let products = Object.values(skinProducts);
  let matchingCriteria = 0;

  // Filtrer par type de peau
  const skinTypeProducts = routineRecommendations[criteria.skinType].products;
  if (skinTypeProducts.length > 0) {
    products = products.filter(p => skinTypeProducts.some(sp => sp.name === p.name));
    matchingCriteria++;
  }

  // Filtrer par condition si spécifiée
  if (criteria.condition !== "Aucune" && conditionRecommendations[criteria.condition].products) {
    const conditionProducts = conditionRecommendations[criteria.condition].products || [];
    products = [...new Set([...products, ...conditionProducts])];
    matchingCriteria++;
  }

  // Appliquer le filtre de texture si spécifié
  if (criteria.texture) {
    const textureFiltered = products.filter(p => p.texture.toLowerCase() === criteria.texture.toLowerCase());
    if (textureFiltered.length > 0) {
      products = textureFiltered;
      matchingCriteria++;
    }
  }

  // Filtrer par durée de routine
  if (criteria.duration === "< 5 minutes") {
    const durationFiltered = products.filter(p => p.duration === "rapide");
    if (durationFiltered.length > 0) {
      products = durationFiltered;
      matchingCriteria++;
    }
  }

  // Filtrer par présence d'huiles essentielles
  if (criteria.noEssentialOils) {
    const noEssentialOilsProducts = products.filter(p => !p.hasEssentialOils);
    if (noEssentialOilsProducts.length > 0) {
      products = noEssentialOilsProducts;
      matchingCriteria++;
    }
  }

  // Filtrer par moment de la journée
  if (criteria.timeOfDay) {
    const timeSpecificProducts = products.filter(p => {
      if (criteria.timeOfDay === 'morning') {
        return !p.name.toLowerCase().includes('nuit');
      } else {
        return !p.name.toLowerCase().includes('jour');
      }
    });
    if (timeSpecificProducts.length > 0) {
      products = timeSpecificProducts;
      matchingCriteria++;
    }
  }

  // S'assurer qu'au moins 2 critères sont satisfaits
  if (matchingCriteria < 2) {
    console.warn('Moins de 2 critères satisfaits, retour aux recommandations par défaut du type de peau');
    return routineRecommendations[criteria.skinType].products;
  }

  // Limiter à maximum 5 produits pour éviter les routines trop longues
  return products.slice(0, 5);
};

// Fonction utilitaire pour mélanger les produits de manière aléatoire
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
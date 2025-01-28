import { SkinType, SkinCondition, RoutineDuration, TexturePreference, Product } from "../types/skincare";
import { routineRecommendations } from "../data/routines";
import { conditionRecommendations } from "../data/conditions";

export const getFilteredRecommendations = (
  skinType: SkinType,
  condition: SkinCondition,
  duration: RoutineDuration,
  texture: TexturePreference,
  noEssentialOils: boolean
): Product[] => {
  // Get base products from skin type
  let products = [...routineRecommendations[skinType].products];

  // Add condition-specific products
  if (condition !== "Aucune") {
    products = [...products, ...(conditionRecommendations[condition].products || [])];
  }

  // Filter based on preferences
  return products.filter(product => {
    // Duration filter
    if (duration === "< 5 minutes" && product.duration !== "rapide") {
      return false;
    }

    // Texture filter
    if (product.texture && product.texture !== texture.toLowerCase()) {
      return false;
    }

    // Essential oils filter
    if (noEssentialOils && product.hasEssentialOils) {
      return false;
    }

    return true;
  });
};

import skincareDb from '../data/skincare-db.json';

interface RecommendationResult {
  products: string[];
  routine: {
    Matin: string[];
    Soir: string[];
    Résultat: string;
  } | null;
}

export function getRecommendations(
  skinType: string,
  condition: string,
  concern: string,
  texturePreference: string,
  scentPreference: string
): RecommendationResult {
  try {
    const recommendation = skincareDb.SkinType[skinType]
      ?.Condition[condition]
      ?.Concern[concern]
      ?.TexturePreference[texturePreference]
      ?.ScentPreference[scentPreference];

    if (!recommendation) {
      return {
        products: [],
        routine: null
      };
    }

    return {
      products: recommendation.Products,
      routine: recommendation.Routine
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      products: [],
      routine: null
    };
  }
}

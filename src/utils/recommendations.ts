
import skincareDb from '../data/skincare-db.json';

interface RecommendationResult {
  products: string[];
  routine: {
    Matin: string[];
    Soir: string[];
    Résultat: string;
  } | null;
  error?: string;
}

export function getRecommendations(
  skinType: string,
  condition: string,
  concern: string,
  texturePreference: string,
  scentPreference: string
): RecommendationResult {
  try {
    const result = skincareDb.SkinType[skinType]
      ?.Condition[condition]
      ?.Concern[concern]
      ?.TexturePreference[texturePreference]
      ?.ScentPreference[scentPreference];

    if (!result) {
      return {
        products: [],
        routine: {
          Matin: [],
          Soir: [],
          Résultat: "Aucun résultat disponible pour cette combinaison."
        },
        error: "No matching recommendation found."
      };
    }

    return {
      products: result.Products,
      routine: result.Routine
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      products: [],
      routine: {
        Matin: [],
        Soir: [],
        Résultat: "Veuillez réessayer."
      },
      error: "An error occurred while fetching recommendations."
    };
  }
}

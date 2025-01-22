
import skincareDb from "../data/skincare-db.json";

interface Routine {
  Matin: string[];
  Soir: string[];
  Résultat: string;
}

interface RecommendationResult {
  Products: string[];
  Routine: Routine;
  error?: string;
}

export const getRecommendations = (
  skinType: string,
  condition: string,
  concern: string,
  texturePreference: string,
  scentPreference: string
): RecommendationResult => {
  try {
    // Validate inputs
    if (!skinType || !condition || !concern || !texturePreference || !scentPreference) {
      throw new Error("Missing required parameters");
    }

    const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
      ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

    if (!result) {
      return {
        error: "No matching recommendation found.",
        Products: [],
        Routine: {
          Matin: [],
          Soir: [],
          Résultat: "Aucune recommandation disponible pour cette combinaison."
        }
      };
    }

    return result;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return {
      error: "An error occurred while fetching recommendations.",
      Products: [],
      Routine: {
        Matin: [],
        Soir: [],
        Résultat: "Erreur lors du traitement des données."
      }
    };
  }
};

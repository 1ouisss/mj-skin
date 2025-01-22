
import skincareDB from "../data/skincare-db.json";

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
    const result = skincareDB?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];
    return result
      ? result
      : {
          error: "No matching recommendation found.",
          Products: [],
          Routine: {
            Matin: [],
            Soir: [],
            Résultat: "Aucune recommandation disponible pour cette combinaison."
          }
        };
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

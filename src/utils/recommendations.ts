import { 
  RecommendationResult, 
  SkinType, 
  Condition, 
  Concern,
  TexturePreference,
  ScentPreference
} from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

export const getRecommendations = (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): RecommendationResult => {
  try {
    const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
      ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

    if (!result) {
      return {
        Products: [],
        Routine: {
          Matin: [],
          Soir: [],
          Résultat: "Aucune recommandation disponible pour cette combinaison."
        },
        error: "No matching recommendation found."
      };
    }

    return result;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return {
      Products: [],
      Routine: {
        Matin: [],
        Soir: [],
        Résultat: "Une erreur est survenue lors du chargement des recommandations."
      },
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
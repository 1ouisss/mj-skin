
import { 
  RecommendationResult, 
  SkinType, 
  Condition, 
  Concern,
  TexturePreference,
  ScentPreference
} from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

const memoizedResults = new Map();

export const getRecommendations = (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): RecommendationResult => {
  console.group('[getRecommendations]');
  console.log('Input:', { skinType, condition, concern, texturePreference, scentPreference });
  try {
    const cacheKey = `${skinType}-${condition}-${concern}-${texturePreference}-${scentPreference}`;
    
    if (memoizedResults.has(cacheKey)) {
      return memoizedResults.get(cacheKey);
    }

    try {
    const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
      ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

    if (!result || !Array.isArray(result.Products) || !result.Routine) {
      console.warn('Invalid or missing recommendation data structure');
      return {
        Products: [],
        Routine: {
          Matin: ['Nettoyant doux', 'Hydratant'],
          Soir: ['Nettoyant doux', 'Hydratant'],
          Résultat: "Recommandations par défaut pour votre type de peau."
        }
      };
    }
      const defaultResult = {
        Products: [],
        Routine: {
          Matin: [],
          Soir: [],
          Résultat: "Aucune recommandation disponible pour cette combinaison."
        },
        error: "No matching recommendation found."
      };
      memoizedResults.set(cacheKey, defaultResult);
      return defaultResult;
    }

    memoizedResults.set(cacheKey, result);
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


import { 
  RecommendationResult, 
  SkinType, 
  Condition, 
  Concern,
  TexturePreference,
  ScentPreference
} from '../types/skincare';
import skincareDb from "../data/skincare-db.json";

const validateInput = (
  skinType: string,
  condition: string,
  concern: string,
  texturePreference: string,
  scentPreference: string
): boolean => {
  const validSkinTypes = ['Sèche', 'Grasse', 'Mixte', 'Sensible', 'Terne', 'Normale'];
  const validConditions = ['Acné', 'Eczéma', 'Aucune'];
  const validConcerns = ['Rides', 'Rougeurs', 'Points noirs', 'Cernes', 'Taches pigmentaires', 
                        'Boutons', 'Imperfections', 'Pores dilatés', 'Perte de fermeté'];
  const validTextures = ['Légère', 'Fluide', 'Crémeuse', 'Riche'];
  const validScents = ['Avec parfum naturel', 'Sans huiles essentielles'];

  return (
    validSkinTypes.includes(skinType) &&
    validConditions.includes(condition) &&
    validConcerns.includes(concern) &&
    validTextures.includes(texturePreference) &&
    validScents.includes(scentPreference)
  );
};

const getFallbackRecommendation = (): RecommendationResult => ({
  Products: [],
  Routine: {
    Matin: [],
    Soir: [],
    Résultat: "Aucune recommandation disponible pour cette combinaison."
  },
  error: "No matching recommendation found."
});

export const getRecommendations = (
  skinType: SkinType,
  condition: Condition,
  concern: Concern,
  texturePreference: TexturePreference,
  scentPreference: ScentPreference
): RecommendationResult => {
  try {
    if (!validateInput(skinType, condition, concern, texturePreference, scentPreference)) {
      console.error('Invalid input parameters:', { skinType, condition, concern, texturePreference, scentPreference });
      return {
        ...getFallbackRecommendation(),
        error: "Invalid input parameters"
      };
    }

    const result = skincareDb?.SkinType?.[skinType]?.Condition?.[condition]?.Concern?.[concern]
      ?.TexturePreference?.[texturePreference]?.ScentPreference?.[scentPreference];

    if (!result) {
      console.warn('No matching recommendation found:', { skinType, condition, concern, texturePreference, scentPreference });
      return getFallbackRecommendation();
    }

    // Validate result structure
    if (!Array.isArray(result.Products) || !result.Routine?.Matin || !result.Routine?.Soir) {
      console.error('Invalid result structure:', result);
      return getFallbackRecommendation();
    }

    return result;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return {
      ...getFallbackRecommendation(),
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

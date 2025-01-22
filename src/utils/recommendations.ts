import skincareDb from '../data/skincare-db.json';
import { RecommendationResult } from '../types/skincare';

export const getRecommendations = (
  skinType: string,
  conditions: string,
  concerns: string
): RecommendationResult | null => {
  console.group('[getRecommendations]');
  console.log('Input:', { skinType, conditions, concerns });

  try {
    // Try finding by skin type
    let result = null;

    if (skinType && skincareDb.skinTypes?.[skinType]) {
      result = skincareDb.skinTypes[skinType];
    }

    if (!result && conditions && skincareDb.conditions?.[conditions]) {
      result = skincareDb.conditions[conditions];
    }

    if (!result && concerns && skincareDb.concerns?.[concerns]) {
      result = skincareDb.concerns[concerns];
    }

    if (!result) {
      console.warn('No recommendations found');
      return null;
    }

    return {
      Products: result.products || [],
      Routine: {
        Matin: result.routine?.Matin || [],
        Soir: result.routine?.Soir || [],
        Résultat: result.routine?.Résultat || ''
      }
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return null;
  } finally {
    console.groupEnd();
  }
};
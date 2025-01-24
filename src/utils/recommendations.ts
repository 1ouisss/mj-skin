import { QuizAnswers, RecommendationResult, SkinType, Concern } from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

export const getRecommendations = (
  skinType: SkinType,
  conditions: string,
  concerns: Concern[]
): RecommendationResult | null => {
  console.group('[getRecommendations]');
  console.log('Input:', { skinType, conditions, concerns });

  try {
    const db = skincareDb as Record<string, any>;
    let result = null;

    if (skinType && db.skinTypes?.[skinType]) {
      result = db.skinTypes[skinType];
    }

    if (!result && conditions && db.conditions?.[conditions]) {
      result = db.conditions[conditions];
    }

    if (!result && concerns.length > 0) {
      const concernKey = concerns[0];
      if (db.concerns?.[concernKey]) {
        result = db.concerns[concernKey];
      }
    }

    if (!result) {
      console.warn('No recommendations found');
      return null;
    }

    const typedResult: RecommendationResult = {
      Products: Array.isArray(result.products) ? result.products.map((p: any) => ({
        id: String(p.id || Math.random()),
        name: String(p.name || ''),
        description: String(p.description || ''),
        usage: p.usage,
        ingredients: Array.isArray(p.ingredients) ? p.ingredients : [],
        benefits: Array.isArray(p.benefits) ? p.benefits : [],
        price: typeof p.price === 'number' ? p.price : undefined
      })) : [],
      Routine: {
        Matin: Array.isArray(result.routine?.Matin) ? result.routine.Matin : [],
        Soir: Array.isArray(result.routine?.Soir) ? result.routine.Soir : [],
        Résultat: String(result.routine?.Résultat || '')
      }
    };

    return typedResult;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return null;
  } finally {
    console.groupEnd();
  }
};
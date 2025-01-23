
import { RecommendationResult, Routine } from '../types/skincare';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRecommendationResponse = (data: any): RecommendationResult => {
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Format de réponse invalide');
    }

    if (!Array.isArray(data.Products)) {
      throw new ValidationError('Les produits doivent être une liste');
    }

    if (!data.Routine || typeof data.Routine !== 'object') {
      throw new ValidationError('Format de routine invalide');
    }

    const routine = data.Routine as Routine;
    if (!Array.isArray(routine.Matin) || !Array.isArray(routine.Soir)) {
      throw new ValidationError('La routine doit contenir les étapes du matin et du soir');
    }

    if (typeof routine.Résultat !== 'string') {
      throw new ValidationError('La routine doit contenir un résultat');
    }

    return {
      Products: data.Products,
      Routine: routine
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError('Erreur de validation des recommandations');
  }
};


import { RecommendationResult, Routine } from '../types/skincare';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRecommendationResponse = (data: any): RecommendationResult => {
  console.group('[Validator] Validating recommendation response');
  
  try {
    if (!data || typeof data !== 'object') {
      throw new ValidationError('Invalid response format');
    }

    if (!Array.isArray(data.Products)) {
      console.warn('Invalid Products array:', data.Products);
      throw new ValidationError('Products must be an array');
    }

    if (!data.Routine || typeof data.Routine !== 'object') {
      console.warn('Invalid Routine object:', data.Routine);
      throw new ValidationError('Invalid routine format');
    }

    const routine = data.Routine as Routine;
    if (!Array.isArray(routine.Matin) || !Array.isArray(routine.Soir)) {
      throw new ValidationError('Routine must contain Matin and Soir arrays');
    }

    if (typeof routine.Résultat !== 'string') {
      throw new ValidationError('Routine must contain a Résultat string');
    }

    return {
      Products: data.Products,
      Routine: routine
    };
  } catch (error) {
    console.error('[Validator] Validation failed:', error);
    throw error;
  } finally {
    console.groupEnd();
  }
};

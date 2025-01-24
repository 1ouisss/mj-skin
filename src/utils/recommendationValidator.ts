import { RecommendationResult, RecommendationResultSchema } from '../types/skincare';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRecommendationResponse = (data: unknown): RecommendationResult => {
  try {
    const parsed = RecommendationResultSchema.parse(data);
    const validated: RecommendationResult = {
      Products: parsed.Products.map(product => ({
        id: product.id || '',
        name: product.name || '',
        description: product.description || '',
        usage: product.usage,
        ingredients: product.ingredients,
        benefits: product.benefits,
        price: product.price
      })),
      Routine: {
        Matin: parsed.Routine.Matin,
        Soir: parsed.Routine.Soir,
        Résultat: parsed.Routine.Résultat
      }
    };
    return validated;
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError(`Validation error: ${error.message}`);
    }
    throw new ValidationError('Erreur de validation des recommandations');
  }
};
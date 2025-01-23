import { RecommendationResult, RecommendationResultSchema } from '../types/skincare';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateRecommendationResponse = (data: unknown): RecommendationResult => {
  try {
    const validated = RecommendationResultSchema.parse(data);
    return validated;
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError(`Validation error: ${error.message}`);
    }
    throw new ValidationError('Erreur de validation des recommandations');
  }
};
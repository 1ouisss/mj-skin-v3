
import { QuizAnswers, RecommendationResult } from '../types/skincare';
import skincareDb from '../data/skincare-db.json';

export const getRecommendations = (
  skinType: QuizAnswers['skinType'],
  conditions: QuizAnswers['conditions'],
  concerns: QuizAnswers['concerns']
): RecommendationResult | null => {
  console.group('[getRecommendations]');
  console.log('Input:', { skinType, conditions, concerns });

  try {
    let result = null;

    if (skinType && 'skinTypes' in skincareDb && skinType in skincareDb.skinTypes) {
      result = skincareDb.skinTypes[skinType];
    }

    if (!result && conditions && 'conditions' in skincareDb && conditions in skincareDb.conditions) {
      result = skincareDb.conditions[conditions];
    }

    if (!result && concerns && 'concerns' in skincareDb && concerns in skincareDb.concerns) {
      result = skincareDb.concerns[concerns];
    }

    if (!result) {
      console.warn('No recommendations found');
      return null;
    }

    const typedResult: RecommendationResult = {
      Products: result.products || [],
      Routine: {
        Matin: result.routine?.Matin || [],
        Soir: result.routine?.Soir || [],
        Résultat: result.routine?.Résultat || ''
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

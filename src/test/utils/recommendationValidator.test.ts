
import { describe, it, expect } from 'vitest';
import { validateRecommendationResponse, ValidationError } from '../../utils/recommendationValidator';

describe('recommendationValidator', () => {
  it('validates correct recommendation data', () => {
    const validData = {
      Products: ['Cleanser', 'Moisturizer'],
      Routine: {
        Matin: ['Step 1', 'Step 2'],
        Soir: ['Step 1', 'Step 2'],
        Résultat: 'Expected results'
      }
    };
    
    expect(() => validateRecommendationResponse(validData)).not.toThrow();
  });

  it('throws ValidationError for invalid data', () => {
    const invalidData = {
      Products: 'not an array'
    };
    
    expect(() => validateRecommendationResponse(invalidData))
      .toThrow(ValidationError);
  });
});

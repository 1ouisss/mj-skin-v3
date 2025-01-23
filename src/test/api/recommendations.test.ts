
import { describe, it, expect, vi } from 'vitest';
import { getRecommendations } from '../../utils/recommendations';

describe('Recommendations API', () => {
  it('returns recommendations for valid inputs', () => {
    const result = getRecommendations('sèche', 'acné', 'taches brunes');
    expect(result).toBeTruthy();
    expect(result?.Products).toBeDefined();
    expect(Array.isArray(result?.Products)).toBe(true);
  });

  it('handles missing parameters gracefully', () => {
    const result = getRecommendations('sèche', '', '');
    expect(result).toBeTruthy();
  });

  it('returns null for invalid inputs', () => {
    const result = getRecommendations('invalid', 'invalid', 'invalid');
    expect(result).toBeNull();
  });
});

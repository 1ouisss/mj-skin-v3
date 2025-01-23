
import { RecommendationResult } from '../types/skincare';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: RecommendationResult;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export const cacheRecommendation = (key: string, data: RecommendationResult) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const getCachedRecommendation = (key: string): RecommendationResult | null => {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return entry.data;
};

export const clearCache = () => cache.clear();

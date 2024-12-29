import { useState, useEffect } from 'react';
import { RecommendationEngine } from '../services/recommendations/RecommendationEngine';

export function useRecommendations(userId) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const engine = new RecommendationEngine();

    async function fetchRecommendations() {
      try {
        setLoading(true);
        const data = await engine.generateRecommendations(userId);
        if (mounted) setRecommendations(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchRecommendations();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { recommendations, loading, error };
}
import { useState, useEffect } from 'react';
import { getEmissionsHistory } from '../services/api/emissionsApi';

export function useEmissionsData(userId, timeframe) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const emissions = await getEmissionsHistory(userId, timeframe);
        if (mounted) setData(emissions);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [userId, timeframe]);

  return { data, loading, error };
}
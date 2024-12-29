import { useState, useEffect } from 'react';
import { sendTrackingData } from '../../../services/api/transportApi';
import { getTrackingData, clearTrackingData } from '../utils/storage';

export function useTransportSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [error, setError] = useState(null);

  async function syncData() {
    try {
      setIsSyncing(true);
      setError(null);

      const localData = await getTrackingData();
      if (localData.length === 0) return;

      await sendTrackingData(localData);
      await clearTrackingData();
      
      setLastSyncTime(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSyncing(false);
    }
  }

  // Auto-sync every 15 minutes if there's data
  useEffect(() => {
    const interval = setInterval(syncData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { isSyncing, lastSyncTime, error, syncData };
}
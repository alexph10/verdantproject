import { supabase } from '../config/supabaseClient';

export class DatabaseService {
  async saveEmissionsData(data) {
    try {
      const { error } = await supabase
        .from('emissions_data')
        .insert({
          user_id: data.userId,
          type: data.type,
          emissions: data.emissions,
          raw_data: data.rawData,
          timestamp: data.timestamp,
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving emissions data:', error);
      throw error;
    }
  }

  async getUserEmissions(userId, timeframe) {
    try {
      const { data, error } = await supabase
        .from('emissions_data')
        .select('*')
        .eq('user_id', userId)
        .gte('timestamp', timeframe.start)
        .lte('timestamp', timeframe.end)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching emissions data:', error);
      throw error;
    }
  }
}
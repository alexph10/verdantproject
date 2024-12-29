import { supabase } from '../config/supabaseClient';

export async function saveEmissionsData(data) {
  try {
    const { data: result, error } = await supabase
      .from('emissions_data')
      .insert({
        user_id: data.userId,
        type: data.type,
        emissions: data.emissions,
        metadata: data.metadata,
      });

    if (error) throw error;
    return result;
  } catch (error) {
    console.error('Error saving emissions data:', error);
    throw error;
  }
}

export async function getEmissionsHistory(userId, timeframe) {
  try {
    const { data, error } = await supabase
      .from('emissions_data')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', timeframe.start)
      .lte('created_at', timeframe.end)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching emissions history:', error);
    throw error;
  }
}
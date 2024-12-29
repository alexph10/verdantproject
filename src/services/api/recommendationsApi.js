import { supabase } from '../config/supabaseClient';

export async function getUserRecommendations(userId) {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .order('impact', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

export async function updateRecommendationStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating recommendation:', error);
    throw error;
  }
}
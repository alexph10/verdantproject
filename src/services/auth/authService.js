import { supabase } from '../config/supabaseClient';

export async function signUp({ email, password }) {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn({ email, password }) {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
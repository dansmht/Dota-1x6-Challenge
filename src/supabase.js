import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signInWithGoogle = () => {
  return supabase.auth.signIn({
    provider: 'google',
  });
};

export const signOut = () => {
  return supabase.auth.signOut();
};

export const getUser = () => {
  return supabase.auth.user();
};

export const filterUserData = (user) => {
  if (!user) return null;

  return { id: user.id, email: user.email };
};

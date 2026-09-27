import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const isConfigured = Boolean(
  supabaseUrl
  && supabasePublishableKey
  && supabaseUrl !== 'YOUR_SUPABASE_URL'
  && supabasePublishableKey !== 'YOUR_SUPABASE_PUBLISHABLE_KEY'
);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

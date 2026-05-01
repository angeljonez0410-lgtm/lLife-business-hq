import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual anon/public key
const supabaseUrl = 'https://deturuqwdmvveiwsmtvq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

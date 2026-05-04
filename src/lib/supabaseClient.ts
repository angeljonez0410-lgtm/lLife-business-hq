import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual anon/public key
const supabaseUrl = 'https://deturuqwdmvveiwsmtvq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldHVydXF3ZG12dmVpd3NtdHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDEzODAsImV4cCI6MjA5MzE3NzM4MH0.RzxseKNuF_rxX719WQY4R-PYI-FNbwasF3ShZJQu0dU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Temporary: Allow app to run without real Supabase credentials for visual testing
// TODO: Add real credentials from https://supabase.com/dashboard
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.warn('⚠️ Using placeholder Supabase config. Forms will not work until you add real credentials.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_key'
);

export type ContractorApplication = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip_code: string;
  trade_specialty: string;
  years_in_business: number;
  annual_revenue_range: string;
  team_size: number;
  licensed: boolean;
  insured: boolean;
  website_url?: string;
  why_partner: string;
  referral_source?: string;
  notes?: string;
};

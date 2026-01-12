/*
  # Create Contractor Applications System

  ## Overview
  This migration creates the foundation for Elite Service Hub's contractor partner acquisition system,
  enabling the capture, tracking, and management of contractor applications for the performance-based
  partnership program.

  ## New Tables
  
  ### `contractor_applications`
  Stores all contractor interest and application data from the partner portal.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each application
  - `created_at` (timestamptz) - Timestamp of application submission
  - `updated_at` (timestamptz) - Last modification timestamp
  - `status` (text) - Application status: 'new', 'reviewing', 'approved', 'rejected', 'partner'
  - `company_name` (text) - Legal business name
  - `contact_name` (text) - Primary contact person
  - `email` (text) - Business email address
  - `phone` (text) - Business phone number
  - `city` (text) - Primary service area city
  - `state` (text) - Primary service area state
  - `zip_code` (text) - Primary service area ZIP
  - `trade_specialty` (text) - Primary trade (Kitchen Remodeling, Bathroom Remodeling, etc.)
  - `years_in_business` (integer) - Years of operational experience
  - `annual_revenue_range` (text) - Revenue bracket indicator
  - `team_size` (integer) - Number of employees/crew members
  - `licensed` (boolean) - Whether properly licensed
  - `insured` (boolean) - Whether properly insured
  - `website_url` (text, optional) - Existing business website
  - `why_partner` (text) - Why they want to partner with ESH
  - `referral_source` (text, optional) - How they heard about ESH
  - `notes` (text, optional) - Internal admin notes

  ## Security
  - RLS enabled on all tables
  - Public can insert applications (lead capture)
  - Only authenticated ESH admins can read/update applications

  ## Important Notes
  1. Applications are publicly insertable to allow contractor signup without auth
  2. All viewing and management requires authentication (future admin panel)
  3. Status workflow: new → reviewing → approved/rejected → partner
*/

-- Create contractor_applications table
CREATE TABLE IF NOT EXISTS contractor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'approved', 'rejected', 'partner')),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  trade_specialty text NOT NULL,
  years_in_business integer NOT NULL CHECK (years_in_business >= 0),
  annual_revenue_range text NOT NULL,
  team_size integer NOT NULL CHECK (team_size > 0),
  licensed boolean DEFAULT false,
  insured boolean DEFAULT false,
  website_url text,
  why_partner text NOT NULL,
  referral_source text,
  notes text
);

-- Enable RLS
ALTER TABLE contractor_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert applications (contractor signup)
CREATE POLICY "Anyone can submit contractor application"
  ON contractor_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users (future admins) can view all applications
CREATE POLICY "Authenticated users can view applications"
  ON contractor_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update applications
CREATE POLICY "Authenticated users can update applications"
  ON contractor_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for status filtering (admin dashboard queries)
CREATE INDEX IF NOT EXISTS idx_contractor_applications_status 
  ON contractor_applications(status);

-- Create index for created_at (chronological queries)
CREATE INDEX IF NOT EXISTS idx_contractor_applications_created 
  ON contractor_applications(created_at DESC);

-- Create index for email lookups (duplicate checking)
CREATE INDEX IF NOT EXISTS idx_contractor_applications_email 
  ON contractor_applications(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_contractor_applications_updated_at ON contractor_applications;
CREATE TRIGGER update_contractor_applications_updated_at
  BEFORE UPDATE ON contractor_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
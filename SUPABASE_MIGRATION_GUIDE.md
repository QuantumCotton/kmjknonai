# Supabase Migration Guide for KMJK Dashboard

## Overview
This guide outlines the steps to migrate the Dashboard from localStorage to Supabase for real-time CRUD operations across multiple devices.

## Prerequisites
- Supabase account (free tier works)
- Supabase Project URL and Anon Key
- Node.js and npm installed

## Step 1: Install Supabase Client
```bash
cd kmjknonai
npm install @supabase/supabase-js
```

## Step 2: Create Tables in Supabase
Run the following SQL in your Supabase SQL Editor:

### Jobs Table
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT,
  client_name TEXT,
  client_email TEXT,
  client_phone TEXT,
  job_type TEXT,
  description TEXT,
  status TEXT DEFAULT 'lead',
  location TEXT,
  budget NUMERIC,
  estimated_completion DATE,
  tags TEXT[],
  notes JSONB DEFAULT '[]'::jsonb,
  ai_summary TEXT,
  files TEXT[],
  photos TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tags table for centralized tag management
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0,
  color TEXT DEFAULT 'bg-gray-100 text-gray-800',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- For MVP: Allow public read/write access (update for production with auth)
CREATE POLICY "Public read access for jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public insert access for jobs" ON jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for jobs" ON jobs FOR UPDATE USING (true);
CREATE POLICY "Public delete access for jobs" ON jobs FOR DELETE USING (true);

CREATE POLICY "Public read access for tags" ON tags FOR SELECT USING (true);
CREATE POLICY "Public insert access for tags" ON tags FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for tags" ON tags FOR UPDATE USING (true);
CREATE POLICY "Public delete access for tags" ON tags FOR DELETE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_client_name ON jobs(client_name);
CREATE INDEX idx_jobs_company ON jobs(company);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_tags_label ON tags(label);

-- Enable realtime for jobs table
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;
```

## Step 3: Configure Environment Variables
Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Real-Time Features
The new implementation includes:
- Automatic real-time updates when jobs change
- Instant synchronization across all connected devices
- No more data silos
- Persistent cloud storage

## Step 5: Testing
1. Open dashboard on one device
2. Open dashboard on another device (or different browser)
3. Create/edit a job on one device
4. Watch it appear instantly on the other device

## Security Note (Production)
For production, replace the public policies with user authentication:
- Implement Supabase Auth
- Create user roles (admin, worker, etc.)
- Update RLS policies to check user_id

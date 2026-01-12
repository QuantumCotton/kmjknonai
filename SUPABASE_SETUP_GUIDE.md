# Supabase Setup Guide for KMJK Dashboard

## Quick Start

### Step 1: Install Supabase Client
```bash
cd kmjknonai
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/log in to your account
3. Click "New Project"
4. Fill in the details:
   - Name: `kmjk-dashboard`
   - Database Password: (save this securely!)
   - Region: Choose closest to your users (e.g., US East)
5. Click "Create new project" (wait 1-2 minutes for setup)

### Step 3: Get Your Credentials
1. Once your project is ready, go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxxxxx.supabase.co`)
   - **anon/public** key (the long string)

### Step 4: Configure Environment Variables
Open `kmjknonai/.env` and update these lines:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important:** Do not commit your `.env` file to version control!

### Step 5: Create Database Tables
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste the following SQL and run it:

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

### Step 6: Verify Realtime is Enabled
1. In Supabase dashboard, go to **Database** > **Replication**
2. Make sure the `jobs` table has "Realtime" enabled
3. Click the toggle if it's not already on

### Step 7: Test the Application
```bash
npm run dev
```

Navigate to your Dashboard page and:
1. Add a new job
2. Edit an existing job
3. Add a note
4. Change the status

**Test Real-Time Sync:**
1. Open the dashboard in two different browsers
2. Add/edit a job in one browser
3. Watch it appear instantly in the other browser!

## Troubleshooting

### Error: "Missing Supabase environment variables"
**Solution:** Make sure you've added `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env` file and restarted the dev server.

### Error: "Failed to load data"
**Solution:** 
1. Check your Supabase URL and API key are correct
2. Verify the tables were created successfully in the Supabase dashboard
3. Check the browser console for specific error messages

### Real-time updates not working
**Solution:**
1. Go to Database > Replication in Supabase dashboard
2. Verify Realtime is enabled for the `jobs` table
3. Check browser console for WebSocket connection errors

### Jobs not appearing
**Solution:**
1. Check the Table Editor in Supabase dashboard
2. Verify data is being saved to the database
3. Check browser console for errors

## Advanced: Adding Authentication (Production)

For production use, replace the public policies with authenticated access:

```sql
-- Enable Supabase Auth
-- Create auth.users table automatically when you enable auth

-- Update RLS policies to require authentication
DROP POLICY IF EXISTS "Public read access for jobs" ON jobs;
DROP POLICY IF EXISTS "Public insert access for jobs" ON jobs;
DROP POLICY IF EXISTS "Public update access for jobs" ON jobs;
DROP POLICY IF EXISTS "Public delete access for jobs" ON jobs;

CREATE POLICY "Users can read all jobs" ON jobs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can create jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own jobs" ON jobs FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete own jobs" ON jobs FOR DELETE USING (auth.uid() = created_by);

-- Add created_by column to jobs table
ALTER TABLE jobs ADD COLUMN created_by UUID REFERENCES auth.users(id);
```

## Database Schema Reference

### Jobs Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| company | TEXT | Company name |
| client_name | TEXT | Client name |
| client_email | TEXT | Client email |
| client_phone | TEXT | Client phone |
| job_type | TEXT | Type of job |
| description | TEXT | Job description |
| status | TEXT | Job status (lead, estimating, etc.) |
| location | TEXT | Project location |
| budget | NUMERIC | Estimated budget |
| estimated_completion | DATE | Expected completion date |
| tags | TEXT[] | Array of tags |
| notes | JSONB | Array of note objects |
| ai_summary | TEXT | AI-generated summary |
| files | TEXT[] | Array of file paths |
| photos | TEXT[] | Array of photo URLs |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### Tags Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| label | TEXT | Tag label (unique) |
| count | INTEGER | Number of jobs with this tag |
| color | TEXT | Badge color class |
| created_at | TIMESTAMPTZ | Creation timestamp |

## Testing Checklist

- [ ] Supabase client installed
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] Realtime enabled
- [ ] Can add a job
- [ ] Can edit a job
- [ ] Can delete a job
- [ ] Can add notes
- [ ] Can add tags
- [ ] Real-time sync works across browsers
- [ ] Loading states work correctly
- [ ] Error handling works

## Next Steps

1. **Migrate Existing Data:** If you have existing jobs in localStorage, create a script to migrate them to Supabase
2. **Add Authentication:** Implement Supabase Auth for secure access
3. **File Uploads:** Configure Supabase Storage for photo uploads
4. **Backup:** Set up automated database backups in Supabase

## Support

- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Dashboard Issues: Check `SUPABASE_MIGRATION_GUIDE.md` for more details
- Database Issues: Use Supabase SQL Editor to inspect data directly

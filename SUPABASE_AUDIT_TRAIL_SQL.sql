-- Audit Trail SQL for History & Restore Functionality
-- Run this in Supabase SQL Editor

-- Create audit_log table to track all changes
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete', 'restore')),
  user_id TEXT DEFAULT 'system',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  old_data JSONB,
  new_data JSONB,
  client_name TEXT, -- Denormalized for easier queries
  company TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_log_job_id ON audit_log(job_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_client_name ON audit_log(client_name);

-- Enable Row Level Security
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies (public access for MVP)
CREATE POLICY "Public read access for audit_log" ON audit_log FOR SELECT USING (true);
CREATE POLICY "Public insert access for audit_log" ON audit_log FOR INSERT WITH CHECK (true);

-- Create function to automatically log job changes
CREATE OR REPLACE FUNCTION log_job_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (job_id, action, new_data, client_name, company)
    VALUES (NEW.id, 'create', row_to_json(NEW), NEW.client_name, NEW.company);
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (job_id, action, old_data, new_data, client_name, company)
    VALUES (NEW.id, 'update', row_to_json(OLD), row_to_json(NEW), NEW.client_name, NEW.company);
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (job_id, action, old_data, client_name, company)
    VALUES (OLD.id, 'delete', row_to_json(OLD), OLD.client_name, OLD.company);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic logging
DROP TRIGGER IF EXISTS jobs_audit_trigger ON jobs;
CREATE TRIGGER jobs_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON jobs
FOR EACH ROW EXECUTE FUNCTION log_job_changes();

-- Create function to restore deleted jobs
CREATE OR REPLACE FUNCTION restore_job(job_uuid UUID)
RETURNS UUID AS $$
DECLARE
  restored_id UUID;
BEGIN
  -- Get the latest delete record for this job
  INSERT INTO jobs (
    id, company, client_name, client_email, client_phone, 
    job_type, description, status, location, budget, 
    estimated_completion, tags, notes, ai_summary, 
    files, photos
  )
  SELECT 
    id, company, client_name, client_email, client_phone,
    job_type, description, status, location, budget,
    estimated_completion, tags, notes, ai_summary,
    files, photos
  FROM (
    SELECT old_data 
    FROM audit_log 
    WHERE job_id = job_uuid AND action = 'delete'
    ORDER BY timestamp DESC
    LIMIT 1
  ) AS latest_delete;
  
  -- Log the restore action
  INSERT INTO audit_log (job_id, action, new_data, client_name, company)
  SELECT 
    id, 'restore', row_to_json(jobs.*), client_name, company
  FROM jobs
  WHERE jobs.id = job_uuid;
  
  RETURN job_uuid;
END;
$$ LANGUAGE plpgsql;

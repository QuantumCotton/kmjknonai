# History Feature Setup Guide

## Problem
The History page requires an `audit_log` table in Supabase that doesn't exist yet. This causes the error:
```
Could not find the table 'public.audit_log' in the schema cache
```

## Solution
You need to run the SQL script to create the audit_log table and set up automatic triggers.

## Step-by-Step Instructions

### 1. Open Supabase Dashboard
- Go to [supabase.com](https://supabase.com)
- Sign in to your account
- Select your project

### 2. Open SQL Editor
- In the left sidebar, click on "SQL Editor"
- Click "New query" to create a new SQL script

### 3. Run the Setup Script
- Open the file `SUPABASE_AUDIT_TRAIL_SQL.sql` in your project
- Copy the entire SQL script
- Paste it into the SQL Editor
- Click "Run" to execute the script

### 4. Verify the Setup
After running the script, verify the setup:

**Check the audit_log table:**
- Go to "Table Editor" in the left sidebar
- Look for `audit_log` table
- Click on it to see the structure

**Check the triggers:**
- Go to "Database" → "Triggers"
- You should see `jobs_audit_trigger` listed

**Check the functions:**
- Go to "Database" → "Functions"
- You should see:
  - `log_job_changes()` - Logs all job changes
  - `restore_job(job_uuid UUID)` - Restores deleted jobs

## What the Script Does

### Creates the audit_log Table
```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  action TEXT (create/update/delete/restore),
  user_id TEXT,
  timestamp TIMESTAMPTZ,
  old_data JSONB,
  new_data JSONB,
  client_name TEXT,
  company TEXT
);
```

### Sets Up Automatic Logging
Every time a job is created, updated, or deleted, the trigger automatically logs:
- **Create**: New job details in `new_data`
- **Update**: Old values in `old_data`, new values in `new_data`
- **Delete**: Deleted job details in `old_data`

### Enables Restore Functionality
The `restore_job()` function allows you to:
1. Restore a deleted job from the audit log
2. Automatically create a "restore" action entry
3. Keep complete history of all changes

## Testing the Setup

### 1. Create a Test Job
1. Go to the Dashboard
2. Click "Add Job"
3. Fill in the form and submit
4. Go to History page
5. You should see a "Created" entry

### 2. Update a Job
1. Go to Dashboard
2. Edit an existing job (change status or description)
3. Go to History page
4. You should see an "Updated" entry showing the changes

### 3. Delete and Restore a Job
1. Go to Dashboard
2. Delete a job
3. Go to History page
4. You should see a "Deleted" entry with a "Restore" button
5. Click "Restore"
6. The job should reappear in Dashboard
7. Go to History page
8. You should see a "Restored" entry

## Troubleshooting

### Error: "Table not found"
**Cause**: The SQL script wasn't run or failed

**Solution**:
1. Go to SQL Editor
2. Re-run the script from `SUPABASE_AUDIT_TRAIL_SQL.sql`
3. Check for any error messages in the output
4. Verify the table exists in Table Editor

### Error: "Permission denied"
**Cause**: RLS policies are too restrictive

**Solution**: The script should have created these policies:
- `Public read access for audit_log` - Allows reading
- `Public insert access for audit_log` - Allows creating entries

If you still get permission errors, run this in SQL Editor:
```sql
DROP POLICY IF EXISTS "Public read access for audit_log" ON audit_log;
DROP POLICY IF EXISTS "Public insert access for audit_log" ON audit_log;

CREATE POLICY "Public read access for audit_log" ON audit_log 
  FOR SELECT USING (true);

CREATE POLICY "Public insert access for audit_log" ON audit_log 
  FOR INSERT WITH CHECK (true);
```

### History page shows "No history found"
**Cause**: No jobs have been created/updated/deleted since the table was created

**Solution**:
1. Create a new job in Dashboard
2. Make some updates
3. Delete and restore a job
4. Refresh the History page

## Security Considerations

### For Production Use
The current setup uses public access for simplicity. For production:

1. **Add Authentication**
   - Implement Supabase Auth
   - Update RLS policies to check user authentication
   ```sql
   CREATE POLICY "Authenticated users can read" ON audit_log
     FOR SELECT USING (auth.uid() IS NOT NULL);
   
   CREATE POLICY "System can insert" ON audit_log
     FOR INSERT WITH CHECK (auth.role() = 'service_role');
   ```

2. **Track Actual Users**
   - Update the trigger to use `auth.uid()` instead of 'system'
   ```sql
   INSERT INTO audit_log (..., user_id, ...)
   VALUES (..., auth.uid(), ...);
   ```

3. **Add Data Retention**
   - Add a function to clean up old audit logs
   - Consider keeping logs for 1-2 years only

## Features Enabled by This Setup

✅ **Complete Job History** - Track all changes to jobs
✅ **Change Tracking** - See before/after values for updates
✅ **Restore Deleted Jobs** - Recover accidentally deleted jobs
✅ **Audit Trail** - Compliance and accountability
✅ **Filter by Action** - View only creates, updates, or deletes
✅ **Automatic Logging** - No manual entry required

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify Supabase project status
3. Check that the audit_log table exists
4. Review the SQL execution logs in Supabase
5. Ensure your environment variables are set correctly

## Next Steps

After setting up the audit_log table:
1. Test creating, updating, and deleting jobs
2. Verify the History page shows entries
3. Test the restore functionality
4. Customize the retention policy if needed
5. Add user authentication for production use

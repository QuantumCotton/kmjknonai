# FIX BROKEN IMAGES (2 Minutes)

You successfully fixed the "Upload" error (that's why the images appear now!). 
The reason they look like broken icons is because the "View" permission is not set yet.

## 1. Make Bucket Public (Crucial)
1. Go to [Supabase Storage](https://supabase.com/dashboard/project/_/storage/buckets).
2. Find `kmjk-photos`.
3. Click the **three dots (...)** next to it -> **Edit Bucket**.
4. **Public Bucket:** Turn this **ON** (Green).
5. Click **Save**.

## 2. Add "View" Permission
1. Click **Configuration** (or Policies) tab.
2. Click **New Policy** under `kmjk-photos`.
3. Select **"For full customization"**.
4. Fill this in:
   - **Policy Name:** `Allow viewing`
   - **Allowed Operation:** CHECK the box for **SELECT** (Very important!)
   - **Target roles:** CHECK **anon** AND **authenticated**.
   - **Policy definition:** `bucket_id = 'kmjk-photos'`
5. Click **Save**.

## 3. Refresh Website
Reload your dashboard. The images will appear!

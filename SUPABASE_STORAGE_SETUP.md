# Supabase Storage Setup for KMJK Photos

This guide walks you through creating a storage bucket for the KMJK Dashboard photo uploads.

## IMPORTANT: Bucket Name
Your bucket is named: **`KMJK-PHOTOS`** (uppercase with hyphen)

The website will automatically detect your bucket name, but if you need to create a new one, use exactly this name.

## 1. Create the Bucket (if not already created)
1. Go to your Supabase project dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on **Storage** in the left sidebar (icon looks like a box/archive).
3. Click **New Bucket**.
4. Enter the name: `KMJK-PHOTOS` (uppercase)
5. **IMPORTANT:** Toggle "Public Bucket" to **ON**.
   - This allows the images to be viewed in the app.
6. Click **Save**.

## 2. Configure Policies (Permissions)
1. In the Storage page, verify `KMJK-PHOTOS` is listed with a "PUBLIC" badge.
2. Click the bucket name, then click **Policies** tab.
3. You need to allow uploads. Click **New Policy**.
4. Choose **"For full customization"** (or "Get started quickly").
5. Create a policy for **INSERT** (Uploads):
   - **Name:** Type `Allow public uploads`
   - **Allowed operations:** Check the box next to **INSERT**
   - **Target roles:** Check the boxes for **anon** and **authenticated** (or select them from the list)
6. Click **Review** and **Save**.
   
   *(Note: For better security later, restrict this to authenticated users, but for now this matches the current setup).*

## 3. Verify
That's it! The app is already updated to look for this bucket.
Go to your Dashboard, click "Add Job" or open a job, and try uploading a photo.

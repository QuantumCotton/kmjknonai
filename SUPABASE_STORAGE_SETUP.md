# Supabase Storage Setup (Required for Image Uploads)

Since we are switching from Cloudinary to Supabase for images, you need to create a **Storage Bucket** in your Supabase dashboard.

## 1. Create the Bucket
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click on **Storage** in the left sidebar (icon looks like a box/archive).
3. Click **New Bucket**.
4. Enter the name: `kmjk-photos`
5. **IMPORTANT:** Toggle "Public Bucket" to **ON**.
   - This allows the images to be viewed in the app.
6. Click **Save**.

## 2. Configure Policies (Permissions)
1. In the Storage page, verify `kmjk-photos` is listed.
2. Click the **Configuration** tab (or "Policies").
3. You need to allow uploads. Click **New Policy** under `kmjk-photos`.
4. Choose **"For full customization"** (or "Get started quickly").
5. Create a policy for **INSERT** (Uploads):
   - **Name:** Type `Allow public uploads`
   - **Allowed operations:** Check the box next to **INSERT**
   - **Target roles:** Check the boxes for **anon** and **authenticated** (or select them from the list)
   - Click **Review** and **Save**.
   
   *(Note: For better security later, restrict this to authenticated users, but for now this matches the current setup).*

## 3. Verify
That's it! The app is already updated to look for this bucket.
Go to your Dashboard, click "Add Job" or open a job, and try uploading a photo.

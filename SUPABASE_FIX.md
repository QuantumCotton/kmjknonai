# Fix Broken Images (Permissions)

If your images are showing as broken icons, it means the "Public" setting is off or the permissions are too strict.

## 1. Enable Public Access (Crucial)
1. Go to **Supabase Dashboard** > **Storage**.
2. Look at your `kmjk-photos` bucket.
3. On the right side of the bucket name, click the **three dots (...)** and select **Edit Bucket**.
4. **Public Bucket:** Turn this **ON** (Toggle should be green/active).
5. Click **Save**.

## 2. Add "View" Permission
Even if it's public, sometimes we need to explicitly allow viewing.

1. Click on the **Configuration** tab (or "Policies") in Storage.
2. Under `kmjk-photos`, click **New Policy**.
3. Select **"For full customization"**.
4. **Name:** Type `Allow public viewing`
5. **Allowed operations:** Check **SELECT**.
6. **Target roles:** Check **anon** and **authenticated**.
7. **Policy definition:**
   ```sql
   bucket_id = 'kmjk-photos'
   ```
8. Click **Review** and **Save**.

## 3. Test It
1. Refresh your website.
2. The images should now appear.

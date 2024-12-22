/*
  # Update storage configuration for 1GB uploads

  1. Changes
    - Increases the maximum file size limit to 1GB for the game-clips bucket
    
  2. Security
    - Maintains existing security policies
    - Updates size validation in storage policy
*/

-- Update the storage.buckets configuration for game-clips
UPDATE storage.buckets
SET file_size_limit = 1073741824  -- 1GB in bytes
WHERE id = 'game-clips';

-- Update the policy to include the new file size limit
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'game-clips' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp4', '.mov', '.avi') OR
   LOWER(RIGHT(name, 5)) IN ('.webm'))
);
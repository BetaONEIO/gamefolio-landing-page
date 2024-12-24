/*
  # Update storage policies for public uploads

  1. Changes
    - Allow public uploads to game-clips bucket
    - Remove authentication requirement
    - Maintain file type and size restrictions
  
  2. Security
    - Updates RLS policy to allow public access
    - Maintains file type restrictions
    - Maintains file size limit of 1GB
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

-- Create new policy for public uploads
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'game-clips' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp4', '.mov', '.avi') OR
   LOWER(RIGHT(name, 5)) IN ('.webm'))
);

-- Add policy for public read access
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'game-clips');
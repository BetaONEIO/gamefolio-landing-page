/*
  # Update storage policies for public access

  1. Changes
    - Update storage bucket to be public
    - Add policies for public uploads and reads
*/

-- Update storage bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'game-clips';

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

-- Create new policies for public access
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'game-clips' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp4', '.mov', '.avi') OR
   LOWER(RIGHT(name, 5)) IN ('.webm'))
);

CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'game-clips');
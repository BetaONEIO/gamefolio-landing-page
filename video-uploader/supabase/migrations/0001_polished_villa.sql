/*
  # Create Storage Bucket for Game Clips

  1. New Storage Bucket
    - Creates a new storage bucket called 'game-clips' for storing video uploads
    
  2. Security
    - Enables public access for authenticated users to upload files
    - Restricts file types to video formats
*/

-- Create a new storage bucket for game clips
INSERT INTO storage.buckets (id, name, public)
VALUES ('game-clips', 'game-clips', true);

-- Set up storage policy to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'game-clips' AND
  (LOWER(RIGHT(name, 4)) IN ('.mp4', '.mov', '.avi') OR
   LOWER(RIGHT(name, 5)) IN ('.webm'))
);
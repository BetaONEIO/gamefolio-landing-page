import React, { useState, useCallback } from 'react';
import { Upload, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a video file');
        return;
      }

      // Changed to 1GB limit (1024 * 1024 * 1024 bytes)
      if (file.size > 1024 * 1024 * 1024) {
        toast.error('File size must be less than 1GB');
        return;
      }

      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError, data } = await supabase.storage
        .from('game-clips')
        .upload(fileName, file, {
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setProgress(Math.round(percent));
          },
        });

      if (uploadError) throw uploadError;

      const { error: emailError } = await supabase.functions.invoke('notify-upload', {
        body: { fileName: file.name, fileUrl: data?.path },
      });

      if (emailError) {
        console.error('Error sending email notification:', emailError);
      }

      toast.success('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, []);

  return (
    <div className="w-full">
      <label className={`
        relative flex flex-col items-center justify-center w-full h-72
        border-2 border-dashed rounded-xl cursor-pointer transition-all
        ${uploading 
          ? 'border-blue-500 bg-blue-500/10' 
          : 'border-gray-600 hover:border-blue-500 hover:bg-blue-500/5'
        }
      `}>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          {uploading ? (
            <>
              <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-blue-500">
                Uploading... {progress}%
              </p>
            </>
          ) : (
            <>
              <div className="p-4 rounded-full bg-blue-500/10 mb-4">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-lg font-medium text-white mb-2">
                Drop your video here
              </p>
              <p className="text-sm text-gray-400">
                or click to browse your files
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
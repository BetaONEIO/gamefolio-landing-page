import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from '../FileUpload';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

// Mock dependencies
vi.mock('../../lib/supabase', () => ({
  supabase: {
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn()
      })
    },
    functions: {
      invoke: vi.fn()
    }
  }
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('FileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders upload area', () => {
    render(<FileUpload />);
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Video files/i)).toBeInTheDocument();
  });

  it('validates file type', async () => {
    render(<FileUpload />);
    const input = screen.getByLabelText(/Click to upload/i);
    
    const invalidFile = new File([''], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [invalidFile] } });
    
    expect(toast.error).toHaveBeenCalledWith('Please upload a video file');
  });

  it('validates file size', async () => {
    render(<FileUpload />);
    const input = screen.getByLabelText(/Click to upload/i);
    
    // Create a mock file larger than 100MB
    const largeFile = new File(['x'.repeat(101 * 1024 * 1024)], 'large.mp4', { type: 'video/mp4' });
    fireEvent.change(input, { target: { files: [largeFile] } });
    
    expect(toast.error).toHaveBeenCalledWith('File size must be less than 100MB');
  });

  it('sends email notification on successful upload', async () => {
    const mockPath = 'uploads/test-123.mp4';
    const mockUpload = vi.fn().mockResolvedValue({ data: { path: mockPath } });
    supabase.storage.from.mockReturnValue({ upload: mockUpload });
    supabase.functions.invoke.mockResolvedValue({ error: null });

    render(<FileUpload />);
    const input = screen.getByLabelText(/Click to upload/i);
    
    const validFile = new File([''], 'test.mp4', { type: 'video/mp4' });
    fireEvent.change(input, { target: { files: [validFile] } });
    
    await vi.waitFor(() => {
      // Verify email notification was triggered
      expect(supabase.functions.invoke).toHaveBeenCalledWith('notify-upload', {
        body: {
          fileName: 'test.mp4',
          fileUrl: mockPath,
        },
      });
      expect(toast.success).toHaveBeenCalledWith('Video uploaded successfully!');
    });
  });

  it('handles email notification failure gracefully', async () => {
    const mockUpload = vi.fn().mockResolvedValue({ data: { path: 'test.mp4' } });
    supabase.storage.from.mockReturnValue({ upload: mockUpload });
    supabase.functions.invoke.mockResolvedValue({ 
      error: new Error('Failed to send email') 
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<FileUpload />);
    const input = screen.getByLabelText(/Click to upload/i);
    
    const validFile = new File([''], 'test.mp4', { type: 'video/mp4' });
    fireEvent.change(input, { target: { files: [validFile] } });
    
    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending email notification:',
        expect.any(Error)
      );
      // Upload should still be considered successful
      expect(toast.success).toHaveBeenCalledWith('Video uploaded successfully!');
    });

    consoleSpy.mockRestore();
  });
});
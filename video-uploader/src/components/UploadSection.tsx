import { FileUpload } from './FileUpload';
import { VideoRequirements } from './VideoRequirements';
import { SubmissionForm } from './SubmissionForm';

export function UploadSection() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Upload Your Gaming Moments
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FileUpload />
            <VideoRequirements />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Submit Your Details
              </h3>
              <SubmissionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
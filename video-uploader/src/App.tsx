import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-16 space-y-12">
        <Hero />
        <UploadSection />
      </div>
    </div>
  );
}

export default App;
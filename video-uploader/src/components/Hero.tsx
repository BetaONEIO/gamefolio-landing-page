import { Gamepad2 } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Gamepad2 className="w-12 h-12 text-blue-500" />
        <h1 className="text-5xl font-bold text-white">Gamefolio Clips</h1>
      </div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Share your most epic gaming moments with the world. Upload your best gameplay clips and join our growing community of gamers.
      </p>
    </div>
  );
}
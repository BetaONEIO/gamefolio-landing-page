import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 border-b border-gray-100/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-3">
          <Gamepad2 className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Gamefolio Clips</h1>
        </div>
      </div>
    </header>
  );
}
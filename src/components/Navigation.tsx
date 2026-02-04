import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing' as Page, label: 'Home' },
    { id: 'getting-started' as Page, label: 'Start Here' },
    { id: 'codebase' as Page, label: 'Codebase Map' },
    { id: 'subsystems' as Page, label: 'Subsystems' },
    { id: 'opmodes' as Page, label: 'OpModes' },
    { id: 'how-it-works' as Page, label: 'How It Works' },
    { id: 'mistakes' as Page, label: 'Common Mistakes' },
  ];

  return (
    <nav className="bg-neutral-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Pr0teens
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-neutral-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-yellow-500 text-neutral-900 font-semibold'
                    : 'text-white hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-yellow-500 text-neutral-900 font-semibold'
                    : 'text-white hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

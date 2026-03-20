import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header({ toggleSidebar, showHamburger = true }) {
  return (
    <header className="flex-none flex items-center justify-between px-4 py-3 bg-theme-bg border-b border-theme-border shadow-sm z-30">
      <div className="flex items-center gap-4">
        {showHamburger && (
          <button 
            onClick={toggleSidebar} 
            className="p-1.5 rounded-md hover:bg-theme-social-bg text-theme-text-h transition-colors"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}
        <span className="text-xl font-heading font-bold text-theme-accent">AlgoViz</span>
      </div>
    </header>
  );
}

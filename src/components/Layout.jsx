import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`flex ${isHome ? 'flex-row' : 'flex-col'} h-screen w-screen overflow-hidden bg-theme-code-bg text-theme-text font-sans text-left`}>
      {isHome && <Sidebar isOpen={true} closeSidebar={() => {}} isStatic={true} />}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative border-l border-theme-border">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} showHamburger={!isHome} />
        {!isHome && <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} isStatic={false} />}
        
        <main className="flex-1 w-full overflow-hidden relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

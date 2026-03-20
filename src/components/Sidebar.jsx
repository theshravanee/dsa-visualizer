import { NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline'; 
import { algorithms } from '../algorithms';

export default function Sidebar({ isOpen, closeSidebar, isStatic }) {
  const asideClass = isStatic
    ? "w-64 bg-theme-bg flex flex-col z-10 h-full flex-none shrink-0"
    : `fixed inset-y-0 left-0 z-50 w-64 bg-theme-bg border-r border-theme-border shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col flex-none shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;

  // Group by category dynamically natively
  const categoriesMap = {};
  Object.values(algorithms).forEach(algo => {
    const cat = algo.category || 'Other';
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(algo);
  });

  const order = ['Sorting', 'Graph', 'Dynamic Programming', 'Tree', 'Linked List', 'Recursion', 'String', 'Other'];
  
  const sortedCategories = Object.keys(categoriesMap).sort((a, b) => {
    let idxA = order.indexOf(a);
    let idxB = order.indexOf(b);
    if (idxA === -1) idxA = 999;
    if (idxB === -1) idxB = 999;
    return idxA - idxB;
  });

  return (
    <>
      {!isStatic && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}
      
      <aside className={asideClass}>
        <div className="p-4 border-b border-theme-border flex justify-between items-center bg-[#0b1120]">
          <span className="text-xl font-heading font-bold text-theme-accent">AlgoViz</span>
          {!isStatic && (
            <button onClick={closeSidebar} className="p-1 hover:bg-slate-800 rounded-md text-slate-300 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <nav className="p-4 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
          <div>
            <NavLink
              to="/"
              onClick={!isStatic ? closeSidebar : undefined}
              className={({ isActive }) => `
                block px-3 py-2.5 rounded-lg transition-colors text-sm mb-2 font-bold tracking-wider
                ${isActive ? 'bg-theme-accent-bg text-theme-accent' : 'text-slate-300 hover:bg-theme-code-bg'}
              `}
            >
              HOME DASHBOARD
            </NavLink>
          </div>

          {sortedCategories.map((catName) => (
            <div key={catName} className="mb-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-2 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-theme-accent rounded-full"></div>
                 {catName}
              </div>
              <div className="space-y-1">
                {categoriesMap[catName].map((algo) => {
                  const routePath = `/${algo.id.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                  return (
                    <NavLink
                      key={algo.id}
                      to={routePath}
                      onClick={!isStatic ? closeSidebar : undefined}
                      className={({ isActive }) => `
                        block px-3 py-1.5 rounded-lg transition-all duration-200 text-sm ml-1
                        ${isActive 
                          ? 'bg-theme-accent-bg/80 text-theme-accent font-semibold border-l-2 border-theme-accent rounded-l-none' 
                          : 'text-slate-400 hover:bg-theme-code-bg hover:text-slate-200'
                        }
                      `}
                    >
                      {algo.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

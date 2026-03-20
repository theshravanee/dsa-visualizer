import React from 'react';
import { algorithms } from '../algorithms';
import AlgorithmCard from '../components/AlgorithmCard';

export default function Home() {
  const categories = {};
  Object.values(algorithms).forEach(algo => {
    const cat = algo.category || 'Other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(algo);
  });

  const order = ['Sorting', 'Graph', 'Dynamic Programming', 'Tree', 'String', 'Linked List', 'Recursion', 'Other'];
  
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    let idxA = order.indexOf(a);
    let idxB = order.indexOf(b);
    if (idxA === -1) idxA = 999;
    if (idxB === -1) idxB = 999;
    return idxA - idxB;
  });

  return (
    <div className="flex-1 absolute inset-0 overflow-y-auto bg-[#0b1120] text-theme-text custom-scrollbar">
      <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-fuchsia-400 mb-4 tracking-tight">
            Algorithm Visualizer
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            Select a category algorithm below to vividly interact with its execution structures and step-by-step logic flow parameters.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {sortedCategories.map(catName => (
            <div key={catName} className="flex flex-col gap-6">
              <h2 className="text-2xl font-heading font-bold text-slate-200 border-b border-slate-700/50 pb-3 flex items-center gap-3">
                 <div className="w-2 h-6 bg-theme-accent rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                 {catName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {categories[catName].map(algo => {
                   const routePath = algo.id.replace(/([A-Z])/g, '-$1').toLowerCase();
                   return (
                     <AlgorithmCard 
                       key={algo.id}
                       title={algo.name}
                       description={algo.description}
                       path={`/${routePath}`}
                     />
                   );
                 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

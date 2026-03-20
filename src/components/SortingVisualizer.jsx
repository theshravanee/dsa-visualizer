import React from 'react';

export default function SortingVisualizer({ currentStep }) {
  if (!currentStep || !currentStep.variables || !currentStep.variables.array) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm leading-loose">
        <div className="animate-pulse">Loading Sort Environment...</div>
      </div>
    );
  }

  const { array, pointers = {}, pivotIndex, swappedIndices = [], sortedIndices = [] } = currentStep.variables;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0b1120] relative">
      <div className="absolute bottom-6 mx-auto flex gap-6 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700 shadow-xl backdrop-blur-sm z-20">
         {Object.entries(pointers).map(([name, idx]) => (
            idx !== null && idx !== undefined && (
              <div key={name} className="flex items-center gap-2 uppercase tracking-wide">
                 <div className="w-3 h-3 bg-slate-400 rounded-sm"></div> {name} ({idx})
              </div>
            )
         ))}
         {pivotIndex !== undefined && pivotIndex !== null && (
            <div className="flex items-center gap-2 uppercase tracking-wide">
               <div className="w-3 h-3 bg-fuchsia-500 rounded-sm"></div> Pivot ({pivotIndex})
            </div>
         )}
      </div>

      <div className="flex flex-wrap items-end justify-center gap-2 w-full px-4 z-10 h-72">
        {array.map((val, idx) => {
          let isPivot = pivotIndex === idx;
          let isSwapped = swappedIndices.includes(idx);
          let isSorted = sortedIndices.includes(idx);

          // Find which pointers point here
          let activePointers = Object.entries(pointers).filter(([_, pIdx]) => pIdx === idx).map(([name]) => name);

          let bgColor = 'bg-slate-700';
          let borderColor = 'border-slate-900';
          let textColor = 'text-white';
          
          if (isSorted) {
             bgColor = 'bg-green-500/30';
             borderColor = 'border-green-500';
             textColor = 'text-green-400';
          } else if (isSwapped) {
             bgColor = 'bg-yellow-500';
             borderColor = 'border-yellow-600';
             textColor = 'text-black';
          } else if (isPivot) {
             bgColor = 'bg-fuchsia-500';
             borderColor = 'border-fuchsia-600';
             textColor = 'text-white';
          }

          // Bar height visualization
          const maxVal = Math.max(...array, 1);
          const heightPercent = Math.max(15, (val / maxVal) * 100);

          return (
            <div key={idx} className="flex flex-col items-center gap-2 justify-end h-full">
              <div className="flex flex-col justify-end items-center gap-1 text-[10px] font-mono font-bold text-slate-400 h-16 uppercase">
                 {activePointers.map(p => <div key={p}>{p}</div>)}
              </div>
              <div 
                className={`w-10 md:w-12 ${bgColor} flex flex-col items-center justify-end shadow-lg rounded-t-md border-t-2 border-l-2 border-r-2 ${borderColor} transition-all duration-300 ease-out`}
                style={{ height: `${heightPercent}%` }}
              >
                <span className={`text-xs md:text-sm font-bold mb-2 ${textColor}`}>{val}</span>
              </div>
              <div className="text-slate-500 text-[10px] font-mono font-semibold">[{idx}]</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

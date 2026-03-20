import React from 'react';

export default function PerfectSquaresVisualizer({ currentStep }) {
  if (!currentStep || !currentStep.variables) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm">
        <div className="animate-pulse">Loading DP Environment...</div>
      </div>
    );
  }

  const { n, i, j, dp, currentSquare } = currentStep.variables;

  return (
    <div className="w-full h-full flex flex-col p-8 bg-[#0b1120] overflow-y-auto custom-scrollbar">
       
      <div className="flex flex-wrap gap-4 justify-center mb-8">
         <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700 text-sm font-mono text-slate-300">
           Target <span className="text-theme-accent font-bold">n = {n}</span>
         </div>
         {i !== null && (
           <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-red-500/30 text-sm font-mono text-red-400 shadow-md">
             Current <span className="font-bold">i = {i}</span>
           </div>
         )}
         {j !== null && (
           <div className="bg-slate-900/80 px-4 py-2 rounded-lg border border-blue-500/30 text-sm font-mono text-blue-400 shadow-md">
             Trying <span className="font-bold">j = {j} (j² = {currentSquare})</span>
           </div>
         )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {dp.map((val, idx) => {
          let isCurrentI = idx === i;
          let isLookup = currentSquare && idx === (i - currentSquare);
          
          let bgColor = 'bg-slate-800';
          let borderColor = 'border-slate-700';
          let textColor = 'text-slate-300';
          let scale = 'scale-100';
          let zIndex = 'z-0';

          if (isCurrentI) {
            bgColor = 'bg-red-500/20';
            borderColor = 'border-red-500';
            textColor = 'text-red-400 font-bold';
            scale = 'scale-110';
            zIndex = 'z-10';
          } else if (isLookup) {
            bgColor = 'bg-blue-500/20';
            borderColor = 'border-blue-500';
            textColor = 'text-blue-400 font-bold';
            scale = 'scale-110';
            zIndex = 'z-10';
          }

          const displayVal = val === null || val === Infinity ? '∞' : val;

          return (
            <div key={idx} className={`w-14 h-16 flex flex-col items-center justify-center rounded-md border-2 ${bgColor} ${borderColor} shadow-lg transform ${scale} ${zIndex} transition-all duration-300 ease-out`}>
              <div className="text-[10px] text-slate-500 font-mono mb-1">[{idx}]</div>
              <div className={`text-xl font-mono ${textColor}`}>
                {displayVal}
              </div>
            </div>
          );
        })}
      </div>
      
      {currentSquare && i !== null && (
         <div className="mt-12 mx-auto max-w-lg w-full bg-slate-800/50 border border-slate-700 p-6 rounded-xl shadow-xl">
           <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">Computation Graph</h4>
           <div className="flex justify-between items-center text-sm font-mono text-slate-300">
              <div className="flex flex-col items-center flex-1">
                 <span className="text-blue-400">dp[{i - currentSquare}]</span>
                 <span className="text-2xl font-bold mt-2 text-white">{dp[i - currentSquare] === Infinity ? '∞' : dp[i - currentSquare]}</span>
              </div>
              <div className="text-2xl text-slate-500">+</div>
              <div className="flex flex-col items-center flex-1">
                 <span className="text-slate-400">1 squared</span>
                 <span className="text-2xl font-bold mt-2 text-white">1</span>
              </div>
              <div className="text-2xl text-slate-500">=</div>
              <div className="flex flex-col items-center flex-1">
                 <span className="text-red-400">Candidate dp[{i}]</span>
                 <span className="text-2xl font-bold mt-2 text-white">{dp[i - currentSquare] + 1}</span>
              </div>
           </div>
         </div>
      )}

    </div>
  );
}

import React from 'react';

export default function RecursionVisualizer({ currentStep }) {
  if (!currentStep || !currentStep.variables) {
    return <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm"><div className="animate-pulse">Loading Recursion Sub-trees...</div></div>;
  }

  const { callStack, result, currentSubset, current, original, n, start } = currentStep.variables;

  const isSubset = currentSubset !== undefined;
  const isParentheses = current !== undefined;
  
  let currentVal = 'ø';
  if (isSubset) currentVal = `[${currentSubset.join(', ')}]`;
  else if (isParentheses) currentVal = current ? `"${current}"` : '""';

  return (
    <div className="w-full h-full flex flex-col lg:flex-row p-8 bg-[#0b1120] gap-8 overflow-hidden z-20 font-mono">
       <div className="flex-[0.5] flex flex-col gap-6 overflow-hidden max-w-sm">
         <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 shadow-2xl flex-none">
           <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-theme-accent rounded-full"></div>
              Current Execution Context
           </h4>
           
           {original && (
             <div className="mb-4 text-slate-500 text-sm">
               Base Mapping: <span className="text-theme-accent font-bold text-lg border-b border-theme-accent/30 pb-0.5 ml-2">[{original.join(', ')}]</span>
             </div>
           )}
           {n !== undefined && (
             <div className="mb-4 text-slate-500 text-sm">
               Parentheses Pairs: <span className="text-blue-400 font-bold text-lg border-b border-blue-400/30 pb-0.5 ml-2">{n}</span>
             </div>
           )}
           {start !== undefined && (
             <div className="mb-4 text-slate-500 text-sm">
               Active Pointer Index: <span className="text-red-400 font-bold text-lg border-b border-red-400/30 pb-0.5 ml-2">{start}</span>
             </div>
           )}
           
           <div className="p-5 bg-black/40 border border-slate-800 rounded-xl shadow-inner mt-4 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-slate-500 text-[10px] uppercase mb-2 block tracking-wider relative z-10">Actively Built Sequence:</span>
             <span className="text-2xl text-fuchsia-400 font-extrabold tracking-tight relative z-10">{currentVal}</span>
           </div>
         </div>

         <div className="flex-1 bg-slate-900/80 p-5 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none z-10 h-8 bottom-0"></div>
           <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Recursion Stack History
           </h4>
           <div className="overflow-y-auto flex-1 flex flex-col gap-2 custom-scrollbar pr-2 pb-6 relative z-0">
              {[...callStack].reverse().map((call, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg border font-mono text-xs shadow-md transition-all duration-300 ${i === 0 ? 'bg-fuchsia-900/40 border-fuchsia-500/50 text-fuchsia-200 font-bold translate-x-1' : 'bg-slate-800/30 border-slate-700 text-slate-500 hover:bg-slate-800/60'}`}>
                  {call}
                </div>
              ))}
              {callStack.length === 0 && <div className="text-slate-500 italic text-xs p-6 text-center w-full border border-dashed border-slate-700 rounded-lg">Trace Stack strictly Zeroed</div>}
           </div>
         </div>
       </div>

       <div className="flex-[0.5] bg-slate-900/80 p-6 rounded-2xl border border-slate-700 shadow-2xl flex flex-col h-full overflow-hidden">
         <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-4">
             <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Resolved Combinations
             </h4>
             <span className="text-theme-accent bg-theme-accent/10 px-3 py-1 rounded-full text-[10px] font-bold shadow-inner">Found: {result.length}</span>
         </div>
         <div className="flex flex-wrap gap-2.5 overflow-y-auto custom-scrollbar content-start p-1 flex-1">
            {result.map((res, i) => {
              const displayRes = isSubset ? `[${res.join(', ')}]` : (isParentheses && typeof res === 'string' ? `"${res}"` : `[${res.join(', ')}]`);
              return (
                <div key={i} className="px-3.5 py-1.5 bg-slate-800/80 border border-slate-600 rounded-lg text-slate-300 text-[13px] shadow-md animate-fade-in hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all duration-200 font-medium">
                  {displayRes}
                </div>
              );
            })}
            {result.length === 0 && <div className="text-slate-500 italic w-full text-center mt-12 text-sm">Combinatorics pending complete traversal sequences...</div>}
         </div>
       </div>

    </div>
  );
}

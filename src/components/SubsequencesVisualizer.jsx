import React from 'react';

export default function SubsequencesVisualizer({ currentStep }) {
  if (!currentStep || !currentStep.variables) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm">
        <div className="animate-pulse">Loading Recursion Tree...</div>
      </div>
    );
  }

  const { original, currentIndex, currentSubsequence, result, callStack } = currentStep.variables;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row p-6 bg-[#0b1120] gap-6 overflow-hidden">
       
       <div className="flex-1 flex flex-col gap-6 font-mono overflow-hidden">
         <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-xl flex-none">
           <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Current Execution Environment</h4>
           
           <div className="flex flex-col gap-5">
              <div className="flex gap-3 mb-2 items-center text-lg bg-slate-800/50 p-3 rounded-md">
                <span className="text-slate-500 text-sm">Target String:</span>
                <div className="flex gap-1">
                  {original.split('').map((char, i) => (
                    <span key={i} className={`${i === currentIndex ? 'text-theme-accent font-extrabold border-b-2 border-theme-accent scale-110' : 'text-slate-400'} px-2 py-1 transition-all duration-200`}>
                      {char}
                    </span>
                  ))}
                  {currentIndex === original.length && (
                    <span className="text-theme-accent font-extrabold border-b-2 border-theme-accent scale-110 px-2 py-1">_</span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <div className="text-sm border border-slate-700 bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="text-slate-500 mr-2">String Pointer:</span>
                  <span className="text-blue-400 font-bold text-lg">{currentIndex}</span>
                  <span className="text-slate-500 ml-1">/ {original.length}</span>
                </div>
              </div>
              
              <div className="p-4 bg-black/40 border border-slate-800 rounded-lg shadow-inner mt-2">
                <span className="text-slate-500 text-[10px] uppercase mb-1 block tracking-wider">Accumulating Subsequence:</span>
                <span className="text-2xl text-fuchsia-400 font-bold">{currentSubsequence === '' ? 'ø (Empty)' : `"${currentSubsequence}"`}</span>
              </div>
           </div>
         </div>

         <div className="flex-[0.6] bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
           <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Runtime Call Stack</h4>
           <div className="overflow-y-auto flex-1 flex flex-col gap-2 custom-scrollbar pr-2">
              {[...callStack].reverse().map((call, i) => (
                <div key={i} className={`p-2.5 rounded-md border font-mono text-[13px] shadow-sm transition-colors ${i === 0 ? 'bg-fuchsia-900/40 border-fuchsia-500/50 text-fuchsia-200 font-semibold' : 'bg-slate-800/30 border-slate-700 text-slate-500'}`}>
                  {call}
                </div>
              ))}
              {callStack.length === 0 && <div className="text-slate-500 italic text-sm p-4 text-center">Stack empty (Execution Complete)</div>}
           </div>
         </div>
       </div>

       <div className="w-[45%] bg-slate-900/80 p-5 rounded-xl border border-slate-700 shadow-xl flex flex-col h-full overflow-hidden">
         <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center border-b border-slate-700 pb-3">
           <span>Assembled Results Array</span>
           <span className="text-theme-accent bg-theme-accent/10 px-2 py-1 rounded text-[11px] font-bold">{result.length} Combinations</span>
         </h4>
         <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar content-start p-1">
            {result.map((res, i) => (
              <div key={i} className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded-md text-slate-300 font-mono text-sm shadow animate-fade-in hover:bg-slate-700 transition-colors">
                {res === '' ? 'ø' : `"${res}"`}
              </div>
            ))}
            {result.length === 0 && <div className="text-slate-500 italic w-full text-center mt-8 text-sm">No combinations found yet...</div>}
         </div>
       </div>

    </div>
  );
}

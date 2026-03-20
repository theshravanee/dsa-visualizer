import React from 'react';

export default function LISVisualizer({ currentStep }) {
  if (!currentStep || !currentStep.variables) {
    return <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-sm leading-loose"><div className="animate-pulse">Loading LIS Subarrays...</div></div>;
  }

  const { array, dp, i, j } = currentStep.variables;

  return (
    <div className="w-full h-full flex flex-col p-8 bg-[#0b1120] overflow-y-auto custom-scrollbar items-center">
      
      <div className="flex flex-wrap gap-3 items-end justify-center h-64 w-full border-b-2 border-slate-700 pb-2 mb-12 px-4">
        {array.map((val, idx) => {
          let isCurrentI = idx === i;
          let isCurrentJ = idx === j;
          
          let bgColor = 'bg-slate-700';
          let textColor = 'text-white font-bold';
          if (isCurrentI) bgColor = 'bg-fuchsia-500';
          if (isCurrentJ) bgColor = 'bg-blue-500';

          const maxVal = Math.max(...array, 1);
          const heightPercent = Math.max(15, (val / maxVal) * 100);

          return (
            <div key={idx} className="flex flex-col items-center gap-2 justify-end h-full">
              <div className="flex flex-col items-center justify-end gap-1 font-mono text-[10px] h-12 uppercase">
                 {isCurrentI && <span className="text-fuchsia-400 font-black">i</span>}
                 {isCurrentJ && <span className="text-blue-400 font-black">j</span>}
              </div>
              <div 
                className={`w-10 md:w-14 flex items-center justify-center ${bgColor} shadow-lg rounded-t-lg transition-all duration-300`} 
                style={{ height: `${heightPercent}%` }}
              >
                 <span className={`text-sm md:text-lg ${textColor}`}>{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex flex-col items-center">
         <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">Longest Subsequence (DP Cache)</h3>
         <div className="flex flex-wrap gap-3 justify-center">
           {dp.map((val, idx) => {
             let isCurrentI = idx === i;
             let isCurrentJ = idx === j;
             let ring = isCurrentI ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-[#0b1120] scale-110 z-10' : isCurrentJ ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0b1120] scale-110 z-10' : 'scale-100 z-0';
             
             return (
               <div key={idx} className={`w-14 h-16 flex flex-col items-center justify-center bg-slate-800 border-2 ${isCurrentI ? 'border-fuchsia-500' : isCurrentJ ? 'border-blue-500' : 'border-slate-700'} rounded-lg ${ring} shadow-md transition-all duration-300`}>
                  <div className="text-[10px] text-slate-500 font-mono mb-1">[{idx}]</div>
                  <div className={`text-xl font-mono font-bold ${isCurrentI ? 'text-fuchsia-400' : isCurrentJ ? 'text-blue-400' : 'text-slate-300'}`}>{val}</div>
               </div>
             );
           })}
         </div>
      </div>
    </div>
  );
}

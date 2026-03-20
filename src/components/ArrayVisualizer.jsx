import React from 'react';

export default function ArrayVisualizer({ currentStep, arr }) {
  if (!currentStep || !currentStep.variables || !currentStep.variables.array) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm leading-loose">
        <div className="animate-pulse">Loading Array Environment...</div>
        <div>Configuring nodes across index boundaries.</div>
      </div>
    );
  }

  const { array, low, mid, high } = currentStep.variables;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0b1120] relative">
      <div className="absolute bottom-6 mx-auto flex gap-6 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700 shadow-xl backdrop-blur-sm z-20">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Low (0)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white rounded-sm border border-slate-300"></div> Mid (1)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> High (2)</div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-3 w-full px-12 z-10">
        {array.map((val, idx) => {
          let bgColor = 'bg-slate-700';
          if (val === 0) bgColor = 'bg-red-500';
          else if (val === 1) bgColor = 'bg-white';
          else if (val === 2) bgColor = 'bg-blue-500';

          let isLow = low === idx;
          let isMid = mid === idx;
          let isHigh = high === idx;

          let labels = [];
          if (isLow) labels.push({ text: 'Low', color: 'text-red-400' });
          if (isMid) labels.push({ text: 'Mid', color: 'text-slate-300' });
          if (isHigh) labels.push({ text: 'High', color: 'text-blue-400' });

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="h-16 flex flex-col justify-end items-center gap-1 text-[10px] uppercase font-mono font-bold tracking-widest">
                {labels.map((lbl, i) => (
                  <div key={i} className={lbl.color}>{lbl.text}</div>
                ))}
              </div>

              <div 
                className={`w-16 h-16 ${bgColor} flex items-center justify-center text-2xl font-bold shadow-[0_5px_15px_rgba(0,0,0,0.3)] rounded-lg border-2 border-slate-900 transition-all duration-300 ease-out`}
                style={{ color: val === 1 ? '#000' : '#fff' }}
              >
                {val}
              </div>

              <div className="text-slate-500 text-xs font-mono mt-1 font-semibold">[{idx}]</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

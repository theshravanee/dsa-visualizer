import React, { useRef, useEffect, useState } from 'react';

export default function LinkedListVisualizer({ currentStep }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
  }, []);

  if (!currentStep || !currentStep.variables) {
    return <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm"><div className="animate-pulse">Loading Linked List Architecture...</div></div>;
  }

  const { nodes = [], pointers = {} } = currentStep.variables;
  
  const X_SPACING = 100;
  const Y_SPACING = 140;
  
  const nodeLayouts = {};
  nodes.forEach((node) => {
    const x = 120 + node.originalIndex * X_SPACING;
    const y = 80 + node.listId * Y_SPACING;
    nodeLayouts[node.id] = { x, y, val: node.val };
  });

  return (
    <div ref={containerRef} className="w-full h-full bg-[#0b1120] relative overflow-auto custom-scrollbar font-mono z-10">
      <svg className="absolute inset-0 w-full h-full pointer-events-none min-w-[800px] min-h-[400px]">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="24" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#475569" />
          </marker>
          <marker id="arrowhead-highlight" markerWidth="8" markerHeight="6" refX="24" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#d946ef" />
          </marker>
        </defs>

        {nodes.map(node => {
          if (node.next === null || node.next === undefined) return null;
          const source = nodeLayouts[node.id];
          const target = nodeLayouts[node.next];
          if (!source || !target) return null;

          const isReversed = target.x < source.x && source.y === target.y;
          let path = '';
          if (isReversed) {
             const dx = source.x - target.x;
             path = `M ${source.x} ${source.y - 10} C ${source.x - dx/4} ${source.y - 60}, ${target.x + dx/4} ${target.y - 60}, ${target.x} ${target.y - 10}`;
          } else if (source.y !== target.y) {
             const xDiff = target.x - source.x;
             path = `M ${source.x} ${source.y + 10} C ${source.x} ${target.y}, ${source.x + xDiff/2} ${target.y}, ${target.x} ${target.y}`;
          } else {
             path = `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
          }

          const isRecentlyChanged = node.recentlyModified === true;
          
          return (
             <path 
                key={`edge-${node.id}-${node.next}`}
                d={path}
                fill="none"
                stroke={isRecentlyChanged ? "#d946ef" : "#475569"}
                strokeWidth={isRecentlyChanged ? "3" : "2"}
                markerEnd={isRecentlyChanged ? "url(#arrowhead-highlight)" : "url(#arrowhead)"}
                className="transition-all duration-300"
             />
          );
        })}
      </svg>
      
      {nodes.map(node => {
         const layout = nodeLayouts[node.id];
         if (!layout) return null;
         
         const activePointers = Object.keys(pointers).filter(k => pointers[k] === node.id);

         return (
           <div 
             key={node.id}
             className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 transition-all duration-500 ease-in-out"
             style={{ left: layout.x, top: layout.y }}
           >
             <div className="absolute bottom-full mb-1 flex flex-col items-center gap-0.5">
                {activePointers.map(p => (
                   <span key={p} className="bg-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded text-fuchsia-400 border border-fuchsia-500/50 shadow-md tracking-wider">
                     {p}
                   </span>
                ))}
             </div>
             
             <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center bg-slate-900 shadow-lg z-20 transition-all duration-300
                 ${activePointers.length > 0 ? 'border-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.3)] ring-2 ring-fuchsia-500/30 ring-offset-2 ring-offset-[#0b1120] scale-110' : 'border-slate-600 text-slate-300'}
             `}>
                <span className="font-extrabold text-xl">{layout.val}</span>
             </div>
             
             <div className="absolute top-full mt-2 text-[10px] text-slate-600 bg-slate-800/50 px-1 rounded">
               node-{node.id}
             </div>
           </div>
         );
      })}

      <div className="fixed bottom-6 left-6 flex gap-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase bg-slate-900/80 p-3 rounded-xl border border-slate-700/50 backdrop-blur shadow-xl">
         <div className="flex items-center gap-2"><div className="w-6 h-0.5 bg-fuchsia-500"></div> Native Route Edge Re-mapped</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-fuchsia-500 bg-[#0b1120]"></div> Active Target Bounds Variable</div>
      </div>
    </div>
  );
}

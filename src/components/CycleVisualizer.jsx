import React, { useRef, useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const CanvasControls = ({ cycleMode, setCycleMode, hasCycle, clearCycle }) => {
  const { resetTransform } = useControls();
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10 font-sans">
      <button 
        onClick={clearCycle} 
        disabled={!hasCycle}
        className={`px-3 py-1.5 text-xs rounded-md transition shadow-lg backdrop-blur-sm ${hasCycle ? 'bg-red-900/80 border border-red-700 text-red-200 hover:bg-red-800 cursor-pointer' : 'bg-slate-800/80 border border-slate-700 text-slate-500 cursor-not-allowed opacity-60'}`}
      >
        Clear Cycle
      </button>
      <button 
        onClick={() => setCycleMode(!cycleMode)} 
        className={`px-3 py-1.5 border text-xs rounded-md transition duration-200 shadow-lg backdrop-blur-sm ${cycleMode ? 'bg-fuchsia-600/80 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700'}`}
      >
        {cycleMode ? 'Cycle Mode: ON' : 'Cycle Mode: OFF'}
      </button>
      <div className="relative group flex items-center pr-2">
         <InformationCircleIcon className="w-6 h-6 text-slate-400 cursor-help hover:text-white transition-colors" />
         <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 leading-relaxed">
            When Cycle Mode is ON, click a node to select it as the cycle start, then click another node (the tail) to create a cycle from that node back to the selected start.
         </div>
      </div>
      <button onClick={() => resetTransform()} className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 text-slate-300 text-xs rounded-md hover:bg-slate-700 transition shadow-lg backdrop-blur-sm">
        Reset View
      </button>
    </div>
  );
};

export default function CycleVisualizer({ 
   arr, hasCycle, setHasCycle, cycleStartIndex, setCycleStartIndex, cycleTailIndex, setCycleTailIndex, currentStep, steps, reset
}) {
  const [cycleMode, setCycleMode] = useState(false);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);
  const [nodePositions, setNodePositions] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setNodePositions(prev => {
      const newPos = [...prev];
      for (let i = 0; i < arr.length; i++) {
        if (!newPos[i]) {
           newPos[i] = { x: 100 + i * 110, y: 250 };
        }
      }
      newPos.length = arr.length;
      return newPos;
    });
  }, [arr]);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scale;
    const mouseY = (e.clientY - rect.top) * scale;
    
    let minDist = 25;
    let hitIndex = -1;
    nodePositions.forEach((pos, i) => {
      if (!pos) return;
      const d = Math.hypot(mouseX - pos.x, mouseY - pos.y);
      if (d <= minDist) { minDist = d; hitIndex = i; }
    });

    if (hitIndex !== -1) {
      if (cycleMode) {
         if (selectedNodeIndex === null) {
            setSelectedNodeIndex(hitIndex);
         } else {
            setCycleStartIndex(selectedNodeIndex);
            setCycleTailIndex(hitIndex);
            setHasCycle(true);
            setSelectedNodeIndex(null);
            setCycleMode(false);
            reset();
         }
      } else {
         setDraggedIndex(hitIndex);
      }
      e.preventDefault(); e.stopPropagation();
    }
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (draggedIndex === null) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scale = canvas.width / rect.width;
      const mouseX = (e.clientX - rect.left) * scale;
      const mouseY = (e.clientY - rect.top) * scale;
      setNodePositions(prev => {
        const newPos = [...prev];
        newPos[draggedIndex] = { x: mouseX, y: mouseY };
        return newPos;
      });
    };
    const handlePointerUp = () => { if (draggedIndex !== null) setDraggedIndex(null); };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggedIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
    for (let i = 0; i <= canvas.height; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

    if (nodePositions.length < arr.length || !nodePositions.every(p => p)) return;

    let nodes = [];
    let cycleEdge = null;
    let visited = new Set();
    
    let currIdx = 0;
    while(currIdx !== null) {
      if (visited.has(currIdx)) {
        cycleEdge = { from: nodes[nodes.length - 1], to: currIdx };
        break;
      }
      nodes.push(currIdx);
      visited.add(currIdx);
      
      let nextIdx = (currIdx + 1 < arr.length) ? currIdx + 1 : null;
      if (hasCycle && currIdx === cycleTailIndex) {
         nextIdx = cycleStartIndex;
      }
      currIdx = nextIdx;
    }

    const radius = 22;
    ctx.font = '16px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    const drawArrow = (p1, p2, isCurve = false) => {
      ctx.beginPath();
      if (!isCurve) {
          const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
          const startX = p1.x + Math.cos(angle)*radius;
          const startY = p1.y + Math.sin(angle)*radius;
          const endX = p2.x - Math.cos(angle)*radius;
          const endY = p2.y - Math.sin(angle)*radius;
          ctx.moveTo(startX, startY); ctx.lineTo(endX, endY); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - 10 * Math.cos(angle - Math.PI/6), endY - 10 * Math.sin(angle - Math.PI/6));
          ctx.lineTo(endX - 10 * Math.cos(angle + Math.PI/6), endY - 10 * Math.sin(angle + Math.PI/6));
          ctx.fill();
      } else {
         const arcHeight = Math.abs(p1.x - p2.x) * 0.3 + 50;
         const controlY = Math.min(p1.y, p2.y) - arcHeight;
         const sTopX = p1.x; const sTopY = p1.y - radius;
         const eTopX = p2.x; const eTopY = p2.y - radius;
         ctx.moveTo(sTopX, sTopY); ctx.bezierCurveTo(sTopX, controlY, eTopX, controlY, eTopX, eTopY); ctx.stroke();
         ctx.beginPath();
         const angle = Math.atan2(eTopY - controlY, eTopX - eTopX); 
         ctx.moveTo(eTopX, eTopY);
         ctx.lineTo(eTopX - 6 * Math.cos(angle - Math.PI/6), eTopY - 10 * Math.sin(angle - Math.PI/6));
         ctx.lineTo(eTopX + 6 * Math.cos(angle + Math.PI/6), eTopY - 10 * Math.sin(angle + Math.PI/6));
         ctx.fill();
      }
    };

    ctx.lineWidth = 2;
    for (let i = 0; i < nodes.length - 1; i++) {
       const u = nodes[i], v = nodes[i+1];
       if (hasCycle && u === cycleTailIndex && v === cycleStartIndex) continue;
       ctx.strokeStyle = '#475569'; ctx.fillStyle = '#475569';
       drawArrow(nodePositions[u], nodePositions[v], false);
    }

    if (cycleEdge) {
      ctx.strokeStyle = '#64748b'; ctx.fillStyle = '#64748b';
      drawArrow(nodePositions[cycleEdge.from], nodePositions[cycleEdge.to], true);
    }

    for (let i = 0; i < arr.length; i++) {
      const p = nodePositions[i];
      let isCurrentNode = nodes.includes(i);
      let isSlow = currentStep?.variables?.slow === i;
      let isFast = currentStep?.variables?.fast === i;
      let isMeeting = isSlow && isFast && isSlow !== null;
      let isSelectedForCycle = selectedNodeIndex === i;

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, 2*Math.PI);
      ctx.lineWidth = 4;
      if (isSelectedForCycle) {
        ctx.fillStyle = 'rgba(217, 70, 239, 0.2)'; ctx.strokeStyle = '#d946ef'; ctx.setLineDash([5, 5]);
      } else if (isMeeting) {
        ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#facc15';
      } else if (isSlow) {
        ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#22d3ee';
      } else if (isFast) {
        ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#ef4444';
      } else {
        ctx.fillStyle = '#334155'; ctx.strokeStyle = isCurrentNode ? '#94a3b8' : '#475569'; ctx.lineWidth = 2;
      }
      ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; ctx.fill();
      ctx.shadowColor = 'transparent'; ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = isCurrentNode ? '#f8fafc' : '#94a3b8'; ctx.fillText(arr[i], p.x, p.y);
    }
  }, [arr, currentStep, nodePositions, selectedNodeIndex, hasCycle, cycleStartIndex, cycleTailIndex]);

  return (
    <div className="relative bg-[#0b1120] flex flex-col h-full w-full">
      {cycleMode && (
         <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <div className="bg-fuchsia-900/60 border border-fuchsia-500/50 text-fuchsia-100 px-4 py-2 rounded-lg text-sm shadow-xl backdrop-blur-md animate-pulse">
             {selectedNodeIndex === null ? 'Select the cycle destination node...' : 'Click the tail node to create cycle'}
           </div>
         </div>
      )}

      <div className="absolute bottom-4 left-4 flex gap-4 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-700 z-20">
         <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-[#22d3ee] rounded-full"></div> Slow</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-[#ef4444] rounded-full"></div> Fast</div>
         <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-[#facc15] rounded-full"></div> Meet</div>
      </div>

      <TransformWrapper
        initialScale={1.5}
        minScale={0.5}
        maxScale={3}
        wheel={{ step: 0.1 }}
        panning={{ disabled: draggedIndex !== null || cycleMode }}
        doubleClick={{ disabled: true }}
      >
        <CanvasControls 
           cycleMode={cycleMode} 
           setCycleMode={(v) => { setCycleMode(v); setSelectedNodeIndex(null); }} 
           hasCycle={hasCycle}
           clearCycle={() => { setHasCycle(false); reset(); }} 
        />
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <canvas 
            ref={canvasRef} 
            width="1200" 
            height="800" 
            className={`w-full h-full object-contain overflow-visible ${draggedIndex !== null ? 'cursor-grabbing' : (cycleMode ? 'cursor-crosshair' : 'cursor-grab')}`} 
            onPointerDown={handlePointerDown} 
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

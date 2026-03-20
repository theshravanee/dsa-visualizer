import React, { useState, useMemo, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import ArrayVisualizer from './ArrayVisualizer';
import CycleVisualizer from './CycleVisualizer';
import PerfectSquaresVisualizer from './PerfectSquaresVisualizer';
import SubsequencesVisualizer from './SubsequencesVisualizer';
import SortingVisualizer from './SortingVisualizer';
import LISVisualizer from './LISVisualizer';
import RecursionVisualizer from './RecursionVisualizer';
import LinkedListVisualizer from './LinkedListVisualizer';

export default function AlgorithmVisualizer({ algorithm }) {
  const [listInput, setListInput] = useState(
    Array.isArray(algorithm.defaultInput) ? algorithm.defaultInput.join(',') : algorithm.defaultInput
  );
  
  const [cycleStartIndex, setCycleStartIndex] = useState(3);
  const [cycleTailIndex, setCycleTailIndex] = useState(6);
  const [hasCycle, setHasCycle] = useState(true);

  const arr = useMemo(() => listInput.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)), [listInput]);

  const simulationConfig = useMemo(() => {
    if (algorithm.id === 'cycle') return { arr, hasCycle, cycleStartIndex, cycleTailIndex };
    if (['subsequences', 'perfectSquares', 'palindromeList'].includes(algorithm.id)) return listInput;
    return arr;
  }, [algorithm.id, arr, hasCycle, cycleStartIndex, cycleTailIndex, listInput]);

  const { steps, currentStep, currentStepIndex, setCurrentStepIndex, nextStep, prevStep, reset, play, pause, isPlaying, speed, setSpeed } = useSimulation(simulationConfig, algorithm.simulate);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) pause(); else play();
      } else if (e.code === 'ArrowRight') { nextStep(); } 
        else if (e.code === 'ArrowLeft') { prevStep(); } 
        else if (e.key.toLowerCase() === 'r') { reset(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause, nextStep, prevStep, reset]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-theme-bg">
      <PanelGroup direction="horizontal" className="h-full w-full">
        
        {/* LEFT PANEL — Code Viewer */}
        <Panel defaultSize={30} minSize={20} className="bg-[#1e1e1e] flex flex-col z-20">
          <div className="p-3 border-b border-[#333] bg-[#252526] flex items-center justify-between flex-none">
            <span className="text-sm font-semibold text-[#cccccc]">{algorithm.name}</span>
          </div>
          <div className="flex-1 overflow-hidden bg-[#1e1e1e] text-sm flex flex-col p-4 gap-4">
            <div className="flex-1 overflow-auto custom-scrollbar border border-[#333] rounded-md bg-[#1e1e1e] shadow-inner">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers
                wrapLines={true}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', overflowX: 'auto' }}
                lineNumberStyle={{ minWidth: '2.5em', color: '#6e7681', paddingRight: '1em', borderRight: '1px solid #333' }}
                lineProps={(lineNumber) => {
                  const isCurrent = currentStep?.line === lineNumber;
                  return {
                    style: {
                      display: 'block',
                      cursor: 'pointer',
                      backgroundColor: isCurrent ? 'rgba(170, 59, 255, 0.2)' : 'transparent',
                      borderLeft: isCurrent ? '4px solid #aa3bff' : '4px solid transparent',
                      paddingLeft: '10px'
                    },
                    onClick: () => {
                      const stepIndex = steps.findIndex(s => s.line === lineNumber);
                      if (stepIndex !== -1) setCurrentStepIndex(stepIndex);
                    }
                  };
                }}
              >
                {algorithm.code}
              </SyntaxHighlighter>
            </div>

            {algorithm.explanation && (
              <div className="flex-none p-4 bg-slate-800/80 rounded-xl border border-slate-700/50 shadow-md">
                <h4 className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2 pb-2 border-b border-slate-700/50">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Problem Explanation
                </h4>
                <p className="text-[13px] text-slate-300 leading-relaxed font-sans">{algorithm.explanation}</p>
              </div>
            )}
          </div>
        </Panel>

        <PanelResizeHandle className="w-1.5 bg-[#333] hover:bg-theme-accent transition-colors flex items-center justify-center cursor-col-resize z-30">
          <div className="h-8 w-0.5 bg-gray-500 rounded-full" />
        </PanelResizeHandle>

        {/* CENTER PANEL — Visualizer */}
        <Panel defaultSize={45} minSize={30} className="relative bg-[#0b1120] flex flex-col z-10">
          {algorithm.id === 'cycle' && (
             <CycleVisualizer 
                arr={arr} 
                hasCycle={hasCycle} setHasCycle={setHasCycle}
                cycleStartIndex={cycleStartIndex} setCycleStartIndex={setCycleStartIndex}
                cycleTailIndex={cycleTailIndex} setCycleTailIndex={setCycleTailIndex}
                currentStep={currentStep} steps={steps} reset={reset}
             />
          )}
          {algorithm.id === 'dutch' && <ArrayVisualizer currentStep={currentStep} arr={arr} />}
          {(algorithm.id === 'quickSort' || algorithm.id === 'mergeSort' || algorithm.id === 'permutations') && <SortingVisualizer currentStep={currentStep} />}
          {algorithm.id === 'perfectSquares' && <PerfectSquaresVisualizer currentStep={currentStep} />}
          {algorithm.id === 'subsequences' && <SubsequencesVisualizer currentStep={currentStep} />}
          {algorithm.id === 'lis' && <LISVisualizer currentStep={currentStep} />}
          {algorithm.id === 'subsets' && <RecursionVisualizer currentStep={currentStep} />}
          {algorithm.id === 'palindromeList' && <LinkedListVisualizer currentStep={currentStep} />}
        </Panel>

        <PanelResizeHandle className="w-1.5 bg-[#333] hover:bg-theme-accent transition-colors flex items-center justify-center cursor-col-resize z-30">
          <div className="h-8 w-0.5 bg-gray-500 rounded-full" />
        </PanelResizeHandle>

        {/* RIGHT PANEL — Controls & Memory */}
        <Panel defaultSize={25} minSize={15} className="bg-theme-bg flex flex-col p-4 overflow-y-auto custom-scrollbar z-20">
          <h2 className="text-xl font-heading font-bold text-theme-text-h mb-4">Execution State</h2>
          
          {/* Controls */}
          <div className="p-4 bg-theme-code-bg rounded-xl border border-theme-border mb-6 shadow-sm">
            <h3 className="text-xs font-semibold text-theme-text uppercase tracking-wider mb-3">Controls</h3>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <button onClick={reset} className="p-2 rounded-full hover:bg-theme-social-bg text-theme-text transition-colors" title="Reset (R)">
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <button onClick={prevStep} disabled={currentStepIndex === 0} className="p-2 rounded-full hover:bg-theme-social-bg text-theme-text disabled:opacity-50 transition-colors" title="Previous (Left Arrow)">
                <BackwardIcon className="w-5 h-5" />
              </button>
              <button onClick={isPlaying ? pause : play} className="p-3 bg-theme-accent text-white rounded-full hover:opacity-90 transition-opacity shadow-md" title="Play/Pause (Space)">
                {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
              </button>
              <button onClick={nextStep} disabled={currentStepIndex === steps.length - 1 || steps.length === 0} className="p-2 rounded-full hover:bg-theme-social-bg text-theme-text disabled:opacity-50 transition-colors" title="Next (Right Arrow)">
                <ForwardIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-2">
              <input 
                type="range" 
                min="0" 
                max={Math.max(0, steps.length - 1)} 
                value={currentStepIndex} 
                onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-theme-accent"
              />
              <div className="flex justify-between text-xs text-theme-text mt-1.5 font-mono">
                <span>Step {steps.length > 0 ? currentStepIndex + 1 : 0}</span>
                <span>Total {steps.length}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mt-4 border-t border-theme-border pt-4">
              <span className="text-theme-text font-medium">Auto-play Speed</span>
              <input 
                type="range" 
                min="100" 
                max="3000" 
                step="100"
                value={3100 - speed} 
                onChange={(e) => setSpeed(3100 - Number(e.target.value))}
                className="w-24 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-theme-accent"
              />
            </div>
            
            <div className="text-[10px] text-theme-text/70 mt-3 text-center">
              Shortcuts: Space to Play/Pause, Arrows to step, R to Reset
            </div>
          </div>

          {/* Input Data */}
          <div className="p-4 bg-theme-code-bg rounded-xl border border-theme-border mb-6 shadow-sm">
            <h3 className="text-xs font-semibold text-theme-text uppercase tracking-wider mb-3">Input Data</h3>
            <div className="flex flex-col gap-2 text-sm">
              <input
                type="text"
                value={listInput}
                onChange={(e) => setListInput(e.target.value)}
                className="bg-theme-bg border border-theme-border px-3 py-2 rounded outline-none focus:border-theme-accent w-full transition-colors"
                placeholder={algorithm.id === 'subsequences' ? 'e.g. abc' : 'e.g. 1,2,3...'}
              />
            </div>
          </div>

          {/* Memory Variables */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xs font-semibold text-theme-text uppercase tracking-wider mb-3">Memory Variables</h3>
            {currentStep ? (
              <div className="space-y-3 text-sm font-mono flex-1">
                <div className="p-3 bg-theme-accent/10 border border-theme-accent/30 rounded-lg">
                  <div className="text-theme-accent font-bold mb-1">{currentStep.phase}</div>
                  <div className="text-theme-text-h leading-relaxed">{currentStep.description}</div>
                </div>
                
                {/* Cycle pointers */}
                {algorithm.id === 'cycle' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-theme-code-bg rounded-lg border-l-4 border-[#22d3ee] shadow-sm">
                      <div className="text-theme-text text-xs mb-1">Slow Pointer</div>
                      <div className="text-[#22d3ee] font-bold text-lg">{currentStep.variables.slow !== null ? arr[currentStep.variables.slow] : 'null'}</div>
                    </div>
                    <div className="p-3 bg-theme-code-bg rounded-lg border-l-4 border-[#ef4444] shadow-sm">
                      <div className="text-theme-text text-xs mb-1">Fast Pointer</div>
                      <div className="text-[#ef4444] font-bold text-lg">{currentStep.variables.fast !== null ? arr[currentStep.variables.fast] : 'null'}</div>
                    </div>
                    <div className="col-span-2 p-3 bg-theme-code-bg rounded-lg border-l-4 border-theme-border shadow-sm flex items-center justify-between">
                      <span className="text-theme-text">Cycle Start Value:</span>
                      <span className="text-theme-text-h font-bold text-lg">{currentStep.variables.cycleStart !== null ? arr[currentStep.variables.cycleStart] : '-'}</span>
                    </div>
                  </div>
                )}

                {/* Dutch National Flag pointers */}
                {algorithm.id === 'dutch' && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-red-500 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Low</div>
                      <div className="text-red-500 font-bold text-sm md:text-lg">{currentStep.variables.low}</div>
                    </div>
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-white shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Mid</div>
                      <div className="text-white font-bold text-sm md:text-lg">{currentStep.variables.mid}</div>
                    </div>
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-blue-500 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">High</div>
                      <div className="text-blue-500 font-bold text-sm md:text-lg">{currentStep.variables.high}</div>
                    </div>
                  </div>
                )}

                {/* Sorting / Permutations pointers */}
                {(algorithm.id === 'quickSort' || algorithm.id === 'mergeSort' || algorithm.id === 'permutations') && (
                  <div className="grid grid-cols-2 gap-2">
                     {Object.entries(currentStep.variables?.pointers || {}).map(([key, val]) => val !== null && val !== undefined && (
                         <div key={key} className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-fuchsia-500 shadow-sm flex flex-col items-start gap-1">
                           <div className="text-theme-text text-[10px] uppercase font-mono">{key}</div>
                           <div className="text-fuchsia-400 font-bold tracking-wider">{val}</div>
                         </div>
                     ))}
                     {currentStep.variables?.pivotIndex !== null && currentStep.variables?.pivotIndex !== undefined && (
                         <div className="col-span-2 p-2 bg-theme-code-bg rounded-lg border-l-4 border-purple-500 shadow-sm flex items-center justify-between">
                           <span className="text-theme-text text-[10px] uppercase font-mono">Pivot Element Index</span>
                           <span className="text-purple-400 font-bold tracking-wider">{currentStep.variables.pivotIndex}</span>
                         </div>
                     )}
                  </div>
                )}

                {/* Perfect Squares */}
                {algorithm.id === 'perfectSquares' && currentStep.variables?.i !== null && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-red-500 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Target</div>
                      <div className="text-red-500 font-bold text-sm md:text-lg">{currentStep.variables.n}</div>
                    </div>
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-white shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Current i</div>
                      <div className="text-white font-bold text-sm md:text-lg">{currentStep.variables.i}</div>
                    </div>
                  </div>
                )}

                {/* Subsequences */}
                {algorithm.id === 'subsequences' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-blue-400 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">String Index</div>
                      <div className="text-blue-400 font-bold text-sm md:text-lg">{currentStep.variables.currentIndex}</div>
                    </div>
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-fuchsia-400 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Call Depth</div>
                      <div className="text-fuchsia-400 font-bold text-sm md:text-lg">{currentStep.variables.stackDepth}</div>
                    </div>
                  </div>
                )}

                {/* LIS */}
                {algorithm.id === 'lis' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-fuchsia-500 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Current i</div>
                      <div className="text-fuchsia-400 font-bold text-sm md:text-lg">{currentStep.variables.i !== null ? currentStep.variables.i : '-'}</div>
                    </div>
                    <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-blue-500 shadow-sm">
                      <div className="text-theme-text text-[10px] md:text-xs mb-1">Comparing j</div>
                      <div className="text-blue-400 font-bold text-sm md:text-lg">{currentStep.variables.j !== null ? currentStep.variables.j : '-'}</div>
                    </div>
                  </div>
                )}

                {/* Subsets */}
                {algorithm.id === 'subsets' && (
                  <div className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-fuchsia-500 shadow-sm">
                    <div className="text-theme-text text-[10px] md:text-xs mb-1">Current Index (i)</div>
                    <div className="text-fuchsia-400 font-bold text-sm tracking-wider">{currentStep.variables.index}</div>
                  </div>
                )}

                {/* Palindrome Linked List */}
                {algorithm.id === 'palindromeList' && (
                  <div className="grid grid-cols-2 gap-2">
                     {Object.entries(currentStep.variables?.pointers || {}).map(([key, val]) => val !== null && val !== undefined && (
                         <div key={key} className="p-2 bg-theme-code-bg rounded-lg border-l-4 border-fuchsia-500 shadow-sm flex flex-col items-start gap-1">
                           <div className="text-theme-text text-[10px] uppercase font-mono">{key}</div>
                           <div className="text-fuchsia-400 font-bold tracking-wider">
                             {typeof val === 'number' && currentStep.variables.nodes
                               ? `${currentStep.variables.nodes.find(n => n.id === val)?.val ?? val}`
                               : val}
                           </div>
                         </div>
                     ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-theme-text italic p-4 text-center rounded-lg border border-dashed border-theme-border">
                Simulation not started
              </div>
            )}
          </div>
        </Panel>

      </PanelGroup>
    </div>
  );
}

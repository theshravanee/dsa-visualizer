import { useState, useEffect } from 'react';

export function useSimulation(inputData, simulateFn) {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500);

  useEffect(() => {
    let active = true;
    Promise.resolve(simulateFn(inputData)).then(newSteps => {
      if (active) {
        setSteps(newSteps || []);
        setCurrentStepIndex(0);
        setIsPlaying(false);
      }
    });
    return () => { active = false; };
  }, [inputData, simulateFn]);

  const nextStep = () => setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  const reset = () => { setCurrentStepIndex(0); setIsPlaying(false); };
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, speed]);

  return { steps, currentStep: steps[currentStepIndex] || null, currentStepIndex, setCurrentStepIndex, nextStep, prevStep, reset, play, pause, isPlaying, speed, setSpeed };
}

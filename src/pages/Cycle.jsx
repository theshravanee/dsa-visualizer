import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function Cycle() {
  return <AlgorithmVisualizer algorithm={algorithms.cycle} />;
}

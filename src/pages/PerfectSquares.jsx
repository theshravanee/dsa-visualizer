import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function PerfectSquares() {
  return <AlgorithmVisualizer algorithm={algorithms.perfectSquares} />;
}

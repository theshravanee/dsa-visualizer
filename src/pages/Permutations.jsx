import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function Permutations() {
  return <AlgorithmVisualizer algorithm={algorithms.permutations} />;
}

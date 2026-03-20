import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function Subsets() {
  return <AlgorithmVisualizer algorithm={algorithms.subsets} />;
}

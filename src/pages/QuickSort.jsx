import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function QuickSort() {
  return <AlgorithmVisualizer algorithm={algorithms.quickSort} />;
}

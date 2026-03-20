import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function MergeSort() {
  return <AlgorithmVisualizer algorithm={algorithms.mergeSort} />;
}

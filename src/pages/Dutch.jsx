import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function Dutch() {
  return <AlgorithmVisualizer algorithm={algorithms.dutch} />;
}

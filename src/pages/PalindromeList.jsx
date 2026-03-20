import React from 'react';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import { algorithms } from '../algorithms';

export default function PalindromeList() {
  return <AlgorithmVisualizer algorithm={algorithms.palindromeList} />;
}

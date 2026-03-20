import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cycle from './pages/Cycle';
import Dutch from './pages/Dutch';
import PerfectSquares from './pages/PerfectSquares';
import Subsequences from './pages/Subsequences';
import QuickSort from './pages/QuickSort';
import MergeSort from './pages/MergeSort';
import LIS from './pages/LIS';
import Permutations from './pages/Permutations';
import Subsets from './pages/Subsets';
import PalindromeList from './pages/PalindromeList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cycle" element={<Cycle />} />
        <Route path="dutch" element={<Dutch />} />
        <Route path="perfect-squares" element={<PerfectSquares />} />
        <Route path="subsequences" element={<Subsequences />} />
        <Route path="quick-sort" element={<QuickSort />} />
        <Route path="merge-sort" element={<MergeSort />} />
        <Route path="lis" element={<LIS />} />
        <Route path="permutations" element={<Permutations />} />
        <Route path="subsets" element={<Subsets />} />
        <Route path="palindrome-list" element={<PalindromeList />} />
      </Route>
    </Routes>
  );
}

export default App;

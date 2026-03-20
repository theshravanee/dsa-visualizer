export function simulateQuickSort(inputArr) {
  const steps = [];
  const arr = [...inputArr];
  if (!arr || arr.length === 0) return steps;

  const sortedIndices = [];

  function record(line, phase, description, pointers = {}, pivotIndex = null, swappedIndices = []) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        array: [...arr],
        pointers,
        pivotIndex,
        swappedIndices,
        sortedIndices: [...sortedIndices]
      }
    });
  }

  function partition(low, high) {
    const pivot = arr[high];
    record(8, 'Partition Phase', `Choosing pivot element ${pivot} at index ${high}`, { low, high, i: low - 1 }, high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      record(11, 'Comparison', `Comparing arr[j] (${arr[j]}) with pivot (${pivot})`, { low, high, i, j }, high);
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        record(14, 'Swap Process', `arr[j] < pivot, so increment i to ${i} and swap`, { low, high, i, j }, high, [i, j]);
      }
    }
    
    // Swap pivot into correct place
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    record(17, 'Pivot Placement', `Swap pivot into correct finalized position at index ${i + 1}`, { low, high, i }, i + 1, [i + 1, high]);
    sortedIndices.push(i + 1); // Pivot is now in its final sorted position
    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      record(3, 'Divide Step', `Array partitioned at index ${pi}. Recursively sorting left subarrays...`, { low, high }, pi);
      quickSort(low, pi - 1);
      record(4, 'Divide Step', `Recursively sorting right subarrays...`, { low, high }, pi);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
      record(2, 'Base Case Subarray', `Subarray of size 1 is already fully sorted at index ${low}`, { low, high });
    }
  }

  record(1, 'Initialization', 'Spawning Quick Sort recursion on main array bounds', { low: 0, high: arr.length - 1 });
  quickSort(0, arr.length - 1);
  record(6, 'Complete', 'All recursions terminated; Array is fully sorted!', {}, null, [], Array.from({length: arr.length}, (_, idx) => idx));

  return steps;
}

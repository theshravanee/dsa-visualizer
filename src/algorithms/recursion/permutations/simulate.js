export function simulatePermutations(inputStr) {
  const parts = String(inputStr).split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  const steps = [];
  if (parts.length === 0) return steps;

  const result = [];
  const callStack = [];

  function record(line, phase, description, arrState, start, swapIndices = []) {
    steps.push({
      line, phase, description,
      variables: {
        array: [...arrState],
        start,
        result: [...result],
        callStack: [...callStack],
        pointers: { start },
        swappedIndices: swapIndices
      }
    });
  }

  function backtrack(start, currentArr) {
    callStack.push(`backtrack(${start})`);
    record(3, 'Execution Entry', `Exploring permutation branch targeting index start = ${start}`, currentArr, start);

    if (start === currentArr.length) {
      result.push([...currentArr]);
      record(5, 'Leaf Iteration Bound', `Array elements natively bounded hitting limits sequentially. Completed array mapping added.`, currentArr, start);
      callStack.pop();
      return;
    }

    for (let i = start; i < currentArr.length; i++) {
      record(8, 'Scan Mapping', `Branch iterating swap possibilities mapping exclusively over indices i=${i} natively across state start=${start}`, currentArr, start, [start, i]);
      
      const temp = currentArr[start];
      currentArr[start] = currentArr[i];
      currentArr[i] = temp;
      
      record(9, 'Swap Bound Traversal', `Swapped array element at strictly resolving bounds dynamically tracing index values.`, currentArr, start, [start, i]);
      
      backtrack(start + 1, currentArr);
      
      const tempRev = currentArr[start];
      currentArr[start] = currentArr[i];
      currentArr[i] = tempRev;

      record(11, 'Backtrack Swap Reversal', `Restoring active elements to strict branch boundaries securely popping index bounds natively returning sequentially.`, currentArr, start, [start, i]);
    }
    
    callStack.pop();
  }

  record(1, 'Matrix Binding Initialized', `Traversing initial permutation bounds structurally across subset lengths resolving ${parts.length} integers.`, parts, 0);
  backtrack(0, [...parts]);
  record(14, 'Recursion Exhausted', `Recursion branches correctly traversed sequentially yielding ${result.length} unique sets`, parts, parts.length);

  return steps;
}

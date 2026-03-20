export function simulateSubsets(inputStr) {
  const nums = String(inputStr).split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  const steps = [];
  if (nums.length === 0) return steps;

  const result = [];
  const callStack = [];

  function record(line, phase, description, index, currentSubset) {
    steps.push({
      line, phase, description,
      variables: {
        original: [...nums],
        index,
        currentSubset: [...currentSubset],
        result: [...result],
        callStack: [...callStack]
      }
    });
  }

  function backtrack(index, current) {
    callStack.push(`backtrack(${index}, [${current.join(',')}])`);
    record(3, 'Recursive Bound Evaluation', `Passing globally across bounded subset arrays natively resolving pointers spanning index=${index}`, index, current);

    result.push([...current]);
    record(4, 'Subset Appended', `Subsets tracked securely appended structurally explicitly saving combinations seamlessly [${current.join(',')}]`, index, current);

    for (let i = index; i < nums.length; i++) {
       record(5, 'Iteration Range Execution', `Validating explicitly checking branches sequentially resolving indices independently natively matching loop array elements mapping bounds (i=${i}, val=${nums[i]})`, index, current);
       
       current.push(nums[i]);
       record(6, 'Push Bound Traces', `Injected arrays conditionally tracking values mapped structurally pushing ${nums[i]} sequentially!`, index, current);
       
       backtrack(i + 1, current);
       
       current.pop();
       record(8, 'Popped Subset Traces', `Removing tailing element strictly tracing fallbacks popping arrays securely recursively.`, index, current);
    }

    callStack.pop();
  }

  record(1, 'Engine Spawned', `Spawning iteration array combinations mapping sequentially evaluating values explicitly.`, 0, []);
  backtrack(0, []);
  record(11, 'Engine Terminated', `Global power sets comprehensively generated dynamically tracking values natively returning ${result.length} elements`, nums.length, []);

  return steps;
}

export function simulateSubsequences(strInput) {
  const str = String(strInput);
  const steps = [];
  if (!str) return steps;

  const result = [];
  const recursionStack = []; 

  function record(line, phase, description, index, currentSub) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        original: str,
        currentIndex: index,
        currentSubsequence: currentSub,
        result: [...result],
        stackDepth: recursionStack.length,
        callStack: [...recursionStack]
      }
    });
  }

  function getSubsequences(index, current) {
    recursionStack.push(`get(${index}, "${current}")`);

    record(1, 'Recursive Call', `Entering getSubsequences at string bound index ${index} with subset "${current}"`, index, current);

    if (index === str.length) {
      result.push(current);
      record(3, 'Base Case Reached', `Index ${index} equals string length! Adding "${current}" to results array.`, index, current);
      recursionStack.pop();
      return;
    }

    record(7, 'Branch: Exclude', `Excluding character '${str[index]}' at boundary index ${index}. Recursing deeper.`, index, current);
    getSubsequences(index + 1, current);

    record(10, 'Branch: Include', `Including character '${str[index]}' at boundary index ${index}. Recursing deeper.`, index, current);
    getSubsequences(index + 1, current + str[index]);

    record(12, 'Return', `Finished processing both tree branches for index ${index}. Falling back gracefully!`, index, current);
    recursionStack.pop();
  }

  getSubsequences(0, '');
  record(13, 'Done', `All subsets sequentially generated. Total combinations found: ${result.length}`, str.length, '');

  return steps;
}

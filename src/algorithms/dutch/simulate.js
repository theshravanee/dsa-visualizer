export function simulateDutch(arr) {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  const currentArray = [...arr]; // clone to avoid mutating standard objects

  function record(line, phase, description, low, mid, high) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        array: [...currentArray],
        low,
        mid,
        high
      }
    });
  }

  let low = 0;
  let mid = 0;
  let high = currentArray.length - 1;

  record(2, 'Initialization', 'Set low, mid to 0, and high to end', low, mid, high);

  while (mid <= high) {
    record(3, 'Condition Check', `Is mid (${mid}) <= high (${high})? Yes.`, low, mid, high);
    if (currentArray[mid] === 0) {
      record(4, 'Element check', `nums[mid] (${currentArray[mid]}) === 0`, low, mid, high);
      
      const temp = currentArray[low];
      currentArray[low] = currentArray[mid];
      currentArray[mid] = temp;
      
      record(5, 'Swap Phase', `Swapped mid with low`, low, mid, high);
      low++;
      mid++;
      record(6, 'Adjust Pointers', `Incremented low and mid`, low, mid, high);
    } else if (currentArray[mid] === 1) {
      record(7, 'Element check', `nums[mid] (${currentArray[mid]}) === 1`, low, mid, high);
      mid++;
      record(8, 'Adjust Pointers', `Incremented mid`, low, mid, high);
    } else {
      record(9, 'Element check', `nums[mid] (${currentArray[mid]}) isn't 0 or 1`, low, mid, high);
      
      const temp = currentArray[high];
      currentArray[high] = currentArray[mid];
      currentArray[mid] = temp;
      
      record(10, 'Swap Phase', `Swapped mid with high`, low, mid, high);
      high--;
      record(11, 'Adjust Pointers', `Decremented high`, low, mid, high);
    }
  }
  record(14, 'Sorted', 'Array is completely sorted', low, mid, high);

  return steps;
}

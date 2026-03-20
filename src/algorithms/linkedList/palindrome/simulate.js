export function simulatePalindromeList(inputStr) {
  const steps = [];
  const arr = String(inputStr).split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  if (arr.length === 0) return steps;

  const nodes = arr.map((val, i) => ({
    id: i, val, originalIndex: i, listId: 0, next: i < arr.length - 1 ? i + 1 : null, recentlyModified: false
  }));

  function getCopy() { return nodes.map(n => ({...n})); }

  function record(line, phase, description, pointersObj, extraVars = {}) {
    steps.push({
      line, phase, description,
      variables: { nodes: getCopy(), pointers: pointersObj, ...extraVars }
    });
    nodes.forEach(n => n.recentlyModified = false);
  }

  let slow = 0, fast = 0;
  record(3, 'Initialize Indices', `Mapping pointers optimally evaluating natively spanning variables safely generating permutations correctly`, { slow, fast });

  while (fast !== null && nodes[fast].next !== null) {
    slow = nodes[slow].next;
    fast = nodes[nodes[fast].next].next;
    record(5, 'Index Sweeps', `Advanced iterations safely bounding native loop trackers natively scaling slow by 1 securely fast by 2`, { slow, fast });
  }

  let prev = null;
  let curr = slow;
  record(8, 'Setup Reversal Loop', `Starting dynamically scaling arrays reversing second matching limits tracking bounds securely from mid natively`, { prev, curr, slow });

  while (curr !== null) {
    let nextTemp = nodes[curr].next;
    nodes[curr].next = prev;
    nodes[curr].recentlyModified = true;
    record(12, 'Reversal Matrix Swap', `Structurally binding index native tracking backwards securely mapping loops cleanly resolving pointers!`, { prev, curr, nextTemp, slow });
    prev = curr;
    curr = nextTemp;
  }
  record(14, 'Bound Reversal Terminated', `Successfully mapped second linked arrays seamlessly backtracking iterations securely aligning tails locally.`, { prev, curr, slow });

  let left = 0;
  let right = prev;
  let isPal = true;
  record(16, 'Check Constraints Loop', `Mapping two native iteration sets evaluating boundaries exactly tracking equality conditions strictly mapping ends efficiently`, { left, right });

  while (right !== null) {
    if (nodes[left].val !== nodes[right].val) {
      isPal = false;
      record(18, 'Boundary Check Fail', `Evaluating combinations securely actively generating mismatches heavily mapping limits strictly structurally unequal`, { left, right });
      break;
    }
    record(17, 'Boundary Match Structurally', `Explicitly matching arrays generating bounds seamlessly resolving combinations linearly exactly structurally matching identically mapping parameters`, { left, right });
    
    left = nodes[left].next;
    right = nodes[right].next;
    if (right !== null) record(20, 'Progress Matching Maps', `Advanced iterations evaluating strictly bounding next traces accurately resolving elements linearly safely.`, { left, right });
  }

  record(22, 'Execution Halt Phase', `Combinations loops reliably bounded evaluating parameters correctly returning final iteration trace mappings securely successfully ${isPal}`, { left, right }, { isPalindrome: isPal });
  return steps;
}

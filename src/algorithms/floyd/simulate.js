import { arrayToList, createCycleFromIndices } from '../../utils/linkedList';

export function simulateFloyd(config) {
  const steps = [];
  
  const { arr, hasCycle, cycleStartIndex, cycleTailIndex } = config;
  let head = arrayToList(arr);
  if (hasCycle) {
    head = createCycleFromIndices(head, cycleStartIndex, cycleTailIndex);
  }
  
  if (!head) return steps;

  // Helper to record a step
  function record(line, phase, description, slowNode, fastNode, cycleStart = null) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        slow: slowNode ? slowNode.index : null,
        fast: fastNode ? fastNode.index : null,
        cycleStart: cycleStart ? cycleStart.index : null,
      },
    });
  }

  let slow = head;
  let fast = head;
  record(2, 'Initialization', 'Initialize both pointers at head', slow, fast);

  // Phase 1: detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    record(4, 'Race Phase', 'Slow moves one step', slow, fast);

    fast = fast.next.next;
    record(5, 'Race Phase', 'Fast moves two steps', slow, fast);

    if (slow === fast) {
      record(6, 'Collision', 'Pointers met – cycle detected', slow, fast);
      break;
    }
  }

  // If no cycle
  if (!fast || !fast.next) {
    record(8, 'No Cycle', 'Fast reached end – no cycle', slow, fast);
    return steps;
  }

  // Phase 2: find cycle start
  slow = head;
  record(9, 'Reset Phase', 'Reset slow to head', slow, fast);

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
    record(11, 'Entry Search', 'Both move one step', slow, fast);
  }

  record(14, 'Entry Found', 'Pointers met at cycle start', slow, fast, slow);
  return steps;
}

export class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
    this.id = Math.random().toString(36).substr(2, 9);
    this.index = null; 
  }
}

export function arrayToList(arr) {
  if (!arr || !arr.length) return null;
  const head = new ListNode(arr[0]);
  head.index = 0;
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current.next.index = i;
    current = current.next;
  }
  return head;
}

export function listToArray(head) {
  const result = [];
  let current = head;
  let visited = new Set();
  while (current && !visited.has(current)) {
    result.push(current.value);
    visited.add(current);
    current = current.next;
  }
  return result;
}

export function findNodeByValue(head, value) {
  let current = head;
  let visited = new Set();
  while (current && !visited.has(current)) {
    if (String(current.value) === String(value)) return current;
    visited.add(current);
    current = current.next;
  }
  return null;
}

export function createCycle(head, startValue, endValue) {
  const startNode = findNodeByValue(head, startValue);
  const endNode = findNodeByValue(head, endValue);
  if (endNode && startNode) {
    endNode.next = startNode;
  }
  return head;
}

export function createCycleFromIndices(head, startIndex, endIndex) {
  let startNode = null;
  let endNode = null;
  let current = head;
  let idx = 0;
  
  while (current && idx <= Math.max(startIndex, endIndex)) {
    if (idx === startIndex) startNode = current;
    if (idx === endIndex) endNode = current;
    current = current.next;
    idx++;
  }
  
  if (startNode && endNode) {
    endNode.next = startNode;
  }
  return head;
}

export function simulateMergeSort(inputArr) {
  const steps = [];
  const arr = [...inputArr];
  if (!arr || arr.length === 0) return steps;

  function record(line, phase, description, pointers = {}, swappedIndices = []) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        array: [...arr],
        pointers,
        swappedIndices,
        sortedIndices: []
      }
    });
  }

  function merge(l, m, r) {
    record(8, 'Merge Setup', `Merging sorted subarrays: bounds [${l}...${m}] and [${m+1}...${r}]`, { left: l, mid: m, right: r });
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = new Array(n1);
    const R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      record(13, 'Compare Step', `Comparing L[i] (${L[i]}) and R[j] (${R[j]})`, { left: l, right: r, k });
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        record(14, 'Overwrite Main Array', `Copied L element (${L[i]}) sequentially to index ${k}`, { left: l, right: r, k }, [k]);
        i++;
      } else {
        arr[k] = R[j];
        record(15, 'Overwrite Main Array', `Copied R element (${R[j]}) sequentially to index ${k}`, { left: l, right: r, k }, [k]);
        j++;
      }
      k++;
    }
    while (i < n1) {
      arr[k] = L[i];
      record(18, 'Exhausting Subarray', `Copied remaining L elements (${L[i]}) into index ${k}`, { left: l, right: r, k }, [k]);
      i++; k++;
    }
    while (j < n2) {
      arr[k] = R[j];
      record(19, 'Exhausting Subarray', `Copied remaining R elements (${R[j]}) into index ${k}`, { left: l, right: r, k }, [k]);
      j++; k++;
    }
    record(21, 'Merge Output', `Merge completely resolved. Subarray [${l}...${r}] sorted stably.`, { left: l, right: r });
  }

  function mergeSort(l, r) {
    if (l >= r) {
       record(2, 'Base Condition', `Index bounds overlap or terminate at ${l}.`, { left: l, right: r });
       return;
    }
    const m = l + Math.floor((r - l) / 2);
    record(3, 'Divide Step', `Splitting array centrally into bounds [${l}...${m}] and [${m+1}...${r}]`, { left: l, mid: m, right: r });
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  record(1, 'Initialization', 'Spawning overall Merge Sort recursive stack', { left: 0, right: arr.length - 1 });
  mergeSort(0, arr.length - 1);
  record(6, 'Completion', 'All recursions terminated; Array is fully sorted!', {}, []);

  const len = steps.length;
  steps[len - 1].variables.sortedIndices = Array.from({length: arr.length}, (_, i) => i);

  return steps;
}

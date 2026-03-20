export function simulateLIS(arr) {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  let dp = new Array(arr.length).fill(1);

  function record(line, phase, description, i, j) {
    steps.push({
      line, phase, description,
      variables: { array: [...arr], dp: [...dp], i, j }
    });
  }

  record(2, 'Init Base States', `Created DP tracking array of mapped bounds ${arr.length} populated purely with distinct 1s`, null, null);

  for (let i = 0; i < arr.length; i++) {
    record(3, 'Outer Bounds Traversal', `Generating LIS combinations ending explicitly at active index i=${i} (val: ${arr[i]})`, i, null);
    for (let j = 0; j < i; j++) {
      record(5, 'Subsequence Scan', `Evaluating boundaries overlapping with previously encountered elements globally at j=${j} (val: ${arr[j]})`, i, j);
      if (arr[i] > arr[j]) {
        const candidate = dp[j] + 1;
        const prev = dp[i];
        dp[i] = Math.max(dp[i], candidate);
        if (candidate > prev) {
             record(6, 'Append LIS Match', `arr[i] > arr[j]. Successfully appended element tracing natively extending subset: dp[${i}] conditionally updated to structurally map ${candidate}`, i, j);
        } else {
             record(6, 'Skip LIS Modification', `arr[i] > arr[j], however explicitly appending candidate maps weakly to length bounded ${candidate} and functionally breaks minimum bounds mapped actively by ${prev}`, i, j);
        }
      } else {
        record(5, 'Sequence Sever', `arr[i] bounds (${arr[i]}) uniquely drop below globally active trace maps mapped against arr[j] (${arr[j]}), sequence drops integrally.`, i, j);
      }
    }
  }

  record(10, 'Result Output Matrix', `Matrix explicitly traced correctly tracking max DP mapping globally to bounds ${Math.max(...dp)}`, null, null);
  return steps;
}

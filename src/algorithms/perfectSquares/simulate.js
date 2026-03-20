export function simulatePerfectSquares(nStr) {
  const n = parseInt(nStr, 10);
  const steps = [];
  if (isNaN(n) || n < 1 || n > 200) return steps; 

  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  function record(line, phase, description, i, j) {
    steps.push({
      line,
      phase,
      description,
      variables: {
        n,
        i,
        j,
        dp: [...dp],
        currentSquare: j ? j * j : null,
      }
    });
  }

  record(2, 'Initialization', `Initialize DP array of size ${n + 1} with Infinity, set dp[0] = 0`, 0, null);

  for (let i = 1; i <= n; i++) {
    record(4, 'Outer Loop', `Computing minimum squares for i = ${i}`, i, null);
    for (let j = 1; j * j <= i; j++) {
      record(5, 'Inner Loop', `Trying square j = ${j} (j*j = ${j * j}) <= ${i}`, i, j);
      
      const prev = dp[i];
      const candidate = dp[i - j * j] + 1;
      dp[i] = Math.min(dp[i], candidate);
      
      if (candidate < prev) {
         record(6, 'DP Update', `Updated dp[${i}] = dp[${i} - ${j*j}] + 1 = dp[${i - j*j}] + 1 = ${candidate}`, i, j);
      } else {
         record(6, 'DP Check', `dp[${i}] remains ${prev} since ${candidate} is not smaller than ${prev}`, i, j);
      }
    }
  }

  record(9, 'Result', `Finished computation. Minimum squares for ${n} is ${dp[n]}`, null, null);
  
  return steps;
}

// Using recursion
// This approach has cost O(2^N), i.e, exponential
var fib = function (n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
};

// We can reduce the time complexity to O(N) using Dynamic programming approach
// Using Tabulation
var fib = function (n) {
  const f = [];
  f[0] = 0;
  f[1] = 1;
  for (let i = 2; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
};

// tabulation using recursion
var fib = function (n, dp = []) {
  if (n <= 1) return n;
  if (dp[n]) {
    return dp[n];
  }
  dp[n] = fib(n - 1, dp) + fib(n - 2, dp);
  return dp[n];
};

// Using Memoization
var fib = function (n) {
  if (n <= 1) return n;
  let currMinusTwo = 0;
  let currMinusOne = 1;
  let current;
  for (let i = 2; i <= n; i++) {
    current = currMinusOne + currMinusTwo;
    currMinusTwo = currMinusOne;
    currMinusOne = current;
  }
  return current;
};

/*
1137. N-th Tribonacci Number
https://leetcode.com/problems/n-th-tribonacci-number/
Category - Easy

The Tribonacci sequence Tn is defined as follows: 
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given n, return the value of Tn.
 */
/**
 * @param {number} n
 * @return {number}
 */
/* 
Approach 1: Recursion with Memoization (Top-Down)
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory Usage: 48.84 MB Beats 42.67%
*/
var tribonacci = function (n) {
  const memo = new Array(n + 1).fill(-1);
  memo[0] = 0;
  memo[1] = 1;
  memo[2] = 1;
  const dp = (i) => {
    if (memo[i] !== -1) return memo[i];
    memo[i] = dp(i - 3) + dp(i - 2) + dp(i - 1);
    return memo[i];
  };
  return dp(n);
};

/*
Approach: Dynamic programming using memoization
Time complexity: O(N)
Space Complexity: O(N)
Runtime: 80 ms, faster than 42.26% of JavaScript online submissions for N-th Tribonacci Number.
Memory Usage: 38.3 MB, less than 56.23% of JavaScript online submissions for N-th Tribonacci Number.
 */
var tribonacci = function (n) {
  dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  return dp[n];
};

/*
Approach: Dynamic programming using memoization, but without space
Time complexity: O(N)
Space Complexity: O(1)

Runtime: 76 ms, faster than 71.70% of JavaScript online submissions for N-th Tribonacci Number.
Memory Usage: 38.4 MB, less than 56.23% of JavaScript online submissions for N-th Tribonacci Number.
 */
var tribonacci = function (n) {
  let first = 0;
  let second = 1;
  let third = 1;
  for (let i = 3; i <= n; i++) {
    let fourth = first + second + third;
    first = second;
    second = third;
    third = fourth;
  }
  return third;
};

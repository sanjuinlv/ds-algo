/* 
70. Climbing Stairs
https://leetcode.com/problems/climbing-stairs/description/
Type: Easy

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 
Constraints:
 - 1 <= n <= 45

*/
/* 
Top-down (recursive)
Time complexity: O(2^n) Size of recusion tree will be 2^n
Space complexity: O(n) the depth of recursion an go upto n
*/
var climbStairs = function (n) {
  const dp = (i) => {
    // Base cases
    if (i <= 2) return i;
    // Recurrence relation
    return dp(i - 1) + dp(i - 2);
  };
  return dp(n);
};

/* 
Top-down (recursive) with Memoization (Using Map)
Time complexity: O(n)
Space complexity: O(n) 

Runtime: 102 ms, faster than 20.71% of JavaScript online submissions for Climbing Stairs.
Memory Usage: 41.8 MB, less than 56.60% of JavaScript online submissions for Climbing Stairs.

*/
var climbStairs = function (n) {
  const memo = new Map();
  const dp = (i) => {
    // Base cases
    if (i <= 2) return i;
    if (!memo.has(i)) {
      memo.set(i, dp(i - 1) + dp(i - 2));
    }
    // Recurrence relation
    return memo.get(i);
  };
  return dp(n);
};

/* 
Top-down (recursive) with Memoization (using Array)
Time complexity: O(n)
Space complexity: O(n) 
*/
var climbStairs = function (n) {
  const memo = new Array(n + 1);
  const dp = (i) => {
    // Base cases
    if (i <= 2) return i;
    if (!memo[i]) {
      memo[i] = dp(i - 1) + dp(i - 2);
    }
    // Recurrence relation
    return memo[i];
  };
  return dp(n);
};

/* 
Approach: Bottom-Up (iterative)
Time complexity: O(n)
Space complexity: O(n)

Runtime: 100 ms, faster than 23.56% of JavaScript online submissions for Climbing Stairs.
Memory Usage: 41.4 MB, less than 93.05% of JavaScript online submissions for Climbing Stairs.
*/
var climbStairs = function (n) {
  if (n == 1) return 1;
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]; // Recurrence relation
  }
  return dp[n];
};

/* 
Approach: Bottom-Up (iterative) without using space
Time complexity: O(n)
Space complexity: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 48.41 MB Beats 83.97%
*/
var climbStairs = function (n) {
  if (n == 1) return 1;
  let first = 1;
  let second = 2;
  for (i = 3; i <= n; i++) {
    const curr = first + second;
    first = second;
    second = curr;
  }
  return second;
};
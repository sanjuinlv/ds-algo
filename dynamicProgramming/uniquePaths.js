/*
62. Unique Paths
https://leetcode.com/problems/unique-paths/description/
Type: Medium

There is a robot on an m x n grid. The robot is initially located at the top-left corner
(i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]).
The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the
robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 10^9.

Example 1:
Input: m = 3, n = 7
Output: 28

Example 2:
Input: m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down

Constraints:
 - 1 <= m, n <= 100
*/
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
/* 
Approach: Recursion
*/
var uniquePaths = function (m, n) {
  const move = (i, j) => {
    //base case
    if (i == m - 1 && j == n - 1) return 1;
    let count = 0;
    //move down
    if (i + 1 < m) count = move(i + 1, j);
    //move right
    if (j + 1 < n) count += move(i, j + 1);
    return count;
  };
  return move(0, 0);
};

/* 
Approach II: Recursion + memo
Time: O(M*N)
Space: O(M*N)

Runtime: 1 ms Beats 49.66%
Memory: 49.31 MB Beats 44.42%
*/
var uniquePaths = function (m, n) {
  const memo = Array.from({ length: m }, () => Array(n));
  const countPaths = (i, j) => {
    //base case
    if (i == m - 1 && j == n - 1) return 1;
    if (memo[i][j] != null) return memo[i][j];
    let count = 0;
    //move down
    if (i + 1 < m) count = countPaths(i + 1, j);
    //move right
    if (j + 1 < n) count += countPaths(i, j + 1);
    return (memo[i][j] = count);
  };
  return countPaths(0, 0);
};

/* 
Tabulation

Runtime: 1 ms Beats 49.66%
Memory; 48.56 MB Beats 94.21%
*/
var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  // Note: if we fill the dp with 1 then we don't need below base cases
  // Initialize the base cases
  // There's only one way to reach any cell in the last row or last column
  for (let i = 0; i < m; i++) dp[i][n - 1] = 1; //last colum
  for (let j = 0; j < n; j++) dp[m - 1][j] = 1; //last row

  for (let i = m - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      //move down
      dp[i][j] = dp[i + 1][j];
      //move right
      dp[i][j] += dp[i][j + 1];
    }
  }
  return dp[0][0];
};

/* 
Approach: DP (Bottom Up) - Iterative
Runtime: 56 ms, faster than 98.34% of JavaScript online submissions for Unique Paths.
Memory Usage: 41.9 MB, less than 76.06% of JavaScript online submissions for Unique Paths.
*/
var uniquePaths = function (m, n) {
  let dp = [...Array(m)].map((x) => new Array(n).fill(1));
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      //curr cell is sum of Left and Upper cell values
      dp[row][col] = dp[row][col - 1] + dp[row - 1][col];
    }
  }
  return dp[m - 1][n - 1];
};

/* 
63. Unique Paths II
https://leetcode.com/problems/unique-paths-ii/description/
Type: Medium

You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

Example 1:
  Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
  Output: 2
  Explanation: There is one obstacle in the middle of the 3x3 grid above.
  There are two ways to reach the bottom-right corner:
  1. Right -> Right -> Down -> Down
  2. Down -> Down -> Right -> Right

Example 2:
  Input: obstacleGrid = [[0,1],[0,0]]
  Output: 1

Constraints:
 - m == obstacleGrid.length
 - n == obstacleGrid[i].length
 - 1 <= m, n <= 100
 - obstacleGrid[i][j] is 0 or 1.
*/
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
//recursion
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const countPath = (i, j) => {
    if (i >= m || j >= n) return 0;
    //obstacle found
    if (obstacleGrid[i][j] == 1) return 0;
    //base case
    if (i == m - 1 && j == n - 1) return 1;
    return countPath(i + 1, j) + countPath(i, j + 1);
  };
  return countPath(0, 0);
};

/* 
Recursion + memo

Runtime: 2 ms Beats 33.00%
Memory: 49.64 MB Beats 54.55%
*/
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const memo = Array.from({ length: m }, () => Array(n));
  const countPath = (i, j) => {
    if (i >= m || j >= n) return 0;
    //base case
    if (obstacleGrid[i][j] == 1) return 0;
    if (i == m - 1 && j == n - 1) return 1;
    if (memo[i][j] != null) return memo[i][j];
    //obstacle found
    return (memo[i][j] = countPath(i + 1, j) + countPath(i, j + 1));
  };
  return countPath(0, 0);
};

/* 
Approach II: Bottom Up

Runtime: 1 ms Beats 63.39%
Memory: 50.00 MB Beats 35.62%
*/
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  // Initialize the first cell
  dp[0][0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  // Initialize the first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = obstacleGrid[i][0] === 0 ? dp[i - 1][0] : 0;
  }
  // Initialize the first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = obstacleGrid[0][j] === 0 ? dp[0][j - 1] : 0;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] == 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      else dp[i][j] = 0;
    }
  }
  return dp[m - 1][n - 1];
};
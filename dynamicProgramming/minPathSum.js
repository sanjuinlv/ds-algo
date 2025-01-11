/*
64. Minimum Path Sum
https://leetcode.com/problems/minimum-path-sum/
Type: Medium 

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:
  Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
  Output: 7
  Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

Example 2:
  Input: grid = [[1,2,3],[4,5,6]]
  Output: 12
 
Constraints:
 - m == grid.length
 - n == grid[i].length
 - 1 <= m, n <= 200
 - 0 <= grid[i][j] <= 200
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
//Recursion
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const pathSum = (i, j) => {
    //we went out of boundary
    if (i == m || j == n) return Infinity;
    // reached at the end of matrix
    if (i == m - 1 && j == n - 1) return grid[i][j];
    const sum = grid[i][j] + Math.min(pathSum(i + 1, j), pathSum(i, j + 1));
    return sum;
  };
  return pathSum(0, 0);
};

/* 
Approach II: Recursion + Memo
Time: O(M * N)
Space: O(M * N)

Runtime: 6 ms Beats 57.01%
Memory: 50.59 MB Beats 96.68%
*/
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const memo = Array.from({ length: m }, () => Array(n));
  const pathSum = (i, j) => {
    //we went out of boundary
    if (i == m || j == n) return Infinity;
    // reached at the end of matrix
    if (i == m - 1 && j == n - 1) return grid[i][j];
    if (memo[i][j] != null) return memo[i][j];
    memo[i][j] = grid[i][j] + Math.min(pathSum(i + 1, j), pathSum(i, j + 1));
    return memo[i][j];
  };
  return pathSum(0, 0);
};

/* 
Approach II: Bottom Up DP
Time: O(M * N)
Space: O(M * N)

Runtime: 1 ms Beats 97.11%
Memory: 52.30 MB Beats 34.33%
*/
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(Infinity));
  //base case
  dp[0][0] = grid[0][0];
  //first column
  for (let i = 1; i < m; i++) dp[i][0] = grid[i][0] + dp[i - 1][0];
  //first row
  for (let j = 1; j < n; j++) dp[0][j] = grid[0][j] + dp[0][j - 1];

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m - 1][n - 1];
};

/* 
Approach II: Bottom Up DP with O(1) space
Time: O(M * N)
Space: O(1)

Runtime: 60 ms Beats 5.03%
Memory: 50.77 MB Beats 92.83%
*/
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  //calculate distance travelled within first colum
  for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];
  //calculate distance travelled within first row
  for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];
  // Start from row one and column one because we've precomputed above
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // The distance to the grid at i,j is equal to itself plus the minimum
      // of the two grid spaces (one above, one to the left)
      grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }
  return grid[m - 1][n - 1];
};

/*
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
  let noOfPaths = 0;
  const move = (row, col) => {
    //reached at bottom right corner
    if (col == n - 1) {
      noOfPaths++;
      return;
    }
    //move down
    if (row < m - 1) move(row + 1, col);
    //move right
    if (col < n - 1) move(row, col + 1);
  };
  move(0, 0);
  return noOfPaths;
};

/* 
Approach: DP (Top Down)
Runtime: 85 ms, faster than 50.32% of JavaScript online submissions for Unique Paths.
Memory Usage: 42.5 MB, less than 38.68% of JavaScript online submissions for Unique Paths.
*/
var uniquePaths = function (m, n) {
  let memo = [...Array(m)].map((x) => new Array(n).fill(-1));
  const move = (row, col) => {
    if (memo[row][col] !== -1) return memo[row][col];
    //reached at bottom right corner
    if (col == n - 1) {
      return 1;
    }
    let noOfMove = 0;
    //move down
    if (row < m - 1) {
      noOfMove += move(row + 1, col);
    }
    //move right
    if (col < n - 1) {
      noOfMove += move(row, col + 1);
    }
    memo[row][col] = noOfMove;
    return memo[row][col];
  };
  return move(0, 0);
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

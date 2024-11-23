/**
221. Maximal Square
https://leetcode.com/problems/maximal-square/solution/
Category - Medium

Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's 
and return its area.

Example 1:
Input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],
  ["1","0","0","1","0"]]

matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];

Output: 4

Example 2:
Input: matrix = [["0","1"],["1","0"]]
Output: 1

Example 3:
Input: matrix = [["0"]]
Output: 0

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is '0' or '1'.
*/
/*
 * @param {character[][]} matrix
 * @return {number}
 */
/* 
Approach: Dynamic Programming
Time: O(M*N)
Space: O(M*N)

Runtime: 32 ms Beats 37.40%
Memory: 60.31 MB Beats 23.84%
*/
var maximalSquare = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const dp = [...Array(m + 1)].map((x) => new Array(n + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (matrix[i - 1][j - 1] == "1") {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }
  return maxSide * maxSide;
};

/* 
Approach: Better Dynamic Programming
Time: O(mn)
Space: O(mn)
Runtime: 88 ms, faster than 91.45% of JavaScript online submissions for Maximal Square.
Memory Usage: 47.9 MB, less than 47.25% of JavaScript online submissions for Maximal Square.
*/
var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = new Array(cols + 1).fill(0);
  let maxSide = 0;
  let prev = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const temp = dp[j];
      if (matrix[i - 1][j - 1] === "1") {
        const temp = dp[j];
        dp[j] = Math.min(dp[j - 1], prev, dp[j]) + 1;
        maxSide = Math.max(maxSide, dp[j]);
      }
      prev = temp;
    }
  }
  return maxSide * maxSide;
};

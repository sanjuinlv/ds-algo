/**
Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's 
and return its area.

Input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4

 * @param {character[][]} matrix
 * @return {number}
 */
matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];
var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = [...Array(rows + 1)].map((x) => Array(cols + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= rows; i++) {
    for (j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
      maxSide = Math.max(maxSide, dp[i][j]);
    }
  }
  return maxSide * maxSide;
};

//21/03/2022
/* 
Approach: Dynamic Programming
Time: O(mn)
Space: O(mn)
Runtime: 88 ms, faster than 91.45% of JavaScript online submissions for Maximal Square.
Memory Usage: 47.9 MB, less than 47.25% of JavaScript online submissions for Maximal Square.

*/
var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = [...Array(rows + 1)].map((x) => Array(cols + 1).fill(0));
  let maxSide = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
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

/* 
Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

Constraints:

m == mat.length
n == mat[i].length
1 <= m, n <= 10^4
1 <= m * n <= 10^4
-10^5 <= mat[i][j] <= 10^5
*/
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
/* 
Approach 1: Diagonal Iteration
Time: O(M*N)
Space: O(1)
Runtime: 140 ms, faster than 46.72% of JavaScript online submissions for Diagonal Traverse.
Memory Usage: 47.2 MB, less than 98.49% of JavaScript online submissions for Diagonal Traverse.
*/
var findDiagonalOrder = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  let row = 0;
  let col = 0;
  const result = new Array(m * n);
  for (let i = 0; i < result.length; i++) {
    console.log(`i: ${i}, row: ${row}, col: ${col} `);
    result[i] = mat[row][col];
    // The direction is always up when the sum of row & col is even
    if ((row + col) % 2 == 0) {
      // For last column, go down
      if (col == n - 1) {
        row++;
        // For first row & non-last columns, go right
      } else if (row == 0) {
        col++;
        // For not first row & non-last columns, go up and to the right
      } else {
        row--;
        col++;
      }
      // The direction is always down when the sum of row & col is odd
    } else {
      // For last row, go right
      if (row == m - 1) {
        col++;
        //  For non-last row & first column, go down
      } else if (col == 0) {
        row++;
      } else {
        // For non-last row & non-first column, go down and to the left
        row++;
        col--;
      }
    }
  }

  return result;
};

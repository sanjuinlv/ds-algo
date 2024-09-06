/* 
https://leetcode.com/problems/diagonal-traverse
Type: Medium

Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.
|1, 2, 3|
|4, 5, 6|
|7, 8, 9|

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

Constraints:

 - m == mat.length
 - n == mat[i].length
 - 1 <= m, n <= 10^4
 - 1 <= m * n <= 10^4
 - -10^5 <= mat[i][j] <= 10^5
*/
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
/* 
Approach 1: Diagonal Iteration
Time: O(M*N)
Space: O(1)
Runtime: 66 ms, faster than 94.83% of JavaScript online submissions for Diagonal Traverse.
Memory Usage: 54.43 MB, less than 95.40% of JavaScript online submissions for Diagonal Traverse.
*/
var findDiagonalOrder = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const result = new Array(rows * cols);
  let row = 0;
  let col = 0;
  for (let i = 0; i < result.length; i++) {
    result[i] = mat[row][col];
    // The direction is always up when the sum of row & col is even (row -1, col+1)
    if ((row + col) % 2 == 0) {
      // For last column, go down
      if (col == cols - 1) {
        row++;
      } else if (row == 0) {
        // For first row & non-last columns, go right
        col++;
      } else {
        // For not first row & non-last columns, go up and to the right
        row--;
        col++;
      }
      // The direction is always down when the sum of row & col is odd
    } else {
      // go down (row+1, col - 1)
      // For last row, go right
      if (row == rows - 1) {
        col++;
      } else if (col == 0) {
        //  For non-last row & first column, go down
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

/* 
Approach II: Using direction

Note: currently its not working
*/
var findDiagonalOrder = function (mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  const result = new Array(rows * cols);
  let row = 0;
  let col = 0;
  let i = 0;
  let direction = 1; // 1: Up, 0: Down
  while (row < rows && col < cols) {
    console.log(`row: ${row}, col: ${col}`);
    result[i++] = mat[row][col];
    // move along in diagonal depending on direction
    // up: row-1, col+1
    // down: row+1, col-1
    const newRow = row + direction == 1 ? -1 : 1;
    const newCol = col + direction == 1 ? 1 : -1;
    //check if next element in the diagonal is within the bound of matrix
    if (newRow < 0 || newRow == rows || newCol < 0 || newCol == cols) {
      if (direction == 1) {
        row += col == cols - 1 ? 1 : 0;
        col += col < cols - 1 ? 1 : 0;
      } else {
        col += row == rows - 1 ? 1 : 0;
        row += row < rows - 1 ? 1 : 0;
      }
      direction = 1 - direction;
    } else {
      row = newRow;
      col = newCol;
    }
  }
  return result;
};

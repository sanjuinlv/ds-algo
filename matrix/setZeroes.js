/* 
73. Set Matrix Zeroes
https://leetcode.com/problems/set-matrix-zeroes/
Type: Medium

Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
You must do it in place.

Example 1:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Example 2:
|0, 1, 2, 0 |
|3, 4, 5, 2 | =>
|1, 3, 1, 5 |
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

Constraints:

m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-2^31 <= matrix[i][j] <= 2^31 - 1
 
*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 
Approach I
Time: O(M * N * (M + N))
Space: O(1)
Runtime: 6 ms Beats 23.39%
Memory Usage: 53.92 MB Beats 26.10%
*/
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const setRowAndColumn = (i, j) => {
    //update row
    for (let col = 0; col < cols; col++) {
      //if there is already '0' then ignore it
      if (matrix[i][col] != 0) matrix[i][col] = "x";
    }
    //update column
    for (let row = 0; row < rows; row++) {
      //if there is already '0' then ignore it
      if (matrix[row][j] != 0) matrix[row][j] = "x";
    }
  };
  //1: mark the row+colm of a matching cell with '0'
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 0) {
        setRowAndColumn(i, j);
      }
    }
  }
  //2. replace x with zero
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == "x") matrix[i][j] = 0;
    }
  }
};

/*
Approach II: Additonal Memory Approach
Time: O(M * N)
Space: O(M + N)

Runtime: 2 ms Beats 67.80%
Memory: 53.13 MB Beats 77.41%
 */
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rowSet = new Set();
  const colSet = new Set();
  // Mark row and col that needs to be made zero
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 0) {
        rowSet.add(i);
        colSet.add(j);
      }
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (rowSet.has(i) || colSet.has(j)) matrix[i][j] = 0;
    }
  }
};
/* 
Approach II: Space (Optimized)
Rather than using additional variables to keep track of rows and columns to be reset, we use the matrix itself as the indicators.

Time: O(M * N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory Usage: 56.48 MB Beats 27.15%
*/
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  //flag to find if there is any zero in first row
  let firstRow = false;
  //flag to find if there is any zero in first col
  let firstCol = false;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 0) {
        if (i == 0) firstRow = true;
        if (j == 0) firstCol = true;
        // set this row and first column to '0'
        matrix[i][0] = 0;
        // set this col and first row to '0'
        matrix[0][j] = 0;
      }
    }
  }
  //set row and columns, expect first, to zeros for found cell with 0
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
    }
  }
  //set first row's columsn to zero
  if (firstRow) {
    for (let j = 0; j < cols; j++) matrix[0][j] = 0;
  }
  //set first colum's rows to zero
  if (firstCol) {
    for (let i = 0; i < rows; i++) matrix[i][0] = 0;
  }
};

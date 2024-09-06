/* 
https://leetcode.com/problems/spiral-matrix/
Type: Medium

Given an m x n matrix, return all elements of the matrix in spiral order.

|1->2->3|
       |       
|4->5, 6|
 |     |
|7<-8<-9|

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Constraints:

 - m == matrix.length
 - n == matrix[i].length
 - 1 <= m, n <= 10
 - -100 <= matrix[i][j] <= 100

*/
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/* 
Approach I: Set Up Boundaries
Time: O(M*N)
Space: O(1)

Runtime: 47 ms, faster than 76.19% of JavaScript online submissions for Spiral Matrix.
Memory Usage: 48.43 MB, less than 86.11% of JavaScript online submissions for Spiral Matrix.
*/
var spiralOrder = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const result = new Array(m * n);
  let k = 0;
  let rowBegin = 0;
  let rowEnd = m - 1;
  let colBegin = 0;
  let colEnd = n - 1;
  while (rowBegin <= rowEnd && colBegin <= colEnd) {
    //move right
    for (let j = colBegin; j <= colEnd; j++) {
      result[k++] = matrix[rowBegin][j];
    }
    rowBegin++;
    //move down
    for (let i = rowBegin; i <= rowEnd; i++) {
      result[k++] = matrix[i][colEnd];
    }
    colEnd--;
    //move left
    if (rowBegin <= rowEnd) {
      for (let j = colEnd; j >= colBegin; j--) {
        result[k++] = matrix[rowEnd][j];
      }
    }
    rowEnd--;
    //move up
    if (colBegin <= colEnd) {
      for (let i = rowEnd; i >= rowBegin; i--) {
        result[k++] = matrix[i][colBegin];
      }
    }
    colBegin++;
  }
  return result;
};

/* 
Approach II: 
Time: O(M*N)
Space: O(M*N) - for visited

Runtime: 59 ms Beats 13.52%
Memory: 48.02 MB Beats 97.13%
*/
var spiralOrder = function (matrix) {
  //right: col+1, down: row+1, left: col-1, up: row-1
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = new Array(rows * cols);
  let row = 0;
  let col = 0;
  const visited = [...new Array(rows)].map(() => new Array(cols).fill(0));
  let direction = "right";
  for (let i = 0; i < rows * cols; i++) {
    result[i] = matrix[row][col];
    visited[row][col] = 1;
    switch (direction) {
      case "right":
        if (col == cols - 1 || visited[row][col + 1]) {
          //change direction
          direction = "down";
          row++;
        } else col++;
        break;
      case "down":
        if (row == rows - 1 || visited[row + 1][col]) {
          direction = "left";
          col--;
        } else row++;
        break;
      case "left":
        if (col == 0 || visited[row][col - 1]) {
          direction = "up";
          row--;
        } else col--;
        break;
      case "up":
        if (visited[row-1][col]) {
          direction = "right";
          col++;
        } else row--;
        break;
    }
  }
  return result;
};
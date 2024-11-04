/* 
240. Search a 2D Matrix II
https://leetcode.com/problems/search-a-2d-matrix-ii/description/
Type: Medium

Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.

Example 1:
    Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
    Output: true
   
Example 2:
    Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
    Output: false

Constraints:
 - m == matrix.length
 - n == matrix[i].length
 - 1 <= n, m <= 300
 - -10^9 <= matrix[i][j] <= 10^9
 - All the integers in each row are sorted in ascending order.
 - All the integers in each column are sorted in ascending order.
 - -10^9 <= target <= 10^9
*/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
/*
Approach I: Brute Force
Time: O(M * N)
Space: O(1)
*/
var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == target) return true;
    }
  }
};

/*
Approach II:  Search Space Reduction
Time: O(M + N)
Space: O(1)

Runtime: 312 ms Beats 44.78%
Memory: 53.00 MB Beats 24.85%
*/
var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  //start from bottom left
  let row = row - 1;
  let col = 0;
  while (row >= 0 && col < cols) {
    if (target == matrix[row][col]) return true;
    //if the cell value is greater than target then move up
    if (matrix[row][col] > target) row--;
    //if cell value is less than target then move right
    else col++;
  }
  return false;
};

/* 
Approach III: Binary Search on Each Row
Time: O(M * logN) where M is number of rows and N is number of columns
Space: O(1)

Runtime: 71 ms Beats 100.00%
Memory: 52.21 MB Beats 71.04%
*/
var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  for (let i = 0; i < rows; i++) {
    const row = matrix.pop();
    let left = 0;
    let right = row.length - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (target == row[mid]) return true;
      else if (target < row[mid]) right = mid - 1;
      else left = mid + 1;
    }
  }
  return false;
};

//Fails. Need to handle edge cases properly
var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  console.log(`rows: ${rows}, cols: ${cols}`);
  const search = (lRow, hRow, lCol, hCol) => {
    if (hRow < 0 || hCol < 0) return false;
    console.log(`lRow: ${lRow}, hRow: ${hRow}, lCol: ${lCol}, hCol: ${hCol}`);
    //calculate mid of matric
    const midRow = lRow + Math.floor((hRow - lRow) / 2);
    const midCol = lCol + Math.floor((hCol - lCol) / 2);
    console.log(`midRow: ${midRow}, midCol: ${midCol}`);
    //hanlde row and col boundary?
    const mid = matrix[midRow][midCol];
    if (mid == target) return true;
    if (target < mid) {
      //look into left and upper left, upper right and lower left
      return (
        //upper left
        search(lRow, midRow - 1, lCol, midCol) ||
        //upper right
        search(lRow, midRow - 1, midCol + 1, hCol) ||
        //lower left
        search(midRow, hRow, lCol, midCol - 1)
      );
    } else {
      //look into left and lower left and lower right, upper right,
      return (
        //lower left
        search(midRow, hRow, lCol, midCol - 1) ||
        //lower right
        search(midRow, hRow, midCol, hCol) ||
        //upper right
        search(lRow, midRow - 1, midCol + 1, hCol)
      );
    }
  };
  return search(0, rows - 1, 0, cols - 1);
};

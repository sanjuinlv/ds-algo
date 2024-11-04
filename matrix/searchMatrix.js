/* 
74. Search a 2D Matrix
https://leetcode.com/problems/search-a-2d-matrix/
Type: Medium

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.
 
Example 1:
    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
    Output: true

Example 2:
    Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
    Output: false  

Constraints:
 - m == matrix.length
 - n == matrix[i].length
 - 1 <= m, n <= 100
 - -10^4 <= matrix[i][j], target <= 10^4
*/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
/*
Approach: Binary Search
Time: O(Log(M * N)) 
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 48.62 MB Beats 87.32%
*/
var searchMatrix = function (matrix, target) {
    const rows = matrix.length;
    if (rows == 0) return false;
    const cols = matrix[0].length;
    let left = 0;
    let right = rows * cols - 1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      //calculate row and col
      const row = parseInt(mid / cols);
      const col = parseInt(mid % cols);
      const midVal = matrix[row][col];
      if (midVal == target) return true;
      if (midVal > target) right = mid - 1;
      else left = mid + 1;
    }
    return false;
  };
  
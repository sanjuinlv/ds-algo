/* 
You are given an n x n 2D matrix representing an image, rotate the image 
by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the 
input 2D matrix directly. 
DO NOT allocate another 2D matrix and do the rotation.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Input: matrix = [[1]]
Output: [[1]]

Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]

Constraints:
i) matrix.length == n
ii) matrix[i].length == n
iii) 1 <= n <= 20
iv) -1000 <= matrix[i][j] <= 1000

*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 
Cleaner code with bug fixes (With solution reference)
Time complexity: O(N^2)
Space complexity: O(1)

Runtime: 84 ms, faster than 27.07% of JavaScript online submissions for Rotate Image.
Memory Usage: 38.6 MB, less than 73.53% of JavaScript online submissions for Rotate Image.
*/
var rotate = function (matrix) {
  if (matrix.length == 1) return;
  const n = matrix.length;
  for (let i = 0; i < parseInt((n + 1) / 2); i++) {
    for (let j = 0; j < parseInt(n / 2); j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - i][j];
      matrix[n - 1 - i][j] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = temp;
    }
  }
};

/*
Approach 2: Transpose and reverse
Time: O(N * N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory Usage: 48.99 MB Beats 75.96%
 */
var rotate = function (matrix) {
  //1. transpose
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      temp = matrix[j][i];
      matrix[j][i] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
  console.log(matrix);
  //2. reverse
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < parseInt(n / 2); j++) {
      temp = matrix[i][j];
      matrix[i][j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = temp;
    }
  }
};

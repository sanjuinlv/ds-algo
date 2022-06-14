/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
/* 
Approach: Set Up Boundaries
Time: O(M*N)
Space: O(1)

Runtime: 49 ms, faster than 99.47% of JavaScript online submissions for Spiral Matrix.
Memory Usage: 42 MB, less than 35.79% of JavaScript online submissions for Spiral Matrix.
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

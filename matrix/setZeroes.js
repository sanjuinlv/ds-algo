/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 
Time: O(M*N*(M+N))
Space: O(1)
Runtime: 121 ms, faster than 44.83% of JavaScript online submissions for Set Matrix Zeroes.
Memory Usage: 45.3 MB, less than 27.22% of JavaScript online submissions for Set Matrix Zeroes.
*/
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const setRowAndColumn = (i, j) => {
    //update row
    for (let col = 0; col < cols; col++) {
      //if there is already '0' then ignore it
      if (matrix[i][col] !== 0) matrix[i][col] = "x";
    }
    //update column
    for (let row = 0; row < rows; row++) {
      //if there is already '0' then ignore it
      if (matrix[row][j] !== 0) matrix[row][j] = "x";
    }
  };
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == 0) {
        setRowAndColumn(i, j);
      }
    }
  }
  //replace 'x' with zeros
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] == "x") {
        matrix[i][j] = 0;
      }
    }
  }
};

/* 
Approach: Space (Optimized)
Time: O(M*N)
Space: O(1)
Runtime: 86 ms, faster than 90.80% of JavaScript online submissions for Set Matrix Zeroes.
Memory Usage: 45.2 MB, less than 33.81% of JavaScript online submissions for Set Matrix Zeroes.
*/
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  //flag to find if there is any zero in first row
  let firstRow = false;
  //flag to find if there is any zero in first col
  let firstCol = false;

  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] == 0) {
      firstCol = true;
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
    if (matrix[0][j] == 0) {
      firstRow = true;
      break;
    }
  }

  //find and set zeros to m[i][j] => m[i][0]= m[j][0] =0
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] == 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  //set zeros
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstCol) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
    }
  }

  if (firstRow) {
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
    }
  }
};

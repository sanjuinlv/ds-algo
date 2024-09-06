/**
 * Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.
 * Input: 5
    Output:
    [
        [1],
       [1,1],
      [1,2,1],
     [1,3,3,1],
    [1,4,6,4,1]
    ]
 */

/**
 * Solution I: Using recursive call
 * This solution has performance issue when the numRows are bigger.
 * It takes lot of time to run.
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let rows = [];
  for (let i = 1; i <= numRows; i++) {
    let row = [];
    for (let j = 1; j <= i; j++) {
      row.push(helper(i, j));
    }
    rows.push(row);
  }

  function helper(i, j) {
    if (j == 1 || j == i) return 1;
    return helper(i - 1, j - 1) + helper(i - 1, j);
  }
  return rows;
};

/* 
Approach II: Using bottom up DP
Note: The below initialize the Array with correct size to avoid reallocation and copy.
Runtime: 67 ms, faster than 70.21% of JavaScript online submissions for Pascal's Triangle.
Memory Usage: 41.6 MB, less than 90.98% of JavaScript online submissions for Pascal's Triangle.
*/
var generate = function (numRows) {
  const result = new Array(numRows);
  //first row is always [1]
  result[0] = [1];
  for (let i = 1; i < numRows; i++) {
    result[i] = new Array(i);
    //first column is always 1
    result[i][0] = 1;
    for (let j = 1; j < i; j++) {
      result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
    }
    //last columns is always 1;
    result[i][i] = 1;
  }
  return result;
};

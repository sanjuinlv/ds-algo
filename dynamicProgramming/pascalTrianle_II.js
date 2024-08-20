/* 
Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
Example 1:

Input: rowIndex = 3
Output: [1,3,3,1]
Example 2:

Input: rowIndex = 0
Output: [1]
Example 3:

Input: rowIndex = 1
Output: [1,1]

*/
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
/* 
Approach I: Dynamic Programming (Using pascal triangle solution)
Time: O(K^2)
Simple memoization would make sure that a particular element in a row is only calculated
once. Assuming that our memoization cache allows constant time lookup and updation
(like a hash-map), it takes constant time to calculate each element in Pascal's triangle.
Since calculating a row requires calculating all the previous rows as well, we end up 
calculating 1 + 2 + 3 + ... + (k+1) =  {(k+1)(k+2)}/{2} = eq k^21+2+3+...+(k+1) ≃k^2
elements for the kth row.
Space complexity : O(k)+ O(k) ≃ O(k).

Runtime: 86 ms, faster than 41.41% of JavaScript online submissions for Pascal's Triangle II.
Memory Usage: 42.2 MB, less than 50.96% of JavaScript online submissions for Pascal's Triangle II.
*/
var getRow = function (rowIndex) {
  let rows = new Array(rowIndex);
  for (let i = 0; i <= rowIndex; i++) {
    rows[i] = new Array(i);
    //first columns is always 1;
    rows[i][0] = 1;
    for (let j = 1; j < i; j++) {
      rows[i][j] = rows[i - 1][j - 1] + rows[i - 1][j];
    }
    //last columns is always 1;
    rows[i][i] = 1;
  }
  return rows[rowIndex];
};

/**
 * Approach 2, using O(k) space
 * Time: O:k^2
 * Space: O(k) + O(k) = O(k)
 *
 * Runtime: 72 ms, faster than 67.17% of JavaScript online submissions for Pascal's Triangle II.
 * Memory Usage: 41.9 MB, less than 79.94% of JavaScript online submissions for Pascal's Triangle II.
 * @param {*} rowIndex
 */
var getRow = function (rowIndex) {
  let result = new Array(rowIndex + 1).fill(0);
  result[0] = 1;
  for (let i = 1; i < rowIndex + 1; i++) {
    for (let j = i; j > 0; j--) {
      result[j] = result[j - 1] + result[j];
    }
  }
  return result;
};

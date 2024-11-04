/* 
52. N-Queens II
https://leetcode.com/problems/n-queens-ii
Type: Hard

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Example 1:
    Input: n = 4
    Output: 2
    Explanation: There are two distinct solutions to the 4-queens puzzle as shown.

Example 2:
    Input: n = 1
    Output: 1


Constraints:
 - 1 <= n <= 9
*/
/**
 * @param {number} n
 * @return {number}
 */
/* 
Approach: Backtracking
Time: O(N!)
Space: O(N^2)

Runtime: 9 ms Beats 32.81%
Memory: 51.13 MB Beats 30.79%
*/
var totalNQueens = function (n) {
  let count = 0;
  let colSet = new Set();
  let diagonalSet = new Set();
  let antiDiagonalSet = new Set();
  const backtrack = (row) => {
    if (row == n) {
      count++;
      return;
    }
    //check combination for each columns
    for (let col = 0; col < n; col++) {
      const diagonal = row - col;
      const antiDiagonal = row + col;
      if (
        colSet.has(col) ||
        diagonalSet.has(diagonal) ||
        antiDiagonalSet.has(antiDiagonal)
      ) {
        continue;
      }
      colSet.add(col);
      diagonalSet.add(diagonal);
      antiDiagonalSet.add(antiDiagonal);
      backtrack(row + 1, col);
      //remove the
      colSet.delete(col);
      diagonalSet.delete(diagonal);
      antiDiagonalSet.delete(antiDiagonal);
    }
  };
  backtrack(0);
  return count;
};

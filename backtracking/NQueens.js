/* 
51. N-Queens
https://leetcode.com/problems/n-queens
Type: Hard

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

Example 1:
|  , Q,  ,  | |  ,  , Q,  |  
|  ,  ,  , Q| |Q ,  ,  ,  |
|Q ,  ,  ,  | |  ,  ,  , Q|
|  ,  , Q,  | |  , Q,  ,  |

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:
Input: n = 1
Output: [["Q"]]
 
Constraints:
 - 1 <= n <= 9
*/
/**
 * @param {number} n
 * @return {number}
 */
//Solution reference
/*
Time: O(N!)
Unlike the brute force approach, we will only place queens on squares that aren't under attack. For the first queen, we have N options. For the next queen, we won't attempt to place it in the same column as the first queen, and there must be at least one square attacked diagonally by the first queen as well. Thus, the maximum number of squares we can consider for the second queen is N−2. For the third queen, we won't attempt to place it in 2 columns already occupied by the first 2 queens, and there must be at least two squares attacked diagonally from the first 2 queens. Thus, the maximum number of squares we can consider for the third queen is N−4. This pattern continues, resulting in an approximate time complexity of N!.

While it costs O(N^2) to build each valid solution, the amount of valid solutions S(N) does not grow nearly as fast as N!, so O(N! + S(N) * N^2) = O(N!)

Space: O(N^2)

Runetime: 8 ms Beats 89.47%
Memory: 52.40 MB Beats 72.60%
 */
var solveNQueens = function (n) {
  const colSet = new Set();
  const diagonalSet = new Set();
  const antiDiagonalSet = new Set();
  const result = [];
  const emptyBoard = [...new Array(n)].map((x) => new Array(n).fill("."));

  const backtrack = (row, state) => {
    //base case - N queen has been placed
    if (row == n) {
      result.push(state.map((x) => x.join("")));
      return;
    }
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
      state[row][col] = "Q";
      backtrack(row + 1, state);
      // "Remove" the queen from the board since we have already
      // explored all valid paths using the above function call
      colSet.delete(col);
      diagonalSet.delete(diagonal);
      antiDiagonalSet.delete(antiDiagonal);
      state[row][col] = ".";
    }
  };
  backtrack(0, emptyBoard);
  return result;
};

//Incomplete
var totalNQueens = function (n) {
  //to place a queen we need to check if the cell is not in attacking zone
  const isUnderAttack = (row, col) => {
    return chess[row][col];
  };

  //This should mark all possible cell which can be attacked by queen
  const placeQueen = (row, col, combination) => {
    console.log(`placeQueen: row: ${row}, col: ${col}`);
    //copy row template
    const rowData = [...rowCells];
    rowData[col] = "Q";
    combination.push(rowData);
    //mark row as under attack
    for (let j = 0; j < cols; j++) {
      chess[row][j] = true;
    }
    //mark columsn as udner attack
    for (let i = 0; i < cols; i++) {
      chess[i][col] = true;
    }
    //mark diagonal as under attack
  };

  //remove the previous decision to move to next candidate
  const removeQueen = (row, col) => {
    console.log(`removeQueen: row: ${row}, col: ${col}`);
    //mark row as under attack
    for (let j = 0; j < cols; j++) {
      chess[row][j] = false;
    }
    //mark columsn as udner attack
    for (let i = 0; i < cols; i++) {
      chess[i][col] = false;
    }
    //mark diagonal as under attack
  };

  const backbtrack = (row, combination) => {
    console.log(`row: ${row}, combination`, combination);
    //we reached end of the rows
    if (row == rows) {
      result.push(combination);
      return;
    }
    for (let col = 0; col < cols; col++) {
      if (!isUnderAttack(row, col)) {
        placeQueen(row, col, combination);
        //try with other row
        backbtrack(row + 1, combination);
        //remove it to try with other
        removeQueen(row, col);
      }
    }
  };
  const rows = n;
  const cols = n;
  const chess = [...new Array(n)].map((x) => new Array(n).fill(false));
  const rowCells = [".", ".", ".", "."];
  const result = [];
  backbtrack(0, []);
};

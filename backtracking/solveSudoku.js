/* 
37. Sudoku Solver
https://leetcode.com/problems/sudoku-solver/
Type: Hard

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
 - Each of the digits 1-9 must occur exactly once in each row.
 - Each of the digits 1-9 must occur exactly once in each column.
 - Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

The '.' character indicates empty cells.

Example 1:
    Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
    Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
    Explanation: The input board is shown above and the only valid solution is shown below:

Constraints:
 - board.length == 9
 - board[i].length == 9
 - board[i][j] is a digit or '.'.
 - It is guaranteed that the input board has only one solution.
*/
/* 
Approach: Backtracking
Time: O(9!^9)
Time complexity is constant here since the board size is fixed and there is no N-parameter to measure. Though let's discuss the number of operations needed : (9!)9. Let's consider one row, i.e. not more than 9 cells to fill. There are not more than 9 possibilities for the first number to put, not more than 9×8 for the second one, not more than 9×8×7 for the third one, etc. In total that results in not more than 9! possibilities for just one row, which means no more than (9!)^9 operations in total.
Let's compare:
   - 981=196627050475552913618075908526912116283103450944214766927315415537966391196809
    for the brute force,
   - and (9!)^9=109110688415571316480344899355894085582848000000000
    for the standard backtracking, i.e. the number of operations is reduced in 1027 times!

Space: O(1)
Runtime: 105 ms Beats 27.72%
Memory: 56.29 MB Beats 18.36% 
*/
var solveSudoku = function (board) {
  const N = 9;
  const rows = [...new Array(N)].map((x) => new Set());
  const cols = [...new Array(N)].map((x) => new Set());
  const boxes = [...new Array(N)].map((x) => new Set());
  const boxIndex = (row, col) => {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
  };
  const canPlace = (row, col, d) => {
    const isDigitPresent =
      rows[row].has(d) || cols[col].has(d) || boxes[boxIndex(row, col)].has(d);
    return !isDigitPresent;
  };

  const placeNumber = (row, col, d) => {
    rows[row].add(d);
    cols[col].add(d);
    boxes[boxIndex(row, col)].add(d);
    board[row][col] = d;
  };

  removeNumber = (row, col, d) => {
    rows[row].delete(d);
    cols[col].delete(d);
    boxes[boxIndex(row, col)].delete(d);
    board[row][col] = ".";
  };

  const placeNextNumbers = (row, col) => {
    //base case: we reached end of the matrix
    if (row == N - 1 && col == N - 1) {
      solveSudoku = true;
      return;
    }
    if (col == N - 1) backtrack(row + 1, 0);
    else backtrack(row, col + 1);
  };
  const backtrack = (row, col) => {
    const cellVal = board[row][col];
    //Empty cell
    if (cellVal == ".") {
      for (let i = 1; i < 10; i++) {
        if (canPlace(row, col, i)) {
          placeNumber(row, col, i);
          //try with next cell
          placeNextNumbers(row, col, i);
          //if sukodu not solver then remove current digit and try with other digits
          if (!solveSudoku) removeNumber(row, col, i);
        }
      }
    } else {
      //digit found, so try with next cell
      placeNextNumbers(row, col);
    }
  };
  let solveSudoku = false;
  //place the current numeric numbers
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] != ".") placeNumber(i, j, parseInt(board[i][j]));
    }
  }
  backtrack(0, 0);
};

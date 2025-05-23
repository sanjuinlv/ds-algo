/* 
36. Valid Sudoku
https://leetcode.com/problems/valid-sudoku/
Type: Medium

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:
 - board.length == 9
 - board[i].length == 9
 - board[i][j] is a digit 1-9 or '.'.
*/
/**
 * @param {character[][]} board
 * @return {boolean}
 */
/* 
Approach 1: Using Hashtable
Time: O(N^2) - N*N cells
Space: O(N^2) - In worst case if board is full we need to store all seens numbers 

Runtime: 2 ms Beats 96.05% 
Memory: 58.23 MB Beats 28.58%
*/
var isValidSudoku = function (board) {
  const rows = new Array(9);
  const cols = new Array(9);
  const boxes = new Array(9);
  for (let i = 0; i < 9; i++) {
    rows[i] = new Set();
    cols[i] = new Set();
    boxes[i] = new Set();
  }
  const m = board.length;
  const n = board[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const value = board[i][j];
      if (value != ".") {
        if (rows[i].has(value)) return false;
        if (cols[j].has(value)) return false;
        const boxIndex = parseInt(i / 3) * 3 + parseInt(j / 3);
        if (boxes[boxIndex].has(value)) return false;
        rows[i].add(value);
        cols[j].add(value);
        boxes[boxIndex].add(value);
      }
    }
  }
  return true;
};

/* 
Approach II: Array Of Fixed length
*/

/* 
Approach III: Bit masking
*/

/* 

boxIndex = (row / 3) * 3 + col /3
row = 2, col = 4
(2 / 3 ) * 3 + 4/3
0 * 3 + 1
1

item = 9 
row = 2, col = 1
(2/3)*3 + 1/3
0 *3 + 0
= 0 
*/

/*
130. Surrounded Regions
https://leetcode.com/problems/surrounded-regions
Type: Medium

You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

Connect: A cell is connected to adjacent cells horizontally or vertically.
Region: To form a region connect every 'O' cell.
Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.

Example 1:
|X X X X|     |X X X X|
|X O O X| =>  |X X X X| 
|X X O X|     |X X X X|
|X O X X|     |X O X X|

Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation:
In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

Example 2:
Input: board = [["X"]]
Output: [["X"]]

Constraints:
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 200
 * board[i][j] is 'X' or 'O'.

*/
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
/* 
Approach: DFS
//1. Move over the boundary of board, and find O's 
//2. Every time we find an O, perform DFS from it's position
//3. In DFS convert all 'O' to '#' (why?? so that we can differentiate which 'O' can be flipped and which cannot be)   
//4. After all DFSs have been performed, board contains three elements: # , O and X
//5. 'O' are left over elements which are not connected to any boundary O, so flip them to 'X'
//6. '#' are elements which cannot be flipped to 'X', so flip them back to 'O'

Time: O(M*N)
Space: O(M*N), dfs call stack

Runtime: 2 ms Beats 94.24%
Memory: 53.91 MB Beats 79.62%
*/
var solve = function (board) {
  if (board == null || board.length == 0) return;
  const m = board.length;
  const n = board[0].length;
  //moving over first and last column
  for (let i = 0; i < m; i++) {
    if (board[i][0] == "O") dfs(i, 0, board, m, n);
    if (board[i][n - 1] == "O") dfs(i, n - 1, board, m, n);
  }

  //moving over first and last row
  for (let j = 0; j < n; j++) {
    if (board[0][j] == "O") dfs(0, j, board, m, n);
    if (board[m - 1][j] == "O") dfs(m - 1, j, board, m, n);
  }

  //finally update the cell with correct marking
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] == "O") board[i][j] = "X";
      if (board[i][j] == "#") board[i][j] = "O";
    }
  }
};

function dfs(i, j, board, m, n) {
  //   if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] != "0") return;
  if (board[i][j] != "O") return;
  board[i][j] = "#";
  if (i + 1 < m) dfs(i + 1, j, board, m, n);
  if (i > 0) dfs(i - 1, j, board, m, n);
  if (j + 1 < n) dfs(i, j + 1, board, m, n);
  if (j > 0) dfs(i, j - 1, board, m, n);
}

/* 
79. Word Search
https://leetcode.com/problems/word-search/
Type: Medium

Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:
|A,B,C,E|
|S,F,C,S|
|A,D,E,E|
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 
Constraints:
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger board?

*/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
/* 
Approach: Backtracking (with DFS)
Time: O(N⋅3^L) where N is the number of cells in the board and L is the length of the word to be matched.
  - For the backtracking function, initially we could have at most 4 directions to explore, but further the choices are reduced into 3 (since we won't go back to where we come from).
  As a result, the execution trace after the first step could be visualized as a 3-nary tree, each of the branches represent a potential exploration in the corresponding direction. Therefore, in the worst case, the total number of invocation would be the number of nodes in a full 3-nary tree, which is about 3^L.
  - We iterate through the board for backtracking, i.e. there could be N times invocation for the backtracking function in the worst case.
Space: O(M * N), for tracking the visiste flag

Runtime: 322 ms Beats 87.85%
Memory: 49.76 MB Beats 55.91%
*/
var exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;
  this.visited = [...Array(rows)].map((x) => Array(cols).fill(false));

  const dfs = (d, i, j) => {
    if (d == word.length) return true;
    //check if we already found the string
    if (i < 0 || j < 0 || i >= rows || j >= cols || this.visited[i][j])
      return false;
    if (board[i][j] !== word[d]) return false;
    this.visited[i][j] = true;
    //look up in all four direction
    //right: row, col+, left: row, col-1, down: row+1, col, up: row-1, col
    if (
      dfs(d + 1, i, j + 1) ||
      dfs(d + 1, i, j - 1) ||
      dfs(d + 1, i + 1, j) ||
      dfs(d + 1, i - 1, j)
    )
      return true;
    //reset the visisted flag back
    this.visited[i][j] = false;
    return false;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(0, i, j)) return true;
    }
  }
  return false;
};

/* 
II: Using directions outside the backtracking method. This run slower
Runtime: 648 ms Beats 28.90%
Memory: 55.98 MB Beats 9.10%
*/
var exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () =>
    new Array(cols).fill(false)
  );
  const dfs = (d, i, j) => {
    //if we found all char match then return true
    if (d == word.length) return true;
    //if curr char does not match or already visited then return false
    if (visited[i][j] || word[d] !== board[i][j]) return false;
    // If the word has only one character and we match it, return true
    if (d === word.length - 1) return true;
    visited[i][j] = true;
    for (let [row, col] of getNeighbour(i, j, rows, cols)) {
      if (dfs(d + 1, row, col)) return true;
    }
    visited[i][j] = false;
    return false;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(0, i, j)) return true;
    }
  }
  return false;
};

function getNeighbour(row, col, rows, cols) {
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const neighbours = [];
  for (const direction of directions) {
    const newRow = row + direction[0];
    const newCols = col + direction[1];
    if (newRow < 0 || newCols < 0 || newRow >= rows || newCols >= cols) {
      continue;
    }
    neighbours.push([newRow, newCols]);
  }
  return neighbours;
}

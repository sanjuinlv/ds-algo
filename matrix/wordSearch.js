/* 
Given an m x n grid of characters board and a string word, return true if word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:
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
Time: O()
Space: O(L) where L is the length of the word to be matched.
Runtime: 526 ms, faster than 66.91% of JavaScript online submissions for Word Search.
Memory Usage: 42.1 MB, less than 96.24% of JavaScript online submissions for Word Search.
*/
var exist = function (board, word) {
  const rows = board.length;
  const columns = board[0].length;
  const dfs = (i, j, pos) => {
    //word found
    if (pos == word.length) return true;
    if (i < 0 || j < 0 || i >= rows || j >= columns || board[i][j] == "#")
      return false;
    if (board[i][j] !== word[pos]) return false;
    const letter = board[i][j];
    //mark this cell character to not visit again during the dfs process
    board[i][j] = "#";
    if (
      dfs(i, j + 1, pos + 1) ||
      dfs(i, j - 1, pos + 1) ||
      dfs(i - 1, j, pos + 1) ||
      dfs(i + 1, j, pos + 1)
    ) {
      return true;
    }
    //reset the character to be used again
    board[i][j] = letter;
    return false;
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};

//Solution 2: with clean up of board if even result were found
var exist = function (board, word) {
  const rows = board.length;
  const columns = board[0].length;
  const dfs = (i, j, pos) => {
    //word found
    if (pos == word.length) return true;
    if (i < 0 || j < 0 || i >= rows || j >= columns || board[i][j] == "#")
      return false;
    if (board[i][j] !== word[pos]) return false;
    const letter = board[i][j];
    //mark this cell character to not visit again during the dfs process
    board[i][j] = "#";
    let returnVal = false;
    if (
      dfs(i, j + 1, pos + 1) ||
      dfs(i, j - 1, pos + 1) ||
      dfs(i - 1, j, pos + 1) ||
      dfs(i + 1, j, pos + 1)
    ) {
      returnVal = true;
    }
    //reset the character to be used again
    board[i][j] = letter;
    return returnVal;
  };
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};

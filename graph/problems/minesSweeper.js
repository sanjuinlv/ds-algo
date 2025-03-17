/* 
529. Minesweeper
https://leetcode.com/problems/minesweeper/
Type: Medium

Let's play the minesweeper game (Wikipedia, online game)!
You are given an m x n char matrix board representing the game board where:

 - 'M' represents an unrevealed mine,
 - 'E' represents an unrevealed empty square,
 - 'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
 - digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
 - 'X' represents a revealed mine.

You are also given an integer array click where click = [clickr, clickc] represents the next click position among all the unrevealed squares ('M' or 'E').

Return the board after revealing this position according to the following rules:
 1. If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
 2. If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed blank 'B' and all of its adjacent unrevealed squares should be revealed recursively.
 3. If an empty square 'E' with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
 4. Return the board when no more squares will be revealed.
 
Example 1:
Input: board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
Output: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]

Example 2:
Input: board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
Output: [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
 
Constraints:
 - m == board.length
 - n == board[i].length
 - 1 <= m, n <= 50
 - board[i][j] is either 'M', 'E', 'B', or a digit from '1' to '8'.
 - click.length == 2
 - 0 <= clickr < m
 - 0 <= clickc < n
 - board[clickr][clickc] is either 'M' or 'E'.
*/

/* 
Approach I: DFS
Time:O(M*N)
Space: O(1)

Runtime: 18 ms Beats 19.11%
Memory; 66.79 MB Beats 5.10%
*/
var updateBoard = function (board, click) {
  dfs(click[0], click[1], board);
  return board;
};

function dfs(r, c, board) {
  //check if user clicks on mines
  if (board[r][c] == "M") {
    board[r][c] = "X";
    return board;
  }
  if (board[r][c] != "E") return;
  //get the mines count
  const mines = getMinesCount(r, c, board);
  // mines found
  if (mines > 0) {
    board[r][c] = `${mines}`;
    return;
  } else {
    board[r][c] = "B";
    //we did not get mines, check other cells
    for (let direction of getDirections(r, c, board)) {
      dfs(direction[0], direction[1], board);
    }
  }
}

function getMinesCount(r, c, board) {
  let mines = 0;
  for (let direction of getDirections(r, c, board)) {
    const [row, col] = direction;
    if (board[row][col] == "M") mines++;
  }
  return mines;
}

function getDirections(row, col, board) {
  const rows = board.length;
  const cols = board[0].length;
  const neighbours = [
    [1, 0], //bottom
    [-1, 0], //up
    [0, 1], // right
    [0, -1], // left
    [-1, -1], //diagonal up left
    [-1, 1], //diagonal up right
    [1, -1], //diagonal down left
    [1, 1], //diagonal down right
  ];
  const directions = [];
  for (let neighbour of neighbours) {
    const newRow = neighbour[0] + row;
    const newCol = neighbour[1] + col;
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      directions.push([newRow, newCol]);
    }
  }
  return directions;
}

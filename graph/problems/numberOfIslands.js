/* 
Given an m x n 2D binary grid grid which represents a map of '1's (land) 
and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands 
horizontally or vertically. You may assume all four edges of the grid are all 
surrounded by water.

Examples:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
  m == grid.length
  n == grid[i].length
  1 <= m, n <= 300
  grid[i][j] is '0' or '1'.

*/
/**
 * @param {character[][]} grid
 * @return {number}
 */

/* 
Approach: DFS Solution

Time Complexity: O(M X N) Where M is no of rows and N is no of columns
Space Complexity: O(M X N) (worst case) in case that the grid map is filled 
with lands where DFS goes by M × N deep.

Runtime: 76 ms, faster than 97.88% of JavaScript online submissions for Number of Islands.
Memory Usage: 39.3 MB, less than 90.80% of JavaScript online submissions for Number of Islands.
[["0"]] - PASS
[["1"]] - PASS
[["1"],["1"]] - PASS
[["1","0","1","1","0","1","1"]] - PASS
[["1","0","1","1","1"],["1","0","1","0","1"],["1","1","1","0","1"]] -  PASS
[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]] - PASS
[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] - PASS
*/
var numIslands = function (grid) {
  if (grid == null || grid.length == 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (i, j) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] == "0") return;
    //mark this as visisted
    grid[i][j] = "0";
    //perform DFS for all adjoining cells
    dfs(i, j + 1);
    dfs(i, j - 1);
    dfs(i + 1, j);
    dfs(i - 1, j);
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == "1") {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
};

/*
Approach: BFS Solution
Time Complexity: O(M X N) Where M is no of rows and N is no of columns
Space Complexity: O(min(M, N)) (worst case) in case that the grid map is filled 
with lands where DFS goes by M × N deep.

Runtime: 96 ms, faster than 32.44% of JavaScript online submissions for Number of Islands.
Memory Usage: 41.5 MB, less than 35.19% of JavaScript online submissions for Number of Islands.
*/
var numIslands = function (grid) {
  if (grid == null || grid.length == 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == "1") {
        count++;
        queue.push([i, j]);
        while (queue.length) {
          const [row, col] = queue.shift();
          //if this grid was already process by another neighbors then skip it
          if (grid[row][col] == "0") continue;
          // mark this one visited
          grid[row][col] = "0";
          if (col + 1 < cols && grid[row][col + 1] == "1")
            queue.push([row, col + 1]);
          if (col - 1 >= 0 && grid[row][col - 1] == "1")
            queue.push([row, col - 1]);
          if (row + 1 < rows && grid[row + 1][col] == "1")
            queue.push([row + 1, col]);
          if (row - 1 >= 0 && grid[row - 1][col] == "1")
            queue.push([row - 1, col]);
        }
      }
    }
  }
  return count;
};

//12/Jun/2022
//Updated BFS code
var numIslands = function (grid) {
  let count = 0;
  if (grid == null || grid.length == 0) return;
  const rows = grid.length;
  const columns = grid[0].length;
  const queue = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] == "1") {
        count++;
        queue.push([i, j]);
        while (queue.length) {
          let [row, col] = queue.shift();
          if (grid[row][col] === "0") continue;
          // mark this one visited
          grid[row][col] = "0";
          if (col + 1 < columns && grid[row][col + 1] == "1")
            queue.push([row, col + 1]);
          if (col - 1 >= 0 && grid[row][col - 1] == "1")
            queue.push([row, col - 1]);
          if (row + 1 < rows && grid[row + 1][col] == "1")
            queue.push([row + 1, col]);
          if (row - 1 >= 0 && grid[row - 1][col] == "1")
            queue.push([row - 1, col]);
        }
      }
    }
  }
  return count;
};

/* 
1091. Shortest Path in Binary Matrix
https://leetcode.com/problems/shortest-path-in-binary-matrix
Type: Medium

Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix.
If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the 
bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different
and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

Example 1:
Input: grid = [[0,1],[1,0]]
Output: 2

Example 2:
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4

Example 3:
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
/* 
Approach: BFS
Time: O(N)
Let N be the number of cells in the grid.
Each cell was guaranteed to be enqueued at most once. This is because a condition for a cell
to be enqueued was that it had a zero in the grid, and when enqueuing, we also permanently 
changed the cell's grid value to be non-zero.
The outer loop ran as long as there were still cells in the queue, dequeuing one each time.
Therefore, it ran at most N times, giving a time complexity of O(N).
The inner loop iterated over the unvisited neighbors of the cell that was dequeued by the outer loop.
There were at most 8 neighbors. Identifying the unvisited neighbors is an O(1) operation because
we treat the 8 as a constant.
Therefore, we have a time complexity of O(N).

Space: O(N): The only additional space we used was the queue. We determined above that at most,
we enqueued N cells. Therefore, an upper bound on the worst-case space complexity is O(N).

Runtime: 84 ms Beats 40.74%
Memory Usage: 62.12 MB Beats 26.17%
*/
class Cell {
  constructor(row, col, distFromStart = 1) {
    this.row = row;
    this.col = col;
    this.distFromStart = distFromStart;
  }
}
var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0] !== 0) return -1;
  const m = grid.length;
  const n = grid[0].length;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  const Q = [];
  Q.push(new Cell(0, 0, 1));
  visited[0][0] = true;
  while (Q.length) {
    const cell = Q.shift();
    //check if we reached end
    if (cell.row == m - 1 && cell.col == n - 1) return cell.distFromStart;
    //visit neighbour
    for (let direction of getDirections(cell.row, cell.col, grid)) {
      const [i, j] = direction;
      if (!visited[i][j] && grid[i][j] == 0) {
        Q.push(new Cell(i, j, cell.distFromStart + 1));
        visited[i][j] = true;
      }
    }
  }
  return -1;
};

function getDirections(row, col, grid) {
  const directions = [
    [1, 0], // bottom
    [1, -1], // bottom-left
    [1, 1], // bottom-right
    [-1, 0], // up
    [-1, -1], // up-left
    [-1, 1], // up-right
    [0, 1], // left
    [0, -1], // right
  ];
  const neighbors = [];
  for (let direction of directions) {
    const newRow = row + direction[0];
    const newCol = col + direction[1];
    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < grid.length &&
      newCol < grid[0].length
    ) {
      neighbors.push([row + direction[0], col + direction[1]]);
    }
  }
  return neighbors;
}

/* 
BSF: With, overwriting input 
Time: O(N)
Let N be the number of cells in the grid.
Each cell was guaranteed to be enqueued at most once. This is because a condition for a cell
to be enqueued was that it had a zero in the grid, and when enqueuing, we also permanently 
changed the cell's grid value to be non-zero.
The outer loop ran as long as there were still cells in the queue, dequeuing one each time.
Therefore, it ran at most N times, giving a time complexity of O(N).
The inner loop iterated over the unvisited neighbors of the cell that was dequeued by the outer loop.
There were at most 8 neighbors. Identifying the unvisited neighbors is an O(1) operation because
we treat the 8 as a constant.
Therefore, we have a time complexity of O(N).

Space: O(N): The only additional space we used was the queue. We determined above that at most,
we enqueued N cells. Therefore, an upper bound on the worst-case space complexity is O(N).

Runtime: 195 ms, faster than 49.06% of JavaScript online submissions for Shortest Path in Binary Matrix.
Memory Usage: 48.7 MB, less than 92.92% of JavaScript online submissions for Shortest Path in Binary Matrix.
*/
var shortestPathBinaryMatrix = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;
  //create mapping for 8-neighboring cells
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const getNeighbors = (row, col) => {
    const neighbors = [];
    for (let direction of directions) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];
      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= rows ||
        newCol >= cols ||
        grid[newRow][newCol] !== 0
      ) {
        continue;
      }
      neighbors.push([newRow, newCol]);
    }
    return neighbors;
  };
  //the top-left and bottom-right cell should be 0
  const Q = [];
  Q.push(0, 0);
  grid[0][0] = 1;
  while (Q.length) {
    const [row, col] = Q.shift();
    const distance = grid[row][col];
    //reached to bottom-right
    if (row === rows - 1 && col === cols - 1) {
      return distance;
    }
    for (const neighbor of getNeighbors(row, col)) {
      const neighborRow = neighbor[0];
      const neighborCol = neighbor[1];
      Q.push([neighborRow, neighborCol]);
      grid[neighborRow][neighborCol] = distance + 1;
    }
  }
  return -1;
};

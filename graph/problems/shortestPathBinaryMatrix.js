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

Runtime: 195 ms, faster than 49.06% of JavaScript online submissions for Shortest Path in Binary Matrix.
Memory Usage: 51.3 MB, less than 37.80% of JavaScript online submissions for Shortest Path in Binary Matrix.
*/
var shortestPathBinaryMatrix = function (grid) {
  const rows = grid.length;
  const cols = rows;
  //the top-left and bottom-right cell should be 0
  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;
  const Q = [];
  const visited = [...Array(rows)].map((x) => Array(cols).fill(false));
  Q.push([0, 0, 1]);
  visited[0][0] = true;
  while (Q.length) {
    const [i, j, distance] = Q.shift();
    //reached bottom-right
    if (i == rows - 1 && j == cols - 1) return distance;
    //explore all 8 cells
    //top-diagonal-left
    if (i > 0 && j > 0 && grid[i - 1][j - 1] == 0 && !visited[i - 1][j - 1]) {
      Q.push([i - 1, j - 1, distance + 1]);
      visited[i - 1][j - 1] = true;
    }
    //top
    if (i > 0 && grid[i - 1][j] == 0 && !visited[i - 1][j]) {
      Q.push([i - 1, j, distance + 1]);
      visited[i - 1][j] = true;
    }
    //top-diagonal-right
    if (
      i > 0 &&
      j + 1 < cols &&
      grid[i - 1][j + 1] == 0 &&
      !visited[i - 1][j + 1]
    ) {
      Q.push([i - 1, j + 1, distance + 1]);
      visited[i - 1][j + 1] = true;
    }
    //left
    if (j > 0 && grid[i][j - 1] == 0 && !visited[i][j - 1]) {
      Q.push([i, j - 1, distance + 1]);
      visited[i][j - 1] = true;
    }
    //right
    if (j + 1 < cols && grid[i][j + 1] == 0 && !visited[i][j + 1]) {
      Q.push([i, j + 1, distance + 1]);
      visited[i][j + 1] = true;
    }
    //bottom
    if (i + 1 < rows && grid[i + 1][j] == 0 && !visited[i + 1][j]) {
      Q.push([i + 1, j, distance + 1]);
      visited[i + 1][j] = true;
    }
    //bottom-left-diagonal
    if (
      i + 1 < rows &&
      j > 0 &&
      grid[i + 1][j - 1] == 0 &&
      !visited[i + 1][j - 1]
    ) {
      Q.push([i + 1, j - 1, distance + 1]);
      visited[i + 1][j - 1] = true;
    }
    //bottom-right-diagonal
    if (
      i + 1 < rows &&
      j + 1 < cols &&
      grid[i + 1][j + 1] == 0 &&
      !visited[i + 1][j + 1]
    ) {
      Q.push([i + 1, j + 1, distance + 1]);
      visited[i + 1][j + 1] = true;
    }
  }
  return -1;
};

/* 
BSF, with cleaner code
Runtime: 185 ms, faster than 53.36% of JavaScript online submissions for Shortest Path in Binary Matrix.
Memory Usage: 60.4 MB, less than 21.18% of JavaScript online submissions for Shortest Path in Binary Matrix.
*/
var shortestPathBinaryMatrix = function (grid) {
  const rows = grid.length;
  const cols = rows;
  //the top-left and bottom-right cell should be 0
  if (grid[0][0] !== 0 || grid[rows - 1][cols - 1] !== 0) return -1;
  const directions = [
    [-1, -1], //diagonal top left
    [-1, 0], // top
    [-1, 1], // diagonal top right
    [0, -1], // left
    [0, 1], // right
    [1, -1], //diagonal bottom left
    [1, 0], //down
    [1, 1], //diagonal bottom right
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

  const Q = [];
  const visited = [...Array(rows)].map((x) => Array(cols).fill(false));
  Q.push([0, 0, 1]); //row=0, col=0
  visited[0][0] = true;
  while (Q.length) {
    const [row, col, distance] = Q.shift();
    //reached bottom-right
    if (row == rows - 1 && col == cols - 1) return distance;
    //explore all neighboring cells
    for (let neighbor of getNeighbors(row, col)) {
      if (!visited[neighbor[0]][neighbor[1]]) {
        visited[neighbor[0]][neighbor[1]] = true;
        Q.push([neighbor[0], neighbor[1], distance + 1]);
      }
    }
  }
  return -1;
};

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

/* 
417. Pacific Atlantic Water Flow
https://leetcode.com/problems/pacific-atlantic-water-flow/
Type: Medium

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

Example 1:

Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

Example 2:
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 

Constraints:
 - m == heights.length
 - n == heights[r].length
 - 1 <= m, n <= 200
 - 0 <= heights[r][c] <= 10^5

*/
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
/* 
Approach I : BFS
Time: O(M*N)
Space: O(M*N)
Runtime: 26 ms Beats 67.58%
Memory: 65.72 MB Beats 5.16%
*/
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacificQueue = [];
  const atlanticQueue = [];
  //add the cells reachable from and 1st and last column
  for (let i = 0; i < m; i++) {
    pacificQueue.push([i, 0]);
    atlanticQueue.push([i, n - 1]);
  }
  //add the cells reachable from 1st row and last row
  for (let j = 0; j < n; j++) {
    pacificQueue.push([0, j]);
    atlanticQueue.push([m - 1, j]);
  }
  //perform bfs from both side
  const pacificRechable = bfs(pacificQueue, heights);
  const atlanticRechable = bfs(atlanticQueue, heights);
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacificRechable[i][j] && atlanticRechable[i][j]) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

function bfs(Q, heights) {
  const m = heights.length;
  const n = heights[0].length;
  const reachable = Array.from({ length: m }, () => new Array(n).fill(false));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (Q.length) {
    const [row, col] = Q.shift();
    reachable[row][col] = true;
    for (const direction of directions) {
      const newRow = direction[0] + row;
      const newCol = direction[1] + col;
      if (newRow < 0 || newCol < 0 || newRow >= m || newCol >= n) continue;
      if (reachable[newRow][newCol]) continue;
      // Check that the new cell has a higher or equal height,
      // So that water can flow from the new cell to the old cell
      if (heights[newRow][newCol] >= heights[row][col]) {
        Q.push([newRow, newCol]);
      }
    }
  }
  return reachable;
}

/* 
Approach II: DFS

Runtime: 21 ms Beats 82.13%
Memory: 68.26 MB Beats 5.15%
*/
var pacificAtlantic = function (heights) {
  const m = heights.length;
  const n = heights[0].length;
  //perform bfs from both side
  const pacificReachable = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlanticReachable = Array.from({ length: m }, () => new Array(n).fill(false));
  //add the cells reachable from and 1st and last column
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacificReachable, heights);
    dfs(i, n - 1, atlanticReachable, heights);
  }
  //add the cells reachable from 1st row and last row
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacificReachable, heights);
    dfs(m - 1, j, atlanticReachable, heights);
  }
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacificReachable[i][j] && atlanticReachable[i][j]) {
        result.push([i, j]);
      }
    }
  }
  return result;  
};

function dfs(row, col, reachable, heights) {
  reachable[row][col] = true;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const direction of directions) {
    const newRow = direction[0] + row;
    const newCol = direction[1] + col;
    if (!isValid(newRow, newCol, heights)) continue;
    if (reachable[newRow][newCol]) continue;
    if (heights[newRow][newCol] >= heights[row][col]) {
      // If we've gotten this far, that means the new cell is reachable      
      dfs(newRow, newCol, reachable, heights);
    }
  }
}

function isValid(row, col, heights) {
  if (row >= 0 && col >= 0 && row < heights.length && col < heights[0].length)
    return true;
  return false;
}

/*
994. Rotting Oranges
https://leetcode.com/problems/rotting-oranges/description/
Type: Medium

You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange.
 If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, 
because rotting only happens 4-directionally.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
/* 
Approach 1: BFS
Time: O(M*N)
Space: O(M*N) in worst case. Usually it would be the width of the tree

Runtime: 14 ms Beats 35.40%
Memory Usage: 55.30 MB Beats 21.88%
*/
var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const Q = [];
  let freshOranges = 0;

  const getNeighbors = (i, j) => {
    const neighbors = [];
    if (i + 1 < rows) neighbors.push([i + 1, j]);
    if (i - 1 >= 0) neighbors.push([i - 1, j]);
    if (j + 1 < cols) neighbors.push([i, j + 1]);
    if (j - 1 >= 0) neighbors.push([i, j - 1]);
    return neighbors;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 2) {
        Q.push([i, j]);
      } else if (grid[i][j] == 1) {
        freshOranges++;
      }
    }
  }
  if (freshOranges == 0) return 0;
  let minuteElapsed = -1;
  //level separator
  Q.push(null);
  //perform bfs from rotten oranges
  while (Q.length) {
    const pos = Q.shift();
    if (pos == null) {
      //add separator
      if (Q.length) Q.push(null);
      minuteElapsed++;
    } else {
      const [row, col] = pos;
      //mark the neighbors as rotten if any of them are fresh and add to the Q
      for (const neighbor of getNeighbors(row, col)) {
        const [newRow, newCol] = neighbor;
        if (grid[newRow][newCol] == 1) {
          freshOranges--;
          grid[newRow][newCol] = 2;
          Q.push([newRow, newCol]);
        }
      }
    }
  }
  return freshOranges == 0 ? minuteElapsed : -1;
};

/* 
BFS II: Without using null separator
Runtime: 13 ms Beats 40.65%
Memory: 55.22 MB Beats 21.88%
*/

var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const Q = [];
  let freshOranges = 0;

  const getNeighbors = (i, j) => {
    const neighbors = [];
    if (i + 1 < rows) neighbors.push([i + 1, j]);
    if (i - 1 >= 0) neighbors.push([i - 1, j]);
    if (j + 1 < cols) neighbors.push([i, j + 1]);
    if (j - 1 >= 0) neighbors.push([i, j - 1]);
    return neighbors;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 2) {
        Q.push([i, j]);
      } else if (grid[i][j] == 1) {
        freshOranges++;
      }
    }
  }
  if (freshOranges == 0) return 0;
  let minuteElapsed = 0;
  //perform bfs from rotten oranges
  while (Q.length) {
    const size = Q.length;
    let rotted = false; // Track if any fresh orange gets rotten in this round
    //process all items in queue
    for (let i = 0; i < size; i++) {
      const [row, col] = Q.shift();
      //mark the neighbors as rotten if any of them are fresh and add to the Q
      for (const neighbor of getNeighbors(row, col)) {
        const [newRow, newCol] = neighbor;
        if (grid[newRow][newCol] == 1) {
          freshOranges--;
          grid[newRow][newCol] = 2;
          Q.push([newRow, newCol]);
          rotted = true;
        }
      }
    }
    //we processed items at one level, so increment the time taken
    if (rotted) minuteElapsed++;
  }
  return freshOranges == 0 ? minuteElapsed : -1;
};

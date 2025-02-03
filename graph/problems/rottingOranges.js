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
//Fails for cases when there is no fresh orange
var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const getNeighbors = (row, col) => {
    const neighbors = [];
    for (let direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= rows ||
        newCol >= cols ||
        grid[newRow][newCol] !== 1
      )
        continue;
      neighbors.push([newRow, newCol]);
    }
    return neighbors;
  };

  //1. find the first rotten tomato
  //if no rotten tomato found then return 0;
  let rottenRow = -1;
  let rottenCol = -1;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        rottenRow = i;
        rottenCol = j;
        break;
      }
    }
  }
  //if no rotten tomato found then we its not possible to rotten tomatoes
  if (rottenRow == -1 || rottenCol == -1) return -1;

  //2. start BFS scan and keep marking the 4-directionally adjacent cell as rotten
  let timeRequired = -1;
  const Q = [];
  Q.push([rottenRow, rottenCol, 0]);
  while (Q.length) {
    const [row, col, elapsedTime] = Q.shift();
    timeRequired = Math.max(timeRequired, elapsedTime);
    for (let neighbor of getNeighbors(row, col)) {
      //mark this cell as rotten
      grid[neighbor[0]][neighbor[1]] = 2;
      Q.push([neighbor[0], neighbor[1], elapsedTime + 1]);
    }
  }

  //3. scan the matrix and if any cell is found with 1, i.e, it was not rotten, then return -1
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }
  return timeRequired;
};

/* 
Approach 1: BFS
Time: O(M*N)
Space: O(M*N) in worst case. Usually it would be the width of the tree

Runtime: 114 ms, faster than 43.61% of JavaScript online submissions for Rotting Oranges.
Memory Usage: 45.3 MB, less than 34.99% of JavaScript online submissions for Rotting Oranges.

*/
var orangesRotting = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const getNeighbors = (row, col) => {
    const neighbors = [];
    for (let direction of directions) {
      let newRow = row + direction[0];
      let newCol = col + direction[1];
      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= rows ||
        newCol >= cols ||
        grid[newRow][newCol] !== 1
      ) {
        continue;
      }
      neighbors.push([newRow, newCol]);
    }
    return neighbors;
  };

  //1. find the first rotten tomato
  //if no rotten tomato found then return 0;
  const Q = [];
  let freshOranges = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        Q.push([i, j]);
      } else if (grid[i][j] == 1) {
        freshOranges++;
      }
    }
  }
  //add level separator
  Q.push(null);
  let minuteElapsed = -1;
  //2. start BFS scan and keep marking the 4-directionally adjacent cell as rotten
  while (Q.length) {
    const cell = Q.shift();
    if (cell == null) {
      minuteElapsed++;
      //add level separator for levels, if there are elements
      if (Q.length) Q.push(null);
    } else {
      let row = cell[0];
      let col = cell[1];
      for (let neighbor of getNeighbors(row, col)) {
        //mark this cell as rotten
        grid[neighbor[0]][neighbor[1]] = 2;
        freshOranges--;
        Q.push([neighbor[0], neighbor[1]]);
      }
    }
  }
  return freshOranges == 0 ? minuteElapsed : -1;
};

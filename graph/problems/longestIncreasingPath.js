/* 
329. Longest Increasing Path in a Matrix
https://leetcode.com/problems/longest-increasing-path-in-a-matrix
Category - Hard

Given an m x n integers matrix, return the length of the longest increasing path in matrix.
From each cell, you can either move in four directions: left, right, up, or down.
You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).
----------
9 | 9 | 4 |
6 | 6 | 8 |
2 | 1 | 1 |
-----------
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
 

Example 1:
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.

Input: matrix = [[1]]
Output: 1
*/
/**
 * @param {number[][]} matrix
 * @return {number}
 */
/*
Approach I: DFS
Time: O(2^(m+n))
Space: O(m * n)
Will timeout on large input
 */
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));
  console.log(`visited`, visited);
  let maxPathLength = 0;
  //perform dfs from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const currPath = dfs(i, j, matrix, visited, m, n);
      maxPathLength = Math.max(maxPathLength, currPath);
    }
  }
  return maxPathLength;
};
//m= 4, i=4
function dfs(row, col, matrix, visited, m, n) {
  visited[row][col] = true;
  console.log(`row: ${row}, col: ${col}`);
  let currPath = 0;
  //perform dfs on neighbours
  for (let cell of getDirections(row, col)) {
    const [i, j] = cell;
    if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || visited[i][j]) continue;
    //next cell is bigger than current
    if (matrix[i][j] > matrix[row][col]) {
      currPath = Math.max(dfs(i, j, matrix, visited, m, n), currPath);
    }
  }
  //mark visisted false so that this can be used in another path
  visited[row][col] = false;
  console.log(`done: row: ${row}, col: ${col}, currPath: ${currPath + 1}`);
  return currPath + 1;
}

function getDirections(row, col) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const resutl = [];
  for (let cell of directions) {
    const [i, j] = cell;
    resutl.push([row + i, col + j]);
  }
  return resutl;
}

/*
Approach I: DFS + memoization
Time: O(m * n)
Space: O(m * n)

Runtime: 38 ms Beats 49.11%
Memory Usage: 58.55 MB Beats 30.18%
*/
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const visited = Array.from({ length: m }, () => new Array(n).fill(-1));
  let maxPath = 0;
  //perform dfs from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      maxPath = Math.max(maxPath, dfs(i, j, matrix, visited, m, n));
    }
  }
  return maxPath;
};

function dfs(row, col, matrix, visited, m, n) {
  if (visited[row][col] != -1) return visited[row][col];
  let currPath = 0;
  for (let cell of getDirections(row, col)) {
    const [i, j] = cell;
    if (i < 0 || j < 0 || i > m - 1 || j > n - 1) continue;
    //if next cell is bigger than current then move further
    if (matrix[i][j] > matrix[row][col]) {
      currPath = Math.max(dfs(i, j, matrix, visited, m, n), currPath);
    }
  }
  visited[row][col] = currPath + 1;
  return visited[row][col];
}

function getDirections(row, col) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const resutl = [];
  for (let cell of directions) {
    const [i, j] = cell;
    resutl.push([row + i, col + j]);
  }
  return resutl;
}

//II: DFS
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix.length;
  const visited = [...Array(m)].map((x) => Array(n).fill(-1));
  let maxPath = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const getDirections = (i, j) => {
    const result = [];
    for (let direction of directions) {
      const row = direction[0] + i;
      const col = direction[1] + j;
      if (row >= 0 && row < m && col >= 0 && col < n) result.push([row, col]);
    }
    return result;
  };

  const dfs = (i, j, l) => {
    const temp = matrix[i][j];
    matrix[i][j] = "#";
    maxPath = Math.max(maxPath, l);
    for (const direction of getDirections(i, j)) {
      const [row, col] = direction;
      if (matrix[row][col] > temp) {
        dfs(row, col, l + 1);
      }
    }
    matrix[i][j] = temp;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, 1);
    }
  }
  return maxPath;
};

//II: DFS with memoization
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix.length;
  const visited = [...Array(m)].map((x) => Array(n).fill(0));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const getDirections = (i, j) => {
    const result = [];
    for (let direction of directions) {
      const row = direction[0] + i;
      const col = direction[1] + j;
      if (row >= 0 && row < m && col >= 0 && col < n) result.push([row, col]);
    }
    return result;
  };

  const dfs = (i, j, l) => {
    if (visited[i][j] !== 0) return visited[i][j];
    const temp = matrix[i][j];
    for (const direction of getDirections(i, j)) {
      const [row, col] = direction;
      if (matrix[row][col] > temp) {
        visited[i][j] = Math.max(visited[i][j], dfs(row, col, l));
      }
    }
    visited[i][j] = visited[i][j] + 1;
    return visited[i][j];
  };

  let maxPath = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      maxPath = Math.max(maxPath, dfs(i, j, 0));
    }
  }
  return maxPath;
};

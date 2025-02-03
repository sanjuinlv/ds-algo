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

/*
Approach I: DFS + memoization
Time: O(m * n)
Space: O(m * n)

Runtime: 162 ms, faster than 66.67% of JavaScript online submissions for Longest Increasing Path in a Matrix.
Memory Usage: 50.2 MB, less than 55.08% of JavaScript online submissions for Longest Increasing Path in a Matrix.
*/

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

/* 
542. 01 Matrix
https://leetcode.com/problems/01-matrix
Type: Medium

Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two cells sharing a common edge is 1. 

Example 1:
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

Example 2:
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]
 
Constraints:
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 104
 * 1 <= m * n <= 104
 * mat[i][j] is either 0 or 1.
 * There is at least one 0 in mat.
*/
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
/* 
Approach : BFS
Time: O(m * n), The BFS never visits a node more than once due to seen. Each node has at most 4 neighbors, so the work done at each node is O(1). This gives us a time complexity of O(m * n), the number of nodes.

Space:  O(m * n)

Runtime: 81 ms Beats 31.17%
Memory: 68.25 MB Beats 9.38%
*/
class State {
  constructor(row, col, step) {
    this.row = row;
    this.col = col;
    this.step = step;
  }
}

//we could also use function but class structure is is better 
// function State(row, col, step) {
//   this.row = row;
//   this.col = col;
//   this.step = step;
// }

  
var updateMatrix = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  const distances = Array.from({ length: m }, () =>
    new Array(n).fill(0)
  );
  const seen = Array.from({ length: m }, () => new Array(n).fill(0));

  const Q = [];
  //add all cell with zero value to the queue
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] == 0) {
        Q.push(new State(i, j, 0));
        seen[i][j] = true;
      }
    }
  }

  while (Q.length) {
    const state = Q.shift();
    //visit neighbours
    for (let neighbour of getDirections(state.row, state.col)) {
      const [newRow, newCol] = neighbour;
      if (isValid(newRow, newCol, m, n) && !seen[newRow][newCol]) {
        seen[newRow][newCol] = true;
        Q.push(new State(newRow, newCol, state.step + 1));
        distances[newRow][newCol] = state.step + 1;
      }
    }
  }
  return distances;
};

function isValid(row, col, m, n) {
  return row >= 0 && col >= 0 && row < m && col < n;
}

function getDirections(row, col) {
  const neighbhours = [];
  for (const direction of directions()) {
    neighbhours.push([row + direction[0], col + direction[1]]);
  }
  return neighbhours;
}

function directions() {
  return [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
}

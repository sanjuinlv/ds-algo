/* 
You are given an m x n grid rooms initialized with these three possible values.

 - -1 A wall or an obstacle.
 - 0 A gate.
 - INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

Example 1:
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

Example 2:
Input: rooms = [[-1]]
Output: [[-1]]

Constraints:

m == rooms.length
n == rooms[i].length
1 <= m, n <= 250
rooms[i][j] is -1, 0, or 2^31 - 1.
*/
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
/* 
Approach I: Brute Force BFS (Time limit exceeding)
Time: O(M^2 * N^2)
Space: O(M * N)
*/
var wallsAndGates = function (rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const WALL = -1;
  const GATE = 0;
  const INT_MAX = 2147483647;
  const EMPTY = INT_MAX;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];

  const neighbors = (i, j) => {
    const result = [];
    for (let direction of directions) {
      const row = i + direction[0];
      const col = j + direction[1];
      //if row and col in range and not wall then add to result
      if (
        row >= 0 &&
        row < m &&
        col >= 0 &&
        col < n &&
        rooms[row][col] !== WALL
      )
        result.push([row, col]);
    }
    return result;
  };

  const distanceToNearestGate = (i, j) => {
    const distance = [...Array(m)].map(() => new Array(n).fill(0));
    const queue = [];
    queue.push([i, j]);
    while (queue.length) {
      const [x, y] = queue.shift();
      for (const neighbor of neighbors(x, y)) {
        const [row, col] = neighbor;
        //distance of this cell is previous + 1
        distance[row][col] = distance[x][y] + 1;
        //GATE found, return the distance
        if (rooms[row][col] == GATE) return distance[row][col];
        queue.push([row, col]);
      }
    }
    return INT_MAX;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] == EMPTY) {
        rooms[i][j] = distanceToNearestGate(i, j);
      }
    }
  }
};

/* 
Approach I: BFS (Starting from all gate)
Time: O(M * N)
Space: O(M * N)

Runtime: 561 ms, faster than 29.98% of JavaScript online submissions for Walls and Gates.
Memory Usage: 50.8 MB, less than 46.94% of JavaScript online submissions for Walls and Gates.
*/
var wallsAndGates = function (rooms) {
  const m = rooms.length;
  const n = rooms[0].length;
  const GATE = 0;
  const INT_MAX = 2147483647;
  const EMPTY = INT_MAX;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];

  const neighbors = (i, j) => {
    const result = [];
    for (let direction of directions) {
      const row = i + direction[0];
      const col = j + direction[1];
      //if row and col in range and not wall then add to result
      if (
        row >= 0 &&
        row < m &&
        col >= 0 &&
        col < n &&
        rooms[row][col] == EMPTY
      )
        result.push([row, col]);
    }
    return result;
  };

  const queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] == GATE) {
        queue.push([i, j]);
      }
    }
  }
  while (queue.length) {
    const [x, y] = queue.shift();
    for (const neighbor of neighbors(x, y)) {
      const [row, col] = neighbor;
      rooms[row][col] = rooms[x][y] + 1;
      queue.push([row, col]);
    }
  }
};

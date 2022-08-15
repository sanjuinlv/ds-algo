/**
 * // This is the robot's control interface.
 * // You should not implement it, or speculate about its implementation
 * function Robot() {
 *     // Returns true if the cell in front is open and robot moves into the cell.
 *     // Returns false if the cell in front is blocked and robot stays in the current cell.
 *     @return {boolean}
 *     this.move = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnLeft = function() {
 *         ...
 *     };
 *
 *     // Robot will stay in the same cell after calling turnLeft/turnRight.
 *     // Each turn will be 90 degrees.
 *     @return {void}
 *     this.turnRight = function() {
 *         ...
 *     };
 *
 *     // Clean the current cell.
 *     @return {void}
 *     this.clean = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {Robot} robot
 * @return {void}
 */
/*
Approach: Backtracking
Time: O(N-M), where N is a number of cells in the room and M is a number of obstacles.
 - We visit each non-obstacle cell once and only once.
 - At each visit, we will check 4 directions around the cell. Therefore, the total
  number of operations would be 4 * (N − M).
Space: O(N-M), where N is a number of cells in the room and M is a number of obstacles.
We employed a hashtable to keep track of whether a non-obstacle cell is visited or not.

Runtime: 160 ms, faster than 45.02% of JavaScript online submissions for Robot Room Cleaner.
Memory Usage: 46.2 MB, less than 90.99% of JavaScript online submissions for Robot Room Cleaner.

 */
var cleanRoom = function (robot) {
  //directions: 0: up, 1: right, 2: down, 3: left
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const goBack = () => {
    robot.turnRight();
    robot.turnRight();
    robot.move();
    robot.turnRight();
    robot.turnRight();
  };

  const backtrack = (row, col, currDirection) => {
    visited.add(row + "," + col);
    robot.clean();
    // going clockwise : 0: 'up', 1: 'right', 2: 'down', 3: 'left'
    for (let x = 0; x < 4; x++) {
      const newDirection = (currDirection + x) % 4;
      const newRow = row + directions[newDirection][0];
      const newCol = col + directions[newDirection][1];
      if (!visited.has(newRow + "," + newCol) && robot.move()) {
        backtrack(newRow, newCol, newDirection);
        goBack();
      }
      // turn the robot following chosen direction : clockwise
      robot.turnRight();
    }
  };
  const visited = new Set();
  backtrack(0, 0, 0);
};

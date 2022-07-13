/* 
You are given an m x n binary matrix grid. An island is a group of 1's (representing land)
connected 4-directionally (horizontal or vertical.) You may assume all four edges of the
grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Example 1:
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.

Example 2:

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
/* 
Approach I: DFS
Time: O(M * N)
Space: O(M * N)
Runtime: 151 ms, faster than 25.07% of JavaScript online submissions for Max Area of Island.
Memory Usage: 45 MB, less than 73.40% of JavaScript online submissions for Max Area of Island.

*/
var maxAreaOfIsland = function (grid) {
  let maxArea = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const dfs = (i, j) => {
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === 0) return 0;
    //mark this grid cell as zero so that we do not visit it again
    grid[i][j] = 0;
    let count = 1;
    //left
    count += dfs(i, j - 1);
    //right
    count += dfs(i, j + 1);
    //up
    count += dfs(i - 1, j);
    //down
    count += dfs(i + 1, j);
    return count;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        const area = dfs(i, j);
        maxArea = Math.max(area, maxArea);
      }
    }
  }
  return maxArea;
};

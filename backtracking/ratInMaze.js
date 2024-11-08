/* 
Rat in a Maze Problem 
https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1
Type: Medium
Consider a rat placed at (0, 0) in a square matrix mat of order n* n. It has to reach the destination at (n - 1, n - 1). Find all possible paths that the rat can take to reach from source to destination. The directions in which the rat can move are 'U'(up), 'D'(down), 'L' (left), 'R' (right). Value 0 at a cell in the matrix represents that it is blocked and rat cannot move to it while value 1 at a cell in the matrix represents that rat can be travel through it.
Note: In a path, no cell can be visited more than one time. If the source cell is 0, the rat cannot move to any other cell. In case of no path, return an empty list. The driver will output "-1" automatically.

Examples:
Input: mat[][] = [[1, 0, 0, 0],
                [1, 1, 0, 1], 
                [1, 1, 0, 0],
                [0, 1, 1, 1]]
Output: DDRDRR DRDDRR
Explanation: The rat can reach the destination at (3, 3) from (0, 0) by two paths - DRDDRR and DDRDRR, when printed in sorted order we get DDRDRR DRDDRR.
Input: mat[][] = [[1, 0],
                [1, 0]]
Output: -1
Explanation: No path exists and destination cell is blocked.

Expected Time Complexity: O(3n^2)
Expected Auxiliary Space: O(l * x)
Here l = length of the path, x = number of paths.

Constraints:
2 ≤ n ≤ 5
0 ≤ mat[i][j] ≤ 1

Approach: Backtracking
Time: O(3^n^2)
Space: O(l * x), where l is length of path and x is number of paths

Runtime: 0.17
*/
class Solution {
  /**
      * @param number n
      * @param number[][] arr
  
      * @returns string[]
      */
  findPath(arr) {
    const N = arr.length;
    const result = [];
    const visited = [...new Array(N)].map((x) => new Array(N).fill(false));
    const directions = {
      U: [-1, 0],
      D: [1, 0],
      L: [0, -1],
      R: [0, 1],
    };
    const isValid = (row, col) => {
      return (
        row >= 0 &&
        col >= 0 &&
        row < N &&
        col < N &&
        arr[row][col] == 1 &&
        !visited[row][col]
      );
    };
    const findPath = (path, row, col) => {
      if (!isValid(newRow, newCol)) return; 
      //base condition
      if (row == N - 1 && col == N - 1) {
        result.push(path);
        return;
      }
      arr[row][col] = 0;
      //try all directions
      for (const [key, [dRow, dCol]] of Object.entries(directions)) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        //check if row col and valid
        findPath(path + key, newRow, newCol);
      }
      arr[row][col] = 1;
    };
    if (arr[0][0] == 1) findPath("", 0, 0);
    result.sort();
    return result;
  }
}

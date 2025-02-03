/* 
733. Flood Fill
https://leetcode.com/problems/flood-fill/description/
Type: Easy

You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill:

Begin with the starting pixel and change its color to color.
Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
The process stops when there are no more adjacent pixels of the original color to update.
Return the modified image after performing the flood fill. 

Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation:
|1 1 1|     |2 2 2|
|1 1 0|  => |2 2 0| 
|1 0 1|     |2 0 1|
From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.

Note the bottom corner is not colored 2, because it is not horizontally or vertically connected to the starting pixel.

Example 2:
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation:
The starting pixel is already colored with 0, which is the same as the target color. Therefore, no changes are made to the image.


Constraints:
 * m == image.length
 * n == image[i].length
 * 1 <= m, n <= 50
 * 0 <= image[i][j], color < 216
 * 0 <= sr < m
 * 0 <= sc < n

*/
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
/* 
Approach: DFS 
Time: O(N), where N is number of pixels in the image. We might process every pixel.
Space: O(N), the size of the implicit call stack when calling

Runtime: 2 ms Beats 35.28%
Memory Usage: 52.34 MB Beats 96.35%
*/
var floodFill = function (image, sr, sc, color) {
  const rows = image.length;
  const cols = image[0].length;
  const directions = (row, col) => {
    return [
      [row + 1, col], //down
      [row - 1, col], //up
      [row, col + 1], // right
      [row, col - 1], //left
    ];
  };
  const dfs = (row, col, oldColor, newColor) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    //cell is different color than base color
    if (image[row][col] !== oldColor) return;
    //color the current cell
    image[row][col] = newColor;
    //perform dfs to color neighbors
    for (const neighbor of directions(row, col)) {
      const [newRow, newCol] = neighbor;
      dfs(newRow, newCol, oldColor, newColor);
    }
  };
  if (image[sr][sc] !== color) dfs(sr, sc, image[sr][sc], color);
  return image;
};

/* 
Approach: DFS
Time: O(N), where NN is the number of pixels in the image. We might process every pixel.
Space: O(N), the size of the implicit call stack when calling dfs
Runtime: 82 ms, faster than 78.24% of JavaScript online submissions for Flood Fill.
Memory Usage: 44.9 MB, less than 14.47% of JavaScript online submissions for Flood Fill.

*/
var floodFill = function (image, sr, sc, newColor) {
  const rows = image.length;
  const columns = image[0].length;

  const dfs = (image, i, j, oldVal, newVal) => {
    if (i < 0 || j < 0 || i >= rows || j >= columns || image[i][j] == "#")
      return;
    if (image[i][j] !== oldVal) return;
    image[i][j] = "#";
    dfs(image, i - 1, j, oldVal, newVal); //up
    dfs(image, i + 1, j, oldVal, newVal); //down
    dfs(image, i, j - 1, oldVal, newVal); //left
    dfs(image, i, j + 1, oldVal, newVal); //down
    image[i][j] = newVal;
  };

  if (image[sr][sc] !== newColor) dfs(image, sr, sc, image[sr][sc], newColor);
  return image;
};

/* 
Approach II: BFS
Time: O(N), where NN is the number of pixels in the image. We might process every pixel.
Space: O(N)

Runtime: 1 ms Beats 55.22%
Memory Usage: 53.04 MB Beats 82.10%
*/
var floodFill = function (image, sr, sc, newColor) {
  if (image[sr][sc] == newColor) return image;
  const queue = [];
  const rows = image.length;
  const columns = image[0].length;
  const oldColor = image[sr][sc];
  queue.push([sr, sc]);
  while (queue.length) {
    const [i, j] = queue.shift();
    if (image[i][j] !== oldColor) continue;
    image[i][j] = newColor;
    //up
    if (i - 1 >= 0) queue.push([i - 1, j]);
    //down
    if (i + 1 < rows) queue.push([i + 1, j]);
    //left
    if (j - 1 >= 0) queue.push([i, j - 1]);
    //right
    if (j + 1 < columns) queue.push([i, j + 1]);
  }
  return image;
};

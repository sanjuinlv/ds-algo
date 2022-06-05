/* 
An image is represented by an m x n integer grid image where image[i][j] represents the pixel
value of the image.

You are also given three integers sr, sc, and newColor. You should perform a flood fill on the
image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally 
to the starting pixel of the same color as the starting pixel, plus any pixels connected 
4-directionally to those pixels (also with the same color), and so on. Replace the color of all
of the aforementioned pixels with newColor.

Return the modified image after performing the flood fill.

Example 1:
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

Example 2:
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
Output: [[2,2,2],[2,2,2]]

*/
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
/* 
Approach: DFS + Backtracking
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
DFS + Backtracking (with minor changes)
Runtime: 98 ms, faster than 51.42% of JavaScript online submissions for Flood Fill.
Memory Usage: 44.3 MB, less than 56.31% of JavaScript online submissions for Flood Fill.
*/
var floodFill = function (image, sr, sc, newColor) {
  const rows = image.length;
  const columns = image[0].length;

  const dfs = (image, i, j, oldVal, newVal) => {
    if (i < 0 || j < 0 || i >= rows || j >= columns || image[i][j] !== oldVal)
      return;
    image[i][j] = newVal;
    dfs(image, i - 1, j, oldVal, newVal); //up
    dfs(image, i + 1, j, oldVal, newVal); //down
    dfs(image, i, j - 1, oldVal, newVal); //left
    dfs(image, i, j + 1, oldVal, newVal); //down
  };
  if (image[sr][sc] !== newColor) dfs(image, sr, sc, image[sr][sc], newColor);
  return image;
};

/* 
Approach: BFS
Time: O(N), where NN is the number of pixels in the image. We might process every pixel.
Space: O(N), the size of the implicit call stack when calling dfs

Runtime: 88 ms, faster than 66.84% of JavaScript online submissions for Flood Fill.
Memory Usage: 45.2 MB, less than 8.50% of JavaScript online submissions for Flood Fill.

*/
var floodFill = function (image, sr, sc, newColor) {
  if (image[sr][sc] == newColor) return image;
  const queue = [];
  const rows = image.length;
  const columns = image[0].length;
  const visited = [...new Array(rows)].map((X) =>
    new Array(columns).fill(false)
  );
  const oldColor = image[sr][sc];
  queue.push([sr, sc]);
  while (queue.length) {
    const [i, j] = queue.shift();
    console.log(`i: ${i}, j: ${j}`);
    if (visited[i][j] || image[i][j] !== oldColor) continue;
    image[i][j] = newColor;
    visited[i][j] = true;
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

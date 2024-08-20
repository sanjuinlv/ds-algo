/* 
https://leetcode.com/problems/container-with-most-water/description/
Type: Medium

You are given an integer array height of length n. There are n vertical lines
 drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the 
container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
In this case, the max area of water (blue section) the container can contain is 49.

Example 2:
Input: height = [1,1]
Output: 1

Constraint:
  - n == height.length
  - 2 <= n <= 105
  - 0 <= height[i] <= 104

*/
/**
 * @param {number[]} height
 * @return {number}
 */

/* 
Approach - Brute Force
Time: O(N^2)
Space: O(1)
*/
var maxArea = function (height) {
  const N = height.length;
  let maxWater = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < N - 1; i++) {
    for (j = i + 1; j < N; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      maxWater = Math.max(maxWater, area);
    }
  }
  return maxWater;
};

/* 
Approach - Two pointer

Time: O(N)
Space: O(1)
Runtime: 60 ms, faster than 99.78% of JavaScript online submissions for Container With Most Water.
Memory Usage: 49.4 MB, less than 61.07% of JavaScript online submissions for Container With Most Water.
*/
var maxArea = function (height) {
  const N = height.length;
  let maxWater = Number.NEGATIVE_INFINITY;
  let i = 0;
  let j = N - 1;
  while (i < j) {
    let area = Math.min(height[i], height[j]) * (j - i);
    maxWater = Math.max(maxWater, area);
    if (height[i] < height[j]) {
      i++;
    } else {
      j--;
    }
  }
  return maxWater;
};

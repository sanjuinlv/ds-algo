/*
https://leetcode.com/problems/trapping-rain-water/solution/ 
Given n non-negative integers representing an elevation map where the width of each bar is 1,
 compute how much water it can trap after raining.

Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:
n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5
*/
/**
 * @param {number[]} height
 * @return {number}
 */
/* 
Approach : Brute Force
*/
//pass for [0,1,0,2,1,0,1,3,2,1,2,1]
//fails for [4,2,0,3,2,5]
var trap = function (height) {
  let result = 0;
  const N = height.length;
  if (N === 1) return result;
  let i = 0;
  let j = 0;
  let localMin = Infinity;
  while (height[j] === 0) j++;
  i = j;
  while (j < N) {
    //can water be trapped?
    //distance between two slop > 1 and there is valley between them
    if (j - i > 1 && Math.min(height[i], height[j]) > localMin) {
      //until we find a higher building continue
      if (j < N - 1 && height[j] < height[j + 1]) {
        j++;
        continue;
      }
      //find min of two building
      const minHeight = Math.min(height[i], height[j]);
      const width = j - i - 1;
      result += minHeight * width;
      let k = i + 1;
      while (k < j) {
        //subtract the buildings height in between i and j
        result -= height[k++] * 1;
      }
      i = j;
    }
    localMin = Math.min(localMin, height[j]);
    j++;
  }
  return result;
};

/*
Approach I: Dynamic programming 
Time: O(N)
Space: O(N)
Runtime: 79 ms, faster than 71.50% of JavaScript online submissions for Trapping Rain Water.
Memory Usage: 44.8 MB, less than 35.26% of JavaScript online submissions for Trapping Rain Water.
 */
var trap = function (height) {
  let ans = 0;
  const N = height.length;
  if (N === 1) return ans;
  const left_max = new Array(N);
  const right_max = new Array(N);

  left_max[0] = height[0];
  for (let i = 1; i < N; i++) {
    left_max[i] = Math.max(height[i], left_max[i - 1]);
  }

  right_max[N - 1] = height[N - 1];
  for (let i = N - 2; i >= 0; i--) {
    right_max[i] = Math.max(height[i], right_max[i + 1]);
  }

  for (let i = 0; i < N; i++) {
    ans += Math.min(left_max[i], right_max[i]) - height[i];
  }
  return ans;
};

/*
Approach I: Two pointer approach
Time: O(N)
Space: O(1)
Runtime: 88 ms, faster than 57.67% of JavaScript online submissions for Trapping Rain Water.
Memory Usage: 43.1 MB, less than 53.97% of JavaScript online submissions for Trapping Rain Water.
 */
var trap = function (height) {
  let totalWater = 0;
  const N = height.length;
  if (N === 1) return totalWater;
  let maxLeft = 0;
  let maxRight = 0;
  let left = 0;
  let right = N - 1;
  while (left < right) {
    // Water could, potentially, fill everything from left to right, if there is nothing in between.
    if (height[left] < height[right]) {
      // If the current elevation is greater than the previous maximum, water cannot occupy that point at all.
      // However, we do know that everything from maxLeft to the current index, has been optimally filled, as we've
      // been adding water to the brim of the last maxLeft.
      if (height[left] >= maxLeft) {
        // So, we say we've found a new maximum, and look to see how much water we can fill from this point on.
        maxLeft = height[left];
        // If we've yet to find a maximum, we know that we can fill the current point with water up to the previous
        // maximum, as any more will overflow it. We also subtract the current height, as that is the elevation the
        // ground will be at.
      } else {
        totalWater += maxLeft - height[left];
      }
      // Increment left, we'll now look at the next point.

      left++;
    } else {
      // Similarly to above, we see that we've found a height greater than the max, and cannot fill it whatsoever, but
      // everything before is optimally filled
      if (height[right] >= maxRight) {
        // We can say we've found a new maximum and move on.
        maxRight = height[right];
        // If we haven't found a greater elevation, we can fill the current elevation with maxRight - height[right]
        // water.
      } else {
        totalWater += maxRight - height[right];
      }
      // Decrement right, we'll look at the next point.
      right--;
    }
  }
  return totalWater;
};

/* 
Largest Rectangle in Histogram (Hard)
https://leetcode.com/problems/largest-rectangle-in-histogram/ 

Given an array of integers heights representing the histogram's bar height where
the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
      -
    - -
    - -
    - -   -
-   - - - -
- - - - - -
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.

Example 2:
Input: heights = [2,4]
Output: 4
*/
/**
 * @param {number[]} heights
 * @return {number}
 */
/* 
Approach: Using Stack (monotonic)
Time: O(N)
Space: O(N)
Runtime: 170 ms, faster than 59.29% of JavaScript online submissions for Largest Rectangle in Histogram.
Memory Usage: 74.3 MB, less than 24.05% of JavaScript online submissions for Largest Rectangle in Histogram.
*/
var largestRectangleArea = function (heights) {
  let stack = [];
  const N = heights.length;
  const NSRIndex = new Array(N);
  const NSLIndex = new Array(N);
  const top = (A) => A[A.length - 1];
  //1. calculate NSL (next smaller to right) index
  stack.push([heights[0], 0]);
  NSLIndex[0] = -1;
  for (let i = 1; i < N; i++) {
    //if the top of the stack is smaller than curr num then we found NSL
    if (top(stack)[0] < heights[i]) {
      NSLIndex[i] = top(stack)[1];
    } else {
      //until the top of the stack is greater than curr pop it
      while (stack.length !== 0 && top(stack)[0] >= heights[i]) stack.pop();
      //nothing left in stack
      if (stack.length == 0) {
        NSLIndex[i] = -1;
      } else {
        NSLIndex[i] = top(stack)[1];
      }
    }
    stack.push([heights[i], i]);
  }
  console.log(NSLIndex);
  //2. NSR Indexes
  stack = [];
  stack.push([heights[N - 1], N - 1]);
  NSRIndex[N - 1] = N;
  for (let i = N - 2; i >= 0; i--) {
    //if the top of the stack is smaller than curr num then we found NSR
    if (top(stack)[0] < heights[i]) {
      NSRIndex[i] = top(stack)[1];
    } else {
      //until the top of the stack is greater than curr pop it
      while (stack.length !== 0 && top(stack)[0] >= heights[i]) stack.pop();
      //nothing left in stack
      if (stack.length == 0) {
        NSRIndex[i] = N;
      } else {
        NSRIndex[i] = top(stack)[1];
      }
    }
    stack.push([heights[i], i]);
  }
  console.log(NSRIndex);
  let maxArea = -Infinity;
  for (let i = 0; i < N; i++) {
    maxArea = Math.max(maxArea, (NSRIndex[i] - NSLIndex[i] - 1) * heights[i]);
  }
  return maxArea !== -Infinity ? maxArea : 0;
};

/* 
84. Largest Rectangle in Histogram
https://leetcode.com/problems/largest-rectangle-in-histogram/ 
Tyep: Hard

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
Runtime: 91 ms Beats 13.14%
Memory Usage: 76.81 MB Beats 20.68%
*/
var largestRectangleArea = function (heights) {
  let stack = [];
  const N = heights.length;
  const NSLIndex = new Array(N);
  const NSRIndex = new Array(N);
  const top = (A) => A[A.length - 1];
  //1. Calculate NSL INdexes
  stack.push([heights[0], 0]);
  //for first element the there is no smaller element so set index to -1
  NSLIndex[0] = -1;
  for (let i = 1; i < N; i++) {
    //if the top of the stack is smaller than curr then we found NSL
    if (top(stack)[0] < heights[i]) {
      NSLIndex[i] = top(stack)[1];
    } else {
      //until the top of the stack is greater than curr, pop it
      while (stack.length && top(stack)[0] >= heights[i]) stack.pop();
      //nothing left in stack, i.e., no NSL found
      if (stack.length == 0) NSLIndex[i] = -1;
      else NSLIndex[i] = top(stack)[1];
    }
    stack.push([heights[i], i]);
  }
  //2. Calculate NSR indexes
  stack = [];
  stack.push([heights[N - 1], N - 1]);
  NSRIndex[N - 1] = N;
  for (let i = N - 2; i >= 0; i--) {
    //if the top of the stack is smaller than curr then we found NSL
    if (top(stack)[0] < heights[i]) {
      NSRIndex[i] = top(stack)[1];
    } else {
      //until the top of the stack is greater than curr, pop it
      while (stack.length && top(stack)[0] > heights[i]) stack.pop();
      //no small number found to the right, use pseudo index as outside the array size
      if (stack.length == 0) NSRIndex[i] = N;
      else NSLIndex[i] = top(stack)[1];
    }
    //put curr to the stack for next comparision
    stack.push([heights[i], i]);
  }
  let maxArea = 0;
  for (let i = 0; i < N; i++) {
    maxArea = Math.max(maxArea, heights[i] * (NSRIndex[i] - NSLIndex[i] - 1));
  }
  return maxArea;
};

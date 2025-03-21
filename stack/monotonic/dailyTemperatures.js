/* 
https://leetcode.com/problems/daily-temperatures/
Type: Medium

Given an array of integers temperatures represents the daily temperatures, return an array
answer such that answer[i] is the number of days you have to wait after the ith day to
get a warmer temperature. If there is no future day for which this is possible, 
keep answer[i] == 0 instead.

Example 1:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:

 - 1 <= temperatures.length <= 10^5
 - 30 <= temperatures[i] <= 100

*/

// Approach: Using Stack (NGR)
/* 
Time: O(N)
Space: O(N)
Runetime: 216 ms Beats 50.82%
Memory: 73.21 MB Beats 58.18%
*/
var dailyTemperatures = function (temperatures) {
  const stack = [];
  const N = temperatures.length;
  const result = new Array(N).fill(0);
  const top = (A) => A[A.length - 1];
  stack.push([temperatures[N - 1], N - 1]);
  result[N - 1] = 0;
  for (let i = N - 2; i >= 0; i--) {
    if (stack.length && top(stack)[0] > temperatures[i]) {
      result[i] = top(stack)[1] - i;
    } else {
      //until we have lower temperature in stack from curr temp, pop it
      while (stack.length && top(stack)[0] <= temperatures[i]) stack.pop();
      if (stack.length) result[i] = top(stack)[1] - i;
    }
    stack.push([temperatures[i], i]);
  }
  return result;
};

//II: Loop index variation (NGR)
var dailyTemperatures = function (temperatures) {
  const N = temperatures.length;
  const stack = new Array();
  const result = new Array(N);
  const top = (A) => A[A.length - 1];
  for (let i = N - 1; i >= 0; i--) {
    //pop until the top is less than current element
    while (stack.length !== 0 && top(stack)[0] <= temperatures[i]) {
      stack.pop();
    }
    if (stack.length) {
      result[i] = top(stack)[1] - i;
    } else {
      result[i] = 0;
    }
    stack.push([temperatures[i], i]);
  }
  return result;
};

//III: Only storing the index
/* 
Runetime: 224 ms Beats 37.84%
Memory: 76.56 MB Beats 23.97%
*/
var dailyTemperatures = function (temperatures) {
  const N = temperatures.length;
  const stack = [];
  const result = new Array(N).fill(0);
  const top = (A) => A[A.length - 1];
  for (let i = N - 1; i >= 0; i--) {
    ////remove from the stack until we find the warmer day
    while (stack.length !== 0 && temperatures[top(stack)] <= temperatures[i]) {
      stack.pop();
    }
    //next warmer day is stack top index and current index difference
    if (stack.length) result[i] = top(stack) - i;
    //store the current temperature which will be used for other entry
    stack.push(i);
  }
  return result;
};
